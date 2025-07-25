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

import { v4 } from "uuid";
import { toast } from "sonner";
import getUserInfo from "@/utils/get-user-info";
import { createRoomMessage } from "@/actions/chat";
import replaceTempMessage from "@/utils/replace-temp-message";

export default function RoomForm({
    params,
    setMessages
}) {
    const form = useForm({
        defaultValues: {
            content: "",
            repliedMessageId: ""
        }
    });

    const onSubmit = async (data) => {
        const useInfo = await getUserInfo();

        const tempId = v4();
        const tempMessage = {
            id: tempId,
            sender: {
                id: useInfo?.info?.id,
                fullName: useInfo?.info?.fullName,
                avatar: useInfo?.info?.avatar
            },
            content: data.content,
            isTemp: true
        }

        setMessages((state) => [...state, tempMessage]);
        form.reset();

        const result = await createRoomMessage({
            ...data,
            tempId,
            roomId: params?.roomId
        });

        if (result?.success) setMessages((state) => replaceTempMessage(result?.data, state));
        else toast.error(result?.message);
    }

    return (
        <Form {...form}>
            <form
                autoComplete="off"
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full p-[15px] flex items-center gap-[10px] transition-all"
            >
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => {
                        return (
                            <FormItem className="w-full">
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
    )
}