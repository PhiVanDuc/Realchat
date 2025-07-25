"use client"

import React, { useEffect, useRef, useState } from "react";

import MessageOwn from "./message/message-own";
import Error from "@/components/reuseable/error";
import MessagePartner from "./message/message-partner";
import RoomChatLoading from "./loading/room-chat-loading";

import { getRoomMessages } from "@/actions/chat-normal";

export default function RoomChat({
    params,
    messages,
    setMessages
}) {
    const bottomRef = useRef(null);
    const nearBottomRef = useRef(true);
    const firstLoadedRef = useRef(false);

    const [accountId, setAccountId] = useState("");
    const [pagination, setPagination] = useState({ page: 1, hasNextPage: false });

    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const [isFetchMore, setIsFetchMore] = useState(false);
    const [remainFetchMore, setRemainFetchMore] = useState(false);

    console.log(messages);

    // Lấy tin nhắn
    useEffect(() => {
        let waitFirstLoaded;

        (async () => {
            const { status, result, accountId } = await getRoomMessages({ roomId: params?.roomId, page: pagination?.page });

            if (!result?.success) setError(`${status},${result?.message}`);
            else {
                setAccountId(accountId);
                setMessages(result?.data?.messages);
                setPagination({ page: result?.data?.page, hasNextPage: result?.data?.hasNextPage });
            }

            setLoading(false);
            setTimeout(() => { firstLoadedRef.current = true }, 500);
        })();

        return () => { if (waitFirstLoaded) clearTimeout(waitFirstLoaded) }
    }, []);

    useEffect(() => {
        if (loading || messages?.length === 0 || !bottomRef.current) return;

        if (remainFetchMore) setRemainFetchMore(false);
        if (!firstLoadedRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "auto" });
            return;
        }
        
        const lastMessage = messages?.[messages.length - 1];
        if (!lastMessage) return;

        if (lastMessage?.sender?.id === accountId || nearBottomRef.current) bottomRef.current.scrollIntoView({ behavior: "auto" });
    }, [loading, messages])

    // Lấy thêm tin nhắn khi cuộn lên đầu trang
    const handleOnScroll = async (e) => {
        const element = e.target;
        const isOnTop = element.scrollTop === 0;

        const distanceToBottom = element.scrollHeight - element.scrollTop - element.clientHeight;
        nearBottomRef.current = distanceToBottom < 250;

        if (loading || !firstLoadedRef.current || !pagination?.hasNextPage || isFetchMore || error || !isOnTop) return;

        setIsFetchMore(true);

        setTimeout(async () => {
            const previousScrollHeight = element.scrollHeight;
            const { status, result } = await getRoomMessages({ roomId: params?.roomId, page: pagination?.page + 1 });

            if (!result?.success) setError(`${status},${result?.message}`);
            else {
                setMessages([...result?.data?.messages, ...messages]);
                setPagination({ page: result?.data?.page, hasNextPage: result?.data?.hasNextPage });
                setRemainFetchMore(true);
            }

            requestAnimationFrame(() => {
                const newScrollHeight = element.scrollHeight;
                const scrollDiff = newScrollHeight - previousScrollHeight;
                element.scrollTop = scrollDiff;
            });
            
            setIsFetchMore(false);
        }, 1000);
    }

    if (loading) return <div className="flex-1 w-full px-[15px] pt-[30px] overflow-y-auto"><RoomChatLoading /></div>
    if (error) return <div className="flex-1 w-full px-[15px] pt-[30px] overflow-y-auto"><Error message={error} /></div>

    return (
        <div className="flex-1 flex flex-col overflow-y-auto">
            <ul
                className="flex-1 px-[15px] overflow-y-auto scrollbar-thin"
                onScroll={handleOnScroll}
            >
                <li className="h-[30px]">
                    {
                        isFetchMore && (
                            <div className="flex items-center justify-center gap-[10px] p-[10px]">
                                <p className="text-[15px] text-neutral-400 font-medium">Đang lấy thêm tin nhắn</p>
                                <div className="w-[16px] h-[16px] border-3 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )
                    }
                </li>

                {
                    messages?.length === 0 ?
                    (
                        <li className="w-full flex justify-center">
                            <p className="bg-neutral-200 text-[14px] text-neutral-600 font-medium px-[20px] py-[8px] rounded-full">Bắt đầu cuộc trò chuyện</p>
                        </li>
                    ) :
                    (
                        messages.map((message, index) => {
                            const isPartner = message?.sender?.id !== accountId;

                            const prev = messages[index - 1];
                            const next = messages[index + 1];

                            const isPrevSameSender = prev?.sender?.id === message?.sender?.id;
                            const isNextSameSender = next?.sender?.id === message?.sender?.id;

                            let position = "single";
                            if (isPrevSameSender && isNextSameSender) position = "middle";
                            else if (!isPrevSameSender && isNextSameSender) position = "first";
                            else if (isPrevSameSender && !isNextSameSender) position = "last";

                            if (isPartner) return <MessagePartner key={message?.id} message={message} position={position} showAvatar={!isNextSameSender} />
                            else return <MessageOwn key={message?.id} message={message} position={position} />
                        })
                    )
                }

                <li ref={bottomRef} />
            </ul>
        </div>
    )
}