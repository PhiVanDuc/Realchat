"use client"

import { useEffect } from "react";
import { useSession } from "@/hooks/useSession";

import useRoomsStore from "@/stores/rooms";
import useSocketStore from "@/stores/socket";
import useMessagesStore from "@/stores/messages";

import { toast } from "sonner";
import { readMessage } from "@/actions/message";

export default function RoomEntry({ roomId }) {
    const session = useSession();

    const { socket } = useSocketStore();
    const { rooms } = useRoomsStore();
    const { messages, addMessage, deleteMessage, readMessage: readMessageState } = useMessagesStore();

    // Nhận sự kiện realtime khi vào room
    useEffect(() => {
        if (!socket) return;

        socket.emit("join-room", roomId);
        
        socket.on("message:new", (data) => {
            if (!data || !data?.message) return;
            addMessage(data.message);
        });

        socket.on("message:delete", (data) => {
            if (!data || !data?.message) return;
            deleteMessage(data.message);
        });

        socket.on("message:read", (data) => {
            if (!data || !data?.message) return;
            readMessageState(data.message);
        });

        return () => {
            socket.off("message:new");
            socket.off("message:delete");
            socket.off("message:read");
        }
    }, [roomId, socket]);

    // Đọc tin nhắn khi có tin nhắn mới
    useEffect(() => {
        if (messages.length === 0 || rooms.length === 0 || !session || !session?.data) return;

        const lastMsg = messages[messages.length - 1];
        const isSender = lastMsg.sender_id === session.data.id;
        if (!lastMsg || isSender || lastMsg.is_read) return;

        const waitReadMsg = setTimeout(async () => {
            const result = await readMessage({ roomId, messageId: lastMsg.id, senderId: lastMsg.sender_id });
            if (!result.success) toast.warning(result.message);
        }, 500);

        return () => clearTimeout(waitReadMsg);
    }, [messages, rooms, session]);

    return <></>
}