import React from "react";
import Link from "next/link";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { ShieldCheck, CheckCircle2, Sparkles } from "lucide-react";

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-white selection:bg-blue-600 selection:text-white">
            
            {/* 左侧：品牌展示区 (桌面端显示) */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 p-12 flex-col justify-between relative overflow-hidden text-white">
                <div className="absolute inset-0 bg-grid-slate opacity-20 pointer-events-none" />
                <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10">
                    <Link href="/" className="inline-flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <span className="text-2xl font-extrabold tracking-tight">HSCode Master</span>
                    </Link>
                </div>

                <div className="relative z-10 max-w-lg space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-xs font-semibold text-blue-300">
                        <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                        免费开通外贸合规智库
                    </div>

                    <h2 className="text-4xl font-extrabold tracking-tight leading-tight">
                        立即创建账号，开启高效关税核算之旅。
                    </h2>

                    <p className="text-sm text-slate-300 leading-relaxed">
                        加入众多合规外贸企业的行列，随时掌握最新进出口税目变化，享受更加精准的商品编码查询与算税体验。
                    </p>

                    <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-3 text-xs text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>支持常用 HS 编码及核算参数永久记录</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>优先获取海关税则调整及申报要素变更通知</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>免费享有全贸易条款完税价格测算工具</span>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-xs text-slate-500">
                    © {new Date().getFullYear()} HSCode Master. 让跨境通关更简单。
                </div>
            </div>

            {/* 右侧：注册表单卡片区 */}
            <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-slate-50/50">
                <div className="w-full max-w-md">
                    <RegisterForm />
                </div>
            </div>

        </div>
    );
}
