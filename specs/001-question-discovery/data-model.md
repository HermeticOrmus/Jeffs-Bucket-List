# Data Model: Question-Based Discovery Engine

**Feature**: Question-Based Discovery Engine
**Date**: 2025-11-13
**Status**: Complete

## Overview

The data model supports a privacy-first, flexible question-and-response system designed for users 60+ to discover meaningful life goals through guided reflection.

## Core Entities

### 1. User

**Purpose**: Core user identity with minimal personal data exposure

**Fields**:
- `id`: UUID - Unique identifier
- `auth_id`: UUID - References authentication system
- `email`: String - Contact email (unique)
- `display_name`: String - Preferred display name
- `data_sharing_consent`: Boolean - GDPR consent tracking
- `family_sharing_enabled`: Boolean - Allow family access
- `created_at`: Timestamp - Account creation
- `updated_at`: Timestamp - Last modification
- `last_active_at`: Timestamp - Last activity
- `deleted_at`: Timestamp - Soft delete marker

**Relationships**:
- Has one UserProfile
- Has many DiscoverySessions
- Has many Responses
- Has many Goals
- Has many FamilySharing invitations

**Privacy**: Row-level security ensures users can only access their own data

---

### 2. UserProfile

**Purpose**: Extended profile information separated for privacy

**Fields**:
- `user_id`: UUID - References User (primary key)
- `birth_year`: Integer - Age calculation without full DOB
- `timezone`: String - User's timezone
- `preferred_language`: String - Language preference
- `accessibility_settings`: JSON - Font size, contrast, etc.
- `notification_preferences`: JSON - Email/push settings
- `life_stage`: String - Context for personalization
- `interests`: Array<String> - Topic interests
- `created_at`: Timestamp
- `updated_at`: Timestamp

**Relationships**:
- Belongs to one User

**Privacy**: Inherits user's row-level security

---

### 3. QuestionCategory

**Purpose**: Organize questions into meaningful life areas

**Fields**:
- `id`: UUID - Unique identifier
- `name`: String - Display name
- `slug`: String - URL-safe identifier (unique)
- `description`: Text - Category explanation
- `display_order`: Integer - UI ordering
- `icon`: String - Visual identifier
- `color`: String - Hex color for UI
- `is_active`: Boolean - Enable/disable category
- `created_at`: Timestamp
- `updated_at`: Timestamp

**Relationships**:
- Has many Questions
- Has many DiscoverySessions

**Privacy**: Public data - all users see same categories

**Example Categories**:
- Reconnection (relationships to rebuild)
- Learning (skills to acquire)
- Creation (things to make)
- Completion (unfinished business)
- Contribution (ways to give back)
- Simple Joys (moments to savor)

---

### 4. Question

**Purpose**: Individual discovery prompts with flexible response types

**Fields**:
- `id`: UUID - Unique identifier
- `category_id`: UUID - References QuestionCategory
- `question_text`: Text - The question prompt
- `question_subtext`: Text - Additional context/explanation
- `question_type`: Enum - Type of response expected
  - `text`: Free-form text response
  - `multiple_choice`: Select from options
  - `scale`: Numeric scale (1-10)
  - `yes_no`: Binary choice
- `response_schema`: JSON - Type-specific configuration
- `depth_level`: Integer - Progressive depth (1=surface, 2=moderate, 3=deep)
- `display_order`: Integer - Order within category
- `depends_on_question_id`: UUID - Conditional display
- `depends_on_response`: JSON - Trigger condition
- `is_required`: Boolean - Can't be skipped
- `is_sensitive`: Boolean - Extra encryption
- `is_active`: Boolean - Enable/disable
- `created_at`: Timestamp
- `updated_at`: Timestamp

**Relationships**:
- Belongs to one QuestionCategory
- Has many Responses
- May depend on another Question

**Privacy**: Public data - all users see same questions

**Response Schema Examples**:
```json
// Text response
{
  "maxLength": 500,
  "minLength": 10,
  "placeholder": "Describe your thoughts..."
}

// Multiple choice
{
  "options": ["Option A", "Option B", "Option C"],
  "allowMultiple": false,
  "allowOther": true
}

// Scale response
{
  "min": 1,
  "max": 10,
  "minLabel": "Not important",
  "maxLabel": "Very important"
}
```

---

### 5. DiscoverySession

**Purpose**: Track user progression through question sequences

**Fields**:
- `id`: UUID - Unique identifier
- `user_id`: UUID - References User
- `category_id`: UUID - References QuestionCategory (optional)
- `status`: Enum - Session state
  - `in_progress`: Currently active
  - `completed`: Finished all questions
  - `paused`: Temporarily stopped
- `current_question_id`: UUID - Where user is in flow
- `questions_answered`: Integer - Progress counter
- `started_at`: Timestamp - Session begin
- `completed_at`: Timestamp - Session end
- `last_activity_at`: Timestamp - Last interaction
- `session_notes`: Text - User's notes
- `created_at`: Timestamp
- `updated_at`: Timestamp

**Relationships**:
- Belongs to one User
- Belongs to one QuestionCategory (optional)
- Has many Responses
- References current Question

**Privacy**: Row-level security - users access only their sessions

---

### 6. Response

**Purpose**: Store user answers to discovery questions (most sensitive data)

**Fields**:
- `id`: UUID - Unique identifier
- `user_id`: UUID - References User
- `session_id`: UUID - References DiscoverySession
- `question_id`: UUID - References Question
- `response_data`: JSON - Flexible structure per question type
- `response_notes`: Text - Additional thoughts
- `emotional_state`: String - Optional mood indicator
- `is_private`: Boolean - Hidden from everyone
- `share_with_family`: Boolean - Allow family viewing
- `created_at`: Timestamp
- `updated_at`: Timestamp
- `deleted_at`: Timestamp - Soft delete

**Relationships**:
- Belongs to one User
- Belongs to one DiscoverySession
- Belongs to one Question
- May inspire Goals

**Privacy**:
- Row-level security at database
- Application-layer encryption for sensitive questions
- Soft delete preserves audit trail

**Response Data Examples**:
```json
// Text response (encrypted if sensitive)
{
  "encrypted": true,
  "iv": "...",
  "authTag": "...",
  "ciphertext": "..."
}

// Text response (non-sensitive)
{
  "encrypted": false,
  "text": "I want to reconnect with my sister"
}

// Multiple choice response
{
  "encrypted": false,
  "selected": ["Option A", "Option C"],
  "other": "Custom response if allowed"
}

// Scale response
{
  "encrypted": false,
  "value": 7,
  "note": "Important but not urgent"
}
```

---

### 7. Goal

**Purpose**: Life goals generated from discoveries or created manually

**Fields**:
- `id`: UUID - Unique identifier
- `user_id`: UUID - References User
- `title`: String - Goal name
- `description`: Text - Detailed description
- `category`: String - Life area
- `goal_type`: String - Classification
- `priority`: Enum - Importance level
  - `low`: Nice to have
  - `medium`: Important
  - `high`: Must do
- `status`: Enum - Progress state
  - `thinking_about`: Considering
  - `planning`: Preparing
  - `in_progress`: Actively working
  - `completed`: Achieved
  - `ongoing`: Continuous
  - `released`: Let go without guilt
- `target_completion_date`: Date - Desired deadline
- `completed_at`: Timestamp - Achievement date
- `inspired_by_question_id`: UUID - Source question
- `inspired_by_response_id`: UUID - Source response
- `progress_notes`: Text - Journey notes
- `milestones`: JSON - Flexible milestone tracking
- `is_private`: Boolean - Privacy setting
- `share_with_family`: Boolean - Family access
- `created_at`: Timestamp
- `updated_at`: Timestamp
- `deleted_at`: Timestamp - Soft delete

**Relationships**:
- Belongs to one User
- May reference Question
- May reference Response

**Privacy**: Row-level security - users access only their goals

**Milestone Example**:
```json
[
  {
    "title": "Research Spanish classes",
    "completed": true,
    "date": "2025-11-01"
  },
  {
    "title": "Enroll in beginner class",
    "completed": false,
    "target_date": "2025-12-01"
  }
]
```

---

### 8. FamilySharing

**Purpose**: Manage invite-only family access with granular permissions

**Fields**:
- `id`: UUID - Unique identifier
- `user_id`: UUID - References User (inviter)
- `family_member_email`: String - Invitee email
- `access_level`: Enum - Permission level
  - `view_shared`: See only shared items
  - `view_all`: See all non-private items
  - `contribute`: Can add encouragement
- `status`: Enum - Invitation state
  - `pending`: Awaiting response
  - `accepted`: Active sharing
  - `declined`: Rejected invitation
  - `revoked`: Access removed
- `invitation_token`: String - Unique invitation link
- `invited_at`: Timestamp - Invitation sent
- `accepted_at`: Timestamp - Invitation accepted
- `expires_at`: Timestamp - Invitation expiry
- `created_at`: Timestamp
- `updated_at`: Timestamp

**Relationships**:
- Belongs to one User (inviter)
- References family member by email

**Privacy**: Row-level security - users manage only their invitations

---

### 9. AuditLog

**Purpose**: GDPR compliance and security monitoring

**Fields**:
- `id`: BigInt - Auto-incrementing identifier
- `user_id`: UUID - References User
- `action`: String - Action performed
- `resource_type`: String - Entity type affected
- `resource_id`: UUID - Entity ID affected
- `ip_address`: IP - Request origin
- `user_agent`: String - Browser/device info
- `metadata`: JSON - Additional context
- `created_at`: Timestamp - Action time

**Relationships**:
- References User (may be null if deleted)

**Privacy**: Admin access only - not exposed to users

**Action Examples**:
- `response_created`
- `response_updated`
- `response_deleted`
- `goal_created`
- `goal_completed`
- `data_exported`
- `family_member_invited`
- `privacy_settings_changed`

---

### 10. DataExportRequest

**Purpose**: GDPR Article 20 compliance - data portability

**Fields**:
- `id`: UUID - Unique identifier
- `user_id`: UUID - References User
- `export_format`: Enum - Output format
  - `json`: Machine readable
  - `pdf`: Human readable
  - `csv`: Spreadsheet compatible
- `include_responses`: Boolean - Include discoveries
- `include_goals`: Boolean - Include goals
- `include_audit_logs`: Boolean - Include activity
- `status`: Enum - Processing state
  - `pending`: Queued
  - `processing`: Generating
  - `completed`: Ready
  - `failed`: Error occurred
- `file_path`: String - Storage location
- `expires_at`: Timestamp - Auto-delete time
- `created_at`: Timestamp - Request time
- `completed_at`: Timestamp - Completion time

**Relationships**:
- Belongs to one User

**Privacy**: Row-level security - users access only their exports

---

## Data Flow Diagrams

### Discovery Flow
```
User → DiscoverySession → Question → Response → Goal
                ↓
          QuestionCategory
```

### Privacy Layers
```
Database Level: Row-Level Security (PostgreSQL RLS)
        ↓
Application Level: Field Encryption (AES-256-GCM)
        ↓
Transport Level: HTTPS/TLS 1.3
        ↓
User Level: Explicit Consent & Granular Sharing
```

### Family Sharing Flow
```
User → FamilySharing (invitation) → Family Member
  ↓                                      ↓
Goals/Responses ← (filtered by permissions)
```

## Indexing Strategy

### Performance Indexes
- `users.auth_id` - Fast auth lookups
- `users.email` - Unique constraint & lookups
- `responses.user_id + created_at` - User response history
- `goals.user_id + status` - Active goals queries
- `discovery_sessions.user_id + status` - Active sessions
- `questions.category_id + display_order` - Question sequencing

### Partial Indexes (exclude soft-deleted)
- `WHERE deleted_at IS NULL` on all soft-delete tables

## Data Retention

### Retention Policies
- **Responses**: Indefinite (user's life reflections)
- **Audit Logs**: 2 years (GDPR requirement)
- **Export Files**: 7 days (temporary download)
- **Deleted Data**: Soft delete 30 days, then hard delete
- **Session Data**: 90 days inactive, then archive

### GDPR Compliance
- **Right to Access**: Via DataExportRequest
- **Right to Rectification**: Update endpoints
- **Right to Erasure**: Soft delete → hard delete
- **Right to Portability**: Export in multiple formats
- **Consent Management**: Explicit tracking fields

## Security Considerations

### Encryption
- **At Rest**: PostgreSQL TDE
- **Sensitive Fields**: Application-layer AES-256-GCM
- **In Transit**: TLS 1.3 minimum

### Access Control
- **Row-Level Security**: Database-enforced isolation
- **API Authentication**: JWT with short expiration
- **Service Accounts**: Minimal required privileges

### Privacy by Default
- All responses private unless explicitly shared
- Family sharing requires invitation
- No cross-user data access possible
- Audit trail for all data access

## Scalability Notes

### Current Scale (MVP)
- 10,000 users
- 150 questions per user
- 1.5M total responses
- Single PostgreSQL instance sufficient

### Future Scale Considerations
- Partition responses table by user_id hash at 50k users
- Add read replicas for reporting at 100k users
- Consider archiving old sessions at 1M responses

## Migration Order

1. Create users and user_profiles
2. Create question_categories and questions
3. Create discovery_sessions
4. Create responses
5. Create goals
6. Create family_sharing
7. Create audit_logs
8. Create data_export_requests
9. Add indexes
10. Enable row-level security

## Validation Rules

### User
- Email must be valid format
- Display name 2-100 characters

### Question
- Question text required, max 500 characters
- Category must exist
- Depth level 1-3

### Response
- Response data must match question type schema
- Cannot respond to inactive questions
- Session must belong to user

### Goal
- Title required, max 255 characters
- Status transitions must be valid
- Target date must be future (if set)

### FamilySharing
- Email must be valid format
- Cannot invite self
- Token must be unique

## Summary

This data model provides:
- ✅ Complete privacy isolation between users
- ✅ Flexible question and response structures
- ✅ Progressive discovery depth
- ✅ Non-anxious goal tracking
- ✅ GDPR compliance built-in
- ✅ Family sharing with granular control
- ✅ Audit trail for security
- ✅ Scalable to 100k+ users

The model strongly aligns with the platform's constitution principles, especially Privacy by Default and Dignity-First Design.