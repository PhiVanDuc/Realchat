"use client"

import { Skeleton } from "@/components/ui/skeleton";

export default function RoomBodyLoading() {
    return (
        <div className="flex-1 w-full p-[20px] pb-0 space-y-[10px]">
            <div className="flex items-center gap-[10px] max-w-[70%]">
                <Skeleton className="shrink-0 w-[40px] aspect-square rounded-full" />
                <Skeleton className="h-[36px] w-[300px] max-w-full rounded-[20px]" />
            </div>

            <div className="flex flex-col items-end gap-[3px]">
                <Skeleton className="h-[36px] w-[250px] max-w-[70%] rounded-[20px] rounded-br-[5px]" />
                <Skeleton className="h-[36px] w-[450px] max-w-[70%] rounded-[20px] rounded-tr-[5px]" />
            </div>
        </div>
    )
}
