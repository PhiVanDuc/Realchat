"use client"

import React, { useEffect, useRef, useState } from "react";

import MessageOwn from "./message/message-own";
import Error from "@/components/reuseable/error";
import MessagePartner from "./message/message-partner";
import RoomChatLoading from "./loading/room-chat-loading";

import { Virtuoso } from "react-virtuoso";
import { getRoomMessages } from "@/actions/chat";

export default function RoomChat({
    params,
    messages,
    setMessages
}) {
    const virtuosoRef = useRef();
    const initialLoaded = useRef(false);

    const [accountId, setAccountId] = useState("");
    const [pagination, setPagination] = useState({ page: 1, hasNextPage: false });

    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const [firstItemIndex, setFirstItemIndex] = useState(1000000000);
    const [isFetchMore, setIsFetchMore] = useState(false);
    const [remainFetchMore, setRemainFetchMore] = useState(false);

    // Lấy tin nhắn
    useEffect(() => {
        let waitInitialLoaded;

        (async () => {
            const { status, result, accountId } = await getRoomMessages({ roomId: params?.roomId, page: pagination?.page });

            if (!result?.success) setError(`${status},${result?.message}`);
            else {
                setAccountId(accountId);
                setMessages(result?.data?.messages);
                setPagination({ page: result?.data?.page, hasNextPage: result?.data?.hasNextPage });
            }

            setLoading(false);
            waitInitialLoaded = setTimeout(() => { initialLoaded.current = true }, 1000);
        })();
        return () => { if (waitInitialLoaded) clearTimeout(waitInitialLoaded) }
    }, []);

    useEffect(() => {
        const count = messages?.length;
        const lastMessage = messages?.[messages.length - 1];

        if (loading || messages?.length === 0 || !virtuosoRef.current || !lastMessage) return;

        if (remainFetchMore) setRemainFetchMore(false);
        if (!initialLoaded.current) virtuosoRef.current.scrollToIndex({ index: count });
    }, [loading, messages]);

    // Lấy thêm tin nhắn
    const handleGetMoreMessages = (atTop) => {
        if (!atTop || !pagination.hasNextPage || !initialLoaded.current || loading || isFetchMore) return;

        setIsFetchMore(true);
        setTimeout(async () => {
            const { status, result } = await getRoomMessages({ roomId: params?.roomId, page: pagination?.page + 1 });

            if (!result?.success) setError(`${status},${result?.message}`);
            else {
                const newMessages = result?.data?.messages;
                const count = newMessages?.length;
                setMessages(prev => [...newMessages, ...prev]);
                setPagination({ page: result?.data?.page, hasNextPage: result?.data?.hasNextPage });
                setFirstItemIndex(prev => prev - count);
            }

            setIsFetchMore(false);
            setRemainFetchMore(true);
        }, 1500);
    }

    // Chuẩn bị trước các tin nhắn cần render
    const generateMessageItem = (index, message) => {
        const realIndex = index - firstItemIndex;
        const isPartner = message?.sender?.id !== accountId;

        const prev = messages[realIndex - 1];
        const next = messages[realIndex + 1];

        const isPrevSameSender = prev?.sender?.id === message?.sender?.id;
        const isNextSameSender = next?.sender?.id === message?.sender?.id;

        let position = "single";
        if (isPrevSameSender && isNextSameSender) position = "middle";
        else if (!isPrevSameSender && isNextSameSender) position = "first";
        else if (isPrevSameSender && !isNextSameSender) position = "last";

        if (isPartner) return <MessagePartner key={message?.id} message={message} position={position} showAvatar={!isNextSameSender} />
        else return <MessageOwn key={message?.id} message={message} position={position} />
    }

    if (loading) return <div className="flex-1 w-full px-[15px] pt-[30px] overflow-y-auto"><RoomChatLoading /></div>
    if (error) return <div className="flex-1 w-full px-[15px] pt-[30px] overflow-y-auto"><Error message={error} /></div>

    return (
        <div className="flex-1 flex flex-col">
            <Virtuoso
                ref={virtuosoRef}
                style={{ height: "100%" }}
                data={messages}
                firstItemIndex={firstItemIndex}
                itemContent={(index, message) => generateMessageItem(index, message)}
                atTopStateChange={handleGetMoreMessages}
                increaseViewportBy={{ top: 600, bottom: 300 }}
                followOutput="auto"
                className="scrollbar-thin"
                components={{
                    Header: () => (
                        <div className="min-h-[20px]">
                            {
                                isFetchMore && (
                                    <div className="flex items-center justify-center gap-[10px] p-[10px]">
                                        <p className="text-[15px] text-neutral-400 font-medium">Đang lấy thêm tin nhắn</p>
                                        <div className="w-[16px] h-[16px] border-3 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                )
                            }
                        </div>
                    )
                }}
            />
        </div>
    )
}