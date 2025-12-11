"use client";

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
    total: number;      // 总条数
    pageSize: number;   // 每页显示多少
    currentPage: number;// 当前页码
}

export default function Pagination({ total, pageSize, currentPage }: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const totalPages = Math.ceil(total / pageSize);

    // 如果只有1页或没数据，不显示分页
    if (totalPages <= 1) return null;

    // 处理页码跳转
    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;

        // 保留现有的查询参数 (q, chapter 等)，只更新 page
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());

        // 跳转
        router.push(`/search?${params.toString()}`);
    };

    // 简单的页码生成逻辑 (显示当前页的前后页)
    const renderPageNumbers = () => {
        const pages = [];
        const maxVisible = 5; // 最多显示几个数字按钮

        let start = Math.max(1, currentPage - 2);
        let end = Math.min(totalPages, start + maxVisible - 1);

        if (end - start < maxVisible - 1) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === i
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        <div className="flex justify-center items-center gap-2 mt-8 pb-12">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            {renderPageNumbers()}

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
}