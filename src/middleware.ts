import NextAuth from "next-auth";
import { authConfig } from "./auth/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
    // 匹配所有路径，但排除静态资源、图片等
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};