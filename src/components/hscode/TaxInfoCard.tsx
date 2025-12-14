import React from 'react';

interface TaxItem {
  label: string;
  value: string | null;
  highlight?: boolean; // 是否高亮显示
  desc?: string; // 额外描述
}

export default function TaxInfoCard({ title, items, icon: Icon }: { title: string, items: TaxItem[], icon?: any }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
      <div className="px-5 py-3 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-gray-500" />}
        <h3 className="font-bold text-gray-900 text-sm">{title}</h3>
      </div>
      <div className="divide-y divide-gray-100">
        {items.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center px-5 py-3 hover:bg-gray-50 transition-colors">
            <span className="text-sm text-gray-600">{item.label}</span>
            <div className="text-right">
              <span className={`font-mono font-medium ${item.highlight ? 'text-blue-600 text-lg' : 'text-gray-900'}`}>
                {item.value || '-'}
              </span>
              {item.desc && <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}