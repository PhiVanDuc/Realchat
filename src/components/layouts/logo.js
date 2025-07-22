"use client"

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Logo({ width = 20, height = 20, wrapperClassName, textClassName }) {
    return (
        <Link href="/">
            <div className={cn(
                "hidden md:flex hover:opacity-75 transition items-center gap-x-[10px]",
                wrapperClassName
            )}>
                <Image
                    src="/Logo.png"
                    alt="Logo"
                    width={width || 20}
                    height={height || 20}
                    priority={true}
                    style={{ width: "auto", height: "auto" }}
                />

                <p className={cn(
                    "text-[18px] font-semibold text-neutral-700 pb-1",
                    textClassName
                )}>
                    Realchat
                </p>
            </div>
        </Link>
    )
}
