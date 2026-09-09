"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { UserNav } from "@/components/auth/UserNav";

export function NavbarUser() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 客户端异步获取登录状态，完全不阻塞首屏 HTML 极速渲染
    fetch("/api/auth/session")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-12 h-8 bg-slate-100/70 rounded-lg animate-pulse" />
        <div className="w-16 h-8 bg-blue-50/70 rounded-lg animate-pulse" />
      </div>
    );
  }

  if (user) {
    return <UserNav user={user} />;
  }

  return (
    <div className="flex items-center gap-2">
      <Link 
        href="/login" 
        className="text-sm font-medium text-slate-600 hover:text-blue-600 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
      >
        登录
      </Link>
      <Link 
        href="/register" 
        className="text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-1.5 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-xs hover:shadow-md hover:shadow-blue-500/20 active:scale-95"
      >
        免费注册
      </Link>
    </div>
  );
}

export function NavbarUserSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-12 h-8 bg-slate-100 rounded-lg animate-pulse" />
      <div className="w-16 h-8 bg-slate-100 rounded-lg animate-pulse" />
    </div>
  );
}
