"use client"

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import Link from "next/link";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";

export default function SignUp() {
    const router = useRouter();

    const form = useForm({
        defaultValues: {
            displayName: "",
            name: "",
            password: "",
            confirmPassword: ""
        }
    });

    const handleSubmit = async (data) => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API}/auth/sign-up`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            }
        );
        
        const result = await response.json();
        if (result.success) router.replace("/auth");
        else toast.warning(result.message);
    }

    return (
        <section className="w-full h-fit max-w-[500px] space-y-[50px] p-[25px] mx-auto rounded-[15px] border shadow-md">
            <header className="flex flex-col items-center gap-[5px]">
                <h1 className="text-center text-[20px] text-neutral-800 font-semibold">Đăng ký</h1>
                <p className="text-center">Vui lòng bạn đăng ký tài khoản <span className="text-indigo-500 font-medium">Realchat</span> tại đây</p>
            </header>

            <Form {...form}>
                <form
                    autoComplete="off"
                    onSubmit={form.handleSubmit(handleSubmit)}
                >
                    <div className="space-y-[20px] mb-[15px]">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Tên đăng nhập</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Vui lòng nhập tên đăng nhập . . ."
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )
                            }}
                        />

                        <FormField
                            control={form.control}
                            name="displayName"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Tên đầy đủ</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Vui lòng nhập tên đầy đủ . . ."
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )
                            }}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Mật khẩu</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Vui lòng nhập mật khẩu . . ."
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )
                            }}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Xác nhận mật khẩu</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Vui lòng xác nhận mật khẩu . . ."
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )
                            }}
                        />
                    </div>

                    <div className="space-y-[15px]">
                        <Link
                            href="/auth"
                            className="block text-right font-medium text-indigo-500 underline"
                        >
                            Đăng nhập
                        </Link>

                        <Button className="w-full bg-indigo-500 hover:bg-indigo-600">Đăng ký</Button>
                    </div>
                </form>
            </Form>
        </section>
    )
}
