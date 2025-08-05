"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import useSidebarExpandStore from "@/stores/sidebar-expand";

import Image from "next/image";
import OnlineStatus from "@/components/reuses/OnlineStatus";

import { cn } from "@/libs/utils";
import { createRoom } from "@/actions/room";

export default function SidebarAccountItem({ account: { id, display_name, avatar, room_id } }) {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const { sidebarExpand, setSidebarExpand } = useSidebarExpandStore();

    const handleClick = async () => {
        if (!room_id) {
            setSubmitting(true);
            const result = await createRoom(id);
            router.push(`/room/${result.data.id}`);
            
            setSidebarExpand(!sidebarExpand);
            setSubmitting(false);
            return;
        }

        router.push(`/room/${room_id}`);
        setSidebarExpand(!sidebarExpand);
    }

    return (
        <li
            className={cn(
                "flex items-center gap-[15px] p-[15px] bg-white hover:bg-neutral-100 rounded-[10px] transition-colors cursor-pointer",
                submitting ? "bg-neutral-100" : ""
            )}
            onClick={handleClick}
        >
            <div className="shrink-0 relative w-[50px] aspect-square rounded-full bg-slate-300">
                <OnlineStatus accountId={id} />

                {
                    avatar ?
                    (
                        <Image
                            src={avatar}
                            alt="Avatar"
                            fill
                            sizes="50"
                            className="object-cover object-center rounded-full"
                        />
                    ) : null
                }
            </div>

            <h2 className="text-[16px] text-neutral-800 font-medium">{display_name}</h2>
        </li>
    )
}
