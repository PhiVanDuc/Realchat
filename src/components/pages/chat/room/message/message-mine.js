"use client"

import { cn } from "@/lib/utils";
import MessageReaded from "./message-readed";

export default function MessageMine({ room, groupMessages }) {
    return (
        <li>
            {
                groupMessages?.messages.map((message, index) => {
                    const first = index === 0 && groupMessages?.messages?.length >= 2;
                    const middle = index > 0 && index < groupMessages?.messages?.length - 1 && groupMessages?.messages?.length >= 3;
                    const last = index === groupMessages?.messages?.length - 1 && groupMessages?.messages?.length >= 2;

                    return (
                        <div
                            key={message?.id}
                            className={cn(
                                "w-full flex flex-col items-end",
                                (index < groupMessages?.messages?.length - 1 && !message?.message_readers) ? "mb-[3px]" : ""
                            )}
                        >
                            <div
                                className={cn(
                                    "w-fit max-w-[90%] sm:max-w-[80%] p-[15px] py-[8px] rounded-[20px] bg-indigo-500",
                                    first ? "rounded-br-[4px]" :
                                    middle ? "rounded-br-[4px] rounded-tr-[4px]" :
                                    last ? "rounded-tr-[4px]" : ""
                                )}
                            >
                                <p className="text-white text-[14px] sm:text-[15px]">
                                    {message?.content}
                                </p>
                            </div>

                            {
                                (message?.message_readers && room?.room_type === "normal") && <MessageReaded className="my-[5px]" />
                            }
                        </div>
                    )
                })
            }
        </li>
    )
}