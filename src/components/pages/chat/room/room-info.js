"use client"

import { useEffect, useState } from "react";
import { useSocket } from "@/providers/socket-provider";

import Image from "next/image";
import RoomAccountLoading from "./loading/room-account-loading";
import OnlineStatus from "@/components/reuseable/online-status";
import ToggleSidebarButton from "@/components/reuseable/toggle-sidebar-button";

import { getRoomMembers } from "@/actions/chat";
import Error from "@/components/reuseable/error";

export default function RoomInfo({ params }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [partner, setPartner] = useState({});

    const { onlineUsers } = useSocket();
    const isOnline = onlineUsers.find(user => user === partner?.id);

    useEffect(() => {
        (async () => {
            const { status, result, accountId } = await getRoomMembers(params?.roomId);

            if (result?.success) {
                const partner = result?.data?.find(member => member?.id !== accountId);
                setPartner(partner);
            }
            else setError(`${status},${result?.message}`)

            setLoading(false);
        })();
    }, []);

    if (error) return <Error message={error} />

    return (
        <div className="w-full p-[15px] flex items-center justify-between gap-[15px] border-b border-neutral-200">
            {
                loading ? 
                (
                    <RoomAccountLoading />
                ) :
                (
                    <div className="flex items-center gap-[15px]">
                        {
                            partner?.avatar ?
                            (
                                <div className='shrink-0 relative w-[50px] aspect-square rounded-full bg-neutral-300'>
                                    <Image
                                        src={partner?.avatar}
                                        alt={`Avatar ${partner?.full_name}`}
                                        fill
                                        sizes='50'
                                        className='object-center object-cover rounded-full'
                                    />
                                    <OnlineStatus accountId={partner?.id} />
                                </div>
                            ) :
                            (<span className="shrink-0 w-[50px] aspect-square rounded-full bg-neutral-300" />)
                        }

                        <div>
                            <p className="text-[15px] text-neutral-600 font-semibold ellipsis-1-lines">{partner?.full_name}</p>
                            <p className="text-[13px] text-neutral-500 font-medium ellipsis-1-lines">
                                {isOnline ? "Đang hoạt động." : "Đã ngừng hoạt động."}
                            </p>
                        </div>
                    </div>
                )
            }

            <ToggleSidebarButton />
        </div>
    )
}