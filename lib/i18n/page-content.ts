// 子頁面長文 6 語版本. 跟 dictionary.ts 分開放避免主檔過大.
// zh-TW 為原稿. 其他 5 語為初版翻譯, 待母語人士校稿.

import type { Locale } from "./types";

// ────────────────────────────────────────────────────────────────
// About 頁面內容
// ────────────────────────────────────────────────────────────────
export type AboutContent = {
  story_eyebrow: string;
  story_title_a: string;
  story_title_b_italic: string;
  story_title_c: string;
  paragraphs: [string, string, string, string];
  values_eyebrow: string;
  values_title: string;
  values: [
    { num: "I"; en: string; title: string; body: string },
    { num: "II"; en: string; title: string; body: string },
    { num: "III"; en: string; title: string; body: string }
  ];
  why_eyebrow: string;
  why_title: string;
  why: [
    { en: string; title: string; body: string },
    { en: string; title: string; body: string },
    { en: string; title: string; body: string }
  ];
};

const ABOUT_ZH_TW: AboutContent = {
  story_eyebrow: "Our Story",
  story_title_a: "一家從這條街上",
  story_title_b_italic: "長出來",
  story_title_c: "的小店",
  paragraphs: [
    "金閃閃銀樓開在桃園中壢中和路 108 號。一家不大的店,做的是街坊鄰居的生意。",
    "結婚、彌月、訂婚、舊金換新、回收、修飾 —— 鄰居們有大大小小的事,都會走進我們的小店找我們聊聊。",
    "中壢是一座匯集各國朋友的城市。所以我們的櫃檯前,常常坐著從越南、印尼、菲律賓、泰國來的朋友。語言不一定通,但只要走進來,我們會用最簡單的方式,讓你買得安心、賣得放心。",
    "這就是金閃閃想做的銀樓 —— 一家中壢街坊鄰居的小店,也是一家各國朋友都能放心走進來的銀樓。",
  ],
  values_eyebrow: "Our Values",
  values_title: "我們相信的三件事",
  values: [
    { num: "I",   en: "Transparency", title: "公開透明",   body: "當日金價即時公開,現場秤重每一筆都看得到。離店前你都能清楚知道每一個數字怎麼算出來。" },
    { num: "II",  en: "Integrity",    title: "誠信品質",   body: "金飾來源、純度、重量都附上證明文件。我們相信,信任不是口號,是一筆一筆累積出來的。" },
    { num: "III", en: "Welcome",      title: "誰來都一樣", body: "中壢是一座有各國朋友的城市。中文、越南、印尼、菲律賓、泰文 —— 走進店裡,你就是我們的朋友。" },
  ],
  why_eyebrow: "Why Shiny Gold",
  why_title: "為什麼選擇金閃閃",
  why: [
    { en: "No Hidden Cost",  title: "絕不扣耗損", body: "業界常見的「耗損費」、「火燒費」一律不收。實際金重多少,就算多少。" },
    { en: "Multi-language",  title: "多語溝通",   body: "中文、Tiếng Việt、Bahasa Indonesia、Filipino、ภาษาไทย —— 我們會用最簡單的方式讓您聽得懂。" },
    { en: "Same Day",        title: "當日結清",   body: "舊金回收當日現金付清,不拖延、不分期、不扣手續費。" },
  ],
};

const ABOUT_EN: AboutContent = {
  story_eyebrow: "Our Story",
  story_title_a: "A small shop",
  story_title_b_italic: "grown",
  story_title_c: "from this street",
  paragraphs: [
    "Shiny Gold sits at 108 Zhonghe Rd, Zhongli. A small shop, doing business with the neighbours.",
    "Weddings, newborn gifts, engagement rings, old-for-new swaps, buy-backs, repairs — neighbours come in for everything big and small, just to talk.",
    "Zhongli is a city where friends from many countries live. So at our counter, we often have friends from Vietnam, Indonesia, the Philippines, and Thailand. Language may not always be perfect — but once you walk in, we'll find the simplest way to make sure you buy and sell with peace of mind.",
    "That's the jeweller Shiny Gold wants to be — a neighbourhood shop in Zhongli, and a place where friends from any country can walk in without hesitation.",
  ],
  values_eyebrow: "Our Values",
  values_title: "Three things we believe in",
  values: [
    { num: "I",   en: "Transparency", title: "Transparency",     body: "Today's price is published live, weighed in front of you. You'll see exactly how every number is calculated before you leave." },
    { num: "II",  en: "Integrity",    title: "Integrity",        body: "Source, purity, and weight come with certificates. Trust isn't a slogan — it's earned, one transaction at a time." },
    { num: "III", en: "Welcome",      title: "Everyone welcome", body: "Zhongli welcomes friends from every country. Chinese, Vietnamese, Indonesian, Filipino, Thai — once you walk in, you're our friend." },
  ],
  why_eyebrow: "Why Shiny Gold",
  why_title: "Why choose us",
  why: [
    { en: "No Hidden Cost",  title: "No deductions",  body: "No 'loss fees' or 'fire fees' like other shops. What we weigh is what you get paid for." },
    { en: "Multi-language",  title: "Multi-language", body: "Mandarin, Tiếng Việt, Bahasa Indonesia, Filipino, ภาษาไทย — we'll explain in the simplest way." },
    { en: "Same Day",        title: "Same-day cash",  body: "Cash on the spot for buy-backs. No delay, no instalments, no handling fees." },
  ],
};

const ABOUT_VI: AboutContent = {
  story_eyebrow: "Câu chuyện của chúng tôi",
  story_title_a: "Một tiệm nhỏ",
  story_title_b_italic: "lớn lên",
  story_title_c: "từ con đường này",
  paragraphs: [
    "Tiệm Vàng Sang Lấy nằm ở 108 đường Trung Hòa, Trung Lịch. Một tiệm nhỏ, làm ăn với hàng xóm.",
    "Cưới hỏi, đầy tháng, đính hôn, đổi vàng cũ, thu mua, sửa chữa — hàng xóm ghé vào vì chuyện lớn nhỏ, chỉ để trò chuyện cũng được.",
    "Trung Lịch là thành phố có bạn bè từ nhiều quốc gia. Trước quầy của chúng tôi thường có bạn từ Việt Nam, Indonesia, Philippines, Thái Lan. Ngôn ngữ không phải lúc nào cũng thuận, nhưng khi bạn bước vào, chúng tôi sẽ tìm cách đơn giản nhất để bạn mua bán an tâm.",
    "Đó là tiệm vàng Sang Lấy muốn trở thành — một tiệm nhỏ của khu phố Trung Lịch, cũng là nơi bạn bè từ mọi quốc gia có thể yên tâm bước vào.",
  ],
  values_eyebrow: "Giá trị cốt lõi",
  values_title: "Ba điều chúng tôi tin",
  values: [
    { num: "I",   en: "Transparency", title: "Minh bạch",     body: "Giá vàng trong ngày công khai, cân ngay trước mặt bạn. Trước khi rời tiệm, bạn biết rõ từng con số được tính thế nào." },
    { num: "II",  en: "Integrity",    title: "Uy tín",        body: "Nguồn gốc, độ tinh khiết, trọng lượng đều có chứng nhận. Niềm tin không phải khẩu hiệu — là tích lũy từng giao dịch." },
    { num: "III", en: "Welcome",      title: "Ai cũng vậy",   body: "Trung Lịch chào đón bạn từ mọi quốc gia. Tiếng Trung, Việt, Indonesia, Filipino, Thái — bước vào tiệm rồi, bạn là bạn của chúng tôi." },
  ],
  why_eyebrow: "Vì sao chọn Sang Lấy",
  why_title: "Vì sao chọn chúng tôi",
  why: [
    { en: "No Hidden Cost",  title: "Không trừ hao",       body: "Không 'phí hao mòn', không 'phí đốt'. Cân được bao nhiêu, trả bấy nhiêu." },
    { en: "Multi-language",  title: "Đa ngôn ngữ",         body: "Trung, Việt, Indonesia, Filipino, Thái — chúng tôi sẽ giải thích cách dễ hiểu nhất." },
    { en: "Same Day",        title: "Tiền mặt trong ngày", body: "Thu mua vàng nhận tiền mặt ngay. Không trì hoãn, không trả góp, không phí thủ tục." },
  ],
};

const ABOUT_ID: AboutContent = {
  story_eyebrow: "Cerita kami",
  story_title_a: "Toko kecil",
  story_title_b_italic: "yang tumbuh",
  story_title_c: "dari jalan ini",
  paragraphs: [
    "Shiny Gold berdiri di Jl. Zhonghe 108, Zhongli. Toko kecil yang berbisnis dengan tetangga.",
    "Pernikahan, newborn, tunangan, tukar tambah, pembelian emas, reparasi — tetangga datang untuk hal besar dan kecil, sekadar ngobrol pun boleh.",
    "Zhongli adalah kota dengan teman dari berbagai negara. Di depan konter kami sering ada teman dari Vietnam, Indonesia, Filipina, Thailand. Bahasa mungkin tak selalu lancar, tetapi begitu Anda masuk, kami cari cara paling sederhana agar Anda merasa aman saat membeli dan menjual.",
    "Itulah toko emas yang ingin dibangun Shiny Gold — toko kecil tetangga Zhongli, sekaligus tempat yang nyaman bagi teman dari segala negara.",
  ],
  values_eyebrow: "Nilai kami",
  values_title: "Tiga hal yang kami percaya",
  values: [
    { num: "I",   en: "Transparency", title: "Transparansi",    body: "Harga hari ini diumumkan langsung, ditimbang di depan Anda. Sebelum pulang, Anda tahu persis bagaimana setiap angka dihitung." },
    { num: "II",  en: "Integrity",    title: "Integritas",      body: "Asal, kemurnian, dan berat ada sertifikatnya. Kepercayaan bukan slogan — dibangun tiap transaksi." },
    { num: "III", en: "Welcome",      title: "Semua sama-sama", body: "Zhongli menyambut teman dari semua negara. Mandarin, Vietnam, Indonesia, Filipina, Thailand — begitu masuk toko, Anda adalah teman kami." },
  ],
  why_eyebrow: "Mengapa Shiny Gold",
  why_title: "Mengapa pilih kami",
  why: [
    { en: "No Hidden Cost",  title: "Tanpa potongan", body: "Tidak ada 'biaya hilang' atau 'biaya bakar' seperti toko lain. Yang ditimbang itulah yang dibayar." },
    { en: "Multi-language",  title: "Banyak bahasa",  body: "Mandarin, Vietnam, Indonesia, Filipina, Thailand — kami jelaskan dengan cara paling sederhana." },
    { en: "Same Day",        title: "Cash hari ini",  body: "Pembelian emas tunai langsung. Tanpa tunda, tanpa cicilan, tanpa biaya administrasi." },
  ],
};

const ABOUT_FIL: AboutContent = {
  story_eyebrow: "Aming Kuwento",
  story_title_a: "Maliit na tindahan",
  story_title_b_italic: "lumaki",
  story_title_c: "sa kalye na ito",
  paragraphs: [
    "Nasa 108 Zhonghe Rd, Zhongli ang Shiny Gold. Maliit na tindahan na nakikipagnegosyo sa mga kapitbahay.",
    "Kasal, newborn, pakikipagtipan, palit ng lumang ginto, pagbili, repair — pumapasok ang mga kapitbahay para sa malaking bagay o maliit, makipag-usap lang ay okay rin.",
    "Maraming kaibigan mula sa iba't ibang bansa sa Zhongli. Sa harap ng aming counter, madalas mayroong kaibigan mula sa Vietnam, Indonesia, Pilipinas, Thailand. Hindi laging maganda ang wika, ngunit kapag pumasok kayo, gagamit kami ng pinakasimpleng paraan para makaramdam kayo ng kapanatagan sa pagbili at pagbebenta.",
    "Iyan ang gustong maging Shiny Gold — maliit na tindahan ng kapitbahay sa Zhongli, at lugar kung saan ang kaibigan mula sa anumang bansa ay malugod na tinatanggap.",
  ],
  values_eyebrow: "Aming Pinaninindigan",
  values_title: "Tatlong bagay na pinaniniwalaan namin",
  values: [
    { num: "I",   en: "Transparency", title: "Transparente",     body: "Live na presyo ngayon, tinitimbang sa harap mo. Bago kayo umalis, malalaman ninyo kung paano kinakalkula ang bawat numero." },
    { num: "II",  en: "Integrity",    title: "Integridad",        body: "May sertipiko ang pinagmulan, purity, at timbang. Tiwala ay hindi slogan — ito ay nakukuha sa bawat transaksyon." },
    { num: "III", en: "Welcome",      title: "Lahat ay malugod",  body: "Pinatatanggap ng Zhongli ang lahat ng bansa. Mandarin, Vietnam, Indonesia, Filipino, Thai — kapag pumasok kayo, kaibigan na namin kayo." },
  ],
  why_eyebrow: "Bakit Shiny Gold",
  why_title: "Bakit kami",
  why: [
    { en: "No Hidden Cost",  title: "Walang bawas",  body: "Walang 'loss fee' o 'fire fee' tulad ng ibang tindahan. Anumang timbangin namin, iyan ang bayad sa iyo." },
    { en: "Multi-language",  title: "Maraming wika", body: "Mandarin, Vietnamese, Indonesian, Filipino, Thai — ipapaliwanag namin sa pinakasimpleng paraan." },
    { en: "Same Day",        title: "Cash kaagad",   body: "Pagbili ng ginto cash agad sa parehong araw. Walang antala, walang installment, walang bayad sa pag-aasikaso." },
  ],
};

const ABOUT_TH: AboutContent = {
  story_eyebrow: "เรื่องราวของเรา",
  story_title_a: "ร้านเล็ก ๆ",
  story_title_b_italic: "ที่เติบโต",
  story_title_c: "จากถนนนี้",
  paragraphs: [
    "Shiny Gold ตั้งอยู่ที่ 108 ถ.จงเหอ จงลี่ ร้านเล็ก ๆ ที่ทำธุรกิจกับเพื่อนบ้าน",
    "งานแต่ง ครบเดือนเด็ก หมั้น เปลี่ยนทองเก่า รับซื้อ ซ่อม — เพื่อนบ้านเข้ามาทั้งเรื่องใหญ่และเล็ก หรือแค่มาคุยก็ได้",
    "จงลี่เป็นเมืองที่มีเพื่อนจากหลายประเทศ ที่หน้าเคาน์เตอร์ของเรามักมีเพื่อนจากเวียดนาม อินโดนีเซีย ฟิลิปปินส์ ไทย ภาษาอาจไม่คล่อง แต่เมื่อก้าวเข้าร้าน เราจะหาวิธีง่ายที่สุดให้คุณซื้อขายอย่างสบายใจ",
    "นั่นคือร้านทองที่ Shiny Gold อยากเป็น — ร้านเล็ก ๆ ของเพื่อนบ้านในจงลี่ และที่ที่เพื่อนจากทุกประเทศก้าวเข้ามาได้อย่างสบายใจ",
  ],
  values_eyebrow: "ค่านิยมของเรา",
  values_title: "สามสิ่งที่เราเชื่อ",
  values: [
    { num: "I",   en: "Transparency", title: "โปร่งใส",         body: "ราคาวันนี้เปิดเผยแบบเรียลไทม์ ชั่งต่อหน้าคุณ ก่อนออกจากร้านคุณจะรู้ว่าทุกตัวเลขคำนวณอย่างไร" },
    { num: "II",  en: "Integrity",    title: "ซื่อสัตย์",       body: "แหล่งที่มา ความบริสุทธิ์ และน้ำหนัก มีใบรับรอง ความไว้ใจไม่ใช่คำขวัญ — สะสมจากทุกธุรกรรม" },
    { num: "III", en: "Welcome",      title: "ทุกคนเหมือนกัน",  body: "จงลี่ต้อนรับเพื่อนจากทุกประเทศ จีน เวียดนาม อินโดนีเซีย ฟิลิปปินส์ ไทย — เข้าร้านแล้วคุณคือเพื่อนของเรา" },
  ],
  why_eyebrow: "ทำไม Shiny Gold",
  why_title: "ทำไมเลือกเรา",
  why: [
    { en: "No Hidden Cost",  title: "ไม่หักลด",          body: "ไม่มี 'ค่าเสียหาย' หรือ 'ค่าหลอม' แบบร้านอื่น น้ำหนักที่ชั่งได้เท่าไหร่ จ่ายเท่านั้น" },
    { en: "Multi-language",  title: "หลายภาษา",          body: "จีน เวียดนาม อินโดนีเซีย ฟิลิปปินส์ ไทย — เราจะอธิบายในแบบที่เข้าใจง่ายที่สุด" },
    { en: "Same Day",        title: "เงินสดวันเดียวกัน", body: "รับซื้อทองได้เงินสดทันที ไม่ล่าช้า ไม่ผ่อน ไม่มีค่าธรรมเนียม" },
  ],
};

export const ABOUT: Record<Locale, AboutContent> = {
  "zh-TW": ABOUT_ZH_TW,
  vi: ABOUT_VI,
  en: ABOUT_EN,
  id: ABOUT_ID,
  fil: ABOUT_FIL,
  th: ABOUT_TH,
};

export function getAbout(locale: Locale): AboutContent {
  return ABOUT[locale] ?? ABOUT["zh-TW"];
}

// ────────────────────────────────────────────────────────────────
// Services 詳細頁內容
// ────────────────────────────────────────────────────────────────
export type ServiceItem = {
  num: "I" | "II" | "III" | "IV";
  en: string;
  title: string;
  subtitle: string;
  body: string;
  steps_label: string;
  steps: string[];
};

export type ServicesContent = ServiceItem[];

const SERVICES_ZH_TW: ServicesContent = [
  { num: "I",  en: "Renewal",     title: "舊金換新", subtitle: "把記憶留下,把樣式更新",
    body: "抽屜裡那條外婆給的金鏈、結婚時的對戒,款式可能不適合現在的你,但金子的價值仍在。我們以當日金價試算原件價值、折抵新款,只需補上差價,讓老金飾以新樣貌重新回到身上。",
    steps_label: "流程 · STEPS",
    steps: ["帶舊金到店", "現場秤重 + 純度檢測", "試算可折抵金額", "從門市選擇新款", "補上差價、完成換購"] },
  { num: "II", en: "Recycle",     title: "舊金回收", subtitle: "公開金價,絕不扣耗損",
    body: "黃金回收價每日依國際金價波動,我們堅持公開當日報價、以電子秤精準秤重、清楚試算每一筆換算結果。確認金額後當日現金結清,過程透明,絕不扣除「耗損」或「火燒費」等模糊費用。",
    steps_label: "流程 · STEPS",
    steps: ["LINE 詢今日回收金價", "帶金飾到店", "現場公開秤重", "純度檢測 (K金 / 白金亦可)", "清楚試算回收金額", "同意後當日付清"] },
  { num: "III", en: "Boutique",    title: "飾金換購", subtitle: "看得到、摸得到、戴得住",
    body: "線上看圖再美,戴在手上才知道好不好看。我們的門市實體陳列從日常項鍊、手鐲到訂婚對戒、彌月金牌一應俱全,每件附上金重證明與保證卡,送禮、自用、傳家都安心。",
    steps_label: "特色 · FEATURES",
    steps: ["親手試戴每一件", "金重透明標示", "提供保證卡", "可現場討論改款或客製"] },
  { num: "IV", en: "Restoration", title: "修飾販售", subtitle: "讓老件再次戴回身上",
    body: "斷掉的金鏈想修、戒指放大縮小、款式想改、舊金牌想拋光重生 —— 把那條塵封在首飾盒底的老件交給我們,讓它有機會重新戴回身上,而不是一直躺在抽屜裡。",
    steps_label: "服務項目 · ITEMS",
    steps: ["斷鍊接線", "戒圍放大 / 縮小", "款式改造", "拋光翻新", "寶石重鑲"] },
];

const SERVICES_EN: ServicesContent = [
  { num: "I",  en: "Renewal",     title: "Old-for-New", subtitle: "Keep the memory, refresh the style.",
    body: "That gold chain from your grandmother, your wedding rings — the style may no longer suit you, but the gold value remains. We calculate today's value, apply it toward a new piece, and you only pay the difference. Let your old gold come back wearable.",
    steps_label: "Process · STEPS",
    steps: ["Bring your old gold to the shop", "Weighing + purity test on site", "Calculate the trade-in value", "Pick a new piece in store", "Pay the difference and you're done"] },
  { num: "II", en: "Recycle",     title: "Gold Buy-Back", subtitle: "Open price. No hidden deductions.",
    body: "Daily buy-back price follows the international gold market. We publish today's rate, weigh on a precision scale in front of you, and calculate every number clearly. Once you agree, cash is settled on the same day — no 'loss fee' or 'fire fee'.",
    steps_label: "Process · STEPS",
    steps: ["Ask today's price on LINE", "Bring the gold in", "Open weighing in store", "Purity test (K-gold / platinum welcome)", "Clear calculation of the buy-back value", "Cash on the spot once you agree"] },
  { num: "III", en: "Boutique",    title: "Jewellery Exchange", subtitle: "See it, touch it, wear it.",
    body: "Pictures online are pretty — but you only know how a piece feels once it's on your hand. Our boutique carries everyday necklaces, bracelets, engagement bands, newborn pendants — every piece comes with a weight certificate. For gifts, for yourself, for the next generation.",
    steps_label: "Features",
    steps: ["Try every piece in person", "Weight transparently marked", "Certificate included", "Restyle or custom on the spot"] },
  { num: "IV", en: "Restoration", title: "Repair & Refit", subtitle: "Bring old pieces back to life.",
    body: "Broken chains, resizing, restyling, polishing — give us that piece that's been sitting in the box and let it return to your everyday wear, not the drawer.",
    steps_label: "Items",
    steps: ["Chain repair", "Ring resizing", "Restyling", "Polishing and refinishing", "Stone resetting"] },
];

const SERVICES_VI: ServicesContent = [
  { num: "I", en: "Renewal", title: "Đổi vàng cũ lấy mới", subtitle: "Giữ ký ức, đổi mẫu mới.",
    body: "Sợi dây bà để lại, cặp nhẫn cưới — kiểu dáng có thể không hợp nữa, nhưng giá trị vàng vẫn còn. Chúng tôi tính theo giá hôm nay, áp vào mẫu mới, bạn chỉ cần bù phần chênh lệch. Để vàng cũ trở lại đeo được.",
    steps_label: "Quy trình · STEPS",
    steps: ["Mang vàng cũ đến tiệm", "Cân + kiểm tra độ tinh khiết tại chỗ", "Tính giá trị đổi", "Chọn mẫu mới tại tiệm", "Bù chênh lệch, hoàn tất"] },
  { num: "II", en: "Recycle", title: "Thu mua vàng", subtitle: "Giá công khai, không trừ hao.",
    body: "Giá thu mua hằng ngày theo thị trường vàng quốc tế. Chúng tôi công bố giá hôm nay, cân trên thiết bị chính xác trước mặt bạn, tính toán minh bạch từng con số. Đồng ý là nhận tiền mặt ngay trong ngày — không 'phí hao', không 'phí đốt'.",
    steps_label: "Quy trình · STEPS",
    steps: ["Hỏi giá hôm nay qua LINE", "Mang vàng đến tiệm", "Cân công khai tại chỗ", "Kiểm tra độ tinh khiết (K-gold/bạch kim đều được)", "Tính giá thu mua rõ ràng", "Đồng ý là nhận tiền mặt"] },
  { num: "III", en: "Boutique", title: "Đổi trang sức", subtitle: "Nhìn được, sờ được, đeo được.",
    body: "Ảnh online đẹp đến đâu, đeo lên tay mới biết. Tiệm chúng tôi có dây chuyền, vòng tay, nhẫn đính hôn, miếng vàng đầy tháng — mỗi món có giấy chứng nhận trọng lượng. Tặng quà, tự dùng, hay làm gia bảo đều yên tâm.",
    steps_label: "Đặc điểm",
    steps: ["Thử từng món tận tay", "Trọng lượng ghi rõ", "Có giấy chứng nhận", "Trao đổi mẫu hoặc đặt làm tại chỗ"] },
  { num: "IV", en: "Restoration", title: "Sửa chữa", subtitle: "Đưa món cũ trở lại trên người bạn.",
    body: "Dây bị đứt, nhẫn cần nới rộng/thu nhỏ, đổi mẫu, đánh bóng — đưa món đang nằm trong hộp cho chúng tôi, để nó trở lại bạn mỗi ngày, không phải trong ngăn kéo.",
    steps_label: "Dịch vụ",
    steps: ["Nối dây đứt", "Nới/thu nhỏ nhẫn", "Đổi mẫu", "Đánh bóng làm mới", "Thay đá"] },
];

const SERVICES_ID: ServicesContent = [
  { num: "I", en: "Renewal", title: "Tukar Tambah", subtitle: "Simpan kenangan, perbarui modelnya.",
    body: "Kalung nenek, cincin pernikahan — model mungkin sudah tak cocok lagi, tapi nilai emas tetap. Kami hitung dengan harga hari ini, terapkan ke model baru, Anda hanya bayar selisih. Bawa emas lama kembali bisa dipakai.",
    steps_label: "Proses · STEPS",
    steps: ["Bawa emas lama ke toko", "Timbang + uji kemurnian di tempat", "Hitung nilai tukar tambah", "Pilih model baru di toko", "Bayar selisih, selesai"] },
  { num: "II", en: "Recycle", title: "Pembelian Emas", subtitle: "Harga terbuka. Tanpa potongan.",
    body: "Harga pembelian harian mengikuti pasar emas internasional. Kami umumkan harga hari ini, timbang dengan timbangan presisi di depan Anda, hitung setiap angka transparan. Setuju langsung cash hari yang sama — tanpa 'biaya hilang' atau 'biaya bakar'.",
    steps_label: "Proses · STEPS",
    steps: ["Tanya harga hari ini via LINE", "Bawa emas ke toko", "Timbang terbuka di tempat", "Uji kemurnian (K-gold / platina juga)", "Hitung nilai pembelian dengan jelas", "Cash di tempat setelah setuju"] },
  { num: "III", en: "Boutique", title: "Tukar Perhiasan", subtitle: "Lihat, sentuh, pakai.",
    body: "Foto online manis, baru tahu rasanya kalau dipakai. Toko kami menyediakan kalung, gelang, cincin tunangan, liontin newborn — setiap karya dengan sertifikat berat. Hadiah, pribadi, atau pusaka, semua aman.",
    steps_label: "Keunggulan",
    steps: ["Coba setiap karya langsung", "Berat tertera jelas", "Disertai sertifikat", "Bisa modifikasi atau kustom di tempat"] },
  { num: "IV", en: "Restoration", title: "Reparasi", subtitle: "Bawa kembali perhiasan lama Anda.",
    body: "Kalung putus, cincin perlu diukur ulang, ubah desain, poles ulang — bawa kepada kami perhiasan yang menganggur, biarkan ia kembali ke Anda sehari-hari, bukan di laci.",
    steps_label: "Layanan",
    steps: ["Sambung kalung", "Ukur ulang cincin", "Modifikasi model", "Poles ulang", "Pasang ulang batu"] },
];

const SERVICES_FIL: ServicesContent = [
  { num: "I", en: "Renewal", title: "Palit ng Bago", subtitle: "Itago ang alaala, baguhin ang istilo.",
    body: "Ang kuwintas ng lola, ang singsing ng kasal — maaaring hindi na bagay ang istilo, ngunit nasa ginto pa rin ang halaga. Kalkulahin namin sa presyo ngayon, ipalit sa bagong modelo, bayaran lang ang sobra. Ibalik ang lumang ginto bilang nasusuot na bago.",
    steps_label: "Proseso · STEPS",
    steps: ["Dalhin ang lumang ginto sa tindahan", "Timbang + pagsusuri ng purity sa harap mo", "Kalkulahin ang halaga", "Pumili ng bagong piraso sa tindahan", "Bayaran ang sobra, tapos na"] },
  { num: "II", en: "Recycle", title: "Pagbili ng Ginto", subtitle: "Bukas na presyo. Walang bawas.",
    body: "Pang-araw-araw na presyo ng pagbili sumusunod sa pandaigdigang merkado ng ginto. Inilalathala namin ang presyo ngayon, tinitimbang sa precision scale sa harap mo, malinaw na kalkulasyon ng bawat numero. Pag pumayag ka, cash agad sa parehong araw — walang 'loss fee' o 'fire fee'.",
    steps_label: "Proseso · STEPS",
    steps: ["Tanungin ang presyo ngayon via LINE", "Dalhin ang ginto sa tindahan", "Bukas na timbang sa harap mo", "Pagsusuri ng purity (K-gold/platinum din)", "Malinaw na kalkulasyon ng halaga", "Cash sa kamay kapag pumayag ka"] },
  { num: "III", en: "Boutique", title: "Palit Alahas", subtitle: "Tingnan, hipuin, suotin.",
    body: "Maganda ang online photo, pero sa kamay mo lang malalaman. May kuwintas, pulseras, singsing ng pakikipagtipan, liontin newborn sa tindahan — bawat piraso may sertipiko ng timbang. Regalo, sariling gamit, o pamana, lahat panatag.",
    steps_label: "Tampok",
    steps: ["Subukan ang bawat piraso", "Malinaw ang timbang", "May sertipiko", "Pwedeng baguhin o pa-custom sa tindahan"] },
  { num: "IV", en: "Restoration", title: "Repair", subtitle: "Ibalik ang lumang alahas sa iyo.",
    body: "Putol na kadena, kailangang magpalaki/maliit ng singsing, baguhin ang istilo, pakintabin — ibigay sa amin ang alahas na nasa kahon, para bumalik sa iyo araw-araw, hindi sa drawer.",
    steps_label: "Serbisyo",
    steps: ["Pagdugtong ng kadena", "Pagpapalaki/maliit ng singsing", "Pagbabago ng istilo", "Pakintabin at refinish", "Palitan ng bato"] },
];

const SERVICES_TH: ServicesContent = [
  { num: "I", en: "Renewal", title: "เปลี่ยนทองเก่าเป็นใหม่", subtitle: "เก็บความทรงจำไว้ ปรับสไตล์ใหม่",
    body: "สร้อยจากย่า แหวนแต่งงาน — สไตล์อาจไม่เหมาะอีกแล้ว แต่มูลค่าทองยังอยู่ เราคำนวณตามราคาวันนี้ ใช้กับแบบใหม่ คุณจ่ายแค่ส่วนต่าง ทำให้ทองเก่ากลับมาสวมใส่ได้",
    steps_label: "ขั้นตอน · STEPS",
    steps: ["นำทองเก่ามาที่ร้าน", "ชั่ง + ตรวจความบริสุทธิ์ต่อหน้า", "คำนวณมูลค่า", "เลือกแบบใหม่ในร้าน", "จ่ายส่วนต่าง เสร็จเรียบร้อย"] },
  { num: "II", en: "Recycle", title: "รับซื้อทอง", subtitle: "ราคาเปิดเผย ไม่หักลด",
    body: "ราคารับซื้อรายวันตามตลาดทองนานาชาติ เราประกาศราคาวันนี้ ชั่งบนเครื่องชั่งแม่นยำต่อหน้าคุณ คำนวณแต่ละตัวเลขอย่างชัดเจน ตกลงราคาแล้วรับเงินสดในวันเดียวกัน — ไม่มี 'ค่าเสียหาย' หรือ 'ค่าหลอม'",
    steps_label: "ขั้นตอน · STEPS",
    steps: ["ถามราคาวันนี้ทาง LINE", "นำทองมาที่ร้าน", "ชั่งเปิดเผยต่อหน้า", "ตรวจความบริสุทธิ์ (K-gold/แพลทินั่มได้)", "คำนวณราคารับซื้ออย่างชัดเจน", "ตกลงราคาแล้วรับเงินสดทันที"] },
  { num: "III", en: "Boutique", title: "แลกเปลี่ยนเครื่องประดับ", subtitle: "เห็นได้ สัมผัสได้ ใส่ได้",
    body: "ภาพออนไลน์สวยแค่ไหน ก็ต้องลองใส่จริงถึงจะรู้ ร้านเรามีสร้อย กำไล แหวนหมั้น แผ่นทองครบเดือนเด็ก — ทุกชิ้นมีใบรับรองน้ำหนัก ของขวัญ ใช้เอง สืบทอด ก็มั่นใจได้",
    steps_label: "จุดเด่น",
    steps: ["ลองแต่ละชิ้นด้วยมือ", "น้ำหนักโปร่งใส", "มีใบรับรอง", "ปรับเปลี่ยนหรือสั่งทำได้ที่ร้าน"] },
  { num: "IV", en: "Restoration", title: "ซ่อมเครื่องประดับ", subtitle: "ทำให้ของเก่าสวมใส่ได้อีกครั้ง",
    body: "สร้อยขาด แหวนต้องปรับขนาด เปลี่ยนแบบ ขัดเงา — ฝากเครื่องประดับที่อยู่ในกล่องไว้กับเรา ให้มันกลับมาที่คุณทุกวัน ไม่ใช่ในลิ้นชัก",
    steps_label: "บริการ",
    steps: ["ต่อสร้อยขาด", "ขยาย/ย่อแหวน", "เปลี่ยนแบบ", "ขัดเงาและตกแต่งใหม่", "เปลี่ยนพลอย"] },
];

export const SERVICES: Record<Locale, ServicesContent> = {
  "zh-TW": SERVICES_ZH_TW,
  vi: SERVICES_VI,
  en: SERVICES_EN,
  id: SERVICES_ID,
  fil: SERVICES_FIL,
  th: SERVICES_TH,
};

export function getServices(locale: Locale): ServicesContent {
  return SERVICES[locale] ?? SERVICES["zh-TW"];
}

// ────────────────────────────────────────────────────────────────
// FAQ 頁面內容
// ────────────────────────────────────────────────────────────────
export type FaqItem = { q: string; a: string };
export type FaqGroup = { en: string; title: string; items: FaqItem[] };
export type FaqContent = FaqGroup[];

const FAQ_ZH_TW: FaqContent = [
  { en: "Recycle", title: "關於舊金回收", items: [
    { q: "黃金一錢多少錢?怎麼換算?", a: "黃金回收價每天會跟著國際金價浮動。台灣常用「錢」做單位,1 錢 = 3.75 公克。實際每錢多少錢請當日加 LINE 或來電詢問,我們會告訴你最即時的回收價。" },
    { q: "你們的回收會扣耗損嗎?", a: "不會。我們不扣「耗損費」、不收「火燒費」。實際秤出多少金重,就用當日金價乘以該重量,清楚試算。" },
    { q: "不確定金飾是不是純金,可以來檢測嗎?", a: "可以。我們門市備有專業驗金儀器,可現場檢測純度。即使最後您決定不回收,檢測也是免費的。" },
    { q: "沒有保證卡的舊金可以回收嗎?", a: "完全可以。許多舊金、家裡傳下來的飾品都沒有保證卡,只要金子是真的、純度檢測出來,我們就以當日金價回收。" },
    { q: "K金、白金、鉑金能回收嗎?", a: "可以。K金 (14K、18K)、白金、鉑金都收。回收價依各自含金量 / 純度換算。" },
  ]},
  { en: "Renewal", title: "關於舊金換新", items: [
    { q: "換新一定要補差價嗎?", a: "看情況。如果您舊金的金重比新款多,我們會退差額給您;反之則補差價。一切都以當日金價公開試算。" },
    { q: "舊金折抵的金額怎麼算?", a: "公式很簡單:舊金實際重量 × 純度 × 當日金價 = 可折抵金額。現場秤、現場算、客人看得到每一個數字。" },
    { q: "可以一邊換、一邊保留一些舊金的金額嗎?", a: "可以。例如舊金折抵超過新款的部分,我們可以直接現金結清差額。" },
  ]},
  { en: "Boutique", title: "關於商品與客製", items: [
    { q: "你們的金飾都附保證卡嗎?", a: "是的。所有出售的金飾都附上含金重證明的保證卡,日後若想轉手或回收都有依據。" },
    { q: "商品可以線上下單嗎?", a: "目前還在準備中。後台上線後將開放線上預訂與留位,完成後我們會更新公告。現階段請以 LINE 或電話聯絡。" },
    { q: "婚戒、對戒可以客製嗎?", a: "可以。從刻字、改款到完全客製打造都有提供,歡迎到店討論需求。" },
    { q: "彌月金牌可以刻字嗎?", a: "可以。寶寶姓名、出生日期、祝福語等都能刻。" },
  ]},
  { en: "Service", title: "關於服務", items: [
    { q: "需要預約嗎?", a: "不需要,門市每日 10:30 – 20:30 都歡迎直接來店。如果是大額交易或特殊客製,建議先 LINE 預約讓我們先準備。" },
    { q: "你們有提供修飾、改款服務嗎?", a: "有。斷鍊接線、戒圍放大縮小、款式改造、拋光翻新、寶石重鑲等都可以,詳見「服務項目」頁面。" },
    { q: "越南、印尼、菲律賓、泰國語客人怎麼辦?", a: "歡迎來店!我們的官方網站正在準備中文 / 越南文 / 英文 / 印尼文 / 菲律賓文 / 泰文 六語版本,門市也歡迎以您熟悉的語言溝通,我們會盡力協助。" },
  ]},
];

const FAQ_EN: FaqContent = [
  { en: "Recycle", title: "About gold buy-back", items: [
    { q: "How much is one qian of gold? How to convert?", a: "Gold buy-back price moves with the international gold market daily. Taiwan commonly uses 'qian' as a unit: 1 qian = 3.75 grams. For today's exact price, add us on LINE or call — we'll quote the live rate." },
    { q: "Do you deduct loss fees?", a: "No. We do not deduct 'loss fees' or 'fire fees'. Whatever weight comes up on the scale is multiplied by today's price — fully calculated in front of you." },
    { q: "Can I test gold without selling?", a: "Yes. We have professional gold-testing equipment in store. Even if you decide not to sell, the test is free." },
    { q: "What if there's no certificate?", a: "No problem. Many old or family heirloom pieces have no certificate. As long as the gold is real and the purity tests out, we buy it at today's rate." },
    { q: "Do you buy K-gold, white gold, platinum?", a: "Yes. K-gold (14K, 18K), white gold, platinum — all accepted. Pricing is calculated by gold content / purity." },
  ]},
  { en: "Renewal", title: "About old-for-new", items: [
    { q: "Do I always have to pay extra?", a: "Depends. If your old gold weighs more than the new piece, we refund the difference. If less, you pay the difference. Everything is calculated openly with today's price." },
    { q: "How is the trade-in value calculated?", a: "Simple: actual weight × purity × today's price = trade-in value. Weighed on site, calculated on site, every number visible to you." },
    { q: "Can I keep some of the value in cash?", a: "Yes. If your old gold's value exceeds the new piece, the difference can be settled in cash." },
  ]},
  { en: "Boutique", title: "Products & customisation", items: [
    { q: "Does every piece come with a certificate?", a: "Yes. Every piece sold comes with a certificate stating the gold weight — useful for future resale or buy-back." },
    { q: "Can I order online?", a: "Online ordering is in preparation. We'll announce when it's live. For now, contact us via LINE or phone." },
    { q: "Can wedding rings be customised?", a: "Yes — engraving, restyling, or full custom design. Come by and we'll talk through it." },
    { q: "Can the newborn pendant be engraved?", a: "Yes — baby's name, birth date, blessing phrases, all available." },
  ]},
  { en: "Service", title: "Service questions", items: [
    { q: "Do I need an appointment?", a: "No — the shop is open 10:30–20:30 every day, walk in any time. For large transactions or special custom work, LINE us first so we can prepare." },
    { q: "Do you offer repairs and restyling?", a: "Yes — chain repair, ring resizing, restyling, polishing, stone resetting. See the Services page for details." },
    { q: "What about Vietnamese, Indonesian, Filipino, Thai customers?", a: "Welcome! Our website is being prepared in six languages (Chinese / Vietnamese / English / Indonesian / Filipino / Thai), and in store we'll do our best in your language." },
  ]},
];

const FAQ_VI: FaqContent = [
  { en: "Recycle", title: "Về thu mua vàng", items: [
    { q: "Một tiền vàng là bao nhiêu? Cách quy đổi?", a: "Giá thu mua vàng dao động theo thị trường vàng quốc tế hằng ngày. Đài Loan dùng đơn vị 'tiền': 1 tiền = 3.75 gram. Hãy thêm LINE hoặc gọi điện để biết giá chính xác hôm nay." },
    { q: "Có trừ phí hao mòn không?", a: "Không. Chúng tôi không trừ 'phí hao mòn' hay 'phí đốt'. Cân được bao nhiêu, nhân với giá hôm nay — tính minh bạch trước mặt bạn." },
    { q: "Có thể kiểm tra mà không bán không?", a: "Được. Chúng tôi có thiết bị kiểm tra vàng chuyên nghiệp tại tiệm. Dù không bán, kiểm tra vẫn miễn phí." },
    { q: "Không có giấy bảo hành thì sao?", a: "Không vấn đề. Nhiều vàng cũ hoặc gia bảo không có giấy. Chỉ cần là vàng thật và kiểm tra được độ tinh khiết, chúng tôi thu mua theo giá hôm nay." },
    { q: "K-gold, vàng trắng, bạch kim có thu không?", a: "Có. K-gold (14K, 18K), vàng trắng, bạch kim đều thu. Giá tính theo lượng vàng/độ tinh khiết." },
  ]},
  { en: "Renewal", title: "Về đổi vàng cũ lấy mới", items: [
    { q: "Có phải lúc nào cũng bù tiền không?", a: "Tùy. Nếu vàng cũ nặng hơn mẫu mới, chúng tôi hoàn lại phần chênh. Nếu nhẹ hơn, bạn bù. Tất cả tính minh bạch theo giá hôm nay." },
    { q: "Cách tính giá trị đổi như thế nào?", a: "Đơn giản: trọng lượng × độ tinh khiết × giá hôm nay = giá trị đổi. Cân tại chỗ, tính tại chỗ, từng con số bạn đều thấy." },
    { q: "Có thể giữ một phần giá trị bằng tiền mặt không?", a: "Được. Nếu giá trị vàng cũ vượt mẫu mới, phần chênh có thể trả bằng tiền mặt." },
  ]},
  { en: "Boutique", title: "Sản phẩm & đặt làm", items: [
    { q: "Mỗi món có giấy bảo hành không?", a: "Có. Mỗi món bán ra đều có giấy ghi rõ trọng lượng vàng — tiện cho bán lại hoặc thu mua sau này." },
    { q: "Đặt hàng online được không?", a: "Đang chuẩn bị. Sẽ thông báo khi mở. Hiện tại vui lòng liên hệ qua LINE hoặc điện thoại." },
    { q: "Nhẫn cưới có thể đặt làm không?", a: "Được — khắc chữ, đổi mẫu, đặt làm hoàn toàn. Ghé tiệm cùng bàn." },
    { q: "Miếng vàng đầy tháng có thể khắc tên không?", a: "Được — tên bé, ngày sinh, lời chúc, tất cả đều khắc được." },
  ]},
  { en: "Service", title: "Về dịch vụ", items: [
    { q: "Có cần đặt lịch không?", a: "Không cần — tiệm mở 10:30–20:30 mỗi ngày, ghé bất cứ lúc nào. Giao dịch lớn hoặc đặt làm đặc biệt, LINE trước để chúng tôi chuẩn bị." },
    { q: "Có sửa chữa, đổi mẫu không?", a: "Có — nối dây, nới/thu nhỏ nhẫn, đổi mẫu, đánh bóng, thay đá. Xem trang Dịch vụ chi tiết." },
    { q: "Khách Việt Nam, Indonesia, Philippines, Thái thì sao?", a: "Welcome! Website của chúng tôi đang chuẩn bị 6 ngôn ngữ (Trung / Việt / Anh / Indonesia / Philippines / Thái), tại tiệm chúng tôi sẽ cố gắng dùng ngôn ngữ bạn quen." },
  ]},
];

const FAQ_ID: FaqContent = [
  { en: "Recycle", title: "Tentang pembelian emas", items: [
    { q: "Berapa harga satu qian emas? Cara konversi?", a: "Harga pembelian emas mengikuti pasar internasional setiap hari. Taiwan pakai 'qian': 1 qian = 3.75 gram. Tambah LINE atau telepon kami untuk harga real hari ini." },
    { q: "Apakah ada potongan biaya hilang?", a: "Tidak. Kami tidak mengurangi 'biaya hilang' atau 'biaya bakar'. Berapa berat di timbangan, dikalikan harga hari ini — dihitung di depan Anda." },
    { q: "Bisa uji emas tanpa menjual?", a: "Bisa. Kami punya alat uji emas profesional di toko. Meski tak jadi jual, uji tetap gratis." },
    { q: "Tidak ada sertifikat bagaimana?", a: "Tidak masalah. Banyak emas lama atau warisan tanpa sertifikat. Asal emas asli dan kemurnian terverifikasi, kami beli dengan harga hari ini." },
    { q: "K-gold, emas putih, platina diterima?", a: "Diterima. K-gold (14K, 18K), emas putih, platina semua diterima. Harga sesuai kandungan emas/kemurnian." },
  ]},
  { en: "Renewal", title: "Tentang tukar tambah", items: [
    { q: "Apakah selalu harus bayar selisih?", a: "Tergantung. Kalau emas lama lebih berat dari model baru, kami kembalikan selisih. Kalau lebih ringan, Anda bayar selisih. Semua transparan dengan harga hari ini." },
    { q: "Bagaimana hitung nilai tukar tambah?", a: "Sederhana: berat × kemurnian × harga hari ini = nilai tukar. Ditimbang di tempat, dihitung di tempat, setiap angka Anda lihat." },
    { q: "Bisa sebagian dalam bentuk tunai?", a: "Bisa. Kalau nilai emas lama melebihi model baru, selisih bisa cash." },
  ]},
  { en: "Boutique", title: "Produk & kustomisasi", items: [
    { q: "Setiap karya ada sertifikat?", a: "Ya. Setiap karya yang dijual ada sertifikat dengan berat emas — berguna untuk dijual kembali atau dibeli ulang nantinya." },
    { q: "Bisa pesan online?", a: "Sedang dipersiapkan. Akan diumumkan saat tersedia. Untuk sekarang silakan hubungi via LINE atau telepon." },
    { q: "Cincin kawin bisa kustom?", a: "Bisa — ukir, ubah model, atau desain dari nol. Datang ke toko untuk diskusi." },
    { q: "Liontin newborn bisa diukir?", a: "Bisa — nama bayi, tanggal lahir, ucapan, semua bisa diukir." },
  ]},
  { en: "Service", title: "Tentang layanan", items: [
    { q: "Perlu reservasi?", a: "Tidak — toko buka 10:30–20:30 setiap hari, mampir kapan saja. Untuk transaksi besar atau kustom khusus, LINE dulu agar kami bisa siapkan." },
    { q: "Ada layanan reparasi & ubah model?", a: "Ada — sambung kalung, ukur ulang cincin, ubah model, poles, pasang batu. Lihat halaman Layanan untuk detail." },
    { q: "Bagaimana dengan pelanggan Vietnam, Indonesia, Filipina, Thailand?", a: "Selamat datang! Website kami sedang disiapkan dalam 6 bahasa (Mandarin / Vietnam / Inggris / Indonesia / Filipina / Thailand), di toko kami juga berusaha pakai bahasa yang Anda kuasai." },
  ]},
];

const FAQ_FIL: FaqContent = [
  { en: "Recycle", title: "Tungkol sa pagbili ng ginto", items: [
    { q: "Magkano ang isang qian ng ginto? Paano i-convert?", a: "Ang presyo ng pagbili ng ginto ay sumusunod sa pandaigdigang merkado araw-araw. Sa Taiwan ginagamit ang 'qian': 1 qian = 3.75 gramo. Mag-LINE o tumawag para sa eksaktong presyo ngayon." },
    { q: "May 'loss fee' ba?", a: "Wala. Hindi kami nagbabawas ng 'loss fee' o 'fire fee'. Anumang timbang sa scale, multiply sa presyo ngayon — kalkuladong harapan mo." },
    { q: "Pwede ba i-test nang hindi nagbebenta?", a: "Pwede. May propesyunal na gold-testing equipment kami sa tindahan. Kahit hindi kayo magbenta, libre ang test." },
    { q: "Paano kung walang sertipiko?", a: "Walang problema. Maraming lumang ginto o pamana ay walang sertipiko. Basta totoo ang ginto at na-verify ang purity, binibili namin sa presyo ngayon." },
    { q: "K-gold, white gold, platinum ba tinatanggap?", a: "Oo. K-gold (14K, 18K), white gold, platinum — lahat tinatanggap. Presyo ayon sa gold content / purity." },
  ]},
  { en: "Renewal", title: "Tungkol sa palit-bago", items: [
    { q: "Laging may bayad ng sobra?", a: "Depende. Kung mas mabigat ang lumang ginto kaysa bagong piraso, ibabalik namin ang sobra. Kung mas magaan, bayaran ang sobra. Lahat malinaw na binibilang gamit ang presyo ngayon." },
    { q: "Paano kinakalkula ang halaga ng palit?", a: "Simple: timbang × purity × presyo ngayon = halaga ng palit. Tinitimbang sa harap, kinakalkula sa harap, makikita mo ang bawat numero." },
    { q: "Pwede ba bahagi sa cash?", a: "Pwede. Kung lumagpas ang halaga ng lumang ginto sa bagong piraso, pwedeng cash ang sobra." },
  ]},
  { en: "Boutique", title: "Produkto & customisation", items: [
    { q: "May sertipiko ba bawat piraso?", a: "Oo. Bawat piraso na nabili may sertipiko ng timbang — magagamit para sa pagbebenta o pagbiling muli sa hinaharap." },
    { q: "Pwede ba mag-order online?", a: "Inihahanda pa. Iaanunsyo namin kapag live na. Sa ngayon, mag-LINE o tumawag." },
    { q: "Pwede ba pa-custom ang singsing pakikipagtipan?", a: "Pwede — ukit, baguhin ang istilo, o buong custom design. Dumalo sa tindahan para pag-usapan." },
    { q: "Pwede bang ukitan ang newborn pendant?", a: "Oo — pangalan ng bata, kaarawan, mga bati, lahat pwede." },
  ]},
  { en: "Service", title: "Tungkol sa serbisyo", items: [
    { q: "Kailangan ba ng appointment?", a: "Hindi — bukas ang tindahan 10:30–20:30 araw-araw, dumating kahit kailan. Para sa malalaking transaksyon o espesyal na custom, LINE muna para makapaghanda kami." },
    { q: "May repair at restyling kayo?", a: "Mayroon — pagdugtong ng kadena, pagpapalaki ng singsing, pagbabago ng istilo, pakintabin, pagpalit ng bato. Tingnan ang Services page." },
    { q: "Kumusta naman ang Vietnamese, Indonesian, Filipino, Thai na customer?", a: "Mabuhay! Inihahanda namin ang website sa anim na wika (Mandarin / Vietnamese / English / Indonesian / Filipino / Thai), sa tindahan susubukan din namin ang inyong wika." },
  ]},
];

const FAQ_TH: FaqContent = [
  { en: "Recycle", title: "เกี่ยวกับการรับซื้อทอง", items: [
    { q: "หนึ่งเฉียนทองเท่าไหร่ แลกอย่างไร?", a: "ราคารับซื้อทองเคลื่อนไหวตามตลาดทองนานาชาติทุกวัน ไต้หวันใช้หน่วย 'เฉียน': 1 เฉียน = 3.75 กรัม โปรดเพิ่ม LINE หรือโทรเพื่อทราบราคาวันนี้" },
    { q: "หักค่าเสียหายไหม?", a: "ไม่หัก เราไม่เก็บ 'ค่าเสียหาย' หรือ 'ค่าหลอม' ชั่งได้น้ำหนักเท่าไหร่ คูณกับราคาวันนี้ — คำนวณต่อหน้าคุณ" },
    { q: "ทดสอบทองโดยไม่ขายได้ไหม?", a: "ได้ ที่ร้านมีเครื่องตรวจทองมืออาชีพ แม้สุดท้ายไม่ขาย การตรวจสอบก็ฟรี" },
    { q: "ถ้าไม่มีใบรับรองล่ะ?", a: "ไม่เป็นปัญหา ทองเก่าหรือของสืบทอดหลายชิ้นไม่มีใบรับรอง ขอแค่เป็นทองแท้และตรวจความบริสุทธิ์ได้ เรารับซื้อตามราคาวันนี้" },
    { q: "รับ K-gold, ทองคำขาว, แพลทินั่มไหม?", a: "รับ K-gold (14K, 18K), ทองคำขาว, แพลทินั่ม รับทั้งหมด ราคาขึ้นกับปริมาณทอง/ความบริสุทธิ์" },
  ]},
  { en: "Renewal", title: "เกี่ยวกับการเปลี่ยนทองเก่าเป็นใหม่", items: [
    { q: "ต้องบวกเงินทุกครั้งไหม?", a: "ขึ้นกับสถานการณ์ ถ้าทองเก่าหนักกว่าแบบใหม่ เราคืนส่วนต่างให้คุณ ถ้าน้อยกว่า คุณบวกส่วนต่าง ทั้งหมดคำนวณโปร่งใสตามราคาวันนี้" },
    { q: "คำนวณมูลค่าแลกเปลี่ยนอย่างไร?", a: "ง่ายมาก: น้ำหนัก × ความบริสุทธิ์ × ราคาวันนี้ = มูลค่าแลกเปลี่ยน ชั่งที่ร้าน คำนวณที่ร้าน คุณเห็นทุกตัวเลข" },
    { q: "ขอเป็นเงินสดบางส่วนได้ไหม?", a: "ได้ ถ้ามูลค่าทองเก่าเกินกว่าแบบใหม่ ส่วนต่างจ่ายเป็นเงินสดได้" },
  ]},
  { en: "Boutique", title: "สินค้าและการสั่งทำ", items: [
    { q: "ทุกชิ้นมีใบรับรองไหม?", a: "มี ทุกชิ้นที่ขายมีใบรับรองระบุน้ำหนักทอง — สะดวกเมื่อขายต่อหรือรับซื้อภายหลัง" },
    { q: "สั่งซื้อออนไลน์ได้ไหม?", a: "กำลังเตรียม จะประกาศเมื่อพร้อม ตอนนี้กรุณาติดต่อทาง LINE หรือโทร" },
    { q: "แหวนแต่งงานสั่งทำได้ไหม?", a: "ได้ — สลัก เปลี่ยนแบบ หรือสั่งทำใหม่ทั้งหมด ขอเชิญมาคุยที่ร้าน" },
    { q: "แผ่นทองครบเดือนเด็กสลักได้ไหม?", a: "ได้ — ชื่อลูก วันเกิด คำอวยพร สลักได้ทั้งหมด" },
  ]},
  { en: "Service", title: "เกี่ยวกับการบริการ", items: [
    { q: "ต้องจองล่วงหน้าไหม?", a: "ไม่ต้อง — ร้านเปิด 10:30–20:30 ทุกวัน แวะมาเมื่อไรก็ได้ ธุรกรรมใหญ่หรือสั่งทำพิเศษ LINE ก่อนเพื่อให้เราเตรียม" },
    { q: "มีบริการซ่อมและเปลี่ยนแบบไหม?", a: "มี — ต่อสร้อยขาด ปรับขนาดแหวน เปลี่ยนแบบ ขัดเงา เปลี่ยนพลอย ดูรายละเอียดที่หน้าบริการ" },
    { q: "ลูกค้าเวียดนาม อินโดนีเซีย ฟิลิปปินส์ ไทยล่ะ?", a: "ยินดีต้อนรับ! เว็บไซต์ของเรากำลังเตรียม 6 ภาษา (จีน / เวียดนาม / อังกฤษ / อินโดนีเซีย / ฟิลิปปินส์ / ไทย) ที่ร้านเราก็พยายามใช้ภาษาที่คุณคุ้นเคย" },
  ]},
];

export const FAQ: Record<Locale, FaqContent> = {
  "zh-TW": FAQ_ZH_TW,
  vi: FAQ_VI,
  en: FAQ_EN,
  id: FAQ_ID,
  fil: FAQ_FIL,
  th: FAQ_TH,
};

export function getFaq(locale: Locale): FaqContent {
  return FAQ[locale] ?? FAQ["zh-TW"];
}
