"use client"

import Image from "next/image";
import OnlineStatus from "@/components/reuseable/online-status";

import { cn } from "@/lib/utils";

export default function MessagePartner({ accountId, room, groupMessages }) {
    return (
        <li className="flex gap-[15px] items-stretch">
            <div className="self-stretch flex items-end">
                <div className="relative shrink-0 w-[40px] aspect-square rounded-full bg-slate-300">
                    {
                        groupMessages?.sender?.avatar ?
                        (
                            <Image
                                src={groupMessages?.sender?.avatar}
                                alt={`Avatar ${groupMessages?.sender?.full_name}`}
                                fill
                                sizes='40'
                                className='object-center object-cover rounded-full'
                            />
                        ) :
                        (<span className="block w-full aspect-square rounded-full bg-slate-300"/>)
                    }

                    <OnlineStatus
                        accountId={accountId}
                        className="w-[8px] outline-[3px]"
                    />
                </div>
            </div>

            <div className="w-fit space-y-[2px]">
                {
                    groupMessages?.messages.map((message, index) => {
                        const first = index === 0 && groupMessages?.messages?.length >= 2;
                        const middle = index > 0 && index < groupMessages?.messages?.length - 1 && groupMessages?.messages?.length >= 3;
                        const last = index === groupMessages?.messages?.length - 1 && groupMessages?.messages?.length >= 2;

                        return (
                            <div
                                key={message?.id}
                                className="w-fit flex flex-col items-end"
                            >
                                <div
                                    className={cn(
                                        "w-fit p-[15px] py-[10px] rounded-[99px] bg-neutral-200",
                                        first ? "rounded-bl-[30px]" :
                                        middle ? "rounded-bl-[30px] rounded-tl-[30px]" :
                                        last ? "rounded-tl-[30px]" : ""
                                    )}
                                >
                                    <p className="text-neutral-800 text-[15px]">{message?.content}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </li>
    )
}