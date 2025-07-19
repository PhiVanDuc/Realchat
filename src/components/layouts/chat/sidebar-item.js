"use client"

import { useExpandSidebar } from "@/providers/expand-sidebar-provider";

import Link from "next/link";
import OnlineStatus from "@/components/reuseable/online-status";

export default function SidebarItem() {
    const { setExpandSidebar } = useExpandSidebar();

    return (
        <li>
            <Link
                href={`/chat/${123}`}
                className="relative flex items-center p-[15px] px-[10px] pr-[28px] gap-[10px] rounded-[10px] hover:bg-neutral-100 transition-colors duration-500 cursor-pointer"
                onClick={() => { setExpandSidebar(false); }}
            >
                <div className="relative">
                    <div className="shrink-0 w-[48px] aspect-square rounded-full bg-slate-300" />
                    <OnlineStatus />
                </div>

                <div className="space-y-[1px]">
                    <p className="text-[15px] text-neutral-600 font-semibold ellipsis-1-lines">Phí Văn Đức</p>
                    
                    <div className="relative">
                        <p className="text-[13px] text-neutral-500 font-medium pr-[48px] ellipsis-1-lines">Đây là đoạn hội thoại được nhắn và có trạng thái đã xem hay chưa dựa trên màu sắc của cuộc trò chuyện.</p>

                        <p className="absolute top-[50%] translate-y-[-50%] right-0 shrink-0 text-[13px] text-neutral-500">11:50PM</p>
                    </div>
                </div>

                <span className="absolute top-[50%] translate-y-[-50%] right-[10px] inline-block w-[8px] aspect-square rounded-full bg-indigo-500" />
            </Link>
        </li>
    )
}
