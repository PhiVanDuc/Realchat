"use client"

import useSidebarExpandStore from "@/stores/sidebar-expand";
import { Menu } from "lucide-react";

export default function Chat() {
    const { sidebarExpand, setSidebarExpand } = useSidebarExpandStore();

    return (
        <section className="relative self-stretch flex items-center justify-center w-full bg-white border border-neutral-200 rounded-[15px]">
            <button
                className="absolute top-[20px] right-[20px] group flex lg:hidden items-center justify-center w-[30px] sm:w-[40px] aspect-square bg-neutral-200 rounded-[10px] cursor-pointer"
                onClick={() => { setSidebarExpand(!sidebarExpand) }}
            >
                <Menu size={18} className="text-neutral-500 transition-colors"/>
            </button>

            <p className="p-[20px] text-[15px] md:text-[17px] text-neutral-400 font-semibold">Bắt đầu nhắn tin tại Realchat.</p>
        </section>
    )
}
