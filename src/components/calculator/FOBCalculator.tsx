"use client";

import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCw, Anchor, ShieldCheck, Sparkles, Ship } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaxResultCard from "./TaxResultCard";

interface FOBCalculatorProps {
    initialRates?: {
        dutyRate: string;
        vatRate: string;
        consumptionRate: string;
    };
}

export default function FOBCalculator({ initialRates }: FOBCalculatorProps) {
    const [fobPrice, setFobPrice] = useState<string>("");
    const [freight, setFreight] = useState<string>("");

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
        totalCost: 0,
    });

    const handleCalculate = () => {
        const fob = parseFloat(fobPrice) || 0;
        const frt = parseFloat(freight) || 0;

        let cif = 0;
        if (insMode === "amount") {
            const ins = parseFloat(insAmountStr) || 0;
            cif = fob + frt + ins;
        } else {
            const iRate = (parseFloat(insRateStr) || 0.3) / 100;
            if (iRate < 1) {
                cif = (fob + frt) / (1 - iRate);
            } else {
                cif = fob + frt;
            }
        }

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
    }, [fobPrice, freight, insMode, insRateStr, insAmountStr, dutyRateStr, vatRateStr, consumptionRateStr]);

    const handleReset = () => {
        setFobPrice("");
        setFreight("");
        setInsMode("rate");
        setInsRateStr("0.3");
        setInsAmountStr("");
        setDutyRateStr(initialRates?.dutyRate || "0");
        setVatRateStr(initialRates?.vatRate || "13");
        setConsumptionRateStr(initialRates?.consumptionRate || "0");
    };

    const handleLoadSample = (fob: string, frt: string, duty: string, vat: string) => {
        setFobPrice(fob);
        setFreight(frt);
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
                        <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                            <Anchor className="w-4 h-4" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">FOB 离岸价参数录入</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">系统将自动叠加运费与保险费推算完税 CIF</p>
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
                <div className="p-3.5 bg-indigo-50/50 dark:bg-indigo-500/10 rounded-2xl border border-indigo-100/60 dark:border-indigo-500/20 flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-indigo-900 dark:text-indigo-300 font-semibold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                        快捷案例:
                    </span>
                    <button
                        type="button"
                        onClick={() => handleLoadSample("80000", "5000", "5", "13")}
                        className="px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-slate-700 text-indigo-700 dark:text-indigo-300 rounded-lg border border-indigo-200/60 dark:border-indigo-500/30 transition-colors font-medium cursor-pointer"
                    >
                        8万货价 + 5000海运费 (0.3%标准保费)
                    </button>
                </div>

                {/* 1. FOB 货价与运费 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1">
                            1. FOB 货价 (CNY)
                            <span className="text-rose-500">*</span>
                        </Label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-bold text-lg">¥</span>
                            <Input
                                type="number"
                                placeholder="例如：80000"
                                className="pl-9 pr-12 text-base font-mono font-bold h-11 bg-slate-50/70 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-900 border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white rounded-xl transition-all"
                                value={fobPrice}
                                onChange={(e) => setFobPrice(e.target.value)}
                                autoFocus
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 dark:text-slate-500">元</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1">
                            2. 国际运费 (Freight)
                        </Label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-bold text-lg">¥</span>
                            <Input
                                type="number"
                                placeholder="例如：5000"
                                className="pl-9 pr-12 text-base font-mono font-bold h-11 bg-slate-50/70 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-900 border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white rounded-xl transition-all"
                                value={freight}
                                onChange={(e) => setFreight(e.target.value)}
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 dark:text-slate-500">元</span>
                        </div>
                    </div>
                </div>

                {/* 2. 保险费设置 */}
                <div className="p-4 bg-slate-50/80 dark:bg-slate-900/60 rounded-2xl border border-slate-100 dark:border-white/[0.06] space-y-4">
                    <div className="flex items-center justify-between">
                        <Label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-indigo-500" />
                            3. 国际运输保险费 (Insurance)
                        </Label>
                        <Tabs value={insMode} onValueChange={(v: any) => setInsMode(v)} className="w-[160px]">
                            <TabsList className="grid w-full grid-cols-2 h-7 p-0.5 bg-slate-200/80 dark:bg-slate-800 rounded-lg">
                                <TabsTrigger value="rate" className="text-[11px] h-6 rounded-md cursor-pointer data-[state=active]:bg-white dark:data-[state=active]:bg-[#0f172a] data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400">
                                    按费率估算
                                </TabsTrigger>
                                <TabsTrigger value="amount" className="text-[11px] h-6 rounded-md cursor-pointer data-[state=active]:bg-white dark:data-[state=active]:bg-[#0f172a] data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400">
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
                                <p>海关法定推导基准：<span className="font-bold text-slate-800 dark:text-slate-200">0.3%</span></p>
                                <p className="text-[11px] text-slate-400">推导公式：CIF = (FOB + 运费) ÷ (1 - 0.3%)</p>
                            </div>
                        </div>
                    ) : (
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-bold">¥</span>
                            <Input
                                type="number"
                                placeholder="输入实际支付的保费金额"
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
                        4. 适用税率配置 (%)
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
                    <p className="font-semibold text-slate-700 dark:text-slate-300">FOB 审价逻辑依据：</p>
                    <p>• 依据海关审价办法，进口货物的完税价格由海关以成交价格为基础审查确定，并应包括到达中华人民共和国关境内输入地点起卸前的运输及相关费用、保险费。</p>
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
