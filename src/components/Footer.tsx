import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Search, 
  Layers, 
  Calculator, 
  FileCheck2, 
  Globe2, 
  Headphones, 
  ExternalLink,
  Sparkles
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900 selection:bg-blue-600 selection:text-white">
      {/* 顶部价值亮点条 */}
      <div className="border-b border-slate-900 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">海关官方标准库</p>
              <p className="text-xs text-slate-400">实时对标最新版商品编码制度</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">全贸易条款测算</p>
              <p className="text-xs text-slate-400">CIF / FOB / CFR / EXW 完税精准推导</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">申报要素清单</p>
              <p className="text-xs text-slate-400">标准规格规范，避免申报驳回</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">全球多国协同</p>
              <p className="text-xs text-slate-400">覆盖主流外贸进出口关键税种与监管</p>
            </div>
          </div>
        </div>
      </div>

      {/* 主栏目区 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
        {/* 品牌信息 */}
        <div className="md:col-span-2 space-y-4">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight">
              HSCode Master
            </span>
          </Link>

          <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
            专为外贸企业、报关行、跨境电商与国际货运代理打造的智能海关编码与关税合规查询引擎，助力高效通关、合规降本。
          </p>

          <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>编码数据已同步至 2025 年最新通关口径</span>
          </div>
        </div>

        {/* 快速导航 */}
        <div>
          <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">核心工具</h4>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li>
              <Link href="/search" className="hover:text-white transition-colors flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5" />
                编码智能搜索
              </Link>
            </li>
            <li>
              <Link href="/category" className="hover:text-white transition-colors flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                21大类海关分类大全
              </Link>
            </li>
            <li>
              <Link href="/tools/tax" className="hover:text-white transition-colors flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5" />
                进口税费智能计算器
              </Link>
            </li>
            <li>
              <Link href="/tools/tax?cif=10000&duty=0&vat=13" className="hover:text-white transition-colors text-xs text-blue-400">
                → 常用税费核算模板
              </Link>
            </li>
          </ul>
        </div>

        {/* 常用分类直达 */}
        <div>
          <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">热门商品大类</h4>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li>
              <Link href="/category?section=XVI" className="hover:text-white transition-colors">
                第十六类：机电仪器设备
              </Link>
            </li>
            <li>
              <Link href="/category?section=VI" className="hover:text-white transition-colors">
                第六类：化学工业及制品
              </Link>
            </li>
            <li>
              <Link href="/category?section=XI" className="hover:text-white transition-colors">
                第十一类：纺织原料及制品
              </Link>
            </li>
            <li>
              <Link href="/category?section=XVII" className="hover:text-white transition-colors">
                第十七类：车辆及运输设备
              </Link>
            </li>
          </ul>
        </div>

        {/* 支持与声明 */}
        <div>
          <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">服务与合规</h4>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li>
              <span className="text-slate-400">数据来源：海关总署商品库</span>
            </li>
            <li>
              <span className="text-slate-400">税费推导：合规算法模型</span>
            </li>
            <li>
              <Link href="/profile" className="hover:text-white transition-colors">
                个人中心 & 账户安全
              </Link>
            </li>
            <li>
              <span className="text-xs text-slate-400 block pt-1">
                * 试算结果供决策参考，请以海关审单核定为准。
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* 底部版权 */}
      <div className="border-t border-slate-900 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} HSCode Master. 保留所有权利。</p>
          <div className="flex items-center gap-6">
            <span>外贸合规智库</span>
            <span>进出口关税综合查询系统</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
