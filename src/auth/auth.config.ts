import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false;
            } else if (isLoggedIn && nextUrl.pathname === "/login") {
                return Response.redirect(new URL("/", nextUrl));
            }

            return true;
        },
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            // 确保 Session 使用 Token 中最新的 name
            if (token.name && session.user) {
                session.user.name = token.name as string;
            }
            return session;
        },
        // 修改这里：增加 trigger 和 session 参数
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.sub = user.id;
            }

            // 处理客户端发起的 update() 请求
            if (trigger === "update" && session?.name) {
                token.name = session.name;
            }

            return token;
        }
    },
    providers: [],
} satisfies NextAuthConfig;