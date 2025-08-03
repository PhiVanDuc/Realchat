"use client"

import useSidebarExpandStore from "@/stores/sidebar-expand";
import { Menu } from "lucide-react";

export default function Chat() {
    const { sidebarExpand, setSidebarExpand } = useSidebarExpandStore();

    return (
        <section className="relative self-stretch w-full bg-white border border-neutral-200 rounded-[15px]">
            <button
                className="absolute top-[20px] right-[20px] group flex lg:hidden items-center justify-center w-[30px] sm:w-[40px] aspect-square rounded-[10px] cursor-pointer"
                onClick={() => { setSidebarExpand(!sidebarExpand) }}
            >
                <Menu size={18} className="text-neutral-400 group-hover:text-neutral-500 transition-colors"/>
            </button>
        </section>
    )
}
