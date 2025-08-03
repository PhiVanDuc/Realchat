"use client"

import fetchPrivate from "@/libs/fetch/private";
import getServerSession from "./session";

export const listAccount = async (page) => {
    const session = await getServerSession();

    const { response, result } = await fetchPrivate.get(`/accounts?ownId=${session.data?.id}&page=${page}`);
    return { status: response.status, result };
}