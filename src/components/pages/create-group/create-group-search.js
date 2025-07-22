"use client"

import { Input } from "@/components/ui/input";
import SelectedMemberitem from "./selected-member-item";

import { Search } from "lucide-react";

export default function CreateGroupSearch() {
    return (
        <div className="space-y-[15px] p-[15px]">
            <div className="flex overflow-x-auto hidden-scroll min-[600px]:overflow-x-hidden min-[600px]:flex-wrap items-center gap-[5px] border-neutral-200">
                <p className="shrink-0 text-[15px] text-neutral-600 font-medium">Thành viên:</p>

                <SelectedMemberitem />
                <SelectedMemberitem />
                <SelectedMemberitem />
            </div>

            <div className="relative">
                <Search
                    size={20}
                    className="absolute top-[50%] translate-y-[-50%] left-[10px] text-neutral-400"
                />

                <Input
                    placeholder="Tìm kiếm thành viên . . ."
                    className="pl-[40px]"
                />
            </div>
        </div>
    )
}
