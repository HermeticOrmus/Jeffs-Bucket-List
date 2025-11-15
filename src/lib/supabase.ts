import { createClient } from '@supabase/supabase-js'

// Use placeholders if env vars not set to allow build to succeed
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTIwMDAsImV4cCI6MTk2MDc2ODAwMH0.placeholder'

// Create Supabase client (will use placeholders if not configured)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// Helper to check if Supabase is actually configured (not using placeholders)
export const isSupabaseConfigured = () => {
  return process.env.NEXT_PUBLIC_SUPABASE_URL !== undefined &&
         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== undefined
}

// Type-safe database types (will be generated from schema)
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          auth_id: string
          email: string
          display_name: string
          data_sharing_consent: boolean
          family_sharing_enabled: boolean
          created_at: string
          updated_at: string
          last_active_at: string
          deleted_at: string | null
        }
        Insert: {
          id?: string
          auth_id: string
          email: string
          display_name: string
          data_sharing_consent?: boolean
          family_sharing_enabled?: boolean
        }
        Update: {
          display_name?: string
          data_sharing_consent?: boolean
          family_sharing_enabled?: boolean
        }
      }
      // Add other tables as needed
    }
  }
}
