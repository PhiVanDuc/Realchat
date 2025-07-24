import { getAccounts } from "@/actions/account";
import { getRooms } from "@/actions/chat-normal";
import getUserInfo from "@/utils/get-user-info";

const fetchList = async ({
    page = 1,
    sidebarType,
    isGetMore,
    setError,
    setList,
    setPagination
}) => {
    const userInfo = await getUserInfo();

    // Lấy danh sách tài khoản
    if (sidebarType === "users") {
        const { status, result } = await getAccounts({
            accountId: userInfo?.info?.id,
            page
        });

        if (!result?.success) {
            setError(`${status},${result?.message}`);
            return;
        }

        const { accounts, page: resultPage, totalPages } = result?.data;

        setList((state) => {
            if (isGetMore) return [...state, ...accounts];
            return accounts;
        });

        setPagination({
            page: resultPage,
            totalPages
        });
    }

    if (sidebarType === "normal") {
        const { status, result } = await getRooms({
            accountId: userInfo?.info?.id,
            page
        });

        if (!result?.success) {
            setError(`${status},${result?.message}`);
            return;
        }

        const { rooms, page: resultPage, totalPages } = result?.data;

        setList((state) => {
            if (isGetMore) return [...state, ...rooms];
            return rooms;
        });

        setPagination({
            page: resultPage,
            totalPages
        });
    }
}

export default fetchList;