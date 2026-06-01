# 金閃閃銀樓 - 上線手冊(Vercel)

## 為什麼用 Vercel?

- **Next.js 親兒子**:Vercel 是做 Next.js 的同一家公司,所有功能(API、admin、middleware、Server Action、圖片優化)**全跑得動,跟你本機 dev 一樣**
- **免費方案**:小型銀樓網站完全在免費額度內(每月 100 GB 流量、無限頁面)
- **HTTPS 自動**:點兩下就有綠色鎖頭
- **自動部署**:推 Git 一次,網站秒更新
- **預覽功能**:每個 commit 自動產生一個預覽連結,試完再正式上

---

## 上線需要的東西

1. **GitHub 帳號**(免費)
2. **Vercel 帳號**(免費,用 GitHub 登入)
3. **Supabase 專案**(免費,已有就跳過)
4. **網域名稱**(選擇性,沒有就用 `xxx.vercel.app` 也可以)

---

## Step 1 - 把專案推上 GitHub

### A. 安裝 GitHub CLI(一次性)

開終端機:

```bash
brew install gh
gh auth login
```

照螢幕指示用瀏覽器登入。

### B. 建 repo + 推上去

在專案資料夾內:

```bash
cd /Users/qiuyiru/Downloads/gino-agent/jinshanshan-web
gh repo create jinshanshan-web --private --source=. --remote=origin --push
```

私人 repo(別人看不到原始碼)。如果你想 open source 就把 `--private` 改成 `--public`。

⚠️ **千萬不要 commit `.env.local`** —— 我已經幫你把它放到 `.gitignore`,GitHub 不會收到你的 Supabase / Admin 密碼。

---

## Step 2 - Vercel 連 GitHub

1. 打開 [https://vercel.com](https://vercel.com) → **Sign Up** → 選 **Continue with GitHub**
2. 授權 Vercel 讀取你的 GitHub repo
3. Dashboard 點 **Add New → Project**
4. 找到剛 push 的 `jinshanshan-web` repo → 點 **Import**
5. **Framework Preset** 它會自動偵測成 `Next.js`(對的)
6. **Build Settings** 全部用預設(不用動)
7. 先**不要按 Deploy**,先設環境變數(下一步)

---

## Step 3 - 填環境變數

在 Vercel 的 **Environment Variables** 區塊,填這 4 個:

| Key | Value | 從哪拿 |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGc...` | 同上 → anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGc...` | 同上 → service_role secret(⚠️ 保密) |
| `ADMIN_PASSWORD` | 你想用的後台密碼 | 自己設,例 `gino2026!` |

(選擇性)再加一個:

| Key | Value |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | 你的正式網域 例 `https://shinygold.tw` |

用來產 sitemap / robots.txt / og 圖的絕對網址。沒填用預設值無妨,綁網域後再回來改。

填完按 **Deploy**。等 1-2 分鐘第一次部署完。

---

## Step 4 - 拿到正式網址

部署成功後 Vercel 會給你:
- 預設網址:`https://jinshanshan-web-xxx.vercel.app`
- 點 **Visit** 在瀏覽器打開,就是上線的正式網站

**這個網址直接傳給老闆、客人都能看**,HTTPS 自動有了。

---

## Step 5 - 綁自己的網域(選擇性)

### 沒網域?先去買一個:
- [GoDaddy](https://godaddy.com) / [Namecheap](https://namecheap.com) / [Cloudflare](https://cloudflare.com/products/registrar/)
- 推薦 `.com.tw` 或 `.tw` (台灣銀樓在地感)
- 預算:`shinygold.com.tw` 一年約 NT$ 800、`shinygold.tw` 一年約 NT$ 1,200

### 已有網域?

在 Vercel 專案頁:

1. **Settings → Domains** → **Add**
2. 輸入你的網域 `shinygold.tw`
3. Vercel 會給你 DNS 設定指示,類似:
   - `A` 紀錄指向 `76.76.21.21`
   - `CNAME` 紀錄 `www` → `cname.vercel-dns.com`
4. 到你的域名供應商後台填這兩條
5. 等 5-30 分鐘 DNS 傳播完
6. 回 Vercel 重新整理,綠勾就上了

完成後:
- `https://shinygold.tw` ← 你的正式網域
- HTTPS 自動,SSL 證書 Vercel 免費搞定

---

## Step 6 - 跑 Supabase migrations

如果還沒跑過,到 Supabase Dashboard → SQL Editor 依序貼這 4 份 SQL 跑:

```
supabase/migrations/001_schema.sql        ← 建 4 張表
supabase/migrations/002_rls_policies.sql  ← 公開讀取政策
supabase/migrations/003_seed.sql          ← 灌示意資料(選擇性)
supabase/migrations/004_storage.sql       ← 圖片上傳 bucket
```

跑完後到 `/admin/login` 用 Step 3 設的 `ADMIN_PASSWORD` 登入,商品/文章/促銷/金價覆寫全部可寫入。

---

## 之後怎麼更新網站

只要在本機改完 code:

```bash
git add -A
git commit -m "更新 XXX"
git push
```

Vercel 偵測到 push **自動部署**,30 秒~ 1 分鐘網站就更新。

---

## 常見問題

### Q: Vercel 部署失敗?
看 Vercel Build Logs。最常見:
- 環境變數沒填 → 補上
- TypeScript error → 在本機跑 `npm run build` 先確認

### Q: 後台改商品/文章,前台沒立刻變?
我已經設 `revalidatePath()`,後台 server action 完成後**幾秒內**前台會自動更新。如果還沒變,F5 硬重整。

### Q: 圖片上傳壞掉?
確認 Supabase Storage `media` bucket 是 public、`004_storage.sql` 跑過了、`SUPABASE_SERVICE_ROLE_KEY` 環境變數填對。

### Q: 後台密碼忘了?
到 Vercel → Project Settings → Environment Variables → 改 `ADMIN_PASSWORD` 後 redeploy。

### Q: 想還原舊版?
Vercel Deployments 頁可以看歷史每個版本,點任何一版的 ... → **Promote to Production** 立刻回滾。

---

## 上線檢查清單

- [ ] Supabase 4 份 migration 都跑過
- [ ] `.env.local` 在本機有(自己用),Vercel 也填好 4 個環境變數
- [ ] `gh repo create` 推上 GitHub 成功
- [ ] Vercel 自動偵測 Next.js → 部署成功
- [ ] 開 `https://xxx.vercel.app` 看得到首頁
- [ ] 試 `/admin/login` 登入後台
- [ ] 用後台改一筆商品 → 看前台 `/products` 真的更新
- [ ] 試 `/admin/gold-price` 設一筆今日金價 → 看 Ticker 真的吃到新值
- [ ] (選)綁自己的網域 + 等 DNS
- [ ] 給老闆網址!
