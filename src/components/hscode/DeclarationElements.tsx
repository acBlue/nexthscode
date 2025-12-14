"use client";

import React, { useState } from 'react';
import { FileText, Copy, Check, Info, ClipboardList } from 'lucide-react';

interface ElementItem {
  seq: number;
  name: string;
  required: boolean;
}

export default function DeclarationElements({ items = [] }: { items: any[] }) {
  const [copied, setCopied] = useState(false);
  const safeItems: ElementItem[] = Array.isArray(items) ? items : [];

  // 生成申报要素拼接串 (报关员常用格式：序号:内容|序号:内容)
  // 这里只拼接名称作为示例，实际场景可能需要拼接空值占位
  const handleCopyString = () => {
    // 生成类似: "1:品牌类型; 2:出口享惠情况; ..." 的格式
    const text = safeItems.map(i => `${i.seq}:${i.name}`).join('; ');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-full flex flex-col">
      
      {/* 1. 头部：标题 + 操作 */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-slate-50/50 rounded-t-xl">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 text-blue-600 rounded-md">
            <ClipboardList className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-gray-900">申报要素</h3>
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full ml-1">
            {safeItems.length}项
          </span>
        </div>

        {/* 复制按钮 */}
        {safeItems.length > 0 && (
          <button 
            onClick={handleCopyString}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-blue-600 hover:bg-white px-2 py-1.5 rounded-md border border-transparent hover:border-gray-200 transition-all active:scale-95"
            title="复制要素名称列表"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-600" />
                <span className="text-green-600">已复制</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>复制列表</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* 2. 内容区域：网格布局 */}
      <div className="p-5 flex-grow">
        {safeItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-gray-400 text-sm border-2 border-dashed border-gray-100 rounded-lg">
            <Info className="w-8 h-8 mb-2 opacity-20" />
            暂无申报要素信息
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {safeItems.map((el, idx) => (
              <div 
                key={idx} 
                className={`
                  relative flex items-center p-3 rounded-lg border transition-all duration-200 group
                  ${el.required 
                    ? 'bg-blue-50/30 border-blue-100 hover:border-blue-300 hover:shadow-sm' 
                    : 'bg-gray-50/50 border-gray-100 hover:border-gray-300'
                  }
                `}
              >
                {/* 序号 (左侧大数字) */}
                <div className={`
                  flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-sm font-mono font-bold mr-3
                  ${el.required ? 'bg-white text-blue-600 shadow-sm' : 'bg-gray-200/50 text-gray-500'}
                `}>
                  {el.seq || idx + 1}
                </div>

                {/* 名称 */}
                <div className="flex-grow min-w-0">
                  <div className="text-sm font-bold text-gray-800 group-hover:text-blue-700 truncate" title={el.name}>
                    {el.name}
                  </div>
                  {/* 这里如果有示例值，可以显示在下方 */}
                  {/* <div className="text-xs text-gray-400 truncate">示例...</div> */}
                </div>

                {/* 必填标记 (右侧) */}
                {el.required ? (
                  <div className="flex-shrink-0 ml-2">
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded border border-blue-200">
                      必填
                    </span>
                  </div>
                ) : (
                   <div className="flex-shrink-0 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                      选填
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* 底部提示 (填充空间) */}
      <div className="px-5 py-3 bg-gray-50 rounded-b-xl border-t border-gray-100">
         <p className="text-xs text-gray-400 flex items-center gap-1.5">
           <Info className="w-3.5 h-3.5" />
           请按照海关规范申报，注意要素顺序
         </p>
      </div>
    </div>
  );
}