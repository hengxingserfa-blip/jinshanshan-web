"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LogoutButton from "./LogoutButton";

const NAV = [
  { href: "/admin", label: "Dashboard", zh: "總覽", icon: "📊" },
  { href: "/admin/gold-price", label: "Gold Price", zh: "今日金價", icon: "💰" },
  { href: "/admin/products", label: "Products", zh: "商品管理", icon: "💍" },
  { href: "/admin/articles", label: "Articles", zh: "文章管理", icon: "📖" },
  { href: "/admin/promotions", label: "Promotions", zh: "促銷活動", icon: "🎁" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // 換頁時自動關 drawer
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // 開 drawer 時鎖背景滾動
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // 找目前頁面的 label
  const current =
    NAV.find((n) => n.href === pathname) ??
    NAV.find((n) => pathname.startsWith(n.href) && n.href !== "/admin") ??
    NAV[0];

  return (
    <div className="min-h-screen bg-ivory-50 lg:flex">
      {/* 手機頂部 bar */}
      <header className="lg:hidden sticky top-0 z-30 bg-ink-950 text-ivory-50 px-4 py-3 flex items-center justify-between shadow-md">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="開啟選單"
          className="w-10 h-10 flex items-center justify-center -ml-2"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <div className="text-center">
          <p className="text-[9px] tracking-[0.3em] text-gold-300 uppercase font-medium leading-none">
            {current.label}
          </p>
          <p className="text-sm font-display leading-tight mt-0.5">{current.zh}</p>
        </div>
        <Link
          href="/"
          target="_blank"
          aria-label="查看前台"
          className="w-10 h-10 flex items-center justify-center -mr-2 text-gold-300"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </Link>
      </header>

      {/* 手機 drawer */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-ink-950/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <aside
            className="absolute left-0 top-0 bottom-0 w-72 max-w-[85vw] bg-ink-950 text-ivory-50 flex flex-col animate-slide-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-6 border-b border-white/10 flex items-start justify-between">
              <div>
                <p className="font-sans tracking-[0.3em] text-[10px] text-gold-300 uppercase mb-2 font-medium">
                  Admin
                </p>
                <p className="font-display text-xl leading-tight">金閃閃銀樓</p>
                <p className="text-[10px] text-ivory-50/50 tracking-wider mt-1">
                  SHINY GOLD
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="關閉選單"
                className="w-8 h-8 flex items-center justify-center text-ivory-50/70 hover:text-gold-300 -mr-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 py-4 overflow-y-auto">
              {NAV.map((n) => {
                const active = n.href === "/admin" ? pathname === "/admin" : pathname.startsWith(n.href);
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    className={`flex items-center gap-3 px-6 py-4 text-sm transition-colors border-l-2 ${
                      active
                        ? "bg-white/10 border-gold-400 text-gold-300"
                        : "border-transparent hover:bg-white/5 hover:text-gold-300"
                    }`}
                  >
                    <span className="text-lg">{n.icon}</span>
                    <div>
                      <span className="block font-sans font-medium tracking-wider text-[10px] uppercase text-gold-300/80">
                        {n.label}
                      </span>
                      <span className="block text-ivory-50/90">{n.zh}</span>
                    </div>
                  </Link>
                );
              })}
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
        </div>
      )}

      {/* 桌機 sidebar */}
      <aside className="hidden lg:flex w-56 bg-ink-950 text-ivory-50 sticky top-0 h-screen flex-col shrink-0">
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
          {NAV.map((n) => {
            const active = n.href === "/admin" ? pathname === "/admin" : pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`block px-6 py-3 text-sm transition-colors border-l-2 ${
                  active
                    ? "bg-white/10 border-gold-400 text-gold-300"
                    : "border-transparent hover:bg-white/5 hover:text-gold-300 hover:border-gold-400"
                }`}
              >
                <span className="block font-sans font-medium tracking-wider text-[11px] uppercase text-gold-300/80">
                  {n.label}
                </span>
                <span className="block text-ivory-50/90 mt-0.5">{n.zh}</span>
              </Link>
            );
          })}
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

      <main className="flex-1 min-w-0 overflow-x-hidden">{children}</main>
    </div>
  );
}
