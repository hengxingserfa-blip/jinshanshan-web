-- 金閃閃銀樓 - 種子資料 (示意, 可隨意覆寫)
-- 跑完這段後, 前台會立刻看到從 DB 撈出來的真實資料.

-- ============================================================
-- 商品 (12 件示意, 之後在後台新增正式商品)
-- ============================================================
insert into public.products (slug, category, name_zh, name_en, weight_qian, purity, featured, sort_order) values
  ('classic-ring',        'rings',      '經典平面戒指',     'Classic Plain Ring',         3.5, '9999', true,  1),
  ('carved-floral-ring',  'rings',      '鏤空雕花戒指',     'Carved Floral Ring',         4.2, '9999', false, 2),
  ('classical-necklace',  'necklaces',  '古典花鏈項鍊',     'Classical Floral Necklace',  6.5, '9999', true,  3),
  ('double-wave-necklace','necklaces',  '雙圈水波項鍊',     'Double Wave Necklace',       7.0, '9999', false, 4),
  ('round-bead-bracelet', 'bracelets',  '圓珠單圈手鏈',     'Round Bead Bracelet',        5.0, '9999', true,  5),
  ('fine-gold-bracelet',  'bracelets',  '細緻金線手鏈',     'Fine Gold Bracelet',         3.8, '9999', false, 6),
  ('engagement-pair',     'wedding',    '成雙訂婚對戒',     'Engagement Pair',            4.5, '9999', false, 7),
  ('minimal-wedding',     'wedding',    '簡約結婚對戒',     'Minimal Wedding Pair',       3.5, '9999', false, 8),
  ('engraved-baby',       'newborn',    '雕花彌月金牌',     'Engraved Baby Pendant',      1.0, '9999', false, 9),
  ('fortune-baby-lock',   'newborn',    '圓滿福氣金鎖',     'Fortune Baby Lock',          1.5, '9999', false, 10),
  ('bullion-1-tael',      'bullion',    '9999 純金條 一兩', '9999 Pure Gold Bar 1 Tael', 10.0, '9999', false, 11),
  ('bullion-5-qian',      'bullion',    '9999 純金條 五錢', '9999 Pure Gold Bar 5 Qian',  5.0, '9999', false, 12)
on conflict (slug) do nothing;

-- ============================================================
-- 文章 4 篇示意
-- ============================================================
insert into public.articles
  (slug, category, category_en, title_zh, excerpt_zh, content_zh, published, published_at) values
  ('gold-weight-units',
   '黃金知識', 'Knowledge',
   '黃金一錢是多少?台灣黃金重量單位一次搞懂',
   '1 錢 = 3.75 公克、1 兩 = 10 錢,但在國際金價跟台銀牌告之間怎麼換算?這篇用最簡單的方式告訴你。',
   '完整內文待後台編輯',
   true, now() - interval '9 days'),
  ('recycle-tips',
   '回收指南', 'Guide',
   '黃金回收前該注意的 5 件事 . 避免被扣耗損',
   '找回收店家前,先看這幾點:有沒有公開金價、會不會火燒、扣不扣耗損、純度怎麼檢測、有沒有發票。',
   '完整內文待後台編輯',
   true, now() - interval '19 days'),
  ('wedding-checklist',
   '婚嫁專題', 'Wedding',
   '結婚黃金怎麼挑?從訂婚到大囍的金飾準備清單',
   '訂婚要準備幾兩?囍餅金飾常見配置是什麼?中壢結婚黃金一份完整清單給你參考。',
   '完整內文待後台編輯',
   true, now() - interval '31 days'),
  ('gold-care',
   '保養', 'Care',
   '金飾戴久變黑?3 個常見原因與保養方式',
   '純金理論上不會氧化,但為什麼還是會看起來「沒以前亮」?問題其實出在這些日常細節。',
   '完整內文待後台編輯',
   true, now() - interval '44 days')
on conflict (slug) do nothing;

-- ============================================================
-- 5 月限定母親節活動
-- ============================================================
insert into public.promotions
  (title_zh, title_en, body_zh, starts_at, ends_at, cta_label, cta_url, active) values
  ('5 月限定',
   'May Special',
   '母親節黃金回收加碼活動進行中',
   date_trunc('month', now()),
   date_trunc('month', now()) + interval '1 month' - interval '1 day',
   '詢問詳情',
   '/#contact',
   true);
