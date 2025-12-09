"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchHeader from '@/components/search/SearchHeader';
import FilterSidebar from '@/components/search/FilterSidebar';
import ResultCard from '@/components/search/ResultCard';

// 模拟数据 (在真实应用中，这通常来自 API)
const MOCK_RESULTS = [
    {
        id: 1,
        hscode: "8542.31.00.00",
        name: "用作处理器及控制器的集成电路",
        nameEn: "Processors and controllers, whether or not combined with memories...",
        unit: "个/千克",
        rates: { mfn: "0%", gen: "0%", vat: "13%", drawback: "13%" },
        regulatory: ["3C", "进口许可"],
        isFavorite: true
    },
    {
        id: 2,
        hscode: "8542.32.00.01",
        name: "存储器集成电路 (DRAM)",
        nameEn: "Memories (Electronic integrated circuits)",
        unit: "个",
        rates: { mfn: "0%", gen: "0%", vat: "13%", drawback: "13%" },
        regulatory: [],
        isFavorite: false
    },
    {
        id: 3,
        hscode: "8542.33.90.00",
        name: "其他放大器集成电路",
        nameEn: "Amplifiers (Electronic integrated circuits)",
        unit: "个/千克",
        rates: { mfn: "0%", gen: "0%", vat: "13%", drawback: "13%" },
        regulatory: ["两用物项"],
        isFavorite: false
    },
    {
        id: 4,
        hscode: "8471.30.10.00",
        name: "平板电脑",
        nameEn: "Tablet computers",
        unit: "台",
        rates: { mfn: "0%", gen: "0%", vat: "13%", drawback: "13%" },
        regulatory: ["3C"],
        isFavorite: false
    },
];

export default function SearchPage() {
    const [showFilters, setShowFilters] = useState(true);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
            <Navbar />

            {/* 顶部工具栏组件 */}
            <SearchHeader showFilters={showFilters} setShowFilters={setShowFilters} />

            <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex gap-6 items-start">

                    {/* 侧边栏组件 (条件渲染) */}
                    {showFilters && <FilterSidebar />}

                    {/* 结果列表 */}
                    <div className="flex-grow space-y-4">
                        {MOCK_RESULTS.map((item) => (
                            <ResultCard key={item.id} item={item} />
                        ))}

                        {/* 分页区域 (代码较少，暂时保留在页面内，也可以拆分) */}
                        <div className="pt-8 pb-12 flex justify-center">
                            <div className="flex gap-2">
                                <button className="px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-500 hover:bg-white bg-gray-50" disabled>上一页</button>
                                <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm font-medium shadow-sm">1</button>
                                <button className="px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50 bg-white">2</button>
                                <button className="px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50 bg-white">3</button>
                                <button className="px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50 bg-white">下一页</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}