"use client"

import ReadedNormal from "../readed/readed-normal";
import OnlineStatus from "@/components/reuseable/online-status";

export default function MessagePartner() {
    return (
        <li className="flex items-start gap-[10px]">
            <div className="relative">
                <div className="shrink-0 w-[40px] aspect-square rounded-full bg-slate-300" />
                <OnlineStatus className="w-[8px] outline-[3px]" />
            </div>

            <div className="flex flex-col w-fit items-end gap-y-[5px]">
                <p className="text-[14px] w-full text-neutral-600 font-semibold">Phí Văn Đức</p>
                
                <div className="p-[12px] py-[8px] rounded-[10px] bg-neutral-500">
                    <p className="text-white text-[15px]">Tin nhắn của ô này</p>
                </div>

                <ReadedNormal />
            </div>
        </li>
    )
}
