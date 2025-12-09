import React from 'react';
import { Package, Globe, BookOpen, ArrowRight, TrendingUp, ShieldCheck } from 'lucide-react';

// 定义分类数据，方便管理
const categories = [
    { name: "活动物; 动物产品", icon: Package, code: "第一类" },
    { name: "植物产品", icon: Globe, code: "第二类" },
    { name: "食品; 饮料", icon: BookOpen, code: "第四类" },
    { name: "矿产品", icon: ShieldCheck, code: "第五类" },
    { name: "化学工业产品", icon: TrendingUp, code: "第六类" },
    { name: "塑料及其制品", icon: Package, code: "第七类" },
    { name: "纺织原料", icon: Globe, code: "第十一类" },
    { name: "机械电气设备", icon: BookOpen, code: "第十六类" },
];

export default function CategoryGrid() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900">按行业浏览编码</h2>
                    <p className="mt-4 text-gray-600">覆盖 21 大类，98 章全套海关编码体系</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {categories.map((item, index) => (
                        <div key={index} className="group bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">
                            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                                <item.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                            </div>
                            <div className="text-xs font-semibold text-blue-600 mb-1">{item.code}</div>
                            <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{item.name}</h3>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <button className="inline-flex items-center text-blue-600 font-medium hover:gap-2 transition-all">
                        查看所有分类 <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                </div>
            </div>
        </section>
    );
}