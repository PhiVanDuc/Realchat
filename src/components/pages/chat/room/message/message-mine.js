"use client"

import { cn } from "@/lib/utils";
import ReadedNormal from "../readed/readed-normal";
import ReadedGroup from "../readed/readed-group";

export default function MessageMine({ room, groupMessages }) {
    return (
        <li className="flex flex-col items-end">
            <div className="w-fit flex flex-col items-end gap-y-[2px]">
                {
                    groupMessages?.messages.map((message, index) => {
                        const first = index === 0 && groupMessages?.messages?.length >= 2;
                        const middle = index > 0 && index < groupMessages?.messages?.length - 1 && groupMessages?.messages?.length >= 3;
                        const last = index === groupMessages?.messages?.length - 1 && groupMessages?.messages?.length >= 2;

                        return (
                            <div
                                className="space-y-[5px]"
                                key={message?.id}
                            >
                                <div
                                    className={cn(
                                        "p-[15px] py-[10px] rounded-[99px] bg-indigo-500",
                                        first ? "rounded-br-[30px]" :
                                        middle ? "rounded-br-[30px] rounded-tr-[30px]" :
                                        last ? "rounded-tr-[30px]" : ""
                                    )}
                                >
                                    <p className="text-white text-[15px]">{message?.content}</p>
                                </div>

                                {
                                    message?.messageReaders &&
                                    room?.roomType === "normal" ? <ReadedNormal /> :
                                    room?.roomType === "group" && <ReadedGroup />
                                }
                            </div>
                        )
                    })
                }
            </div>
        </li>
    )
}