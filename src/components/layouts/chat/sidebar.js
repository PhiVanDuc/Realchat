"use client"

import { useEffect, useState } from "react";
import { useExpandSidebar } from "@/providers/expand-sidebar-provider";

import SidebarList from "./sidebar-list";
import SidebarType from "./sidebar-type";

import { cn } from "@/lib/utils";

export default function Sidebar() {
    const [loading, setLoading] = useState(true);
    const [chatType, setChatType] = useState("normal");
    const { expandSidebar, setExpandSidebar } = useExpandSidebar();

    useEffect(() => {
        const fakeFetch = setTimeout(() => {
            setLoading(false);
        }, 2000);

        () => clearTimeout(fakeFetch);
    }, []);

    return (
        <aside className={cn(
            "fixed left-0 top-0 bottom-0 w-full translate-x-[-100%] bg-white xl:bg-transparent xl:translate-x-0 flex flex-col xl:flex-row xl:w-fit xl:items-stretch transition-transform duration-300 z-50",
            expandSidebar ? "translate-x-0 r-0" : ""
        )}>
            <SidebarType
                chatType={chatType}
                setChatType={setChatType}
            />

            <SidebarList
                chatType={chatType}
                loading={loading}
            />
        </aside>
    )
}