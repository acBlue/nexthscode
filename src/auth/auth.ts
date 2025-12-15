import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

// 定义登录校验 Schema
const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    adapter: DrizzleAdapter(db), // 连接 Drizzle
    session: { strategy: "jwt" }, // 使用 Credentials 登录时必须用 jwt 策略
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    // 1. 从数据库查找用户
                    const user = await db.query.users.findFirst({
                        where: eq(users.email, email),
                    });

                    if (!user || !user.password) return null;

                    // 2. 比对密码
                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (passwordsMatch) return user;
                }

                return null;
            },
        }),
        // 后面如果想加 GitHub/Google 登录，直接在这里加 providers
    ],
});