import Link from "next/link";
import { Button } from "@/components/ui/button";

import Logo from "./logo";
import SignOutButton from "../reuseable/sign-out-button";

import { cn } from "@/lib/utils";
import getUserInfo from "@/utils/get-user-info";

export default async function Navbar({ className }) {
    const userInfo = await getUserInfo();

    return (
        <div className={cn(
            "fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center",
            className
        )}>
            <div className="md:max-w-screen-2xl mx-auto flex items-center justify-between w-full">
                <Logo />

                {
                    !userInfo.auth ?
                    (
                        <div className="space-x-4 md:block md:w-auto items-center justify-between w-full flex">
                            <Button size="sm" variant="outline" asChild>
                                <Link href="/sign-in">
                                    Đăng nhập
                                </Link>
                            </Button>

                            <Button size="sm" asChild>
                                <Link href="/sign-up">
                                    Trải nghiệm miễn phí
                                </Link>
                            </Button>
                        </div>
                    ) :
                    (
                        <div className="space-x-4 md:block md:w-auto items-center justify-between w-full flex">
                            <SignOutButton />

                            <Button size="sm" asChild>
                                <Link href="/chat">
                                    Bắt đầu trải nghiệm
                                </Link>
                            </Button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
