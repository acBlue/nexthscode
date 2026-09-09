import React from "react";
import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";
import { ShieldCheck, CheckCircle2, Sparkles } from "lucide-react";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-white dark:bg-[#080c14] selection:bg-blue-600 selection:text-white transition-colors duration-200">
            
            {/* 左侧：品牌展示区 (桌面端显示) */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 p-12 flex-col justify-between relative overflow-hidden text-white border-r border-white/[0.06]">
                <div className="absolute inset-0 bg-grid-slate opacity-20 pointer-events-none" />
                <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

                {/* 顶部 Logo */}
                <div className="relative z-10">
                    <Link href="/" className="inline-flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <span className="text-2xl font-extrabold tracking-tight">HSCode Master</span>
                    </Link>
                </div>

                {/* 中间核心价值文案 */}
                <div className="relative z-10 max-w-lg space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-xs font-semibold text-blue-300">
                        <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                        新一代海关合规查询平台
                    </div>

                    <h2 className="text-4xl font-extrabold tracking-tight leading-tight">
                        让每一个外贸申报与税率核算，都精准合规。
                    </h2>

                    <p className="text-sm text-slate-300 leading-relaxed">
                        汇聚全国海关最新进出口税则、检验检疫与监管证件库，已为数万家外贸企业、报关行与跨境电商提供毫秒级申报支持。
                    </p>

                    <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-3 text-xs text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>标准 10 位商品编码及规范申报要素全收录</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>复合税、消费税、最惠国及暂定税率自动匹配</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>CIF / FOB / CFR / EXW 全贸易术语完税推导</span>
                        </div>
                    </div>
                </div>

                {/* 底部小字 */}
                <div className="relative z-10 text-xs text-slate-500">
                    © {new Date().getFullYear()} HSCode Master. 保障外贸出海企业通关无忧。
                </div>
            </div>

            {/* 右侧：登录表单卡片区 */}
            <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-slate-50/50 dark:bg-[#080c14]">
                <div className="w-full max-w-md">
                    <LoginForm />
                </div>
            </div>

        </div>
    );
}
