"use client"

import React, { useEffect, useRef, useState } from "react";

import MessageOwn from "./message/message-own";
import Error from "@/components/reuseable/error";
import MessagePartner from "./message/message-partner";
import RoomChatLoading from "./loading/room-chat-loading";

import { Virtuoso } from "react-virtuoso";
import { getRoomMessages } from "@/actions/chat-normal";

export default function RoomChat({
    params,
    messages,
    setMessages
}) {
    const virtuosoRef = useRef(null);
    const loadedRef = useRef(false);

    const [accountId, setAccountId] = useState("");
    const [pagination, setPagination] = useState({ page: 1, hasNextPage: false });

    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const [isGetMore, setIsGetMore] = useState(false);
    const [onTop, setOnTop] = useState(0);

    // Lấy tin nhắn
    useEffect(() => {
        let timeout;

        (async () => {
            const { status, result, accountId } = await getRoomMessages({ roomId: params?.roomId, page: pagination?.page });

            if (!result?.success) setError(`${status},${result?.message}`);
            else {
                setMessages(result?.data?.messages);
                setPagination({ page: result?.data?.page, hasNextPage: result?.data?.hasNextPage });
            }

            setLoading(false);
            setAccountId(accountId);

            timeout = setTimeout(() => {
                loadedRef.current = true;
            }, 1000);
        })();

        return () => {
            if (timeout) return clearTimeout(timeout);
        }
    }, []);

    // Quản lý scroll
    useEffect(() => {
        if (loading || isGetMore) return;

        if (onTop) {
            virtuosoRef.current.scrollToIndex({ index: onTop, align: 'start', behavior: 'auto' });
            setOnTop(0);
            return;
        }
        
        if (!loadedRef.current) {
            virtuosoRef.current.scrollToIndex({ index: messages?.length, align: 'end', behavior: 'auto' });
            return;
        }

        const lastMessage = messages?.[messages.length - 1];
        if (!lastMessage) return;

        if (lastMessage?.sender?.id === accountId) {
            virtuosoRef.current.scrollToIndex({ index: messages?.length, align: 'end', behavior: 'smooth' });
        }
    }, [messages]);

    // Lấy thêm tin nhắn
    const handleGetMoreMessages = async (atTop) => {
        const run = loadedRef.current && atTop && pagination?.hasNextPage && !isGetMore;
        if (!run) return;

        setIsGetMore(true);
        const { status, result } = await getRoomMessages({ roomId: params?.roomId, page: pagination?.page + 1 });

        if (!result?.success) setError(`${status},${error}`);
        else {
            const newMessages = result?.data?.messages;
            setOnTop(newMessages?.length - 1);
            setMessages([...newMessages, ...messages]);
            setPagination({ page: result?.data?.page, hasNextPage: result?.data?.hasNextPage });
        }

        setIsGetMore(false);
    }

    if (loading) return <div className="flex-1 w-full px-[15px] pt-[30px] overflow-y-auto"><RoomChatLoading /></div>
    if (error) return <div className="flex-1 w-full px-[15px] pt-[30px] overflow-y-auto"><Error message={error} /></div>

    return (
        <div className="flex-1">
            <Virtuoso
                ref={virtuosoRef}
                increaseViewportBy={400}
                style={{ height: "100%" }}
                className="scrollbar-thin"
                atTopStateChange={handleGetMoreMessages}
                data={messages}
                followOutput={false} 
                components={{
                    List: React.forwardRef(function VirtuosoList(props, ref) {
                        return <ul {...props} ref={ref} className="px-[15px]" />
                    }),
                    Header: () => (
                        <header className="min-h-[30px]"></header>
                    )
                }}
                itemContent={(index, message) => {
                    const isPartner = message?.sender?.id !== accountId;

                    const prev = messages[index - 1];
                    const next = messages[index + 1];

                    const isPrevSameSender = prev?.sender?.id === message?.sender?.id;
                    const isNextSameSender = next?.sender?.id === message?.sender?.id;

                    let position = "single";
                    if (isPrevSameSender && isNextSameSender) position = "middle";
                    else if (!isPrevSameSender && isNextSameSender) position = "first";
                    else if (isPrevSameSender && !isNextSameSender) position = "last";

                    if (isPartner) return <MessagePartner message={message} position={position} showAvatar={!isNextSameSender} />
                    else return <MessageOwn message={message} position={position} />
                }}
            />
        </div>
    )
}