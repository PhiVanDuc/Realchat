"use client"

import { FcGoogle } from "react-icons/fc";

export default function AuthGoogleButton() {
    const handleAuthGoogle = () => {}

    return (
        <button
            className="flex items-center justify-center gap-[15px] px-[15px] py-[12px] w-full bg-neutral-100 rounded-[10px] cursor-pointer transition-colors"
            onClick={handleAuthGoogle}
        >
            <p className="text-[14px] sm:text-[15px] text-neutral-600">Đăng nhập với Google</p>
            <FcGoogle size={25} />
        </button>
    )
}
