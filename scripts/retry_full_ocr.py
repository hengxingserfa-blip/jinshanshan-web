#!/usr/bin/env python3
"""從備份原圖重跑 — 全圖 OCR(不限上半部),修正右下角舊字殘留

執行:
  python3 scripts/retry_full_ocr.py --limit 5    # 試 5 張
  python3 scripts/retry_full_ocr.py              # 全部 OK 的(從 backup)
"""
import argparse, json, os, re, subprocess, sys, time
from pathlib import Path
from urllib.parse import urlparse
import urllib.request

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

SUPABASE_URL = "https://jwzdhnmxlybeikysbokf.supabase.co"
SR_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3emRobm14bHliZWlreXNib2tmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDQ2MTE4OCwiZXhwIjoyMDk2MDM3MTg4fQ.rUkBbERGRAxIP3v1dJudYrE4YA9cIsZlKfDFPpTzk9Q"
BUCKET = "media"
BACKUP_PREFIX = "products-backup"

FONT_PATH = "/System/Library/Fonts/Supplemental/Arial Bold Italic.ttf"
OCR_SWIFT = "/tmp/ocr.swift"
LOG_FILE = "/tmp/retry_full_ocr_log.jsonl"

HEADERS = {"apikey": SR_KEY, "Authorization": f"Bearer {SR_KEY}"}

def storage_upload(path, data):
    url = f"{SUPABASE_URL}/storage/v1/object/{BUCKET}/{path}"
    req = urllib.request.Request(
        url, data=data, method="PUT",
        headers={**HEADERS, "Content-Type": "image/jpeg", "x-upsert": "true"}
    )
    urllib.request.urlopen(req)

def ocr(path):
    out = subprocess.check_output(["swift", OCR_SWIFT, path], text=True, stderr=subprocess.DEVNULL)
    rows = []
    for line in out.strip().split("\n"):
        parts = line.split("\t")
        if len(parts) != 2: continue
        coords = [int(c) for c in parts[1].split(",")]
        rows.append((parts[0].strip(), *coords))
    return rows

def process_v2(src_bytes, weight_db=None):
    """v2: 全圖 OCR,所有 SKU/weight pattern 都 inpaint"""
    tmp = "/tmp/_retry_in.jpg"
    with open(tmp, "wb") as f: f.write(src_bytes)
    img_pil = Image.open(tmp).convert("RGB")
    W, H = img_pil.size

    boxes = ocr(tmp)
    sku, weight = None, None
    text_bboxes = []
    # 全圖掃,不限位置
    for t, x, y, w, h in boxes:
        if re.fullmatch(r"\d{6,10}", t):
            if sku is None: sku = t
            text_bboxes.append((x, y, w, h))
        elif re.fullmatch(r"\d+\.\d+", t):
            if weight is None: weight = t
            text_bboxes.append((x, y, w, h))

    if not sku:
        return None, "ocr_no_sku", None
    if not weight:
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

    buf = "/tmp/_retry_out.jpg"
    out_img.save(buf, quality=92)
    with open(buf, "rb") as f: return f.read(), sku, weight

def load_done():
    if not os.path.exists(LOG_FILE): return set()
    done = set()
    with open(LOG_FILE) as f:
        for line in f:
            try:
                r = json.loads(line)
                if r.get("status") == "ok":
                    done.add(r["slug"])
            except: pass
    return done

def log(rec):
    with open(LOG_FILE, "a") as f:
        f.write(json.dumps(rec, ensure_ascii=False) + "\n")

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=0)
    args = ap.parse_args()

    # 撈 DB 的 weight_qian 映射(用 slug)
    print("撈 DB weight_qian...")
    all_products = []
    offset = 0
    while True:
        url = f"{SUPABASE_URL}/rest/v1/products?image_url=not.is.null&select=slug,weight_qian,image_url&order=created_at.asc&offset={offset}&limit=1000"
        req = urllib.request.Request(url, headers=HEADERS)
        chunk = json.loads(urllib.request.urlopen(req).read())
        if not chunk: break
        all_products.extend(chunk)
        offset += len(chunk)
        if len(chunk) < 1000: break
    db_map = {p["slug"]: p for p in all_products}
    print(f"DB 共 {len(db_map)} 筆")

    # 讀第一波 batch 的 ok 記錄
    ok_slugs = []
    with open("/tmp/batch_fix_log.jsonl") as f:
        for line in f:
            r = json.loads(line)
            if r.get("status") == "ok":
                ok_slugs.append(r["slug"])
    print(f"第一波 OK: {len(ok_slugs)} 筆")

    done = load_done()
    pending = [s for s in ok_slugs if s not in done]
    if args.limit:
        pending = pending[:args.limit]
    print(f"本次處理: {len(pending)} 筆")

    ok = skip = fail = 0
    t0 = time.time()
    for i, slug in enumerate(pending, 1):
        try:
            p = db_map.get(slug)
            if not p:
                log({"slug": slug, "status": "skip", "reason": "not_in_db"}); skip += 1
                continue
            path = urlparse(p["image_url"]).path.split(f"/{BUCKET}/", 1)[1]
            filename = os.path.basename(path)
            backup_url = f"{SUPABASE_URL}/storage/v1/object/public/{BUCKET}/{BACKUP_PREFIX}/{filename}"

            try:
                src = urllib.request.urlopen(backup_url, timeout=30).read()
            except urllib.error.HTTPError as e:
                if e.code == 400:
                    log({"slug": slug, "status": "skip", "reason": "backup_404"}); skip += 1
                    continue
                raise

            new_bytes, sku, weight = process_v2(src, p.get("weight_qian"))
            if new_bytes is None:
                log({"slug": slug, "status": "skip", "reason": sku}); skip += 1
                continue

            storage_upload(path, new_bytes)
            log({"slug": slug, "sku": sku, "weight": weight, "status": "ok"})
            ok += 1
            if i % 50 == 0 or i == len(pending):
                e = time.time() - t0
                rate = i / e
                eta = (len(pending) - i) / rate / 60 if rate > 0 else 0
                print(f"[{i}/{len(pending)}] OK={ok} SKIP={skip} FAIL={fail} | {rate:.1f}/s ETA={eta:.1f}min")
        except KeyboardInterrupt:
            print("\n中斷"); break
        except Exception as e:
            log({"slug": slug, "status": "fail", "reason": str(e)[:200]}); fail += 1
            print(f"[{i}] FAIL {slug}: {e}")

    print(f"\n完成 OK={ok} SKIP={skip} FAIL={fail} 耗時 {(time.time()-t0)/60:.1f}min")

if __name__ == "__main__":
    main()
