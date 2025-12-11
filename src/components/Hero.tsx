"use client"; // 1. 必须标记为客户端组件

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation'; // 2. 引入路由

export default function Hero() {
    const router = useRouter();
    const [query, setQuery] = useState(""); // 3. 管理输入框状态

    // 4. 处理搜索逻辑
    const handleSearch = () => {
        if (!query.trim()) return; // 空字符不搜
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    };

    // 5. 处理回车键
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <section className="relative bg-white pt-20 pb-32 overflow-hidden">
            {/* 背景装饰保持不变 */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80')] opacity-5 bg-center bg-cover"></div>

            <div className="relative max-w-4xl mx-auto px-4 text-center">
                {/* ... 标题文字部分保持不变 ... */}
                <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-6 border border-blue-100">
          已更新 2025 年最新海关数据
        </span>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
                    全球海关编码 <span className="text-blue-600">智能查询引擎</span>
                </h1>
                <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
                    快速查找 HS 编码、进口关税税率及监管条件。助力跨境贸易，让通关更简单。
                </p>

                {/* 核心搜索组件 */}
                <div className="relative max-w-2xl mx-auto shadow-2xl rounded-2xl">
                    <div className="flex items-center bg-white rounded-2xl p-2 border border-gray-200 focus-within:ring-4 focus-within:ring-blue-100 transition-all">
                        <div className="pl-4 text-gray-400">
                            <Search className="w-6 h-6" />
                        </div>
                        <input
                            type="text"
                            className="w-full px-4 py-4 text-lg outline-none text-gray-800 placeholder:text-gray-400"
                            placeholder="输入商品名称 (如: 纯棉T恤) 或 HS 编码..."
                            value={query}            // 绑定 Value
                            onChange={(e) => setQuery(e.target.value)} // 绑定 onChange
                            onKeyDown={handleKeyDown} // 绑定回车
                        />
                        <button
                            onClick={handleSearch}    // 绑定点击
                            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition-all shadow-md"
                        >
                            搜索
                        </button>
                    </div>
                </div>

                {/* ... 热门搜索保持不变 ... */}
                <div className="mt-6 flex justify-center gap-4 text-sm text-gray-500">
                    <span>热门搜索:</span>
                    {/* 这里可以做成点击直接跳转搜索 */}
                    <button onClick={() => router.push('/search?q=半导体')} className="underline hover:text-blue-600">半导体</button>
                    <button onClick={() => router.push('/search?q=汽车配件')} className="underline hover:text-blue-600">汽车配件</button>
                    <button onClick={() => router.push('/search?q=锂电池')} className="underline hover:text-blue-600">锂电池</button>
                </div>
            </div>
        </section>
    );
}