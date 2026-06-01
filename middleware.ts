import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "jinshanshan-admin";
const COOKIE_VALUE = "ok";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1) 把當前路徑放到 request header, 讓 server components 可以讀
  const reqHeaders = new Headers(request.headers);
  reqHeaders.set("x-pathname", pathname);

  // 2) /admin 路徑保護 (login/logout 例外)
  const isAdminPath = pathname.startsWith("/admin");
  const isAdminPublic =
    pathname.startsWith("/admin/login") || pathname.startsWith("/admin/logout");

  if (isAdminPath && !isAdminPublic) {
    const cookie = request.cookies.get(COOKIE_NAME);
    if (cookie?.value !== COOKIE_VALUE) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next({ request: { headers: reqHeaders } });
}

export const config = {
  // 排除 Next.js 內部靜態資源, 其餘全部跑 middleware
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
