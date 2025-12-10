import React from 'react';
import { Globe } from 'lucide-react';

interface AgreementItem {
    name: string;
    rate: string;
    country: string;
}

export default function AgreementRates({ items }: { items: AgreementItem[] }) {
    return (
        <section className="bg-white rounded-lg border border-gray-200 shadow-sm h-full flex flex-col">
            <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-600" />
                    <h3 className="font-bold text-gray-900">协定税率 (RCEP/FTA)</h3>
                </div>
                <span className="text-xs text-gray-500">仅供参考</span>
            </div>
            <div className="overflow-y-auto max-h-[340px] p-0 custom-scrollbar flex-grow">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 sticky top-0 z-10 shadow-sm">
                    <tr>
                        <th className="px-5 py-2 font-medium bg-gray-50">协定名称</th>
                        <th className="px-5 py-2 font-medium bg-gray-50">原产国/地区</th>
                        <th className="px-5 py-2 font-medium text-right bg-gray-50">税率</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {items.map((item, index) => (
                        <tr key={index} className="hover:bg-blue-50/30">
                            <td className="px-5 py-3 font-medium text-gray-800">{item.name}</td>
                            <td className="px-5 py-3 text-gray-500 text-xs">{item.country}</td>
                            <td className="px-5 py-3 text-right font-bold text-blue-600">{item.rate}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}