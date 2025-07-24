"use client"

import { cn } from "@/lib/utils";
import getBubbleClasses from "@/utils/get-bubble-classes";

export default function MessagePartner({message, position, showAvatar}) {
    const { wrapper, textBox } = getBubbleClasses(position, true);

    return (
        <li className={cn("flex items-center gap-[10px]", wrapper)}>
            {
                showAvatar ? 
                (<div className="shrink-0 relative w-[40px] aspect-square rounded-full bg-slate-300"></div>) :
                (<div className="shrink-0 w-[40px] h-0"></div>)
            }
            <p className={cn("block leading-normal px-[15px] py-[8px] bg-neutral-200 text-[15px] text-neutral-700 rounded-[20px]", textBox)}>{message?.content}</p>
        </li>
    )
}
