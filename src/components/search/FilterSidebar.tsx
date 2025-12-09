import React from 'react';

export default function FilterSidebar() {
    return (
        <aside className="w-64 flex-shrink-0 hidden md:block">
            <div className="sticky top-36 space-y-6 pr-2">

                {/* 过滤器组: 章节 */}
                <div className="pb-4 border-b border-gray-200">
                    <h3 className="text-sm font-bold text-gray-900 mb-3 flex justify-between">
                        章节分类
                        <span className="text-xs text-gray-400 font-normal">多选</span>
                    </h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                        {['第 85 章 (电机电气)', '第 84 章 (机械器具)', '第 90 章 (精密仪器)'].map((label, i) => (
                            <label key={i} className="flex items-center gap-2 group cursor-pointer">
                                <div className="relative flex items-center">
                                    <input type="checkbox" className="peer w-4 h-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500" defaultChecked={i===0} />
                                </div>
                                <span className="text-sm text-gray-600 group-hover:text-blue-700">{label}</span>
                                <span className="ml-auto text-xs text-gray-400">120</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* 过滤器组: 税率范围 */}
                <div className="pb-4 border-b border-gray-200">
                    <h3 className="text-sm font-bold text-gray-900 mb-3">最惠国税率</h3>
                    <div className="space-y-2">
                        {['0% (零关税)', '1% - 5%', '5% - 10%', '10% 以上'].map((label, i) => (
                            <label key={i} className="flex items-center gap-2 group cursor-pointer">
                                <input type="radio" name="tax_rate" className="w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500" />
                                <span className="text-sm text-gray-600 group-hover:text-blue-700">{label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* 过滤器组: 监管 */}
                <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-3">监管条件</h3>
                    <div className="flex flex-wrap gap-2">
                        {['3C认证', '进口许可证', '自动进口许可', '两用物项'].map((tag, i) => (
                            <span key={i} className="px-2 py-1 bg-white border border-gray-200 rounded text-xs text-gray-600 cursor-pointer hover:border-blue-400 hover:text-blue-600 transition-colors">
                 {tag}
               </span>
                        ))}
                    </div>
                </div>

            </div>
        </aside>
    );
}