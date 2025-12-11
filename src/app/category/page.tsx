import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoryBrowser from '@/components/category/CategoryBrowser';
import { getAllSectionsWithChapters } from '@/services/category.service';

// 1. 修改接口定义：searchParams 必须被定义为 Promise
interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CategoryPage({ searchParams }: PageProps) {
    // 2. 这里的 searchParams 是一个 Promise，必须先 await
    // 注意：不要直接解构 ({ searchParams }) 里的属性，而是先获取整个 params 对象
    const resolvedSearchParams = await searchParams;

    // 1. 获取全量数据 (这部分保持不变)
    const sections = await getAllSectionsWithChapters();

    // 2. 解析 URL 参数中的 section ID
    // 现在从 resolvedSearchParams 中读取 section
    const rawSection = resolvedSearchParams.section;
    const initialSectionId = typeof rawSection === 'string' ? rawSection : undefined;

    return (
        <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
            <Navbar />

            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold text-gray-900">全部分类浏览</h1>
                    <p className="text-gray-500 mt-2">
                        依照《商品名称及编码协调制度》(HS Code) 划分的 21 大类、98 个章节。
                    </p>
                </div>
            </div>

            <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                {/* 3. 将 initialSectionId 传递给组件 */}
                <CategoryBrowser sections={sections} initialSectionId={initialSectionId} />
            </main>

            <Footer />
        </div>
    );
}