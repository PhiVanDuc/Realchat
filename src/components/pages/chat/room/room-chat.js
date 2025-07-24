"use client"

import React, { useEffect, useRef, useState } from "react";

import Error from "@/components/reuseable/error";
import MessageMine from "./message/message-mine";
import MessagePartner from "./message/message-partner";
import RoomChatLoading from "./loading/room-chat-loading";

import { Virtuoso } from "react-virtuoso";
import mergeMessages, { connectGroupMessages } from "@/utils/group-messages";
import { getRoomMessages } from "@/actions/chat-normal";

export default function RoomChat({
    params,
    messages,
    setMessages
}) {
    const virtuosoRef = useRef();

    const [room, setRoom] = useState({});
    const [accountId, setAccountId] = useState("");
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });

    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const [isGetMore, setIsGetMore] = useState(false);
    const [onTop, setOnTop] = useState(0);

    // Lấy tin nhắn
    useEffect(() => {
        (async () => {
            const { status, result, accountId } = await getRoomMessages({ roomId: params?.roomId, page: pagination?.page });

            if (!result?.success) setError(`${status},${result?.message}`);
            else {
                const grouped = mergeMessages(result?.data?.messages);
                setMessages(grouped);
                setRoom(result?.data?.room);
                setPagination({ page: result?.data?.page, totalPages: result?.data?.totalPages });
            }

            setLoading(false);
            setAccountId(accountId);
        })();
    }, []);

    // Xử lý vị trí scroll
    useEffect(() => {
        if (loading || isGetMore) return;

        if (onTop) {
            virtuosoRef.current.scrollToIndex({ index: onTop, align: 'start', behavior: 'auto' });
            setOnTop(0);
        }
        else virtuosoRef.current.scrollToIndex({ index: messages?.length, align: 'end', behavior: 'auto' });
    }, [messages]);

    // Lấy thêm tin nhắn
    const handleGetMoreMessages = async (atTop) => {
        const run = atTop && pagination?.page < pagination?.totalPages && !isGetMore;
        if (!run) return;

        setIsGetMore(true);
        const { status, result } = await getRoomMessages({ roomId: params?.roomId, page: pagination?.page + 1 });

        if (!result?.success) setError(`${status},${error}`);
        else {
            const grouped = mergeMessages(result?.data?.messages);
            setOnTop(grouped?.length);
            setMessages(connectGroupMessages(grouped, messages));
            setPagination({ page: result?.data?.page, totalPages: result?.data?.totalPages });
        }

        setIsGetMore(false);
    }

    return (
        <div className="flex-1 w-full">
            {
                error ?
                (<Error message={error} />) :
                (
                    <Virtuoso
                        ref={virtuosoRef}
                        increaseViewportBy={400}
                        style={{ height: "100%" }}
                        className="scrollbar-thin"
                        atTopStateChange={handleGetMoreMessages}
                        totalCount={loading ? 1 : messages?.length}
                        components={{
                            List: React.forwardRef(function VirtuosoList(props, ref) { return <ul {...props} ref={ref} className="px-[15px] space-y-[15px]" /> }),
                            Header: () => <div className="min-h-[30px]">
                                {
                                    isGetMore && (
                                        <div className="w-full flex items-center justify-center py-[15px] gap-[10px]">
                                            <p className="text-[15px] text-neutral-400 font-medium">Đang lấy thêm tin nhắn.</p>
                                            <div className="w-[16px] h-[16px] border-3 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                                        </div>
                                    )
                                }
                            </div>
                        }}
                        itemContent={(index) => {
                            if (loading) return <RoomChatLoading />

                            const groupMessages = messages[index];
                            const isPartner = groupMessages?.sender?.id !== accountId;

                            if (isPartner) {
                                return (
                                    <MessagePartner
                                        accountId={groupMessages?.sender?.id}
                                        groupMessages={groupMessages}
                                    />
                                )
                            }
                            else {
                                return (
                                    <MessageMine
                                        room={room}
                                        groupMessages={groupMessages}
                                    />
                                )
                            }
                        }}
                    />
                )
            }
        </div>
    )
}