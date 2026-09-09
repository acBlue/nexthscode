"use client";

import React, { useState } from 'react';
import { Copy, Check, Printer, Calculator, ShieldCheck, Sparkles, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface DetailHeaderProps {
    hscode: string;
    name: string;
    nameEn?: string;
    rates?: {
        mfn: string | null;
        vat: string | null;
        consumption: string | null;
    };
}

export default function DetailHeader({ hscode, name, nameEn, rates }: DetailHeaderProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(hscode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handlePrint = () => {
        window.print();
    };

    const dutyVal = rates?.mfn ? parseFloat(rates.mfn) : 0;
    const vatVal = rates?.vat ? parseFloat(rates.vat) : 13;
    const consVal = rates?.consumption ? parseFloat(rates.consumption) : 0;
    const calculatorUrl = `/tools/tax?duty=${dutyVal}&vat=${vatVal}&consumption=${consVal}`;

    return (
        <div className="bg-white/95 backdrop-blur-md border-b border-slate-200/90 sticky top-16 z-20 print:static print:bg-white print:border-b-2 print:border-black shadow-2xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                <div className="flex flex-col gap-4">
                    {/* 面包屑 */}
                    <div className="print:hidden">
                        <Breadcrumb>
                            <BreadcrumbList className="text-xs text-slate-500">
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/" className="hover:text-blue-600">首页</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/search" className="hover:text-blue-600">编码查询</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="font-semibold text-slate-900">编码详情</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                        <div className="space-y-2 max-w-4xl">
                            <div className="flex items-center flex-wrap gap-3">
                                <div className="inline-flex items-center gap-2 bg-blue-50/80 px-3.5 py-1 rounded-xl border border-blue-200/80">
                                    <h1 className="text-2xl sm:text-3xl font-mono font-extrabold text-blue-700 tracking-tight select-all">
                                        {hscode}
                                    </h1>
                                </div>

                                <div className="print:hidden">
                                    <TooltipProvider>
                                        <Tooltip delayDuration={100}>
                                            <TooltipTrigger asChild>
                                                <Button 
                                                    variant="outline" 
                                                    size="sm" 
                                                    onClick={handleCopy} 
                                                    className="h-8 px-2.5 rounded-lg border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-600"
                                                >
                                                    {copied ? (
                                                        <>
                                                            <Check className="w-3.5 h-3.5 text-emerald-600 mr-1" />
                                                            <span className="text-xs text-emerald-600 font-medium">已复制</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Copy className="w-3.5 h-3.5 mr-1" />
                                                            <span className="text-xs">复制税号</span>
                                                        </>
                                                    )}
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>点击复制标准海关编码</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>

                                <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200/80 hover:bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                                    现行有效 (2025)
                                </Badge>
                            </div>

                            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                                {name}
                            </h2>
                            {nameEn && (
                                <p className="text-xs sm:text-sm text-slate-400 font-mono">
                                    {nameEn}
                                </p>
                            )}
                        </div>

                        {/* 操作栏 */}
                        <div className="flex items-center gap-2.5 print:hidden shrink-0">
                            <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={handlePrint}
                                className="h-9 px-3 border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl"
                            >
                                <Printer className="w-4 h-4 mr-1.5 text-slate-500" />
                                打印 / 归档
                            </Button>

                            <Button 
                                size="sm" 
                                className="h-9 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-xs shadow-blue-500/20" 
                                asChild
                            >
                                <Link href={calculatorUrl} target="_blank">
                                    <Calculator className="w-4 h-4 mr-1.5" />
                                    以此税率测算成本
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
