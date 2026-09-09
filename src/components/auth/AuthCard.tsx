"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 p-6 sm:p-8 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center mx-auto mb-2 lg:hidden">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          {description}
        </p>
      </div>

      <div>{children}</div>

      <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
        <Button variant="link" className="text-xs text-blue-600 hover:text-blue-700 font-medium w-full" size="sm" asChild>
          <Link href={backButtonHref}>{backButtonLabel}</Link>
        </Button>
        <Button variant="ghost" className="gap-2 w-full text-slate-400 hover:text-slate-700 text-xs rounded-xl" size="sm" asChild>
          <Link href="/">
            <ArrowLeft className="w-3.5 h-3.5" /> 返回系统首页
          </Link>
        </Button>
      </div>
    </div>
  );
};
