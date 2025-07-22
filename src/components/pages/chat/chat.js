"use client"

import Logo from "@/components/layouts/logo";
import ToggleSidebarButton from "@/components/reuseable/toggle-sidebar-button";

export default function Chat() {
    return (
        <section className="w-full flex-1">
            <div className="absolute top-0 left-0 right-0 flex xl:hidden justify-end p-[20px]">
                <ToggleSidebarButton />
            </div>

            <div className="flex flex-col items-center justify-center gap-[10px] rounded-[12px] bg-white h-full xl:border xl:border-neutral-200">
                <Logo
                    width={30}
                    height={30}
                    wrapperClassName="flex"
                    textClassName="text-[22px]"
                    hiddenButton={true}
                />
                <p className="px-[20px] text-[16px] text-center text-neutral-400 font-medium">Chào mừng bạn đến với giao diện chính thức.</p>
            </div>
        </section>
    )
}