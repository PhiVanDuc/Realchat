import AuthLayout from "@/components/layouts/auth/auth-layout";

export default function Layout({ children }) {
    return (
        <AuthLayout>
            {children}
        </AuthLayout>
    )
}
