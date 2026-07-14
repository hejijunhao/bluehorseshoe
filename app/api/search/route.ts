import { NextResponse, type NextRequest } from "next/server";
import { getMarketData } from "@/lib/market";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? "";
  const results = await getMarketData().search(q);
  return NextResponse.json({ results });
}
