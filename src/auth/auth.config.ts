import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/login", // 自定义登录页面的路径
        // newUser: '/register', // 注册后跳转路径
    },
    callbacks: {
        // 路由拦截逻辑：决定用户是否可以访问某些页面
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;

            // 假设 /dashboard 需要登录才能访问
            const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // 重定向到登录页
            } else if (isLoggedIn && nextUrl.pathname === "/login") {
                // 如果已登录还在访问登录页，重定向到首页或 dashboard
                return Response.redirect(new URL("/", nextUrl));
            }

            return true;
        },
        // 将用户 ID 和 Role 放入 Session 中，方便前端获取
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            // 如果你在 jwt 回调里放了 role，这里也可以取
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
            }
            return token;
        }
    },
    providers: [], // 在这里先留空，因为 Edge 环境不支持某些 Provider 的依赖
} satisfies NextAuthConfig;