import { redirect } from "next/navigation";
import { isAdminLoggedIn, isAdminPasswordConfigured } from "@/lib/admin/auth";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "後台登入 | 金閃閃銀樓",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  if (await isAdminLoggedIn()) redirect("/admin");
  return <LoginForm configured={isAdminPasswordConfigured()} />;
}
