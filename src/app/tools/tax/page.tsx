import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
    Calculator,
    Ship,
    Anchor,
    Plane,
    Package,
    ArrowRight,
    Info
} from "lucide-react";

// 引入所有计算组件
import CIFCalculator from "@/components/calculator/CIFCalculator";
import FOBCalculator from "@/components/calculator/FOBCalculator";
import CFRCalculator from "@/components/calculator/CFRCalculator";
import EXWCalculator from "@/components/calculator/EXWCalculator";

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function TaxToolPage({ searchParams }: PageProps) {
    const params = await searchParams;

    const initialRates = {
        dutyRate: (params.duty as string) || "0",
        vatRate: (params.vat as string) || "13",
        consumptionRate: (params.consumption as string) || "0",
    };

    return (
        <div className="min-h-screen bg-slate-50/50 font-sans text-slate-900 pb-20 selection:bg-blue-100 selection:text-blue-900">
            <div className="fixed inset-0 -z-10 h-full w-full bg-slate-50 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                {/* 顶部 Header */}
                <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
                    <Badge variant="outline" className="bg-blue-50/50 text-blue-700 border-blue-200 px-3 py-1 mb-2 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2 mr-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        专业版 v2.0
                    </Badge>

                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
                        进口税费<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">智能计算器</span>
                    </h1>

                    <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
                        支持全贸易条款 (Incoterms) 的合规申报工具。
                        <span className="block sm:inline mt-1 sm:mt-0 text-slate-400">自动推导完税价格，精确核算关税、增值税与消费税。</span>
                    </p>
                </div>

                {/* 核心 Tab 区域 */}
                <Tabs defaultValue="cif" className="w-full space-y-8">
                    {/* Tab 导航 */}
                    <div className="flex justify-center">
                        <TabsList className="h-auto p-1.5 bg-slate-100/80 backdrop-blur-md border border-slate-200/60 rounded-full inline-flex gap-1 shadow-sm overflow-x-auto max-w-full no-scrollbar">
                            <TabsTrigger
                                value="cif"
                                className="rounded-full px-5 py-2.5 data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm data-[state=active]:ring-1 data-[state=active]:ring-slate-200 transition-all font-medium text-slate-600 flex items-center gap-2 group"
                            >
                                <Ship className="w-4 h-4 group-data-[state=active]:text-blue-600 transition-colors" />
                                CIF 到岸价
                            </TabsTrigger>

                            <TabsTrigger
                                value="fob"
                                className="rounded-full px-5 py-2.5 data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm data-[state=active]:ring-1 data-[state=active]:ring-slate-200 transition-all font-medium text-slate-600 flex items-center gap-2 group"
                            >
                                <Anchor className="w-4 h-4 group-data-[state=active]:text-indigo-600 transition-colors" />
                                FOB 离岸价
                            </TabsTrigger>

                            <TabsTrigger
                                value="cfr"
                                className="rounded-full px-5 py-2.5 data-[state=active]:bg-white data-[state=active]:text-cyan-700 data-[state=active]:shadow-sm data-[state=active]:ring-1 data-[state=active]:ring-slate-200 transition-all font-medium text-slate-600 flex items-center gap-2 group"
                            >
                                <Plane className="w-4 h-4 group-data-[state=active]:text-cyan-600 transition-colors" />
                                CFR (C&F)
                            </TabsTrigger>

                            <TabsTrigger
                                value="exw"
                                className="rounded-full px-5 py-2.5 data-[state=active]:bg-white data-[state=active]:text-orange-700 data-[state=active]:shadow-sm data-[state=active]:ring-1 data-[state=active]:ring-slate-200 transition-all font-medium text-slate-600 flex items-center gap-2 group"
                            >
                                <Package className="w-4 h-4 group-data-[state=active]:text-orange-600 transition-colors" />
                                EXW 工厂价
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    {/* Tab 内容 - 带过渡动画 */}
                    <div className="relative animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <TabsContent value="cif" className="focus-visible:outline-none mt-0">
                            <div className="bg-white/40 backdrop-blur-sm -mx-4 sm:mx-0 sm:rounded-3xl p-1 sm:p-2 border border-white/50 shadow-xl shadow-slate-200/50">
                                <div className="bg-slate-50/50 rounded-2xl p-4 sm:p-6 lg:p-8 border border-slate-100">
                                    <div className="mb-6 flex items-start gap-4 p-4 bg-blue-50/50 border border-blue-100 rounded-xl text-sm text-blue-900">
                                        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                        <div className="space-y-1">
                                            <p className="font-medium text-blue-800">CIF (Cost, Insurance and Freight) - 成本加保险费、运费</p>
                                            <p className="text-blue-700/80">
                                                卖方负责将货物运至指定的目的港，并支付运费和保险费。
                                                <span className="font-medium">海关完税价格 = CIF成交价格</span>
                                            </p>
                                        </div>
                                    </div>
                                    <CIFCalculator initialRates={initialRates} />
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="fob" className="focus-visible:outline-none mt-0">
                             <div className="bg-white/40 backdrop-blur-sm -mx-4 sm:mx-0 sm:rounded-3xl p-1 sm:p-2 border border-white/50 shadow-xl shadow-slate-200/50">
                                <div className="bg-slate-50/50 rounded-2xl p-4 sm:p-6 lg:p-8 border border-slate-100">
                                    <div className="mb-6 flex items-start gap-4 p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl text-sm text-indigo-900">
                                        <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                                        <div className="space-y-1">
                                            <p className="font-medium text-indigo-800">FOB (Free On Board) - 装运港船上交货</p>
                                            <p className="text-indigo-700/80">
                                                卖方在合同规定的装运港将货物交到买方指定的船上。
                                                <span className="font-medium">海关完税价格 = (FOB价格 + 国外运费 + 保险费)</span>
                                            </p>
                                        </div>
                                    </div>
                                    <FOBCalculator initialRates={initialRates} />
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="cfr" className="focus-visible:outline-none mt-0">
                             <div className="bg-white/40 backdrop-blur-sm -mx-4 sm:mx-0 sm:rounded-3xl p-1 sm:p-2 border border-white/50 shadow-xl shadow-slate-200/50">
                                <div className="bg-slate-50/50 rounded-2xl p-4 sm:p-6 lg:p-8 border border-slate-100">
                                    <div className="mb-6 flex items-start gap-4 p-4 bg-cyan-50/50 border border-cyan-100 rounded-xl text-sm text-cyan-900">
                                        <Info className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                                        <div className="space-y-1">
                                            <p className="font-medium text-cyan-800">CFR (Cost and Freight) - 成本加运费</p>
                                            <p className="text-cyan-700/80">
                                                卖方支付将货物运至目的港所需的运费，但保险费由买方负担。
                                                <span className="font-medium">海关完税价格 = (CFR价格 + 保险费)</span>
                                            </p>
                                        </div>
                                    </div>
                                    <CFRCalculator initialRates={initialRates} />
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="exw" className="focus-visible:outline-none mt-0">
                             <div className="bg-white/40 backdrop-blur-sm -mx-4 sm:mx-0 sm:rounded-3xl p-1 sm:p-2 border border-white/50 shadow-xl shadow-slate-200/50">
                                <div className="bg-slate-50/50 rounded-2xl p-4 sm:p-6 lg:p-8 border border-slate-100">
                                    <div className="mb-6 flex items-start gap-4 p-4 bg-orange-50/50 border border-orange-100 rounded-xl text-sm text-orange-900">
                                        <Info className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                                        <div className="space-y-1">
                                            <p className="font-medium text-orange-800">EXW (Ex Works) - 工厂交货</p>
                                            <p className="text-orange-700/80">
                                                卖方在其所在地将货物交给买方处置。
                                                <span className="font-medium">海关完税价格 = (EXW价格 + 离岸前运杂费 + 国外运费 + 保险费)</span>
                                            </p>
                                        </div>
                                    </div>
                                    <EXWCalculator initialRates={initialRates} />
                                </div>
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>

                {/* 底部信任条/说明 */}
                <div className="mt-16 pt-8 border-t border-slate-200 text-center">
                    <p className="text-sm text-slate-400">
                        * 计算结果仅供参考，实际税费以海关核定为准。
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
}
