"use client"

import dynamic from "next/dynamic";
const RoomDeleteMessageDialog = dynamic(() => import('../dialog/RoomDeleteMessageDialog'), { ssr: false });

import { useState } from "react";
import useRepliedMessageStore from "@/stores/replied-message";

import MessageRead from "./MessageRead";
import MessageUploading from "./MessageUploading";

import { FaReply } from "react-icons/fa6";
import { PiTrashSimpleFill } from "react-icons/pi";

import { cn } from "@/libs/utils";
import bubbleMessages from "@/utils/bubble-messages";

export default function MessageOwn({
    message: { id, sender, content, replied_message_id, replied_message, is_read, is_temp },
    position,
    session,
    isLast
}) {
    const [open, setOpen] = useState();
    const { setRepliedMessage } = useRepliedMessageStore();
    const { wrapper, messageBox } = bubbleMessages(position);

    const handleChooseRepliedMessage = () => {
        setRepliedMessage({
            id,
            content,
            sender
        })
    }

    const handleOpenDialog = () => { setOpen(true) }

    return (
        <>
            <li className={cn(
                "group flex flex-col items-end pr-[20px]",
                wrapper
            )}>
                {
                    replied_message_id && (
                        <div className={cn(
                            "flex flex-col items-end max-w-[65%]",
                            ["middle", "last"].includes(position) ? "pt-[7px]" : ""
                        )}>
                            <p className="text-[13px] text-neutral-500 mb-[3px]">
                                Trả lời {replied_message.sender.id === session?.data?.id ? "chính mình" : replied_message.sender.display_name}.
                            </p>
                            
                            <p className={cn(
                                "replied-message-box bg-neutral-200 text-neutral-500",
                                replied_message.is_deleted ? "italic" : ""
                            )}>
                                {replied_message.is_deleted ? "Đã bị xóa." : replied_message.content}
                            </p>
                        </div>
                    )
                }

                <div className="w-full flex items-center justify-end gap-[5px]">
                    <div className="flex items-center gap-[5px]">
                        <button
                            type="button"
                            className="shrink-0 hidden group-hover:flex group/button w-[30px] aspect-square rounded-full items-center justify-center bg-white hover:bg-neutral-100 cursor-pointer transition-colors"
                            onClick={handleChooseRepliedMessage}
                        >
                            <FaReply
                                size={14}
                                className="text-neutral-400 group-hover/button:text-neutral-500"
                            />
                        </button>
                        
                        <button
                            type="button"
                            className="shrink-0 hidden group-hover:flex group/button w-[30px] aspect-square rounded-full items-center justify-center bg-white hover:bg-neutral-100 cursor-pointer transition-colors"
                            onClick={handleOpenDialog}
                        >
                            <PiTrashSimpleFill
                                size={14}
                                className="text-neutral-400 group-hover/button:text-neutral-500"
                            />
                        </button>
                    </div>

                    <p className={cn(
                        "message-box text-white bg-indigo-500 max-w-[70%]",
                        messageBox
                    )}>
                        {content}
                    </p>
                </div>

                { is_temp && <MessageUploading /> }
                { (is_read && isLast) && <MessageRead /> }
            </li>

            { open && <RoomDeleteMessageDialog open={open} setOpen={setOpen} messageId={id} sender={sender} /> }
        </>
    )
}