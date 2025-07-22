"use client"

import React, { useEffect, useRef, useState } from "react";

import Error from "@/components/reuseable/error";
import MessageMine from "./message/message-mine";
import MessagePartner from "./message/message-partner";
import RoomChatLoading from "./loading/room-chat-loading";

import { Virtuoso } from "react-virtuoso";
import groupMessages, { connectMessages } from "@/utils/group-messages";
import { getRoomMessages } from "@/actions/chat-normal";

export default function RoomChat({ params }) {
    const virtuosoRef = useRef();

    const [room, setRoom] = useState({});
    const [messages, setMessages] = useState([]);
    const [accountId, setAccountId] = useState("");
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });

    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const [isGetMore, setIsGetMore] = useState(false);
    const [onTop, setOnTop] = useState(null);

    // Lấy tin nhắn
    useEffect(() => {
        (async () => {
            const { status, result, accountId } = await getRoomMessages({ roomId: params?.roomId, page: pagination?.page });

            if (!result?.success) setError(`${status},${error}`);
            else {
                setMessages(groupMessages(result?.data?.messages));
                setRoom(result?.data?.room);
                setPagination({ page: result?.data?.page, totalPages: result?.data?.totalPages });
            }

            setLoading(false);
            setAccountId(accountId);
        })();
    }, []);

    useEffect(() => {
        if (loading) return;

        if (onTop) {
            virtuosoRef.current.scrollToIndex({ index: onTop, align: 'end', behavior: 'auto' });
            setOnTop(false);
            return;
        }
        else virtuosoRef.current.scrollToIndex({ index: messages?.length, align: 'end', behavior: 'auto' });
    }, [messages]);

    const handleGetMoreMessages = async (atTop) => {
        const run = atTop && pagination?.page < pagination?.totalPages && !isGetMore;
        if (!run) return;

        setIsGetMore(true);
        const { status, result } = await getRoomMessages({ roomId: params?.roomId, page: pagination?.page + 1 });

        if (!result?.success) setError(`${status},${error}`);
        else {
            const grouped = groupMessages(result?.data?.messages);
            setOnTop(grouped?.length);
            setMessages(connectMessages(grouped, messages));
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
                        style={{ height: "100%" }}
                        totalCount={
                            loading ? 1 :
                            isGetMore ? messages?.length + 1 : messages?.length
                        }
                        className="scrollbar-thin"
                        atTopStateChange={handleGetMoreMessages}
                        components={{
                            List: React.forwardRef(function VirtuosoList(props, ref) { return <ul {...props} ref={ref} className="px-[15px] space-y-[15px]" /> }),
                            Header: () => <div className="h-[30px]" /> 
                        }}
                        itemContent={(index) => {
                            if (loading) return <RoomChatLoading />

                            if (isGetMore && index === 0) {
                                return <p>Đang tải</p>
                            }

                            const actualIndex = isGetMore ? index - 1 : index;
                            const groupMessages = messages[actualIndex];
                            const isPartner = groupMessages?.sender?.id !== accountId;

                            if (isPartner) {
                                return (
                                    <MessagePartner
                                        accountId={groupMessages?.sender?.id}
                                        room={room}
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