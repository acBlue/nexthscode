"use client";

import React, { useState, useEffect, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { 
  Search, 
  X, 
  ArrowRight, 
  Sparkles, 
  Calculator, 
  Layers, 
  Bookmark, 
  FileText,
  Loader2,
  TrendingUp,
  Compass,
  CornerDownLeft
} from "lucide-react";
import { quickSearchAction } from "@/app/actions/search";

interface SearchResultItem {
  id: string;
  code: string;
  cleanCode: string;
  name: string;
  mfnRate: string | null;
  vatRate: string | null;
  exportRebateRate: string | null;
}

export function openQuickSearch() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-quick-search"));
  }
}

export default function QuickCommandModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // 1. 全局监听 Command + K / Ctrl + K 与自定义打开事件
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-quick-search", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-quick-search", handleCustomOpen);
    };
  }, []);

  // 2. 弹窗打开时自动聚焦输入框
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      setSelectedIndex(0);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  // 3. 输入内容防抖查询
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      return;
    }

    debounceTimer.current = setTimeout(() => {
      startTransition(async () => {
        const res = await quickSearchAction(trimmed);
        if (res.results) {
          setResults(res.results);
          setSelectedIndex(0);
        }
      });
    }, 200);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [query]);

  // 4. 跳转处理
  const handleNavigate = (url: string) => {
    setIsOpen(false);
    router.push(url);
  };

  // 5. 键盘上下切换与回车
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (results.length > 0) {
        setSelectedIndex((prev) => (prev + 1) % results.length);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (results.length > 0) {
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results.length > 0 && results[selectedIndex]) {
        const item = results[selectedIndex];
        handleNavigate(`/hscode/${item.cleanCode || item.id}`);
      } else if (query.trim()) {
        handleNavigate(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  if (!isOpen) return null;

  const hotTerms = [
    { code: "8517", name: "手机/通信设备" },
    { code: "8471", name: "计算机/便携电脑" },
    { code: "8542", name: "集成电路芯片" },
    { code: "8708", name: "汽车零配件" },
    { code: "9018", name: "医疗器械" },
  ];

  const quickNavLinks = [
    { label: "进口税费智能计算器", url: "/tools/tax", icon: Calculator, badge: "PRO" },
    { label: "21 大类海关分类大纲", url: "/category", icon: Layers },
    { label: "我的商品税号收藏", url: "/profile?tab=favorites", icon: Bookmark },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      
      {/* 遮罩点击关闭 */}
      <div className="fixed inset-0" onClick={() => setIsOpen(false)} />

      {/* 弹窗主体卡片 */}
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-[#0f172a] rounded-2xl shadow-2xl border border-slate-200/90 dark:border-white/[0.1] overflow-hidden z-10 flex flex-col max-h-[80vh] transition-colors duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* 顶部搜索输入区 */}
        <div className="p-4 border-b border-slate-100 dark:border-white/[0.08] flex items-center gap-3 bg-slate-50/50 dark:bg-slate-900/50">
          <Search className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
          
          <input
            ref={inputRef}
            type="text"
            placeholder="输入 HS 编码 (如 8517) 或商品通用名称..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-base font-medium outline-none"
          />

          {isPending ? (
            <Loader2 className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-spin shrink-0" />
          ) : query ? (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}

          <div className="flex items-center gap-1 shrink-0">
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/[0.1] rounded text-slate-400 shadow-2xs">
              ESC
            </kbd>
          </div>
        </div>

        {/* 结果或快捷直达区域 */}
        <div className="overflow-y-auto custom-scrollbar p-3 space-y-4 flex-1">
          
          {/* A. 有实时联想结果 */}
          {query.trim() && results.length > 0 && (
            <div className="space-y-1">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>匹配海关商品编码 ({results.length})</span>
                <span className="text-[10px] text-slate-400 normal-case flex items-center gap-1 font-mono">
                  按 <CornerDownLeft className="w-3 h-3" /> 回车进入详情
                </span>
              </div>

              <div className="space-y-1">
                {results.map((item, idx) => {
                  const isSelected = selectedIndex === idx;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleNavigate(`/hscode/${item.cleanCode || item.id}`)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`p-3 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-all ${
                        isSelected
                          ? "bg-blue-50 dark:bg-blue-500/15 border border-blue-200/80 dark:border-blue-500/30 text-blue-900 dark:text-blue-200"
                          : "hover:bg-slate-50 dark:hover:bg-white/5 border border-transparent text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <span className={`font-mono text-sm font-extrabold px-2.5 py-1 rounded-lg shrink-0 ${
                          isSelected
                            ? "bg-blue-600 text-white shadow-2xs"
                            : "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20"
                        }`}>
                          {item.code}
                        </span>

                        <span className="text-xs font-semibold leading-snug truncate">
                          {item.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 text-[11px] font-mono">
                        <span className="text-slate-400">最惠国: {item.mfnRate || '-'}</span>
                        <ArrowRight className={`w-3.5 h-3.5 transition-transform ${
                          isSelected ? "text-blue-600 dark:text-blue-400 translate-x-1" : "text-slate-300 dark:text-slate-600"
                        }`} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 底部直接去高级搜索 */}
              <div className="pt-2 px-2">
                <button
                  onClick={() => handleNavigate(`/search?q=${encodeURIComponent(query.trim())}`)}
                  className="w-full p-2 text-center text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer flex items-center justify-center gap-1 font-medium"
                >
                  去高级搜索页查看 “{query}” 的全部匹配结果
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

          {/* B. 输入了内容但未找到匹配 */}
          {query.trim() && !isPending && results.length === 0 && (
            <div className="text-center py-10 space-y-3">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                未快速匹配到 “{query}”
              </p>
              <p className="text-xs text-slate-400">
                按回车键可在全量海关编码库中进行全字段搜索
              </p>
              <button
                onClick={() => handleNavigate(`/search?q=${encodeURIComponent(query.trim())}`)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 cursor-pointer shadow-xs"
              >
                在高级搜索中检索 “{query}”
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* C. 默认未输入状态：展示高频编码与核心工具直达 */}
          {!query.trim() && (
            <div className="space-y-4 p-1">
              {/* 高频编码快捷标签 */}
              <div className="space-y-2">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
                  高频海关商品编码
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {hotTerms.map((term) => (
                    <button
                      key={term.code}
                      onClick={() => handleNavigate(`/hscode/${term.code}`)}
                      className="p-2.5 rounded-xl border border-slate-200/80 dark:border-white/[0.08] hover:border-blue-300 dark:hover:border-blue-500/40 hover:bg-blue-50/50 dark:hover:bg-white/5 flex items-center justify-between text-left transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/15 px-2 py-0.5 rounded-md border border-blue-100 dark:border-blue-500/20">
                          {term.code}
                        </span>
                        <span className="text-xs font-medium text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {term.name}
                        </span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 -translate-x-1 group-hover:translate-x-0 transition-all" />
                    </button>
                  ))}
                </div>
              </div>

              {/* 常用功能直达 */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/[0.06]">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-indigo-500" />
                  快捷功能导航
                </div>

                <div className="space-y-1">
                  {quickNavLinks.map((link, i) => {
                    const Icon = link.icon;
                    return (
                      <button
                        key={i}
                        onClick={() => handleNavigate(link.url)}
                        className="w-full p-2.5 rounded-xl flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer text-left"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-medium">{link.label}</span>
                        </div>
                        {link.badge && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 bg-blue-50 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 rounded border border-blue-200/60 dark:border-blue-500/30">
                            {link.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* 底部快捷键说明提示栏 */}
        <div className="p-3 bg-slate-50 dark:bg-[#0b101d] border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/[0.1] rounded text-[10px]">↑</kbd>
              <kbd className="px-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/[0.1] rounded text-[10px]">↓</kbd>
              选择
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/[0.1] rounded text-[10px]">↵</kbd>
              跳转
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/[0.1] rounded text-[10px]">ESC</kbd>
              关闭
            </span>
          </div>

          <span className="font-mono text-[10px] hidden sm:inline">HSCode Master Quick Search</span>
        </div>

      </div>
    </div>
  );
}
