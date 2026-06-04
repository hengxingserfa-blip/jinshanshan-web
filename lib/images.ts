// Unsplash 免費商用授權圖片(主題:純金奢華精品)
const u = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=85`;

export const IMG = {
  // Hero:堆疊的 999.9 FINE GOLD 金條近拍.奢華精品銀樓質感.
  heroJewelry: u("1610375461369-d613b564f4c4", 1600),
  aboutAtmosphere: u("1611967164521-abae8fba4668", 1400),

  // 節慶分類卡 — 精選黃金主題 Unsplash 庫存照(2026-06-04 重新挑選)
  pair:      u("1554047310-ab6170fc7b10"),  // 結婚囍金 → 對戒石上(綠色 bokeh)
  fancy:     u("1761210875101-1273b9ae5600"), // 彌月禮品 → 愛心金墜配名字珠
  ring1:     u("1567523977592-7959bc5df51e"), // 訂婚對戒 → 鑽石金戒
  necklace2: u("1705326454924-f6777522b030"), // 母親節獻禮 → 水滴形金墜項鍊
  bar:       u("1633176640669-44bd6adaa662"), // 過年招財 → 招財進寶金錢幣
  bracelet1: u("1718752773283-de1f92513671"), // 投資金條 → 9999 純金條堆疊

  // 備用(全部黃金主題,避免亂選)
  ring2:     u("1605100804763-247f67b3557e"),  // 黃金戒指特寫(備用)
  necklace1: u("1599643478518-a784e5dc4c8f"),
  bracelet2: u("1610375461246-83df859d849d"),
  glow:      u("1602173574767-37ac01994b2a"),
};
