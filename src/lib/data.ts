import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { FALLBACK_OPERATIONS, FALLBACK_STANDING } from "./fallback";
import { FACTION_KEYS, type FactionKey, type Operation, type Standing } from "./types";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** True when the site is running against a real database. */
export const dbEnabled = Boolean(url && anon);

/** True when the admin page can write. */
export const adminEnabled = Boolean(url && service && process.env.ADMIN_PASSWORD);

export function readClient(): SupabaseClient | null {
  if (!url || !anon) return null;
  return createClient(url, anon, { auth: { persistSession: false } });
}

export function writeClient(): SupabaseClient | null {
  if (!url || !service) return null;
  return createClient(url, service, { auth: { persistSession: false } });
}

export async function getOperations(): Promise<Operation[]> {
  const db = readClient();
  if (!db) return FALLBACK_OPERATIONS;

  const { data, error } = await db
    .from("operations")
    .select("id, title, date, end_date, start_time, status, venue, ticket_url, briefing")
    .order("date", { ascending: true });

  if (error || !data) return FALLBACK_OPERATIONS;
  return data as Operation[];
}

export async function getStanding(): Promise<Standing> {
  const db = readClient();
  if (!db) return FALLBACK_STANDING;

  const { data, error } = await db
    .from("campaign_points")
    .select("faction, points, updated_at");

  if (error || !data || data.length === 0) return FALLBACK_STANDING;

  const points = { ADF: 0, CM: 0, EAP: 0, RDC: 0 } as Record<FactionKey, number>;
  let updated: string | null = null;

  for (const row of data as { faction: string; points: number; updated_at: string | null }[]) {
    if ((FACTION_KEYS as string[]).includes(row.faction)) {
      points[row.faction as FactionKey] = Number(row.points) || 0;
    }
    if (row.updated_at && (!updated || row.updated_at > updated)) updated = row.updated_at;
  }

  return { points, updated_at: updated };
}
