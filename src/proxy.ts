import { NextRequest, NextResponse } from "next/server";
import { isValidSessionToken, COOKIE_NAME } from "@/lib/auth";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = req.cookies.get(COOKIE_NAME)?.value;
  const authenticated = isValidSessionToken(session);

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!authenticated) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  if (
    pathname.startsWith("/api/products") &&
    ["POST", "PUT", "DELETE"].includes(req.method)
  ) {
    if (!authenticated) {
      return NextResponse.json(
        { error: "No autorizado." },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/products/:path*"],
};
