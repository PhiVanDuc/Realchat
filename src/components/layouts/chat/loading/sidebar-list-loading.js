"use client"

import { Skeleton } from "@/components/ui/skeleton";

export default function SidebarListLoading() {
    return (
        <li
            className="flex items-center p-[15px] gap-[10px] rounded-[10px] cursor-pointer"
        >
            <Skeleton className="shrink-0 w-[50px] aspect-square rounded-full" />

            <div className="space-y-[8px] w-full">
                <Skeleton className="h-[25px] w-full max-w-[150px] rounded-[5px]" />
                <Skeleton className="h-[18px] w-full rounded-[5px]" />
            </div>
        </li>
    )
}