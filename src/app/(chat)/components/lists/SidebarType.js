"use client"

import useSidebarTypeStore from "@/stores/sidebar-type";
import useSidebarExpandStore from "@/stores/sidebar-expand";

import { Menu } from "lucide-react";

import { cn } from "@/libs/utils";
import { signOut } from "@/actions/auth";
import sidebarTypes from "@/consts/sidebar-types";

export default function SidebarType() {
    const { sidebarType, setSidebarType } = useSidebarTypeStore();
    const { sidebarExpand, setSidebarExpand } = useSidebarExpandStore();

    const handleChangeType = async (type) => {
        if (type === "sign-out") {
            await signOut();
            window.location.href = "/auth";
            return;
        }
        
        setSidebarType(type);
    }

    return (
        <div
            className={cn(
                "flex items-center justify-center gap-[20px] order-2 p-[20px] bg-white border border-t-neutral-200",
                "lg:order-1 lg:flex-col lg:justify-start lg:gap-[5px] lg:bg-transparent lg:border-none"
            )}
        >
            {
                sidebarTypes.map(({ id, type, icon }) => (
                    <button
                        key={id}
                        className={cn(
                            "flex items-center justify-center w-[40px] aspect-square rounded-[8px] transition-colors cursor-pointer",
                            sidebarType === type ? "bg-neutral-200 text-neutral-500" : "hover:bg-neutral-200 text-neutral-400"
                        )}
                        onClick={() => {handleChangeType(type)}}
                    >
                        {icon}
                    </button>
                ))
            }

            <button
                className="flex lg:hidden items-center justify-center w-[40px] aspect-square rounded-[8px] hover:bg-neutral-200 text-neutral-400 transition-colors cursor-pointer"
                onClick={() => { setSidebarExpand(!sidebarExpand) }}
            >
                <Menu size={20} />
            </button>
        </div>
    )
}
