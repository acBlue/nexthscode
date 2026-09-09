"use client";

import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCw, Plane, ShieldCheck, Sparkles } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaxResultCard from "./TaxResultCard";

interface CFRCalculatorProps {
    initialRates?: {
        dutyRate: string;
        vatRate: string;
        consumptionRate: string;
    };
}

export default function CFRCalculator({ initialRates }: CFRCalculatorProps) {
    const [cfrPrice, setCfrPrice] = useState<string>("");
    const [insMode, setInsMode] = useState<"rate" | "amount">("rate");
    const [insRateStr, setInsRateStr] = useState<string>("0.3");
    const [insAmountStr, setInsAmountStr] = useState<string>("");

    const [dutyRateStr, setDutyRateStr] = useState<string>(initialRates?.dutyRate || "0");
    const [vatRateStr, setVatRateStr] = useState<string>(initialRates?.vatRate || "13");
    const [consumptionRateStr, setConsumptionRateStr] = useState<string>(initialRates?.consumptionRate || "0");

    const [result, setResult] = useState({ 
        cif: 0, 
        duty: 0, 
        consumption: 0, 
        vat: 0, 
        totalTax: 0, 
        totalCost: 0 
    });

    const handleCalculate = () => {
        const cfr = parseFloat(cfrPrice) || 0;

        let insurance = 0;
        if (insMode === "amount") {
            insurance = parseFloat(insAmountStr) || 0;
        } else {
            const iRate = (parseFloat(insRateStr) || 0.3) / 100;
            insurance = cfr * iRate;
        }

        const cif = cfr + insurance;

        const dRate = parseFloat(dutyRateStr) / 100;
        const vRate = parseFloat(vatRateStr) / 100;
        const cRate = parseFloat(consumptionRateStr) / 100;

        const duty = cif * dRate;

        let consumption = 0;
        if (cRate > 0 && cRate < 1) {
            consumption = ((cif + duty) / (1 - cRate)) * cRate;
        }

        const vat = (cif + duty + consumption) * vRate;

        setResult({
            cif,
            duty,
            consumption,
            vat,
            totalTax: duty + consumption + vat,
            totalCost: cif + duty + consumption + vat,
        });
    };

    useEffect(() => {
        handleCalculate();
    }, [cfrPrice, insMode, insRateStr, insAmountStr, dutyRateStr, vatRateStr, consumptionRateStr]);

    const handleReset = () => {
        setCfrPrice("");
        setInsMode("rate");
        setInsRateStr("0.3");
        setInsAmountStr("");
        setDutyRateStr(initialRates?.dutyRate || "0");
        setVatRateStr(initialRates?.vatRate || "13");
        setConsumptionRateStr(initialRates?.consumptionRate || "0");
    };

    const handleLoadSample = (cfr: string, duty: string, vat: string) => {
        setCfrPrice(cfr);
        setInsMode("rate");
        setInsRateStr("0.3");
        setDutyRateStr(duty);
        setVatRateStr(vat);
        setConsumptionRateStr("0");
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* 左侧输入区 (占 7 列) */}
            <div className="lg:col-span-7 bg-white dark:bg-[#0f172a] rounded-3xl border border-slate-200/90 dark:border-white/[0.08] p-6 sm:p-8 shadow-xs space-y-6 transition-colors duration-200">
                
                {/* 头部标题与重置 */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/[0.06]">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-cyan-50 dark:bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                            <Plane className="w-4 h-4" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">CFR (C&F) 参数录入</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">已含成本与运费，只需补齐保险费即可推算 CIF</p>
                        </div>
                    </div>

                    <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={handleReset}
                        className="text-xs text-slate-400 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 h-8 rounded-lg cursor-pointer"
                    >
                        <RefreshCw className="w-3.5 h-3.5 mr-1" />
                        重置表单
                    </Button>
                </div>

                {/* 快捷示例 */}
                <div className="p-3.5 bg-cyan-50/50 dark:bg-cyan-500/10 rounded-2xl border border-cyan-100/60 dark:border-cyan-500/20 flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-cyan-900 dark:text-cyan-300 font-semibold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        快捷案例:
                    </span>
                    <button
                        type="button"
                        onClick={() => handleLoadSample("60000", "0", "13")}
                        className="px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-cyan-100 dark:hover:bg-slate-700 text-cyan-700 dark:text-cyan-300 rounded-lg border border-cyan-200/60 dark:border-cyan-500/30 transition-colors font-medium cursor-pointer"
                    >
                        六万元 CFR 成交价 (0% 关税 + 0.3% 估算保费)
                    </button>
                </div>

                {/* 1. CFR 总价 */}
                <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1">
                        1. CFR 申报总价 (Cost and Freight)
                        <span className="text-rose-500">*</span>
                    </Label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-bold text-lg">¥</span>
                        <Input
                            type="number"
                            placeholder="例如：60000"
                            className="pl-9 pr-12 text-base font-mono font-bold h-11 bg-slate-50/70 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-900 border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white rounded-xl transition-all"
                            value={cfrPrice}
                            onChange={(e) => setCfrPrice(e.target.value)}
                            autoFocus
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 dark:text-slate-500">元</span>
                    </div>
                    <p className="text-[11px] text-slate-400 dark:text-slate-400">
                        * 包含货物成本及到达中国口岸运费，但不含货物运输保险费。
                    </p>
                </div>

                {/* 2. 保险费设置 */}
                <div className="p-4 bg-slate-50/80 dark:bg-slate-900/60 rounded-2xl border border-slate-100 dark:border-white/[0.06] space-y-4">
                    <div className="flex items-center justify-between">
                        <Label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-cyan-500" />
                            2. 运输保险费 (Insurance)
                        </Label>
                        <Tabs value={insMode} onValueChange={(v: any) => setInsMode(v)} className="w-[160px]">
                            <TabsList className="grid w-full grid-cols-2 h-7 p-0.5 bg-slate-200/80 dark:bg-slate-800 rounded-lg">
                                <TabsTrigger value="rate" className="text-[11px] h-6 rounded-md cursor-pointer data-[state=active]:bg-white dark:data-[state=active]:bg-[#0f172a] data-[state=active]:text-cyan-600 dark:data-[state=active]:text-cyan-400">
                                    按费率估算
                                </TabsTrigger>
                                <TabsTrigger value="amount" className="text-[11px] h-6 rounded-md cursor-pointer data-[state=active]:bg-white dark:data-[state=active]:bg-[#0f172a] data-[state=active]:text-cyan-600 dark:data-[state=active]:text-cyan-400">
                                    实际保费金额
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    {insMode === "rate" ? (
                        <div className="flex items-center gap-4">
                            <div className="relative w-40">
                                <Input
                                    type="number"
                                    step="0.01"
                                    value={insRateStr}
                                    onChange={(e) => setInsRateStr(e.target.value)}
                                    className="pr-8 font-mono font-bold text-sm h-10 bg-white dark:bg-slate-900 border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white rounded-xl"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">%</span>
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 space-y-0.5">
                                <p>海关默认标准费率：<span className="font-bold text-slate-800 dark:text-slate-200">0.3%</span></p>
                                <p className="text-[11px] text-slate-400">计算公式：保费 = CFR × 0.3%</p>
                            </div>
                        </div>
                    ) : (
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-bold">¥</span>
                            <Input
                                type="number"
                                placeholder="输入实际买方支付的保费金额"
                                className="pl-9 pr-12 font-mono font-bold text-sm h-10 bg-white dark:bg-slate-900 border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white rounded-xl"
                                value={insAmountStr}
                                onChange={(e) => setInsAmountStr(e.target.value)}
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">元</span>
                        </div>
                    )}
                </div>

                {/* 3. 适用税率配置 */}
                <div className="space-y-4 pt-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        3. 适用税率配置 (%)
                    </Label>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                            <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">关税税率</span>
                            <div className="relative">
                                <Input
                                    type="number"
                                    step="0.1"
                                    value={dutyRateStr}
                                    onChange={(e) => setDutyRateStr(e.target.value)}
                                    className="pr-8 font-mono font-bold text-sm h-10 rounded-xl bg-slate-50/70 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-900 border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">%</span>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">增值税税率</span>
                            <div className="relative">
                                <Input
                                    type="number"
                                    step="0.1"
                                    value={vatRateStr}
                                    onChange={(e) => setVatRateStr(e.target.value)}
                                    className="pr-8 font-mono font-bold text-sm h-10 rounded-xl bg-slate-50/70 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-900 border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">%</span>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">消费税税率</span>
                            <div className="relative">
                                <Input
                                    type="number"
                                    step="0.1"
                                    value={consumptionRateStr}
                                    onChange={(e) => setConsumptionRateStr(e.target.value)}
                                    className="pr-8 font-mono font-bold text-sm h-10 rounded-xl bg-slate-50/70 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-900 border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 完税说明 */}
                <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-100 dark:border-white/[0.06] text-xs text-slate-500 dark:text-slate-400 space-y-1">
                    <p className="font-semibold text-slate-700 dark:text-slate-300">CFR 审价推导公式：</p>
                    <p>• 海关完税价格 = CFR价格 + 运输及其相关费用保险费</p>
                    <p>• 若无法提供实际保险凭证，海关通常按 “CFR × 0.3%” 计征保险费并合并计入完税价格。</p>
                </div>

            </div>

            {/* 右侧：结果展示 (占 5 列) */}
            <div className="lg:col-span-5">
                <TaxResultCard
                    duty={result.duty}
                    consumption={result.consumption}
                    vat={result.vat}
                    totalTax={result.totalTax}
                    totalCost={result.totalCost}
                    cif={result.cif}
                />
            </div>

        </div>
    );
}
