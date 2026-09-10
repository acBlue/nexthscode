import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import * as dotenv from 'dotenv';
import { seedStructure } from './scripts/seed-structure';
import { seedHscodes } from './scripts/seed-hscodes';

dotenv.config({ path: '.env' });

const dbUrl = process.env.DIRECT_URL || process.env.DATABASE_URL;

if (!dbUrl) {
  console.error('❌ DIRECT_URL 或 DATABASE_URL 未定义，请检查 .env 文件');
  process.exit(1);
}

async function main() {
  console.log('🚀 开始全量数据初始化...');
  const client = postgres(dbUrl!, { max: 1 });
  const db = drizzle(client, { schema });

  try {
    await seedStructure(db);
    await seedHscodes(db);
    console.log('🎉 所有数据种子注入完成！');
  } catch (error) {
    console.error('❌ 初始化失败:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
