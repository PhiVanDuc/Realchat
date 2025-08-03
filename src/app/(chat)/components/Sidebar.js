"use client"

import useSidebarTypeStore from "@/stores/sidebar-type";
import useSidebarExpandStore from "@/stores/sidebar-expand";

import SidebarType from "./lists/SidebarType";
import SidebarEntry from "./SidebarEntry";
import SidebarRoomList from "./lists/SidebarRoomList";
import SidebarAccountList from "./lists/SidebarAccountList";

import { cn } from "@/libs/utils";

export default function Sidebar() {
    const { sidebarType } = useSidebarTypeStore();
    const { sidebarExpand } = useSidebarExpandStore();

    return (
        <section
            className={cn(
                "fixed left-0 top-0 bottom-0 right-0 flex flex-col transition-all duration-500 z-20",
                "lg:flex-row lg:translate-x-0 lg:items-stretch lg:top-[20px] lg:bottom-[20px] lg:right-auto",
                sidebarExpand ? "translate-x-0" : "-translate-x-full"
            )}
        >
            <SidebarEntry />
            <SidebarType />

            {
                sidebarType === "accounts" ? <SidebarAccountList /> :
                sidebarType === "rooms" && <SidebarRoomList />
            }    
        </section>
    )
}