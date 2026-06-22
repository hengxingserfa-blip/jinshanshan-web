import { isAdminLoggedIn } from "@/lib/admin/auth";
import { redirect } from "next/navigation";
import SyncClient from "./SyncClient";

export const dynamic = "force-dynamic";

export default async function SyncPage() {
  if (!(await isAdminLoggedIn())) {
    redirect("/admin/login");
  }
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
  return <SyncClient googleClientId={clientId} />;
}
