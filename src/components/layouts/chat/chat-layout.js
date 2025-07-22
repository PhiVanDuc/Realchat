"use client"

import Sidebar from "./sidebar/sidebar";
import ExpandSidebarProvider from "@/providers/expand-sidebar-provider";

export default function ChatLayout({ children }) {
    return (
        <ExpandSidebarProvider>
            <main className="bg-slate-100 h-dvh flex items-stretch">
                <Sidebar />
                
                <div className="relative xl:pl-[480px] xl:py-[20px] xl:pr-[20px] flex flex-col w-full items-stretch transition-all duration-300">
                    {children}
                </div>
            </main>
        </ExpandSidebarProvider>
    )
}
