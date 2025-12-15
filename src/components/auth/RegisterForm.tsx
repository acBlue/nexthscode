"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RegisterSchema } from "@/lib/schemas";
import { CardWrapper } from "./CardWrapper";
import { register } from "@/app/actions/auth";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

export const RegisterForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
        },
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            register(values).then((data) => {
                if (data.error) {
                    setError(data.error);
                }
                if (data.success) {
                    setSuccess(data.success);
                }
            });
        });
    };

    return (
        <CardWrapper
            headerLabel="创建一个新账号"
            backButtonLabel="已有账号？去登录"
            backButtonHref="/login"
        >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    {/* Name 字段 */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">昵称</label>
                        <input
                            {...form.register("name")}
                            disabled={isPending}
                            placeholder="您的称呼"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100"
                        />
                        {form.formState.errors.name && (
                            <p className="text-xs text-red-500">{form.formState.errors.name.message}</p>
                        )}
                    </div>

                    {/* Email 字段 */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">邮箱</label>
                        <input
                            {...form.register("email")}
                            disabled={isPending}
                            type="email"
                            placeholder="name@example.com"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100"
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
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100"
                        />
                        {form.formState.errors.password && (
                            <p className="text-xs text-red-500">{form.formState.errors.password.message}</p>
                        )}
                    </div>
                </div>

                {/* 提示信息 */}
                {error && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-md flex items-center gap-2 text-sm">
                        <AlertCircle className="w-4 h-4" /> {error}
                    </div>
                )}
                {success && (
                    <div className="bg-green-50 text-green-600 p-3 rounded-md flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4" /> {success}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                    注册
                </button>
            </form>
        </CardWrapper>
    );
};