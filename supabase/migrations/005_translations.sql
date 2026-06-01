-- 金閃閃銀樓 - Phase 5.5 多語內容欄位
-- 為 products / articles / promotions 加 translations JSONB 欄位
-- 格式:
--   {
--     "en": { "name": "...", "description": "..." },
--     "vi": { "name": "...", "description": "..." },
--     "id": { ... }, "fil": { ... }, "th": { ... }
--   }
-- 中文 zh-TW 一律走原本的 *_zh 欄位.

alter table public.products
  add column if not exists translations jsonb not null default '{}'::jsonb;

alter table public.articles
  add column if not exists translations jsonb not null default '{}'::jsonb;

alter table public.promotions
  add column if not exists translations jsonb not null default '{}'::jsonb;

-- 加 GIN index 讓未來想做 "搜尋越南文商品名" 之類有效率
create index if not exists products_translations_idx
  on public.products using gin (translations);

create index if not exists articles_translations_idx
  on public.articles using gin (translations);
