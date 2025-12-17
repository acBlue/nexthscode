"use client";

import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCw, Calculator as CalcIcon, Info, Ship, ShieldCheck } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
    // 1. 基础输入
    const [fobPrice, setFobPrice] = useState<string>("");   // FOB 货价
    const [freight, setFreight] = useState<string>("");     // 运费

    // 2. 保险费控制
    const [insMode, setInsMode] = useState<"rate" | "amount">("rate"); // rate=按费率, amount=按金额
    const [insRateStr, setInsRateStr] = useState<string>("0.3"); // 默认 0.3%
    const [insAmountStr, setInsAmountStr] = useState<string>("");

    // 3. 税率输入
    const [dutyRateStr, setDutyRateStr] = useState<string>(initialRates?.dutyRate || "0");
    const [vatRateStr, setVatRateStr] = useState<string>(initialRates?.vatRate || "13");
    const [consumptionRateStr, setConsumptionRateStr] = useState<string>(initialRates?.consumptionRate || "0");

    // 4. 结果状态
    const [result, setResult] = useState({
        cif: 0,
        duty: 0,
        consumption: 0,
        vat: 0,
        totalTax: 0,
        totalCost: 0,
    });

    // 计算逻辑
    const handleCalculate = () => {
        const fob = parseFloat(fobPrice) || 0;
        const frt = parseFloat(freight) || 0;

        // 计算保险费
        let insurance = 0;
        if (insMode === "amount") {
            insurance = parseFloat(insAmountStr) || 0;
        } else {
            // 海关公式：保险费 = (FOB + 运费) * 保险费率
            const iRate = (parseFloat(insRateStr) || 0) / 100;
            insurance = (fob + frt) * iRate;
        }

        // 得出完税价格 CIF
        const cif = fob + frt + insurance;

        // 后续逻辑与 CIF 计算一致
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
            totalCost: cif + duty + consumption + vat, // 这里 Cost 依然是 CIF + 税
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

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative items-start">
            {/* 左侧输入区 */}
            <div className="lg:col-span-7">
                <Card className="border-slate-200 shadow-sm">
                    <CardHeader className="bg-slate-50/50 pb-4 border-b">
                        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                            <div className="p-1.5 bg-indigo-100 text-indigo-600 rounded-md">
                                <Ship className="w-4 h-4" />
                            </div>
                            FOB 离岸价参数
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-6 pt-6">
                        {/* 1. FOB + 运费 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <Label className="text-slate-900 font-medium">FOB 货价 (CNY)</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">¥</span>
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        className="pl-8 font-mono"
                                        value={fobPrice}
                                        onChange={e => setFobPrice(e.target.value)}
                                        autoFocus
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Label className="text-slate-900 font-medium flex items-center gap-1">
                                    国际运费
                                    <span className="text-xs text-slate-400 font-normal">(Freight)</span>
                                </Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">¥</span>
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        className="pl-8 font-mono"
                                        value={freight}
                                        onChange={e => setFreight(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 2. 保险费设置 */}
                        <div className="p-4 bg-slate-50/80 rounded-lg border border-slate-100 space-y-4">
                            <div className="flex items-center justify-between">
                                <Label className="text-slate-900 font-medium flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-slate-500" />
                                    保险费 (Insurance)
                                </Label>
                                <Tabs value={insMode} onValueChange={(v: any) => setInsMode(v)} className="w-[160px]">
                                    <TabsList className="grid w-full grid-cols-2 h-7">
                                        <TabsTrigger value="rate" className="text-xs px-2 h-5">按费率</TabsTrigger>
                                        <TabsTrigger value="amount" className="text-xs px-2 h-5">按金额</TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </div>

                            {insMode === "rate" ? (
                                <div className="flex items-center gap-3">
                                    <div className="relative flex-1">
                                        <Input
                                            type="number"
                                            value={insRateStr}
                                            onChange={e => setInsRateStr(e.target.value)}
                                            className="pr-8 font-mono bg-white"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">%</span>
                                    </div>
                                    <div className="text-xs text-slate-500 flex-1">
                                        <p>海关默认估算费率：<span className="font-bold text-slate-700">0.3%</span></p>
                                        <p className="scale-90 origin-left text-slate-400">公式：(FOB+运费) × 费率</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">¥</span>
                                    <Input
                                        type="number"
                                        placeholder="实际支付保费金额"
                                        className="pl-8 font-mono bg-white"
                                        value={insAmountStr}
                                        onChange={e => setInsAmountStr(e.target.value)}
                                    />
                                </div>
                            )}
                        </div>

                        {/* 3. 税率配置 (复用部分) */}
                        <div className="space-y-4 pt-2">
                            <Label className="text-slate-900 font-medium">税率配置 (%)</Label>
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

                    <CardFooter className="bg-slate-50/50 border-t p-4 flex gap-3">
                        <Button variant="outline" className="flex-1" onClick={handleReset}>
                            <RefreshCw className="w-4 h-4 mr-2" />
                            重置
                        </Button>
                        <Button className="flex-[2] bg-indigo-600 hover:bg-indigo-700" onClick={handleCalculate}>
                            计算 FOB 税费
                        </Button>
                    </CardFooter>
                </Card>
            </div>

            {/* 右侧结果区 (Sticky) */}
            <div className="lg:col-span-5 sticky top-24">
                <TaxResultCard
                    duty={result.duty}
                    consumption={result.consumption}
                    vat={result.vat}
                    totalTax={result.totalTax}
                    totalCost={result.totalCost}
                    cif={result.cif}
                />
                {/* FOB 专属提示 */}
                <div className="mt-4 p-3 bg-indigo-50 rounded-md border border-indigo-100 text-xs text-indigo-700">
                    <span className="font-bold">提示：</span>
                    FOB 总成本 = FOB 货价 + 运费 + 保险费 + 进口税费。
                    <br />
                    当前完税价格(CIF)已包含预估运保费。
                </div>
            </div>
        </div>
    );
}