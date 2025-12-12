// app/error.tsx
'use client' // 必须标记为客户端组件

import { useEffect } from 'react'

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // 可以在这里将错误日志发送给 Sentry 或其他监控服务
        console.error('Page Error:', error)
    }, [error])

    return (
        <div className="flex h-[80vh] w-full flex-col items-center justify-center px-4">
            <div className="rounded-lg bg-red-50 p-8 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                </div>

                <h2 className="mb-2 text-lg font-semibold text-gray-900">
                    出了一点问题
                </h2>

                <p className="mb-6 text-sm text-gray-600">
                    服务器遇到了一些干扰。请尝试刷新页面。
                </p>

                <button
                    onClick={
                        // 尝试恢复：这将尝试重新渲染该 Segment
                        () => reset()
                    }
                    className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                    重试
                </button>
            </div>
        </div>
    )
}