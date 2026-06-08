import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import IgAdminForm from "./IgAdminForm";
import { fetchInstagramPosts, getSiteSettings } from "@/lib/instagram";

export const metadata = { title: "IG 影片管理 | 金閃閃後台" };

interface PinnedRow {
  slot: number;
  shortcode: string;
  is_video: boolean;
  source_url: string | null;
}

export default async function IgAdminPage() {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // 撈現有 6 個 slot 設定
  let pinned: PinnedRow[] = [];
  if (SUPABASE_URL && SERVICE_KEY) {
    const sb = createClient(SUPABASE_URL, SERVICE_KEY, {
      auth: { persistSession: false },
    });
    const { data } = await sb
      .from("ig_pinned")
      .select("*")
      .order("slot", { ascending: true });
    pinned = (data ?? []) as PinnedRow[];
  }

  // 抓 IG 最新 (fallback,給空 slot 預覽) + 當前大小設定
  const [latest, settings] = await Promise.all([
    fetchInstagramPosts(6),
    getSiteSettings(),
  ]);

  // 6 個 slot 對應 source_url (空就 null)
  const slots: (PinnedRow | null)[] = Array.from({ length: 6 }, (_, i) => {
    return pinned.find((p) => p.slot === i + 1) ?? null;
  });

  return (
    <div className="p-4 sm:p-8 md:p-12 max-w-4xl">
      <header className="mb-5 sm:mb-8">
        <Link
          href="/admin"
          className="text-xs sm:text-sm text-ink-500 hover:text-ink-950 mb-2 sm:mb-3 inline-block"
        >
          ← 回總覽
        </Link>
        <p className="hidden sm:block font-sans tracking-[0.3em] text-[10px] text-gold-600 uppercase mb-2 font-medium">
          Instagram · 首頁 IG 影片
        </p>
        <h1 className="font-display text-2xl sm:text-4xl text-ink-950">首頁 IG 影片管理</h1>
        <p className="text-xs sm:text-sm text-ink-700 mt-1 sm:mt-2">
          首頁 IG 區塊有 6 格,每格可以手動指定影片,沒指定的會自動抓 IG 最新貼文補位。
        </p>
      </header>

      <details className="mb-4 sm:mb-6 bg-blue-50 border border-blue-200 text-blue-900 text-xs leading-loose group">
        <summary className="px-4 sm:px-5 py-3 cursor-pointer font-medium select-none">
          💡 怎麼貼影片連結?(點開看)
        </summary>
        <div className="px-4 sm:px-5 pb-4">
          1. 打開 IG App,找到想 highlight 的影片<br />
          2. 影片右下「分享」→「複製連結」<br />
          3. 連結會是 <code className="bg-white px-1.5 py-0.5">https://www.instagram.com/reel/DZxxxxxx/</code><br />
          4. 貼到下面對應的格子,儲存即可<br />
          5. 留空的格子會自動抓你 IG 最新貼文補進來
        </div>
      </details>

      <IgAdminForm slots={slots} latestForFallback={latest} currentSize={settings.ig_size} />
    </div>
  );
}
