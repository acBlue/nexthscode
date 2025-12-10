"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategorySidebar from '@/components/category/CategorySidebar';
import ChapterGrid from '@/components/category/ChapterGrid';

// --- 模拟数据: 大类 ---
const SECTIONS = [
    { id: "1", roman: "I", name: "活动物; 动物产品" },
    { id: "2", roman: "II", name: "植物产品" },
    { id: "3", roman: "III", name: "动植物油脂及其分解产品" },
    { id: "4", roman: "IV", name: "食品; 饮料、酒及醋; 烟草" },
    { id: "5", roman: "V", name: "矿产品" },
    { id: "16", roman: "XVI", name: "机器、机械器具、电气设备及其零件; 录音机及放声机..." }, // 演示用，故意跳到常用类
];

// --- 模拟数据: 章节 (根据大类ID映射) ---
const CHAPTERS_MAP: Record<string, any[]> = {
    "1": [
        { code: "01", name: "活动物", desc: "马、驴、骡、牛、猪、绵羊、山羊、家禽等", count: 120 },
        { code: "02", name: "肉及食用杂碎", desc: "鲜、冷、冻的猪肉、牛肉、羊肉及家禽肉", count: 340 },
        { code: "03", name: "鱼、甲壳动物、软体动物", desc: "活鱼、鲜鱼、冻鱼、鱼片、甲壳动物等", count: 890 },
        { code: "04", name: "乳品; 蛋品; 天然蜂蜜", desc: "鲜乳、奶粉、酸奶、黄油、乳酪、禽蛋", count: 210 },
        { code: "05", name: "其他动物产品", desc: "人发、猪鬃、肠衣、羽毛、骨、象牙等", count: 95 },
    ],
    "2": [
        { code: "06", name: "活树及其他植物; 鳞茎、根", desc: "鲜花、插花、盆栽植物、种球", count: 150 },
        { code: "07", name: "食用蔬菜、根及块茎", desc: "马铃薯、番茄、洋葱、卷心菜、菜豆", count: 420 },
        { code: "08", name: "食用水果及坚果", desc: "椰子、香蕉、菠萝、柑橘、葡萄、苹果", count: 380 },
        { code: "09", name: "咖啡、茶、马黛茶及调味香料", desc: "咖啡豆、绿茶、红茶、胡椒、肉桂", count: 260 },
    ],
    "16": [
        { code: "84", name: "核反应堆、锅炉、机器、机械器具及其零件", desc: "发动机、泵、空调、冰箱、计算机、机床、轴承等", count: 5400 },
        { code: "85", name: "电机、电气设备及其零件; 录音机及放声机", desc: "电动机、电池、吸尘器、手机、集成电路、显示器", count: 4200 },
    ]
};

export default function CategoryPage() {
    // 默认选中第 16 类 (因为它是电子产品，最常用，或者默认选第 1 类)
    const [activeSectionId, setActiveSectionId] = useState("16");

    // 获取当前选中的大类信息
    const activeSection = SECTIONS.find(s => s.id === activeSectionId) || SECTIONS[0];

    // 获取该大类下的章节，如果没有数据则显示空数组
    const currentChapters = CHAPTERS_MAP[activeSectionId] || [];

    return (
        <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
            <Navbar />

            {/* 顶部简单的 Page Header */}
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold text-gray-900">全部分类浏览</h1>
                    <p className="text-gray-500 mt-2">
                        依照《商品名称及编码协调制度》(HS Code) 划分的 21 大类、98 个章节。
                    </p>
                </div>
            </div>

            <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">

                    {/* 左侧导航 */}
                    <CategorySidebar
                        sections={SECTIONS}
                        activeId={activeSectionId}
                        onSelect={setActiveSectionId}
                    />

                    {/* 右侧内容 */}
                    <ChapterGrid
                        sectionName={`${activeSection.roman} 类 - ${activeSection.name}`}
                        chapters={currentChapters}
                    />

                </div>
            </main>

            <Footer />
        </div>
    );
}