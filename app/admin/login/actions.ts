"use server";

import { redirect } from "next/navigation";
import { checkPassword, setAdminCookie } from "@/lib/admin/auth";

export async function loginAction(_prev: unknown, formData: FormData) {
  const pw = (formData.get("password") as string | null) ?? "";
  if (!pw) return { error: "請輸入密碼" };
  if (!checkPassword(pw)) return { error: "密碼錯誤" };
  await setAdminCookie();
  redirect("/admin");
}
