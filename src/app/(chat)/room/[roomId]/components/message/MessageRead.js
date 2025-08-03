"use client"

import { FaCheck } from "react-icons/fa6";

export default function MessageRead() {
    return (
        <div className="flex items-center gap-[8px] text-neutral-400 pt-[7px]">
            <FaCheck size={16} />
            <p className="text-[12px]">Đã xem</p>
        </div>
    )
}
