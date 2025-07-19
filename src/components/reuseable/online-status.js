"use client"

import { useSocket } from "@/providers/socket-provider";
import { cn } from "@/lib/utils";

export default function OnlineStatus({ className }) {
    const { onlineUsers } = useSocket();

    return (
        <span
            className={cn(
                "absolute top-0 right-0 inline-block w-[10px] aspect-square rounded-full bg-green-600 outline-[4px] outline-white outline-offset-0",
                className
            )}
        />
    )
}
