"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Logo from "@/components/layouts/logo";
import { signInGoole } from "@/actions/auth";
import { toast } from "sonner";

export default function GoogleAuth() {
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const signedIn = await signInGoole();
            if (!signedIn) {
                router.replace("/sign-in");
                toast.error("Đăng nhập bằng Google thất bại!");
            }
            else router.replace("/");
        })();
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
            <section className="flex flex-col items-center justify-center gap-[10px]">
                <Logo
                    width={30}
                    height={30}
                    wrapperClassName="flex"
                    textClassName="text-[22px]"
                />

                <div className="flex items-center gap-[10px]">
                    <p className="text-[15px] text-neutral-400 font-medium">Đang xử lý đăng nhập Google</p>
                    <div className="w-[16px] h-[16px] border-3 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </section>
        </div>
    )
}
