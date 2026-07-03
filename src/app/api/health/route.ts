import { NextResponse } from "next/server";

export const runtime = "nodejs";

export function GET() {
  return NextResponse.json({
    status: "healthy",
    service: "freykraft-web",
    timestamp: new Date().toISOString()
  });
}
