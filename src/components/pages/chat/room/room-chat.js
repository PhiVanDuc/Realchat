"use client"

import React from "react";

import MessageMine from "./message/message-mine";
import MessagePartner from "./message/message-partner";
import RoomChatLoading from "./loading/room-chat-loading";

import { Virtuoso } from "react-virtuoso";

export default function RoomChat({ loading }) {
    const loadMoreMessage = () => {
        if (loading) return;
        console.log("Top");
    }

    return (
        <div className="flex-1 w-full">
            <Virtuoso
                style={{ height: "100%" }}
                startReached={loadMoreMessage}
                totalCount={loading ? 1 : 10}
                initialTopMostItemIndex={loading ? 0 : 9}
                followOutput="smooth"
                className="scrollbar-thin"
                components={{
                    List: React.forwardRef(function VirtuosoList(props, ref) { return <ul {...props} ref={ref} className="px-[15px] space-y-[10px]" /> }),
                    Header: () => <div className="h-[30px]" /> 
                }}
                itemContent={(index) => {
                    if (loading) return <RoomChatLoading />
                    else {
                        return (
                            <div className="space-y-[10px]">
                                <MessagePartner />
                                <MessageMine />
                            </div>
                        )
                    }
                }}
            />
        </div>
    )
}