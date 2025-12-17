"use client";

import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCw, Calculator as CalcIcon, Info } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import TaxResultCard from "./TaxResultCard";

interface CIFCalculatorProps {
    initialRates?: {
        dutyRate: string;
        vatRate: string;
        consumptionRate: string;
    };
}

export default function CIFCalculator({ initialRates }: CIFCalculatorProps) {
    // 1. 输入状态
    const [cifPrice, setCifPrice] = useState<string>("");
    const [dutyRateStr, setDutyRateStr] = useState<string>(initialRates?.dutyRate || "0");
    const [vatRateStr, setVatRateStr] = useState<string>(initialRates?.vatRate || "13");
    const [consumptionRateStr, setConsumptionRateStr] = useState<string>(
        initialRates?.consumptionRate || "0"
    );

    // 2. 结果状态
    const [result, setResult] = useState({
        duty: 0,
        consumption: 0,
        vat: 0,
        totalTax: 0,
        totalCost: 0,
    });

    // 3. 计算核心逻辑
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

    // 监听输入变化自动计算
    useEffect(() => {
        handleCalculate();
    }, [cifPrice, dutyRateStr, vatRateStr, consumptionRateStr]);

    // 重置
    const handleReset = () => {
        setCifPrice("");
        setDutyRateStr(initialRates?.dutyRate || "0");
        setVatRateStr(initialRates?.vatRate || "13");
        setConsumptionRateStr(initialRates?.consumptionRate || "0");
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative items-start">
            {/* 左侧：输入表单 (占 7 列) */}
            <div className="lg:col-span-7">
                <Card className="border-slate-200 shadow-sm">
                    <CardHeader className="bg-slate-50/50 pb-4 border-b">
                        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                            <div className="p-1.5 bg-blue-100 text-blue-600 rounded-md">
                                <CalcIcon className="w-4 h-4" />
                            </div>
                            参数录入
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-6 pt-6">
                        {/* 货物基础信息 */}
                        <div className="space-y-4">
                            <Label className="text-slate-900 font-medium">
                                1. 申报总价 (CIF)
                            </Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">¥</span>
                                <Input
                                    type="number"
                                    placeholder="请输入人民币总价..."
                                    className="pl-8 text-lg font-mono h-12 bg-slate-50/50 focus:bg-white transition-colors"
                                    value={cifPrice}
                                    onChange={(e) => setCifPrice(e.target.value)}
                                    autoFocus
                                />
                            </div>
                            <p className="text-xs text-slate-400">
                                * 请输入包含货值、国际运费及保险费的到岸价格 (人民币)
                            </p>
                        </div>

                        {/* 税率配置 */}
                        <div className="space-y-4">
                            <Label className="text-slate-900 font-medium">
                                2. 税率配置 (%)
                            </Label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-xs font-medium text-slate-600">关税率</span>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger><Info className="w-3 h-3 text-slate-400" /></TooltipTrigger>
                                                <TooltipContent><p>通常使用最惠国税率</p></TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <div className="relative">
                                        <Input
                                            type="number"
                                            value={dutyRateStr}
                                            onChange={(e) => setDutyRateStr(e.target.value)}
                                            className="pr-7 font-mono text-center"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">%</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <span className="text-xs font-medium text-slate-600">增值税率</span>
                                    <div className="relative">
                                        <Input
                                            type="number"
                                            value={vatRateStr}
                                            onChange={(e) => setVatRateStr(e.target.value)}
                                            className="pr-7 font-mono text-center"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">%</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <span className="text-xs font-medium text-slate-600">消费税率</span>
                                    <div className="relative">
                                        <Input
                                            type="number"
                                            value={consumptionRateStr}
                                            onChange={(e) => setConsumptionRateStr(e.target.value)}
                                            className="pr-7 font-mono text-center"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>

                    {/* 底部按钮区域 */}
                    <CardFooter className="bg-slate-50/50 border-t p-4 flex gap-3">
                        <Button
                            variant="outline"
                            className="flex-1 bg-white hover:bg-slate-100 text-slate-600 border-slate-200"
                            onClick={handleReset}
                        >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            重置数据
                        </Button>
                        {/* 既然是自动计算，这个按钮主要起到视觉确认作用，也可以设计成'保存结果' */}
                        <Button
                            className="flex-[2] bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-200"
                            onClick={handleCalculate}
                        >
                            立即计算
                        </Button>
                    </CardFooter>
                </Card>
            </div>

            {/* 右侧：结果展示 (占 5 列) - 添加 sticky 实现跟随效果 */}
            <div className="lg:col-span-5 sticky top-24">
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