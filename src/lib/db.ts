import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../db/schema'; // 导入刚才创建的 schema 聚合入口

// 1. 获取连接字符串
const connectionString = process.env.DATABASE_URL!;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined');
}

// 2. 处理开发环境下的连接缓存 (Singleton Pattern)
// 下面这段代码是为了防止 Next.js 热重载时创建过多的数据库连接
const globalForDb = global as unknown as { conn: postgres.Sql | undefined };

// 3. 配置 Postgres 客户端
const conn = globalForDb.conn ?? postgres(connectionString, {
  // Supabase 特别配置：
  // 如果你使用的是 Supabase 的 Transaction Mode (端口 6543)，通常建议设置 prepare: false
  // 因为 Transaction Pooler 不支持 prepared statements
  prepare: false, 
});

if (process.env.NODE_ENV !== 'production') globalForDb.conn = conn;

// 4. 初始化 Drizzle
// logger: true 会在控制台打印 SQL 语句，方便调试
export const db = drizzle(conn, { 
  schema, 
  logger: process.env.NODE_ENV === 'development' 
});