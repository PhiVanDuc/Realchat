"use client"

import { useForm } from "react-hook-form";
import { useSession } from "@/hooks/useSession";
import useMessagesStore from "@/stores/messages";
import useRepliedMessageStore from "@/stores/replied-message";

import {
    Form,
    FormField,
    FormItem,
    FormControl
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { X } from "lucide-react";
import { RiSendPlaneFill } from "react-icons/ri";
import { createMessage } from "@/actions/message";

import { v4 } from "uuid";
import { toast } from "sonner";
import { cn } from "@/libs/utils";

export default function RoomFooter({ roomId }) {
    const session = useSession();
    const { addTempMessage, replaceTempMessage } = useMessagesStore();
    const { repliedMessage, setRepliedMessage } = useRepliedMessageStore();

    const form = useForm({
        defaultValues: { content: "" }
    });

    const handleSubmit = async (data) => {
        if (!data.content || data.content === "") return;

        const copyRepliedMessage = repliedMessage;
        const tempId = v4();

        addTempMessage({
            id: tempId,
            room_id: roomId,
            session,
            content: data.content,
            replied_message_id: copyRepliedMessage.id,
            replied_message: copyRepliedMessage
        });

        form.reset();
        setRepliedMessage({});

        const result = await createMessage({
            ...data,
            tempId,
            roomId,
            ...(copyRepliedMessage.id ? { repliedMessageId: copyRepliedMessage.id } : {})
        });

        if (!result.success) toast.warning(result.message);
        else replaceTempMessage(result.data || {});
    }

    return (
        <Form {...form}>
            <form
                autoComplete="off"
                onSubmit={form.handleSubmit(handleSubmit)}
                className={cn(
                    "px-[20px] py-[15px]",
                    repliedMessage.id ? "border-t border-neutral-200" : ""
                )}
            >
                {
                    repliedMessage.id &&
                    (
                        <div className="flex items-start justify-between mb-[15px]">
                            <div className="space-y-[2px]">
                                <p className="text-[15px] text-neutral-700 font-medium one-line">
                                    Bạn đang phản hồi { repliedMessage?.sender?.id === session?.data?.id ? "chính mình" : repliedMessage.sender.display_name }.
                                </p>
                                <p className="text-[13px] one-line">{repliedMessage.content}</p>
                            </div>

                            <button
                                type="button"
                                className="flex items-center justify-center w-[30px] aspect-square rounded-full bg-white hover:bg-neutral-200 transition-colors cursor-pointer"
                                onClick={() => { setRepliedMessage({}) }}
                            >
                                <X size={15} />
                            </button>
                        </div>
                    )
                }

                <div className="flex items-center gap-[15px]">
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => {
                            return (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input
                                            placeholder="Aa . . . "
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )
                        }}
                    />

                    <button type="submit" className="shrink-0 cursor-pointer">
                        <RiSendPlaneFill size={25} className="text-indigo-500 hover:text-indigo-600 transition-colors" />
                    </button>
                </div>
            </form>
        </Form>
    )
}