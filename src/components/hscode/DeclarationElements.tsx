"use client";
import React from 'react';
import { FileText, CheckCircle2, HelpCircle } from 'lucide-react';

export default function DeclarationElements({ items = [] }: { items: any[] }) {
  const safeItems = Array.isArray(items) ? items : [];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-full">
       <div className="px-5 py-4 border-b border-gray-200 bg-blue-50/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-gray-900">申报要素</h3>
          </div>
          <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded border border-gray-200">
            共 {safeItems.length} 项
          </span>
       </div>
       
       <div className="p-0">
         {safeItems.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm">暂无申报要素</div>
         ) : (
            <table className="w-full text-sm text-left">
               <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
                 <tr>
                   <th className="px-4 py-3 w-12 text-center">#</th>
                   <th className="px-2 py-3">要素名称</th>
                   <th className="px-2 py-3 w-20 text-right">必填</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                 {safeItems.map((el, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                        <td className="px-4 py-3 text-center text-gray-400 font-mono text-xs">{el.seq || idx + 1}</td>
                        <td className="px-2 py-3 font-medium text-gray-800">{el.name}</td>
                        <td className="px-2 py-3 text-right">
                           {el.required ? 
                             <CheckCircle2 className="w-4 h-4 text-green-500 inline-block" /> : 
                             <span className="text-gray-300">-</span>
                           }
                        </td>
                    </tr>
                 ))}
               </tbody>
            </table>
         )}
       </div>
    </div>
  );
}