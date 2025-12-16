import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: [ 'localhost:3000'],
  productionBrowserSourceMaps: false,
  output: 'standalone',

};





export default nextConfig;
