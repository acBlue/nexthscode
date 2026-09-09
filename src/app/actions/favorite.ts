"use server";

import { auth } from "@/auth/auth";
import { 
  toggleFavorite, 
  isHscodeFavorited, 
  getUserFavorites, 
  updateFavoriteNote 
} from "@/services/favorite.service";
import { revalidatePath } from "next/cache";

export async function toggleFavoriteAction(hscodeId: string, note?: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "请先登录后再进行收藏操作" };
  }

  try {
    const result = await toggleFavorite(session.user.id, hscodeId, note);
    revalidatePath("/profile");
    revalidatePath("/profile/favorites");
    return { success: true, favorited: result.favorited, message: result.message };
  } catch (error) {
    console.error("Failed to toggle favorite:", error);
    return { error: "收藏操作失败，请重试" };
  }
}

export async function checkFavoriteStatusAction(hscodeId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { favorited: false };
  }

  try {
    const favorited = await isHscodeFavorited(session.user.id, hscodeId);
    return { favorited };
  } catch {
    return { favorited: false };
  }
}

export async function updateNoteAction(hscodeId: string, note: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "请先登录" };
  }

  try {
    await updateFavoriteNote(session.user.id, hscodeId, note);
    revalidatePath("/profile");
    return { success: true, message: "备注已更新" };
  } catch (error) {
    return { error: "更新备注失败" };
  }
}

export async function getMyFavoritesAction() {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "未登录", list: [] };
  }

  try {
    const list = await getUserFavorites(session.user.id);
    return { list };
  } catch (error) {
    console.error("Failed to fetch favorites:", error);
    return { error: "获取收藏失败", list: [] };
  }
}
