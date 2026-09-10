import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../schema';
import { sql } from 'drizzle-orm';
import fs from 'fs';
import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const dbUrl = process.env.DIRECT_URL || process.env.DATABASE_URL;

interface SourceData {
  hs_code: string;
  product_name: string;
  remarks: string;
  regulatory_code: string;
  quarantine_code: string;
  unit_1: string;
  unit_2: string;
  import_mfn_tax: string;
  import_general_tax: string;
  import_temp_tax: string;
  consumption_tax: string;
  vat_tax: string;
  waste_fund: string;
  us_tariff: string;
  export_tax: string;
  export_temp_tax: string;
  export_rebate_tax: string;
  declaration_elements: unknown[];
}

function formatHsCode(clean: string): string {
  if (!clean || clean.length < 10) return clean;
  return `${clean.slice(0, 4)}.${clean.slice(4, 6)}.${clean.slice(6, 8)}.${clean.slice(8, 10)}`;
}

type AppDb = ReturnType<typeof drizzle<typeof schema>>;

export async function seedHscodes(customDb?: AppDb) {
  console.log('📦 开始导入 HS Code 数据...');

  const filePath = path.join(process.cwd(), 'src', 'db', 'data', 'final_db_import_data.json');
  if (!fs.existsSync(filePath)) {
    throw new Error(`❌ 找不到文件: ${filePath}`);
  }

  const client = customDb ? null : postgres(dbUrl!, { max: 1 });
  const db = customDb || drizzle(client!, { schema });

  console.log('📖 正在读取 JSON 文件...');
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const jsonData: SourceData[] = JSON.parse(rawData);
  console.log(`📊 共读取到 ${jsonData.length} 条数据`);

  console.log('🔍 正在缓存章节信息...');
  const allChapters = await db.query.chapters.findMany({
    columns: { id: true, code: true },
  });

  const chapterMap = new Map<string, string>();
  allChapters.forEach((c: { code: string; id: string }) => {
    chapterMap.set(c.code, c.id);
  });
  console.log(`✅ 已缓存 ${chapterMap.size} 个章节`);

  const BATCH_SIZE = 500;
  type HsCodeInsert = typeof schema.hscodes.$inferInsert;
  let batchBuffer: HsCodeInsert[] = [];
  let successCount = 0;
  let skipCount = 0;

  for (let i = 0; i < jsonData.length; i++) {
    const item = jsonData[i];
    const chapterCode = item.hs_code.substring(0, 2);
    const chapterId = chapterMap.get(chapterCode);

    if (!chapterId) {
      skipCount++;
      continue;
    }

    const record = {
      code: formatHsCode(item.hs_code),
      cleanCode: item.hs_code,
      name: item.product_name,
      description: item.remarks || null,
      status: 1,

      unit1: item.unit_1 || null,
      unit2: item.unit_2 || null,

      regulatoryCode: item.regulatory_code || null,
      quarantineCode: item.quarantine_code || null,

      mfnRate: item.import_mfn_tax || null,
      generalRate: item.import_general_tax || null,
      tempRate: item.import_temp_tax || null,
      consumptionRate: item.consumption_tax || null,
      vatRate: item.vat_tax || null,

      exportTaxRate: item.export_tax || null,
      exportRebateRate: item.export_rebate_tax || null,
      exportTempRate: item.export_temp_tax || null,

      usTariffRate: item.us_tariff || null,
      elements: item.declaration_elements,
      chapterId: chapterId,
    };

    batchBuffer.push(record);

    if (batchBuffer.length >= BATCH_SIZE || i === jsonData.length - 1) {
      if (batchBuffer.length > 0) {
        await db
          .insert(schema.hscodes)
          .values(batchBuffer)
          .onConflictDoUpdate({
            target: schema.hscodes.cleanCode,
            set: {
              name: sql`excluded.name`,
              unit1: sql`excluded.unit1`,
              unit2: sql`excluded.unit2`,
              mfnRate: sql`excluded."mfnRate"`,
              generalRate: sql`excluded."generalRate"`,
              vatRate: sql`excluded."vatRate"`,
              elements: sql`excluded.elements`,
              status: sql`excluded.status`,
              updatedAt: new Date(),
            },
          });

        successCount += batchBuffer.length;
        process.stdout.write(`\r⏳ 已处理: ${successCount} / ${jsonData.length}`);
        batchBuffer = [];
      }
    }
  }

  console.log('\n✅ HS Code 导入完成!');
  console.log(`📊 成功: ${successCount}, 跳过: ${skipCount}`);

  if (client) {
    await client.end();
  }
}

if (require.main === module) {
  if (!dbUrl) {
    console.error('❌ DIRECT_URL 或 DATABASE_URL 未定义，请检查 .env 文件');
    process.exit(1);
  }
  seedHscodes().catch((err) => {
    console.error('❌ 脚本执行出错:', err);
    process.exit(1);
  });
}
