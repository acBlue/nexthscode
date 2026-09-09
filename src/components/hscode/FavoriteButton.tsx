"use client";

import React, { useState, useEffect, useTransition } from "react";
import { Star, Bookmark, Check, Loader2, Sparkles, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  toggleFavoriteAction, 
  checkFavoriteStatusAction,
  updateNoteAction 
} from "@/app/actions/favorite";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FavoriteButtonProps {
  hscodeId: string;
  code?: string;
  name?: string;
  variant?: "icon" | "button";
  initialFavorited?: boolean;
}

export default function FavoriteButton({
  hscodeId,
  code,
  variant = "button",
  initialFavorited = false,
}: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(initialFavorited);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // 组件挂载时检查一次状态
  useEffect(() => {
    checkFavoriteStatusAction(hscodeId).then((res) => {
      setIsFavorited(res.favorited);
    });
  }, [hscodeId]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    startTransition(async () => {
      const res = await toggleFavoriteAction(hscodeId);
      if (res.error) {
        toast.error(res.error, {
          action: {
            label: "去登录",
            onClick: () => router.push("/login"),
          },
        });
        return;
      }

      if (res.success) {
        setIsFavorited(!!res.favorited);
        if (res.favorited) {
          toast.success("已收藏至您的专属清单", {
            description: code ? `海关编码 ${code} 已入库` : undefined,
          });
        } else {
          toast.info("已移出收藏夹");
        }
      }
    });
  };

  if (variant === "icon") {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={150}>
          <TooltipTrigger asChild>
            <button
              type="button"
              disabled={isPending}
              onClick={handleToggle}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                isFavorited
                  ? "bg-amber-50 border-amber-300 text-amber-500 shadow-2xs hover:bg-amber-100"
                  : "bg-white border-slate-200/80 text-slate-400 hover:text-amber-500 hover:border-amber-300 hover:bg-amber-50/50"
              }`}
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
              ) : (
                <Bookmark className={`w-4 h-4 ${isFavorited ? "fill-amber-500" : ""}`} />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isFavorited ? "取消收藏" : "收藏此商品编码"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      disabled={isPending}
      onClick={handleToggle}
      className={`h-9 px-3.5 rounded-xl border text-xs font-semibold transition-all ${
        isFavorited
          ? "bg-amber-50/80 border-amber-300 text-amber-700 hover:bg-amber-100/80 shadow-2xs"
          : "border-slate-200 text-slate-700 hover:border-amber-300 hover:bg-amber-50/50 hover:text-amber-700"
      }`}
    >
      {isPending ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
      ) : (
        <Bookmark className={`w-3.5 h-3.5 mr-1.5 ${isFavorited ? "fill-amber-500 text-amber-600" : "text-slate-400"}`} />
      )}
      <span>{isFavorited ? "已收藏" : "加入收藏夹"}</span>
    </Button>
  );
}
