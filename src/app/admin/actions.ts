"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { createHash, timingSafeEqual } from "crypto";
import { writeClient } from "@/lib/data";
import { FACTION_KEYS, type FactionKey } from "@/lib/types";

const COOKIE = "p3_admin";

function token(): string {
  const pw = process.env.ADMIN_PASSWORD || "";
  return createHash("sha256").update(`p3:${pw}`).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export async function isSignedIn(): Promise<boolean> {
  if (!process.env.ADMIN_PASSWORD) return false;
  const jar = await cookies();
  const v = jar.get(COOKIE)?.value;
  return Boolean(v && safeEqual(v, token()));
}

export type ActionState = { ok: boolean; message: string };

export async function signIn(_prev: ActionState, form: FormData): Promise<ActionState> {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return { ok: false, message: "Admin is not configured on this deployment." };

  const given = String(form.get("password") || "");
  if (!safeEqual(createHash("sha256").update(given).digest("hex"), createHash("sha256").update(pw).digest("hex"))) {
    return { ok: false, message: "That passphrase is not right." };
  }

  const jar = await cookies();
  jar.set(COOKIE, token(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
  revalidatePath("/admin");
  return { ok: true, message: "" };
}

export async function signOut(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE);
  revalidatePath("/admin");
}

function slug(s: string): string {
  return (
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || `op-${Date.now()}`
  );
}

export async function saveOperation(_prev: ActionState, form: FormData): Promise<ActionState> {
  if (!(await isSignedIn())) return { ok: false, message: "Sign in first." };
  const db = writeClient();
  if (!db) return { ok: false, message: "No database configured on this deployment." };

  const title = String(form.get("title") || "").trim();
  const date = String(form.get("date") || "");
  if (!title || !date) return { ok: false, message: "An operation needs a name and a start date." };

  const id = String(form.get("id") || "").trim() || slug(title);

  const row = {
    id,
    title,
    date,
    end_date: String(form.get("end_date") || "") || null,
    start_time: String(form.get("start_time") || "") || null,
    status: String(form.get("status") || "upcoming"),
    venue: String(form.get("venue") || "").trim() || null,
    ticket_url: String(form.get("ticket_url") || "").trim() || null,
    briefing: String(form.get("briefing") || "").trim() || null,
  };

  const { error } = await db.from("operations").upsert(row);
  if (error) return { ok: false, message: `Could not save: ${error.message}` };

  revalidatePath("/");
  revalidatePath("/admin");
  return { ok: true, message: `Saved “${title}”.` };
}

export async function deleteOperation(_prev: ActionState, form: FormData): Promise<ActionState> {
  if (!(await isSignedIn())) return { ok: false, message: "Sign in first." };
  const db = writeClient();
  if (!db) return { ok: false, message: "No database configured on this deployment." };

  const id = String(form.get("id") || "");
  if (!id) return { ok: false, message: "Nothing to remove." };

  const { error } = await db.from("operations").delete().eq("id", id);
  if (error) return { ok: false, message: `Could not remove: ${error.message}` };

  revalidatePath("/");
  revalidatePath("/admin");
  return { ok: true, message: "Operation removed." };
}

export async function saveScores(_prev: ActionState, form: FormData): Promise<ActionState> {
  if (!(await isSignedIn())) return { ok: false, message: "Sign in first." };
  const db = writeClient();
  if (!db) return { ok: false, message: "No database configured on this deployment." };

  const now = new Date().toISOString();
  const rows = FACTION_KEYS.map((k: FactionKey) => {
    const n = Number(form.get(`pts_${k}`));
    return { faction: k, points: isNaN(n) ? 0 : Math.max(0, Math.round(n)), updated_at: now };
  });

  const { error } = await db.from("campaign_points").upsert(rows);
  if (error) return { ok: false, message: `Could not save points: ${error.message}` };

  revalidatePath("/");
  revalidatePath("/admin");
  return { ok: true, message: "Campaign points updated." };
}
