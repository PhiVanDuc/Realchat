"use client"

import { cn } from "@/libs/utils";
import useSocketStore from "@/stores/socket";
import onlineStatus from "@/utils/online-status";

export default function OnlineStatus({ className, accountId }) {
    const { onlineUsers } = useSocketStore();
    const isOnline = onlineStatus(onlineUsers, accountId);

    return (
        <div
            className={cn(
                "absolute top-0 right-0 w-[9px] aspect-square rounded-full outline-[4px] outline-offset-0 outline-white z-20",
                isOnline ? "bg-green-600" : "bg-neutral-300",
                className
            )}
        />
    )
}
