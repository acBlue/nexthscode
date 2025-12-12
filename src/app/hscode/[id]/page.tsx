import React from 'react';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DetailHeader from '@/components/hscode/DetailHeader';
import ChapterInfo from '@/components/hscode/ChapterInfo';
import RegulatoryCard from '@/components/hscode/RegulatoryCard';
import BasicRates from '@/components/hscode/BasicRates';
import AgreementRates from '@/components/hscode/AgreementRates';
import DeclarationElements from '@/components/hscode/DeclarationElements';
// 1. 引入 Service
import { getHsCodeDetail } from '@/services/hscode.service.ts';

interface DetailPageProps {
    params: Promise<{ id: string }>; // Next.js 15: params 也是 Promise
}

export default async function DetailPage({ params }: DetailPageProps) {
    // 2. 获取 URL 参数 (即 cleanCode, 如 8542310000)
    const { id } = await params;

    // 3. 从数据库获取详情 (自动走缓存)
    const data = await getHsCodeDetail(id);

    // 4. 如果没找到，返回 404 页面
    if (!data) {
        return notFound();
    }

    // 5. 数据转换: 将数据库的 JSON 字段转换为组件需要的强类型
    // 注意：这里需要使用 'as any' 或定义更严格的 Prisma Json 类型，为简洁演示使用断言
    const formattedData = {
        hscode: data.code,
        name: data.name,
        nameEn: data.nameEn || '',

        // 章节信息
        category: {
            section: {
                code: data.chapter.section.code,
                name: data.chapter.section.name
            },
            chapter: {
                code: data.chapter.code,
                name: data.chapter.name
            },
        },

        // 基础税率
        basicRates: {
            mfn: data.mfnRate || '-',
            general: data.generalRate || '-',
            vat: data.vatRate || '-',
            drawback: data.exportRate || '-'
        },

        // 复杂 JSON 字段转换 (需要确保数据库里的 JSON 结构和组件 Props 匹配)
        agreements: (data.agreements as any) || [],
        supervision: (data.supervision as any) || [],
        inspection: (data.inspection as any) || [],
        elements: (data.elements as any) || []
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar />

            <DetailHeader
                hscode={formattedData.hscode}
                name={formattedData.name}
                nameEn={formattedData.nameEn}
            />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* 左侧边栏 */}
                    <div className="lg:col-span-3 space-y-6">
                        <ChapterInfo data={formattedData.category} />

                        <RegulatoryCard
                            title="监管证件"
                            type="customs"
                            items={formattedData.supervision}
                        />

                        <RegulatoryCard
                            title="CIQ 检验检疫"
                            type="ciq"
                            items={formattedData.inspection}
                        />
                    </div>

                    {/* 右侧主内容 */}
                    <div className="lg:col-span-9 space-y-6">
                        <BasicRates data={formattedData.basicRates} />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            <AgreementRates items={formattedData.agreements} />
                            <DeclarationElements items={formattedData.elements} />
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}