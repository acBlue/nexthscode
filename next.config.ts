import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ["http://172.29.159.251:3000/"],
  productionBrowserSourceMaps: false,
};





export default nextConfig;
