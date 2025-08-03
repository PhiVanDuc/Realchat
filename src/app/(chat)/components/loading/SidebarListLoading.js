"use client"

import { Skeleton } from "@/components/ui/skeleton";

export default function SidebarListLoading() {
    return (
        <ul className="space-y-[5px] px-[20px]">
            <li className="flex items-center gap-[10px] p-[15px]">
                <Skeleton className="shrink-0 w-[50px] aspect-square rounded-full" />

                <div className="space-y-[5px]">
                    <Skeleton className="w-[150px] h-[22px] rounded-[8px]" />
                    <Skeleton className="w-[80px] h-[16px] rounded-[6px]" />
                </div>
            </li>

            <li className="flex items-center gap-[10px] p-[15px]">
                <Skeleton className="shrink-0 w-[50px] aspect-square rounded-full" />

                <div className="space-y-[5px]">
                    <Skeleton className="w-[150px] h-[22px] rounded-[8px]" />
                    <Skeleton className="w-[80px] h-[16px] rounded-[6px]" />
                </div>
            </li>

            <li className="flex items-center gap-[10px] p-[15px]">
                <Skeleton className="shrink-0 w-[50px] aspect-square rounded-full" />

                <div className="space-y-[5px]">
                    <Skeleton className="w-[150px] h-[22px] rounded-[8px]" />
                    <Skeleton className="w-[80px] h-[16px] rounded-[6px]" />
                </div>
            </li>
        </ul>
    )
}
