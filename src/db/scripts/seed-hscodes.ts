import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../schema'; // 确保路径指向你的 schema 文件
import { eq, sql } from 'drizzle-orm';
import fs from 'fs';
import path from 'path';
import * as dotenv from 'dotenv';

// 加载环境变量
dotenv.config({ path: '.env' });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

// 初始化数据库连接 (专门用于脚本的独立连接)
const client = postgres(process.env.DATABASE_URL, { max: 1 });
const db = drizzle(client, { schema });

// --- 类型定义 (对应你的 JSON 结构) ---
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
  declaration_elements: any[]; // JSON 数组
}

// --- 辅助函数：格式化 HS Code ---
// 输入: "0101210010" -> 输出: "0101.21.00.10"
function formatHsCode(clean: string): string {
  if (!clean || clean.length < 10) return clean;
  return `${clean.slice(0, 4)}.${clean.slice(4, 6)}.${clean.slice(6, 8)}.${clean.slice(8, 10)}`;
}

async function main() {
  console.log('🚀 开始导入 HS Code 数据...');

  // 1. 读取 JSON 文件
  const filePath = path.join(process.cwd(), 'src', 'db', 'data', 'final_db_import_data.json');

  if (!fs.existsSync(filePath)) {
    console.error(`❌ 找不到文件: ${filePath}`);
    process.exit(1);
  }
  
  console.log('📖 正在读取 JSON 文件...');
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const jsonData: SourceData[] = JSON.parse(rawData);
  console.log(`📦 共读取到 ${jsonData.length} 条数据`);

  // 2. 预加载所有章节 (Chapter) 到内存
  // 目的：为了获得 chapterId，避免在循环中频繁查询数据库
  console.log('🔄 正在缓存章节信息...');
  const allChapters = await db.query.chapters.findMany({
    columns: { id: true, code: true },
  });
  
  // 建立映射表: "01" -> "uuid-of-chapter-01"
  const chapterMap = new Map<string, string>();
  allChapters.forEach((c) => {
    chapterMap.set(c.code, c.id);
  });
  console.log(`✅ 已缓存 ${chapterMap.size} 个章节`);

  // 3. 数据处理与批量插入
  const BATCH_SIZE = 1000; // 每 1000 条插入一次
  let batchBuffer: any[] = [];
  let successCount = 0;
  let skipCount = 0;

  for (let i = 0; i < jsonData.length; i++) {
    const item = jsonData[i];
    
    // 获取章节码 (前2位)
    const chapterCode = item.hs_code.substring(0, 2);
    const chapterId = chapterMap.get(chapterCode);

    // 如果找不到章节 (说明之前的 seed 没跑全，或者数据有问题)，跳过
    if (!chapterId) {
      console.warn(`⚠️ 跳过: 找不到章节 [${chapterCode}] - 编码: ${item.hs_code}`);
      skipCount++;
      continue;
    }

    // 构建数据库记录对象
    const record = {
      code: formatHsCode(item.hs_code),
      cleanCode: item.hs_code,
      name: item.product_name,
      description: item.remarks || null,
      
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
      
      // JSON 字段直接存
      elements: item.declaration_elements,
      
      chapterId: chapterId,
    };

    batchBuffer.push(record);

    // 当缓冲区满或到达最后一条时，执行插入
    if (batchBuffer.length >= BATCH_SIZE || i === jsonData.length - 1) {
      if (batchBuffer.length > 0) {
        await db.insert(schema.hscodes)
          .values(batchBuffer)
          .onConflictDoUpdate({
            target: schema.hscodes.cleanCode, // 如果 cleanCode 冲突
            set: { // 更新以下字段 (根据需求，你可以全更新，也可以只更新部分)
              name: sql`excluded.name`,
              unit1: sql`excluded."unit1"`, // 注意 Postgres 大写字段可能需要引号，Drizzle通常自动处理，但手动写sql时要注意
              mfnRate: sql`excluded."mfnRate"`,
              elements: sql`excluded.elements`,
              updatedAt: new Date(),
            }
          });
        
        successCount += batchBuffer.length;
        process.stdout.write(`\r⏳ 已处理: ${successCount} / ${jsonData.length}`);
        batchBuffer = []; // 清空缓冲区
      }
    }
  }

  console.log('\n');
  console.log('🎉 导入完成!');
  console.log(`✅ 成功: ${successCount}`);
  console.log(`⚠️ 跳过: ${skipCount} (通常因为找不到对应章节)`);
  
  // 关闭连接
  await client.end();
}

main().catch((err) => {
  console.error('❌ 脚本执行出错:', err);
  process.exit(1);
});