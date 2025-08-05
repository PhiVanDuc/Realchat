export const metadata = {
    title: "Realchat - Xác thực",
    description: "Vui lòng xác thực để sử dụng các tính năng của Realchat!",
};

export default function AuthLayout({ children }) {
    return (
        <main className="auth-layout scrollbar-thin">
            {children}
        </main>
    )
}
