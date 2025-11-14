/**
 * Database type definitions for Supabase
 * Generated from database schema
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
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
          created_at?: string
          updated_at?: string
          last_active_at?: string
          deleted_at?: string | null
        }
        Update: {
          id?: string
          auth_id?: string
          email?: string
          display_name?: string
          data_sharing_consent?: boolean
          family_sharing_enabled?: boolean
          created_at?: string
          updated_at?: string
          last_active_at?: string
          deleted_at?: string | null
        }
      }
      user_profiles: {
        Row: {
          user_id: string
          birth_year: number | null
          timezone: string
          preferred_language: string
          accessibility_settings: Json
          notification_preferences: Json
          life_stage: string | null
          interests: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          birth_year?: number | null
          timezone?: string
          preferred_language?: string
          accessibility_settings?: Json
          notification_preferences?: Json
          life_stage?: string | null
          interests?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          birth_year?: number | null
          timezone?: string
          preferred_language?: string
          accessibility_settings?: Json
          notification_preferences?: Json
          life_stage?: string | null
          interests?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      goals: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          category: string
          status: 'thinking_about' | 'planning' | 'in_progress' | 'completed' | 'ongoing' | 'released'
          priority: 'low' | 'medium' | 'high'
          target_date: string | null
          completed_at: string | null
          created_from_discovery_session_id: string | null
          tags: string[]
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          category: string
          status?: 'thinking_about' | 'planning' | 'in_progress' | 'completed' | 'ongoing' | 'released'
          priority?: 'low' | 'medium' | 'high'
          target_date?: string | null
          completed_at?: string | null
          created_from_discovery_session_id?: string | null
          tags?: string[]
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          category?: string
          status?: 'thinking_about' | 'planning' | 'in_progress' | 'completed' | 'ongoing' | 'released'
          priority?: 'low' | 'medium' | 'high'
          target_date?: string | null
          completed_at?: string | null
          created_from_discovery_session_id?: string | null
          tags?: string[]
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      discovery_sessions: {
        Row: {
          id: string
          user_id: string
          category_id: string
          status: 'in_progress' | 'completed' | 'abandoned'
          started_at: string
          completed_at: string | null
          total_questions: number
          questions_answered: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          category_id: string
          status?: 'in_progress' | 'completed' | 'abandoned'
          started_at?: string
          completed_at?: string | null
          total_questions?: number
          questions_answered?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          category_id?: string
          status?: 'in_progress' | 'completed' | 'abandoned'
          started_at?: string
          completed_at?: string | null
          total_questions?: number
          questions_answered?: number
          created_at?: string
          updated_at?: string
        }
      }
      responses: {
        Row: {
          id: string
          user_id: string
          session_id: string
          question_id: string
          response_text: string | null
          response_data: Json | null
          skipped: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          session_id: string
          question_id: string
          response_text?: string | null
          response_data?: Json | null
          skipped?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          session_id?: string
          question_id?: string
          response_text?: string | null
          response_data?: Json | null
          skipped?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
