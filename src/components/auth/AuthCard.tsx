"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  description: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const AuthCard = ({
  children,
  title,
  description,
  backButtonLabel,
  backButtonHref,
}: AuthCardProps) => {
  return (
    <div className="bg-white dark:bg-[#0f172a] rounded-3xl border border-slate-200/90 dark:border-white/[0.08] shadow-xl shadow-slate-200/50 dark:shadow-black/50 p-6 sm:p-8 space-y-6 transition-colors duration-200">
      <div className="text-center space-y-2">
        <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center mx-auto mb-2 lg:hidden">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>

      <div>{children}</div>

      <div className="pt-2 border-t border-slate-100 dark:border-white/[0.06] flex flex-col gap-2">
        <Button variant="link" className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium w-full" size="sm" asChild>
          <Link href={backButtonHref}>{backButtonLabel}</Link>
        </Button>
        <Button variant="ghost" className="gap-2 w-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-xs rounded-xl" size="sm" asChild>
          <Link href="/">
            <ArrowLeft className="w-3.5 h-3.5" /> 返回系统首页
          </Link>
        </Button>
      </div>
    </div>
  );
};
