"use client";

import React, { useState } from 'react';
import { Copy, Check, Printer, Calculator } from 'lucide-react';
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
    nameEn: string;
    // 新增：接收税率数据用于跳转参数构造
    rates?: {
        mfn: string | null;         // 最惠国税率
        vat: string | null;         // 增值税率
        consumption: string | null; // 消费税率
    };
}

export default function DetailHeader({ hscode, name, nameEn, rates }: DetailHeaderProps) {
    const [copied, setCopied] = useState(false);

    // 保留您原有的复制功能，完全不动
    const handleCopy = () => {
        navigator.clipboard.writeText(hscode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // 打印处理函数
    const handlePrint = () => {
        window.print();
    };

    // === 新增：构造带参数的跳转链接 ===
    const dutyVal = rates?.mfn ? parseFloat(rates.mfn) : 0;
    const vatVal = rates?.vat ? parseFloat(rates.vat) : 13;
    const consVal = rates?.consumption ? parseFloat(rates.consumption) : 0;

    // 目标 URL: /tools/tax?duty=x&vat=y&consumption=z
    const calculatorUrl = `/tools/tax?duty=${dutyVal}&vat=${vatVal}&consumption=${consVal}`;

    return (
        // 添加 print:static print:border-none 确保打印时头部不固定且无边框
        <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-16 z-20 print:static print:bg-white print:border-b-2 print:border-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col gap-4">
                    {/* 面包屑：打印时隐藏 */}
                    <div className="print:hidden">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/">首页</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/search">搜索</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>编码详情</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-mono font-extrabold text-blue-700 tracking-tight select-all print:text-black">
                                    {hscode}
                                </h1>

                                <div className="print:hidden">
                                    <TooltipProvider>
                                        <Tooltip delayDuration={100}>
                                            <TooltipTrigger asChild>
                                                <Button variant="ghost" size="icon" onClick={handleCopy} className="h-8 w-8 text-muted-foreground hover:text-blue-600">
                                                    {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{copied ? "已复制" : "点击复制编码"}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>

                                {/* 打印时保留这个 Tag，但调整颜色 */}
                                <Badge variant="default" className="bg-emerald-600 hover:bg-emerald-700 border-transparent print:bg-transparent print:text-black print:border-black print:border">
                                    现行有效
                                </Badge>
                            </div>

                            <h2 className="text-xl font-bold text-foreground leading-snug print:text-black">{name}</h2>
                            {nameEn && <p className="text-sm text-muted-foreground font-mono print:text-gray-600">{nameEn}</p>}
                        </div>

                        {/* 按钮组：打印时完全隐藏 */}
                        <div className="flex gap-2 print:hidden">
                            {/* <Button variant="outline" size="sm" className="gap-2" onClick={handlePrint}>
                                <Printer className="w-4 h-4" />
                                <span className="hidden sm:inline">打印 / PDF</span>
                             </Button> */}

                            {/* === 修改：包裹 Link 组件实现跳转 === */}
                            <Link href={calculatorUrl} target="_blank">
                                <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                                    <Calculator className="w-4 h-4" />
                                    税费计算
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}