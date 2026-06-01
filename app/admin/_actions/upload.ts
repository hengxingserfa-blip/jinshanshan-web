"use server";

import { isAdminLoggedIn } from "@/lib/admin/auth";
import { getServiceRoleSupabase } from "@/lib/supabase/server";

export interface UploadResult {
  ok: boolean;
  url?: string;
  path?: string;
  message?: string;
}

const BUCKET = "media";
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

// 把檔案傳上 Supabase Storage. 回 public URL.
export async function uploadImageAction(
  folder: string,
  formData: FormData
): Promise<UploadResult> {
  if (!(await isAdminLoggedIn())) {
    return { ok: false, message: "未登入" };
  }
  const supabase = getServiceRoleSupabase();
  if (!supabase) {
    return { ok: false, message: "Supabase 尚未設定, 無法上傳" };
  }

  const file = formData.get("file") as File | null;
  if (!file || !(file instanceof File) || file.size === 0) {
    return { ok: false, message: "請選擇檔案" };
  }
  if (file.size > MAX_BYTES) {
    return { ok: false, message: `檔案太大 (${(file.size / 1048576).toFixed(1)} MB), 上限 10 MB` };
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return { ok: false, message: `不支援的檔案格式 (${file.type})` };
  }

  // 檔名: {folder}/{timestamp}-{隨機}-{原檔名}
  const safeFolder = (folder || "uploads").replace(/[^a-z0-9_-]/gi, "");
  const ts = Date.now();
  const rand = Math.random().toString(36).slice(2, 8);
  const safeName = file.name
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .slice(0, 50);
  const path = `${safeFolder}/${ts}-${rand}-${safeName}`;

  const arrayBuf = await file.arrayBuffer();
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, arrayBuf, {
      contentType: file.type,
      cacheControl: "31536000",
      upsert: false,
    });

  if (error) return { ok: false, message: error.message };

  const { data: publicUrl } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { ok: true, url: publicUrl.publicUrl, path };
}
