"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
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
import AuthGoogleButton from "./components/AuthGoogleButton";

import { toast } from "sonner";

export default function SignIn() {
    const [submitting, setSubmitting] = useState(false);

    const form = useForm({
        defaultValues: {
            name: "",
            password: ""
        }
    });

    const handleSubmit = async (data) => {
        setSubmitting(true);
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API}/auth/sign-in`,
            {
                method: "POST",
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                cache: "no-store"
            }
        );

        const result = await response.json();
        setSubmitting(false);

        if (result.success) console.log(result);
        else toast.warning(result.message);
    }

    return (
        <section className="w-full h-fit max-w-[500px] space-y-[50px] p-[25px] mx-auto rounded-[15px] border shadow-md">
            <header className="flex flex-col items-center gap-[5px]">
                <h1 className="text-center">Đăng nhập</h1>
                <p className="text-center">Vui lòng đăng nhập để tiếp tục trải nghiệm <span className="text-indigo-500 font-medium">Realchat</span></p>
            </header>

            <Form {...form}>
                <form
                    autoComplete="off"
                    onSubmit={form.handleSubmit(handleSubmit)}
                >
                    <div className="space-y-[10px] mb-[30px]">
                        <AuthGoogleButton />

                        <div className="relative flex justify-center">
                            <p className="relative bg-white font-medium text-neutral-300 px-[15px] z-10">hoặc</p>
                            <span className="block absolute top-[50%] translate-y-[-50%] right-0 left-0 h-[2px] rounded-full bg-neutral-200" />
                        </div>
                    </div>

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
                    </div>

                    <div className="space-y-[15px]">
                        <Link
                            href="/auth/sign-up"
                            className="block w-full text-right font-medium text-indigo-500 underline"
                        >
                            Đăng ký
                        </Link>

                        <Button
                            className="w-full bg-indigo-500 hover:bg-indigo-600"
                            disabled={submitting}
                        >
                            { submitting ? "Đang đăng nhập . . . " : "Đăng nhập" }
                        </Button>
                    </div>
                </form>
            </Form>
        </section>
    )
}