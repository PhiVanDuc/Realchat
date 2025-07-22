import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API_CALL;
let refreshPromise = null;

const performRefreshToken = async () => {
    const storageCookies = await cookies();
    const refreshToken = storageCookies.get("refresh-token")?.value;
    
    if (!refreshPromise) {
        refreshPromise = (async () => {
            try {
                const response = await fetch(`${BACKEND_API}/token/refresh-access-token`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${refreshToken}`,
                    },
                });

                const result = await response.json();
                return result;
            }
            catch (error) {
                return {
                    success: false,
                    error
                };
            }
            finally {
                refreshPromise = null;
            }
        })();
    }

    return refreshPromise;
}

const fetchHelper = async (method, url, opts) => {
    const storageCookies = await cookies();
    const accessToken = storageCookies.get("access-token")?.value;

    try {
        const configHeaders = {
            Authorization: `Bearer ${accessToken}`,
            ...(
                (method !== "GET" && method !== "DELETE") ?
                {"Content-Type": "application/json"} :
                {}
            ),
            ...(opts?.headers || {})
        }

        const configBody = opts?.body ? { body: opts.body } : {};

        let fetchOptions = {
            method,
            ...opts,
            headers: configHeaders,
            ...configBody
        }

        let response = await fetch(`${BACKEND_API}${url}`, fetchOptions);

        if (response.status === 410) {
            const resultRefresh = await performRefreshToken();
        
            if (!resultRefresh?.success) {
                storageCookies.delete("access-token");
                storageCookies.delete("refresh-token");
                try {redirect("/sign-in")}
                catch(error) {}
            }

            storageCookies.set({
                name: "access-token",
                value: resultRefresh?.data?.accessToken,
                httpOnly: true,
                path: '/',
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            });

            storageCookies.set({
                name: "refresh-token",
                value: resultRefresh?.data?.refreshToken,
                httpOnly: true,
                path: '/',
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            });

            fetchOptions = {
                ...fetchOptions,
                headers: {
                    ...configHeaders,
                    Authorization: `Bearer ${resultRefresh?.data?.accessToken || ""}`,
                },
            };

            response = await fetch(`${BACKEND_API}${url}`, fetchOptions);
            
            try {
                const result = await response.json();
                return { response, result };
            }
            catch(error) {
                console.log("Lỗi parse JSON", error);

                return {
                    response,
                    result: {
                        success: false,
                        message: "Lỗi không phân tích được kết quả JSON"
                    }
                }
            }
        }
        else if (response?.status === 401) {
            storageCookies.delete("access-token");
            storageCookies.delete("refresh-token");
            try {redirect("/sign-in")}
            catch(error) {}
        }

        try {
            const result = await response.json();
            return { response, result };
        }
        catch(error) {
            console.log("Lỗi parse JSON", error);

            return {
                response: undefined,
                result: {
                    success: false,
                    message: "Lỗi không phân tích được kết quả JSON"
                }
            }
        }
    }
    catch(error) {
        console.log("Lỗi fetch: ", error);

        return {
            response: undefined,
            result: {
                success: false,
                message: "Lỗi khi gọi API"
            }
        }
    }
}

const fetchPrivate = {
    get: (url, opts) => fetchHelper("GET", url, opts),
    post: (url, opts) => fetchHelper("POST", url, opts),
    put: (url, opts) => fetchHelper("PUT", url, opts),
    patch: (url, opts) => fetchHelper("PATCH", url, opts),
    delete: (url, opts) => fetchHelper("DELETE", url, opts),
}

export default fetchPrivate;