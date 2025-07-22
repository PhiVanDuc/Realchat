"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

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

import { signUp } from "@/actions/auth";
import { toast } from "sonner";

export default function SignUp() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    const form = useForm({
        defaultValues: {
            name: "",
            fullname: "",
            password: "",
            confirm: ""
        }
    });

    const onSubmit = async (data) => {
        setSubmitting(true);
        const { result } = await signUp(data);
        setSubmitting(false);
        
        if (result?.success) {
            router.push("/sign-in");
            return;
        }
        else toast.error(result?.message);
    }

    return (
        <div className="shrink-0 space-y-[50px] w-full max-w-[490px] p-[20px] bg-white rounded-[10px]">
            <header className="flex flex-col items-center gap-y-[5px]">
                <h1 className="text-[24px] font-semibold">Đăng ký</h1>
                <p className="text-[14px] text-center font-medium text-neutral-500">Chào mừng bạn, hãy bắt đầu hành trình với <span className="text-[15px] text-indigo-600 font-semibold">Realchat</span>.</p>
            </header>

            <Form {...form}>
                <form
                    autoComplete="off"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-[20px]"
                >
                    <FormField
                        control={form.control}
                        name="fullname"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel className="text-neutral-600">Tên đầy đủ</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Nhập tên đầy đủ . . ."
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )
                        }}
                    />

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

                    <FormField
                        control={form.control}
                        name="confirm"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel className="text-neutral-600">Xác nhận mật khẩu</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Nhập lại mật khẩu . . ."
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )
                        }}
                    />

                    <div className="flex justify-between items-center">
                        <Link
                            href="/sign-in"
                            className="text-[15px] text-indigo-600 font-medium"
                        >
                            Đăng nhập
                        </Link>

                        <Link
                            href="/forgot-password"
                            className="text-[15px] text-indigo-600 font-medium"
                        >
                            Quên mật khẩu
                        </Link>
                    </div>

                    <Button
                        className="w-full"
                        disabled={submitting}
                    >
                        Đăng ký
                    </Button>
                </form>
            </Form>
        </div>
    )
}