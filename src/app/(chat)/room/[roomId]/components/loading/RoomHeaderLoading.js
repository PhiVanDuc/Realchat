"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function RoomHeaderLoading() {
    return (
        <div className="flex items-center gap-[15px]">
            <Skeleton className="shrink-0 w-[50px] aspect-square rounded-full" />

            <div className="flex flex-col gap-[5px]">
                <Skeleton className="h-[24px] rounded-[8px] w-[200px]" />
                <Skeleton className="h-[19px] rounded-[8px] w-[100px]" />
            </div>
        </div>
    )
}
