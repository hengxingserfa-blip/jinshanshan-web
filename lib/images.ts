// Unsplash 免費商用授權圖片. 全部以「黃金為主」的選圖.
const u = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=85`;

export const IMG = {
  // Hero:堆疊的 999.9 FINE GOLD 金條近拍.奢華精品銀樓質感.
  heroJewelry: u("1610375461369-d613b564f4c4", 1600),
  aboutAtmosphere: u("1611967164521-abae8fba4668", 1400),

  ring1: u("1622398925373-3f91b1e275f5"),
  ring2: u("1503342394128-c104d54dba01"),
  necklace1: u("1599643478518-a784e5dc4c8f"),
  necklace2: u("1633934542430-0905ccb5f050"),
  bracelet1: u("1611591437281-460bfbe1220a"),
  bracelet2: u("1610375461246-83df859d849d"),
  bar: u("1573408301185-9146fe634ad0"),
  pair: u("1605100804763-247f67b3557e"),
  fancy: u("1567721913486-6585f069b332"),
  glow: u("1602173574767-37ac01994b2a"),
};
