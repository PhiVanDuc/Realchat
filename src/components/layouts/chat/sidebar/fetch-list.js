import { getAccounts } from "@/actions/account";
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
        })
    }

    if (sidebarType === "normal") {}
    if (sidebarType === "group") {}
}

export default fetchList;