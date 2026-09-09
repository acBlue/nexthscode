import React, { Suspense } from "react";
import Link from "next/link";
import { NavbarUser, NavbarUserSkeleton } from "@/components/auth/NavbarUser";
import { 
  Search, 
  Layers, 
  Calculator, 
  Compass, 
  ShieldCheck,
} from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-white/85 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo 区域 */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 group-hover:shadow-blue-500/30 transition-all duration-200">
                <ShieldCheck className="w-5 h-5 text-white" />
                <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white"></span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-blue-950 to-blue-700 bg-clip-text text-transparent group-hover:to-blue-600 transition-colors">
                  HSCode Master
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wide -mt-1 hidden sm:block">
                  智能海关编码 & 关税核算
                </span>
              </div>
            </Link>

            {/* 桌面端导航链接 */}
            <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600">
              <Link 
                href="/" 
                className="px-3 py-1.5 rounded-lg hover:text-blue-600 hover:bg-slate-50 transition-all flex items-center gap-1.5"
              >
                首页
              </Link>
              <Link 
                href="/search" 
                className="px-3 py-1.5 rounded-lg hover:text-blue-600 hover:bg-slate-50 transition-all flex items-center gap-1.5"
              >
                <Compass className="w-4 h-4 text-slate-400" />
                编码查询
              </Link>
              <Link 
                href="/category" 
                className="px-3 py-1.5 rounded-lg hover:text-blue-600 hover:bg-slate-50 transition-all flex items-center gap-1.5"
              >
                <Layers className="w-4 h-4 text-slate-400" />
                分类大全
              </Link>
              <Link 
                href="/tools/tax" 
                className="px-3 py-1.5 rounded-lg hover:text-blue-600 hover:bg-slate-50 transition-all flex items-center gap-1.5 relative group"
              >
                <Calculator className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                税费计算器
                <span className="inline-flex items-center px-1.5 py-0.2 text-[9px] font-semibold text-blue-700 bg-blue-50 border border-blue-200/60 rounded-full">
                  PRO
                </span>
              </Link>
            </nav>
          </div>

          {/* 右侧功能区 */}
          <div className="flex items-center gap-3">
            
            {/* 快速搜索入口 */}
            <Link 
              href="/search" 
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 bg-slate-100/80 hover:bg-slate-100 hover:text-blue-600 rounded-lg border border-slate-200/60 transition-all group"
            >
              <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
              <span className="hidden sm:inline">快速查编码...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-200 rounded text-slate-400 shadow-2xs">
                ⌘K
              </kbd>
            </Link>

            <div className="h-4 w-px bg-slate-200 hidden sm:block" />

            {/* 用户状态异步流式挂载，不阻塞整体页面渲染 */}
            <Suspense fallback={<NavbarUserSkeleton />}>
              <NavbarUser />
            </Suspense>
            
          </div>
        </div>
      </div>
    </header>
  );
}
