"use client"

import React, { useState } from "react";

import SidebarItem from "./sidebar-item";
import SidebarListLoading from "./loading/sidebar-list-loading";

import { Virtuoso } from "react-virtuoso";

import { IoIosAdd } from "react-icons/io";

export default function SidebarList({ chatType, loading }) {
    const [data, setData] = useState(15);
    const [isLoadMore, setIsLoadMore] = useState(false);

    const loadMore = () => {
        if (isLoadMore) return;
        setIsLoadMore(true);

        setTimeout(() => {
            setData((state) => {
                return state + 5;
            });

            setIsLoadMore(false);
        }, 2000);
    }

    return (
        <section className="order-1 xl:order-2 shrink-0 w-full xl:w-[380px] xl:py-[20px] flex-1 xl:self-stretch">
            <div className="pt-[20px] xl:py-[20px] flex flex-col gap-[20px] w-full h-full bg-white rounded-[12px]">
                <div className="flex items-center justify-between gap-[15px] px-[20px]">
                    <header className="space-y-[2px]">
                        <h1 className="text-[18px] md:text-[20px] xl:text-[22px] text-neutral-600 font-semibold ellipsis-1-lines">Trò chuyện</h1>
                        <p className="text-[14px] md:text-[15px] text-neutral-500 font-medium ellipsis-1-lines">
                            Danh sách trò chuyện {chatType === "normal" ? "riêng" : "nhóm"}.
                        </p>
                    </header>

                    {
                        chatType === "group" && (
                            <button className="flex items-center justify-center text-neutral-600 w-[35px] aspect-square rounded-[10px] bg-neutral-100 hover:bg-neutral-200 transition-colors duration-300 cursor-pointer">
                                <IoIosAdd size={20} />
                            </button>
                        )
                    }
                </div>

                <div className="flex-1">
                    <Virtuoso
                        style={{ height: "100%" }}
                        endReached={loadMore}
                        totalCount={
                            loading ? 4 :
                            isLoadMore ? data + 2 : data
                        }
                        className="scrollbar-thin"
                        components={{
                            List: React.forwardRef((props, ref) => {
                                return <ul {...props} ref={ref} className="space-y-[5px] px-[20px]" />
                            })
                        }}
                        itemContent={(index) => {
                            if(loading) return <SidebarListLoading />
                            else {
                                if (isLoadMore && index >= data) return <SidebarListLoading />
                                return <SidebarItem />
                            }
                        }}
                    />
                </div>
            </div>
        </section>
    )
}