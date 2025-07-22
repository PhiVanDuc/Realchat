import Footer from "@/components/layouts/footer";
import Navbar from "@/components/layouts/navbar";

export default function AuthLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-100 flex flex-col">
            <Navbar className="hidden sm:flex" />

            <main className="flex-1 flex items-center justify-center bg-slate-100 px-[20px]">
                {children}
            </main>

            <Footer className="hidden sm:block" />
        </div>
    )
}
