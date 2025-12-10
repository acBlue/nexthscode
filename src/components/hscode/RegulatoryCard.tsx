import React from 'react';
import { ShieldCheck, Stethoscope } from 'lucide-react';

interface CodeItem {
    code: string;
    name: string;
}

interface RegulatoryCardProps {
    title: string;
    type: 'customs' | 'ciq'; // 区分类型来改变颜色
    items: CodeItem[];
}

export default function RegulatoryCard({ title, type, items }: RegulatoryCardProps) {
    // 根据类型定义样式配置
    const styles = type === 'customs'
        ? {
            bgHeader: 'bg-orange-50/50',
            borderHeader: 'border-orange-100',
            iconColor: 'text-orange-800',
            badgeBg: 'bg-orange-100',
            badgeText: 'text-orange-700',
            badgeBorder: 'border-orange-200',
            Icon: ShieldCheck
        }
        : {
            bgHeader: 'bg-teal-50/50', // CIQ 用蓝绿色/青色区分
            borderHeader: 'border-teal-100',
            iconColor: 'text-teal-800',
            badgeBg: 'bg-teal-100',
            badgeText: 'text-teal-700',
            badgeBorder: 'border-teal-200',
            Icon: Stethoscope // 听诊器图标代表检验检疫
        };

    const { Icon } = styles;

    return (
        <section className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className={`${styles.bgHeader} px-4 py-3 border-b ${styles.borderHeader} flex items-center justify-between`}>
                <div className={`flex items-center gap-2 ${styles.iconColor}`}>
                    <Icon className="w-4 h-4" />
                    <h3 className="font-bold text-sm">{title}</h3>
                </div>
            </div>
            <div className="p-2">
                {items.length > 0 ? items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded transition-colors">
             <span className={`flex-shrink-0 w-8 h-6 rounded ${styles.badgeBg} ${styles.badgeText} text-xs font-bold flex items-center justify-center border ${styles.badgeBorder}`}>
               {item.code}
             </span>
                        <span className="text-xs font-medium text-gray-700 leading-tight">{item.name}</span>
                    </div>
                )) : (
                    <div className="p-2 text-xs text-gray-400">无特殊要求</div>
                )}
            </div>
        </section>
    );
}