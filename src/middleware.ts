import NextAuth from "next-auth";
import { authConfig } from "./auth/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
    // 仅拦截需要鉴权或做登录跳转的路由，避免对首页、搜索、分类等公开页面产生中间件阻塞
    matcher: ["/profile/:path*", "/login", "/register"],
};
