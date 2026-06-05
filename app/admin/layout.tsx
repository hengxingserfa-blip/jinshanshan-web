import { headers } from "next/headers";
import AdminShell from "./AdminShell";

export const metadata = {
  title: "後台 Admin | 金閃閃銀樓",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const h = await headers();
  const pathname = h.get("x-pathname") ?? "";

  // /admin/login, /admin/logout 不套後台側邊 nav
  if (
    pathname.startsWith("/admin/login") ||
    pathname.startsWith("/admin/logout")
  ) {
    return <>{children}</>;
  }

  // 認證由 middleware 處理. 走到這代表已登入.
  return <AdminShell>{children}</AdminShell>;
}
