"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { UserNav } from "@/components/auth/UserNav";

export function NavbarUser() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        <div className="w-12 h-8 bg-slate-100/70 dark:bg-slate-800/80 rounded-lg animate-pulse" />
        <div className="w-16 h-8 bg-blue-50/70 dark:bg-blue-500/20 rounded-lg animate-pulse" />
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
        className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
      >
        登录
      </Link>
      <Link 
        href="/register" 
        className="text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-600 px-4 py-1.5 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-xs hover:shadow-md hover:shadow-blue-500/20 active:scale-95"
      >
        免费注册
      </Link>
    </div>
  );
}

export function NavbarUserSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-12 h-8 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
      <div className="w-16 h-8 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
    </div>
  );
}
