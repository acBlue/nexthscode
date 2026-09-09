import React, { useState } from "react";
import { ReceiptText, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface TaxResultProps {
    duty: number;
    consumption: number;
    vat: number;
    totalTax: number;
    totalCost: number;
    cif: number;
}

export default function TaxResultCard({
    duty,
    consumption,
    vat,
    totalTax,
    totalCost,
    cif,
}: TaxResultProps) {
    const [copied, setCopied] = useState(false);

    const fmt = (num: number) =>
        new Intl.NumberFormat("zh-CN", {
            style: "currency",
            currency: "CNY",
            minimumFractionDigits: 2,
        }).format(num);

    const fmtPure = (num: number) =>
        new Intl.NumberFormat("zh-CN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(num);

    const effectiveRate = cif > 0 ? ((totalTax / cif) * 100).toFixed(2) : "0.00";

    const dutyShare = totalTax > 0 ? ((duty / totalTax) * 100).toFixed(1) : "0";
    const consShare = totalTax > 0 ? ((consumption / totalTax) * 100).toFixed(1) : "0";
    const vatShare = totalTax > 0 ? ((vat / totalTax) * 100).toFixed(1) : "0";

    const handleCopySummary = () => {
        const text = `【进口税费核算清单】\n完税价格(CIF): ￥${fmtPure(cif)}\n关税: ￥${fmtPure(duty)}\n消费税: ￥${fmtPure(consumption)}\n增值税: ￥${fmtPure(vat)}\n税费总计: ￥${fmtPure(totalTax)}\n综合到岸总成本: ￥${fmtPure(totalCost)}\n综合税负率: ${effectiveRate}%`;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white dark:bg-[#0f172a] border border-blue-100 dark:border-white/[0.08] rounded-3xl shadow-xl shadow-blue-900/5 dark:shadow-black/50 overflow-hidden sticky top-24 transition-colors duration-200">
            
            {/* 头部 */}
            <div className="p-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 dark:from-blue-700 dark:via-indigo-700 dark:to-blue-800 text-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center">
                        <ReceiptText className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold tracking-tight">税费核算总览</h3>
                        <p className="text-[11px] text-blue-100">自动实时推导</p>
                    </div>
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopySummary}
                    className="text-white hover:bg-white/20 text-xs h-8 px-2.5 rounded-lg cursor-pointer"
                >
                    {copied ? (
                        <>
                            <Check className="w-3.5 h-3.5 mr-1 text-emerald-300" />
                            已复制
                        </>
                    ) : (
                        <>
                            <Copy className="w-3.5 h-3.5 mr-1" />
                            复制明细
                        </>
                    )}
                </Button>
            </div>

            <div className="p-6 space-y-6">
                
                {/* 综合有效税负率徽章 */}
                <div className="p-3 bg-blue-50/80 dark:bg-blue-500/10 border border-blue-100/80 dark:border-blue-500/20 rounded-2xl flex items-center justify-between">
                    <span className="text-xs text-blue-900 dark:text-blue-200 font-medium">综合有效综合税负率</span>
                    <span className="font-mono font-extrabold text-blue-700 dark:text-blue-400 text-base">
                        {effectiveRate}%
                    </span>
                </div>

                {/* 明细分项 */}
                <div className="space-y-3">
                    <Row 
                        label="进口关税" 
                        value={duty} 
                        color="bg-blue-600 dark:bg-blue-500" 
                        share={dutyShare} 
                    />
                    <Row 
                        label="进口消费税" 
                        value={consumption} 
                        color="bg-amber-500 dark:bg-amber-400" 
                        share={consShare} 
                    />
                    <Row 
                        label="进口增值税" 
                        value={vat} 
                        color="bg-emerald-500 dark:bg-emerald-400" 
                        share={vatShare} 
                    />
                </div>

                {/* 进度条占比 */}
                {totalTax > 0 && (
                    <div className="space-y-1.5 pt-2">
                        <div className="text-[10px] text-slate-400 dark:text-slate-400 flex justify-between font-mono">
                            <span>关税: {dutyShare}%</span>
                            {consumption > 0 && <span>消费税: {consShare}%</span>}
                            <span>增值税: {vatShare}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex">
                            <div style={{ width: `${dutyShare}%` }} className="bg-blue-600 dark:bg-blue-500 h-full" title="关税" />
                            <div style={{ width: `${consShare}%` }} className="bg-amber-500 dark:bg-amber-400 h-full" title="消费税" />
                            <div style={{ width: `${vatShare}%` }} className="bg-emerald-500 dark:bg-emerald-400 h-full" title="增值税" />
                        </div>
                    </div>
                )}

                {/* 分割 */}
                <div className="border-t border-dashed border-slate-200 dark:border-white/[0.08]" />

                {/* 汇总区域 */}
                <div className="space-y-3">
                    <div className="flex justify-between items-baseline p-3.5 bg-rose-50/60 dark:bg-rose-500/10 rounded-2xl border border-rose-100 dark:border-rose-500/20">
                        <div>
                            <span className="text-xs font-semibold text-rose-900 dark:text-rose-300 block">税费合计</span>
                            <span className="text-[10px] text-rose-700/80 dark:text-rose-400/80">海关实际征缴金额</span>
                        </div>
                        <span className="text-2xl font-extrabold text-rose-600 dark:text-rose-400 font-mono tracking-tight">
                            {fmt(totalTax)}
                        </span>
                    </div>

                    <div className="p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-100 dark:border-white/[0.06] space-y-2">
                        <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                            <span>海关完税价格 (CIF)</span>
                            <span className="font-mono font-medium text-slate-800 dark:text-slate-200">{fmt(cif)}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-slate-200/80 dark:border-white/[0.06]">
                            <span className="text-xs font-bold text-slate-900 dark:text-white">预估落地总成本</span>
                            <span className="text-lg font-extrabold text-slate-900 dark:text-white font-mono">
                                {fmt(totalCost)}
                            </span>
                        </div>
                    </div>
                </div>

                <p className="text-[10px] text-slate-400 dark:text-slate-400 text-center leading-relaxed">
                    * 算法依据《中华人民共和国进出口关税条例》，实际以现场海关核定汇率与完税价格为准。
                </p>

            </div>
        </div>
    );
}

function Row({ label, value, color, share }: { label: string; value: number; color: string; share: string }) {
    const fmt = (num: number) =>
        new Intl.NumberFormat("zh-CN", { minimumFractionDigits: 2 }).format(num);

    return (
        <div className="flex justify-between items-center text-xs p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-2">
                <span className={cn("w-2.5 h-2.5 rounded-full", color)} />
                <span className="font-medium text-slate-700 dark:text-slate-300">{label}</span>
            </div>
            <div className="text-right">
                <span className="font-mono font-bold text-slate-900 dark:text-white">{fmt(value)} 元</span>
            </div>
        </div>
    );
}
