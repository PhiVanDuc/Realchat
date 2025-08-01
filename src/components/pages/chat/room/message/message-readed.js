import React from 'react';

import { cn } from '@/lib/utils';
import { FaCheck } from "react-icons/fa6";

export default function MessageReaded({ className }) {
    return (
        <div className={cn("flex items-center justify-end text-neutral-400 gap-[6px] py-[5px]", className)}>
            <p className="text-[13px]">Đã xem</p>
            <FaCheck size={14} />
        </div>
    )
}
