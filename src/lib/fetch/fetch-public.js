const fetchHelper = async (method, url, opts) => {
    try {
        const configHeaders = {
            ...(
                (method !== "GET" && method !== "DELETE") ?
                { "Content-Type": "application/json" } :
                {}
            ),
            ...(opts?.headers || {})
        }

        const configBody = opts?.body ? { body: opts?.body } : {};

        const fetchOptions = {
            method,
            ...opts,
            headers: configHeaders,
            ...configBody
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_CALL}${url}`, fetchOptions);

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

const fetchPublic = {
    get: (url, opts) => fetchHelper("GET", url, opts),
    post: (url, opts) => fetchHelper("POST", url, opts),
    put: (url, opts) => fetchHelper("PUT", url, opts),
    patch: (url, opts) => fetchHelper("PATCH", url, opts),
    delete: (url, opts) => fetchHelper("DELETE", url, opts),
}

export default fetchPublic;