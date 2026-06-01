import { getServerSupabase } from "@/lib/supabase/server";
import type { Article } from "@/lib/supabase/types";
import { IMG } from "@/lib/images";

const FALLBACK: Article[] = [
  {
    id: "a1",
    slug: "gold-weight-units",
    category: "黃金知識",
    category_en: "Knowledge",
    title_zh: "黃金一錢是多少?台灣黃金重量單位一次搞懂",
    excerpt_zh:
      "1 錢 = 3.75 公克、1 兩 = 10 錢,但在國際金價跟台銀牌告之間怎麼換算?這篇用最簡單的方式告訴你。",
    content_zh: "完整內文待後台編輯",
    hero_image_url: IMG.bar,
    published: true,
    published_at: "2026-05-20",
    created_at: "",
    updated_at: "",
  },
  {
    id: "a2",
    slug: "recycle-tips",
    category: "回收指南",
    category_en: "Guide",
    title_zh: "黃金回收前該注意的 5 件事 . 避免被扣耗損",
    excerpt_zh:
      "找回收店家前,先看這幾點:有沒有公開金價、會不會火燒、扣不扣耗損、純度怎麼檢測、有沒有發票。",
    content_zh: "完整內文待後台編輯",
    hero_image_url: IMG.necklace1,
    published: true,
    published_at: "2026-05-10",
    created_at: "",
    updated_at: "",
  },
  {
    id: "a3",
    slug: "wedding-checklist",
    category: "婚嫁專題",
    category_en: "Wedding",
    title_zh: "結婚黃金怎麼挑?從訂婚到大囍的金飾準備清單",
    excerpt_zh:
      "訂婚要準備幾兩?囍餅金飾常見配置是什麼?中壢結婚黃金一份完整清單給你參考。",
    content_zh: "完整內文待後台編輯",
    hero_image_url: IMG.pair,
    published: true,
    published_at: "2026-04-28",
    created_at: "",
    updated_at: "",
  },
  {
    id: "a4",
    slug: "gold-care",
    category: "保養",
    category_en: "Care",
    title_zh: "金飾戴久變黑?3 個常見原因與保養方式",
    excerpt_zh:
      "純金理論上不會氧化,但為什麼還是會看起來「沒以前亮」?問題其實出在這些日常細節。",
    content_zh: "完整內文待後台編輯",
    hero_image_url: IMG.ring1,
    published: true,
    published_at: "2026-04-15",
    created_at: "",
    updated_at: "",
  },
];

export async function getArticles(): Promise<Article[]> {
  const supabase = await getServerSupabase();
  if (!supabase) return FALLBACK;
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });
  if (error || !data || data.length === 0) return FALLBACK;
  return data as Article[];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const all = await getArticles();
  return all.find((a) => a.slug === slug) ?? null;
}
