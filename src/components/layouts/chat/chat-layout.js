import Sidebar from "./sidebar/sidebar";
import ExpandSidebarProvider from "@/providers/expand-sidebar-provider";

import getUserInfo from "@/utils/get-user-info";

export default async function ChatLayout({ children }) {
    const userInfo = await getUserInfo();

    return (
        <ExpandSidebarProvider>
            <main className="bg-slate-100 h-dvh flex items-stretch">
                <Sidebar userInfo={userInfo} />
                
                <div className="xl:pl-[480px] xl:py-[20px] xl:pr-[20px] flex flex-col w-full items-stretch transition-all duration-300">
                    {children}
                </div>
            </main>
        </ExpandSidebarProvider>
    )
}
