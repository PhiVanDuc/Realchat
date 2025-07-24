"use client"

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Error from "@/components/reuseable/error";
import SidebarRoomItem from "./sidebar-room-item";
import SidebarListEmpty from "./sidebar-list-empty";
import SidebarAccountItem from "./sidebar-account-item";
import SidebarRoomItemLoading from "../loading/sidebar-room-item-loading";
import SidebarAccountItemLoading from "../loading/sidebar-account-item-loading";

import { Virtuoso } from "react-virtuoso";
import { IoIosAdd } from "react-icons/io";

import fetchList from "./fetch-list";

export default function SidebarList({
    userInfo,
    sidebarType,
    loading,
    error,
    setError,
    list,
    setList,
    pagination,
    setPagination
}) {
    const router = useRouter();
    const [isGetMore, setIsGetMore] = useState(false);

    const handleGetMore = async (atBottom) => {
        if (!atBottom || loading || !pagination?.hasNextPage || isGetMore) return;

        setIsGetMore(true);
        await fetchList({
            page: pagination?.page + 1,
            sidebarType,
            isGetMore: true,
            setError,
            setList,
            setPagination
        });
        setIsGetMore(false);
    }

    return (
        <section className="order-1 xl:order-2 shrink-0 w-full xl:w-[380px] xl:py-[20px] flex-1 xl:self-stretch">
            <div className="pt-[20px] xl:py-[20px] flex flex-col gap-[20px] w-full h-full bg-white rounded-[12px] xl:border xl:border-neutral-200">
                <div className="flex items-center justify-between gap-[15px] px-[20px]">
                    <header className="space-y-[2px]">
                        <h1 className="text-[18px] md:text-[20px] xl:text-[22px] text-neutral-600 font-semibold ellipsis-1-lines">
                            {
                                sidebarType === "users" ? "Người dùng" : "Trò chuyện"
                            }
                        </h1>
                        <p className="text-[14px] md:text-[15px] text-neutral-500 font-medium ellipsis-1-lines">
                            {
                                sidebarType === "users" ?
                                "Danh sách người dùng hiện tại." :
                                `Danh sách trò chuyện ${sidebarType === "normal" ? "riêng" : "nhóm"}.`
                            }
                        </p>
                    </header>

                    {
                        sidebarType === "group" && (
                            <button
                                className="flex items-center justify-center text-neutral-600 w-[35px] aspect-square rounded-[10px] bg-neutral-100 hover:bg-neutral-200 transition-colors duration-300 cursor-pointer"
                                onClick={() => { router.push("/create-group") }}
                            >
                                <IoIosAdd size={20} />
                            </button>
                        )
                    }
                </div>

                <div className="flex-1">
                    {
                        error ?
                        (<Error message={error} />) :
                        (
                            <Virtuoso
                                style={{ height: "100%" }}
                                className="scrollbar-thin"
                                atBottomStateChange={handleGetMore}
                                totalCount={
                                    loading ? 4 :
                                    list?.length === 0 ? 1 :
                                    isGetMore ? list?.length + 2 : list?.length
                                }
                                components={{
                                    List: React.forwardRef(function VirtuosoList(props, ref) {
                                        return <ul {...props} ref={ref} className="space-y-[5px] px-[20px]" />
                                    })
                                }}
                                itemContent={(index) => {
                                    if (loading || (isGetMore && index >= list?.length)) {
                                        return (
                                            sidebarType === "users" ?
                                            <SidebarAccountItemLoading /> :
                                            <SidebarRoomItemLoading />
                                        )
                                    }

                                    if (list?.length === 0) return <SidebarListEmpty sidebarType={sidebarType} />
                                    else {
                                        return sidebarType === "users" ? 
                                            <SidebarAccountItem account={list[index]} /> :
                                            <SidebarRoomItem room={list[index]} userInfo={userInfo} />;
                                    }
                                }}
                            />
                        )
                    }
                </div>
            </div>
        </section>
    )
}