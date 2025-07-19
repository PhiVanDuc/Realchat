"use client"

import { cn } from "@/lib/utils";
import { useExpandSidebar } from "@/providers/expand-sidebar-provider";
import { LuMenu } from "react-icons/lu";

export default function ToggleSidebarButton({ className }) {
    const {expandSidebar, setExpandSidebar} = useExpandSidebar();

    return (
        <button
            type="button"
            className={cn(
                "flex xl:hidden items-center justify-center w-[35px] aspect-square rounded-[5px] hover:bg-neutral-200 transition-colors duration-300 cursor-pointer",
                className
            )}
            onClick={() => { setExpandSidebar(!expandSidebar) }}
        >
            <LuMenu
                size={20}
                className="text-neutral-600"
            />
        </button>
    )
}