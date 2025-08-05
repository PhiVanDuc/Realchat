"use client"

import useRoomStore from "@/stores/room";
import useSidebarExpandStore from "@/stores/sidebar-expand";

import { Menu } from "lucide-react";

export default function Chat() {
    const { submitting } = useRoomStore();
    const { sidebarExpand, setSidebarExpand } = useSidebarExpandStore();

    return (
        <section className="relative self-stretch flex items-center justify-center w-full bg-white border border-neutral-200 rounded-[15px]">
            <button
                className="absolute top-[20px] right-[20px] group flex lg:hidden items-center justify-center w-[30px] sm:w-[40px] aspect-square bg-neutral-200 rounded-[10px] cursor-pointer"
                onClick={() => { setSidebarExpand(!sidebarExpand) }}
            >
                <Menu size={18} className="text-neutral-500 transition-colors"/>
            </button>

            <p className="p-[20px] text-[16px] text-neutral-400 font-medium">
                { submitting ? "Đang tạo phòng chat . . ." : "Bắt đầu nhắn tin tại Realchat." }
            </p>
        </section>
    )
}
