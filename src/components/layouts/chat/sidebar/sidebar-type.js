"use client"

import { useRouter } from "next/navigation";

import Image from "next/image";

import { FaUser } from "react-icons/fa";
import { IoIosExit } from "react-icons/io";
import { FaUserGroup } from "react-icons/fa6";
import { BiSolidMessageDetail } from "react-icons/bi";
import ToggleSidebarButton from "@/components/reuseable/toggle-sidebar-button";

import { cn } from "@/lib/utils";

const types = [
    {
        icon: FaUser,
        type: "users",
        size: 18
    },
    {
        icon: BiSolidMessageDetail,
        type: "normal",
        size: 20
    },
    {
        icon: FaUserGroup,
        type: "group",
        size: 20
    }
]

export default function SidebarType({ userInfo, sidebarType, setSidebarType }) {
    const router = useRouter();

    return (
        <section className="order-2 xl:order-1 xl:p-[20px] border-t border-neutral-200 xl:border-t-0 self-stretch flex flex-col">
            <div className="flex flex-row xl:flex-col justify-between sm:justify-center xl:justify-start px-[20px] xl:px-0 py-[20px] gap-[20px] xl:gap-[10px]">
                {
                    types.map(type => {
                        return (
                            <button
                                key={type.type}
                                type="button"
                                className={cn(
                                    "flex items-center justify-center text-neutral-500 w-[40px] aspect-square rounded-[8px] transition-color duration-500 cursor-pointer",
                                    sidebarType === type.type ? "bg-neutral-200 xl:bg-white" : "hover:bg-neutral-200 xl:hover:bg-white"
                                )}
                                onClick={() => {
                                    setSidebarType(type.type);
                                    if (type.type === "exit") router.push("/");
                                }}
                            >
                                <type.icon
                                    size={type.size}
                                />
                            </button>
                        )
                    })
                }

                <button
                    type="button"
                    className="flex items-center justify-center text-neutral-500 w-[40px] aspect-square rounded-[8px] transition-color duration-500 hover:bg-neutral-200 xl:hover:bg-white cursor-pointer"
                    onClick={() => { router.push("/") }}
                >
                    <IoIosExit
                        size={20}
                    />
                </button>

                <ToggleSidebarButton className="w-[40px]" />
            </div>

            <div className="flex-1 hidden xl:flex items-end">
                <div className="relative w-[40px] aspect-square rounded-full bg-slate-300">
                    <Image
                        src={userInfo?.info?.avatar}
                        alt={`Avatar ${userInfo?.info?.fullName}`}
                        fill={40}
                        size="40"
                        className="object-center object-cover rounded-full outline-[4px] outline-white outline-offset-0 hover:opacity-80 transition-all cursor-pointer"
                    />
                </div>
            </div>
        </section>
    )
}