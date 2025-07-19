import { cn } from "@/lib/utils";
import Logo from "./logo";
import { Button } from "@/components/ui/button";

export default function Footer({ className }) {
    return (
        <div className={cn(
            "fixed bottom-0 w-full p-4 border-t bg-slate-100",
            className
        )}>
            <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
                <Logo />

                <div className="space-x-4 md:block md:w-auto flex flex-wrap items-center justify-between w-full">
                    <Button size="sm" variant="ghost">
                        Chính sách quyền riêng tư
                    </Button>

                    <Button size="sm" variant="ghost">
                        Điều khoản dịch vụ
                    </Button>
                </div>
            </div>
        </div>
    )
}
