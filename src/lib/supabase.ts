import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create Supabase client only if environment variables are properly configured
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null

// Helper to check if Supabase is configured
export const isSupabaseConfigured = () => supabase !== null

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
