"use client"

import { X } from "lucide-react";

export default function SelectedMemberitem() {
    return (
        <div className="shrink-0 flex items-center gap-[5px] text-neutral-600 pl-[10px] pr-[2px] py-[2px] rounded-[5px] bg-neutral-100">
            <p className="text-[14px] font-medium">Phí Văn Đức</p>

            <button
                type="button"
                className="flex items-center justify-center w-[22px] aspect-square rounded-full hover:bg-white hover:text-red-500 transition-colors cursor-pointer"
            >
                <X size={12}/>
            </button>
        </div>
    )
}
