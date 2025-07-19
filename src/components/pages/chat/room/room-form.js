"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";

import {
    Form,
    FormField,
    FormItem,
    FormControl
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { FaImage } from "react-icons/fa6";
import { FaUpload } from "react-icons/fa6";
import { IoFileTrayFull } from "react-icons/io5";

import { cn } from "@/lib/utils";

export default function RoomForm() {
    const form = useForm({
        defaultValues: {
            text: "",
            image: null,
            file: null
        }
    });

    const [isDragging, setIsDragging] = useState(false);
    const [dragCount, setDragCount] = useState(0);

    const handleDragEnter = () => {
        setDragCount((prev) => {
            if (prev === 0) setIsDragging(true)
            return prev + 1
        })
    }

    const handleDragLeave = () => {
        setDragCount((prev) => {
            const next = prev - 1
            if (next === 0) setIsDragging(false)
            return next
        })
    }

    return (
        <div
            className="relative p-[15px] w-full flex items-center gap-[10px] transition-all"
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
        >
            {/* Giao diện khi kéo file vào */}
            <div className={cn(
                "absolute inset-0 flex justify-center items-center transition-all duration-500",
                !isDragging ? "opacity-0 z-[-1]" : "opacity-100 z-[2]"
            )}>
                <span className="absolute inset-0 bg-black/50 rounded-[10px]" />

                <div className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] flex items-center gap-[15px]">
                    <FaUpload
                        size={20}
                        className="text-white"
                    />
                    <p className="text-[15px] font-medium text-white">Tải tệp tin lên</p>
                </div>
            </div>

            <div className="flex items-center">
                <div className="w-[45px] aspect-square rounded-[10px] flex items-center justify-center cursor-pointer hover:bg-neutral-100 transition duration-300">
                    <IoFileTrayFull
                        size={22}
                        className="text-indigo-500"
                    />
                </div>

                <div className="w-[45px] aspect-square rounded-[10px] flex items-center justify-center cursor-pointer hover:bg-neutral-100 transition duration-300">
                    <FaImage
                        size={22}
                        className="text-indigo-500"
                    />
                </div>
            </div>
            
            <Form {...form}>
                <form
                    autoComplete="off"
                    className="w-full"
                >
                    <FormField
                        control={form.control}
                        name="text"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Aa . . ."
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )
                        }}
                    />
                </form>
            </Form>

            <div></div>
        </div>
    )
}