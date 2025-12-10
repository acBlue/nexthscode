"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
// 引入拆分后的组件
import DetailHeader from '@/components/hscode/DetailHeader';
import ChapterInfo from '@/components/hscode/ChapterInfo';
import RegulatoryCard from '@/components/hscode/RegulatoryCard';
import BasicRates from '@/components/hscode/BasicRates';
import AgreementRates from '@/components/hscode/AgreementRates';
import DeclarationElements from '@/components/hscode/DeclarationElements';

// --- 模拟数据 (Database Mock) ---
const DATA = {
    hscode: "8542.31.00.00",
    name: "用作处理器及控制器的集成电路",
    nameEn: "Processors and controllers, whether or not combined with memories...",

    // 章节信息
    category: {
        section: { code: "第十六类", name: "机器、机械器具、电气设备及其零件..." },
        chapter: { code: "第八十五章", name: "电机、电气设备及其零件..." },
    },

    // 基础税率
    basicRates: {
        mfn: "0%",
        general: "0%",
        vat: "13%",
        drawback: "13%"
    },

    // 协定税率
    agreements: [
        { name: "RCEP (中国-东盟)", rate: "0%", country: "东盟各国" },
        { name: "RCEP (中国-日本)", rate: "0%", country: "日本" },
        { name: "中韩自贸协定", rate: "0%", country: "韩国" },
        { name: "中澳自贸协定", rate: "0%", country: "澳大利亚" },
    ],

    // 监管条件
    supervision: [
        { code: "6", name: "旧机电产品禁止进口" },
        { code: "A", name: "入境货物通关单" },
        { code: "B", name: "出境货物通关单" }
    ],

    // CIQ 检验检疫
    inspection: [
        { code: "M", name: "进口商品检验" },
        { code: "L", name: "民用商品入境验证" }
    ],

    // 申报要素
    elements: [
        { id: 1, name: "品名", required: true, example: "集成电路" },
        { id: 2, name: "品牌类型", required: true, example: "无品牌" },
        { id: 3, name: "出口享惠情况", required: true, example: "不享惠" },
        { id: 4, name: "制作工艺", required: false, example: "单片/混合/多芯片等" },
        { id: 5, name: "结构", required: true, example: "处理器及控制器" },
        { id: 6, name: "品牌", required: true, example: "INTEL等" },
        { id: 7, name: "型号", required: true, example: "i7-12700K" },
    ]
};

export default function DetailPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar />

            {/* 1. 顶部 Header 组件 */}
            <DetailHeader
                hscode={DATA.hscode}
                name={DATA.name}
                nameEn={DATA.nameEn}
            />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* --- 左侧边栏 (3列) --- */}
                    <div className="lg:col-span-3 space-y-6">
                        <ChapterInfo data={DATA.category} />

                        {/* 复用 RegulatoryCard，分别展示监管条件和 CIQ */}
                        <RegulatoryCard
                            title="监管证件"
                            type="customs"
                            items={DATA.supervision}
                        />

                        <RegulatoryCard
                            title="CIQ 检验检疫"
                            type="ciq"
                            items={DATA.inspection}
                        />
                    </div>

                    {/* --- 右侧主内容 (9列) --- */}
                    <div className="lg:col-span-9 space-y-6">

                        {/* 基础税率组件 */}
                        <BasicRates data={DATA.basicRates} />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            {/* 协定税率组件 */}
                            <AgreementRates items={DATA.agreements} />

                            {/* 申报要素组件 */}
                            <DeclarationElements items={DATA.elements} />
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}