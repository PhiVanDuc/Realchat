"use client"

import { useEffect, useState } from "react";
import { useSocket } from "@/providers/socket-provider";

import RoomChat from "./room-chat";
import RoomForm from "./room-form";
import RoomInfo from "./room-info";

import getUserInfo from "@/utils/get-user-info";

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
            setMessages((state) => [...state, data]);
        })

        return () => { socket.off("recive-message"); }
    }, [socket, messages]);

    return (
        <section className="w-full flex-1 flex flex-col overflow-y-auto">
            <div className="flex flex-col flex-1 rounded-[12px] bg-white xl:border xl:border-neutral-200 overflow-y-auto">
                <RoomInfo params={params} />
                <RoomChat params={params} messages={messages} setMessages={setMessages} />
                <RoomForm params={params} messages={messages}  setMessages={setMessages} />
            </div>
        </section>
    )
}