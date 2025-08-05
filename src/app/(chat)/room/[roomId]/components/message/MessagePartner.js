"use client"

import useRepliedMessageStore from "@/stores/replied-message";

import Image from "next/image";
import OnlineStatus from "@/components/reuses/OnlineStatus";

import { FaReply } from "react-icons/fa6";

import { cn } from "@/libs/utils";
import bubbleMessages from "@/utils/bubble-messages";

export default function MessagePartner({
    message: { id, content, sender_id, sender, replied_message_id, replied_message },
    position, isPartner, showAvatar
}) {
    const { setRepliedMessage } = useRepliedMessageStore();
    const { wrapper, messageBox } = bubbleMessages(position, isPartner);

    const handleChooseRepliedMessage = () => {
        setRepliedMessage({
            id,
            content,
            sender
        })
    }

    return (
        <li className={cn(
            "group flex items-end gap-[10px] pl-[20px]",
            wrapper
        )}>
            {
                showAvatar ?
                (
                    <div className="wrapper-avatar">
                        {
                            sender?.avatar &&
                            (
                                <Image
                                    src={sender.avatar}
                                    alt="Avatar"
                                    fill
                                    size="39"
                                    className="object-center object-cover rounded-full"
                                />
                            )
                        }

                        <OnlineStatus className="w-[8px]" accountId={sender_id} />
                    </div>
                ) :
                (
                    <div className="shrink-0 w-[39px] h-[1px]"></div>
                )
            }
            
            <div className="w-full">
                {
                    replied_message_id && (
                        <div className={cn(
                            "max-w-[70%]",
                            ["middle", "last"].includes(position) ? "pt-[7px]" : ""
                        )}>
                            <p className="text-[13px] text-neutral-400 mb-[3px]">
                                {
                                    replied_message.sender.id === sender_id ? "Trả lời chính mình." : "Trả lời bạn."
                                }
                            </p>
                            <p className="replied-message-box bg-indigo-300 text-white">
                                {replied_message.is_deleted ? "Đã bị xóa." : replied_message.content}
                            </p>
                        </div>
                    )
                }
                
                <div className="flex items-center gap-[5px]">
                    <p className={cn(
                            "message-box text-neutral-700 bg-neutral-200 max-w-[75%]",
                            messageBox
                        )}>
                            {content}
                        </p>

                    <button
                        type="button"
                        className="hidden group-hover:flex group/button w-[30px] aspect-square rounded-full items-center justify-center bg-white hover:bg-neutral-100 cursor-pointer transition-colors"
                        onClick={handleChooseRepliedMessage}
                    >
                        <FaReply
                            size={14}
                            className="text-neutral-400 group-hover/button:text-neutral-500"
                        />
                    </button>
                </div>
            </div>
        </li>
    )
}