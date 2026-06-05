// 金閃閃銀樓 6 語字典
// zh-TW 為原稿. 其他 5 語為初版翻譯, 待母語人士校稿.

import type { Locale } from "./types";

export type Dict = {
  common: {
    enquire_line: string;
    reserve: string;
    call: string;
    direction: string;
    read_more: string;
    discover: string;
    back_journal: string;
    back_home: string;
    learn_more: string;
    contact: string;
    welcome: string;
  };
  header: {
    services: string;
    collection: string;
    journal: string;
    maison: string;
    faq: string;
    reserve_cta: string;
    call_short: string;
  };
  topbar: {
    promo_title_default: string;
    promo_body_default: string;
    promo_cta_default: string;
    language: string;
  };
  hero: {
    eyebrow: string;
    title_a: string;
    title_b: string;
    title_c: string;
    subtitle_1: string;
    subtitle_2: string;
    cta_a: string;
    cta_b: string;
    rating: string;
    address: string;
    hours: string;
    phone: string;
    maison_tag: string;
  };
  ticker: {
    eyebrow: string;
    title_a: string;
    title_b: string;
    note: string;
  };
  calculator: {
    eyebrow: string;
    title_a: string;
    title_b: string;
    intro_a: string;
    intro_b: string;
    intro_note: string;
    step_purity: string;
    step_unit: string;
    step_weight: string;
    weight_ph: string;
    current_quote: string;
    result_eyebrow: string;
    result_sub_filled: string;
    result_sub_empty: string;
    result_note: string;
    accurate_q: string;
    accurate_a: string;
    cta_call: string;
    cta_line: string;
    updated: string;
    unit_qian: string;
    unit_gram: string;
    unit_tael: string;
  };
  services: {
    eyebrow: string;
    title_a: string;
    title_b: string;
    intro_a: string;
    intro_b: string;
    discover_all: string;
    renewal_title: string;
    renewal_body: string;
    recycle_title: string;
    recycle_body: string;
    boutique_title: string;
    boutique_body: string;
    restoration_title: string;
    restoration_body: string;
  };
  occasions: {
    eyebrow: string;
    title_a: string;
    title_b: string;
    explore: string;
    wedding_title: string;
    wedding_desc: string;
    newborn_title: string;
    newborn_desc: string;
    engagement_title: string;
    engagement_desc: string;
    mothers_day_title: string;
    mothers_day_desc: string;
    new_year_title: string;
    new_year_desc: string;
    investment_title: string;
    investment_desc: string;
  };
  products_preview: {
    eyebrow: string;
    title_a: string;
    title_b: string;
    title_c: string;
    featured: string;
    view_full: string;
  };
  about_section: {
    eyebrow: string;
    title_a: string;
    title_b: string;
    body_1: string;
    body_2: string;
    body_3_strong: string;
    body_3_after: string;
    full_story: string;
  };
  testimonials: {
    eyebrow: string;
    title_a: string;
    title_b: string;
    rating_note: string;
    disclaimer: string;
    occ_a: string;
    quote_a: string;
    name_a: string;
    occ_b: string;
    quote_b: string;
    name_b: string;
    occ_c: string;
    quote_c: string;
    name_c: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    boutique_info: string;
    label_address: string;
    label_phone: string;
    label_hours: string;
    label_line: string;
    label_ig: string;
    label_fb: string;
    address: string;
    hours_value: string;
    line_value: string;
    ig_value: string;
    fb_value: string;
    cta_call: string;
    cta_map: string;
  };
  cta_block: {
    eyebrow: string;
    title_a: string;
    title_b: string;
    intro_1: string;
    intro_2: string;
    cta_call: string;
    cta_direction: string;
  };
  footer: {
    brand_line_1: string;
    brand_line_2: string;
    welcome_line: string;
    col_maison: string;
    col_journal: string;
    col_contact: string;
    col_boutique: string;
    boutique_lines: string;
    rights: string;
    region: string;
  };
  category_bar: {
    all: string;
    rings: string;
    earrings: string;
    necklaces: string;
    bracelets: string;
    wedding: string;
    newborn: string;
    bullion: string;
    custom: string;
  };
  not_found: {
    eyebrow: string;
    title: string;
    body: string;
    home: string;
    line: string;
  };
  page_titles: {
    services_eyebrow: string;
    services_title: string;
    services_sub: string;
    products_eyebrow: string;
    products_title: string;
    products_sub: string;
    about_eyebrow: string;
    about_title: string;
    about_sub: string;
    faq_eyebrow: string;
    faq_title: string;
    faq_sub: string;
    journal_eyebrow: string;
    journal_title: string;
    journal_sub: string;
    reserve_eyebrow: string;
    reserve_title: string;
    reserve_sub: string;
  };
};

// ─────────────────────────────────────────────────────────────
// 繁體中文 (原稿)
// ─────────────────────────────────────────────────────────────
const zhTW: Dict = {
  common: {
    enquire_line: "加 LINE 詢價",
    reserve: "預約看店",
    call: "立即來電",
    direction: "Google 地圖導航",
    read_more: "閱讀更多",
    discover: "了解更多",
    back_journal: "← 回文章列表",
    back_home: "← 回首頁",
    learn_more: "了解更多",
    contact: "聯絡我們",
    welcome: "歡迎光臨",
  },
  header: {
    services: "服務",
    collection: "選品",
    journal: "文章",
    maison: "關於",
    faq: "Q&A",
    reserve_cta: "預約看店 · Reserve",
    call_short: "來電",
  },
  topbar: {
    promo_title_default: "5 月限定",
    promo_body_default: "母親節黃金回收加碼活動進行中",
    promo_cta_default: "詢問詳情",
    language: "Language",
  },
  hero: {
    eyebrow: "Est. Zhongli · Taoyuan",
    title_a: "在這裡,",
    title_b: "黃金",
    title_c: "不只是黃金",
    subtitle_1: "桃園中壢的誠信銀樓。",
    subtitle_2: "公開金價・現場秤重・清楚試算。",
    cta_a: "加 LINE 詢今日金價",
    cta_b: "金飾選品",
    rating: "Google ★ 5.0",
    address: "桃園中壢中和路 108 號",
    hours: "每日 10:30 – 20:30",
    phone: "(03) 280-5908",
    maison_tag: "The Maison · 金閃閃",
  },
  ticker: {
    eyebrow: "Live · 今日金價",
    title_a: "本店",
    title_b: "回收",
    note: "漲紅跌綠.資料僅供參考,實際以門市秤重檢測為準",
  },
  calculator: {
    eyebrow: "Cash Today · 今天能換多少",
    title_a: "今天把舊金拿來金閃閃,",
    title_b: "大約能換多少現金?",
    intro_a: "抽屜裡那條老金鏈、媽媽留下的金牌、結婚時的對戒 ——",
    intro_b: "輸入重量,3 秒看到今天大約可以換到多少現金。",
    intro_note: "金價即時跟著國際牌告.現場秤重.現金結清.絕不扣耗損。",
    step_purity: "01 · 你的金是哪一種?",
    step_unit: "02 · 你習慣用哪個單位?",
    step_weight: "03 · 大概有多重?",
    weight_ph: "例如 5",
    current_quote: "目前牌告 ·",
    result_eyebrow: "Cash Today · 今天大約可換",
    result_sub_filled: "把你的金拿來金閃閃,今天可以換到",
    result_sub_empty: "輸入重量,看看可以換多少",
    result_note: "依今日金價試算 · 實際以門市現場秤重為準",
    accurate_q: "想知道精準的金額?",
    accurate_a: "加 LINE 或來電,我們告訴你今天最即時的成交價。",
    cta_call: "立即來電 (03) 280-5908",
    cta_line: "加 LINE 詢實際金價",
    updated: "牌告更新",
    unit_qian: "錢 (台錢)",
    unit_gram: "公克 (g)",
    unit_tael: "兩 (台兩)",
  },
  services: {
    eyebrow: "Our Services",
    title_a: "四項",
    title_b: "服務",
    intro_a: "金閃閃銀樓提供的,不只是黃金交易,",
    intro_b: "而是讓每一塊金子,在最對的時間、回到最對的人手上。",
    discover_all: "Discover All Services",
    renewal_title: "舊金換新",
    renewal_body: "把抽屜裡的金飾,換成現在想戴的款式。當日金價試算,只補差價。",
    recycle_title: "舊金回收",
    recycle_body: "公開當日金價、現場秤重、清楚試算。當日結清,絕不扣耗損。",
    boutique_title: "飾金換購",
    boutique_body: "項鍊、手鐲、對戒,實體店面親自挑選。每件附金重證明。",
    restoration_title: "修飾販售",
    restoration_body: "斷鍊、改款、放大縮小、拋光翻新。讓老件再次戴回身上。",
  },
  occasions: {
    eyebrow: "For Every Occasion",
    title_a: "為每個場合,",
    title_b: "選一塊合適的金",
    explore: "Explore",
    wedding_title: "結婚囍金",
    wedding_desc: "對戒、囍餅金、入門金條 ── 為一輩子的承諾準備。",
    newborn_title: "彌月禮品",
    newborn_desc: "刻字金牌、平安金鎖,把祝福留給寶寶的成長記憶。",
    engagement_title: "訂婚對戒",
    engagement_desc: "親手試戴、現場討論款式,讓最重要的瞬間有最合適的戒。",
    mothers_day_title: "母親節獻禮",
    mothers_day_desc: "把心意換成她值得的光,5 月限定加碼活動進行中。",
    new_year_title: "過年招財",
    new_year_desc: "金條、財神金幣、招財金飾 —— 在新年第一筆,投入價值。",
    investment_title: "投資金條",
    investment_desc: "9999 純金,從五錢到一兩、多種規格,長期保值首選。",
  },
  products_preview: {
    eyebrow: "The Collection",
    title_a: "精選",
    title_b: "金飾",
    title_c: "選品",
    featured: "Featured",
    view_full: "View The Full Collection",
  },
  about_section: {
    eyebrow: "Welcome · 歡迎",
    title_a: "街坊鄰居的銀樓,",
    title_b: "中壢的老朋友",
    body_1: "金閃閃銀樓開在桃園中壢中和路。我們是這條街上的小店,做生意憑的是街坊鄰居一路看著我們長大的信任。",
    body_2: "結婚、彌月、訂婚、舊金換新、回收、修飾 —— 大事小事,都歡迎走進來坐坐、聊聊。",
    body_3_strong: "無論你說中文、Tiếng Việt、Bahasa Indonesia、Filipino、ภาษาไทย,",
    body_3_after: "只要走進店裡,你就是我們的朋友。",
    full_story: "Our Story · 完整品牌故事",
  },
  testimonials: {
    eyebrow: "Voices · 真實見證",
    title_a: "走進來過的",
    title_b: "朋友",
    rating_note: "★ Google 5.0 · 24+ 在地真實評價",
    disclaimer: "※ 為保護隱私,顧客姓名已部分匿名處理.見證內容為示意,正式上線後將更新真實客戶回饋",
    occ_a: "母親遺物舊金換新",
    quote_a: "媽媽留下的金鍊放了十幾年捨不得拿出來。在金閃閃,他們現場秤重給我看,試算清清楚楚,還把舊金留下一小塊讓我做成項鍊。回家以後我才哭。",
    name_a: "L 小姐",
    occ_b: "舊金回收",
    quote_b: "我講越南話,他們慢慢用簡單的中文跟我溝通,還拿紙筆寫給我看。我帶兩條金鍊回收,給我的價錢比另外兩家好,當天就拿到現金。",
    name_b: "Ms. Nguyễn",
    occ_c: "訂婚對戒",
    quote_c: "本來只是路過進來看看,老闆沒有推銷,反而花時間幫我們講解金重跟款式。最後挑到一對對戒,女朋友超喜歡。下次彌月也會回來。",
    name_c: "C 先生 . 桃園",
  },
  contact: {
    eyebrow: "Visit Us",
    title: "親自走一趟,看見真正的金子",
    intro: "建議來店前先 LINE 詢今日金價,我們在桃園中壢中和路 108 號等您。",
    boutique_info: "Boutique Information",
    label_address: "Address",
    label_phone: "Phone",
    label_hours: "Hours",
    label_line: "LINE",
    label_ig: "Instagram",
    label_fb: "Facebook",
    address: "320 桃園市中壢區\n中和路 108 號",
    hours_value: "每日 10:30 – 20:30",
    line_value: "加好友 lin.ee/onfiZgZ",
    ig_value: "@shiny_gold991",
    fb_value: "金閃閃銀樓 / Taoyuan",
    cta_call: "Call Us",
    cta_map: "Direction →",
  },
  cta_block: {
    eyebrow: "Make an Enquiry",
    title_a: "直接",
    title_b: "問就好",
    intro_1: "加 LINE 詢價、撥電話、來店都可以。",
    intro_2: "我們在桃園中壢中和路 108 號等您。",
    cta_call: "Call (03) 280-5908",
    cta_direction: "Direction",
  },
  footer: {
    brand_line_1: "金閃閃銀樓 SHINY GOLD Jeweller's",
    brand_line_2: "桃園中壢在地誠信銀樓。公開金價、現場秤重、絕不扣耗損。",
    welcome_line: "歡迎 · Xin chào · Selamat datang · Mabuhay · ยินดีต้อนรับ",
    col_maison: "Maison",
    col_journal: "Journal",
    col_contact: "Contact",
    col_boutique: "Boutique",
    boutique_lines: "320 桃園市中壢區\n中和路 108 號\n\n每日 10:30 – 20:30",
    rights: "© {year} Shiny Gold Jeweller's · All Rights Reserved",
    region: "Taoyuan · Taiwan",
  },
  category_bar: {
    all: "全部商品",
    rings: "戒指",
    earrings: "耳環",
    necklaces: "項鍊",
    bracelets: "手鏈",
    wedding: "對戒",
    newborn: "彌月禮",
    bullion: "投資金條",
    custom: "訂製",
  },
  not_found: {
    eyebrow: "404 · Not Found",
    title: "這頁不見了",
    body: "您要找的頁面找不到 —— 可能是連結舊了、商品下架、或頁面剛搬家。想看看的話,直接回首頁或來店找我們聊聊。",
    home: "← 回首頁",
    line: "加 LINE 詢問",
  },
  page_titles: {
    services_eyebrow: "Our Services",
    services_title: "四項服務",
    services_sub: "從舊金換新、回收、換購到修飾,讓每一塊黃金,找到合適的去處。",
    products_eyebrow: "The Collection",
    products_title: "金飾選品",
    products_sub: "每一件作品,經過我們親手挑選。實體店面陳列更完整,歡迎來店試戴。",
    about_eyebrow: "Welcome · 歡迎",
    about_title: "街坊鄰居的銀樓",
    about_sub: "在桃園中壢中和路,一家小店、一群朋友、一份用心。歡迎所有國家的朋友走進來。",
    faq_eyebrow: "FAQ · 常見問題",
    faq_title: "想問的,直接問",
    faq_sub: "想問的、沒問到的,都歡迎直接 LINE 或來電。",
    journal_eyebrow: "Journal",
    journal_title: "金飾知識",
    journal_sub: "從黃金保值、回收眉角到日常保養,我們把店裡多年來的經驗整理成文章。",
    reserve_eyebrow: "Reserve · 預約看店",
    reserve_title: "選個時間,我們等您",
    reserve_sub: "預約讓我們能事先準備.公開金價、現場秤重、絕不扣耗損。",
  },
};

// ─────────────────────────────────────────────────────────────
// English
// ─────────────────────────────────────────────────────────────
const en: Dict = {
  common: {
    enquire_line: "Add LINE for Pricing",
    reserve: "Reserve a Visit",
    call: "Call Now",
    direction: "Google Maps",
    read_more: "Read More",
    discover: "Discover More",
    back_journal: "← Back to Journal",
    back_home: "← Back to Home",
    learn_more: "Learn More",
    contact: "Contact Us",
    welcome: "Welcome",
  },
  header: {
    services: "Services",
    collection: "Collection",
    journal: "Journal",
    maison: "Maison",
    faq: "FAQ",
    reserve_cta: "Reserve · 預約看店",
    call_short: "Call",
  },
  topbar: {
    promo_title_default: "May Special",
    promo_body_default: "Mother's Day gold buy-back bonus is on",
    promo_cta_default: "Learn More",
    language: "Language",
  },
  hero: {
    eyebrow: "Est. Zhongli · Taoyuan",
    title_a: "Here,",
    title_b: "gold",
    title_c: "is more than gold.",
    subtitle_1: "An honest jeweller in Zhongli, Taoyuan.",
    subtitle_2: "Open prices · weighed on site · clear calculations.",
    cta_a: "Add LINE for Today's Price",
    cta_b: "The Collection",
    rating: "Google ★ 5.0",
    address: "108 Zhonghe Rd, Zhongli",
    hours: "Daily 10:30 – 20:30",
    phone: "(03) 280-5908",
    maison_tag: "The Maison · Shiny Gold",
  },
  ticker: {
    eyebrow: "Live · Today's Gold Price",
    title_a: "In-Store",
    title_b: "Buy-Back",
    note: "Up = red, down = green. For reference only — final price weighed in store.",
  },
  calculator: {
    eyebrow: "Cash Today · What's it worth?",
    title_a: "Bring your old gold to Shiny Gold today —",
    title_b: "how much cash can you get?",
    intro_a: "That old chain in the drawer, your mother's gold pendant, a wedding ring set —",
    intro_b: "Enter the weight and see today's estimated cash in 3 seconds.",
    intro_note: "Real-time price tied to international gold · weighed on site · cash on the spot · no hidden deductions.",
    step_purity: "01 · What kind of gold?",
    step_unit: "02 · Which weight unit?",
    step_weight: "03 · About how much does it weigh?",
    weight_ph: "e.g. 5",
    current_quote: "Current rate ·",
    result_eyebrow: "Cash Today · Estimated",
    result_sub_filled: "Bring it to Shiny Gold today and get about",
    result_sub_empty: "Enter the weight to see your value",
    result_note: "Calculated on today's price · final price weighed in store",
    accurate_q: "Want a precise figure?",
    accurate_a: "Add LINE or call us — we'll quote today's real rate.",
    cta_call: "Call (03) 280-5908",
    cta_line: "Add LINE for the Real Price",
    updated: "Updated",
    unit_qian: "Qian (台錢)",
    unit_gram: "Gram (g)",
    unit_tael: "Tael (台兩)",
  },
  services: {
    eyebrow: "Our Services",
    title_a: "Four",
    title_b: "Services",
    intro_a: "Shiny Gold offers more than gold trading —",
    intro_b: "we help each piece of gold return to the right hands at the right time.",
    discover_all: "Discover All Services",
    renewal_title: "Old-for-New",
    renewal_body: "Swap that drawer jewellery for a piece you'll actually wear. Today's price applied — pay only the difference.",
    recycle_title: "Gold Buy-Back",
    recycle_body: "Open today's price, on-site weighing, transparent maths. Cash on the spot, no hidden deductions.",
    boutique_title: "Jewellery Exchange",
    boutique_body: "Necklaces, bracelets, rings — pick in person, weight certified on every piece.",
    restoration_title: "Repair & Refit",
    restoration_body: "Broken chains, resizing, restyling, polishing. Bring those old pieces back to life.",
  },
  occasions: {
    eyebrow: "For Every Occasion",
    title_a: "For every moment,",
    title_b: "the right piece of gold.",
    explore: "Explore",
    wedding_title: "Wedding Gold",
    wedding_desc: "Wedding bands, celebration pieces, bullion — prepare for the promise that lasts.",
    newborn_title: "Newborn Gifts",
    newborn_desc: "Engraved gold pendants and lockets — bless their first year of memories.",
    engagement_title: "Engagement Rings",
    engagement_desc: "Try on in person, talk through styles — the right ring for the right moment.",
    mothers_day_title: "Mother's Day",
    mothers_day_desc: "Turn your love into the light she deserves — May special bonus is on.",
    new_year_title: "Lunar New Year",
    new_year_desc: "Bullion, lucky gold coins, fortune charms — invest in value with the first transaction of the year.",
    investment_title: "Investment Bullion",
    investment_desc: "9999 pure gold, from 5 qian to 1 tael — long-term value, multiple sizes.",
  },
  products_preview: {
    eyebrow: "The Collection",
    title_a: "Featured",
    title_b: "fine gold",
    title_c: "pieces.",
    featured: "Featured",
    view_full: "View The Full Collection",
  },
  about_section: {
    eyebrow: "Welcome",
    title_a: "Your neighbourhood jeweller,",
    title_b: "an old friend in Zhongli.",
    body_1: "Shiny Gold sits on Zhonghe Road, Zhongli. A small shop on the street, doing business on the trust the neighbours have given us as we grew up.",
    body_2: "Weddings, newborn gifts, engagement rings, old-for-new swaps, buy-backs, repairs — big or small, you're welcome to come in and talk.",
    body_3_strong: "Whether you speak Chinese, Tiếng Việt, Bahasa Indonesia, Filipino, or ภาษาไทย,",
    body_3_after: "once you walk in, you are our friend.",
    full_story: "Our Story",
  },
  testimonials: {
    eyebrow: "Voices · Real Reviews",
    title_a: "Friends who",
    title_b: "walked in.",
    rating_note: "★ Google 5.0 · 24+ local reviews",
    disclaimer: "※ Names partly anonymised for privacy. Sample reviews — real customer feedback will update once live.",
    occ_a: "Old-for-new with mother's keepsake",
    quote_a: "My mother's gold chain sat in a drawer for over ten years. At Shiny Gold they weighed it in front of me, walked through every number, and kept a small piece so I could make a necklace from it. I cried only after I got home.",
    name_a: "Ms. L",
    occ_b: "Gold buy-back",
    quote_b: "I speak Vietnamese; they slowed down their Mandarin, wrote things on paper for me. I brought two chains — their price beat the other two shops, cash on the spot the same day.",
    name_b: "Ms. Nguyễn",
    occ_c: "Engagement pair",
    quote_c: "I walked in just to look. The owner didn't push, just took time to explain weight and styles. We ended up with a pair my girlfriend loved. Coming back for the newborn next time.",
    name_c: "Mr. C · Taoyuan",
  },
  contact: {
    eyebrow: "Visit Us",
    title: "Come see the real gold yourself.",
    intro: "Add LINE for today's price before you come — we'll be here at 108 Zhonghe Rd, Zhongli.",
    boutique_info: "Boutique Information",
    label_address: "Address",
    label_phone: "Phone",
    label_hours: "Hours",
    label_line: "LINE",
    label_ig: "Instagram",
    label_fb: "Facebook",
    address: "108 Zhonghe Rd,\nZhongli, Taoyuan 320",
    hours_value: "Daily 10:30 – 20:30",
    line_value: "Add friend lin.ee/onfiZgZ",
    ig_value: "@shiny_gold991",
    fb_value: "Shiny Gold / Taoyuan",
    cta_call: "Call Us",
    cta_map: "Directions →",
  },
  cta_block: {
    eyebrow: "Make an Enquiry",
    title_a: "Just",
    title_b: "ask.",
    intro_1: "Add LINE, call us, or come by — anything works.",
    intro_2: "We're at 108 Zhonghe Rd, Zhongli.",
    cta_call: "Call (03) 280-5908",
    cta_direction: "Directions",
  },
  footer: {
    brand_line_1: "Shiny Gold Jeweller's · 金閃閃銀樓",
    brand_line_2: "Honest jeweller in Zhongli, Taoyuan. Open prices, on-site weighing, no hidden deductions.",
    welcome_line: "Welcome · 歡迎 · Xin chào · Selamat datang · Mabuhay · ยินดีต้อนรับ",
    col_maison: "Maison",
    col_journal: "Journal",
    col_contact: "Contact",
    col_boutique: "Boutique",
    boutique_lines: "108 Zhonghe Rd,\nZhongli, Taoyuan 320\n\nDaily 10:30 – 20:30",
    rights: "© {year} Shiny Gold Jeweller's · All Rights Reserved",
    region: "Taoyuan · Taiwan",
  },
  category_bar: {
    all: "All",
    rings: "Rings",
    earrings: "Earrings",
    necklaces: "Necklaces",
    bracelets: "Bracelets",
    wedding: "Wedding",
    newborn: "Newborn",
    bullion: "Bullion",
    custom: "Custom",
  },
  not_found: {
    eyebrow: "404 · Not Found",
    title: "This page is gone",
    body: "We couldn't find what you were looking for — maybe the link is old, an item is delisted, or the page just moved. Head home or come by and tell us in person.",
    home: "← Home",
    line: "Ask on LINE",
  },
  page_titles: {
    services_eyebrow: "Our Services",
    services_title: "Four Services",
    services_sub: "Old-for-new, buy-back, exchange, repair — let each piece of gold find the right path.",
    products_eyebrow: "The Collection",
    products_title: "Fine Gold Collection",
    products_sub: "Each piece hand-picked. The boutique holds more — come try them on.",
    about_eyebrow: "Welcome",
    about_title: "Your neighbourhood jeweller",
    about_sub: "On Zhonghe Road in Zhongli — one small shop, friends from every country welcome.",
    faq_eyebrow: "FAQ",
    faq_title: "Ask, simply.",
    faq_sub: "Anything you want to know — LINE or call us directly.",
    journal_eyebrow: "Journal",
    journal_title: "Gold Knowledge",
    journal_sub: "From keeping value to daily care — years of in-store knowledge in writing.",
    reserve_eyebrow: "Reserve · 預約看店",
    reserve_title: "Pick a time, we'll be ready.",
    reserve_sub: "Reserve so we can prepare. Open prices, on-site weighing, no hidden deductions.",
  },
};

// ─────────────────────────────────────────────────────────────
// Tiếng Việt (越南文 · 初版翻譯, 待母語校稿)
// ─────────────────────────────────────────────────────────────
const vi: Dict = {
  common: {
    enquire_line: "Thêm LINE để xem giá",
    reserve: "Đặt lịch ghé tiệm",
    call: "Gọi ngay",
    direction: "Chỉ đường",
    read_more: "Đọc thêm",
    discover: "Tìm hiểu thêm",
    back_journal: "← Quay lại bài viết",
    back_home: "← Quay lại trang chủ",
    learn_more: "Tìm hiểu thêm",
    contact: "Liên hệ",
    welcome: "Xin chào",
  },
  header: {
    services: "Dịch vụ",
    collection: "Bộ sưu tập",
    journal: "Bài viết",
    maison: "Về tiệm",
    faq: "Câu hỏi",
    reserve_cta: "Đặt lịch · Reserve",
    call_short: "Gọi",
  },
  topbar: {
    promo_title_default: "Ưu đãi tháng 5",
    promo_body_default: "Khuyến mãi thu vàng Ngày của Mẹ đang diễn ra",
    promo_cta_default: "Xem chi tiết",
    language: "Ngôn ngữ",
  },
  hero: {
    eyebrow: "Est. Trung Lịch · Đào Viên",
    title_a: "Ở đây,",
    title_b: "vàng",
    title_c: "không chỉ là vàng.",
    subtitle_1: "Tiệm vàng uy tín tại Trung Lịch, Đào Viên.",
    subtitle_2: "Giá vàng công khai · cân tại chỗ · tính toán minh bạch.",
    cta_a: "Thêm LINE xem giá hôm nay",
    cta_b: "Bộ sưu tập",
    rating: "Google ★ 5.0",
    address: "108 đường Trung Hòa, Trung Lịch",
    hours: "Mỗi ngày 10:30 – 20:30",
    phone: "(03) 280-5908",
    maison_tag: "Tiệm Vàng Sang Lấy · 金閃閃",
  },
  ticker: {
    eyebrow: "Live · Giá vàng hôm nay",
    title_a: "Giá",
    title_b: "thu mua",
    note: "Đỏ = lên, xanh = xuống. Chỉ để tham khảo — giá chính thức cân tại tiệm.",
  },
  calculator: {
    eyebrow: "Hôm nay · Đổi được bao nhiêu",
    title_a: "Mang vàng cũ đến Tiệm Vàng Sang Lấy hôm nay —",
    title_b: "đổi được khoảng bao nhiêu tiền?",
    intro_a: "Sợi dây chuyền cũ trong ngăn kéo, miếng vàng mẹ để lại, cặp nhẫn cưới —",
    intro_b: "Nhập trọng lượng, 3 giây sẽ biết hôm nay đổi được bao nhiêu.",
    intro_note: "Giá theo thị trường quốc tế · cân tại chỗ · trả tiền mặt ngay · không trừ hao.",
    step_purity: "01 · Vàng của bạn loại nào?",
    step_unit: "02 · Đơn vị nào?",
    step_weight: "03 · Trọng lượng khoảng bao nhiêu?",
    weight_ph: "Ví dụ 5",
    current_quote: "Giá hiện tại ·",
    result_eyebrow: "Hôm nay · Ước tính đổi được",
    result_sub_filled: "Mang đến Tiệm Vàng Sang Lấy hôm nay, bạn sẽ nhận được khoảng",
    result_sub_empty: "Nhập trọng lượng để xem giá trị",
    result_note: "Tính theo giá hôm nay · giá chính thức cân tại tiệm",
    accurate_q: "Muốn biết giá chính xác?",
    accurate_a: "Thêm LINE hoặc gọi điện — chúng tôi báo giá thực tế trong ngày.",
    cta_call: "Gọi (03) 280-5908",
    cta_line: "Thêm LINE xem giá thực",
    updated: "Cập nhật",
    unit_qian: "Tiền (台錢)",
    unit_gram: "Gram (g)",
    unit_tael: "Lượng (台兩)",
  },
  services: {
    eyebrow: "Dịch vụ",
    title_a: "Bốn",
    title_b: "dịch vụ",
    intro_a: "Tiệm Vàng Sang Lấy không chỉ mua bán vàng —",
    intro_b: "mà giúp mỗi miếng vàng đến đúng người, đúng thời điểm.",
    discover_all: "Xem tất cả dịch vụ",
    renewal_title: "Đổi vàng cũ lấy mới",
    renewal_body: "Đổi trang sức trong ngăn kéo lấy mẫu mới. Tính theo giá hôm nay — chỉ bù phần chênh lệch.",
    recycle_title: "Thu mua vàng",
    recycle_body: "Giá công khai, cân tại chỗ, tính minh bạch. Trả tiền ngay, không trừ hao.",
    boutique_title: "Đổi trang sức",
    boutique_body: "Dây chuyền, vòng tay, nhẫn — chọn trực tiếp, có giấy chứng nhận trọng lượng.",
    restoration_title: "Sửa chữa",
    restoration_body: "Nối dây đứt, nới rộng/thu nhỏ, thay kiểu, đánh bóng. Đưa món cũ trở lại trên người bạn.",
  },
  occasions: {
    eyebrow: "Cho mọi dịp",
    title_a: "Mỗi khoảnh khắc,",
    title_b: "một món vàng phù hợp.",
    explore: "Khám phá",
    wedding_title: "Vàng cưới",
    wedding_desc: "Nhẫn cưới, vàng cô dâu chú rể, vàng miếng — cho lời hứa cả đời.",
    newborn_title: "Quà mừng đầy tháng",
    newborn_desc: "Miếng vàng khắc tên, khóa vàng bình an — giữ lời chúc bên cạnh con từ nhỏ.",
    engagement_title: "Nhẫn đính hôn",
    engagement_desc: "Thử trực tiếp, bàn về mẫu — chiếc nhẫn đúng cho khoảnh khắc quan trọng nhất.",
    mothers_day_title: "Quà Ngày của Mẹ",
    mothers_day_desc: "Biến tình cảm thành ánh sáng mẹ xứng đáng — ưu đãi tháng 5 đang diễn ra.",
    new_year_title: "Tài lộc đầu năm",
    new_year_desc: "Vàng miếng, đồng vàng thần tài, trang sức may mắn — đầu tư giá trị từ giao dịch đầu năm.",
    investment_title: "Vàng miếng đầu tư",
    investment_desc: "9999 nguyên chất, từ 5 tiền đến 1 lượng, nhiều kích cỡ — giữ giá trị dài hạn.",
  },
  products_preview: {
    eyebrow: "Bộ sưu tập",
    title_a: "Trang sức",
    title_b: "vàng",
    title_c: "chọn lọc.",
    featured: "Nổi bật",
    view_full: "Xem toàn bộ bộ sưu tập",
  },
  about_section: {
    eyebrow: "Xin chào",
    title_a: "Tiệm vàng của khu phố,",
    title_b: "người bạn cũ ở Trung Lịch.",
    body_1: "Tiệm Vàng Sang Lấy ở đường Trung Hòa, Trung Lịch. Một tiệm nhỏ trên đường, sống bằng niềm tin của hàng xóm đã nhìn chúng tôi lớn lên.",
    body_2: "Cưới hỏi, đầy tháng, đính hôn, đổi vàng cũ, thu mua, sửa chữa — chuyện lớn nhỏ đều xin mời vào trò chuyện.",
    body_3_strong: "Dù bạn nói tiếng Trung, Tiếng Việt, Bahasa Indonesia, Filipino, hay ภาษาไทย,",
    body_3_after: "vào tiệm rồi, bạn là bạn của chúng tôi.",
    full_story: "Câu chuyện của chúng tôi",
  },
  testimonials: {
    eyebrow: "Đánh giá thực tế",
    title_a: "Những người bạn",
    title_b: "đã ghé tiệm.",
    rating_note: "★ Google 5.0 · 24+ đánh giá thực tế",
    disclaimer: "※ Tên đã ẩn một phần để bảo vệ riêng tư. Nội dung tham khảo — phản hồi thật sẽ cập nhật khi chính thức ra mắt.",
    occ_a: "Đổi vàng kỷ vật của mẹ",
    quote_a: "Dây chuyền vàng mẹ để lại nằm trong ngăn kéo hơn mười năm. Ở Tiệm Vàng Sang Lấy, họ cân ngay trước mặt tôi, giải thích từng con số, còn giữ lại một mẩu để tôi làm dây chuyền. Về đến nhà tôi mới khóc.",
    name_a: "Cô L",
    occ_b: "Thu mua vàng",
    quote_b: "Tôi nói tiếng Việt; họ nói chậm bằng tiếng Trung đơn giản, còn viết giấy giải thích. Tôi mang 2 sợi dây — họ trả giá cao hơn 2 tiệm khác, nhận tiền mặt ngay trong ngày.",
    name_b: "Cô Nguyễn",
    occ_c: "Cặp nhẫn đính hôn",
    quote_c: "Tôi vào chỉ định xem. Chủ tiệm không ép bán, dành thời gian giải thích trọng lượng và kiểu dáng. Cuối cùng chọn được cặp nhẫn bạn gái rất thích. Lần đầy tháng sẽ quay lại.",
    name_c: "Anh C · Đào Viên",
  },
  contact: {
    eyebrow: "Ghé tiệm",
    title: "Đến tận nơi, gặp vàng thật.",
    intro: "Trước khi đến, thêm LINE để biết giá hôm nay — chúng tôi đợi bạn ở 108 đường Trung Hòa.",
    boutique_info: "Thông tin cửa hàng",
    label_address: "Địa chỉ",
    label_phone: "Điện thoại",
    label_hours: "Giờ mở",
    label_line: "LINE",
    label_ig: "Instagram",
    label_fb: "Facebook",
    address: "108 đường Trung Hòa,\nTrung Lịch, Đào Viên 320",
    hours_value: "Mỗi ngày 10:30 – 20:30",
    line_value: "Kết bạn lin.ee/onfiZgZ",
    ig_value: "@shiny_gold991",
    fb_value: "Tiệm Vàng Sang Lấy",
    cta_call: "Gọi ngay",
    cta_map: "Chỉ đường →",
  },
  cta_block: {
    eyebrow: "Liên hệ",
    title_a: "Cứ",
    title_b: "hỏi nhé.",
    intro_1: "Thêm LINE, gọi điện, hoặc ghé tiệm — đều được.",
    intro_2: "Chúng tôi ở 108 đường Trung Hòa, Trung Lịch.",
    cta_call: "Gọi (03) 280-5908",
    cta_direction: "Chỉ đường",
  },
  footer: {
    brand_line_1: "Tiệm Vàng Sang Lấy · 金閃閃銀樓",
    brand_line_2: "Tiệm vàng uy tín tại Trung Lịch, Đào Viên. Giá công khai, cân tại chỗ, không trừ hao.",
    welcome_line: "Xin chào · 歡迎 · Welcome · Selamat datang · Mabuhay · ยินดีต้อนรับ",
    col_maison: "Về tiệm",
    col_journal: "Bài viết",
    col_contact: "Liên hệ",
    col_boutique: "Cửa hàng",
    boutique_lines: "108 đường Trung Hòa,\nTrung Lịch, Đào Viên 320\n\nMỗi ngày 10:30 – 20:30",
    rights: "© {year} Tiệm Vàng Sang Lấy · Bảo lưu mọi quyền",
    region: "Đào Viên · Đài Loan",
  },
  category_bar: {
    all: "Tất cả",
    rings: "Nhẫn",
    earrings: "Khuyên tai",
    necklaces: "Dây chuyền",
    bracelets: "Vòng tay",
    wedding: "Nhẫn cưới",
    newborn: "Quà em bé",
    bullion: "Vàng miếng",
    custom: "Đặt làm",
  },
  not_found: {
    eyebrow: "404 · Không tìm thấy",
    title: "Trang này biến mất rồi",
    body: "Không tìm thấy trang bạn muốn — có thể đường dẫn cũ, sản phẩm đã rút, hoặc trang vừa chuyển. Quay về trang chủ hoặc ghé tiệm cho chúng tôi biết.",
    home: "← Trang chủ",
    line: "Hỏi qua LINE",
  },
  page_titles: {
    services_eyebrow: "Dịch vụ",
    services_title: "Bốn dịch vụ",
    services_sub: "Đổi vàng cũ, thu mua, đổi trang sức, sửa chữa — để mỗi miếng vàng có đúng nơi đến.",
    products_eyebrow: "Bộ sưu tập",
    products_title: "Trang sức vàng chọn lọc",
    products_sub: "Từng món được lựa kỹ. Cửa hàng còn nhiều hơn — mời ghé thử.",
    about_eyebrow: "Xin chào",
    about_title: "Tiệm vàng của khu phố",
    about_sub: "Trên đường Trung Hòa, Trung Lịch — một tiệm nhỏ, đón mọi bạn bè từ mọi quốc gia.",
    faq_eyebrow: "Câu hỏi",
    faq_title: "Cứ hỏi thẳng",
    faq_sub: "Có gì muốn biết — nhắn LINE hoặc gọi điện trực tiếp.",
    journal_eyebrow: "Bài viết",
    journal_title: "Kiến thức vàng",
    journal_sub: "Từ giữ giá trị đến cách bảo quản — chia sẻ kinh nghiệm nhiều năm của tiệm.",
    reserve_eyebrow: "Đặt lịch · Reserve",
    reserve_title: "Chọn giờ, chúng tôi đợi bạn.",
    reserve_sub: "Đặt lịch để chúng tôi chuẩn bị. Giá công khai, cân tại chỗ, không trừ hao.",
  },
};

// ─────────────────────────────────────────────────────────────
// Bahasa Indonesia (印尼文)
// ─────────────────────────────────────────────────────────────
const id: Dict = {
  common: {
    enquire_line: "Tambah LINE untuk harga",
    reserve: "Reservasi kunjungan",
    call: "Telepon sekarang",
    direction: "Petunjuk arah",
    read_more: "Baca selengkapnya",
    discover: "Pelajari lebih",
    back_journal: "← Kembali ke Jurnal",
    back_home: "← Kembali ke Beranda",
    learn_more: "Pelajari lebih",
    contact: "Hubungi kami",
    welcome: "Selamat datang",
  },
  header: {
    services: "Layanan",
    collection: "Koleksi",
    journal: "Jurnal",
    maison: "Tentang",
    faq: "FAQ",
    reserve_cta: "Reservasi · Reserve",
    call_short: "Telepon",
  },
  topbar: {
    promo_title_default: "Spesial Mei",
    promo_body_default: "Bonus pembelian emas spesial Hari Ibu sedang berlangsung",
    promo_cta_default: "Tanya detail",
    language: "Bahasa",
  },
  hero: {
    eyebrow: "Est. Zhongli · Taoyuan",
    title_a: "Di sini,",
    title_b: "emas",
    title_c: "lebih dari sekadar emas.",
    subtitle_1: "Toko emas terpercaya di Zhongli, Taoyuan.",
    subtitle_2: "Harga terbuka · ditimbang di tempat · perhitungan jelas.",
    cta_a: "Tambah LINE untuk harga hari ini",
    cta_b: "Koleksi",
    rating: "Google ★ 5.0",
    address: "Jl. Zhonghe 108, Zhongli",
    hours: "Setiap hari 10:30 – 20:30",
    phone: "(03) 280-5908",
    maison_tag: "Toko · Shiny Gold",
  },
  ticker: {
    eyebrow: "Live · Harga emas hari ini",
    title_a: "Harga",
    title_b: "pembelian",
    note: "Merah = naik, hijau = turun. Hanya referensi — harga akhir ditimbang di toko.",
  },
  calculator: {
    eyebrow: "Hari Ini · Berapa nilainya",
    title_a: "Bawa emas lama Anda ke Shiny Gold hari ini —",
    title_b: "berapa banyak uang yang bisa didapat?",
    intro_a: "Kalung lama di laci, liontin peninggalan ibu, cincin pernikahan —",
    intro_b: "Masukkan berat, dalam 3 detik tahu estimasi nilai hari ini.",
    intro_note: "Harga real-time mengikuti emas internasional · ditimbang di tempat · tunai langsung · tanpa potongan tersembunyi.",
    step_purity: "01 · Jenis emas Anda?",
    step_unit: "02 · Satuan berat?",
    step_weight: "03 · Kira-kira berapa berat?",
    weight_ph: "Misal 5",
    current_quote: "Harga sekarang ·",
    result_eyebrow: "Hari Ini · Estimasi",
    result_sub_filled: "Bawa ke Shiny Gold hari ini, Anda akan dapat sekitar",
    result_sub_empty: "Masukkan berat untuk melihat nilai",
    result_note: "Dihitung dari harga hari ini · harga akhir ditimbang di toko",
    accurate_q: "Ingin angka tepat?",
    accurate_a: "Tambah LINE atau telepon — kami beri harga real hari ini.",
    cta_call: "Telepon (03) 280-5908",
    cta_line: "Tambah LINE untuk harga real",
    updated: "Diperbarui",
    unit_qian: "Qian (台錢)",
    unit_gram: "Gram (g)",
    unit_tael: "Tael (台兩)",
  },
  services: {
    eyebrow: "Layanan",
    title_a: "Empat",
    title_b: "layanan",
    intro_a: "Shiny Gold bukan hanya perdagangan emas —",
    intro_b: "kami bantu setiap keping emas sampai ke tangan yang tepat di waktu yang tepat.",
    discover_all: "Lihat semua layanan",
    renewal_title: "Tukar tambah",
    renewal_body: "Tukar perhiasan di laci dengan model baru. Hitung harga hari ini — bayar selisihnya saja.",
    recycle_title: "Pembelian emas",
    recycle_body: "Harga terbuka, ditimbang langsung, perhitungan transparan. Tunai di tempat, tanpa potongan.",
    boutique_title: "Tukar perhiasan",
    boutique_body: "Kalung, gelang, cincin — pilih langsung, ada sertifikat berat untuk setiap perhiasan.",
    restoration_title: "Reparasi",
    restoration_body: "Kalung putus, ukur ulang, ubah desain, poles ulang. Hidupkan kembali perhiasan lama Anda.",
  },
  occasions: {
    eyebrow: "Setiap momen",
    title_a: "Untuk setiap momen,",
    title_b: "ada emas yang tepat.",
    explore: "Jelajahi",
    wedding_title: "Emas pernikahan",
    wedding_desc: "Cincin nikah, perhiasan pengantin, batangan — siapkan untuk janji seumur hidup.",
    newborn_title: "Hadiah newborn",
    newborn_desc: "Liontin berukir, gembok keberuntungan — kenangan untuk awal hidupnya.",
    engagement_title: "Cincin tunangan",
    engagement_desc: "Coba langsung, bahas model — cincin yang tepat untuk momen paling penting.",
    mothers_day_title: "Hari Ibu",
    mothers_day_desc: "Ubah kasih jadi cahaya yang ia pantas — bonus spesial Mei berlangsung.",
    new_year_title: "Imlek/Tahun Baru",
    new_year_desc: "Batangan, koin keberuntungan, jimat — investasi nilai dari transaksi pertama tahun ini.",
    investment_title: "Emas batangan",
    investment_desc: "9999 murni, dari 5 qian hingga 1 tael — pilihan menjaga nilai jangka panjang.",
  },
  products_preview: {
    eyebrow: "Koleksi",
    title_a: "Perhiasan",
    title_b: "emas",
    title_c: "pilihan.",
    featured: "Pilihan",
    view_full: "Lihat seluruh koleksi",
  },
  about_section: {
    eyebrow: "Selamat datang",
    title_a: "Toko emas tetangga,",
    title_b: "teman lama di Zhongli.",
    body_1: "Shiny Gold berdiri di Jl. Zhonghe, Zhongli. Toko kecil di pinggir jalan, berjalan dengan kepercayaan tetangga yang melihat kami tumbuh.",
    body_2: "Pernikahan, newborn, tunangan, tukar tambah, pembelian, reparasi — besar kecil, silakan mampir dan ngobrol.",
    body_3_strong: "Mau Anda berbicara Mandarin, Tiếng Việt, Bahasa Indonesia, Filipino, atau ภาษาไทย,",
    body_3_after: "begitu masuk toko, Anda adalah teman kami.",
    full_story: "Cerita kami",
  },
  testimonials: {
    eyebrow: "Suara · Ulasan nyata",
    title_a: "Teman-teman yang",
    title_b: "pernah mampir.",
    rating_note: "★ Google 5.0 · 24+ ulasan lokal",
    disclaimer: "※ Nama disamarkan sebagian untuk privasi. Konten contoh — ulasan asli akan diperbarui setelah resmi.",
    occ_a: "Tukar perhiasan peninggalan ibu",
    quote_a: "Kalung emas peninggalan ibu tersimpan di laci lebih dari sepuluh tahun. Di Shiny Gold mereka menimbang di depan saya, menjelaskan tiap angka, dan menyisakan sedikit untuk saya jadikan kalung. Saya baru menangis setelah pulang.",
    name_a: "Bu L",
    occ_b: "Pembelian emas",
    quote_b: "Saya bicara Vietnam; mereka memperlambat Mandarin sederhana dan menulis di kertas untuk saya. Saya bawa dua kalung — harga lebih bagus dari dua toko lain, tunai di tempat hari yang sama.",
    name_b: "Bu Nguyễn",
    occ_c: "Cincin tunangan",
    quote_c: "Awalnya hanya lewat untuk lihat. Pemilik tak mendesak, malah menjelaskan berat dan model dengan sabar. Akhirnya pilih sepasang cincin yang disukai pacar saya. Untuk newborn nanti saya akan kembali.",
    name_c: "Pak C · Taoyuan",
  },
  contact: {
    eyebrow: "Mampir",
    title: "Datang langsung, lihat emas asli.",
    intro: "Sebelum datang tambah LINE untuk harga hari ini — kami menanti di Jl. Zhonghe 108.",
    boutique_info: "Informasi toko",
    label_address: "Alamat",
    label_phone: "Telepon",
    label_hours: "Jam buka",
    label_line: "LINE",
    label_ig: "Instagram",
    label_fb: "Facebook",
    address: "Jl. Zhonghe 108,\nZhongli, Taoyuan 320",
    hours_value: "Setiap hari 10:30 – 20:30",
    line_value: "Tambah teman lin.ee/onfiZgZ",
    ig_value: "@shiny_gold991",
    fb_value: "Shiny Gold / Taoyuan",
    cta_call: "Telepon",
    cta_map: "Arah →",
  },
  cta_block: {
    eyebrow: "Tanyakan langsung",
    title_a: "Langsung",
    title_b: "tanya saja.",
    intro_1: "Tambah LINE, telepon, atau mampir — semua bisa.",
    intro_2: "Kami di Jl. Zhonghe 108, Zhongli.",
    cta_call: "Telepon (03) 280-5908",
    cta_direction: "Arah",
  },
  footer: {
    brand_line_1: "Shiny Gold Jeweller's · 金閃閃銀樓",
    brand_line_2: "Toko emas terpercaya di Zhongli, Taoyuan. Harga terbuka, ditimbang di tempat, tanpa potongan tersembunyi.",
    welcome_line: "Selamat datang · 歡迎 · Xin chào · Welcome · Mabuhay · ยินดีต้อนรับ",
    col_maison: "Tentang",
    col_journal: "Jurnal",
    col_contact: "Kontak",
    col_boutique: "Toko",
    boutique_lines: "Jl. Zhonghe 108,\nZhongli, Taoyuan 320\n\nSetiap hari 10:30 – 20:30",
    rights: "© {year} Shiny Gold Jeweller's · Hak cipta dilindungi",
    region: "Taoyuan · Taiwan",
  },
  category_bar: {
    all: "Semua",
    rings: "Cincin",
    earrings: "Anting",
    necklaces: "Kalung",
    bracelets: "Gelang",
    wedding: "Pernikahan",
    newborn: "Newborn",
    bullion: "Batangan",
    custom: "Kustom",
  },
  not_found: {
    eyebrow: "404 · Tidak ditemukan",
    title: "Halaman ini hilang",
    body: "Halaman yang Anda cari tidak ditemukan — mungkin link lama, produk tarik, atau halaman baru pindah. Kembali ke beranda atau mampir dan beritahu kami.",
    home: "← Beranda",
    line: "Tanya via LINE",
  },
  page_titles: {
    services_eyebrow: "Layanan",
    services_title: "Empat layanan",
    services_sub: "Tukar tambah, beli, tukar perhiasan, reparasi — bantu setiap emas menemukan jalannya.",
    products_eyebrow: "Koleksi",
    products_title: "Koleksi perhiasan emas",
    products_sub: "Setiap karya dipilih langsung. Di toko lebih lengkap — mari coba.",
    about_eyebrow: "Selamat datang",
    about_title: "Toko emas tetangga",
    about_sub: "Di Jl. Zhonghe, Zhongli — toko kecil, teman dari berbagai negara selamat datang.",
    faq_eyebrow: "FAQ",
    faq_title: "Tanyakan saja.",
    faq_sub: "Apapun yang ingin diketahui — LINE atau telepon langsung.",
    journal_eyebrow: "Jurnal",
    journal_title: "Pengetahuan emas",
    journal_sub: "Dari menjaga nilai hingga perawatan — pengalaman bertahun-tahun jadi tulisan.",
    reserve_eyebrow: "Reservasi · Reserve",
    reserve_title: "Pilih waktu, kami siap.",
    reserve_sub: "Reservasi agar kami bisa siapkan. Harga terbuka, ditimbang di tempat, tanpa potongan.",
  },
};

// ─────────────────────────────────────────────────────────────
// Filipino · Tagalog (菲律賓)
// ─────────────────────────────────────────────────────────────
const fil: Dict = {
  common: {
    enquire_line: "Mag-add ng LINE para sa presyo",
    reserve: "Mag-reserba ng pagdalaw",
    call: "Tumawag agad",
    direction: "Direksyon",
    read_more: "Magbasa pa",
    discover: "Alamin pa",
    back_journal: "← Bumalik sa Journal",
    back_home: "← Bumalik sa Home",
    learn_more: "Alamin pa",
    contact: "Makipag-ugnayan",
    welcome: "Mabuhay",
  },
  header: {
    services: "Serbisyo",
    collection: "Koleksyon",
    journal: "Journal",
    maison: "Tungkol",
    faq: "FAQ",
    reserve_cta: "Reserba · Reserve",
    call_short: "Tawag",
  },
  topbar: {
    promo_title_default: "Espesyal sa Mayo",
    promo_body_default: "Bonus na pag-bili ng ginto para sa Araw ng Ina",
    promo_cta_default: "Tanungin",
    language: "Wika",
  },
  hero: {
    eyebrow: "Est. Zhongli · Taoyuan",
    title_a: "Dito,",
    title_b: "ang ginto",
    title_c: "ay higit pa sa ginto.",
    subtitle_1: "Pinagkakatiwalaang alahero sa Zhongli, Taoyuan.",
    subtitle_2: "Bukas na presyo · timbang sa harap mo · malinaw na kalkulasyon.",
    cta_a: "I-LINE para sa presyo ngayon",
    cta_b: "Koleksyon",
    rating: "Google ★ 5.0",
    address: "108 Zhonghe Rd, Zhongli",
    hours: "Araw-araw 10:30 – 20:30",
    phone: "(03) 280-5908",
    maison_tag: "Maison · Shiny Gold",
  },
  ticker: {
    eyebrow: "Live · Presyo ng ginto ngayon",
    title_a: "Presyo ng",
    title_b: "pagbili",
    note: "Pula = taas, berde = baba. Para lang sa reperensya — totoong presyo timbangin sa tindahan.",
  },
  calculator: {
    eyebrow: "Ngayon · Magkano kaya",
    title_a: "Dalhin ang lumang ginto sa Shiny Gold ngayon —",
    title_b: "magkanong cash ang makukuha?",
    intro_a: "Yung lumang kuwintas sa drawer, alahas ng nanay, pares ng kasal —",
    intro_b: "Ilagay ang timbang, 3 segundo at makikita mo ang halaga ngayon.",
    intro_note: "Real-time na presyo ayon sa internasyonal · timbang sa harap mo · cash agad · walang lihim na bawas.",
    step_purity: "01 · Anong klaseng ginto?",
    step_unit: "02 · Anong unit ng timbang?",
    step_weight: "03 · Halos gaano kabigat?",
    weight_ph: "Halimbawa 5",
    current_quote: "Kasalukuyang presyo ·",
    result_eyebrow: "Ngayon · Tantya",
    result_sub_filled: "Dalhin sa Shiny Gold ngayon, mga ganito ang makukuha",
    result_sub_empty: "Ilagay ang timbang para makita ang halaga",
    result_note: "Tinatantya sa presyo ngayon · totoong presyo timbangin sa tindahan",
    accurate_q: "Gusto ng eksaktong halaga?",
    accurate_a: "Mag-LINE o tumawag — ibibigay namin ang totoong presyo ngayon.",
    cta_call: "Tumawag (03) 280-5908",
    cta_line: "Mag-LINE para sa totoong presyo",
    updated: "Na-update",
    unit_qian: "Qian (台錢)",
    unit_gram: "Gramo (g)",
    unit_tael: "Tael (台兩)",
  },
  services: {
    eyebrow: "Serbisyo",
    title_a: "Apat na",
    title_b: "serbisyo",
    intro_a: "Hindi lang pagbili at pagbenta ng ginto ang Shiny Gold —",
    intro_b: "tinutulungan naming ang bawat piraso ng ginto na makarating sa tamang kamay sa tamang panahon.",
    discover_all: "Lahat ng serbisyo",
    renewal_title: "Palit ng bago",
    renewal_body: "Ipalit ang alahas sa drawer sa bagong disenyo. Presyo ngayon — bayaran lang ang sobra.",
    recycle_title: "Pagbili ng ginto",
    recycle_body: "Bukas na presyo, timbangin sa harap mo, malinaw na bilang. Cash agad, walang bawas.",
    boutique_title: "Palit ng alahas",
    boutique_body: "Kuwintas, pulseras, singsing — pumili nang harapan, may sertipiko ng timbang sa bawat piraso.",
    restoration_title: "Repair at refit",
    restoration_body: "Putol na kadena, palitan ng laki, baguhin ang istilo, pakintabin. Ibalik sa iyo ang lumang alahas.",
  },
  occasions: {
    eyebrow: "Para sa bawat okasyon",
    title_a: "Para sa bawat sandali,",
    title_b: "tamang ginto.",
    explore: "Tuklasin",
    wedding_title: "Ginto ng kasal",
    wedding_desc: "Singsing ng kasal, mga piraso ng selebrasyon, batangan — para sa pangakong habang buhay.",
    newborn_title: "Regalo sa newborn",
    newborn_desc: "Liontin na may pangalan, lockets — bendisyon sa unang taon ng anak.",
    engagement_title: "Singsing ng pakikipagtipan",
    engagement_desc: "Subukan nang harapan, pag-usapan ang istilo — tamang singsing sa pinakamahalagang sandali.",
    mothers_day_title: "Araw ng Ina",
    mothers_day_desc: "Ibalik ang pagmamahal bilang ilaw na karapat-dapat sa kanya — May espesyal sa Mayo.",
    new_year_title: "Lunar New Year",
    new_year_desc: "Batangan, lucky coin, charm — i-invest ang halaga sa unang transaksyon ng taon.",
    investment_title: "Investment bullion",
    investment_desc: "9999 purong ginto, mula 5 qian hanggang 1 tael — pangmatagalang halaga, maraming sukat.",
  },
  products_preview: {
    eyebrow: "Koleksyon",
    title_a: "Piling",
    title_b: "gintong",
    title_c: "alahas.",
    featured: "Tampok",
    view_full: "Buong koleksyon",
  },
  about_section: {
    eyebrow: "Mabuhay",
    title_a: "Alahero ng kapitbahay,",
    title_b: "matandang kaibigan sa Zhongli.",
    body_1: "Nasa Zhonghe Rd, Zhongli ang Shiny Gold. Maliit na tindahan sa kalye, lumalakad sa tiwala ng kapitbahay na nakakitang lumalaki kami.",
    body_2: "Kasal, newborn, engagement, palit-bago, pagbili, repair — maliit man o malaki, pasok lang at mag-usap tayo.",
    body_3_strong: "Magsalita ka man ng Mandarin, Tiếng Việt, Bahasa Indonesia, Filipino, o ภาษาไทย,",
    body_3_after: "kapag pumasok ka, kaibigan ka na namin.",
    full_story: "Aming Kuwento",
  },
  testimonials: {
    eyebrow: "Boses · Totoong review",
    title_a: "Mga kaibigan na",
    title_b: "nakapasok.",
    rating_note: "★ Google 5.0 · 24+ lokal na review",
    disclaimer: "※ Pangalan ay bahagyang nai-anonimize para sa privacy. Sample review — totoong review papalit kapag live na.",
    occ_a: "Palit ng alahas ni nanay",
    quote_a: "Ang gintong kuwintas ni nanay nasa drawer ng mahigit sampung taon. Sa Shiny Gold, tinimbang sa harap ko, ipinaliwanag ang bawat numero, at iniwanan ang maliit na piraso para gawin kong kuwintas. Sa bahay ko lang umiyak.",
    name_a: "Bb. L",
    occ_b: "Pagbili ng ginto",
    quote_b: "Vietnamese ang sinasalita ko; binagal nila ang simple nilang Mandarin at isinulat sa papel para sa akin. Dalawang kuwintas ang dinala ko — mas mahal ang presyo nila kaysa dalawang ibang tindahan, cash agad sa parehong araw.",
    name_b: "Bb. Nguyễn",
    occ_c: "Singsing ng pakikipagtipan",
    quote_c: "Pumasok lang para tumingin. Hindi pinilit ng may-ari, ipinaliwanag ang timbang at istilo. Napunta sa pares na gustong-gusto ng nobya ko. Babalik kami para sa newborn.",
    name_c: "G. C · Taoyuan",
  },
  contact: {
    eyebrow: "Dalawin kami",
    title: "Tingnan mismo ang totoong ginto.",
    intro: "Bago dumalaw, mag-LINE para sa presyo ngayon — nasa 108 Zhonghe Rd kami.",
    boutique_info: "Impormasyon ng tindahan",
    label_address: "Address",
    label_phone: "Telepono",
    label_hours: "Oras",
    label_line: "LINE",
    label_ig: "Instagram",
    label_fb: "Facebook",
    address: "108 Zhonghe Rd,\nZhongli, Taoyuan 320",
    hours_value: "Araw-araw 10:30 – 20:30",
    line_value: "Idagdag bilang kaibigan lin.ee/onfiZgZ",
    ig_value: "@shiny_gold991",
    fb_value: "Shiny Gold / Taoyuan",
    cta_call: "Tumawag",
    cta_map: "Direksyon →",
  },
  cta_block: {
    eyebrow: "Itanong lang",
    title_a: "Itanong",
    title_b: "lang.",
    intro_1: "Mag-LINE, tumawag, o dumalaw — okay lahat.",
    intro_2: "Nasa 108 Zhonghe Rd, Zhongli kami.",
    cta_call: "Tumawag (03) 280-5908",
    cta_direction: "Direksyon",
  },
  footer: {
    brand_line_1: "Shiny Gold Jeweller's · 金閃閃銀樓",
    brand_line_2: "Tapat na alahero sa Zhongli, Taoyuan. Bukas na presyo, timbang sa harap, walang lihim na bawas.",
    welcome_line: "Mabuhay · 歡迎 · Xin chào · Selamat datang · Welcome · ยินดีต้อนรับ",
    col_maison: "Tungkol",
    col_journal: "Journal",
    col_contact: "Contact",
    col_boutique: "Tindahan",
    boutique_lines: "108 Zhonghe Rd,\nZhongli, Taoyuan 320\n\nAraw-araw 10:30 – 20:30",
    rights: "© {year} Shiny Gold Jeweller's · Lahat ng karapatan nakareserba",
    region: "Taoyuan · Taiwan",
  },
  category_bar: {
    all: "Lahat",
    rings: "Singsing",
    earrings: "Hikaw",
    necklaces: "Kuwintas",
    bracelets: "Pulseras",
    wedding: "Kasal",
    newborn: "Newborn",
    bullion: "Batangan",
    custom: "Custom",
  },
  not_found: {
    eyebrow: "404 · Hindi nahanap",
    title: "Wala na ang pahinang ito",
    body: "Hindi namin nakita ang hinahanap mo — siguro luma ang link, na-delist ang item, o kalilipat lang. Bumalik sa home o dumalaw at sabihin sa amin.",
    home: "← Home",
    line: "Tanong sa LINE",
  },
  page_titles: {
    services_eyebrow: "Serbisyo",
    services_title: "Apat na serbisyo",
    services_sub: "Palit-bago, pagbili, palit, repair — para sa bawat ginto ang tamang landas.",
    products_eyebrow: "Koleksyon",
    products_title: "Koleksyon ng alahas",
    products_sub: "Bawat piraso pinili nang maigi. Mas marami sa tindahan — pasok at subukan.",
    about_eyebrow: "Mabuhay",
    about_title: "Alahero ng kapitbahay",
    about_sub: "Sa Zhonghe Rd, Zhongli — maliit na tindahan, malugod sa lahat ng bansa.",
    faq_eyebrow: "FAQ",
    faq_title: "Magtanong lang.",
    faq_sub: "Anumang gusto mong malaman — mag-LINE o tumawag.",
    journal_eyebrow: "Journal",
    journal_title: "Kaalaman tungkol sa ginto",
    journal_sub: "Mula sa pangangalaga ng halaga hanggang pang-araw-araw — taong-tao ng karanasan sa tindahan.",
    reserve_eyebrow: "Reserba · Reserve",
    reserve_title: "Pumili ng oras, handa kami.",
    reserve_sub: "Mag-reserba para maipaghanda namin. Bukas na presyo, timbang sa harap, walang bawas.",
  },
};

// ─────────────────────────────────────────────────────────────
// ภาษาไทย (泰文)
// ─────────────────────────────────────────────────────────────
const th: Dict = {
  common: {
    enquire_line: "เพิ่ม LINE เพื่อดูราคา",
    reserve: "จองเข้าชม",
    call: "โทรเลย",
    direction: "เส้นทาง",
    read_more: "อ่านเพิ่ม",
    discover: "ดูเพิ่มเติม",
    back_journal: "← กลับไปบทความ",
    back_home: "← กลับหน้าแรก",
    learn_more: "ดูเพิ่มเติม",
    contact: "ติดต่อเรา",
    welcome: "ยินดีต้อนรับ",
  },
  header: {
    services: "บริการ",
    collection: "คอลเลกชัน",
    journal: "บทความ",
    maison: "เกี่ยวกับ",
    faq: "คำถาม",
    reserve_cta: "จองเข้าชม · Reserve",
    call_short: "โทร",
  },
  topbar: {
    promo_title_default: "พิเศษเดือนพฤษภาคม",
    promo_body_default: "โปรโมชั่นรับซื้อทองวันแม่กำลังดำเนินอยู่",
    promo_cta_default: "ดูรายละเอียด",
    language: "ภาษา",
  },
  hero: {
    eyebrow: "Est. จงลี่ · เถาหยวน",
    title_a: "ที่นี่",
    title_b: "ทองคำ",
    title_c: "เป็นมากกว่าทอง",
    subtitle_1: "ร้านทองที่ไว้ใจได้ในจงลี่ เถาหยวน",
    subtitle_2: "ราคาเปิดเผย · ชั่งต่อหน้า · คำนวณชัดเจน",
    cta_a: "เพิ่ม LINE ดูราคาวันนี้",
    cta_b: "คอลเลกชัน",
    rating: "Google ★ 5.0",
    address: "108 ถ.จงเหอ จงลี่",
    hours: "ทุกวัน 10:30 – 20:30",
    phone: "(03) 280-5908",
    maison_tag: "เมซง · Shiny Gold",
  },
  ticker: {
    eyebrow: "Live · ราคาทองวันนี้",
    title_a: "ราคา",
    title_b: "รับซื้อ",
    note: "แดง = ขึ้น เขียว = ลง. เพื่ออ้างอิงเท่านั้น — ราคาจริงชั่งที่ร้าน",
  },
  calculator: {
    eyebrow: "วันนี้ · แลกได้เท่าไหร่",
    title_a: "เอาทองเก่ามาที่ Shiny Gold วันนี้ —",
    title_b: "จะได้เงินสดประมาณเท่าไหร่?",
    intro_a: "สร้อยเก่าในลิ้นชัก แผ่นทองจากแม่ แหวนหมั้นคู่ —",
    intro_b: "ใส่น้ำหนัก 3 วินาทีเห็นราคาประมาณการวันนี้",
    intro_note: "ราคาตามตลาดนานาชาติแบบเรียลไทม์ · ชั่งต่อหน้า · เงินสดทันที · ไม่หักลด",
    step_purity: "01 · ทองชนิดไหน?",
    step_unit: "02 · หน่วยน้ำหนัก?",
    step_weight: "03 · ประมาณน้ำหนักเท่าไหร่?",
    weight_ph: "เช่น 5",
    current_quote: "ราคาปัจจุบัน ·",
    result_eyebrow: "วันนี้ · ประมาณการ",
    result_sub_filled: "เอามาที่ Shiny Gold วันนี้ ได้ประมาณ",
    result_sub_empty: "ใส่น้ำหนักเพื่อดูมูลค่า",
    result_note: "คำนวณจากราคาวันนี้ · ราคาจริงชั่งที่ร้าน",
    accurate_q: "อยากได้ราคาที่แน่นอน?",
    accurate_a: "เพิ่ม LINE หรือโทร — เราบอกราคาจริงวันนี้",
    cta_call: "โทร (03) 280-5908",
    cta_line: "เพิ่ม LINE ดูราคาจริง",
    updated: "อัปเดต",
    unit_qian: "เฉียน (台錢)",
    unit_gram: "กรัม (g)",
    unit_tael: "ตำลึง (台兩)",
  },
  services: {
    eyebrow: "บริการ",
    title_a: "สี่",
    title_b: "บริการ",
    intro_a: "Shiny Gold ไม่ได้แค่ซื้อขายทอง —",
    intro_b: "เราช่วยให้ทุกชิ้นของทองคำ ถึงมือที่ใช่ ในเวลาที่ใช่",
    discover_all: "ดูบริการทั้งหมด",
    renewal_title: "เปลี่ยนทองเก่าเป็นใหม่",
    renewal_body: "เปลี่ยนเครื่องประดับในลิ้นชักเป็นแบบใหม่ คำนวณราคาวันนี้ จ่ายแค่ส่วนต่าง",
    recycle_title: "รับซื้อทอง",
    recycle_body: "ราคาเปิดเผย ชั่งต่อหน้า คำนวณโปร่งใส เงินสดทันที ไม่หัก",
    boutique_title: "แลกเปลี่ยนเครื่องประดับ",
    boutique_body: "สร้อย กำไล แหวน — เลือกที่ร้าน มีใบรับรองน้ำหนักทุกชิ้น",
    restoration_title: "ซ่อมและปรับ",
    restoration_body: "สร้อยขาด ปรับขนาด เปลี่ยนแบบ ขัดเงา ทำให้ของเก่าสวมใส่ได้อีกครั้ง",
  },
  occasions: {
    eyebrow: "ทุกโอกาส",
    title_a: "ทุกช่วงเวลา",
    title_b: "ทองที่เหมาะสม",
    explore: "สำรวจ",
    wedding_title: "ทองแต่งงาน",
    wedding_desc: "แหวนแต่งงาน ทองสินสอด แท่งทอง — เตรียมไว้สำหรับคำสัญญาทั้งชีวิต",
    newborn_title: "ของขวัญเด็กแรกเกิด",
    newborn_desc: "แผ่นทองสลักชื่อ จี้ทองนำโชค — ส่งความปรารถนาดีให้ลูกตั้งแต่แรก",
    engagement_title: "แหวนหมั้น",
    engagement_desc: "ลองสวมเอง คุยเรื่องแบบ — แหวนที่ใช่สำหรับช่วงเวลาสำคัญที่สุด",
    mothers_day_title: "วันแม่",
    mothers_day_desc: "เปลี่ยนความรักเป็นแสงที่แม่คู่ควร — โปรโมชั่นพิเศษเดือนพฤษภาคม",
    new_year_title: "ตรุษจีน",
    new_year_desc: "แท่งทอง เหรียญนำโชค เครื่องประดับมงคล — ลงทุนในมูลค่าตั้งแต่ธุรกรรมแรกของปี",
    investment_title: "ทองคำแท่งลงทุน",
    investment_desc: "9999 บริสุทธิ์ ตั้งแต่ 5 เฉียนถึง 1 ตำลึง — เก็บมูลค่าระยะยาว มีหลายขนาด",
  },
  products_preview: {
    eyebrow: "คอลเลกชัน",
    title_a: "เครื่องประดับ",
    title_b: "ทอง",
    title_c: "คัดสรร",
    featured: "พิเศษ",
    view_full: "ดูคอลเลกชันทั้งหมด",
  },
  about_section: {
    eyebrow: "ยินดีต้อนรับ",
    title_a: "ร้านทองของเพื่อนบ้าน",
    title_b: "เพื่อนเก่าในจงลี่",
    body_1: "Shiny Gold ตั้งอยู่บนถนนจงเหอ จงลี่ ร้านเล็ก ๆ บนถนน ทำธุรกิจด้วยความไว้ใจของเพื่อนบ้านที่เห็นเราเติบโต",
    body_2: "งานแต่ง วันเกิดลูก หมั้น เปลี่ยนทองเก่า รับซื้อ ซ่อม — เรื่องเล็กใหญ่ ยินดีต้อนรับเข้ามาคุย",
    body_3_strong: "ไม่ว่าคุณจะพูดภาษาจีน เวียดนาม อินโดนีเซีย ฟิลิปปินส์ หรือไทย",
    body_3_after: "เมื่อก้าวเข้าร้านแล้ว คุณคือเพื่อนของเรา",
    full_story: "เรื่องราวของเรา",
  },
  testimonials: {
    eyebrow: "เสียงจริง · รีวิวจริง",
    title_a: "เพื่อน ๆ ที่",
    title_b: "เคยมาร้าน",
    rating_note: "★ Google 5.0 · 24+ รีวิวในพื้นที่",
    disclaimer: "※ ชื่อปกปิดบางส่วนเพื่อความเป็นส่วนตัว เนื้อหาตัวอย่าง — รีวิวจริงจะอัปเดตเมื่อเปิดตัว",
    occ_a: "เปลี่ยนทองเก่าของแม่",
    quote_a: "สร้อยทองของแม่อยู่ในลิ้นชักมากว่าสิบปี ที่ Shiny Gold เขาชั่งให้ดูต่อหน้า อธิบายทุกตัวเลข เก็บชิ้นเล็ก ๆ ไว้ให้ทำสร้อย กลับถึงบ้านฉันถึงร้องไห้",
    name_a: "คุณ L",
    occ_b: "รับซื้อทอง",
    quote_b: "ฉันพูดภาษาเวียดนาม เขาพูดจีนช้า ๆ และเขียนกระดาษให้ฉัน ฉันเอาสร้อยสองเส้นไป — ราคาดีกว่าอีกสองร้าน ได้เงินสดวันเดียวกัน",
    name_b: "คุณเหงียน",
    occ_c: "แหวนหมั้น",
    quote_c: "ตอนแรกเดินผ่านมาแค่อยากดู เจ้าของไม่บังคับขาย กลับใช้เวลาอธิบายน้ำหนักและแบบ สุดท้ายเลือกคู่ที่แฟนชอบมาก ครั้งหน้างานวันเกิดลูกจะกลับมา",
    name_c: "คุณ C · เถาหยวน",
  },
  contact: {
    eyebrow: "เยี่ยมร้าน",
    title: "มาดูทองคำของจริงด้วยตัวเอง",
    intro: "ก่อนมา เพิ่ม LINE เพื่อดูราคาวันนี้ — เรารออยู่ที่ 108 ถ.จงเหอ",
    boutique_info: "ข้อมูลร้าน",
    label_address: "ที่อยู่",
    label_phone: "โทรศัพท์",
    label_hours: "เวลาเปิด",
    label_line: "LINE",
    label_ig: "Instagram",
    label_fb: "Facebook",
    address: "108 ถ.จงเหอ\nจงลี่ เถาหยวน 320",
    hours_value: "ทุกวัน 10:30 – 20:30",
    line_value: "เพิ่มเพื่อน lin.ee/onfiZgZ",
    ig_value: "@shiny_gold991",
    fb_value: "Shiny Gold / Taoyuan",
    cta_call: "โทร",
    cta_map: "เส้นทาง →",
  },
  cta_block: {
    eyebrow: "ติดต่อสอบถาม",
    title_a: "ถาม",
    title_b: "ได้เลย",
    intro_1: "เพิ่ม LINE โทร หรือมาเอง — ได้หมด",
    intro_2: "เราอยู่ที่ 108 ถ.จงเหอ จงลี่",
    cta_call: "โทร (03) 280-5908",
    cta_direction: "เส้นทาง",
  },
  footer: {
    brand_line_1: "Shiny Gold Jeweller's · 金閃閃銀樓",
    brand_line_2: "ร้านทองที่ซื่อสัตย์ในจงลี่ เถาหยวน ราคาเปิดเผย ชั่งต่อหน้า ไม่มีหักลด",
    welcome_line: "ยินดีต้อนรับ · 歡迎 · Xin chào · Selamat datang · Mabuhay · Welcome",
    col_maison: "เกี่ยวกับ",
    col_journal: "บทความ",
    col_contact: "ติดต่อ",
    col_boutique: "ร้าน",
    boutique_lines: "108 ถ.จงเหอ\nจงลี่ เถาหยวน 320\n\nทุกวัน 10:30 – 20:30",
    rights: "© {year} Shiny Gold Jeweller's · สงวนลิขสิทธิ์ทั้งหมด",
    region: "เถาหยวน · ไต้หวัน",
  },
  category_bar: {
    all: "ทั้งหมด",
    rings: "แหวน",
    earrings: "ต่างหู",
    necklaces: "สร้อยคอ",
    bracelets: "สร้อยข้อมือ",
    wedding: "แต่งงาน",
    newborn: "เด็กแรกเกิด",
    bullion: "แท่ง",
    custom: "สั่งทำ",
  },
  not_found: {
    eyebrow: "404 · ไม่พบหน้า",
    title: "หน้านี้หายไปแล้ว",
    body: "ไม่พบหน้าที่คุณต้องการ — อาจเป็นลิงก์เก่า สินค้าถูกถอดออก หรือเพิ่งย้าย กลับหน้าแรกหรือมาที่ร้านบอกเราได้",
    home: "← หน้าแรก",
    line: "ถามทาง LINE",
  },
  page_titles: {
    services_eyebrow: "บริการ",
    services_title: "สี่บริการ",
    services_sub: "เปลี่ยนทองเก่า รับซื้อ แลกเปลี่ยน ซ่อม — ให้ทุกทองมีทางที่เหมาะสม",
    products_eyebrow: "คอลเลกชัน",
    products_title: "คอลเลกชันเครื่องประดับทอง",
    products_sub: "แต่ละชิ้นคัดสรรเอง ในร้านมีให้เลือกมากกว่า มาลองดูได้",
    about_eyebrow: "ยินดีต้อนรับ",
    about_title: "ร้านทองของเพื่อนบ้าน",
    about_sub: "ที่ถนนจงเหอ จงลี่ — ร้านเล็ก ๆ ยินดีต้อนรับเพื่อนจากทุกประเทศ",
    faq_eyebrow: "FAQ",
    faq_title: "ถามตรง ๆ ได้เลย",
    faq_sub: "อยากรู้อะไร — LINE หรือโทรหาเราได้เลย",
    journal_eyebrow: "บทความ",
    journal_title: "ความรู้เกี่ยวกับทอง",
    journal_sub: "จากการเก็บมูลค่าถึงการดูแลประจำวัน ประสบการณ์หลายปีในร้านในรูปแบบบทความ",
    reserve_eyebrow: "จอง · Reserve",
    reserve_title: "เลือกเวลา เรารอ",
    reserve_sub: "จองล่วงหน้าเพื่อเราจะได้เตรียมไว้ ราคาเปิดเผย ชั่งต่อหน้า ไม่หัก",
  },
};

export const DICTIONARY: Record<Locale, Dict> = {
  "zh-TW": zhTW,
  vi,
  en,
  id,
  fil,
  th,
};

export function getDict(locale: Locale): Dict {
  return DICTIONARY[locale] ?? DICTIONARY["zh-TW"];
}
