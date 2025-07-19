"use client"

import ReadedNormal from "../readed/readed-normal";

export default function MessageMine() {
    return (
        <li className="flex justify-end">
            <div className="w-fit flex flex-col items-start gap-y-[5px]">
                <div className="p-[12px] py-[8px] rounded-[10px] bg-indigo-500">
                    <p className="text-white text-[15px]">Tin nhắn của ô này</p>
                </div>

                <ReadedNormal />
            </div>
        </li>
    )
}
