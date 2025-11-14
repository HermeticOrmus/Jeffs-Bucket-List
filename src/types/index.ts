// Core entity types based on data model

export interface User {
  id: string;
  email: string;
  display_name: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  user_id: string;
  birth_year?: number;
  timezone?: string;
  preferred_language: string;
  accessibility_settings: AccessibilitySettings;
  notification_preferences: NotificationPreferences;
  life_stage?: string;
  interests: string[];
}

export interface AccessibilitySettings {
  fontSize: 'normal' | 'large' | 'xlarge';
  highContrast: boolean;
  reducedMotion: boolean;
  voiceInput: boolean;
}

export interface NotificationPreferences {
  email: boolean;
  reminders: boolean;
}

export interface QuestionCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  color: string;
  display_order: number;
  is_active: boolean;
}

export type QuestionType = 'text' | 'multiple_choice' | 'scale' | 'yes_no';

export interface Question {
  id: string;
  category_id: string;
  question_text: string;
  question_subtext?: string;
  question_type: QuestionType;
  response_schema: ResponseSchema;
  depth_level: 1 | 2 | 3;
  display_order: number;
  depends_on_question_id?: string;
  depends_on_response?: any;
  is_required: boolean;
  is_sensitive: boolean;
  is_active: boolean;
}

export interface ResponseSchema {
  maxLength?: number;
  minLength?: number;
  placeholder?: string;
  options?: string[];
  allowMultiple?: boolean;
  allowOther?: boolean;
  min?: number;
  max?: number;
  minLabel?: string;
  maxLabel?: string;
}

export type SessionStatus = 'in_progress' | 'completed' | 'paused';

export interface DiscoverySession {
  id: string;
  user_id: string;
  category_id?: string;
  status: SessionStatus;
  current_question_id?: string;
  questions_answered: number;
  started_at: string;
  completed_at?: string;
  last_activity_at: string;
  session_notes?: string;
}

export interface Response {
  id: string;
  user_id: string;
  session_id: string;
  question_id: string;
  response_data: ResponseData;
  response_notes?: string;
  emotional_state?: EmotionalState;
  is_private: boolean;
  share_with_family: boolean;
  created_at: string;
  updated_at: string;
}

export type EmotionalState = 'reflective' | 'excited' | 'uncertain' | 'emotional' | 'peaceful';

export interface ResponseData {
  encrypted?: boolean;
  text?: string;
  selected?: string[];
  other?: string;
  value?: number;
  note?: string;
}

export type GoalStatus =
  | 'thinking_about'
  | 'planning'
  | 'in_progress'
  | 'completed'
  | 'ongoing'
  | 'released';

export type GoalPriority = 'low' | 'medium' | 'high';

export interface Goal {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: string;
  goal_type: string;
  priority: GoalPriority;
  status: GoalStatus;
  target_completion_date?: string;
  completed_at?: string;
  inspired_by_question_id?: string;
  inspired_by_response_id?: string;
  progress_notes?: string;
  milestones: Milestone[];
  is_private: boolean;
  share_with_family: boolean;
  created_at: string;
  updated_at: string;
}

export interface Milestone {
  title: string;
  completed: boolean;
  date?: string;
  target_date?: string;
}

export interface GoalSuggestion {
  title: string;
  description: string;
  category: string;
  priority_suggestion: GoalPriority;
  inspired_by_question_id: string;
  inspired_by_response_id: string;
  confidence_score: number;
}

// UI Component types

export interface ProgressInfo {
  answered: number;
  remaining_estimate: number;
  category_progress?: number;
}

export interface ApiError {
  error: string;
  code: string;
  details?: any;
}
