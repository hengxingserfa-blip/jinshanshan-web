-- 金閃閃銀樓 SHINY GOLD Jeweller's
-- Phase 3 基礎 schema
-- 跑法:Supabase Dashboard > SQL Editor > 貼上整段 > Run

-- ============================================================
-- 共用:updated_at 自動更新 trigger
-- ============================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================
-- 商品 products
-- ============================================================
create table if not exists public.products (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  category      text not null check (category in
                  ('rings','necklaces','bracelets','wedding','newborn','bullion','custom')),
  name_zh       text not null,
  name_en       text,
  description_zh text,
  image_url     text,
  weight_qian   numeric(10,2),
  purity        text,
  featured      boolean not null default false,
  available     boolean not null default true,
  sort_order    integer not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists products_category_idx   on public.products(category);
create index if not exists products_available_idx  on public.products(available) where available;
create index if not exists products_featured_idx   on public.products(featured) where featured;
create index if not exists products_sort_idx       on public.products(sort_order);
create trigger products_updated before update on public.products
  for each row execute function public.set_updated_at();

-- ============================================================
-- 文章 articles (金飾知識專欄)
-- ============================================================
create table if not exists public.articles (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  category      text not null,
  category_en   text not null,
  title_zh      text not null,
  excerpt_zh    text,
  content_zh    text,
  hero_image_url text,
  published     boolean not null default false,
  published_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists articles_published_idx on public.articles(published, published_at desc) where published;
create index if not exists articles_category_idx  on public.articles(category);
create trigger articles_updated before update on public.articles
  for each row execute function public.set_updated_at();

-- ============================================================
-- 促銷 promotions (TopBar 顯示用)
-- ============================================================
create table if not exists public.promotions (
  id           uuid primary key default gen_random_uuid(),
  title_zh     text not null,
  title_en     text,
  body_zh      text not null,
  starts_at    timestamptz not null,
  ends_at      timestamptz not null,
  cta_label    text,
  cta_url      text,
  active       boolean not null default true,
  created_at   timestamptz not null default now()
);
create index if not exists promotions_active_idx on public.promotions(active, starts_at, ends_at);

-- ============================================================
-- 金價手動覆寫 gold_price_overrides
-- (老闆每天早上開店 LINE 詢國際後, 可在後台覆寫一個更精準的 9999 回收價)
-- ============================================================
create table if not exists public.gold_price_overrides (
  id              uuid primary key default gen_random_uuid(),
  date            date not null unique,
  price_9999_qian integer not null,
  note            text,
  active          boolean not null default true,
  created_at      timestamptz not null default now()
);
create index if not exists gold_overrides_date_idx on public.gold_price_overrides(date desc);
