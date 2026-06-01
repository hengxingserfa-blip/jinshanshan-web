import Link from "next/link";
import { getProducts } from "@/lib/data/products";
import { getArticles } from "@/lib/data/articles";
import { getActivePromotion } from "@/lib/data/promotions";
import { getTodayGoldOverride } from "@/lib/data/gold-override";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const [products, articles, promo, goldOverride] = await Promise.all([
    getProducts(),
    getArticles(),
    getActivePromotion(),
    getTodayGoldOverride(),
  ]);

  const configured = isSupabaseConfigured();

  const stats = [
    {
      label: "商品總數",
      value: products.length,
      href: "/admin/products",
      sub: products.filter((p) => p.featured).length + " 件精選",
    },
    {
      label: "已發布文章",
      value: articles.length,
      href: "/admin/articles",
      sub: "Journal",
    },
    {
      label: "進行中促銷",
      value: promo ? 1 : 0,
      href: "/admin/promotions",
      sub: promo?.title_zh ?? "—",
    },
    {
      label: "今日金價覆寫",
      value: goldOverride ? "NT$ " + goldOverride.toLocaleString("zh-TW") : "—",
      href: "/admin/gold-price",
      sub: goldOverride ? "已覆寫" : "走詮美+國際即時",
    },
  ];

  return (
    <div className="p-8 md:p-12 max-w-6xl">
      <header className="mb-12">
        <p className="font-sans tracking-[0.3em] text-[10px] text-gold-600 uppercase mb-2 font-medium">
          Dashboard · 總覽
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-ink-950">
          歡迎回來
        </h1>
      </header>

      {!configured && (
        <div className="mb-10 bg-amber-50 border border-amber-300 text-amber-900 px-5 py-4">
          <p className="font-medium text-sm mb-1">⚠ 還沒接 Supabase</p>
          <p className="text-xs leading-relaxed">
            下面數字是 fallback 示意資料,不是真實 DB。讀{" "}
            <Link href="/" className="underline">
              SETUP.md
            </Link>{" "}
            把 Supabase 接好之後,所有頁面會自動切到真實資料。後台寫入功能(金價覆寫、商品編輯)也需要設好 Supabase 才能用。
          </p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink-950/10 border border-ink-950/10 mb-12">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="bg-white hover:bg-ivory-50 transition-colors p-6 group"
          >
            <p className="text-xs text-ink-400 tracking-wider uppercase mb-3">
              {s.label}
            </p>
            <p className="font-display text-3xl text-ink-950 group-hover:text-gold-600 transition-colors break-all">
              {s.value}
            </p>
            <p className="text-[11px] text-ink-700 mt-3 font-light">{s.sub}</p>
          </Link>
        ))}
      </div>

      <section>
        <h2 className="font-display text-2xl text-ink-950 mb-6">
          快速操作
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <QuickLink
            href="/admin/gold-price"
            label="設定今日金價"
            desc="開店時手動覆寫 9999 飾金回收價"
            primary
          />
          <QuickLink
            href="/admin/products"
            label="商品管理"
            desc="新增、編輯、上下架金飾商品"
          />
          <QuickLink
            href="/admin/articles"
            label="文章管理"
            desc="編寫金飾知識、回收指南"
          />
          <QuickLink
            href="/admin/promotions"
            label="促銷活動"
            desc="排程母親節、過年等限時活動"
          />
          <QuickLink
            href="/"
            label="預覽前台網站"
            desc="客人看到的樣子(新分頁開啟)"
          />
        </div>
      </section>
    </div>
  );
}

function QuickLink({
  href,
  label,
  desc,
  primary,
}: {
  href: string;
  label: string;
  desc: string;
  primary?: boolean;
}) {
  return (
    <Link
      href={href}
      target={href === "/" ? "_blank" : undefined}
      className={`block p-5 border transition-colors ${
        primary
          ? "bg-gold-500/10 border-gold-400 hover:bg-gold-500/20"
          : "bg-white border-ink-950/10 hover:border-gold-400 hover:bg-ivory-50"
      }`}
    >
      <p className="font-display text-lg text-ink-950 mb-1">{label}</p>
      <p className="text-xs text-ink-700 leading-relaxed font-light">{desc}</p>
    </Link>
  );
}
