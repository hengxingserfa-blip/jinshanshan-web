-- 金閃閃銀樓 - Row Level Security
-- 開啟 RLS, 公開讀取上架/已發布內容, 寫入只允許 service_role (後台 API)

alter table public.products             enable row level security;
alter table public.articles             enable row level security;
alter table public.promotions           enable row level security;
alter table public.gold_price_overrides enable row level security;

-- ------------------ products ------------------
drop policy if exists "products_public_read" on public.products;
create policy "products_public_read"
  on public.products for select
  using (available = true);

-- ------------------ articles ------------------
drop policy if exists "articles_public_read" on public.articles;
create policy "articles_public_read"
  on public.articles for select
  using (published = true);

-- ------------------ promotions ------------------
drop policy if exists "promotions_public_read" on public.promotions;
create policy "promotions_public_read"
  on public.promotions for select
  using (active = true and now() between starts_at and ends_at);

-- ------------------ gold_price_overrides ------------------
drop policy if exists "gold_overrides_public_read" on public.gold_price_overrides;
create policy "gold_overrides_public_read"
  on public.gold_price_overrides for select
  using (active = true and date = current_date);

-- 寫入政策: 之後 Phase 4 後台會用 service_role key (RLS 自動繞過),
-- 或加上認證後的 admin role policy. 現階段不開放公開寫入.
