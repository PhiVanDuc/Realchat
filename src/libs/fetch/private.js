"use client"

import { signOut } from "@/actions/auth";
import { getAccessToken, getRefreshToken } from "@/actions/cookies";

let refreshPromise = null;
const API = process.env.NEXT_PUBLIC_API;

const performRefresh = async () => {
    if (!refreshPromise) {
        refreshPromise = (async () => {
            try {
                const refreshToken = await getRefreshToken();

                const response = await fetch(
                    `/api/token/refresh`,
                    {
                        method: "POST",
                        credentials: "include",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ refreshToken }),
                        cache: "no-cache",
                    }
                );

                const result = await response.json();
                return result;
            }
            catch(error) {
                return {
                    success: false,
                    message: error?.name || "Lỗi thực hiện làm mới phiên đăng nhập!"
                }
            }
            finally { refreshPromise = null }
        })();
    }

    return refreshPromise;
}

const handleFetch = async (method, url, opts = {}) => {
    try {
        const { headers = {}, body } = opts;
        const accessToken = await getAccessToken();

        const finalHeaders = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            ...headers
        }

        const finalOpts = {
            method,
            headers: finalHeaders,
            body,
            cache: "no-cache",
        }

        const response = await fetch(`${API}${url}`, finalOpts);
        const isExpired = response.status === 410;
        const isUnauthorized = response.status === 401;

        if (!isExpired && !isUnauthorized) {
            const result = await response.json();
            return { response, result };
        }
        else {
            if (isUnauthorized) {
                await signOut();
                return { response: {}, result: {} };
            }

            const resultRefresh = await performRefresh();
            if (!resultRefresh?.success) await signOut();

            const newAccessToken = resultRefresh.data.accessToken;
            const changeFinalOpts = {
                ...finalOpts,
                headers: {
                    ...finalHeaders,
                    'Authorization': `Bearer ${newAccessToken}`,
                }
            }

            const response = await fetch(`${API}${url}`, changeFinalOpts);
            const result = await response.json();
            return { response, result };
        }
    }
    catch(error) {
        console.log(error);
        
        return {
            response: { status: -1 },
            result: {
                success: false,
                message: "Không thể gọi tới server!"
            }
        }
    }
}

const fetchPrivate = {
    get: (url, opts) => handleFetch("GET", url, opts),
    post: (url, opts) => handleFetch("POST", url, opts),
    put: (url, opts) => handleFetch("PUT", url, opts),
    patch: (url, opts) => handleFetch("PATCH", url, opts),
    delete: (url, opts) => handleFetch("DELETE", url, opts)
}

export default fetchPrivate;