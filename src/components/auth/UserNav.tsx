"use client";

import React, { useState, useRef, useEffect } from "react";
import { LogOut, Settings, ChevronDown, Bookmark, History } from "lucide-react";
import Link from "next/link";
import { logout } from "@/app/actions/auth";

interface UserNavProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export const UserNav = ({ user }: UserNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  const displayName = user.name || user.email?.split("@")[0] || "用户";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      {/* 触发按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-white/[0.08] cursor-pointer"
      >
        {/* 头像圆圈 */}
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-sm">
          {initial}
        </div>
        
        <span className="hidden md:block text-sm font-medium text-slate-700 dark:text-slate-200 max-w-[100px] truncate">
          {displayName}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* 下拉菜单 */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-[#0f172a] rounded-2xl shadow-xl border border-slate-100 dark:border-white/[0.08] py-2 z-50 animate-in fade-in zoom-in-95 duration-200 transition-colors">
          {/* 用户信息头 */}
          <div className="px-4 py-2.5 border-b border-slate-100 dark:border-white/[0.06] mb-1">
            <p className="text-sm font-bold text-slate-900 dark:text-white">{user.name || "我的账号"}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
          </div>

          {/* 菜单项 */}
          <div className="px-2 space-y-0.5">
            <Link
              href="/profile?tab=favorites"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 w-full px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 rounded-xl hover:bg-blue-50 dark:hover:bg-white/5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Bookmark className="w-4 h-4 text-amber-500" />
              我的商品收藏
            </Link>
            <Link
              href="/profile?tab=history"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 w-full px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 rounded-xl hover:bg-blue-50 dark:hover:bg-white/5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <History className="w-4 h-4 text-blue-500" />
              浏览历史轨迹
            </Link>
            <Link
              href="/profile?tab=account"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 w-full px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              账户安全设置
            </Link>
          </div>

          <div className="h-px bg-slate-100 dark:bg-white/[0.06] my-1.5 mx-2" />

          {/* 登出按钮 */}
          <div className="px-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2.5 w-full px-3 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              退出登录
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
