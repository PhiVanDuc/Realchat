"use client"

import RoomInfoLoading from "./loading/room-info-loading";
import OnlineStatus from "@/components/reuseable/online-status";
import ToggleSidebarButton from "@/components/reuseable/toggle-sidebar-button";

export default function RoomInfo({ loading }) {
    return (
        <div className="w-full p-[15px] flex items-center justify-between gap-[15px] border-b border-neutral-200">
            {
                loading ? 
                (
                    <RoomInfoLoading />
                ) :
                (
                    <div className="flex items-center gap-[15px]">
                        <div className="relative">
                            <div className="shrink-0 w-[48px] aspect-square rounded-full bg-slate-300" />
                            <OnlineStatus />
                        </div>

                        <div>
                            <p className="text-[15px] text-neutral-600 font-semibold ellipsis-1-lines">Phí Văn Đức</p>
                            <p className="text-[13px] text-neutral-500 font-medium ellipsis-1-lines">Đang hoạt động.</p>
                        </div>
                    </div>
                )
            }

            <ToggleSidebarButton />
        </div>
    )
}
