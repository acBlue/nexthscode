import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema/index.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: (process.env.DIRECT_URL || process.env.DATABASE_URL)!,
    },

    schemaFilter: ["public"],
});

// export default defineConfig({
//   schema: './db/schema.ts',
//   out: './drizzle',
//   dialect: 'sqlite', // 👈 变更为 sqlite
//   dbCredentials: {
//     url: 'sqlite.db', // 👈 本地文件路径，会自动生成在根目录
//   },
// });
