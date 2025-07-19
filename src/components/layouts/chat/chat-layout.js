import Sidebar from "./sidebar";
import ExpandSidebarProvider from "@/providers/expand-sidebar-provider";

export default function ChatLayout({ children }) {
    return (
        <ExpandSidebarProvider>
            <div className="bg-slate-100 h-dvh flex items-stretch">
                <Sidebar />
                {children}
            </div>
        </ExpandSidebarProvider>
    )
}
