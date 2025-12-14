import React from 'react';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DetailHeader from '@/components/hscode/DetailHeader';
import TaxInfoCard from '@/components/hscode/TaxInfoCard'; // 新组件
import DeclarationElements from '@/components/hscode/DeclarationElements';
import { getHsCodeDetail } from '@/services/hscode.service';
import { ArrowDownCircle, ArrowUpCircle, Globe, Shield, Scale } from 'lucide-react';

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { id } = await params;
  const data = await getHsCodeDetail(id);

  if (!data) return notFound();

  // 数据格式化 helper
  const formatRate = (val: string | null) => val ? `${val}` : '-'; // 如果你的数据里已经带%, 就不加了

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      <Navbar />

      <DetailHeader 
        hscode={data.code} 
        name={data.name} 
        nameEn={""} // 新数据可能没有英文名，留空或显示 -
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* 顶部：核心概览条 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
           {/* 1. 计量单位 */}
           <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">法定计量单位</div>
                <div className="font-bold text-gray-900">
                  {data.unit1 || '-'}{data.unit2 ? ` / ${data.unit2}` : ''}
                </div>
              </div>
           </div>

           {/* 2. 监管条件 */}
           <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">海关监管条件</div>
                <div className="font-mono font-bold text-gray-900">{data.regulatoryCode || '无'}</div>
              </div>
           </div>

           {/* 3. 检验检疫 */}
           <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-green-50 rounded-lg text-green-600">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">检验检疫类别</div>
                <div className="font-mono font-bold text-gray-900">{data.quarantineCode || '无'}</div>
              </div>
           </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* 左侧：税率专区 (占 4 列) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* 进口税率 */}
            <TaxInfoCard 
              title="进口税率 (Import)" 
              icon={ArrowDownCircle}
              items={[
                { label: '最惠国税率 (MFN)', value: formatRate(data.mfnRate), highlight: true },
                { label: '普通税率', value: formatRate(data.generalRate) },
                { label: '暂定税率', value: formatRate(data.tempRate), desc: data.tempRate ? '当前有效' : undefined },
                { label: '增值税 (VAT)', value: formatRate(data.vatRate) },
                { label: '消费税', value: formatRate(data.consumptionRate) },
              ]}
            />

            {/* 出口税率 */}
            <TaxInfoCard 
              title="出口税率 (Export)" 
              icon={ArrowUpCircle}
              items={[
                { label: '出口退税率', value: formatRate(data.exportRebateRate), highlight: true, desc: '退税越高越好' },
                { label: '出口关税', value: formatRate(data.exportTaxRate) },
                { label: '出口暂定税率', value: formatRate(data.exportTempRate) },
              ]}
            />

             {/* 国外税率 */}
             <TaxInfoCard 
              title="国外税率参考" 
              icon={Globe}
              items={[
                { label: '对美加征关税', value: formatRate(data.usTariffRate), desc: '仅供参考，请以最新政策为准' },
              ]}
            />
          </div>

          {/* 右侧：申报要素 & 章节信息 (占 8 列) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 章节归属 */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">章节归属</h3>
              <div className="space-y-3">
                 <div className="flex gap-3 text-sm">
                    <span className="font-mono text-gray-400">{data.chapter.section.code}</span>
                    <span className="text-gray-700">{data.chapter.section.name}</span>
                 </div>
                 <div className="flex gap-3 text-sm pl-4 border-l-2 border-gray-100">
                    <span className="font-mono text-blue-600 font-bold">{data.chapter.code}</span>
                    <span className="text-gray-900 font-medium">{data.chapter.name}</span>
                 </div>
                 {data.description && (
                   <div className="mt-4 p-3 bg-gray-50 rounded text-sm text-gray-600 italic">
                     备注: {data.description}
                   </div>
                 )}
              </div>
            </div>

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