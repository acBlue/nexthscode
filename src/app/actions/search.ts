"use server";

import { quickSearchHsCodes } from "@/services/hscode.service";

export async function quickSearchAction(query: string) {
  if (!query || query.trim().length === 0) {
    return { results: [] };
  }

  try {
    const results = await quickSearchHsCodes(query.trim(), 8);
    return { results };
  } catch (error) {
    console.error("quickSearchAction failed:", error);
    return { results: [] };
  }
}
