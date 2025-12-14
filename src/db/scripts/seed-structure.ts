import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../schema';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// 加载环境变量
dotenv.config({ path: '.env' });

if (!process.env.DATABASE_URL) {
  throw new Error('❌ DATABASE_URL 未定义，请检查 .env 文件');
}

// 连接数据库
const client = postgres(process.env.DATABASE_URL, { max: 1 });
const db = drizzle(client, { schema });

// 类型定义
interface ChapterSource {
  code: string;
  name: string;
}

interface SectionSource {
  code: string;
  name: string;
  chapters: ChapterSource[];
}

async function main() {
  console.log('🚀 开始初始化基础结构数据 (大类与章节)...');

  // 1. 读取 JSON 文件
  const filePath = path.join(process.cwd(), 'src', 'db', 'data', 'hs_structure.json');
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ 找不到数据文件: ${filePath}`);
    process.exit(1);
  }
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const sectionsData: SectionSource[] = JSON.parse(rawData);

  console.log(`📦 读取到 ${sectionsData.length} 个大类`);

  // 2. 遍历插入
  for (const sectionData of sectionsData) {
    // A. 插入或更新 Section
    // 使用 returning({ id: schema.sections.id }) 立即拿回 UUID
    const [insertedSection] = await db
      .insert(schema.sections)
      .values({
        code: sectionData.code,
        name: sectionData.name,
      })
      .onConflictDoUpdate({
        target: schema.sections.code, // 如果 code (I, II...) 冲突
        set: { name: sectionData.name }, // 更新名字
      })
      .returning({ id: schema.sections.id });

    if (!insertedSection) {
      console.error(`❌ 插入大类失败: ${sectionData.code}`);
      continue;
    }
    
    // console.log(`✅ 大类 [${sectionData.code}] 处理完成, ID: ${insertedSection.id}`);

    // B. 插入或更新 Chapters
    if (sectionData.chapters.length > 0) {
      const chapterValues = sectionData.chapters.map((ch) => ({
        code: ch.code,
        name: ch.name,
        sectionId: insertedSection.id, // 关联刚才拿到的大类 ID
      }));

      await db
        .insert(schema.chapters)
        .values(chapterValues)
        .onConflictDoUpdate({
          target: schema.chapters.code, // 如果 code (01, 02...) 冲突
          set: { 
            name: (table) => table.name, // 保持原名，或使用 sql`excluded.name` 更新
            sectionId: insertedSection.id // 确保归属正确
          }
        });
        
      // console.log(`   └─ 关联了 ${sectionData.chapters.length} 个章节`);
    }
  }

  console.log('🎉 基础结构初始化完成！');
  
  await client.end();
}

main().catch((e) => {
  console.error('❌ 脚本执行出错:', e);
  process.exit(1);
});