import { createClient } from "@supabase/supabase-js"

// Create a single supabase client for interacting with your database
export const createServerSupabaseClient = () => {
  return createClient(process.env.SUPABASE_URL || "", process.env.SUPABASE_SERVICE_ROLE_KEY || "")
}

// For client components
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/types/supabase"

export const createClientSupabaseClient = () => {
  return createClientComponentClient<Database>()
}
