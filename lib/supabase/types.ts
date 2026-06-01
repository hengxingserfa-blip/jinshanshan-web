// 對應 supabase/migrations/001_schema.sql 的資料表
// Phase 3 階段:這些 type 描述後端形狀,前端 helper 由這份對應

export type Locale = "zh-TW" | "vi" | "en" | "id" | "fil" | "th";

export interface Product {
  id: string;
  slug: string;
  category: "rings" | "necklaces" | "bracelets" | "wedding" | "newborn" | "bullion" | "custom";
  name_zh: string;
  name_en: string | null;
  description_zh: string | null;
  image_url: string | null;
  weight_qian: number | null;
  purity: string | null;
  featured: boolean;
  available: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  slug: string;
  category: string;
  category_en: string;
  title_zh: string;
  excerpt_zh: string;
  content_zh: string;
  hero_image_url: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Promotion {
  id: string;
  title_zh: string;
  title_en: string | null;
  body_zh: string;
  starts_at: string;
  ends_at: string;
  cta_label: string | null;
  cta_url: string | null;
  active: boolean;
  created_at: string;
}

export interface GoldPriceOverride {
  id: string;
  date: string;
  price_9999_qian: number;
  note: string | null;
  active: boolean;
  created_at: string;
}

// Supabase JS v2 需要 Database 帶 Views/Functions/Enums/CompositeTypes 空欄位,
// 不然 Insert/Update 會被推斷成 never.
type Empty = { [K in never]: never };

type TableDef<TRow> = {
  Row: TRow;
  Insert: Partial<TRow>;
  Update: Partial<TRow>;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      products: TableDef<Product>;
      articles: TableDef<Article>;
      promotions: TableDef<Promotion>;
      gold_price_overrides: TableDef<GoldPriceOverride>;
    };
    Views: Empty;
    Functions: Empty;
    Enums: Empty;
    CompositeTypes: Empty;
  };
};
