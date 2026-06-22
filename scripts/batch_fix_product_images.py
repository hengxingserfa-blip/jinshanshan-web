#!/usr/bin/env python3
"""批次修整商品照 — OCR + inpaint + 右下角新格式字 + 上傳覆蓋

執行:
  python3 scripts/batch_fix_product_images.py --dry-run --limit 10   # 試跑前 10 張,不上傳
  python3 scripts/batch_fix_product_images.py --limit 10              # 試跑 + 上傳
  python3 scripts/batch_fix_product_images.py                         # 全部

特性:
  - 可中斷恢復(讀 /tmp/batch_fix_log.jsonl 跳過已處理)
  - 自動備份原圖到 Supabase Storage 的 products-backup/ 路徑
  - OCR 失敗自動跳過,標記為 skip
"""
import argparse, json, os, re, subprocess, sys, time
from pathlib import Path
from urllib.parse import urlparse
import urllib.request

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

# ── 設定 ──────────────────────────────────────────────
SUPABASE_URL = "https://jwzdhnmxlybeikysbokf.supabase.co"
SR_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3emRobm14bHliZWlreXNib2tmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDQ2MTE4OCwiZXhwIjoyMDk2MDM3MTg4fQ.rUkBbERGRAxIP3v1dJudYrE4YA9cIsZlKfDFPpTzk9Q"
BUCKET = "media"
BACKUP_PREFIX = "products-backup"

FONT_PATH = "/System/Library/Fonts/Supplemental/Arial Bold Italic.ttf"
OCR_SWIFT = "/tmp/ocr.swift"
LOG_FILE = "/tmp/batch_fix_log.jsonl"
PREVIEW_DIR = "/tmp/batch_preview"

# ── Supabase 操作 ────────────────────────────────────
HEADERS = {"apikey": SR_KEY, "Authorization": f"Bearer {SR_KEY}"}

def list_products(offset=0, limit=1000):
    url = f"{SUPABASE_URL}/rest/v1/products?image_url=not.is.null&select=id,slug,name_zh,image_url,weight_qian&order=created_at.asc&offset={offset}&limit={limit}"
    req = urllib.request.Request(url, headers=HEADERS)
    return json.loads(urllib.request.urlopen(req).read())

def storage_copy(src_path, dst_path):
    """在 Supabase Storage 內複製檔案"""
    url = f"{SUPABASE_URL}/storage/v1/object/copy"
    body = json.dumps({
        "bucketId": BUCKET,
        "sourceKey": src_path,
        "destinationKey": dst_path,
    }).encode()
    req = urllib.request.Request(
        url, data=body, method="POST",
        headers={**HEADERS, "Content-Type": "application/json"}
    )
    try:
        urllib.request.urlopen(req)
        return True
    except urllib.error.HTTPError as e:
        # 409 = 目的地已存在 → 視為成功(已備份過)
        if e.code == 409:
            return True
        raise

def storage_upload(path, data, content_type="image/jpeg"):
    """上傳(覆蓋)"""
    url = f"{SUPABASE_URL}/storage/v1/object/{BUCKET}/{path}"
    req = urllib.request.Request(
        url, data=data, method="PUT",
        headers={**HEADERS, "Content-Type": content_type, "x-upsert": "true"}
    )
    urllib.request.urlopen(req)

# ── OCR ───────────────────────────────────────────────
def ocr(path):
    out = subprocess.check_output(["swift", OCR_SWIFT, path], text=True, stderr=subprocess.DEVNULL)
    rows = []
    for line in out.strip().split("\n"):
        parts = line.split("\t")
        if len(parts) != 2: continue
        coords = [int(c) for c in parts[1].split(",")]
        rows.append((parts[0].strip(), *coords))
    return rows

# ── 主處理 ────────────────────────────────────────────
def process_image(src_bytes, weight_db=None):
    """OCR + inpaint + 加字。回傳 (new_bytes, sku, weight) 或 (None, reason, None)"""
    tmp = "/tmp/_process_in.jpg"
    with open(tmp, "wb") as f:
        f.write(src_bytes)
    img_pil = Image.open(tmp).convert("RGB")
    W, H = img_pil.size

    boxes = ocr(tmp)
    sku, weight = None, None
    text_bboxes = []
    for t, x, y, w, h in boxes:
        if y > H * 0.4: continue
        if re.fullmatch(r"\d{6,10}", t):
            sku = t; text_bboxes.append((x, y, w, h))
        elif re.fullmatch(r"\d+\.\d+", t):
            weight = t; text_bboxes.append((x, y, w, h))

    if not sku:
        return None, "ocr_no_sku", None
    if not weight:
        # 用 DB 的 weight_qian fallback
        if weight_db:
            weight = f"{weight_db:.2f}".rstrip("0").rstrip(".")
        else:
            return None, "ocr_no_weight_and_no_db", None

    cv = cv2.imread(tmp)
    mask = np.zeros(cv.shape[:2], dtype=np.uint8)
    margin = 25
    for x, y, w, h in text_bboxes:
        x0 = max(0, x-margin); y0 = max(0, y-margin)
        x1 = min(W, x+w+margin); y1 = min(H, y+h+margin)
        mask[y0:y1, x0:x1] = 255
    inpainted = cv2.inpaint(cv, mask, 7, cv2.INPAINT_TELEA)
    out_img = Image.fromarray(cv2.cvtColor(inpainted, cv2.COLOR_BGR2RGB))

    d = ImageDraw.Draw(out_img)
    font_size = max(38, int(H * 0.05))
    font = ImageFont.truetype(FONT_PATH, font_size)
    pad_x = int(W * 0.05); pad_y = int(H * 0.045)

    sb = d.textbbox((0,0), sku, font=font); sw, sh = sb[2]-sb[0], sb[3]-sb[1]
    wb = d.textbbox((0,0), weight, font=font); ww_, wh = wb[2]-wb[0], wb[3]-wb[1]
    block_w = max(sw, ww_)
    right_edge = W - pad_x
    center_x = right_edge - block_w / 2
    gap = int(font_size * 0.15)
    by = H - pad_y - wh
    ty = by - gap - sh
    sku_x = int(center_x - sw / 2)
    w_x = int(center_x - ww_ / 2)
    stroke = 2
    d.text((sku_x, ty), sku, font=font, fill=(255,255,255),
           stroke_width=stroke, stroke_fill=(140,140,140))
    d.text((w_x, by), weight, font=font, fill=(255,255,255),
           stroke_width=stroke, stroke_fill=(140,140,140))

    buf = "/tmp/_process_out.jpg"
    out_img.save(buf, quality=92)
    with open(buf, "rb") as f:
        return f.read(), sku, weight

# ── Log ───────────────────────────────────────────────
def load_done():
    if not os.path.exists(LOG_FILE):
        return set()
    done = set()
    with open(LOG_FILE) as f:
        for line in f:
            try:
                r = json.loads(line)
                if r.get("status") in ("ok",):
                    done.add(r["slug"])
            except:
                pass
    return done

def log_result(record):
    with open(LOG_FILE, "a") as f:
        f.write(json.dumps(record, ensure_ascii=False) + "\n")

# ── 主流程 ────────────────────────────────────────────
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true", help="不上傳,只本地存 preview")
    ap.add_argument("--limit", type=int, default=0, help="只處理前 N 筆")
    ap.add_argument("--no-backup", action="store_true", help="跳過備份(危險)")
    args = ap.parse_args()

    os.makedirs(PREVIEW_DIR, exist_ok=True)
    done = load_done()
    print(f"已完成: {len(done)} 筆,從這之後續跑")

    # 撈商品(分頁)
    all_products = []
    offset = 0
    while True:
        chunk = list_products(offset, 1000)
        if not chunk: break
        all_products.extend(chunk)
        offset += len(chunk)
        if len(chunk) < 1000: break
    print(f"DB 商品總數: {len(all_products)}")

    pending = [p for p in all_products if p["slug"] not in done]
    if args.limit:
        pending = pending[:args.limit]
    print(f"本次處理: {len(pending)} 筆")

    ok = fail = skip = 0
    t0 = time.time()
    for i, p in enumerate(pending, 1):
        slug = p["slug"]
        url = p["image_url"]
        try:
            # 下載
            src_bytes = urllib.request.urlopen(url).read()
            # 處理
            new_bytes, sku, weight = process_image(src_bytes, p.get("weight_qian"))
            if new_bytes is None:
                # 失敗
                rec = {"slug": slug, "url": url, "status": "skip", "reason": sku}
                log_result(rec)
                skip += 1
                print(f"[{i}/{len(pending)}] SKIP {slug} ({sku})")
                continue

            # 解析 storage path(從 image_url)
            parsed = urlparse(url)
            # /storage/v1/object/public/media/products/xxx.jpg → products/xxx.jpg
            path_parts = parsed.path.split(f"/{BUCKET}/", 1)
            if len(path_parts) != 2:
                rec = {"slug": slug, "url": url, "status": "fail", "reason": "path_parse"}
                log_result(rec); fail += 1
                continue
            storage_path = path_parts[1]
            backup_path = f"{BACKUP_PREFIX}/{os.path.basename(storage_path)}"

            if args.dry_run:
                # 只存本地 preview
                with open(f"{PREVIEW_DIR}/{slug}.jpg", "wb") as f:
                    f.write(new_bytes)
            else:
                # 備份原圖
                if not args.no_backup:
                    storage_copy(storage_path, backup_path)
                # 上傳新圖覆蓋
                storage_upload(storage_path, new_bytes)

            rec = {"slug": slug, "url": url, "sku": sku, "weight": weight, "status": "ok"}
            log_result(rec)
            ok += 1
            if i % 10 == 0 or i == len(pending):
                elapsed = time.time() - t0
                rate = i / elapsed
                eta = (len(pending) - i) / rate if rate > 0 else 0
                print(f"[{i}/{len(pending)}] OK={ok} SKIP={skip} FAIL={fail} | {rate:.1f}/s ETA={eta/60:.1f}min")
        except KeyboardInterrupt:
            print("\n中斷,進度已存,下次續跑")
            break
        except Exception as e:
            rec = {"slug": slug, "url": url, "status": "fail", "reason": str(e)[:200]}
            log_result(rec); fail += 1
            print(f"[{i}/{len(pending)}] FAIL {slug} {e}")

    elapsed = time.time() - t0
    print(f"\n完成 OK={ok} SKIP={skip} FAIL={fail} 耗時 {elapsed/60:.1f} min")

if __name__ == "__main__":
    main()
