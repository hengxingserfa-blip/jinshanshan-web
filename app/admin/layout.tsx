import Link from "next/link";
import { headers } from "next/headers";
import LogoutButton from "./LogoutButton";

export const metadata = {
  title: "後台 Admin | 金閃閃銀樓",
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "/admin",            label: "Dashboard",   zh: "總覽" },
  { href: "/admin/gold-price", label: "Gold Price",  zh: "今日金價" },
  { href: "/admin/products",   label: "Products",    zh: "商品管理" },
  { href: "/admin/articles",   label: "Articles",    zh: "文章管理" },
  { href: "/admin/promotions", label: "Promotions",  zh: "促銷活動" },
];

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
  return (
    <div className="min-h-screen bg-ivory-50 flex">
      <aside className="w-56 bg-ink-950 text-ivory-50 sticky top-0 h-screen flex flex-col">
        <div className="px-6 py-8 border-b border-white/10">
          <p className="font-sans tracking-[0.3em] text-[10px] text-gold-300 uppercase mb-2 font-medium">
            Admin
          </p>
          <p className="font-display text-xl leading-tight">金閃閃銀樓</p>
          <p className="text-[10px] text-ivory-50/50 tracking-wider mt-1">
            SHINY GOLD
          </p>
        </div>

        <nav className="flex-1 py-4">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="block px-6 py-3 text-sm hover:bg-white/5 hover:text-gold-300 transition-colors border-l-2 border-transparent hover:border-gold-400"
            >
              <span className="block font-sans font-medium tracking-wider text-[11px] uppercase text-gold-300/80">
                {n.label}
              </span>
              <span className="block text-ivory-50/90 mt-0.5">{n.zh}</span>
            </Link>
          ))}
        </nav>

        <div className="border-t border-white/10 px-3 py-3 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="block text-xs text-ink-400 hover:text-gold-300 transition-colors py-2 px-3"
          >
            ↗ 查看前台
          </Link>
          <LogoutButton />
        </div>
      </aside>

      <main className="flex-1 min-w-0 overflow-x-auto">{children}</main>
    </div>
  );
}
