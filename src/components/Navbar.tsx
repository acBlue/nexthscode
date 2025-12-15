import React from 'react';
import { Globe } from 'lucide-react';

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo 区域 */}
                    <div className="flex items-center gap-2">
                        <div className="bg-blue-600 p-1.5 rounded-lg">
                            <Globe className="w-6 h-6 text-white" />
                        </div>
                        <a href="/" className="text-xl font-bold text-gray-900">HSCode Master</a>
                    </div>

                    {/* 中间导航链接 */}
                    <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
                        <a href="/search" className="hover:text-blue-600 transition-colors">编码查询</a>
                        <a href="#" className="hover:text-blue-600 transition-colors">税率计算</a>
                        <a href="#" className="hover:text-blue-600 transition-colors">法规政策</a>
                        <a href="#" className="hover:text-blue-600 transition-colors">关于我们</a>
                    </nav>

                    {/* 右侧按钮 */}
                    <div className="flex items-center gap-4">
                        <button className="text-sm font-medium text-gray-600 hover:text-gray-900">登录</button>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                            注册会员
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}