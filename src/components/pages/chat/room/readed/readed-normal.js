import React from 'react'

import { FaCheck } from "react-icons/fa6";

export default function ReadedNormal() {
    return (
        <div className="flex items-center text-neutral-400 gap-[6px]">
            <p className="text-[13px]">Đã xem</p>
            <FaCheck size={14} />
        </div>
    )
}
