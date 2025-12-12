import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DetailSkeleton from '@/components/hscode/DetailSkeleton';

export default function Loading() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
            <Navbar />

            {/* 挂载骨架屏组件 */}
            <DetailSkeleton />

            {/* 填充剩余空间，确保 Footer 沉底 */}
            <div className="flex-grow"></div>

            <Footer />
        </div>
    );
}