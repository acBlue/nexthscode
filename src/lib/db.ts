import {drizzle} from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../db/schema'; // 引入刚才定义的 schema

const connectionString = process.env.DATABASE_URL!;

// 禁用预处理语句 (prepare: false) 对于 Supabase Transaction Pool 是必须的
const client = postgres(connectionString, {prepare: false});

export const db = drizzle(client as any, {schema, logger: process.env.NODE_ENV === 'development'} as any);