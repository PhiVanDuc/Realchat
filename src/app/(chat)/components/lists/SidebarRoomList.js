"use client"

import useRoomsStore from "@/stores/rooms";
import { useSession } from "@/hooks/useSession";
import { forwardRef, useEffect, useRef } from "react";

import Error from "@/components/reuses/Error";
import { Virtuoso } from "react-virtuoso";
import SidebarRoomItem from "../items/SidebarRoomItem";
import SidebarItemLoading from "../loading/SidebarItemLoading";
import SidebarListLoading from "../loading/SidebarListLoading";

import { cn } from "@/libs/utils";
import { listRoom } from "@/actions/room";

export default function SidebarRoomList() {
    const waitInitLoadedRef = useRef();

    const session = useSession();
    const { rooms, setRooms, addRooms, loading, setLoading, fetchingMore, setFetchingMore, initLoaded, setInitLoaded, pagination, setPagination, error, setError } = useRoomsStore();

    // Lấy danh sách phòng chat
    useEffect(() => {
        (async () => {
            const { status, result } = await listRoom(pagination.page);
        
            if (!result.success) setError(`${status},${result.message}`);
            else {
                const { rooms, page, hasNextPage } = result.data;
                setRooms(rooms);
                setPagination({ page, hasNextPage });
                waitInitLoadedRef.current = setTimeout(() => { setInitLoaded(true) }, 500);
            }

            setLoading(false);
        })();

        return () => {
            setRooms([]);
            setLoading(true);
            setError(undefined);
            setInitLoaded(false);
            setPagination({ page: 1, hasNextPage: false });

            if (waitInitLoadedRef.current) {
                clearTimeout(waitInitLoadedRef.current);
                waitInitLoadedRef.current = null;
            }
        }
    }, []);

    // Lấy thêm phòng chat (khi đã kéo xuống cuối)
    const handleFetchMore = async (atBottom) => {
        if (loading || error || fetchingMore || !atBottom || !initLoaded || !pagination.hasNextPage) return;

        setFetchingMore(true);
        const { status, result } = await listRoom(pagination.page + 1);

        if (!result.success) setError(`${status},${result.message}`);
        else {
            const { rooms, page, hasNextPage } = result.data;
            addRooms(rooms);
            setPagination({ page, hasNextPage });
        }

        setFetchingMore(false);
    }

    return (
        <div
            className={cn(
                "w-full flex-1 order-1 pb-[20px] bg-white flex flex-col gap-y-[20px]",
                "lg:w-[340px] lg:self-stretch lg:order-2 lg:rounded-[15px] lg:border lg:border-neutral-200"
            )}
        >
            <header className="space-y-[2px] p-[20px] pb-0">
                <h1>Trò chuyện</h1>
                <p>Danh sách phòng trò chuyện</p>
            </header>

            <div className="flex-1 w-full">
                {
                    loading ?
                    (<SidebarListLoading />) :
                    error ?
                    (<Error message={error} />) :
                    rooms.length === 0 ?
                    (<p className="p-[20px] text-[14px] text-neutral-400 text-center">Chưa có phòng chat nào.</p>) :
                    (
                        <Virtuoso
                            className="scrollbar-thin"
                            style={{ height: "100%" }}
                            atBottomStateChange={handleFetchMore}
                            totalCount={fetchingMore ? rooms.length + 2 : rooms.length}
                            components={{
                                List: forwardRef(function VirtuosoList(props, ref) {
                                    return <ul {...props} ref={ref} className="space-y-[5px] px-[20px]" />
                                }),
                            }}
                            itemContent={index => {
                                if (fetchingMore && index >= rooms.length) return <SidebarItemLoading />

                                const room = rooms[index];
                                return <SidebarRoomItem room={room} session={session} />
                            }}
                        />
                    )
                }
            </div>
        </div>
    )
}