"use client"

import { useEffect, useState } from "react";
import { useSocket } from "@/providers/socket-provider";

import RoomChat from "./room-chat";
import RoomForm from "./room-form";
import RoomInfo from "./room-info";

import getUserInfo from "@/utils/get-user-info";
import { connectMessage, formatMessage } from "@/utils/group-messages";

export default function Room({ params }) {
    const { socket } = useSocket();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!socket) return;
        let userInfo;

        (async () => {
            userInfo = await getUserInfo();

            socket.emit("join-room", {
                roomId: params?.roomId,
                accountId: userInfo?.info?.id
            });
        })();

        return () => {
            socket.emit("leave-room", {
                roomId: params?.roomId,
                accountId: userInfo?.info?.id
            });
        }
    }, [socket, params?.roomId]);

    useEffect(() => {
        if (!socket) return;

        socket.on("recive-message", (data) => {
            if (data) {
                const formatData = formatMessage(data);
                setMessages(connectMessage(formatData, messages));
            }
        })

        return () => { socket.off("recive-message"); }
    }, [socket, messages]);

    return (
        <section className="w-full flex-1">
            <div className="flex flex-col items-center justify-center rounded-[12px] h-full bg-white xl:border xl:border-neutral-200">
                <RoomInfo params={params} />
                <RoomChat params={params} messages={messages} setMessages={setMessages} />
                <RoomForm params={params} setMessages={setMessages} />
            </div>
        </section>
    )
}