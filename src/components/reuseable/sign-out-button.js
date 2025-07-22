"use client"

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { signOut } from "@/actions/auth";

export default function SignOutButton({ className = "", size = "sm" }) {
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut();
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
