import React from 'react';

interface BasicRatesProps {
    data: {
        mfn: string;
        general: string;
        vat: string;
        drawback: string;
    };
}

export default function BasicRates({ data }: BasicRatesProps) {
    return (
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* 最惠国税率 */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                <div className="text-xs text-gray-500 mb-1">最惠国税率 (MFN)</div>
                <div className="text-2xl font-bold text-blue-600">{data.mfn}</div>
                <div className="text-[10px] text-gray-400 mt-2">适用于 WTO 成员</div>
            </div>

            {/* 普通税率 */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gray-300"></div>
                <div className="text-xs text-gray-500 mb-1">普通税率</div>
                <div className="text-2xl font-bold text-gray-700">{data.general}</div>
            </div>

            {/* 增值税 */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                <div className="text-xs text-gray-500 mb-1">增值税 (VAT)</div>
                <div className="text-2xl font-bold text-green-600">{data.vat}</div>
            </div>

            {/* 出口退税 */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-orange-400"></div>
                <div className="text-xs text-gray-500 mb-1">出口退税</div>
                <div className="text-2xl font-bold text-orange-500">{data.drawback}</div>
            </div>
        </section>
    );
}