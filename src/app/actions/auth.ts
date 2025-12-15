"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { LoginSchema, RegisterSchema } from "@/lib/schemas";
import { signIn } from "@/auth/auth"; // 引用我们配置好的 auth
import { AuthError } from "next-auth";

// --- 注册 Action ---
export const register = async (values: z.infer<typeof RegisterSchema>) => {
    // 1. 校验字段
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "参数无效！" };
    }

    const { email, password, name } = validatedFields.data;

    // 2. 检查邮箱是否已存在
    const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
    });

    if (existingUser) {
        return { error: "该邮箱已被注册！" };
    }

    // 3. 密码加密
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. 写入数据库
    await db.insert(users).values({
        email,
        password: hashedPassword,
        name,
    });

    return { success: "注册成功！请登录" };
};

// --- 登录 Action ---
export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "参数无效！" };
    }

    const { email, password } = validatedFields.data;

    try {
        // 调用 NextAuth 的 signIn 方法
        // redirect: false 表示不自动跳转，由前端控制
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/", // 登录成功后跳转首页
        });
    } catch (error) {
        // NextAuth 的 signIn 在成功时会抛出一个重定向错误，我们需要抛出它
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "邮箱或密码错误！" };
                default:
                    return { error: "发生未知错误！" };
            }
        }
        throw error; // 必须抛出重定向错误，否则无法跳转
    }

    return { success: "登录成功！" };
};