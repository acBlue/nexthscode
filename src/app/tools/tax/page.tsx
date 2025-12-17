import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calculator } from "lucide-react";

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
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                        <div className="p-2 bg-blue-600 rounded-lg text-white">
                            <Calculator className="w-8 h-8" />
                        </div>
                        进口税费计算器
                    </h1>
                    <p className="mt-2 text-slate-500 max-w-2xl">
                        专业级海关税费计算工具，支持全贸易条款 (Incoterms)。
                        自动根据成交方式（CIF/FOB/CFR/EXW）推导完税价格，确保合规申报与成本核算的准确性。
                    </p>
                </div>

                {/* 核心 Tab 区域 */}
                <Tabs defaultValue="cif" className="w-full">
                    <div className="overflow-x-auto pb-2">
                        <TabsList className="inline-flex w-auto min-w-full sm:w-full max-w-2xl grid-cols-4 bg-slate-200 p-1 rounded-xl">
                            <TabsTrigger value="cif" className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm transition-all font-medium">
                                CIF 到岸价
                            </TabsTrigger>
                            <TabsTrigger value="fob" className="data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm transition-all font-medium">
                                FOB 离岸价
                            </TabsTrigger>
                            <TabsTrigger value="cfr" className="data-[state=active]:bg-white data-[state=active]:text-cyan-700 data-[state=active]:shadow-sm transition-all font-medium">
                                CFR (C&F)
                            </TabsTrigger>
                            <TabsTrigger value="exw" className="data-[state=active]:bg-white data-[state=active]:text-orange-700 data-[state=active]:shadow-sm transition-all font-medium">
                                EXW 工厂价
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="mt-6">
                        <TabsContent value="cif" className="focus-visible:outline-none">
                            <CIFCalculator initialRates={initialRates} />
                        </TabsContent>

                        <TabsContent value="fob" className="focus-visible:outline-none">
                            <FOBCalculator initialRates={initialRates} />
                        </TabsContent>

                        <TabsContent value="cfr" className="focus-visible:outline-none">
                            <CFRCalculator initialRates={initialRates} />
                        </TabsContent>

                        <TabsContent value="exw" className="focus-visible:outline-none">
                            <EXWCalculator initialRates={initialRates} />
                        </TabsContent>
                    </div>
                </Tabs>
            </main>

            <Footer />
        </div>
    );
}