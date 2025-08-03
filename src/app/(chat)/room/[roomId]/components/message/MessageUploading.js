"use client"

import { IoMdRefresh } from "react-icons/io";

export default function MessageUploading() {
    return (
        <div className="flex items-center gap-[8px] text-neutral-400 pt-[7px]">
            <div className="shrink-0 animate-spin-slow">
                <IoMdRefresh size={18} />
            </div>

            <p className="text-[12px]">Đang tải lên</p>
        </div>
    )
}
