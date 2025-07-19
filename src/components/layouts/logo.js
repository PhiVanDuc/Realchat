"use client"

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Logo({ hiddenButton, width, height, className }) {
    return (
        <Link href="/">
            <div className={cn(
                "hover:opacity-75 transition items-center gap-x-[10px]",
                hiddenButton ? "flex" : "hidden md:flex"
            )}>
                <Image
                    src="/Logo.png"
                    alt="Logo"
                    width={width || 20}
                    height={height || 20}
                    priority={true}
                />

                <p className={cn(
                    "text-[18px] font-semibold text-neutral-700 pb-1",
                    className
                )}>
                    Realchat
                </p>
            </div>
        </Link>
    )
}
