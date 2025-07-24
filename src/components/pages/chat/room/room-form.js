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
import { createRoomMessage } from "@/actions/chat-normal";
import { connectMessage, replaceTempMessage } from "@/utils/group-messages";

export default function RoomForm({
    params,
    setMessages
}) {
    const [submitting, setSubmitting] = useState(false);

    const form = useForm({
        defaultValues: {
            content: "",
            repliedMessageId: ""
        }
    });

    const onSubmit = async (data) => {
        const useInfo = await getUserInfo();
        if (submitting) return;

        // Xử lý việc tin nhắn tạm thời
        const tempId = v4();

        const prepareData = {
            sender: {
                id: useInfo?.info?.id,
                fullName: useInfo?.info?.fullName,
                avatar: useInfo?.info?.avatar
            },
            messages: [{
                id: tempId,
                content: form.getValues("content"),
                isTemp: true
            }]
        };
        
        setMessages((state) => connectMessage(prepareData, state));
        form.reset();
        // Kết thúc

        setSubmitting(true);
        const result = await createRoomMessage({
            ...data,
            tempId: tempId,
            roomId: params?.roomId
        });
        setSubmitting(false);

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