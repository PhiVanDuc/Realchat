"use client"

import { useEffect } from "react";
import { useSession } from "@/hooks/useSession";

import useSocketStore from "@/stores/socket";
import { io } from "socket.io-client";

export default function SocketProvider({ children }) {
    const session = useSession();
    const { socket, setSocket, setOnlineUsers } = useSocketStore();

    useEffect(() => {
        if (!session || !session.isAuth || socket?.connected) return;

        const socketInstance = io(
            process.env.NEXT_PUBLIC_ROOT_API,
            {
                auth: {
                    accessToken: session.accessToken,
                    accountId: session.data?.id
                },
            }
        );

        setSocket(socketInstance);
        socketInstance.on("online-users", (data) => {
            setOnlineUsers(data);
        });

        return () => {
            socketInstance.off("online-users");
            socketInstance.disconnect();
            
            setOnlineUsers([]);
            setSocket(undefined);
        }
    }, [session]);

    return children;
}
