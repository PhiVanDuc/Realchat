import Footer from "@/components/layouts/footer";
import Navbar from "@/components/layouts/navbar";

export default function MarketingLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-100">
            <Navbar />

            <main className="pt-40 pb-20 bg-slate-100">
                {children}
            </main>

            <Footer />
        </div>
    )
}
