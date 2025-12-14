import React from 'react';
import { 
  ChevronRight, 
  ShieldCheck, 
  Scale, 
  BadgePercent, 
  Landmark, 
  Container, 
  Microscope,
  Star
} from 'lucide-react';
import Link from 'next/link';

interface ResultItem {
  id: string;
  cleanCode: string;
  code: string;
  name: string;
  
  // 单位
  unit1: string | null;
  unit2: string | null;
  
  // 监管与检疫
  regulatoryCode: string | null;
  quarantineCode?: string | null; // ✨ 建议在父组件传入这个字段
  
  // 税率
  mfnRate: string | null;        
  generalRate?: string | null;
  tempRate?: string | null;       // ✨ 建议传入暂定税率
  vatRate: string | null;
  consumptionRate?: string | null; // ✨ 建议传入消费税
  exportRebateRate: string | null; 
}

export default function ResultCard({ item }: { item: ResultItem }) {
  const linkId = item.cleanCode || item.id;
  const detailUrl = `/hscode/${linkId}`;

  const val = (v: string | null | undefined) => v || '-';

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-400 transition-all duration-200 group relative overflow-hidden">
      
      {/* 侧边装饰条 (可选，增加设计感) */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>

      <div className="p-4">
        
        {/* --- 1. 顶部：编码与名称 --- */}
        <div className="flex justify-between items-start mb-3 pl-2">
          <div className="flex-grow space-y-1">
            <Link href={detailUrl} className="block group/title">
              <span className="font-mono text-xl font-extrabold text-blue-700 tracking-wide group-hover/title:underline decoration-2 underline-offset-2 mr-3">
                 {item.code || item.cleanCode}
              </span>
              <span className="text-lg font-bold text-gray-900 group-hover/title:text-blue-600 transition-colors">
                {item.name}
              </span>
            </Link>
          </div>
          {/* 收藏按钮 (占位，未来可做功能) */}
          <button className="text-gray-300 hover:text-yellow-400 transition-colors">
            <Star className="w-5 h-5" />
          </button>
        </div>

        {/* --- 2. 中间：数据矩阵 (核心区域) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-4 pl-2">
          
          {/* A. 左侧：进口/税费 (Import & Cost) */}
          <div className="space-y-3">
             <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                <Landmark className="w-3 h-3" /> 进口税费
             </div>
             
             <div className="grid grid-cols-2 gap-2">
                {/* 最惠国 */}
                <div className="bg-blue-50/50 p-2 rounded border border-blue-100">
                   <div className="text-xs text-blue-600 mb-0.5">最惠国税率</div>
                   <div className="font-bold text-blue-900 text-lg leading-none">
                      {item.tempRate ? (
                        <span title="暂定税率优先">{item.tempRate}<span className="text-[10px] ml-1 text-blue-400">暂</span></span>
                      ) : val(item.mfnRate)}
                   </div>
                </div>

                {/* 增值税 */}
                <div className="bg-gray-50 p-2 rounded border border-gray-100">
                   <div className="text-xs text-gray-500 mb-0.5">增值税</div>
                   <div className="font-bold text-gray-900 text-lg leading-none">{val(item.vatRate)}</div>
                </div>
             </div>

             {/* 补充税率信息 (如消费税、普通税) */}
             <div className="flex gap-3 text-xs text-gray-500 px-1">
                <span>普通: {val(item.generalRate)}</span>
                {item.consumptionRate && item.consumptionRate !== '0' && (
                  <span className="text-amber-600 font-medium">消费税: {item.consumptionRate}</span>
                )}
             </div>
          </div>

          {/* B. 右侧：出口/合规 (Export & Compliance) */}
          <div className="space-y-3">
             <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                <Container className="w-3 h-3" /> 合规监管
             </div>

             {/* 出口退税 (大卡片) */}
             <div className="flex items-center justify-between bg-green-50/50 p-2 rounded border border-green-100">
                <div className="text-xs text-green-700">出口退税率</div>
                <div className="font-bold text-green-700 text-lg leading-none">{val(item.exportRebateRate)}</div>
             </div>

             {/* 监管与检疫 (标签流) */}
             <div className="flex flex-wrap gap-2">
                {/* 监管代码 */}
                {item.regulatoryCode ? (
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-amber-50 border border-amber-200 text-xs text-amber-800 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>监管: {item.regulatoryCode}</span>
                  </div>
                ) : (
                  <div className="text-xs text-gray-300 py-1">无监管条件</div>
                )}

                {/* 检疫代码 (如果有数据) */}
                {item.quarantineCode && (
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-purple-50 border border-purple-200 text-xs text-purple-800 font-medium">
                    <Microscope className="w-3.5 h-3.5" />
                    <span>检疫: {item.quarantineCode}</span>
                  </div>
                )}
             </div>
          </div>
        </div>

        {/* --- 3. 底部：法定单位 (Footer) --- */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 pl-2">
          
          {/* 左侧：单位展示 */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Scale className="w-3.5 h-3.5" />
              <span className="font-medium">法定计量单位:</span>
            </div>
            <div className="flex gap-2 text-xs font-mono text-gray-700">
               {item.unit1 ? (
                 <span className="bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">
                    {item.unit1}
                 </span>
               ) : <span>-</span>}
               {item.unit2 && (
                 <span className="bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">
                    {item.unit2}
                 </span>
               )}
            </div>
          </div>

          {/* 右侧：操作引导 */}
          <Link href={detailUrl} className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors">
            查看详情 <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}