"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
    Copy, CheckCircle2, Printer, Share2,
    Calculator, Landmark, FileText, ShieldCheck,
    Globe, ChevronRight, BookOpen, AlertCircle
} from 'lucide-react';
import Link from 'next/link';

// --- 模拟数据 (增强版) ---
const DATA = {
    hscode: "8542.31.00.00",
    name: "用作处理器及控制器的集成电路",
    nameEn: "Processors and controllers, whether or not combined with memories...",
    updateTime: "2025-01-01",
    unit: "个/千克",

    // 1. 新增：章节归类信息
    category: {
        section: { code: "第十六类", name: "机器、机械器具、电气设备及其零件..." },
        chapter: { code: "第八十五章", name: "电机、电气设备及其零件..." },
        heading: { code: "8542", name: "集成电路" }
    },

    // 基础税率
    basicRates: {
        mfn: "0%",       // 最惠国
        general: "0%",   // 普通
        vat: "13%",      // 增值税
        drawback: "13%", // 退税
        consumption: "0%" // 消费税
    },

    // 2. 新增：协定税率 (RCEP 等)
    agreements: [
        { name: "RCEP (中国-东盟)", rate: "0%", country: "东盟各国" },
        { name: "RCEP (中国-日本)", rate: "0%", country: "日本" },
        { name: "RCEP (中国-韩国)", rate: "0%", country: "韩国" },
        { name: "中韩自贸协定", rate: "0%", country: "韩国" },
        { name: "中澳自贸协定", rate: "0%", country: "澳大利亚" },
        { name: "APTA (亚太贸易协定)", rate: "0%", country: "孟加拉/印度/老挝等" },
    ],

    // 监管条件
    supervision: [
        { code: "6", name: "旧机电产品禁止进口" },
        { code: "A", name: "入境货物通关单" },
        { code: "B", name: "出境货物通关单" }
    ],
    inspection: [
        { code: "M", name: "进口商品检验" },
        { code: "L", name: "民用商品入境验证" }
    ],

    // 3. 优化：申报要素 (含必填状态)
    elements: [
        { id: 1, name: "品名", required: true, example: "集成电路" },
        { id: 2, name: "品牌类型", required: true, example: "无品牌" },
        { id: 3, name: "出口享惠情况", required: true, example: "不享惠" },
        { id: 4, name: "制作工艺", required: false, example: "单片/混合/多芯片等" },
        { id: 5, name: "结构", required: true, example: "处理器及控制器" },
        { id: 6, name: "品牌", required: true, example: "INTEL等" },
        { id: 7, name: "型号", required: true, example: "i7-12700K" },
        { id: 8, name: "产地", required: false, example: "马来西亚" }
    ]
};

export default function DetailPage() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(DATA.hscode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar />

            {/* 顶部 Header 区 */}
            <div className="bg-white border-b border-gray-200 shadow-sm sticky top-16 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                        <div>
                            {/* 面包屑 */}
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                <Link href="/" className="hover:text-blue-600">首页</Link>
                                <ChevronRight className="w-3 h-3" />
                                <span className="text-gray-900 font-medium">编码详情</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-mono font-bold text-blue-700 tracking-tight select-all">
                                    {DATA.hscode}
                                </h1>
                                <button onClick={handleCopy} className="text-gray-400 hover:text-blue-600 transition-colors">
                                    {copied ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
                                </button>
                                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded border border-green-200">
                  现行有效
                </span>
                            </div>
                            <h2 className="text-xl font-bold mt-2">{DATA.name}</h2>
                            <p className="text-sm text-gray-500 mt-1 italic font-light">{DATA.nameEn}</p>
                        </div>

                        <div className="flex gap-3 mt-1">
                            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 text-gray-700">
                                <Printer className="w-4 h-4" /> 打印 / PDF
                            </button>
                            <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 shadow-sm">
                                <Calculator className="w-4 h-4" /> 全额税费计算
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* --- 左侧侧边栏 (章节信息 & 监管) 占 3 列 --- */}
                    <div className="lg:col-span-3 space-y-6">

                        {/* 1. 章节归类信息卡片 */}
                        <section className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
                                <BookOpen className="w-4 h-4 text-gray-500" />
                                <h3 className="font-bold text-sm text-gray-800">所属章节</h3>
                            </div>
                            <div className="p-4 space-y-4">
                                <div className="relative pl-4 border-l-2 border-blue-200">
                                    <div className="text-xs text-gray-500 mb-0.5">类 (Section)</div>
                                    <div className="text-sm font-medium text-blue-900">{DATA.category.section.code}</div>
                                    <div className="text-xs text-gray-600 mt-1 line-clamp-2" title={DATA.category.section.name}>
                                        {DATA.category.section.name}
                                    </div>
                                </div>
                                <div className="relative pl-4 border-l-2 border-blue-400">
                                    <div className="text-xs text-gray-500 mb-0.5">章 (Chapter)</div>
                                    <div className="text-sm font-medium text-blue-900">{DATA.category.chapter.code}</div>
                                    <div className="text-xs text-gray-600 mt-1 line-clamp-2" title={DATA.category.chapter.name}>
                                        {DATA.category.chapter.name}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 2. 监管条件 */}
                        <section className="bg-white rounded-lg border border-gray-200 shadow-sm">
                            <div className="bg-orange-50/50 px-4 py-3 border-b border-orange-100 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-orange-800">
                                    <ShieldCheck className="w-4 h-4" />
                                    <h3 className="font-bold text-sm">监管证件</h3>
                                </div>
                            </div>
                            <div className="p-2">
                                {DATA.supervision.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded transition-colors">
                     <span className="flex-shrink-0 w-6 h-6 rounded bg-orange-100 text-orange-700 text-xs font-bold flex items-center justify-center border border-orange-200">
                       {item.code}
                     </span>
                                        <span className="text-xs font-medium text-gray-700">{item.name}</span>
                                    </div>
                                ))}
                                {DATA.supervision.length === 0 && <div className="p-2 text-xs text-gray-400">无特殊监管要求</div>}
                            </div>
                        </section>

                        {/* 3. CIQ 检验检疫 */}
                        <section className="bg-white rounded-lg border border-gray-200 shadow-sm">
                            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                <h3 className="font-bold text-sm text-gray-800">CIQ 检验检疫</h3>
                            </div>
                            <div className="p-2">
                                {DATA.inspection.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded transition-colors">
                     <span className="flex-shrink-0 w-6 h-6 rounded bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center border border-blue-200">
                       {item.code}
                     </span>
                                        <span className="text-xs font-medium text-gray-700">{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* --- 右侧主要内容区 占 9 列 --- */}
                    <div className="lg:col-span-9 space-y-6">

                        {/* 1. 基础税率 (Dashboard 风格) */}
                        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                                <div className="text-xs text-gray-500 mb-1">最惠国税率 (MFN)</div>
                                <div className="text-2xl font-bold text-blue-600">{DATA.basicRates.mfn}</div>
                                <div className="text-[10px] text-gray-400 mt-2">适用于 WTO 成员</div>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-gray-300"></div>
                                <div className="text-xs text-gray-500 mb-1">普通税率</div>
                                <div className="text-2xl font-bold text-gray-700">{DATA.basicRates.general}</div>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                                <div className="text-xs text-gray-500 mb-1">增值税 (VAT)</div>
                                <div className="text-2xl font-bold text-green-600">{DATA.basicRates.vat}</div>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-orange-400"></div>
                                <div className="text-xs text-gray-500 mb-1">出口退税</div>
                                <div className="text-2xl font-bold text-orange-500">{DATA.basicRates.drawback}</div>
                            </div>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* 2. 协定税率 (RCEP 等) */}
                            <section className="bg-white rounded-lg border border-gray-200 shadow-sm h-full">
                                <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                                    <div className="flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-blue-600" />
                                        <h3 className="font-bold text-gray-900">协定税率 (RCEP/FTA)</h3>
                                    </div>
                                    <span className="text-xs text-gray-500">仅供参考</span>
                                </div>
                                <div className="overflow-y-auto max-h-[300px] p-0">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-gray-50 text-gray-500 sticky top-0">
                                        <tr>
                                            <th className="px-5 py-2 font-medium">协定名称</th>
                                            <th className="px-5 py-2 font-medium">原产国/地区</th>
                                            <th className="px-5 py-2 font-medium text-right">税率</th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                        {DATA.agreements.map((item, index) => (
                                            <tr key={index} className="hover:bg-blue-50/30">
                                                <td className="px-5 py-3 font-medium text-gray-800">{item.name}</td>
                                                <td className="px-5 py-3 text-gray-500 text-xs">{item.country}</td>
                                                <td className="px-5 py-3 text-right font-bold text-blue-600">{item.rate}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                            {/* 3. 申报要素 (包含必填项) */}
                            <section className="bg-white rounded-lg border border-gray-200 shadow-sm h-full">
                                <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                                    <div className="flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-purple-600" />
                                        <h3 className="font-bold text-gray-900">申报要素</h3>
                                    </div>
                                    <div className="flex gap-2 text-xs">
                                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> 必填</span>
                                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-300"></span> 选填</span>
                                    </div>
                                </div>
                                <div className="overflow-hidden">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
                                        <tr>
                                            <th className="px-4 py-2 w-12 text-center">#</th>
                                            <th className="px-2 py-2 w-20">状态</th>
                                            <th className="px-2 py-2">要素名称</th>
                                            <th className="px-2 py-2 text-gray-400 font-normal">填写示例</th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                        {DATA.elements.map((el) => (
                                            <tr key={el.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-2.5 text-center text-gray-400 text-xs">{el.id}</td>
                                                <td className="px-2 py-2.5">
                                                    {el.required ? (
                                                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-red-50 text-red-600 border border-red-100">
                                 必填
                               </span>
                                                    ) : (
                                                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-500 border border-gray-200">
                                 选填
                               </span>
                                                    )}
                                                </td>
                                                <td className="px-2 py-2.5 font-medium text-gray-800">{el.name}</td>
                                                <td className="px-2 py-2.5 text-gray-500 text-xs truncate max-w-[120px]">{el.example}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}