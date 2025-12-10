import React, { useState } from 'react';
import { Copy, CheckCircle2, Printer, Calculator, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface DetailHeaderProps {
    hscode: string;
    name: string;
    nameEn: string;
}

export default function DetailHeader({ hscode, name, nameEn }: DetailHeaderProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(hscode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white border-b border-gray-200 shadow-sm sticky top-16 z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div>
                        {/* 面包屑 */}
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                            <Link href="/" className="hover:text-blue-600">首页</Link>
                            <ChevronRight className="w-3 h-3" />
                            <Link href="/search" className="hover:text-blue-600">搜索</Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-gray-900 font-medium">编码详情</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-mono font-bold text-blue-700 tracking-tight select-all">
                                {hscode}
                            </h1>
                            <button onClick={handleCopy} className="text-gray-400 hover:text-blue-600 transition-colors">
                                {copied ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
                            </button>
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded border border-green-200">
                现行有效
              </span>
                        </div>
                        <h2 className="text-xl font-bold mt-2 text-gray-900">{name}</h2>
                        <p className="text-sm text-gray-500 mt-1 italic font-light">{nameEn}</p>
                    </div>

                    <div className="flex gap-3 mt-1">
                        <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 text-gray-700">
                            <Printer className="w-4 h-4" /> 打印 / PDF
                        </button>
                        <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 shadow-sm">
                            <Calculator className="w-4 h-4" /> 全额税费计算
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}