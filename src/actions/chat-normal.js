"use server"

import fetchPrivate from "@/lib/fetch/fetch-auth";
import getUserInfo from "@/utils/get-user-info";

const createRoomNormal = async (partnerId) => {
    const userInfo = await getUserInfo();

    const { result } = await fetchPrivate.post("/chat-rooms/normal", {
        body: JSON.stringify({
            accountId: userInfo?.info?.id,
            partnerId
        })
    });

    return result;
}

const getRoomMembers = async (roomId) => {
    const userInfo = await getUserInfo();

    const { response, result } = await fetchPrivate.get(`/chat-rooms/normal/${roomId}/members`);
    return { status: response?.status || -1, result, accountId: userInfo?.info?.id }
}

const getRoomMessages = async ({ roomId, page }) => {
    const userInfo = await getUserInfo();

    const { response, result } = await fetchPrivate.get(`/chat-rooms/normal/${roomId}/messages?roomId=${roomId}&page=${page}`);
    return { status: response?.status || -1, result, accountId: userInfo?.info?.id }
}

const createRoomMessage = async (data) => {
    const userInfo = await getUserInfo();

    const { result } = await fetchPrivate.post(`/chat-rooms/normal/${data?.roomId}/messages`, {
        body: JSON.stringify({
            ...data,
            senderId: userInfo?.info?.id
        })
    });
    return result;
}

export {
    createRoomNormal,
    getRoomMembers,
    getRoomMessages,
    createRoomMessage
}