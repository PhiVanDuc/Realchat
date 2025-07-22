"use client"

import { useSocket } from "@/providers/socket-provider";
import { cn } from "@/lib/utils";

export default function OnlineStatus({ className, accountId }) {
    const { onlineUsers } = useSocket();
    const isOnline = onlineUsers.find(user => user === accountId);

    return (
        <span
            className={cn(
                "absolute top-0 right-0 inline-block w-[10px] aspect-square rounded-full outline-[4px] outline-white outline-offset-0 z-30",
                isOnline ? "bg-green-600" : "bg-neutral-300",
                className
            )}
        />
    )
}
