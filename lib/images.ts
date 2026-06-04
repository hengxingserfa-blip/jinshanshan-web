// Unsplash 免費商用授權圖片 + Supabase Storage 的真實商品照
const u = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=85`;

// 金閃閃 Supabase Storage 真實商品照
const ss = (sku: string) =>
  `https://jwzdhnmxlybeikysbokf.supabase.co/storage/v1/object/public/media/products/${sku}.jpg`;

export const IMG = {
  // Hero:堆疊的 999.9 FINE GOLD 金條近拍.奢華精品銀樓質感.
  heroJewelry: u("1610375461369-d613b564f4c4", 1600),
  aboutAtmosphere: u("1611967164521-abae8fba4668", 1400),

  // 節慶分類卡 — 全部用金閃閃真實商品照(2026-06-04 替換)
  // 對應 OccasionCategories.tsx 的 6 張卡片
  pair:      ss("60519581"),  // 結婚囍金 → 莫比烏斯戒指
  fancy:     ss("60519441"),  // 彌月禮品 → 蝴蝶平安鎖
  ring1:     ss("60519276"),  // 訂婚對戒 → 波浪戒指
  necklace2: ss("60519253"),  // 母親節獻禮 → 花朵串珠項鍊
  bar:       ss("60519256"),  // 過年招財 → 金貔貅擺件
  bracelet1: ss("60519254"),  // 投資金條 → 9999 純金條 50 錢

  // 其他保留 Unsplash(這些目前沒用到節慶卡,留著當備用)
  ring2: u("1503342394128-c104d54dba01"),
  necklace1: u("1599643478518-a784e5dc4c8f"),
  bracelet2: u("1610375461246-83df859d849d"),
  glow: u("1602173574767-37ac01994b2a"),
};
