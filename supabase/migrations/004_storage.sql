-- 金閃閃銀樓 - Supabase Storage 設定
-- 建立 media bucket 給商品/文章圖片用
-- 跑法:Supabase Dashboard > SQL Editor > 貼上 > Run

-- ============================================================
-- 建立 public bucket "media"
-- ============================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media',
  'media',
  true,                                                         -- public read
  10485760,                                                     -- 10 MB 上限
  array['image/jpeg','image/png','image/webp','image/gif']      -- 只允許圖片
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- ============================================================
-- RLS 政策
-- ============================================================
-- 任何人都能讀
drop policy if exists "media_public_read" on storage.objects;
create policy "media_public_read"
  on storage.objects for select
  using (bucket_id = 'media');

-- 寫入交給 service_role (後台 Server Action 用 service-role key, 自動繞 RLS)
-- 如果要用 Supabase Auth + 後台帳號角色, 可改:
-- create policy "media_authenticated_write" on storage.objects for insert
--   using (bucket_id = 'media' and auth.role() = 'authenticated');
