import type { NextConfig } from "next";

// 检测是否处于 Vercel 托管部署环境
const isVercel = process.env.VERCEL === "1" || !!process.env.VERCEL_ENV;

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ['localhost:3000'],
  productionBrowserSourceMaps: false,
  // 关键修复：Vercel 拥有专属优化运行时，严禁使用 standalone；
  // 仅在本地 Docker 容器打包时启用 standalone
  output: isVercel ? undefined : 'standalone',
};

export default nextConfig;
