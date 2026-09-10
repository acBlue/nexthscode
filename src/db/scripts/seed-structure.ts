import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { sql } from 'drizzle-orm';
import * as schema from '../schema';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env' });

const dbUrl = process.env.DIRECT_URL || process.env.DATABASE_URL;

interface ChapterSource {
  code: string;
  name: string;
}

interface SectionSource {
  code: string;
  name: string;
  chapters: ChapterSource[];
}

type AppDb = ReturnType<typeof drizzle<typeof schema>>;

export async function seedStructure(customDb?: AppDb) {
  console.log('📦 开始初始化基础结构数据 (大类与章节)...');

  const client = customDb ? null : postgres(dbUrl!, { max: 1 });
  const db = customDb || drizzle(client!, { schema });

  const filePath = path.join(process.cwd(), 'src', 'db', 'data', 'hs_structure.json');
  if (!fs.existsSync(filePath)) {
    throw new Error(`❌ 找不到数据文件: ${filePath}`);
  }

  const rawData = fs.readFileSync(filePath, 'utf-8');
  const sectionsData: SectionSource[] = JSON.parse(rawData);

  console.log(`📑 读取到 ${sectionsData.length} 个大类`);

  let sectionSort = 1;
  for (const sectionData of sectionsData) {
    const [insertedSection] = await db
      .insert(schema.sections)
      .values({
        code: sectionData.code,
        name: sectionData.name,
        sortOrder: sectionSort++,
      })
      .onConflictDoUpdate({
        target: schema.sections.code,
        set: {
          name: sectionData.name,
          updatedAt: new Date(),
        },
      })
      .returning({ id: schema.sections.id });

    if (!insertedSection) {
      console.error(`❌ 插入大类失败: ${sectionData.code}`);
      continue;
    }

    if (sectionData.chapters.length > 0) {
      const chapterValues = sectionData.chapters.map((ch, idx) => ({
        code: ch.code,
        name: ch.name,
        sectionId: insertedSection.id,
        sortOrder: parseInt(ch.code, 10) || idx + 1,
      }));

      await db
        .insert(schema.chapters)
        .values(chapterValues)
        .onConflictDoUpdate({
          target: schema.chapters.code,
          set: {
            name: sql`excluded.name`,
            sectionId: insertedSection.id,
            updatedAt: new Date(),
          },
        });
    }
  }

  console.log('✅ 基础结构初始化完成！');
  if (client) {
    await client.end();
  }
}

// 独立运行时执行
if (require.main === module) {
  if (!dbUrl) {
    console.error('❌ DIRECT_URL 或 DATABASE_URL 未定义，请检查 .env 文件');
    process.exit(1);
  }
  seedStructure().catch((e) => {
    console.error('❌ 脚本执行出错:', e);
    process.exit(1);
  });
}
