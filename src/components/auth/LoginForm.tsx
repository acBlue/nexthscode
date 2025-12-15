"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginSchema } from "@/lib/schemas";
import { CardWrapper } from "./CardWrapper";
import { login } from "@/app/actions/auth";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

export const LoginForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            login(values).then((data) => {
                if (data?.error) {
                    setError(data.error);
                }
                // 成功时 NextAuth 会自动重定向，不需要这里处理 success 状态
            });
        });
    };

    return (
        <CardWrapper
            headerLabel="欢迎回来，请登录"
            backButtonLabel="还没有账号？去注册"
            backButtonHref="/register"
        >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    {/* Email 字段 */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">邮箱</label>
                        <input
                            {...form.register("email")}
                            disabled={isPending}
                            type="email"
                            placeholder="name@example.com"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-100 disabled:opacity-50"
                        />
                        {form.formState.errors.email && (
                            <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>
                        )}
                    </div>

                    {/* Password 字段 */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">密码</label>
                        <input
                            {...form.register("password")}
                            disabled={isPending}
                            type="password"
                            placeholder="******"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-100 disabled:opacity-50"
                        />
                        {form.formState.errors.password && (
                            <p className="text-xs text-red-500">{form.formState.errors.password.message}</p>
                        )}
                    </div>
                </div>

                {/* 错误/成功 提示 */}
                {error && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-md flex items-center gap-2 text-sm">
                        <AlertCircle className="w-4 h-4" /> {error}
                    </div>
                )}

                {/* 提交按钮 */}
                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                    登录
                </button>
            </form>
        </CardWrapper>
    );
};