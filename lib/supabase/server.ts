import { createClient as createSupabaseClient } from '@supabase/supabase-js';

/**
 * Server-side Supabase client for API routes and server actions.
 *
 * Uses the service role key which bypasses RLS.
 * NEVER expose this client or its key to the browser.
 */
export function createServerClient() {
  const supabaseUrl =
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      'Missing Supabase server environment variables. ' +
        'Ensure SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) and ' +
        'SUPABASE_SERVICE_ROLE_KEY are set.',
    );
  }

  return createSupabaseClient(supabaseUrl, supabaseServiceKey);
}
