import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/** Server-only Supabase admin client using the SERVICE ROLE key.
 *  - `server-only` import makes the build fail if this is ever pulled into a
 *    client component, so the key cannot leak to the browser.
 *  - The service role bypasses RLS; it is the only writer to `enquiries`. */

let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local.",
    );
  }

  cached = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

/** Whether the server has enough config to accept enquiries. */
export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}
