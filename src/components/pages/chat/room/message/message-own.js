"use client"

import MessageReaded from "./message-readed";

import { cn } from "@/lib/utils";
import getBubbleClasses from "@/utils/get-bubble-classes";

export default function MessageOwn({ message, position }) {
    const { wrapper, textBox } = getBubbleClasses(position, false);

    return (
        <li className={cn("flex justify-end", wrapper)}>
            <div className="flex flex-col w-fit">
                <p className={cn("block px-[15px] py-[8px] bg-indigo-500 text-[15px] text-white rounded-[20px]", textBox)}>{message?.content}</p>
                {/* <MessageReaded /> */}
            </div>
        </li>
    )
}
