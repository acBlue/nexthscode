import React from 'react';
import Link from 'next/link';
import { 
  FileSearch, 
  Calculator, 
  ClipboardCheck, 
  ShieldAlert, 
  ArrowRight,
  TrendingUp,
  Database,
  Building2,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Stats() {
  const statsList = [
    {
      value: "10,000+",
      label: "海关商品细分税目",
      desc: "涵盖 8 位与 10 位法定编码全量数据",
      icon: Database,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      value: "98 章",
      label: "WCO 标准分类体系",
      desc: "从农副产品到高新精密仪器完整覆盖",
      icon: Building2,
      color: "text-indigo-600",
      bg: "bg-indigo-50"
    },
    {
      value: "4 种",
      label: "Incoterms 贸易条款推导",
      desc: "支持 CIF / FOB / CFR / EXW 完税价格倒推",
      icon: Calculator,
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    {
      value: "2025",
      label: "最新执行关税口径",
      desc: "及时对标暂定税率、协定税率与监管证件",
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50"
    }
  ];

  const features = [
    {
      title: "智能编码精准匹配",
      desc: "支持 HS 编码前缀模糊查询、中文品名同义词匹配及历史常用关键字关联，毫秒级返回结果。",
      icon: FileSearch,
      link: "/search",
      badge: "秒级响应"
    },
    {
      title: "多条款进口税费计算器",
      desc: "无需繁琐公式，输入货值、运费与保险费，系统自动依据关税、消费税与增值税复合算法核算落地成本。",
      icon: Calculator,
      link: "/tools/tax",
      badge: "自动化"
    },
    {
      title: "规范申报要素清单",
      desc: "清晰标注海关审单必填与选填要素，支持一键规范化复制，大幅降低通关报关单被海关驳回风险。",
      icon: ClipboardCheck,
      link: "/search",
      badge: "合规保障"
    },
    {
      title: "检验检疫与监管证件",
      desc: "实时展示商品进出口监管代码 (A/B/4/7等) 及动植物卫生检疫标识，提前做好合规筹备。",
      icon: ShieldAlert,
      link: "/category",
      badge: "全流程把控"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* 数据背书指标 */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">权威数据背书</h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              数万外贸人的合规通关首选助手
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsList.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={i} 
                  className="p-6 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900 group-hover:text-blue-600 transition-colors">
                      {stat.value}
                    </span>
                    <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 mb-1">{stat.label}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{stat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 核心产品功能板块 */}
        <div className="pt-8 border-t border-slate-100">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2 block">核心功能服务</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              打通海关编码到外贸清关的每一个关键环节
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div 
                  key={idx} 
                  className="group relative bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xl hover:shadow-slate-200/50 hover:border-blue-300 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white transition-colors duration-300 flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
                        {feat.badge}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                      {feat.title}
                    </h4>

                    <p className="text-xs text-slate-500 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>

                  <div className="pt-5 mt-4 border-t border-slate-100">
                    <Link 
                      href={feat.link} 
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      立即体验
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 底部行动召唤 (CTA) */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-8 sm:p-12 text-white shadow-xl shadow-blue-600/15 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(circle_at_100%_50%,rgba(255,255,255,0.15),transparent_70%)] pointer-events-none" />
          
          <div className="space-y-2 text-center md:text-left z-10">
            <h4 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              开始查询您的第一笔海关税率与申报要素
            </h4>
            <p className="text-blue-100 text-sm max-w-xl">
              无需繁琐安装，打开网页即刻检索，所有最新申报规范与税率信息随时掌握。
            </p>
          </div>

          <div className="flex items-center gap-3 z-10 shrink-0">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-bold rounded-xl shadow-md" asChild>
              <Link href="/search">
                立即搜索编码
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-xl" asChild>
              <Link href="/tools/tax">
                试算税费
              </Link>
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}
