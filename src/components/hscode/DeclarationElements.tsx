"use client";

import React from 'react';
import { FileText } from 'lucide-react';

interface ElementItem {
    id: number;
    name: string;
    required: boolean;
    example: string;
}

// 给 items 一个默认值 []，防止父组件传 undefined
export default function DeclarationElements({ items = [] }: { items: any }) {

    // 🔥 核心修复：强制检查 items 是否为数组
    // 如果 items 不是数组 (比如是 null, 或者数据库存的是个对象)，就强制转为空数组
    const safeItems: ElementItem[] = Array.isArray(items) ? items : [];

    return (
        <section className="bg-white rounded-lg border border-gray-200 shadow-sm h-full flex flex-col">
            <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-600" />
                    <h3 className="font-bold text-gray-900">申报要素</h3>
                </div>
                <div className="flex gap-2 text-xs">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> 必填</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-300"></span> 选填</span>
                </div>
            </div>
            <div className="overflow-y-auto max-h-[340px] flex-grow custom-scrollbar">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 border-b border-gray-100 sticky top-0 z-10">
                    <tr>
                        <th className="px-4 py-2 w-12 text-center bg-gray-50">#</th>
                        <th className="px-2 py-2 w-20 bg-gray-50">状态</th>
                        <th className="px-2 py-2 bg-gray-50">要素名称</th>
                        <th className="px-2 py-2 text-gray-400 font-normal bg-gray-50">填写示例</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {/* 如果没有数据，显示空状态 */}
                    {safeItems.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="px-4 py-8 text-center text-gray-400">
                                暂无申报要素信息
                            </td>
                        </tr>
                    ) : (
                        safeItems.map((el) => (
                            <tr key={el.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2.5 text-center text-gray-400 text-xs">{el.id}</td>
                                <td className="px-2 py-2.5">
                                    {el.required ? (
                                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-red-50 text-red-600 border border-red-100">
                            必填
                            </span>
                                    ) : (
                                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-500 border border-gray-200">
                            选填
                            </span>
                                    )}
                                </td>
                                <td className="px-2 py-2.5 font-medium text-gray-800">{el.name}</td>
                                <td className="px-2 py-2.5 text-gray-500 text-xs truncate max-w-[120px]">{el.example}</td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}