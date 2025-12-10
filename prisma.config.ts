import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"), // client 使用（走 pooler）
    directUrl: env("DIRECT_URL"), // migrate 使用（直连）
  },

});
