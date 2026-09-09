'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Page Error:', error);
    }, [error]);

    return (
        <div className="min-h-[80vh] w-full flex flex-col items-center justify-center px-4 py-12">
            <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/90 p-8 shadow-xl shadow-slate-200/50 text-center space-y-6">
                
                <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto shadow-2xs">
                    <AlertCircle className="w-7 h-7" />
                </div>

                <div className="space-y-2">
                    <h2 className="text-xl font-bold text-slate-900">
                        系统处理遇到了异常
                    </h2>
                    <p className="text-xs text-slate-500 leading-relaxed">
                        数据请求过程中断或服务端响应超时。您可以尝试重新加载或返回首页继续查询。
                    </p>
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                    <Button
                        onClick={() => reset()}
                        className="rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs h-9 shadow-xs"
                    >
                        <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                        重新尝试
                    </Button>
                    <Button
                        variant="outline"
                        className="rounded-xl border-slate-200 text-xs h-9"
                        asChild
                    >
                        <Link href="/">
                            <Home className="w-3.5 h-3.5 mr-1.5" />
                            回到首页
                        </Link>
                    </Button>
                </div>

            </div>
        </div>
    );
}
