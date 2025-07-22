"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function RoomChatLoading() {
    return (
        <div className="space-y-[15px]">
            <div className="flex items-stretch gap-[10px]">
                <div className="self-stretch flex items-end">
                    <Skeleton className="shrink-0 w-[40px] aspect-square rounded-full" />
                </div>

                <div className="flex flex-col w-full items-start gap-y-[5px]">
                    <Skeleton className="w-[350px] h-[42.5px] rounded-[99px] rounded-bl-[30px]" />
                    <Skeleton className="w-[550px] h-[42.5px] rounded-[99px] rounded-tl-[30px]" />
                </div>
            </div>

            <div className="flex flex-col items-end gap-[3px] w-full">
                <Skeleton className="w-[350px] h-[42.5px] rounded-[99px] rounded-br-[30px]" />
                <Skeleton className="w-[550px] h-[42.5px] rounded-[99px] rounded-tr-[30px]" />
            </div>

            <div className="flex items-stretch gap-[10px]">
                <div className="self-stretch flex items-end">
                    <Skeleton className="shrink-0 w-[40px] aspect-square rounded-full" />
                </div>

                <div className="flex flex-col w-full items-start gap-y-[5px]">
                    <Skeleton className="w-[350px] h-[42.5px] rounded-[99px]" />
                </div>
            </div>
        </div>
    )
}
