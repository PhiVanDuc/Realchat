"use client"

import Image from "next/image";
import OnlineStatus from "@/components/reuseable/online-status";

import { cn } from "@/lib/utils";

export default function MessagePartner({ accountId, groupMessages }) {
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

            <div className="w-full space-y-[3px]">
                {
                    groupMessages?.messages.map((message, index) => {
                        const first = index === 0 && groupMessages?.messages?.length >= 2;
                        const middle = index > 0 && index < groupMessages?.messages?.length - 1 && groupMessages?.messages?.length >= 3;
                        const last = index === groupMessages?.messages?.length - 1 && groupMessages?.messages?.length >= 2;

                        return (
                            <div
                                key={message?.id}
                                className={cn(
                                    "w-fit max-w-[90%] sm:max-w-[80%] p-[15px] py-[8px] rounded-[20px] bg-neutral-200",
                                    first ? "rounded-bl-[4px]" :
                                    middle ? "rounded-bl-[4px] rounded-tl-[4px]" :
                                    last ? "rounded-tl-[4px]" : ""
                                )}
                            >
                                <p className="text-neutral-700 sm:text-neutral-800 text-[14px] sm:text-[15px]">{message?.content}</p>
                            </div>
                        )
                    })
                }
            </div>
        </li>
    )
}