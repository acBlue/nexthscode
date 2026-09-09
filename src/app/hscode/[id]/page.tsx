import React from 'react';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DetailHeader from '@/components/hscode/DetailHeader';
import TaxInfoCard from '@/components/hscode/TaxInfoCard';
import DeclarationElements from '@/components/hscode/DeclarationElements';
import { getHsCodeDetail } from '@/services/hscode.service';
import { 
  ArrowDownCircle, 
  ArrowUpCircle, 
  Globe, 
  ShieldCheck, 
  Scale, 
  Microscope, 
  Layers,
  FileSpreadsheet,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { id } = await params;
  const data = await getHsCodeDetail(id);

  if (!data) return notFound();

  const formatRate = (val: string | null) => val ? `${val}` : '-';

  return (
    <div className="min-h-screen bg-slate-50/60 font-sans text-slate-900 pb-20 selection:bg-blue-600 selection:text-white">
      <Navbar />

      <DetailHeader
        hscode={data.code}
        name={data.name}
        nameEn={""}
        rates={{
          mfn: data.mfnRate,
          vat: data.vatRate,
          consumption: data.consumptionRate
        }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* 顶部：3 大核心概览卡片 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {/* 1. 计量单位 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex items-center gap-4 relative overflow-hidden group hover:border-blue-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Scale className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">法定计量单位</p>
              <p className="text-xl font-extrabold text-slate-900 font-mono truncate">
                {data.unit1 || '-'}{data.unit2 ? ` / ${data.unit2}` : ''}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">第一法定单位 / 第二单位</p>
            </div>
          </div>

          {/* 2. 海关监管 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex items-center gap-4 relative overflow-hidden group hover:border-amber-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">海关监管条件</p>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold text-slate-900 font-mono">
                  {data.regulatoryCode || '无'}
                </span>
                {data.regulatoryCode && (
                  <Badge className="text-[10px] bg-amber-50 text-amber-800 border-amber-200 font-semibold">
                    需监管证件
                  </Badge>
                )}
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {data.regulatoryCode ? "需按指定代码提供相应进出口许可证件" : "无需提供特殊海关进出口许可证"}
              </p>
            </div>
          </div>

          {/* 3. 检验检疫 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex items-center gap-4 relative overflow-hidden group hover:border-emerald-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Microscope className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">检验检疫类别 (CIQ)</p>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold text-slate-900 font-mono">
                  {data.quarantineCode || '无'}
                </span>
                {data.quarantineCode && (
                  <Badge className="text-[10px] bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold">
                    商检申报
                  </Badge>
                )}
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {data.quarantineCode ? "通关时须实施出入境动植食检或卫检" : "通常无出入境强制商检要求"}
              </p>
            </div>
          </div>
        </div>

        {/* 主体两列排布 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 左侧：税率专区 (占 4 列) */}
          <div className="lg:col-span-4 space-y-6">
            <TaxInfoCard 
              title="进口税率 (Import Tariffs)" 
              icon={ArrowDownCircle}
              items={[
                { label: '最惠国税率 (MFN)', value: formatRate(data.mfnRate), highlight: true },
                { label: '普通税率 (General)', value: formatRate(data.generalRate) },
                { label: '暂定税率 (Temporary)', value: formatRate(data.tempRate), desc: data.tempRate ? '优先于最惠国税率执行' : undefined },
                { label: '增值税率 (VAT)', value: formatRate(data.vatRate) },
                { label: '消费税率 (Consumption)', value: formatRate(data.consumptionRate) },
              ]}
            />

            <TaxInfoCard 
              title="出口税率 (Export Tariffs)" 
              icon={ArrowUpCircle}
              items={[
                { label: '出口退税率 (Export Rebate)', value: formatRate(data.exportRebateRate), highlight: true, desc: '退税越高利好出口企业' },
                { label: '出口关税 (Export Duty)', value: formatRate(data.exportTaxRate) },
              ]}
            />

            <TaxInfoCard 
              title="国际/特定贸易协定税率" 
              icon={Globe}
              items={[
                { label: '对美加征关税参考', value: formatRate(data.usTariffRate), desc: '清单加征关税口径' },
              ]}
            />
          </div>

          {/* 右侧：章节体系 & 申报要素 (占 8 列) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 章节归属卡片 */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Layers className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-800">章节归属层级体系</h3>
              </div>

              <div className="space-y-3">
                {/* Section */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/70 border border-slate-100">
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 shrink-0">
                    第 {data.chapter.section.code} 类
                  </span>
                  <div className="text-xs text-slate-600 leading-relaxed">
                    {data.chapter.section.name}
                  </div>
                </div>

                {/* Chapter */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-50/60 border border-blue-100">
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-blue-600 text-white shrink-0 shadow-2xs">
                    第 {data.chapter.code} 章
                  </span>
                  <div className="text-xs font-medium text-blue-950 leading-relaxed">
                    {data.chapter.name}
                  </div>
                </div>

                {data.description && (
                  <div className="p-3 bg-amber-50/60 rounded-xl text-xs text-amber-800 border border-amber-200/60">
                    <span className="font-bold mr-1">品目附注:</span>
                    {data.description}
                  </div>
                )}
              </div>
            </div>

            {/* 规范申报要素卡片 */}
            <div>
              <DeclarationElements items={data.elements as any[]} />
            </div>

          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
