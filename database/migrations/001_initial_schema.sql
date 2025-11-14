-- Jeff's Bucket List Platform - Initial Database Schema
-- Based on data model specification

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret-here';

-- ============================================================================
-- CORE TABLES
-- ============================================================================

-- Users table (minimal personal data)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id UUID NOT NULL UNIQUE, -- References Supabase auth.users
  email TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  data_sharing_consent BOOLEAN DEFAULT FALSE,
  family_sharing_enabled BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_active_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- User profiles (extended information)
CREATE TABLE user_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  birth_year INTEGER,
  timezone TEXT DEFAULT 'America/New_York',
  preferred_language TEXT DEFAULT 'en',
  accessibility_settings JSONB DEFAULT '{"fontSize": "normal", "highContrast": false, "reducedMotion": false, "voiceInput": false}',
  notification_preferences JSONB DEFAULT '{"email": true, "reminders": true}',
  life_stage TEXT,
  interests TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Question categories
CREATE TABLE question_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  icon TEXT,
  color TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Questions
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES question_categories(id) ON DELETE SET NULL,
  question_text TEXT NOT NULL,
  question_subtext TEXT,
  question_type TEXT NOT NULL CHECK (question_type IN ('text', 'multiple_choice', 'scale', 'yes_no')),
  response_schema JSONB NOT NULL DEFAULT '{}',
  depth_level INTEGER NOT NULL DEFAULT 1 CHECK (depth_level BETWEEN 1 AND 3),
  display_order INTEGER NOT NULL DEFAULT 0,
  depends_on_question_id UUID REFERENCES questions(id) ON DELETE SET NULL,
  depends_on_response JSONB,
  is_required BOOLEAN DEFAULT FALSE,
  is_sensitive BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Discovery sessions
CREATE TABLE discovery_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category_id UUID REFERENCES question_categories(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'paused')),
  current_question_id UUID REFERENCES questions(id) ON DELETE SET NULL,
  questions_answered INTEGER DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Responses (most sensitive data)
CREATE TABLE responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_id UUID NOT NULL REFERENCES discovery_sessions(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  response_data JSONB NOT NULL,
  response_notes TEXT,
  emotional_state TEXT CHECK (emotional_state IN ('reflective', 'excited', 'uncertain', 'emotional', 'peaceful')),
  is_private BOOLEAN DEFAULT TRUE,
  share_with_family BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(session_id, question_id)
);

-- Goals
CREATE TABLE goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  goal_type TEXT,
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  status TEXT NOT NULL DEFAULT 'thinking_about' CHECK (status IN ('thinking_about', 'planning', 'in_progress', 'completed', 'ongoing', 'released')),
  target_completion_date DATE,
  completed_at TIMESTAMP WITH TIME ZONE,
  inspired_by_question_id UUID REFERENCES questions(id) ON DELETE SET NULL,
  inspired_by_response_id UUID REFERENCES responses(id) ON DELETE SET NULL,
  progress_notes TEXT,
  milestones JSONB DEFAULT '[]',
  is_private BOOLEAN DEFAULT TRUE,
  share_with_family BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Family sharing invitations
CREATE TABLE family_sharing (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  family_member_email TEXT NOT NULL,
  access_level TEXT NOT NULL DEFAULT 'view_shared' CHECK (access_level IN ('view_shared', 'view_all', 'contribute')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'revoked')),
  invitation_token TEXT NOT NULL UNIQUE,
  invited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  accepted_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() + INTERVAL '7 days',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit logs (GDPR compliance)
CREATE TABLE audit_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  ip_address INET,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Data export requests (GDPR Article 20)
CREATE TABLE data_export_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  export_format TEXT NOT NULL DEFAULT 'json' CHECK (export_format IN ('json', 'pdf', 'csv')),
  include_responses BOOLEAN DEFAULT TRUE,
  include_goals BOOLEAN DEFAULT TRUE,
  include_audit_logs BOOLEAN DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  file_path TEXT,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() + INTERVAL '7 days',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX idx_users_auth_id ON users(auth_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);

CREATE INDEX idx_questions_category ON questions(category_id, display_order);
CREATE INDEX idx_questions_depth ON questions(depth_level);

CREATE INDEX idx_sessions_user ON discovery_sessions(user_id, status);
CREATE INDEX idx_sessions_category ON discovery_sessions(category_id);

CREATE INDEX idx_responses_user ON responses(user_id, created_at);
CREATE INDEX idx_responses_session ON responses(session_id);
CREATE INDEX idx_responses_question ON responses(question_id);

CREATE INDEX idx_goals_user ON goals(user_id, status);
CREATE INDEX idx_goals_category ON goals(category);

CREATE INDEX idx_audit_logs_user ON audit_logs(user_id, created_at);

-- Partial indexes for non-deleted records
CREATE INDEX idx_users_active ON users(id) WHERE deleted_at IS NULL;
CREATE INDEX idx_responses_active ON responses(id) WHERE deleted_at IS NULL;
CREATE INDEX idx_goals_active ON goals(id) WHERE deleted_at IS NULL;

-- ============================================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================================

-- Enable RLS on all user-data tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE discovery_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_sharing ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_export_requests ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY users_select_own ON users FOR SELECT
  USING (auth_id = auth.uid());

CREATE POLICY users_update_own ON users FOR UPDATE
  USING (auth_id = auth.uid());

-- User profiles
CREATE POLICY profiles_select_own ON user_profiles FOR SELECT
  USING (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));

CREATE POLICY profiles_insert_own ON user_profiles FOR INSERT
  WITH CHECK (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));

CREATE POLICY profiles_update_own ON user_profiles FOR UPDATE
  USING (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));

-- Discovery sessions
CREATE POLICY sessions_select_own ON discovery_sessions FOR SELECT
  USING (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));

CREATE POLICY sessions_insert_own ON discovery_sessions FOR INSERT
  WITH CHECK (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));

CREATE POLICY sessions_update_own ON discovery_sessions FOR UPDATE
  USING (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));

-- Responses
CREATE POLICY responses_select_own ON responses FOR SELECT
  USING (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));

CREATE POLICY responses_insert_own ON responses FOR INSERT
  WITH CHECK (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));

CREATE POLICY responses_update_own ON responses FOR UPDATE
  USING (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));

CREATE POLICY responses_delete_own ON responses FOR DELETE
  USING (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));

-- Goals
CREATE POLICY goals_select_own ON goals FOR SELECT
  USING (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));

CREATE POLICY goals_insert_own ON goals FOR INSERT
  WITH CHECK (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));

CREATE POLICY goals_update_own ON goals FOR UPDATE
  USING (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));

CREATE POLICY goals_delete_own ON goals FOR DELETE
  USING (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));

-- Questions and categories are public (read-only for all authenticated users)
CREATE POLICY questions_select_all ON questions FOR SELECT
  TO authenticated
  USING (is_active = TRUE);

CREATE POLICY categories_select_all ON question_categories FOR SELECT
  TO authenticated
  USING (is_active = TRUE);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_question_categories_updated_at BEFORE UPDATE ON question_categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_questions_updated_at BEFORE UPDATE ON questions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_discovery_sessions_updated_at BEFORE UPDATE ON discovery_sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_responses_updated_at BEFORE UPDATE ON responses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_goals_updated_at BEFORE UPDATE ON goals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Update last_activity_at when session is modified
CREATE OR REPLACE FUNCTION update_session_activity()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_activity_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_session_activity_trigger BEFORE UPDATE ON discovery_sessions
  FOR EACH ROW EXECUTE FUNCTION update_session_activity();

-- Increment questions_answered when response is created
CREATE OR REPLACE FUNCTION increment_questions_answered()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE discovery_sessions
  SET questions_answered = questions_answered + 1,
      last_activity_at = NOW()
  WHERE id = NEW.session_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER increment_session_questions AFTER INSERT ON responses
  FOR EACH ROW EXECUTE FUNCTION increment_questions_answered();

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE users IS 'Core user identity with minimal personal data';
COMMENT ON TABLE user_profiles IS 'Extended profile information separated for privacy';
COMMENT ON TABLE question_categories IS 'Life area categories for organizing questions';
COMMENT ON TABLE questions IS 'Discovery prompts with flexible response types';
COMMENT ON TABLE discovery_sessions IS 'User progression through question sequences';
COMMENT ON TABLE responses IS 'User answers to discovery questions (most sensitive data)';
COMMENT ON TABLE goals IS 'Life goals generated from discoveries or created manually';
COMMENT ON TABLE family_sharing IS 'Invite-only family access with granular permissions';
COMMENT ON TABLE audit_logs IS 'GDPR compliance and security monitoring';
COMMENT ON TABLE data_export_requests IS 'GDPR Article 20 compliance - data portability';
