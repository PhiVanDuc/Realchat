"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function RoomChatLoading() {
    return (
        <div className="space-y-[10px]">
            <div className="flex items-start gap-[10px]">
                <Skeleton className="shrink-0 w-[40px] aspect-square rounded-full" />

                <div className="flex flex-col w-full items-start gap-y-[5px]">
                    <Skeleton className="w-full max-w-[200px] h-[21px] rounded-[5px]" />
                    <Skeleton className="w-full max-w-[800px] h-[60px] rounded-[10px]" />
                </div>
            </div>

            <div className="flex justify-end w-full">
                <Skeleton className="w-full max-w-[800px] h-[80px] rounded-[10px]" />
            </div>

            <div className="flex items-start gap-[10px]">
                <Skeleton className="shrink-0 w-[40px] aspect-square rounded-full" />

                <div className="flex flex-col w-full items-start gap-y-[5px]">
                    <Skeleton className="w-full max-w-[200px] h-[21px] rounded-[5px]" />
                    <Skeleton className="w-full max-w-[400px] h-[40px] rounded-[10px]" />
                </div>
            </div>

            <div className="flex justify-end w-full">
                <Skeleton className="w-full max-w-[600px] h-[80px] rounded-[10px]" />
            </div>

            <div className="flex items-start gap-[10px]">
                <Skeleton className="shrink-0 w-[40px] aspect-square rounded-full" />

                <div className="flex flex-col w-full items-start gap-y-[5px]">
                    <Skeleton className="w-full max-w-[200px] h-[21px] rounded-[5px]" />
                    <Skeleton className="w-full max-w-[600px] h-[40px] rounded-[10px]" />
                </div>
            </div>

            <div className="flex justify-end w-full">
                <Skeleton className="w-full max-w-[800px] h-[120px] rounded-[10px]" />
            </div>
        </div>
    )
}
