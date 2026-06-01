# 金閃閃銀樓 - Supabase 後台設定步驟

## 為什麼要做這個

現在網站上的商品、文章、促銷訊息都是**寫死的示意資料**。
接 Supabase 之後,你會有:

- **真實的資料庫**(免費方案夠用)
- **商品/文章 後台**(下一階段 Phase 4 會做 UI)
- **每天可以後台手動覆寫今日金價**(優先於詮美 + 國際金價自動算)
- **促銷活動可以排程上下檔**

**目前狀態:** 沒設定 Supabase 也沒關係,網站完全照常運作(用程式內建的 fallback 示意資料)。

---

## 設定步驟(約 15 分鐘)

### 1. 註冊 Supabase

1. 到 [https://supabase.com](https://supabase.com) 用 GitHub / Google 註冊
2. 點 **New Project**
3. 填:
   - Organization:`gino` 或任意
   - Name:`jinshanshan` 或 `shiny-gold`
   - Database Password:**設一個強密碼,務必抄下來**(會用於資料庫直連)
   - Region:**Tokyo (ap-northeast-1)** 或 **Singapore (ap-southeast-1)**(離台灣最近)
   - Plan:**Free**(夠用)
4. 等 1-2 分鐘專案建好

### 2. 跑 SQL Migration(建表)

在 Supabase Dashboard:

1. 左側 **SQL Editor** → **New query**
2. 把 `supabase/migrations/001_schema.sql` 整個檔內容貼上 → **Run**
3. 跑第二份 `supabase/migrations/002_rls_policies.sql` → **Run**
4. (選擇性)跑第三份 `supabase/migrations/003_seed.sql` 灌示意資料 → **Run**

順利的話會看到「Success. No rows returned」訊息。

### 3. 拿 API Key + URL

1. 左側 **Settings**(齒輪)→ **API**
2. 看到三個東西要抄到 `.env.local`:
   - **Project URL** → 對應 `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → 對應 `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret** key → 對應 `SUPABASE_SERVICE_ROLE_KEY`
     - ⚠️ 這把鑰匙能繞過所有 RLS 政策,**千萬不要 commit 到 git、不要貼公開地方**

### 4. 填入 `.env.local`

在專案根目錄建一個檔案 `.env.local`(我已經給你 `.env.local.example` 當範本):

```
NEXT_PUBLIC_SUPABASE_URL=https://abcxyz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
ADMIN_PASSWORD=你自己設一個
```

### 5. 重啟 dev server

```
npm run dev
```

重新整理首頁,如果你跑過 seed migration,商品、文章、TopBar 促銷訊息會從 Supabase 撈出來。
沒跑 seed 的話會自動 fallback 到內建示意資料(網站不會壞)。

---

## 之後可以做什麼

| 階段 | 內容 |
|---|---|
| Phase 4 | 後台管理介面(/admin):登入、商品/文章 CRUD、促銷管理、金價手動覆寫 |
| Phase 5 | 中越英印菲泰 六語切換真的接線 |
| Phase 6 | 部署到 Vercel + 綁網域 |

---

## 我幫你準備好的東西

- `lib/supabase/client.ts` — 瀏覽器用的 client
- `lib/supabase/server.ts` — Server Component / Route Handler 用
- `lib/supabase/types.ts` — TypeScript 型別
- `lib/data/products.ts` — 撈商品(含 fallback)
- `lib/data/articles.ts` — 撈文章
- `lib/data/promotions.ts` — 撈促銷
- `lib/data/gold-override.ts` — 撈當日金價老闆覆寫值
- `supabase/migrations/001_schema.sql` — 4 張表
- `supabase/migrations/002_rls_policies.sql` — RLS 政策
- `supabase/migrations/003_seed.sql` — 12 件商品 + 4 篇文章 + 1 個促銷示意資料

## 已經接好 Supabase 的元件/頁面

- `components/ProductsPreview.tsx` — 首頁精選商品
- `components/TopBar.tsx` — 頂部促銷條
- `app/products/page.tsx` — 商品總覽
- `app/articles/page.tsx` — 文章總覽
- `app/api/gold-price/route.ts` — 老闆覆寫優先於 詮美 + 國際金價

沒接 Supabase 時這些都會 fallback 到示意資料,**完全不會壞站**。
