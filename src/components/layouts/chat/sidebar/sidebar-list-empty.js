"use client"

export default function SidebarListEmpty({ sidebarType }) {
    return (
        <p className="pt-[20px] text-center text-[15px] text-neutral-400">
            {
                sidebarType === "users" ? "Hiện không có người dùng." :
                sidebarType === "normal" ? "Hiện không có tin nhắn nào." :
                "Hiện không có nhóm nào."
            }
        </p>
    )
}
