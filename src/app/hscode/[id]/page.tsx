import React from 'react';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DetailHeader from '@/components/hscode/DetailHeader';
import TaxInfoCard from '@/components/hscode/TaxInfoCard';
import DeclarationElements from '@/components/hscode/DeclarationElements';
import { getHsCodeDetail } from '@/services/hscode.service';
import { ArrowDownCircle, ArrowUpCircle, Globe, Shield, Scale, Microscope, Layers } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
    <div className="min-h-screen bg-slate-50/50 font-sans text-slate-900 pb-20">
      <Navbar />

      <DetailHeader 
        hscode={data.code} 
        name={data.name} 
        nameEn={""}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* 顶部：核心概览卡片组 - 使用 Shadcn Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
           {/* 1. 计量单位 */}
           <Card className="shadow-sm border-l-4 border-l-blue-500">
              <CardContent className="p-5 flex items-center gap-4">
                  <div className="p-3 bg-blue-50 rounded-full text-blue-600">
                     <Scale className="w-5 h-5" />
                  </div>
                  <div>
                     <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">法定单位</p>
                     <p className="text-lg font-bold text-foreground font-mono">
                        {data.unit1 || '-'}{data.unit2 ? ` / ${data.unit2}` : ''}
                     </p>
                  </div>
              </CardContent>
           </Card>

           {/* 2. 监管条件 */}
           <Card className="shadow-sm border-l-4 border-l-amber-500">
              <CardContent className="p-5 flex items-center gap-4">
                  <div className="p-3 bg-amber-50 rounded-full text-amber-600">
                     <Shield className="w-5 h-5" />
                  </div>
                  <div>
                     <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">海关监管</p>
                     <div className="flex items-center gap-2">
                         <span className="text-lg font-bold text-foreground font-mono">{data.regulatoryCode || '无'}</span>
                         {data.regulatoryCode && <Badge variant="outline" className="text-xs border-amber-200 text-amber-700 bg-amber-50">监管证件</Badge>}
                     </div>
                  </div>
              </CardContent>
           </Card>

           {/* 3. 检验检疫 */}
           <Card className="shadow-sm border-l-4 border-l-emerald-500">
              <CardContent className="p-5 flex items-center gap-4">
                  <div className="p-3 bg-emerald-50 rounded-full text-emerald-600">
                     <Microscope className="w-5 h-5" />
                  </div>
                  <div>
                     <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">检验检疫</p>
                     <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-foreground font-mono">{data.quarantineCode || '无'}</span>
                        {data.quarantineCode && <Badge variant="outline" className="text-xs border-emerald-200 text-emerald-700 bg-emerald-50">CIQ</Badge>}
                     </div>
                  </div>
              </CardContent>
           </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* 左侧：税率专区 (占 4 列) */}
          <div className="lg:col-span-4 space-y-6">
            <TaxInfoCard 
              title="进口税率 (Import)" 
              icon={ArrowDownCircle}
              items={[
                { label: '最惠国税率 (MFN)', value: formatRate(data.mfnRate), highlight: true },
                { label: '普通税率', value: formatRate(data.generalRate) },
                { label: '暂定税率', value: formatRate(data.tempRate), desc: data.tempRate ? '优先执行' : undefined },
                { label: '增值税 (VAT)', value: formatRate(data.vatRate) },
                { label: '消费税', value: formatRate(data.consumptionRate) },
              ]}
            />

            <TaxInfoCard 
              title="出口税率 (Export)" 
              icon={ArrowUpCircle}
              items={[
                { label: '出口退税率', value: formatRate(data.exportRebateRate), highlight: true, desc: '退税越高利润越高' },
                { label: '出口关税', value: formatRate(data.exportTaxRate) },
              ]}
            />

             <TaxInfoCard 
              title="国外税率参考" 
              icon={Globe}
              items={[
                { label: '对美加征关税', value: formatRate(data.usTariffRate), desc: '301条款' },
              ]}
            />
          </div>

          {/* 右侧：申报要素 & 章节信息 (占 8 列) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 章节归属 - 重新设计 */}
            <Card className="shadow-sm">
                <CardHeader className="pb-3 border-b bg-muted/20">
                    <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-muted-foreground" />
                        <CardTitle className="text-sm font-bold">章节归属体系</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="pt-4">
                    <div className="space-y-4">
                         {/* Section */}
                         <div className="flex gap-4 group">
                             <div className="flex flex-col items-center">
                                 <div className="w-2 h-2 rounded-full bg-gray-300 group-hover:bg-blue-400 transition-colors"></div>
                                 <div className="w-0.5 h-full bg-gray-100 my-1"></div>
                             </div>
                             <div>
                                 <span className="text-xs font-mono text-muted-foreground">SECTION {data.chapter.section.code}</span>
                                 <p className="text-sm text-foreground">{data.chapter.section.name}</p>
                             </div>
                         </div>
                         {/* Chapter */}
                         <div className="flex gap-4 group">
                             <div className="flex flex-col items-center">
                                 <div className="w-2 h-2 rounded-full bg-blue-500 ring-4 ring-blue-50"></div>
                             </div>
                             <div>
                                 <span className="text-xs font-mono font-bold text-blue-600">CHAPTER {data.chapter.code}</span>
                                 <p className="text-sm font-medium text-foreground">{data.chapter.name}</p>
                             </div>
                         </div>

                         {data.description && (
                           <div className="ml-6 mt-2 p-3 bg-muted/50 rounded-md text-xs text-muted-foreground border border-border">
                             <span className="font-bold mr-1">备注:</span> {data.description}
                           </div>
                         )}
                    </div>
                </CardContent>
            </Card>

            {/* 申报要素 (占据主要位置) */}
            <div className="min-h-[400px]">
               <DeclarationElements items={data.elements as any[]} />
            </div>

          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}