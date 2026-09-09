"use client";

import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCw, Calculator as CalcIcon, Sparkles, HelpCircle } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import TaxResultCard from "./TaxResultCard";

interface CIFCalculatorProps {
    initialRates?: {
        dutyRate: string;
        vatRate: string;
        consumptionRate: string;
    };
}

export default function CIFCalculator({ initialRates }: CIFCalculatorProps) {
    const [cifPrice, setCifPrice] = useState<string>("");
    const [dutyRateStr, setDutyRateStr] = useState<string>(initialRates?.dutyRate || "0");
    const [vatRateStr, setVatRateStr] = useState<string>(initialRates?.vatRate || "13");
    const [consumptionRateStr, setConsumptionRateStr] = useState<string>(
        initialRates?.consumptionRate || "0"
    );

    const [result, setResult] = useState({
        duty: 0,
        consumption: 0,
        vat: 0,
        totalTax: 0,
        totalCost: 0,
    });

    const handleCalculate = () => {
        const cif = parseFloat(cifPrice) || 0;
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
            duty,
            consumption,
            vat,
            totalTax: duty + consumption + vat,
            totalCost: cif + duty + consumption + vat,
        });
    };

    useEffect(() => {
        handleCalculate();
    }, [cifPrice, dutyRateStr, vatRateStr, consumptionRateStr]);

    const handleReset = () => {
        setCifPrice("");
        setDutyRateStr(initialRates?.dutyRate || "0");
        setVatRateStr(initialRates?.vatRate || "13");
        setConsumptionRateStr(initialRates?.consumptionRate || "0");
    };

    const handleLoadSample = (amount: string, duty: string, vat: string, cons: string) => {
        setCifPrice(amount);
        setDutyRateStr(duty);
        setVatRateStr(vat);
        setConsumptionRateStr(cons);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* 左侧：输入表单 (占 7 列) */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                            <CalcIcon className="w-4 h-4" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-slate-900">CIF 参数录入</h3>
                            <p className="text-xs text-slate-500">请输入人民币 (CNY) 金额</p>
                        </div>
                    </div>

                    <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={handleReset}
                        className="text-xs text-slate-400 hover:text-slate-700 h-8 rounded-lg"
                    >
                        <RefreshCw className="w-3.5 h-3.5 mr-1" />
                        重置表单
                    </Button>
                </div>

                {/* 快捷填入示例 */}
                <div className="p-3.5 bg-blue-50/50 rounded-2xl border border-blue-100/60 flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-blue-900 font-semibold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        快捷案例:
                    </span>
                    <button
                        type="button"
                        onClick={() => handleLoadSample("50000", "0", "13", "0")}
                        className="px-2.5 py-1 bg-white hover:bg-blue-100 text-blue-700 rounded-lg border border-blue-200/60 transition-colors font-medium cursor-pointer"
                    >
                        五万元数码零配件 (0% 关税)
                    </button>
                    <button
                        type="button"
                        onClick={() => handleLoadSample("100000", "5", "13", "10")}
                        className="px-2.5 py-1 bg-white hover:bg-blue-100 text-blue-700 rounded-lg border border-blue-200/60 transition-colors font-medium cursor-pointer"
                    >
                        十万元高档化妆品 (带消费税)
                    </button>
                </div>

                {/* 申报总价 */}
                <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        1. 申报总价 (CIF 到岸价格)
                        <span className="text-rose-500">*</span>
                    </Label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">¥</span>
                        <Input
                            type="number"
                            placeholder="例如：50000"
                            className="pl-9 pr-12 text-lg font-mono font-bold h-12 bg-slate-50/70 focus:bg-white border-slate-200 rounded-xl transition-all"
                            value={cifPrice}
                            onChange={(e) => setCifPrice(e.target.value)}
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">元</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                        * 请输入包含货值、国际运费及保险费的完税到岸价格。
                    </p>
                </div>

                {/* 税率配置 */}
                <div className="space-y-4 pt-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        2. 适用税率配置 (%)
                    </Label>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* 关税 */}
                        <div className="space-y-1.5">
                            <span className="text-xs text-slate-600 font-medium">关税税率</span>
                            <div className="relative">
                                <Input
                                    type="number"
                                    step="0.1"
                                    value={dutyRateStr}
                                    onChange={(e) => setDutyRateStr(e.target.value)}
                                    className="pr-8 font-mono font-bold text-sm h-10 rounded-xl bg-slate-50/70 focus:bg-white border-slate-200"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">%</span>
                            </div>
                        </div>

                        {/* 增值税 */}
                        <div className="space-y-1.5">
                            <span className="text-xs text-slate-600 font-medium">增值税税率</span>
                            <div className="relative">
                                <Input
                                    type="number"
                                    step="0.1"
                                    value={vatRateStr}
                                    onChange={(e) => setVatRateStr(e.target.value)}
                                    className="pr-8 font-mono font-bold text-sm h-10 rounded-xl bg-slate-50/70 focus:bg-white border-slate-200"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">%</span>
                            </div>
                        </div>

                        {/* 消费税 */}
                        <div className="space-y-1.5">
                            <span className="text-xs text-slate-600 font-medium">消费税税率</span>
                            <div className="relative">
                                <Input
                                    type="number"
                                    step="0.1"
                                    value={consumptionRateStr}
                                    onChange={(e) => setConsumptionRateStr(e.target.value)}
                                    className="pr-8 font-mono font-bold text-sm h-10 rounded-xl bg-slate-50/70 focus:bg-white border-slate-200"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 完税说明 */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-500 space-y-1">
                    <p className="font-semibold text-slate-700">CIF 完税价格计算逻辑：</p>
                    <p>• 关税 = CIF价格 × 关税率</p>
                    <p>• 消费税 = (CIF价格 + 关税) ÷ (1 - 消费税率) × 消费税率</p>
                    <p>• 增值税 = (CIF价格 + 关税 + 消费税) × 增值税率</p>
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
                    cif={parseFloat(cifPrice) || 0}
                />
            </div>

        </div>
    );
}
