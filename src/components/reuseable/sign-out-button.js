"use client"

import { useRouter } from "next/navigation";
import { useSocket } from "@/providers/socket-provider";

import { Button } from "@/components/ui/button";
import { signOut } from "@/actions/auth";

export default function SignOutButton({ className = "", size = "sm" }) {
    const { socket } = useSocket();
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut();
        
        if (socket) socket.disconnect();
        router.push("/sign-in");
    }

    return (
        <Button
            size={size}
            variant="outline"
            onClick={handleSignOut}
            className={className}
        >
            Đăng xuất
        </Button>
    )
}
