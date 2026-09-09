import { db } from "@/lib/db";
import { userFavorites, hscodes } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";

export interface FavoriteItem {
  id: string;
  hscodeId: string;
  note: string | null;
  tags: string | null;
  createdAt: Date;
  hscode: {
    id: string;
    code: string;
    cleanCode: string;
    name: string;
    unit1: string | null;
    unit2: string | null;
    mfnRate: string | null;
    tempRate: string | null;
    vatRate: string | null;
    exportRebateRate: string | null;
    regulatoryCode: string | null;
    quarantineCode: string | null;
  };
}

/**
 * 切换收藏状态：未收藏则添加，已收藏则取消
 */
export async function toggleFavorite(userId: string, hscodeId: string, note?: string, tags?: string) {
  const existing = await db.query.userFavorites.findFirst({
    where: and(
      eq(userFavorites.userId, userId),
      eq(userFavorites.hscodeId, hscodeId)
    ),
  });

  if (existing) {
    // 已收藏 -> 取消收藏
    await db
      .delete(userFavorites)
      .where(and(eq(userFavorites.userId, userId), eq(userFavorites.hscodeId, hscodeId)));
    return { favorited: false, message: "已取消收藏" };
  } else {
    // 未收藏 -> 添加收藏
    await db.insert(userFavorites).values({
      userId,
      hscodeId,
      note: note || null,
      tags: tags || null,
    });
    return { favorited: true, message: "已添加到收藏夹" };
  }
}

/**
 * 检查当前用户是否收藏了该 HS Code
 */
export async function isHscodeFavorited(userId: string, hscodeId: string): Promise<boolean> {
  const existing = await db.query.userFavorites.findFirst({
    where: and(
      eq(userFavorites.userId, userId),
      eq(userFavorites.hscodeId, hscodeId)
    ),
    columns: { id: true },
  });
  return !!existing;
}

/**
 * 更新收藏的备注
 */
export async function updateFavoriteNote(userId: string, hscodeId: string, note: string) {
  await db
    .update(userFavorites)
    .set({ note })
    .where(and(eq(userFavorites.userId, userId), eq(userFavorites.hscodeId, hscodeId)));
  return { success: true };
}

/**
 * 获取用户的所有收藏
 */
export async function getUserFavorites(userId: string): Promise<FavoriteItem[]> {
  const list = await db.query.userFavorites.findMany({
    where: eq(userFavorites.userId, userId),
    orderBy: [desc(userFavorites.createdAt)],
    with: {
      hscode: {
        columns: {
          id: true,
          code: true,
          cleanCode: true,
          name: true,
          unit1: true,
          unit2: true,
          mfnRate: true,
          tempRate: true,
          vatRate: true,
          exportRebateRate: true,
          regulatoryCode: true,
          quarantineCode: true,
        },
      },
    },
  });

  return list as unknown as FavoriteItem[];
}
