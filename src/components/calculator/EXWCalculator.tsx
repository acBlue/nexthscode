"use client";

import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCw, Factory, Truck, Ship, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import TaxResultCard from "./TaxResultCard";

interface EXWCalculatorProps {
    initialRates?: { dutyRate: string; vatRate: string; consumptionRate: string; };
}

export default function EXWCalculator({ initialRates }: EXWCalculatorProps) {
    // 输入
    const [exwPrice, setExwPrice] = useState("");
    const [inlandCost, setInlandCost] = useState(""); // 国外内陆杂费
    const [freight, setFreight] = useState("");       // 国际运费
    const [insRateStr, setInsRateStr] = useState("0.3");

    // 税率
    const [dutyRateStr, setDutyRateStr] = useState(initialRates?.dutyRate || "0");
    const [vatRateStr, setVatRateStr] = useState(initialRates?.vatRate || "13");
    const [consumptionRateStr, setConsumptionRateStr] = useState(initialRates?.consumptionRate || "0");

    const [result, setResult] = useState({ cif: 0, duty: 0, consumption: 0, vat: 0, totalTax: 0, totalCost: 0 });

    const handleCalculate = () => {
        const exw = parseFloat(exwPrice) || 0;
        const inland = parseFloat(inlandCost) || 0; // 杂费
        const frt = parseFloat(freight) || 0;
        const iRate = (parseFloat(insRateStr) || 0) / 100;

        // 1. 估算 FOB = EXW + Inland
        // 2. 估算 CFR = FOB + Freight
        // 3. 估算 Insurance = CFR * Rate
        const baseForInsurance = exw + inland + frt;
        const insurance = baseForInsurance * iRate;

        const cif = baseForInsurance + insurance;

        // 税费
        const dRate = parseFloat(dutyRateStr) / 100;
        const vRate = parseFloat(vatRateStr) / 100;
        const cRate = parseFloat(consumptionRateStr) / 100;

        const duty = cif * dRate;
        let consumption = 0;
        if (cRate > 0 && cRate < 1) consumption = ((cif + duty) / (1 - cRate)) * cRate;
        const vat = (cif + duty + consumption) * vRate;

        setResult({ cif, duty, consumption, vat, totalTax: duty + consumption + vat, totalCost: cif + duty + consumption + vat });
    };

    useEffect(() => { handleCalculate(); }, [exwPrice, inlandCost, freight, insRateStr, dutyRateStr, vatRateStr, consumptionRateStr]);

    const handleReset = () => {
        setExwPrice(""); setInlandCost(""); setFreight(""); setInsRateStr("0.3");
        setDutyRateStr(initialRates?.dutyRate || "0"); setVatRateStr(initialRates?.vatRate || "13"); setConsumptionRateStr(initialRates?.consumptionRate || "0");
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative items-start">
            <div className="lg:col-span-7">
                <Card className="border-slate-200 shadow-sm">
                    <CardHeader className="bg-slate-50/50 pb-4 border-b">
                        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                            <div className="p-1.5 bg-orange-100 text-orange-600 rounded-md"><Factory className="w-4 h-4" /></div>
                            EXW 工厂交货参数
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                        <div className="space-y-3">
                            <Label className="text-slate-900 font-medium">1. EXW 工厂货价</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">¥</span>
                                <Input type="number" className="pl-8 font-mono" value={exwPrice} onChange={e => setExwPrice(e.target.value)} autoFocus />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <Label className="text-slate-900 font-medium flex items-center gap-2">
                                    <Truck className="w-4 h-4 text-slate-400" /> 出口国内陆杂费
                                </Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">¥</span>
                                    <Input type="number" className="pl-8 font-mono" placeholder="内陆运费+报关费" value={inlandCost} onChange={e => setInlandCost(e.target.value)} />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Label className="text-slate-900 font-medium flex items-center gap-2">
                                    <Ship className="w-4 h-4 text-slate-400" /> 国际运费
                                </Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">¥</span>
                                    <Input type="number" className="pl-8 font-mono" value={freight} onChange={e => setFreight(e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label className="text-slate-900 font-medium flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-slate-400" /> 保险费率 (估算)
                            </Label>
                            <div className="relative">
                                <Input type="number" className="pl-3 pr-8 font-mono" value={insRateStr} onChange={e => setInsRateStr(e.target.value)} />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">%</span>
                            </div>
                            <p className="text-xs text-slate-400">EXW 保险费基数 = 工厂价 + 杂费 + 国际运费</p>
                        </div>

                        {/* 税率配置 (简化) */}
                        <div className="grid grid-cols-3 gap-4 border-t pt-4">
                            <div className="space-y-1"><Label className="text-xs text-slate-500">关税率 %</Label><Input type="number" value={dutyRateStr} onChange={e => setDutyRateStr(e.target.value)} className="font-mono text-center h-9" /></div>
                            <div className="space-y-1"><Label className="text-xs text-slate-500">增值税率 %</Label><Input type="number" value={vatRateStr} onChange={e => setVatRateStr(e.target.value)} className="font-mono text-center h-9" /></div>
                            <div className="space-y-1"><Label className="text-xs text-slate-500">消费税率 %</Label><Input type="number" value={consumptionRateStr} onChange={e => setConsumptionRateStr(e.target.value)} className="font-mono text-center h-9" /></div>
                        </div>
                    </CardContent>
                    <CardFooter className="bg-slate-50/50 border-t p-4 flex gap-3">
                        <Button variant="outline" className="flex-1" onClick={handleReset}><RefreshCw className="w-4 h-4 mr-2" />重置</Button>
                        <Button className="flex-[2] bg-orange-600 hover:bg-orange-700" onClick={handleCalculate}>计算 EXW 税费</Button>
                    </CardFooter>
                </Card>
            </div>
            <div className="lg:col-span-5 sticky top-24">
                <TaxResultCard duty={result.duty} consumption={result.consumption} vat={result.vat} totalTax={result.totalTax} totalCost={result.totalCost} cif={result.cif} />
                <div className="mt-4 p-3 bg-orange-50 rounded-md border border-orange-100 text-xs text-orange-800">
                    <span className="font-bold">EXW 说明：</span> 计算器已自动累加内陆杂费和国际运保费，推导至中国口岸 CIF 完税价格。
                </div>
            </div>
        </div>
    );
}