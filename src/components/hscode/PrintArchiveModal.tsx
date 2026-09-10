"use client";

import React, { useEffect } from 'react';
import { Printer } from 'lucide-react';
import { Button } from "@/components/ui/button";

export interface HsCodeDetailForPrint {
  id?: string;
  code: string;
  cleanCode?: string;
  name: string;
  description?: string | null;
  unit1?: string | null;
  unit2?: string | null;
  regulatoryCode?: string | null;
  quarantineCode?: string | null;
  mfnRate?: string | null;
  generalRate?: string | null;
  tempRate?: string | null;
  vatRate?: string | null;
  consumptionRate?: string | null;
  exportTaxRate?: string | null;
  exportRebateRate?: string | null;
  exportTempRate?: string | null;
  usTariffRate?: string | null;
  chapter?: {
    code: string;
    name: string;
    section?: {
      code: string;
      name: string;
    };
  };
  elements?: Array<{
    seq?: number;
    name: string;
    required?: boolean;
  }> | null;
}

interface PrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: HsCodeDetailForPrint;
}

export default function PrintArchiveModal({ isOpen, onClose, data }: PrintModalProps) {
  // 屏幕弹窗时锁定背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // 监听 ESC 键快速关闭
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // 核心：深色模式打印净化 (双重生命周期防护，杜绝暗色边距污染)
  useEffect(() => {
    let wasDark = false;

    const onBeforePrint = () => {
      const root = document.documentElement;
      if (root.classList.contains('dark')) {
        wasDark = true;
        root.classList.remove('dark');
        root.style.colorScheme = 'light';
        root.style.backgroundColor = '#ffffff';
        document.body.style.backgroundColor = '#ffffff';
      }
    };

    const onAfterPrint = () => {
      if (wasDark) {
        const root = document.documentElement;
        root.classList.add('dark');
        root.style.colorScheme = '';
        root.style.backgroundColor = '';
        document.body.style.backgroundColor = '';
        wasDark = false;
      }
    };

    window.addEventListener('beforeprint', onBeforePrint);
    window.addEventListener('afterprint', onAfterPrint);

    return () => {
      window.removeEventListener('beforeprint', onBeforePrint);
      window.removeEventListener('afterprint', onAfterPrint);
    };
  }, []);

  const handlePrint = () => {
    const root = document.documentElement;
    const isDark = root.classList.contains('dark');
    
    if (isDark) {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
      root.style.backgroundColor = '#ffffff';
      document.body.style.backgroundColor = '#ffffff';
    }

    window.print();

    setTimeout(() => {
      if (isDark && !root.classList.contains('dark')) {
        root.classList.add('dark');
        root.style.colorScheme = '';
        root.style.backgroundColor = '';
        document.body.style.backgroundColor = '';
      }
    }, 1000);
  };

  if (!isOpen) return null;

  const safeElements = Array.isArray(data.elements) ? data.elements : [];
  const r = (val: string | null | undefined) => val || '-';

  const printDate = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric', month: '2-digit', day: '2-digit',
  }).replace(/\//g, '-');

  return (
    <>
      {/* 1. 屏幕背景遮罩 (打印时隐藏) */}
      <div 
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs print:hidden"
        onClick={onClose}
      />

      {/* 2. 屏幕预览操作条 (打印时隐藏) */}
      <div className="fixed top-0 left-0 right-0 z-[60] flex justify-center print:hidden">
        <div className="w-full max-w-3xl flex items-center justify-between py-3 px-4">
          <div className="text-sm font-semibold text-white/90 flex items-center gap-2">
            <Printer className="w-4 h-4 text-blue-400" />
            打印预览
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="text-white/80 hover:text-white hover:bg-white/10 h-8 text-xs cursor-pointer"
            >
              取消 (Esc)
            </Button>
            <Button 
              size="sm" 
              onClick={handlePrint}
              className="bg-blue-600 hover:bg-blue-500 text-white h-8 px-4 text-xs font-semibold gap-1.5 shadow-sm cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              立即打印 / 存为 PDF
            </Button>
          </div>
        </div>
      </div>

      {/* 3. 屏幕端真实比例纸张容器 (打印时隐藏) */}
      <div 
        className="fixed inset-0 z-[55] overflow-y-auto pt-14 pb-10 px-4 flex justify-center print:hidden"
        onClick={onClose}
      >
        <div className="w-full max-w-3xl h-fit" onClick={(e) => e.stopPropagation()}>
          <PrintSheet data={data} printDate={printDate} safeElements={safeElements} r={r} />
        </div>
      </div>

      {/* 4. 打印专用流式单据 (屏幕隐藏，打印时唯一输出) */}
      <div className="hidden print:block" id="print-only-sheet">
        <PrintSheet data={data} printDate={printDate} safeElements={safeElements} r={r} />
      </div>
    </>
  );
}

/* =========================================================================
 * 现代精致美感海关商品单据组件 (纯净美感 · 适合纸质与 PDF 存档)
 * ========================================================================= */
function PrintSheet({ data, printDate, safeElements, r }: {
  data: HsCodeDetailForPrint;
  printDate: string;
  safeElements: Array<{ seq?: number; name: string; required?: boolean }>;
  r: (val: string | null | undefined) => string;
}) {
  return (
    <div className="bg-white text-slate-900 w-full p-8 sm:p-10 print:p-0 rounded-xl print:rounded-none shadow-2xl print:shadow-none border border-slate-200/80 print:border-none font-sans text-[11px] leading-relaxed">
      
      {/* 1. 顶部 Header 报表抬头 */}
      <div className="border-b border-slate-900/80 pb-3 mb-3.5">
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono tracking-wider mb-1.5">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 uppercase tracking-widest">
              HS CODE SPECIFICATION
            </span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-500">进出口海关商品规范与税率表</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <span className="font-medium text-slate-700">2025 现行有效</span>
            <span className="text-slate-300">·</span>
            <span>{printDate}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <div className="text-3xl font-mono font-black text-slate-950 tracking-tight select-all">
              {data.code}
            </div>
            <h1 className="text-base font-bold text-slate-900 mt-0.5 leading-snug">
              {data.name}
            </h1>
          </div>

          {data.chapter && (
            <div className="text-left sm:text-right shrink-0">
              <div className="text-[11px] font-mono font-bold text-slate-800">
                第 {data.chapter.code} 章
              </div>
              <div className="text-[10px] text-slate-500 max-w-[240px] truncate">
                {data.chapter.name}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. 四项核心法定与通关指标 (现代卡片化排布，轻巧透气) */}
      <div className="grid grid-cols-4 gap-2 mb-3.5 print-avoid-break">
        {[
          { label: '第一法定单位', value: data.unit1 || '-' },
          { label: '第二法定单位', value: data.unit2 || '-' },
          { label: '海关监管条件', value: data.regulatoryCode || '无' },
          { label: '检验检疫 (CIQ)', value: data.quarantineCode || '无' },
        ].map((item, idx) => (
          <div 
            key={idx} 
            className="p-2 rounded-lg border border-slate-200/90 bg-slate-50/50 flex flex-col justify-between"
          >
            <span className="text-[9px] font-medium text-slate-400 tracking-wider">
              {item.label}
            </span>
            <span className="text-sm font-mono font-black text-slate-950 mt-0.5 truncate">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* 3. 关税税率矩阵表 (经典高级三线表设计) */}
      <div className="mb-3.5 print-avoid-break">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-bold text-slate-900 tracking-wider uppercase">
            进出口关税及综合税率 · Tariffs & Duties
          </span>
          <span className="text-[9px] font-mono text-slate-400">单位: 百分比 (%)</span>
        </div>

        <table className="w-full text-left border-collapse text-[11px]">
          <thead>
            <tr className="border-t-2 border-b border-slate-900 bg-slate-50/80 text-[10px] text-slate-700 font-bold uppercase tracking-wider">
              <th className="py-1.5 px-2.5 w-[28%]">进口税类</th>
              <th className="py-1.5 px-2.5 w-[22%]">税率</th>
              <th className="py-1.5 px-2.5 w-[28%]">出口及其他税类</th>
              <th className="py-1.5 px-2.5 w-[22%]">税率</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {[
              { l1: '最惠国关税 (MFN)', v1: r(data.mfnRate), bold1: true, l2: '出口退税率 (Rebate)', v2: r(data.exportRebateRate), bold2: true },
              { l1: '普通进口关税', v1: r(data.generalRate), l2: '出口关税 (Export Duty)', v2: r(data.exportTaxRate) },
              { l1: '暂定进口关税', v1: r(data.tempRate), l2: '出口暂定税率', v2: r(data.exportTempRate) },
              { l1: '进口增值税 (VAT)', v1: r(data.vatRate), bold1: true, l2: '对美加征关税参考', v2: r(data.usTariffRate) },
              { l1: '进口消费税', v1: r(data.consumptionRate), l2: '特别贸易协定税率', v2: '见具体协定表', isNote: true },
            ].map((row, i) => (
              <tr key={i} className="hover:bg-slate-50/40">
                <td className="py-1.5 px-2.5 text-slate-600 font-medium">{row.l1}</td>
                <td className={`py-1.5 px-2.5 font-mono ${row.bold1 ? 'font-black text-slate-950 text-[11.5px]' : 'text-slate-800'}`}>
                  {row.v1}
                </td>
                <td className="py-1.5 px-2.5 text-slate-600 font-medium">{row.l2}</td>
                <td className={`py-1.5 px-2.5 font-mono ${row.bold2 ? 'font-black text-slate-950 text-[11.5px]' : row.isNote ? 'text-slate-400 text-[10px] font-sans' : 'text-slate-800'}`}>
                  {row.v2}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="border-b border-slate-200 mt-0" />
      </div>

      {/* 4. 规范申报要素 (现代双栏规格清单，紧凑雅致) */}
      {safeElements.length > 0 && (
        <div className="mb-3.5 print-avoid-break">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold text-slate-900 tracking-wider uppercase">
              规范申报要素 · Declaration Elements
            </span>
            <span className="text-[9px] font-mono text-slate-400">报关必备 {safeElements.length} 项</span>
          </div>

          <div className="border-t-2 border-b border-slate-900/80 py-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0.5">
              {safeElements.map((el, i) => (
                <div 
                  key={i} 
                  className="flex items-center justify-between py-1 px-1 border-b border-slate-100 last:border-b-0 text-[10.5px]"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <span className="w-4.5 h-4 rounded bg-slate-100 text-slate-600 font-mono text-[9px] font-bold flex items-center justify-center shrink-0">
                      {String(el.seq || i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-medium text-slate-800 truncate">
                      {el.name}
                    </span>
                  </div>

                  <div className="shrink-0">
                    {el.required ? (
                      <span className="text-[8.5px] font-bold text-slate-900 bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200">
                        必填
                      </span>
                    ) : (
                      <span className="text-[8.5px] text-slate-400 font-normal">选填</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. 品目附注说明 (如有) */}
      {data.description && (
        <div className="mb-3.5 p-2 rounded-lg bg-slate-50/70 border border-slate-200/80 text-[10px] text-slate-600 leading-relaxed print-avoid-break">
          <span className="font-bold text-slate-800 mr-1">品目附注:</span>
          {data.description}
        </div>
      )}

      {/* 6. 极简页脚 */}
      <div className="pt-2.5 border-t border-slate-200 flex items-center justify-between text-[9px] text-slate-400 font-mono print-avoid-break">
        <span>HSCODE MASTER · 海关进出口税则商品核算单</span>
        <span>通关合规申报以海关审结结果为准</span>
      </div>

    </div>
  );
}
