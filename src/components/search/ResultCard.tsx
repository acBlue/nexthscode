import React from 'react';
import { ChevronRight, Calculator, FileText, Star } from 'lucide-react';
import Link from 'next/link'; // 1. 引入 Link

interface ResultItem {
    id: string;
    hscode: string; // 格式: "8542.31.00.00"
    name: string;
    nameEn: string;
    unit: string;
    rates: {
        mfn: string;
        gen: string;
        vat: string;
        drawback: string;
    };
    regulatory: string[];
    isFavorite: boolean;
}

export default function ResultCard({ item }: { item: ResultItem }) {
    // 2. 生成跳转链接: 去除小数点，例如 /hscode/8542310000
    const detailUrl = `/hscode/${item.hscode.replace(/\./g, '')}`;

    return (
        // 3. 将外层 div 改为 Link (或者保留 div 但包裹 Link)
        // 为了更好的语义化，我们保持 div 结构，但让标题和按钮变成 Link
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group relative">
            <div className="p-5">
                {/* 顶部：编码与标题 */}
                <div className="flex justify-between items-start mb-3">
                    <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-1">
                            <Link href={detailUrl} className="font-mono text-lg font-bold text-blue-700 tracking-wide hover:underline">
                                {item.hscode}
                            </Link>
                            {item.regulatory.map((reg, i) => (
                                <span key={i} className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                  {reg}
                </span>
                            ))}
                        </div>
                        <Link href={detailUrl} className="block">
                            <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                {item.name}
                            </h3>
                        </Link>
                        <p className="text-xs text-gray-500 mt-1 font-light italic">
                            {item.nameEn}
                        </p>
                    </div>
                    <button className={`text-gray-300 hover:text-yellow-400 transition-colors ${item.isFavorite ? 'text-yellow-400 fill-current' : ''}`}>
                        <Star className="w-5 h-5" />
                    </button>
                </div>

                {/* ... 中间数据网格保持不变 ... */}
                <div className="grid grid-cols-4 gap-1 mt-4 mb-4 bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <div className="text-center border-r border-gray-200 last:border-0">
                        <div className="text-xs text-gray-500 mb-1">最惠国税率</div>
                        <div className="font-bold text-green-600">{item.rates.mfn}</div>
                    </div>
                    <div className="text-center border-r border-gray-200 last:border-0">
                        <div className="text-xs text-gray-500 mb-1">普通税率</div>
                        <div className="font-medium text-gray-900">{item.rates.gen}</div>
                    </div>
                    <div className="text-center border-r border-gray-200 last:border-0">
                        <div className="text-xs text-gray-500 mb-1">增值税</div>
                        <div className="font-medium text-gray-900">{item.rates.vat}</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">退税率</div>
                        <div className="font-medium text-gray-900">{item.rates.drawback}</div>
                    </div>
                </div>

                {/* 底部：操作区 */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="text-xs text-gray-400">
                        计量单位: <span className="text-gray-600">{item.unit}</span>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-blue-600 px-2 py-1 rounded hover:bg-gray-50 transition-colors">
                            <Calculator className="w-3.5 h-3.5" /> 税费计算
                        </button>

                        {/* 4. 修改详情按钮为 Link */}
                        <Link
                            href={detailUrl}
                            className="flex items-center gap-1 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded transition-colors shadow-sm"
                        >
                            详情
                            <ChevronRight className="w-3 h-3" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}