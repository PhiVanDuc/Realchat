"use client"

import React from "react";
import { Virtuoso } from "react-virtuoso";

import MemberItem from "./member-item";
import MemberItemLoading from "./member-item-loading";

export default function CreateGroupMembers({
    loading
}) {
    return (
        <div className="flex-1">
            <Virtuoso
                style={{ height: "100%" }}
                totalCount={loading ? 5 : 10}
                className="scrollbar-thin"
                components={{
                    List: React.forwardRef(function VirtuosoList(props, ref) { return <ul {...props} ref={ref} className="px-[15px] space-y-[5px]" /> }),
                }}
                itemContent={(index) => {
                    if (loading) return <MemberItemLoading />
                    else return <MemberItem />
                }}
            />
        </div>
    )
}
