"use client"

import { useRouter } from "next/navigation";

import { IoIosExit } from "react-icons/io";
import { FaUserGroup } from "react-icons/fa6";
import { BiSolidMessageDetail } from "react-icons/bi";
import ToggleSidebarButton from "@/components/reuseable/toggle-sidebar-button";

import { cn } from "@/lib/utils";

const types = [
    {
        icon: BiSolidMessageDetail,
        type: "normal"
    },
    {
        icon: FaUserGroup,
        type: "group"
    }
]

export default function SidebarType({ chatType, setChatType }) {
    const router = useRouter();

    return (
        <section className="order-2 xl:order-1 xl:p-[20px] border-t border-neutral-200 xl:border-t-0 self-stretch">
            <div className="flex flex-row xl:flex-col justify-between sm:justify-center xl:justify-start px-[20px] xl:px-0 py-[20px] gap-[20px] xl:gap-[5px]">
                {
                    types.map(type => {
                        return (
                            <button
                                key={type.type}
                                type="button"
                                className={cn(
                                    "flex items-center justify-center text-neutral-500 w-[40px] aspect-square rounded-[8px] transition-color duration-500 cursor-pointer",
                                    chatType === type.type ? "bg-neutral-200 xl:bg-white" : "hover:bg-neutral-200 xl:hover:bg-white"
                                )}
                                onClick={() => {
                                    setChatType(type.type);
                                    if (type.type === "exit") router.push("/");
                                }}
                            >
                                <type.icon
                                    size={20}
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
        </section>
    )
}