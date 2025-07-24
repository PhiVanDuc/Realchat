"use client"

import { useExpandSidebar } from "@/providers/expand-sidebar-provider";

import Link from "next/link";
import Image from "next/image";
import OnlineStatus from "@/components/reuseable/online-status";
import { cn } from "@/lib/utils";

export default function SidebarRoomItem({ room, userInfo }) {
    const { setExpandSidebar } = useExpandSidebar();

    return (
        <li>
            <Link
                href={`/chat/${room?.id}`}
                className="relative flex items-center p-[15px] px-[10px] pr-[35px] gap-[10px] rounded-[10px] hover:bg-neutral-100 transition-colors duration-500 cursor-pointer"
                onClick={() => { setExpandSidebar(false); }}
            >
                {
                    room?.member?.avatar ?
                    (
                        <div className='shrink-0 relative w-[50px] aspect-square rounded-full bg-neutral-300'>
                            <Image
                                src={room?.member?.avatar}
                                alt={`Avatar ${room?.member?.full_name}`}
                                fill
                                sizes='50'
                                className='object-center object-cover rounded-full'
                            />
                            <OnlineStatus accountId={room?.member?.id}/>
                        </div>
                    ) :
                    (<span className="shrink-0 w-[50px] aspect-square rounded-full bg-neutral-300" />)
                }

                <div className="space-y-[1px] w-full">
                    <p className="text-[15px] text-neutral-600 font-semibold ellipsis-1-lines">{room?.member?.full_name}</p>
                    
                    <p className="text-[13px] text-neutral-600 font-semibold ellipsis-1-lines">
                        <span className={cn(
                            "text-neutral-400 font-medium",
                            room?.message?.sender_id === userInfo?.info?.id ? "inline" : "hidden"
                        )}>
                            Bạn:
                        </span> {room?.message?.content}
                    </p>
                </div>

                <span className="absolute top-[50%] translate-y-[-50%] right-[10px] inline-block w-[8px] aspect-square rounded-full bg-indigo-500" />
            </Link>
        </li>
    )
}
