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
    Info,
    ShieldCheck,
    TrendingUp,
    Sparkles
} from "lucide-react";

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
        <div className="min-h-screen bg-slate-50/60 font-sans text-slate-900 pb-20 selection:bg-blue-600 selection:text-white">
            <Navbar />

            {/* 顶部 Header */}
            <div className="bg-white border-b border-slate-200/90 py-12 lg:py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-slate opacity-40 pointer-events-none" />
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="max-w-4xl mx-auto px-4 text-center space-y-4 relative z-10">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 text-xs font-semibold">
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                        Incoterms 2020 国际贸易条款全覆盖
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
                        进口税费与落地成本
                        <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 bg-clip-text text-transparent ml-2">
                            智能测算器
                        </span>
                    </h1>

                    <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        支持 CIF / FOB / CFR / EXW 等主流贸易术语，严格遵循海关审价推导公式，实时计算关税、增值税与消费税。
                    </p>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <Tabs defaultValue="cif" className="w-full space-y-8">
                    
                    {/* 现代胶囊 Tab 导航 */}
                    <div className="flex justify-center">
                        <TabsList className="h-auto p-1.5 bg-white border border-slate-200/90 rounded-2xl inline-flex gap-1.5 shadow-xs overflow-x-auto max-w-full">
                            <TabsTrigger
                                value="cif"
                                className="rounded-xl px-5 py-2.5 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-blue-500/20 transition-all text-xs sm:text-sm font-semibold text-slate-600 flex items-center gap-2 cursor-pointer"
                            >
                                <Ship className="w-4 h-4" />
                                CIF 到岸价
                            </TabsTrigger>

                            <TabsTrigger
                                value="fob"
                                className="rounded-xl px-5 py-2.5 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-blue-500/20 transition-all text-xs sm:text-sm font-semibold text-slate-600 flex items-center gap-2 cursor-pointer"
                            >
                                <Anchor className="w-4 h-4" />
                                FOB 离岸价
                            </TabsTrigger>

                            <TabsTrigger
                                value="cfr"
                                className="rounded-xl px-5 py-2.5 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-blue-500/20 transition-all text-xs sm:text-sm font-semibold text-slate-600 flex items-center gap-2 cursor-pointer"
                            >
                                <Plane className="w-4 h-4" />
                                CFR (C&F)
                            </TabsTrigger>

                            <TabsTrigger
                                value="exw"
                                className="rounded-xl px-5 py-2.5 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-blue-500/20 transition-all text-xs sm:text-sm font-semibold text-slate-600 flex items-center gap-2 cursor-pointer"
                            >
                                <Package className="w-4 h-4" />
                                EXW 工厂价
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    {/* Tab 页面内容 */}
                    <div className="space-y-6">
                        <TabsContent value="cif" className="focus-visible:outline-none mt-0">
                            <div className="mb-4 flex items-start gap-3 p-4 bg-blue-50/70 border border-blue-200/60 rounded-2xl text-xs text-blue-900">
                                <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                                <div>
                                    <span className="font-bold text-blue-950">CIF (Cost, Insurance and Freight) 到岸价格：</span>
                                    <span> 卖方承担运输至目的港的货值、运费及保险费。海关直接以此成交价作为完税基准（完税价格 = CIF价格）。</span>
                                </div>
                            </div>
                            <CIFCalculator initialRates={initialRates} />
                        </TabsContent>

                        <TabsContent value="fob" className="focus-visible:outline-none mt-0">
                            <div className="mb-4 flex items-start gap-3 p-4 bg-indigo-50/70 border border-indigo-200/60 rounded-2xl text-xs text-indigo-900">
                                <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                                <div>
                                    <span className="font-bold text-indigo-950">FOB (Free On Board) 船上交货价：</span>
                                    <span> 卖方交货至起运港船上，买方负担国际段运费及保费。完税价格需计入运费与保险费（完税价格 = FOB + 国际运费 + 保险费）。</span>
                                </div>
                            </div>
                            <FOBCalculator initialRates={initialRates} />
                        </TabsContent>

                        <TabsContent value="cfr" className="focus-visible:outline-none mt-0">
                            <div className="mb-4 flex items-start gap-3 p-4 bg-cyan-50/70 border border-cyan-200/60 rounded-2xl text-xs text-cyan-900">
                                <Info className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                                <div>
                                    <span className="font-bold text-cyan-950">CFR (Cost and Freight) 成本加运费：</span>
                                    <span> 卖方支付目的港运费，买方负担保险费。海关完税价格需加算实际或法定保费（完税价格 = CFR + 保险费）。</span>
                                </div>
                            </div>
                            <CFRCalculator initialRates={initialRates} />
                        </TabsContent>

                        <TabsContent value="exw" className="focus-visible:outline-none mt-0">
                            <div className="mb-4 flex items-start gap-3 p-4 bg-orange-50/70 border border-orange-200/60 rounded-2xl text-xs text-orange-900">
                                <Info className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                                <div>
                                    <span className="font-bold text-orange-950">EXW (Ex Works) 工厂交货：</span>
                                    <span> 卖方在其工场交付，买方承担全部境内外转运物流费用。完税价格需加上境内运费、起运港杂费、海运空运费及保费。</span>
                                </div>
                            </div>
                            <EXWCalculator initialRates={initialRates} />
                        </TabsContent>
                    </div>

                </Tabs>
            </main>

            <Footer />
        </div>
    );
}
