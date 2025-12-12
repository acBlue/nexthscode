// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50 px-4">
            <div className="text-center">
                {/* 这里的 SVG 可以替换成插图 */}
                <h1 className="text-9xl font-black text-gray-200">404</h1>

                <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    页面未找到
                </p>

                <p className="mt-4 text-gray-500">
                    抱歉，我们找不到您要查找的页面。它可能已被移动或删除。
                </p>

                <div className="mt-6">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        返回首页
                    </Link>

                    {/* 如果是 HS Code 网站，这里可以加一个搜索框 */}
                    <Link
                        href="/search"
                        className="ml-4 inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        去搜索
                    </Link>
                </div>
            </div>
        </div>
    )
}