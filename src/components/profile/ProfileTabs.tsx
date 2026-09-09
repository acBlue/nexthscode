"use client";

import React from "react";
import { User, Bookmark, History, Bell } from "lucide-react";
import { SettingsForm } from "@/components/auth/SettingsForm";
import MyFavoritesView from "@/components/profile/MyFavoritesView";
import MyHistoryView from "@/components/profile/MyHistoryView";
import { useSearchParams, useRouter } from "next/navigation";

export default function ProfileTabs() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentTab = searchParams.get("tab") || "favorites";

  const handleTabChange = (tabKey: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tabKey);
    router.replace(`/profile?${params.toString()}`);
  };

  const navItems = [
    { key: "favorites", label: "我的商品收藏", icon: Bookmark, badge: "核心资产" },
    { key: "history", label: "浏览历史轨迹", icon: History },
    { key: "account", label: "账户安全与资料", icon: User },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
      {/* 侧边导航 */}
      <aside className="w-full lg:w-64 shrink-0 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200/90 dark:border-white/[0.08] p-2.5 shadow-2xs transition-colors duration-200">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => handleTabChange(item.key)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white shadow-2xs"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400 dark:text-slate-400"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                      isActive ? "bg-white/20 text-white" : "bg-blue-50 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 my-2 border-t border-slate-100 dark:border-white/[0.06]" />

          <div className="px-3.5 py-2 flex items-center justify-between text-xs text-slate-400 dark:text-slate-400">
            <span className="flex items-center gap-2">
              <Bell className="w-3.5 h-3.5" /> 税则变动提醒
            </span>
            <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">开发中</span>
          </div>
        </nav>
      </aside>

      {/* 主内容区域 */}
      <div className="flex-1 min-w-0 w-full">
        <div className="bg-white dark:bg-[#0f172a] rounded-3xl border border-slate-200/90 dark:border-white/[0.08] p-6 sm:p-8 shadow-xs transition-colors duration-200">
          {currentTab === "favorites" && <MyFavoritesView />}
          {currentTab === "history" && <MyHistoryView />}
          {currentTab === "account" && <SettingsForm />}
        </div>
      </div>
    </div>
  );
}
