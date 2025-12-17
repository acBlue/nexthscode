import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ReceiptText } from "lucide-react";

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
    const fmt = (num: number) =>
        new Intl.NumberFormat("zh-CN", {
            style: "currency",
            currency: "CNY",
            minimumFractionDigits: 2,
        }).format(num);

    return (
        <Card className="bg-white border-blue-100 shadow-md overflow-hidden ring-1 ring-blue-50">
            <CardHeader className="pb-3 bg-gradient-to-r from-blue-50/80 to-slate-50/80 border-b border-blue-100">
                <div className="flex items-center gap-2 text-blue-800">
                    <ReceiptText className="w-5 h-5" />
                    <CardTitle className="text-base font-bold">计算结果预览</CardTitle>
                </div>
            </CardHeader>

            <CardContent className="space-y-5 pt-5 px-5">
                {/* 核心税费列表 */}
                <div className="space-y-3">
                    <Row label="进口关税" value={duty} color="bg-blue-500" />
                    <Row label="消费税" value={consumption} color="bg-amber-500" />
                    <Row label="增值税" value={vat} color="bg-emerald-500" />
                </div>

                <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-dashed border-slate-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-slate-400">Total</span>
                    </div>
                </div>

                {/* 汇总区域 */}
                <div className="space-y-4">
                    <div className="flex justify-between items-end bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <span className="text-sm font-medium text-slate-600 mb-1">税费合计</span>
                        <span className="text-2xl font-bold text-red-600 font-mono tracking-tight">
              {fmt(totalTax)}
            </span>
                    </div>

                    <div className="space-y-2 pt-2">
                        <div className="flex justify-between items-center text-xs text-slate-500">
                            <span>CIF 货值</span>
                            <span className="font-mono">{fmt(cif)}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                            <span className="text-sm font-bold text-slate-800">预估总落地成本</span>
                            <span className="text-lg font-bold text-slate-900 font-mono">
                {fmt(totalCost)}
              </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

// 子组件：单行显示
function Row({ label, value, color }: { label: string; value: number; color: string }) {
    const fmt = (num: number) =>
        new Intl.NumberFormat("zh-CN", { minimumFractionDigits: 2 }).format(num);

    return (
        <div className="flex justify-between items-center text-sm group">
            <div className="flex items-center gap-2.5 text-slate-600">
                <span className={cn("w-2 h-2 rounded-full ring-2 ring-opacity-20 ring-offset-1 transition-all group-hover:scale-110", color, `ring-${color.replace('bg-', '')}`)} />
                <span className="group-hover:text-slate-900 transition-colors">{label}</span>
            </div>
            <span className="font-mono font-medium text-slate-700">{fmt(value)}</span>
        </div>
    );
}