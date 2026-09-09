"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { History, Trash2, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getHistory, clearHistory } from "@/components/hscode/HistoryTracker";

export default function MyHistoryView() {
  const [historyList, setHistoryList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setHistoryList(getHistory());
    setLoading(false);
  }, []);

  const handleClear = () => {
    clearHistory();
    setHistoryList([]);
  };

  const formatTime = (ts: number) => {
    const diff = Math.floor((Date.now() - ts) / 1000);
    if (diff < 60) return "刚刚";
    if (diff < 3600) return `${Math.floor(diff / 60)} 分钟前`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} 小时前`;
    return new Date(ts).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 w-48 bg-slate-100 dark:bg-slate-800 rounded-xl" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-16 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-white/[0.08] rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/[0.06]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">最近浏览轨迹</h2>
            <Badge variant="secondary" className="text-xs font-mono font-bold">
              {historyList.length}
            </Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            自动记录您在此设备上最近查看过的海关编码
          </p>
        </div>

        {historyList.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="text-xs text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg h-8 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5 mr-1" />
            清空历史
          </Button>
        )}
      </div>

      {historyList.length === 0 ? (
        <div className="text-center py-16 px-4 bg-slate-50/50 dark:bg-slate-900/40 rounded-2xl border border-dashed border-slate-200 dark:border-white/[0.08] space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto shadow-2xs">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">暂无浏览轨迹</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
            您在查阅海关税号详情时，系统会自动记录轨迹，方便快速回访。
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-white/[0.06] border border-slate-200/90 dark:border-white/[0.08] rounded-2xl bg-white dark:bg-[#131b2e] overflow-hidden shadow-2xs">
          {historyList.map((item, idx) => (
            <Link
              key={idx}
              href={`/hscode/${item.cleanCode || item.id}`}
              className="p-4 flex items-center justify-between hover:bg-blue-50/40 dark:hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <span className="font-mono font-bold text-sm text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/15 px-2.5 py-1 rounded-lg border border-blue-100 dark:border-blue-500/20 shrink-0">
                  {item.code}
                </span>
                <span className="text-xs font-medium text-slate-800 dark:text-slate-200 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors truncate">
                  {item.name}
                </span>
              </div>

              <div className="flex items-center gap-3 shrink-0 ml-4">
                <span className="text-[11px] text-slate-400 dark:text-slate-400 font-mono">
                  {formatTime(item.visitedAt)}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
