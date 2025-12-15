"use client";

import React, { useState, useRef, useEffect } from "react";
import { User, LogOut, Settings, ChevronDown } from "lucide-react";
import Link from "next/link";
import { logout } from "@/app/actions/auth"; // 引用刚才写的 Server Action

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

  // 点击外部关闭菜单
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

  // 获取显示的名称（优先昵称，其次邮箱，最后显示“用户”）
  const displayName = user.name || user.email?.split("@")[0] || "用户";
  // 获取头像首字母
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      {/* 触发按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
      >
        {/* 头像圆圈 */}
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-sm">
          {initial}
        </div>
        
        {/* 名字 (移动端可能隐藏) */}
        <span className="hidden md:block text-sm font-medium text-gray-700 max-w-[100px] truncate">
          {displayName}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* 下拉菜单 */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
          {/* 用户信息头 */}
          <div className="px-4 py-2 border-b border-gray-50 mb-1">
            <p className="text-sm font-bold text-gray-900">{user.name || "我的账号"}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>

          {/* 菜单项 */}
          <div className="px-2">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Settings className="w-4 h-4 text-gray-400" />
              个人设置
            </Link>
          </div>

          <div className="h-px bg-gray-100 my-1 mx-2" />

          {/* 登出按钮 */}
          <div className="px-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 rounded-md hover:bg-red-50 transition-colors"
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