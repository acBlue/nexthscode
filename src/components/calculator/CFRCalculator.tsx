"use client";

import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCw, Ship, ShieldCheck, Info } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
    // 输入状态
    const [cfrPrice, setCfrPrice] = useState<string>("");
    const [insMode, setInsMode] = useState<"rate" | "amount">("rate");
    const [insRateStr, setInsRateStr] = useState<string>("0.3");
    const [insAmountStr, setInsAmountStr] = useState<string>("");

    // 税率
    const [dutyRateStr, setDutyRateStr] = useState<string>(initialRates?.dutyRate || "0");
    const [vatRateStr, setVatRateStr] = useState<string>(initialRates?.vatRate || "13");
    const [consumptionRateStr, setConsumptionRateStr] = useState<string>(initialRates?.consumptionRate || "0");

    const [result, setResult] = useState({ cif: 0, duty: 0, consumption: 0, vat: 0, totalTax: 0, totalCost: 0 });

    const handleCalculate = () => {
        const cfr = parseFloat(cfrPrice) || 0;

        // 计算保险费：CFR 模式下，基数就是 CFR 价格 (因为 CFR = Cost + Freight)
        let insurance = 0;
        if (insMode === "amount") {
            insurance = parseFloat(insAmountStr) || 0;
        } else {
            const iRate = (parseFloat(insRateStr) || 0) / 100;
            insurance = cfr * iRate;
        }

        const cif = cfr + insurance;

        // 税费逻辑 (复用)
        const dRate = parseFloat(dutyRateStr) / 100;
        const vRate = parseFloat(vatRateStr) / 100;
        const cRate = parseFloat(consumptionRateStr) / 100;

        const duty = cif * dRate;
        let consumption = 0;
        if (cRate > 0 && cRate < 1) consumption = ((cif + duty) / (1 - cRate)) * cRate;
        const vat = (cif + duty + consumption) * vRate;

        setResult({
            cif, duty, consumption, vat,
            totalTax: duty + consumption + vat,
            totalCost: cif + duty + consumption + vat,
        });
    };

    useEffect(() => { handleCalculate(); }, [cfrPrice, insMode, insRateStr, insAmountStr, dutyRateStr, vatRateStr, consumptionRateStr]);

    const handleReset = () => {
        setCfrPrice(""); setInsMode("rate"); setInsRateStr("0.3"); setInsAmountStr("");
        setDutyRateStr(initialRates?.dutyRate || "0"); setVatRateStr(initialRates?.vatRate || "13"); setConsumptionRateStr(initialRates?.consumptionRate || "0");
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative items-start">
            <div className="lg:col-span-7">
                <Card className="border-slate-200 shadow-sm">
                    <CardHeader className="bg-slate-50/50 pb-4 border-b">
                        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                            <div className="p-1.5 bg-cyan-100 text-cyan-600 rounded-md"><Ship className="w-4 h-4" /></div>
                            CFR (C&F) 参数
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                        <div className="space-y-3">
                            <Label className="text-slate-900 font-medium">CFR 货价 (Cost + Freight)</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">¥</span>
                                <Input type="number" placeholder="0" className="pl-8 font-mono h-11" value={cfrPrice} onChange={e => setCfrPrice(e.target.value)} autoFocus />
                            </div>
                            <p className="text-xs text-slate-400">*包含货值及到达中国口岸的运费，不含保险。</p>
                        </div>

                        {/* 保险费模块 */}
                        <div className="p-4 bg-slate-50/80 rounded-lg border border-slate-100 space-y-4">
                            <div className="flex items-center justify-between">
                                <Label className="text-slate-900 font-medium flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-slate-500" /> 保险费 (Insurance)
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
                                        <Input type="number" value={insRateStr} onChange={e => setInsRateStr(e.target.value)} className="pr-8 font-mono bg-white" />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">%</span>
                                    </div>
                                    <div className="text-xs text-slate-500 flex-1">
                                        <p>海关默认：<span className="font-bold text-slate-700">0.3%</span></p>
                                        <p className="scale-90 origin-left text-slate-400">公式：CFR × 费率</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">¥</span><Input type="number" className="pl-8 font-mono bg-white" value={insAmountStr} onChange={e => setInsAmountStr(e.target.value)} /></div>
                            )}
                        </div>

                        {/* 税率配置 (简化显示，保持一致性) */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-1"><Label className="text-xs text-slate-500">关税率 %</Label><Input type="number" value={dutyRateStr} onChange={e => setDutyRateStr(e.target.value)} className="font-mono text-center h-9" /></div>
                            <div className="space-y-1"><Label className="text-xs text-slate-500">增值税率 %</Label><Input type="number" value={vatRateStr} onChange={e => setVatRateStr(e.target.value)} className="font-mono text-center h-9" /></div>
                            <div className="space-y-1"><Label className="text-xs text-slate-500">消费税率 %</Label><Input type="number" value={consumptionRateStr} onChange={e => setConsumptionRateStr(e.target.value)} className="font-mono text-center h-9" /></div>
                        </div>
                    </CardContent>
                    <CardFooter className="bg-slate-50/50 border-t p-4 flex gap-3">
                        <Button variant="outline" className="flex-1" onClick={handleReset}><RefreshCw className="w-4 h-4 mr-2" />重置</Button>
                        <Button className="flex-[2] bg-cyan-600 hover:bg-cyan-700" onClick={handleCalculate}>计算 CFR 税费</Button>
                    </CardFooter>
                </Card>
            </div>
            <div className="lg:col-span-5 sticky top-24">
                <TaxResultCard duty={result.duty} consumption={result.consumption} vat={result.vat} totalTax={result.totalTax} totalCost={result.totalCost} cif={result.cif} />
            </div>
        </div>
    );
}