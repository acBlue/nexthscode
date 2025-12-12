import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchSkeleton from '@/components/search/SearchSkeleton';
import { Search } from 'lucide-react';

export default function Loading() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
            <Navbar />

            {/* 模拟顶部搜索栏 (保持布局不跳动) */}
            <div className="bg-white border-b border-gray-200 sticky top-16 z-30 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-16 flex items-center gap-4">
                        <div className="h-9 w-9 bg-gray-100 rounded-lg"></div> {/* 筛选按钮占位 */}

                        {/* 搜索输入框占位 */}
                        <div className="flex-grow max-w-2xl relative">
                            <div className="w-full h-10 bg-gray-100 rounded-md border border-transparent"></div>
                            <Search className="w-4 h-4 text-gray-300 absolute left-3.5 top-3" />
                        </div>

                        <div className="flex items-center gap-3 ml-auto border-l border-gray-200 pl-4">
                            <div className="h-4 w-24 bg-gray-100 rounded hidden sm:block"></div>
                        </div>
                    </div>
                </div>
            </div>

            <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
                {/* 引入刚才写的骨架组件 */}
                <SearchSkeleton />
            </main>

            <Footer />
        </div>
    );
}