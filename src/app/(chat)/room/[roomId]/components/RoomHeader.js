"use client"

import { useEffect, useState } from "react";
import useSocketStore from "@/stores/socket";
import useSidebarExpandStore from "@/stores/sidebar-expand";

import Link from "next/link";
import Image from "next/image";
import Error from "@/components/reuses/Error";
import OnlineStatus from "@/components/reuses/OnlineStatus";
import RoomHeaderLoading from "./loading/RoomHeaderLoading";

import { Menu } from "lucide-react";
import { IoIosExit } from "react-icons/io";

import { partnerMessage } from "@/actions/message";
import onlineStatus from "@/utils/online-status";

export default function RoomHeader({ roomId }) {
    const { onlineUsers } = useSocketStore();
    const { sidebarExpand, setSidebarExpand } = useSidebarExpandStore();

    const [partner, setPartner] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(undefined);
    
    const isOnline = onlineStatus(onlineUsers, partner.id);

    useEffect(() => {
        (async () => {
            const { status, result } = await partnerMessage(roomId);

            if (!result.success) setError(`${status},${result.message}`);
            else setPartner(result.data);

            setLoading(false);
        })();

        return () => {
            setPartner({});
            setLoading(true);
            setError(undefined);
        }
    }, []);

    return (
        <div className="flex items-center justify-between p-[20px] py-[15px] border-b border-neutral-200">
            {
                loading ?
                (<RoomHeaderLoading />) :
                error ?
                (<Error message={error} className="p-0" />) :
                (
                    <div className="flex items-center gap-[15px]">
                        <div className="relative shrink-0 w-[50px] aspect-square rounded-full bg-slate-300">
                            <OnlineStatus accountId={partner?.id} />

                            {
                                partner.avatar &&
                                (
                                    <Image
                                        src={partner.avatar}
                                        alt="Avatar"
                                        fill
                                        size="50"
                                        className="rounded-full object-cover object-center"
                                    />
                                )
                            }
                        </div>

                        <div className="flex flex-col gap-[1px]">
                            <h3 className="text-[16px] text-neutral-700 font-semibold one-line">{partner.display_name}</h3>
                            <p className="text-[13px] text-neutral-400">{ isOnline ? "Trực tuyến" : "Ngoại tuyến" }</p>
                        </div>
                    </div>
                )
            }

            <div className="flex gap-[5px]">
                <Link
                    href="/"
                    className="group flex items-center justify-center w-[30px] sm:w-[40px] aspect-square rounded-[10px] rotate-180 bg-neutral-100 cursor-pointer"
                >
                    <IoIosExit size={18} className="text-neutral-400 group-hover:text-neutral-500 transition-colors" />
                </Link>

                <button
                    className="group flex lg:hidden items-center justify-center w-[30px] sm:w-[40px] aspect-square rounded-[10px] cursor-pointer"
                    onClick={() => { setSidebarExpand(!sidebarExpand) }}
                >
                    <Menu size={18} className="text-neutral-400 group-hover:text-neutral-500 transition-colors"/>
                </button>
            </div>
        </div>
    )
}
