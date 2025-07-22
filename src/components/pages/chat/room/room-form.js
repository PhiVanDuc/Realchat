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

import { createRoomMessage } from "@/actions/chat-normal";
import { toast } from "sonner";

export default function RoomForm({ params }) {
    const [submitting, setSubmitting] = useState();

    const form = useForm({
        defaultValues: {
            content: "",
            repliedMessageId: ""
        }
    });

    const onSubmit = async (data) => {
        if (submitting) return;

        setSubmitting(true);
        const result = await createRoomMessage({
            ...data,
            roomId: params?.roomId
        });
        setSubmitting(false);

        if (result?.success) {
            form.reset();
            return;
        }
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