"use server"

import fetchPrivate from "@/lib/fetch/fetch-auth";

const getAccounts = async ({ accountId, page }) => {
    const { response, result } = await fetchPrivate.get(`/accounts?accountId=${accountId}&page=${page || 1}`);
    return { status: response?.status || -1, result };
}

export {
    getAccounts
}