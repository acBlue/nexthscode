import { z } from "zod";

// 登录校验规则
export const LoginSchema = z.object({
    email: z.string().email({
        message: "请输入有效的邮箱地址",
    }),
    password: z.string().min(1, {
        message: "请输入密码",
    }),
});

// 注册校验规则
export const RegisterSchema = z.object({
    email: z.string().email({
        message: "请输入有效的邮箱地址",
    }),
    password: z.string().min(6, {
        message: "密码至少需要 6 个字符",
    }),
    name: z.string().min(1, {
        message: "请输入您的昵称",
    }),
});