"use client";

import React, { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { 
  Bookmark, 
  Trash2, 
  Edit2, 
  Check, 
  Calculator, 
  Search,
  FileText
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  getMyFavoritesAction, 
  toggleFavoriteAction, 
  updateNoteAction 
} from "@/app/actions/favorite";
import { toast } from "sonner";
import { FavoriteItem } from "@/services/favorite.service";

export default function MyFavoritesView() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingNote, setEditingNote] = useState("");
  const [isPending, startTransition] = useTransition();

  const loadData = () => {
    getMyFavoritesAction().then((res) => {
      if (res.list) {
        setFavorites(res.list);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRemove = (hscodeId: string, code: string) => {
    startTransition(async () => {
      const res = await toggleFavoriteAction(hscodeId);
      if (res.success) {
        setFavorites((prev) => prev.filter((item) => item.hscodeId !== hscodeId));
        toast.info(`已将 ${code} 移出收藏`);
      }
    });
  };

  const handleStartEdit = (item: FavoriteItem) => {
    setEditingId(item.hscodeId);
    setEditingNote(item.note || "");
  };

  const handleSaveNote = (hscodeId: string) => {
    startTransition(async () => {
      const res = await updateNoteAction(hscodeId, editingNote.trim());
      if (res.success) {
        setFavorites((prev) =>
          prev.map((f) => (f.hscodeId === hscodeId ? { ...f, note: editingNote.trim() } : f))
        );
        setEditingId(null);
        toast.success("备注已保存");
      }
    });
  };

  const filtered = favorites.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.hscode.code.toLowerCase().includes(term) ||
      item.hscode.name.toLowerCase().includes(term) ||
      (item.note && item.note.toLowerCase().includes(term))
    );
  });

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 w-48 bg-slate-100 dark:bg-slate-800 rounded-xl" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-28 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-white/[0.08] rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 头部统计与快速检索 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-white/[0.06]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">我的商品税号收藏</h2>
            <Badge className="bg-amber-50 dark:bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-500/30 text-xs font-mono font-bold">
              {favorites.length}
            </Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            自定义备注、随时追踪税率变动并快速发起申报测算
          </p>
        </div>

        {favorites.length > 3 && (
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <Input
              placeholder="按编码、品名或备注过滤..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-9 text-xs bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-white/[0.08] text-slate-800 dark:text-slate-200 rounded-xl"
            />
          </div>
        )}
      </div>

      {/* 列表内容 */}
      {favorites.length === 0 ? (
        <div className="text-center py-16 px-4 bg-slate-50/50 dark:bg-slate-900/40 rounded-2xl border border-dashed border-slate-200 dark:border-white/[0.08] space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-500/15 text-amber-500 flex items-center justify-center mx-auto shadow-2xs">
            <Bookmark className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">暂无收藏的商品编码</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
            在浏览海关编码详情页或搜索列表时，点击“书签”按钮即可将常出货品归类保存到这里。
          </p>
          <div className="pt-2">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs cursor-pointer" asChild>
              <Link href="/search">
                立即去搜索编码
              </Link>
            </Button>
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-xs text-slate-400">
          未找到匹配 “{searchTerm}” 的收藏项
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => {
            const hs = item.hscode;
            const dutyVal = hs.tempRate || hs.mfnRate || "0";
            const vatVal = hs.vatRate || "13";
            const calcUrl = `/tools/tax?duty=${parseFloat(dutyVal) || 0}&vat=${parseFloat(vatVal) || 13}`;
            const detailUrl = `/hscode/${hs.cleanCode || hs.id}`;
            const isEditing = editingId === item.hscodeId;

            return (
              <div
                key={item.id}
                className="bg-white dark:bg-[#131b2e] border border-slate-200/90 dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-md hover:border-blue-200 dark:hover:border-blue-500/40 transition-all space-y-3 relative group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  
                  {/* 左侧：编码与品名 */}
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Link
                        href={detailUrl}
                        className="font-mono text-lg font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/15 px-2.5 py-0.5 rounded-lg border border-blue-100 dark:border-blue-500/20 hover:bg-blue-600 hover:text-white transition-colors"
                      >
                        {hs.code}
                      </Link>

                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                        <span>最惠国: {hs.tempRate || hs.mfnRate || '-'}</span>
                        <span>·</span>
                        <span>增值税: {hs.vatRate || '-'}</span>
                        <span>·</span>
                        <span>退税: {hs.exportRebateRate || '-'}</span>
                      </div>
                    </div>

                    <Link href={detailUrl} className="block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug truncate">
                        {hs.name}
                      </h4>
                    </Link>
                  </div>

                  {/* 右侧：快捷操作 */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs rounded-xl border-slate-200 dark:border-white/[0.1] text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 cursor-pointer"
                      asChild
                    >
                      <Link href={calcUrl}>
                        <Calculator className="w-3.5 h-3.5 mr-1 text-blue-600 dark:text-blue-400" />
                        算税费
                      </Link>
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemove(item.hscodeId, hs.code)}
                      className="h-8 w-8 p-0 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-500/10 cursor-pointer"
                      title="移出收藏"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                </div>

                {/* 底部备注区域 */}
                <div className="pt-2 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-xs">
                  {isEditing ? (
                    <div className="flex items-center gap-2 w-full">
                      <Input
                        value={editingNote}
                        onChange={(e) => setEditingNote(e.target.value)}
                        placeholder="输入货品备注 (如: 客户A常用模组)..."
                        className="h-7 text-xs flex-1 rounded-lg bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-white/[0.1] text-slate-800 dark:text-slate-200"
                        autoFocus
                      />
                      <Button
                        size="sm"
                        onClick={() => handleSaveNote(item.hscodeId)}
                        className="h-7 px-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs cursor-pointer"
                      >
                        <Check className="w-3 h-3 mr-1" /> 保存
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingId(null)}
                        className="h-7 px-2 text-xs cursor-pointer"
                      >
                        取消
                      </Button>
                    </div>
                  ) : (
                    <div 
                      onClick={() => handleStartEdit(item)}
                      className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer group/note"
                    >
                      <FileText className="w-3.5 h-3.5 text-slate-400 group-hover/note:text-blue-600 dark:group-hover/note:text-blue-400" />
                      <span className={item.note ? "text-slate-700 dark:text-slate-300 font-medium" : "text-slate-400 dark:text-slate-500 italic"}>
                        {item.note ? `备注: ${item.note}` : "点击添加备注说明..."}
                      </span>
                      <Edit2 className="w-3 h-3 opacity-0 group-hover/note:opacity-100 text-slate-400" />
                    </div>
                  )}

                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono hidden sm:inline">
                    收藏于 {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
