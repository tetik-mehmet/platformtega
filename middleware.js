import { NextResponse } from "next/server";

export function middleware(request) {
  // GEÇİCİ: Middleware'i devre dışı bırak
  console.log("⚠️ GEÇİCİ: Middleware devre dışı");
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login|signup).*)"],
};
