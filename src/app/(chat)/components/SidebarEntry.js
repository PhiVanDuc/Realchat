"use client"

import { useEffect } from "react";
import { useSession } from "@/hooks/useSession";

import useRoomsStore from "@/stores/rooms";
import useSocketStore from "@/stores/socket";

import formatRoomItem from "@/utils/format-room-item";

export default function SidebarEntry() {
    const session = useSession();
    const { socket } = useSocketStore();
    const { updateRoomNewMsg, updateRoomMsg } = useRoomsStore();

    // Nhận sự kiện realtime khi vào layout
    useEffect(() => {
        if (!session || !session?.data || !socket) return;

        socket.on("room:new-message", (data) => {
            if (!data || !data?.room) return;

            const formatRoom = formatRoomItem(data.room, session.data.id);
            updateRoomNewMsg(formatRoom);
        });

        const handleUpdateRoomMsg = (data) => {
            if (!data || !data?.room) return;

            const formatRoom = formatRoomItem(data.room, session.data.id);
            updateRoomMsg(formatRoom);
        }

        socket.on("room:delete-message", handleUpdateRoomMsg);
        socket.on("room:read-message", handleUpdateRoomMsg);

        return () => {
            socket.off("room:new-message");
            socket.off("room:delete-message");
            socket.off("room:read-message");
        }
    }, [session, socket])

    return <></>
}