import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TaxCalculatorContainer from "@/components/calculator/TaxCalculatorContainer";

// 启用 ISR：税费计算器静态预渲染 24 小时，由 Vercel 边缘节点秒开直出
export const revalidate = 86400;

export default function TaxToolPage() {
    return (
        <div className="min-h-screen bg-slate-50/60 dark:bg-[#080c14] font-sans text-slate-900 dark:text-slate-100 pb-20 selection:bg-blue-600 selection:text-white transition-colors duration-200">
            <Navbar />

            {/* 顶部 Header */}
            <div className="bg-white dark:bg-[#0b101c] border-b border-slate-200/90 dark:border-white/[0.08] py-12 lg:py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-slate opacity-40 dark:opacity-20 pointer-events-none" />
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="max-w-4xl mx-auto px-4 text-center space-y-4 relative z-10">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-500/30 text-xs font-semibold">
                        <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                        Incoterms 2020 国际贸易条款全覆盖
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        进口税费与落地成本
                        <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 dark:from-blue-400 dark:via-indigo-400 dark:to-sky-300 bg-clip-text text-transparent ml-2">
                            智能测算器
                        </span>
                    </h1>

                    <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        支持 CIF / FOB / CFR / EXW 等主流贸易术语，严格遵循海关审价推导公式，实时计算关税、增值税与消费税。
                    </p>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <TaxCalculatorContainer />
            </main>

            <Footer />
        </div>
    );
}
