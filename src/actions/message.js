"use client"

import fetchPrivate from "@/libs/fetch/private";
import getServerSession from "./session";

export const createMessage = async (data) => {
    const session = await getServerSession();

    const { result } = await fetchPrivate.post("/messages", {
        body: JSON.stringify({
            ...data,
            senderId: session.data.id
        })
    });

    return result;
}

export const listMessage = async (data) => {
    const { response, result } = await fetchPrivate.get(`/messages?roomId=${data?.roomId}&page=${data.page}`);
    return { status: response.status, result };
}

export const partnerMessage = async (roomId) => {
    const session = await getServerSession();

    const { response, result } = await fetchPrivate.get(`/messages/partner?roomId=${roomId}&ownId=${session.data.id}`);
    return { status: response.status, result };
}

export const readMessage = async (data) => {
    const { result } = await fetchPrivate.put("/messages/read", {
        body: JSON.stringify(data)
    });

    return result;
}

export const deleteMessage = async (messageId) => {
    const { result } = await fetchPrivate.delete(`/messages?messageId=${messageId}`);
    return result;
}