"use client"

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSocket } from "@/providers/socket-provider";
import { useExpandSidebar } from "@/providers/expand-sidebar-provider";

import SidebarList from "./sidebar-list";
import SidebarType from "./sidebar-type";

import { cn } from "@/lib/utils";
import fetchList from "./fetch-list";

export default function Sidebar({ userInfo }) {
    const pathname = usePathname();
    const { socket } = useSocket();
    const { expandSidebar } = useExpandSidebar();

    const [list, setList] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
    const [sidebarType, setSidebarType] = useState(pathname === "/create-group" ? "group" : "normal");

    // Lấy danh sách
    useEffect(() => {
        setList([]);
        setError(null);
        setLoading(true);
        setPagination({ page: 1, totalPages: 1 });

        (async () => {
            await fetchList({
                page: 1,
                sidebarType,
                isGetMore: false,
                setError,
                setList,
                setPagination
            });

            setLoading(false);
        })();
    }, [sidebarType]);

    // Sắp xếp lại danh sách
    useEffect(() => {
        if (!socket) return;

        socket.on("update-room-normal-item", ({ room, message }) => {
            const copyRoom = {...room};
            const member = room?.members?.find(member => member?.id !== userInfo?.info?.id);
            delete copyRoom.members;

            const formatRoomItem = {
                ...room,
                member,
                message
            }

            setList((state) => {
                const filtered = state.filter(item => item.id !== formatRoomItem.id);
                return [formatRoomItem, ...filtered];
            })
        });

        () => { socket.off("update-room-normal-item") }
    }, [socket, list]);

    return (
        <aside className={cn(
            "fixed left-0 top-0 bottom-0 w-full translate-x-[-100%] bg-white xl:bg-transparent xl:translate-x-0 flex flex-col xl:flex-row xl:w-fit xl:items-stretch transition-transform duration-300 z-50",
            expandSidebar ? "translate-x-0 r-0" : ""
        )}>
            <SidebarType
                userInfo={userInfo}
                sidebarType={sidebarType}
                setSidebarType={setSidebarType}
            />

            <SidebarList
                userInfo={userInfo}
                sidebarType={sidebarType}
                loading={loading}
                error={error}
                setError={setError}
                list={list}
                setList={setList}
                pagination={pagination}
                setPagination={setPagination}
            />
        </aside>
    )
}