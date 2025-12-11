import React from 'react';
import { Package, Globe, BookOpen, TrendingUp, ShieldCheck, Layers, Anchor, Truck } from 'lucide-react';
import Link from 'next/link';
import { CategoryDTO } from '@/types';

// 建立一个简单的映射，根据罗马数字或者特定的 ID 给它分配图标
// 因为数据库里存图标路径不太常见，通常在前端做映射
const ICON_MAP: Record<string, any> = {
    default: Layers,
    'I': Package,      // 活动物
    'II': Globe,       // 植物
    'IV': BookOpen,    // 食品
    'V': ShieldCheck,  // 矿产
    'VI': TrendingUp,  // 化学
    'XI': Anchor,      // 纺织
    'XVI': Truck,      // 机械
};

interface CategoryGridProps {
    categories: CategoryDTO[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900">按行业浏览编码</h2>
                    <p className="mt-4 text-gray-600">覆盖 21 大类，98 章全套海关编码体系</p>
                </div>

                {/* 如果数据还没录入，显示空状态 */}
                {categories.length === 0 ? (
                    <div className="text-center py-10 text-gray-400 bg-white rounded-xl border border-dashed border-gray-300">
                        暂无分类数据，请先初始化数据库
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {categories.map((item) => {
                            // 动态获取图标，如果没有匹配则使用默认图标
                            const IconComponent = ICON_MAP[item.code] || ICON_MAP.default;

                            return (
                                <Link
                                    href={`/category?section=${item.id}`} // 点击跳转到我们之前做的分类浏览页
                                    key={item.id}
                                    className="group bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer block"
                                >
                                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                                        <IconComponent className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <div className="text-xs font-semibold text-blue-600 mb-1">第 {item.code} 类</div>
                                    <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 min-h-[48px]">
                                        {item.name}
                                    </h3>
                                </Link>
                            );
                        })}
                    </div>
                )}

                <div className="mt-12 text-center">
                    <Link href="/category" className="inline-flex items-center text-blue-600 font-medium hover:gap-2 transition-all">
                        查看所有分类 <Layers className="w-4 h-4 ml-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
}