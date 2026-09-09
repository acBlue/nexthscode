"use client";

import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCw, Package, Truck, Ship, ShieldCheck, Sparkles } from "lucide-react";
import TaxResultCard from "./TaxResultCard";

interface EXWCalculatorProps {
    initialRates?: { 
        dutyRate: string; 
        vatRate: string; 
        consumptionRate: string; 
    };
}

export default function EXWCalculator({ initialRates }: EXWCalculatorProps) {
    const [exwPrice, setExwPrice] = useState("");
    const [inlandCost, setInlandCost] = useState(""); // 国外内陆杂费/拖车费
    const [freight, setFreight] = useState("");       // 国际干线运费
    const [insRateStr, setInsRateStr] = useState("0.3");

    const [dutyRateStr, setDutyRateStr] = useState(initialRates?.dutyRate || "0");
    const [vatRateStr, setVatRateStr] = useState(initialRates?.vatRate || "13");
    const [consumptionRateStr, setConsumptionRateStr] = useState(initialRates?.consumptionRate || "0");

    const [result, setResult] = useState({ 
        cif: 0, 
        duty: 0, 
        consumption: 0, 
        vat: 0, 
        totalTax: 0, 
        totalCost: 0 
    });

    const handleCalculate = () => {
        const exw = parseFloat(exwPrice) || 0;
        const inland = parseFloat(inlandCost) || 0;
        const frt = parseFloat(freight) || 0;
        const iRate = (parseFloat(insRateStr) || 0.3) / 100;

        // EXW 完税价格推导:
        // 1. 起运港交货价 (FOB 等效) = EXW + 出口国内陆运杂费
        // 2. 目的港运费价 (CFR 等效) = FOB + 国际运费
        // 3. 完税价格 (CIF) = CFR + 保险费
        const baseForInsurance = exw + inland + frt;
        const insurance = baseForInsurance * iRate;
        const cif = baseForInsurance + insurance;

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
            totalCost: cif + duty + consumption + vat 
        });
    };

    useEffect(() => { 
        handleCalculate(); 
    }, [exwPrice, inlandCost, freight, insRateStr, dutyRateStr, vatRateStr, consumptionRateStr]);

    const handleReset = () => {
        setExwPrice(""); 
        setInlandCost(""); 
        setFreight(""); 
        setInsRateStr("0.3");
        setDutyRateStr(initialRates?.dutyRate || "0"); 
        setVatRateStr(initialRates?.vatRate || "13"); 
        setConsumptionRateStr(initialRates?.consumptionRate || "0");
    };

    const handleLoadSample = (exw: string, inland: string, frt: string, duty: string) => {
        setExwPrice(exw);
        setInlandCost(inland);
        setFreight(frt);
        setInsRateStr("0.3");
        setDutyRateStr(duty);
        setVatRateStr("13");
        setConsumptionRateStr("0");
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* 左侧输入区 (占 7 列) */}
            <div className="lg:col-span-7 bg-white dark:bg-[#0f172a] rounded-3xl border border-slate-200/90 dark:border-white/[0.08] p-6 sm:p-8 shadow-xs space-y-6 transition-colors duration-200">
                
                {/* 头部标题与重置 */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/[0.06]">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-orange-50 dark:bg-orange-500/15 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                            <Package className="w-4 h-4" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">EXW 工厂交货价参数录入</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">需逐层补全国外内陆杂费、国际干线运费及保费</p>
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
                <div className="p-3.5 bg-orange-50/50 dark:bg-orange-500/10 rounded-2xl border border-orange-100/60 dark:border-orange-500/20 flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-orange-900 dark:text-orange-300 font-semibold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                        快捷案例:
                    </span>
                    <button
                        type="button"
                        onClick={() => handleLoadSample("50000", "2000", "6000", "5")}
                        className="px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-orange-100 dark:hover:bg-slate-700 text-orange-700 dark:text-orange-300 rounded-lg border border-orange-200/60 dark:border-orange-500/30 transition-colors font-medium cursor-pointer"
                    >
                        5万工厂价 + 2000内陆拖车 + 6000海运
                    </button>
                </div>

                {/* 1. EXW 工厂价 */}
                <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1">
                        1. EXW 工厂交货价 (Ex Works)
                        <span className="text-rose-500">*</span>
                    </Label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-bold text-lg">¥</span>
                        <Input
                            type="number"
                            placeholder="例如：50000"
                            className="pl-9 pr-12 text-base font-mono font-bold h-11 bg-slate-50/70 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-900 border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white rounded-xl transition-all"
                            value={exwPrice}
                            onChange={(e) => setExwPrice(e.target.value)}
                            autoFocus
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 dark:text-slate-500">元</span>
                    </div>
                </div>

                {/* 2. 国外境内运杂费 + 国际运费 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                            <Truck className="w-4 h-4 text-orange-500" />
                            2. 启运国境内运杂费
                        </Label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-bold text-lg">¥</span>
                            <Input
                                type="number"
                                placeholder="例如：2000"
                                className="pl-9 pr-12 text-base font-mono font-bold h-11 bg-slate-50/70 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-900 border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white rounded-xl transition-all"
                                value={inlandCost}
                                onChange={(e) => setInlandCost(e.target.value)}
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 dark:text-slate-500">元</span>
                        </div>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500">
                            工厂至装运港的卡车内陆运费、港口装卸杂费等。
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                            <Ship className="w-4 h-4 text-orange-500" />
                            3. 国际干线运费
                        </Label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-bold text-lg">¥</span>
                            <Input
                                type="number"
                                placeholder="例如：6000"
                                className="pl-9 pr-12 text-base font-mono font-bold h-11 bg-slate-50/70 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-900 border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white rounded-xl transition-all"
                                value={freight}
                                onChange={(e) => setFreight(e.target.value)}
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 dark:text-slate-500">元</span>
                        </div>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500">
                            起运港至中国目的港的海运/空运干线费用。
                        </p>
                    </div>
                </div>

                {/* 3. 保险费率 */}
                <div className="p-4 bg-slate-50/80 dark:bg-slate-900/60 rounded-2xl border border-slate-100 dark:border-white/[0.06] space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-orange-500" />
                        4. 国际运输保险费率 (估算)
                    </Label>
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
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            EXW 保险基数 = 工厂价 + 境内杂费 + 国际运费
                        </p>
                    </div>
                </div>

                {/* 4. 适用税率配置 */}
                <div className="space-y-4 pt-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        5. 适用税率配置 (%)
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
                    <p className="font-semibold text-slate-700 dark:text-slate-300">EXW 审价推导公式：</p>
                    <p>• 海关完税价格(CIF) = EXW工厂价 + 启运国内陆运杂费 + 国际干线运费 + 国际运输保费</p>
                    <p>• 自动根据全流程物流要素逐级累加推算至海关审价口径。</p>
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
