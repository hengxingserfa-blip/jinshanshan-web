import { cookies } from "next/headers";

const COOKIE_NAME = "jinshanshan-admin";
const COOKIE_VALUE = "ok";
const SEVEN_DAYS_SEC = 60 * 60 * 24 * 7;

export async function isAdminLoggedIn() {
  const cs = await cookies();
  return cs.get(COOKIE_NAME)?.value === COOKIE_VALUE;
}

export async function setAdminCookie() {
  const cs = await cookies();
  cs.set(COOKIE_NAME, COOKIE_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SEVEN_DAYS_SEC,
    path: "/",
  });
}

export async function clearAdminCookie() {
  const cs = await cookies();
  cs.delete(COOKIE_NAME);
}

export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return input === expected;
}

export function isAdminPasswordConfigured(): boolean {
  return !!process.env.ADMIN_PASSWORD;
}
