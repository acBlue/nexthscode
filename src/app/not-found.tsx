import Link from 'next/link';
import { ShieldAlert, Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50/70 dark:bg-[#080c14] px-4 relative overflow-hidden selection:bg-blue-600 selection:text-white transition-colors duration-200">
            <div className="absolute inset-0 bg-grid-slate opacity-40 dark:opacity-20 pointer-events-none" />
            <div className="w-96 h-96 bg-blue-500/10 rounded-full blur-3xl absolute pointer-events-none" />

            <div className="relative z-10 max-w-md w-full bg-white dark:bg-[#0f172a] rounded-3xl border border-slate-200/90 dark:border-white/[0.08] p-8 sm:p-10 shadow-xl shadow-slate-200/50 dark:shadow-black/50 text-center space-y-6">
                
                <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto shadow-xs">
                    <ShieldAlert className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 tracking-widest uppercase">
                        Error 404
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        找不到该页面或税目
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        抱歉，您访问的页面地址不存在，或者目标商品编码已调整。请检查输入的税号是否正确。
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <Button className="w-full sm:w-auto rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs cursor-pointer" asChild>
                        <Link href="/">
                            <Home className="w-4 h-4 mr-1.5" />
                            返回首页
                        </Link>
                    </Button>
                    <Button variant="outline" className="w-full sm:w-auto rounded-xl border-slate-200 dark:border-white/[0.1] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer" asChild>
                        <Link href="/search">
                            <Search className="w-4 h-4 mr-1.5" />
                            去查编码
                        </Link>
                    </Button>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-white/[0.06] text-[11px] text-slate-400 dark:text-slate-400">
                    HSCode Master 海关编码智能检索平台
                </div>
            </div>
        </div>
    );
}
