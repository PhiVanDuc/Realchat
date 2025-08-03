"use client"

import fetchPrivate from "@/libs/fetch/private";
import getServerSession from "./session";

export const listRoom = async (page) => {
    const session = await getServerSession();

    const { response, result } = await fetchPrivate.get(`/rooms?ownId=${session.data.id}&page=${page}`);
    return { status: response.status, result };
}

export const createRoom = async (partnerId) => {
    const session = await getServerSession();

    const { result } = await fetchPrivate.post("/rooms", {
        body: JSON.stringify({
            partnerId,
            ownId: session.data.id,
        })
    });

    return result;
}