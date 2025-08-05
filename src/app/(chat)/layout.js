import Sidebar from "./components/Sidebar";
import SocketProvider from "@/providers/SocketProvider";

import { cn } from "@/libs/utils";

export default async function ChatLayout({ children }) {
    return (
        <main className={cn(
            "flex items-stretch w-full h-dvh bg-slate-100 transition-all duration-500",
            "lg:p-[20px] lg:pl-[440px]"
        )}>
            <SocketProvider>
                <Sidebar />
                {children}
            </SocketProvider>
        </main>
    )
}