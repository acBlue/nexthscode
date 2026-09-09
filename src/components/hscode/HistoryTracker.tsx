"use client";

import { useEffect } from "react";

interface HistoryRecord {
  id: string;
  code: string;
  cleanCode: string;
  name: string;
  visitedAt: number;
}

const STORAGE_KEY = "nexthscode_history_v1";

export function saveToHistory(item: Omit<HistoryRecord, "visitedAt">) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    let list: HistoryRecord[] = raw ? JSON.parse(raw) : [];

    // 去重：如果已经存在该编码，先移除旧记录
    list = list.filter((r) => r.code !== item.code && r.id !== item.id);

    // 新增至头部
    list.unshift({
      ...item,
      visitedAt: Date.now(),
    });

    // 限制最多 50 条
    if (list.length > 50) {
      list = list.slice(0, 50);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error("Failed to save history to localStorage:", e);
  }
}

export function getHistory(): HistoryRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function clearHistory() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

export default function HistoryTracker({
  id,
  code,
  cleanCode,
  name,
}: {
  id: string;
  code: string;
  cleanCode: string;
  name: string;
}) {
  useEffect(() => {
    saveToHistory({ id, code, cleanCode, name });
  }, [id, code, cleanCode, name]);

  return null;
}
