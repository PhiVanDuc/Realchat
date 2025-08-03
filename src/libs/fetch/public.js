const handleFetch = async (method, url, opts) => {
    try {
        const { headers = {}, body } = opts;

        const response = await fetch(`${process.env.API}${url}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            cache: "no-store",
            body
        });

        const result = await response.json()
        return { response, result }
    }
    catch(error) {
        return {
            response: { status: -1 },
            result: {
                success: false,
                message: "Không thể gọi tới server!"
            }
        }
    }
}

const fetchPublic = {
    get: (url, opts) => handleFetch("GET", url, opts),
    post: (url, opts) => handleFetch("POST", url, opts),
    put: (url, opts) => handleFetch("PUT", url, opts),
    patch: (url, opts) => handleFetch("PATCH", url, opts),
    delete: (url, opts) => handleFetch("DELETE", url, opts)
}

export default fetchPublic;