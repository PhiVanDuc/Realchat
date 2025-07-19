import Link from "next/link";

import Logo from "./logo";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

export default function Navbar({ hiddenButton }) {
    return (
        <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
            <div className={cn(
                "md:max-w-screen-2xl mx-auto flex items-center w-full",
                hiddenButton ? "justify-start" : "justify-between"
            )}>
                <Logo hiddenButton={hiddenButton} />

                {
                    !hiddenButton && (
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
                    )
                }
            </div>
        </div>
    )
}
