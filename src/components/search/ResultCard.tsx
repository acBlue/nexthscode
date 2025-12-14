import React from 'react';
import { ChevronRight, ShieldCheck } from 'lucide-react'; // 确保图标已引入
import Link from 'next/link';

// 1. 更新接口定义：与新数据库 Schema 保持一致
interface ResultItem {
  id: string;
  cleanCode: string; // 关键：用于跳转 URL (例如 0101210010)
  code: string;      // 用于显示 (例如 0101.21.00.10)
  name: string;
  unit1: string | null;
  unit2: string | null;
  regulatoryCode: string | null;
  mfnRate: string | null;        
  vatRate: string | null;        
  exportRebateRate: string | null; 
}

export default function ResultCard({ item }: { item: ResultItem }) {
  // 2. 修复跳转链接：使用 cleanCode
  // 如果 cleanCode 为空，回退到 id 或空字符串防止报错
  const linkId = item.cleanCode || item.id;
  const detailUrl = `/hscode/${linkId}`;

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group relative">
      <div className="p-5">
        {/* 顶部：编码与标题 */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-grow">
            <div className="flex items-center gap-3 mb-1">
              {/* 编码链接 */}
              <Link href={detailUrl} className="font-mono text-lg font-bold text-blue-700 tracking-wide hover:underline">
                 {item.code || item.cleanCode}
              </Link>
              
              {/* 监管代码徽章 (有值才显示) */}
              {item.regulatoryCode && (
                <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-200" title="监管证件代码">
                  <ShieldCheck className="w-3 h-3" /> {item.regulatoryCode}
                </span>
              )}
            </div>
            
            {/* 标题链接 */}
            <Link href={detailUrl} className="block">
              <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                {item.name}
              </h3>
            </Link>
          </div>
        </div>

        {/* 中间核心数据网格 */}
        <div className="grid grid-cols-4 gap-1 mt-4 mb-4 bg-gray-50 rounded-lg p-3 border border-gray-100">
           <div className="text-center border-r border-gray-200 last:border-0">
              <div className="text-xs text-gray-500 mb-1">最惠国进口</div>
              <div className="font-bold text-gray-900">{item.mfnRate || '-'}</div>
           </div>
           <div className="text-center border-r border-gray-200 last:border-0">
              <div className="text-xs text-gray-500 mb-1">增值税</div>
              <div className="font-medium text-gray-900">{item.vatRate || '-'}</div>
           </div>
           <div className="text-center border-r border-gray-200 last:border-0">
              <div className="text-xs text-gray-500 mb-1">出口退税</div>
              <div className="font-medium text-green-600">{item.exportRebateRate || '-'}</div>
           </div>
           <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">计量单位</div>
              <div className="font-medium text-gray-900 text-xs mt-1 truncate">
                {/* 智能显示单位：如果有 unit2 则显示 unit1/unit2 */}
                {item.unit1 ? (item.unit2 ? `${item.unit1}/${item.unit2}` : item.unit1) : '-'}
              </div>
           </div>
        </div>

        {/* 底部：操作区 */}
        <div className="flex items-center justify-end pt-2 border-t border-gray-100">
            <Link 
              href={detailUrl}
              className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-1.5 rounded transition-colors"
            >
              查看完整详情
              <ChevronRight className="w-3 h-3" />
            </Link>
        </div>
      </div>
    </div>
  );
}