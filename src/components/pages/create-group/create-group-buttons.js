"use client"

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function CreateGroupButtons() {
    const router = useRouter();

    const handleCreateGroup = () => {}

    const handleExit = () => {
        router.push("/chat");
    }

    return (
        <div className="flex items-center gap-[10px] p-[15px] border-t border-neutral-200">
            <Button
                className="flex-1"
                onClick={handleCreateGroup}
            >
                Tạo nhóm
            </Button>

            <Button
                variant="outline"
                onClick={handleExit}
            >
                Thoát
            </Button>
        </div>
    )
}
