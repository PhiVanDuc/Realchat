"use client"

import { forwardRef, useEffect, useRef } from "react";
import useAccountsStore from "@/stores/accounts";

import Error from "@/components/reuses/Error";
import { Virtuoso } from "react-virtuoso";
import SidebarAccountItem from "../items/SidebarAccountItem";
import SidebarItemLoading from "../loading/SidebarItemLoading";
import SidebarListLoading from "../loading/SidebarListLoading";

import { cn } from "@/libs/utils";
import { listAccount } from "@/actions/account";

export default function SidebarAccountList() {
    const waitInitLoadedRef = useRef();

    const { accounts, setAccounts, addAccounts, loading, setLoading, fetchingMore, setFetchingMore, initLoaded, setInitLoaded, pagination, setPagination, error, setError } = useAccountsStore();

    // Lấy danh sách tài khoản
    useEffect(() => {
        (async () => {
            const { status, result } = await listAccount(pagination.page);
        
            if (!result.success) setError(`${status},${result.message}`);
            else {
                const { accounts, page, hasNextPage } = result.data;
                setAccounts(accounts);
                setPagination({ page, hasNextPage });
                waitInitLoadedRef.current = setTimeout(() => { setInitLoaded(true) }, 500);
            }

            setLoading(false);
        })();

        return () => {
            setAccounts([]);
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

    // Lấy thêm tài khoản (khi đã kéo xuống cuối)
    const handleFetchMore = async (atBottom) => {
        if (loading || error || fetchingMore || !atBottom || !initLoaded || !pagination.hasNextPage) return;

        setFetchingMore(true);
        const { status, result } = await listAccount(pagination.page + 1);

        if (!result.success) setError(`${status},${result.message}`);
        else {
            const { accounts, page, hasNextPage } = result.data;
            addAccounts(accounts);
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
                <h1>Tài khoản</h1>
                <p>Danh sách tài khoản người dùng</p>
            </header>

            <div className="flex-1 w-full">
                {
                    loading ?
                    (<SidebarListLoading />) :
                    error ?
                    (<Error message={error} />) :
                    accounts.length === 0 ?
                    (<p className="p-[20px] text-[14px] text-neutral-400 text-center">Chưa có tài khoản nào.</p>) :
                    (
                        <Virtuoso
                            className="scrollbar-thin"
                            style={{ height: "100%" }}
                            atBottomStateChange={handleFetchMore}
                            totalCount={fetchingMore ? accounts.length + 2 : accounts.length}
                            components={{
                                List: forwardRef(function VirtuosoList(props, ref) {
                                    return <ul {...props} ref={ref} className="space-y-[5px] px-[20px]" />
                                }),
                            }}
                            itemContent={index => {
                                if (fetchingMore && index >= accounts.length) return <SidebarItemLoading />

                                const account = accounts[index];
                                return <SidebarAccountItem account={account} />
                            }}
                        />
                    )
                }
            </div>
        </div>
    )
}