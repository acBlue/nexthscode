import React from 'react';
import { Globe } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-2 mb-4">
                        <Globe className="w-6 h-6 text-blue-500" />
                        <span className="text-xl font-bold text-white">HSCode Master</span>
                    </div>
                    <p className="text-sm text-gray-400 max-w-sm">
                        我们致力于为外贸企业提供最准确、最及时的全球海关编码查询服务，助力企业合规出海。
                    </p>
                </div>
                <div>
                    <h4 className="text-white font-semibold mb-4">快速链接</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white">首页</a></li>
                        <li><a href="#" className="hover:text-white">编码查询</a></li>
                        <li><a href="#" className="hover:text-white">税率计算器</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-semibold mb-4">联系支持</h4>
                    <ul className="space-y-2 text-sm">
                        <li>帮助中心</li>
                        <li>API 接口文档</li>
                        <li>联系我们</li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-sm text-gray-500 text-center">
                © 2025 HSCode Master. All rights reserved.
            </div>
        </footer>
    );
}