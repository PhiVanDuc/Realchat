"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function RoomInfoLoading() {
    return (
        <div className="flex items-center gap-[15px]">
            <Skeleton className="shrink-0 w-[48px] aspect-square rounded-full" />
            
            <div className="space-y-[5px] w-full">
                <Skeleton className="w-full max-w-[200px] h-[22px] rounded-[5px]" />
                <Skeleton className="w-full max-w-[100px] h-[18px] rounded-[5px]" />
            </div>
        </div>
    )
}
