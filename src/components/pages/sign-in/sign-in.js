"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import Link from "next/link";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

import { signIn } from "@/actions/auth";
import { toast } from "sonner";

export default function SignIn() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    const form = useForm({
        defaultValues: {
            name: "",
            password: ""
        }
    });

    const onSubmit = async (data) => {
        setSubmitting(true);
        const { result } = await signIn(data);
        setSubmitting(false);

        if (result?.success) {
            router.push("/");
            return;
        }
        else toast.error(result?.message);
    }

    return (
        <div className="shrink-0 space-y-[50px] w-full max-w-[490px] p-[20px] bg-white rounded-[10px]">
            <header className="flex flex-col items-center gap-y-[5px]">
                <h1 className="text-[24px] font-semibold">Đăng nhập</h1>
                <p className="text-[14px] text-center font-medium text-neutral-500">Chào mừng bạn quay trở lại với <span className="text-[15px] text-indigo-600 font-semibold">Realchat</span>.</p>
            </header>

            <div>
                <section
                    className="flex items-center justify-center gap-[12px] p-[10px] rounded-[10px] border border-neutral-300 hover:bg-neutral-100 hover:border-neutral-100 transition-color duration-300 cursor-pointer mb-[10px]"
                    onClick={() => { window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_API_CALL}/auth/google` }}
                >
                    <FcGoogle size={25} />
                    <p className="text-[14px] text-neutral-600 font-medium">Đăng nhập với Google</p>
                </section>

                <section className="relative flex justify-center mb-[30px]">
                    <p className="relative w-fit text-[14px] text-slate-400 px-[10px] bg-white z-20">hoặc</p>
                    <span className="absolute top-[50%] translate-y-[-50%] left-0 right-0 h-[1px] rounded-full bg-slate-200 z-10" />
                </section>

                <Form {...form}>
                    <form
                        autoComplete="off"
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-[20px]"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel className="text-neutral-600">Tên đăng nhập</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Nhập tên đăng nhập . . ."
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
                                        <FormLabel className="text-neutral-600">Mật khẩu</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Nhập mật khẩu . . ."
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )
                            }}
                        />

                        <div className="flex justify-between items-center">
                            <Link
                                href="/sign-up"
                                className="text-[14px] text-indigo-600 font-medium"
                            >
                                Đăng ký
                            </Link>

                            <Link
                                href="/forgot-password"
                                className="text-[14px] text-indigo-600 font-medium"
                            >
                                Quên mật khẩu
                            </Link>
                        </div>

                        <Button
                            className="w-full"
                            disabled={submitting}
                        >
                            Đăng nhập
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
