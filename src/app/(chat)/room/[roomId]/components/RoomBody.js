"use client"

import { useEffect, useRef } from "react";
import { useSession } from "@/hooks/useSession";
import useMessagesStore from "@/stores/messages";

import Error from "@/components/reuses/Error";
import { Virtuoso } from "react-virtuoso";
import MessageOwn from "./message/MessageOwn";
import MessagePartner from "./message/MessagePartner";
import RoomBodyLoading from "./loading/RoomBodyLoading";

import { listMessage } from "@/actions/message";

export default function RoomBody({ roomId }) {
    const virtuosoRef = useRef();
    const waitInitLoadedRef = useRef();

    const session = useSession();
    const { messages, setMessages, addMessages, loading, setLoading, initLoaded, setInitLoaded, firstScrollBottom, setFirstScrollBottom, fetchingMore, setFetchingMore, pagination, setPagination, error, setError, firstItemIndex, setFirstItemIndex } = useMessagesStore();

    // Lấy tin nhắn
    useEffect(() => {
        (async () => {
            const { status, result } = await listMessage({ roomId, page: pagination.page });
            
            if (!result.success) setError(`${status},${result.message}`);
            else {
                const { messages, page, hasNextPage } = result.data;
                setMessages(messages);
                setPagination({ page, hasNextPage });
                waitInitLoadedRef.current = setTimeout(() => { setInitLoaded(true) }, 500);
            }

            setLoading(false);
        })();

        return () => {
            setMessages([]);
            setLoading(true);
            setInitLoaded(false);
            setPagination({ page: 1, hasNextPage: false });

            if (waitInitLoadedRef.current) {
                clearTimeout(waitInitLoadedRef.current);
                waitInitLoadedRef.current = null;
            }
        }
    }, []);

    // Khi mới load xong thì kéo xuống cuối danh sách
    useEffect(() => {
        if (loading || firstScrollBottom || messages.length === 0) return;

        virtuosoRef.current.scrollToIndex({ index: messages.length - 1 });
        setFirstScrollBottom(true);
    }, [loading, messages])

    // Lấy thêm tin nhắn (Khi kéo lên trên)
    const handleFetchMore = async (atTop) => {
        if (loading || error || fetchingMore || !atTop || !initLoaded || !pagination.hasNextPage) return;

        setFetchingMore(true);
        const { status, result } = await listMessage({ roomId, page: pagination.page + 1 });

        if (!result.success) setError(`${status},${result.message}`);
        else {
            const { messages, page, hasNextPage } = result.data;
            addMessages(messages);
            setPagination({ page, hasNextPage });
            setFirstItemIndex(firstItemIndex - messages.length);
        }

        setFetchingMore(false);
    }

    if (loading) return <RoomBodyLoading />
    if (error) return <div className="flex-1"><Error message={error} /></div>

    return (
        <ul className="flex-1">
            <Virtuoso
                ref={virtuosoRef}
                className="scrollbar-thin"
                style={{ height: "100%" }}
                followOutput="auto"
                data={messages}
                firstItemIndex={firstItemIndex}
                atTopStateChange={handleFetchMore}
                components={{
                    Header: () => (
                        <li className="min-h-[20px]">
                            {
                                messages.length === 0 &&
                                (
                                    <div className="flex justify-center p-[20px]">
                                        <p className="px-[20px] py-[8px] rounded-full text-[14px] text-neutral-500 font-medium bg-neutral-200">Bắt đầu trò chuyện</p>
                                    </div>
                                )
                            }
                        </li>
                    )
                }}
                itemContent={(index, message) => {
                    const realIndex = index - firstItemIndex;
                    const isPartner = message.sender.id !== session.data.id;

                    const prev = messages[realIndex - 1];
                    const next = messages[realIndex + 1];

                    const isPrevSameSender = prev?.sender?.id === message.sender.id;
                    const isNextSameSender = next?.sender?.id === message.sender.id;

                    let position = "single";
                    if (isPrevSameSender && isNextSameSender) position = "middle";
                    else if (!isPrevSameSender && isNextSameSender) position = "first";
                    else if (isPrevSameSender && !isNextSameSender) position = "last";

                    if (isPartner) return <MessagePartner message={message} position={position} isPartner={isPartner} showAvatar={!isNextSameSender} />
                    return <MessageOwn message={message} position={position} session={session} isLast={realIndex === messages.length - 1} />
                }}
            />
        </ul>
    )
}