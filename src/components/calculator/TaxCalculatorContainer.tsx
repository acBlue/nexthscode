"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Ship, Anchor, Plane, Package, Info } from "lucide-react";

import CIFCalculator from "@/components/calculator/CIFCalculator";
import FOBCalculator from "@/components/calculator/FOBCalculator";
import CFRCalculator from "@/components/calculator/CFRCalculator";
import EXWCalculator from "@/components/calculator/EXWCalculator";

function TaxCalculatorContent() {
    const searchParams = useSearchParams();

    const initialRates = {
        dutyRate: searchParams.get("duty") || "0",
        vatRate: searchParams.get("vat") || "13",
        consumptionRate: searchParams.get("consumption") || "0",
    };

    return (
        <Tabs defaultValue="cif" className="w-full space-y-8">
            {/* 胶囊 Tab 导航 */}
            <div className="flex justify-center">
                <TabsList className="h-auto p-1.5 bg-white dark:bg-[#0f172a] border border-slate-200/90 dark:border-white/[0.08] rounded-2xl inline-flex gap-1.5 shadow-xs overflow-x-auto max-w-full transition-colors duration-200">
                    <TabsTrigger
                        value="cif"
                        className="rounded-xl px-5 py-2.5 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-blue-500/20 transition-all text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-2 cursor-pointer"
                    >
                        <Ship className="w-4 h-4" />
                        CIF 到岸价
                    </TabsTrigger>

                    <TabsTrigger
                        value="fob"
                        className="rounded-xl px-5 py-2.5 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-blue-500/20 transition-all text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-2 cursor-pointer"
                    >
                        <Anchor className="w-4 h-4" />
                        FOB 离岸价
                    </TabsTrigger>

                    <TabsTrigger
                        value="cfr"
                        className="rounded-xl px-5 py-2.5 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-blue-500/20 transition-all text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-2 cursor-pointer"
                    >
                        <Plane className="w-4 h-4" />
                        CFR (C&F)
                    </TabsTrigger>

                    <TabsTrigger
                        value="exw"
                        className="rounded-xl px-5 py-2.5 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-blue-500/20 transition-all text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-2 cursor-pointer"
                    >
                        <Package className="w-4 h-4" />
                        EXW 工厂价
                    </TabsTrigger>
                </TabsList>
            </div>

            {/* Tab 页面内容 */}
            <div className="space-y-6">
                <TabsContent value="cif" className="focus-visible:outline-none mt-0">
                    <div className="mb-4 flex items-start gap-3 p-4 bg-blue-50/70 dark:bg-blue-500/10 border border-blue-200/60 dark:border-blue-500/20 rounded-2xl text-xs text-blue-900 dark:text-blue-200">
                        <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <div>
                            <span className="font-bold text-blue-950 dark:text-white">CIF (Cost, Insurance and Freight) 到岸价格：</span>
                            <span> 卖方承担运输至目的港的货值、运费及保险费。海关直接以此成交价作为完税基准（完税价格 = CIF价格）。</span>
                        </div>
                    </div>
                    <CIFCalculator initialRates={initialRates} />
                </TabsContent>

                <TabsContent value="fob" className="focus-visible:outline-none mt-0">
                    <div className="mb-4 flex items-start gap-3 p-4 bg-indigo-50/70 dark:bg-indigo-500/10 border border-indigo-200/60 dark:border-indigo-500/20 rounded-2xl text-xs text-indigo-900 dark:text-indigo-200">
                        <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                        <div>
                            <span className="font-bold text-indigo-950 dark:text-white">FOB (Free On Board) 船上交货价：</span>
                            <span> 卖方交货至起运港船上，买方负担国际段运费及保费。完税价格需计入运费与保险费（完税价格 = FOB + 国际运费 + 保险费）。</span>
                        </div>
                    </div>
                    <FOBCalculator initialRates={initialRates} />
                </TabsContent>

                <TabsContent value="cfr" className="focus-visible:outline-none mt-0">
                    <div className="mb-4 flex items-start gap-3 p-4 bg-cyan-50/70 dark:bg-cyan-500/10 border border-cyan-200/60 dark:border-cyan-500/20 rounded-2xl text-xs text-cyan-900 dark:text-cyan-200">
                        <Info className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                        <div>
                            <span className="font-bold text-cyan-950 dark:text-white">CFR (Cost and Freight) 成本加运费：</span>
                            <span> 卖方支付目的港运费，买方负担保险费。海关完税价格需加算实际或法定保费（完税价格 = CFR + 保险费）。</span>
                        </div>
                    </div>
                    <CFRCalculator initialRates={initialRates} />
                </TabsContent>

                <TabsContent value="exw" className="focus-visible:outline-none mt-0">
                    <div className="mb-4 flex items-start gap-3 p-4 bg-orange-50/70 dark:bg-orange-500/10 border border-orange-200/60 dark:border-orange-500/20 rounded-2xl text-xs text-orange-900 dark:text-orange-200">
                        <Info className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" />
                        <div>
                            <span className="font-bold text-orange-950 dark:text-white">EXW (Ex Works) 工厂交货：</span>
                            <span> 卖方在其工场交付，买方承担全部境内外转运物流费用。完税价格需加上境内运费、起运港杂费、海运空运费及保费。</span>
                        </div>
                    </div>
                    <EXWCalculator initialRates={initialRates} />
                </TabsContent>
            </div>
        </Tabs>
    );
}

export default function TaxCalculatorContainer() {
    return (
        <Suspense fallback={
            <div className="w-full h-96 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 animate-pulse flex items-center justify-center text-xs text-slate-400">
                加载税费计算器组件...
            </div>
        }>
            <TaxCalculatorContent />
        </Suspense>
    );
}
