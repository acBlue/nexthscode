"use client";

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { openQuickSearch } from "./QuickCommandModal";

export default function QuickSearchTrigger() {
  const [keySymbol, setKeySymbol] = useState("⌘K");

  useEffect(() => {
    // 自动感知操作系统：Windows 显示 Ctrl+K，macOS 显示 ⌘K
    const isMac = typeof window !== "undefined" && /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent);
    setKeySymbol(isMac ? "⌘K" : "Ctrl+K");
  }, []);

  return (
    <button
      type="button"
      onClick={openQuickSearch}
      className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 dark:text-slate-300 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200/70 dark:hover:bg-slate-700/80 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg border border-slate-200/60 dark:border-white/[0.08] transition-all group cursor-pointer"
      title={`快速查询海关编码 (${keySymbol})`}
    >
      <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
      <span className="hidden sm:inline">快速查编码...</span>
      <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-slate-400 shadow-2xs group-hover:border-blue-300 dark:group-hover:border-blue-500/50">
        {keySymbol}
      </kbd>
    </button>
  );
}
