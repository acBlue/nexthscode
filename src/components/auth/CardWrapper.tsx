import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
}

export const CardWrapper = ({
                                children,
                                headerLabel,
                                backButtonLabel,
                                backButtonHref,
                            }: CardWrapperProps) => {
    return (
        <div className="w-[400px] bg-white shadow-md rounded-xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="w-full flex flex-col gap-y-2 items-center justify-center p-6 border-b border-gray-100 bg-gray-50/50">
                <h1 className="text-2xl font-bold text-gray-900">HSCode Master</h1>
                <p className="text-sm text-gray-500">{headerLabel}</p>
            </div>

            {/* Content */}
            <div className="p-6">{children}</div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50/30 flex justify-between items-center text-sm">
                <Link
                    href="/"
                    className="flex items-center gap-1 text-gray-500 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> 回首页
                </Link>
                <Link href={backButtonHref} className="text-blue-600 hover:underline">
                    {backButtonLabel}
                </Link>
            </div>
        </div>
    );
};