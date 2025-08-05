"use client"

import useRoomStore from "@/stores/room";
import useSidebarExpandStore from "@/stores/sidebar-expand";

import Image from "next/image";
import OnlineStatus from "@/components/reuses/OnlineStatus";

import { cn } from "@/libs/utils";
import Link from "next/link";

export default function SidebarRoomItem({ room: { id, partner, message }, session }) {
    const { room } = useRoomStore();
    const { sidebarExpand, setSidebarExpand } = useSidebarExpandStore();

    const handleClick = () => { setSidebarExpand(!sidebarExpand); }

    return (
        <li>
            <Link
                href={`/room/${id}`}
                className={cn(
                    "flex items-center gap-[10px] p-[15px] bg-white hover:bg-neutral-100 rounded-[10px] transition-colors cursor-pointer",
                    room?.id === id ? "bg-neutral-100" : ""
                )}
                onClick={handleClick}
            >
                <div className="shrink-0 relative w-[50px] aspect-square rounded-full bg-slate-300">
                    <OnlineStatus accountId={partner.id} />
                    {
                        partner.avatar ?
                        (
                            <Image
                                src={partner.avatar}
                                alt="Avatar"
                                fill
                                sizes="50"
                                className="object-cover object-center rounded-full"
                            />
                        ) : null
                    }
                </div>

                <div className="flex flex-col gap-[2px]">
                    <h2 className="text-[15px] text-neutral-700 font-semibold one-line">{partner.display_name}</h2>

                    <p className={cn(
                        "text-[13px] font-semibold one-line",
                        (message.is_read || message.sender_id === session?.data?.id) ? "text-neutral-400 font-medium" : "text-neutral-800 font-semibold"
                    )}>
                        <span className={cn("", message.sender_id === session?.data?.id ? "inline" : "hidden")}>
                            Bạn:
                        </span> { message.is_deleted ? <span className="italic font-medium">Tin nhắn đã bị xóa.</span> : message.content }
                    </p>
                </div>
            </Link>
        </li>
    )
}
