"use client"

import Logo from "@/components/layouts/logo";
import ToggleSidebarButton from "@/components/reuseable/toggle-sidebar-button";

export default function Chat() {
    return (
        <section className="relative xl:pl-[480px] xl:py-[20px] xl:pr-[20px] w-full items-stretch transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 flex xl:hidden justify-end p-[20px]">
                <ToggleSidebarButton />
            </div>

            <div className="flex flex-col items-center justify-center gap-[10px] rounded-[12px] bg-white h-full">
                <Logo
                    width={30}
                    height={30}
                    className="text-[22px]"
                    hiddenButton={true}
                />
                <p className="text-[16px] text-neutral-400 font-medium">Chào mừng bạn đến với phần chat.</p>
            </div>
        </section>
    )
}