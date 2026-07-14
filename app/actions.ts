"use server";

import { revalidatePath } from "next/cache";
import { addToWatchlist, removeFromWatchlist } from "@/lib/db/watchlist";

export async function addTickerAction(ref: {
  ticker: string;
  name: string;
  exchange: string;
}): Promise<void> {
  await addToWatchlist(ref);
  revalidatePath("/");
}

export async function removeTickerAction(ticker: string): Promise<void> {
  await removeFromWatchlist(ticker);
  revalidatePath("/");
  revalidatePath(`/stock/${ticker.toUpperCase()}`);
}
