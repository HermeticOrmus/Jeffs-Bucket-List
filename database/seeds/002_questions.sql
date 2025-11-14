-- Initial Question Bank (Depth Level 1)
-- Thoughtful, age-appropriate questions for adults 60+

-- Get category IDs for reference
DO $$
DECLARE
  cat_reconnection UUID;
  cat_learning UUID;
  cat_creation UUID;
  cat_completion UUID;
  cat_contribution UUID;
  cat_simple_joys UUID;
BEGIN
  SELECT id INTO cat_reconnection FROM question_categories WHERE slug = 'reconnection';
  SELECT id INTO cat_learning FROM question_categories WHERE slug = 'learning';
  SELECT id INTO cat_creation FROM question_categories WHERE slug = 'creation';
  SELECT id INTO cat_completion FROM question_categories WHERE slug = 'completion';
  SELECT id INTO cat_contribution FROM question_categories WHERE slug = 'contribution';
  SELECT id INTO cat_simple_joys FROM question_categories WHERE slug = 'simple-joys';

  -- ===========================================================================
  -- RECONNECTION QUESTIONS
  -- ===========================================================================

  INSERT INTO questions (category_id, question_text, question_subtext, question_type, response_schema, depth_level, display_order, is_sensitive) VALUES
  (
    cat_reconnection,
    'Is there someone you wish you were closer to?',
    'This could be a family member, old friend, or someone you''ve lost touch with over the years.',
    'text',
    '{"maxLength": 500, "minLength": 10, "placeholder": "Share your thoughts..."}'::jsonb,
    1,
    1,
    FALSE
  ),
  (
    cat_reconnection,
    'What stops you from reaching out to people you care about?',
    'Understanding the barriers can help us think about ways to overcome them.',
    'multiple_choice',
    '{"options": ["Fear of rejection", "Too much time has passed", "Don''t know what to say", "They might be upset with me", "I don''t have their contact info"], "allowMultiple": true, "allowOther": true}'::jsonb,
    1,
    2,
    FALSE
  ),
  (
    cat_reconnection,
    'Who made you feel most understood in your life?',
    'Sometimes looking back helps us know what kinds of connections to seek now.',
    'text',
    '{"maxLength": 500, "placeholder": "Tell us about this person..."}'::jsonb,
    1,
    3,
    FALSE
  ),
  (
    cat_reconnection,
    'If you could have a conversation with someone from your past, who would it be?',
    'It doesn''t matter if they''re still in your life or not - just who comes to mind.',
    'text',
    '{"maxLength": 500, "placeholder": "Who would you choose and why?"}'::jsonb,
    1,
    4,
    TRUE
  ),
  (
    cat_reconnection,
    'How important is deepening relationships to you right now?',
    '',
    'scale',
    '{"min": 1, "max": 10, "minLabel": "Not important", "maxLabel": "Very important"}'::jsonb,
    1,
    5,
    FALSE
  );

  -- ===========================================================================
  -- LEARNING QUESTIONS
  -- ===========================================================================

  INSERT INTO questions (category_id, question_text, question_subtext, question_type, response_schema, depth_level, display_order) VALUES
  (
    cat_learning,
    'What have you always wanted to learn but never had the time for?',
    'It could be a skill, a language, an instrument, or just knowledge about something fascinating.',
    'text',
    '{"maxLength": 500, "placeholder": "What interests you?"}'::jsonb,
    1,
    1
  ),
  (
    cat_learning,
    'What kind of learning pace feels comfortable for you?',
    '',
    'multiple_choice',
    '{"options": ["Self-paced, no pressure", "Structured class with others", "One-on-one instruction", "Learning from books or videos"], "allowMultiple": false, "allowOther": true}'::jsonb,
    1,
    2
  ),
  (
    cat_learning,
    'Is there a place you''d love to understand better?',
    'This could be somewhere you''ve visited, somewhere you''d like to go, or even your own hometown''s history.',
    'text',
    '{"maxLength": 500, "placeholder": "Tell us more..."}'::jsonb,
    1,
    3
  ),
  (
    cat_learning,
    'What skill from your younger years would you like to improve or relearn?',
    'Sometimes we set skills aside but would enjoy picking them back up.',
    'text',
    '{"maxLength": 500, "placeholder": "What comes to mind?"}'::jsonb,
    1,
    4
  ),
  (
    cat_learning,
    'How important is learning new things to you at this stage of life?',
    '',
    'scale',
    '{"min": 1, "max": 10, "minLabel": "Not important", "maxLabel": "Very important"}'::jsonb,
    1,
    5
  );

  -- ===========================================================================
  -- CREATION QUESTIONS
  -- ===========================================================================

  INSERT INTO questions (category_id, question_text, question_subtext, question_type, response_schema, depth_level, display_order) VALUES
  (
    cat_creation,
    'If you could create something to leave behind, what would it be?',
    'This could be physical (a garden, a quilt) or intangible (a family recipe book, recorded stories).',
    'text',
    '{"maxLength": 500, "placeholder": "What would you create?"}'::jsonb,
    1,
    1
  ),
  (
    cat_creation,
    'What creative activities bring you joy?',
    '',
    'multiple_choice',
    '{"options": ["Writing", "Painting or drawing", "Photography", "Cooking or baking", "Gardening", "Woodworking", "Crafts", "Music"], "allowMultiple": true, "allowOther": true}'::jsonb,
    1,
    2
  ),
  (
    cat_creation,
    'Is there something you''ve made that you''re proud of?',
    'Reflecting on past creations can inspire future ones.',
    'text',
    '{"maxLength": 500, "placeholder": "Tell us about it..."}'::jsonb,
    1,
    3
  ),
  (
    cat_creation,
    'What stops you from pursuing creative projects?',
    '',
    'multiple_choice',
    '{"options": ["Don''t have the right materials", "No space to work", "Worried it won''t turn out well", "Don''t know where to start", "Physical limitations"], "allowMultiple": true, "allowOther": true}'::jsonb,
    1,
    4
  ),
  (
    cat_creation,
    'Would you enjoy creating something on your own or with others?',
    '',
    'multiple_choice',
    '{"options": ["Prefer creating alone", "Enjoy creating with family", "Like group creative activities", "Depends on the project"], "allowMultiple": false}'::jsonb,
    1,
    5
  );

  -- ===========================================================================
  -- COMPLETION QUESTIONS
  -- ===========================================================================

  INSERT INTO questions (category_id, question_text, question_subtext, question_type, response_schema, depth_level, display_order, is_sensitive) VALUES
  (
    cat_completion,
    'Is there something you started but never finished that still calls to you?',
    'No judgment - we''re just exploring what matters to you.',
    'text',
    '{"maxLength": 500, "placeholder": "What comes to mind?"}'::jsonb,
    1,
    1,
    FALSE
  ),
  (
    cat_completion,
    'What would completing this give you?',
    '',
    'multiple_choice',
    '{"options": ["Peace of mind", "Sense of accomplishment", "Something to share with family", "Closure on that chapter", "Pride in finishing"], "allowMultiple": true, "allowOther": true}'::jsonb,
    1,
    2,
    FALSE
  ),
  (
    cat_completion,
    'Is there a conversation you wish you''d had with someone?',
    'Sometimes the things left unsaid weigh on us.',
    'text',
    '{"maxLength": 500, "placeholder": "Tell us more if you''re comfortable..."}'::jsonb,
    1,
    3,
    TRUE
  ),
  (
    cat_completion,
    'Are there photos, letters, or memories you''d like to organize or preserve?',
    'Many people want to ensure their memories are cared for and accessible.',
    'yes_no',
    '{}'::jsonb,
    1,
    4,
    FALSE
  ),
  (
    cat_completion,
    'How does thinking about unfinished things make you feel?',
    '',
    'multiple_choice',
    '{"options": ["Guilty or anxious", "Motivated to complete them", "Ready to let some go", "Accepting of what is", "Unsure"], "allowMultiple": false, "allowOther": true}'::jsonb,
    1,
    5,
    FALSE
  );

  -- ===========================================================================
  -- CONTRIBUTION QUESTIONS
  -- ===========================================================================

  INSERT INTO questions (category_id, question_text, question_subtext, question_type, response_schema, depth_level, display_order) VALUES
  (
    cat_contribution,
    'What knowledge or skill do you have that others might benefit from?',
    'Your life experience is valuable - what could you share?',
    'text',
    '{"maxLength": 500, "placeholder": "What expertise do you have?"}'::jsonb,
    1,
    1
  ),
  (
    cat_contribution,
    'How would you most like to help others?',
    '',
    'multiple_choice',
    '{"options": ["Mentor someone younger", "Volunteer for a cause I care about", "Help family members", "Teach a skill", "Support my community", "Donate or fundraise"], "allowMultiple": true, "allowOther": true}'::jsonb,
    1,
    2
  ),
  (
    cat_contribution,
    'What cause or issue matters most to you?',
    'Understanding what you care about helps identify meaningful ways to contribute.',
    'text',
    '{"maxLength": 500, "placeholder": "What matters to you?"}'::jsonb,
    1,
    3
  ),
  (
    cat_contribution,
    'How much time and energy do you have for giving back right now?',
    'Being honest helps us suggest realistic ways to contribute.',
    'multiple_choice',
    '{"options": ["A few hours a week", "Occasional one-time projects", "Ongoing commitment", "Just small gestures", "Not sure yet"], "allowMultiple": false}'::jsonb,
    1,
    4
  ),
  (
    cat_contribution,
    'How important is giving back or making a difference to you?',
    '',
    'scale',
    '{"min": 1, "max": 10, "minLabel": "Not important", "maxLabel": "Very important"}'::jsonb,
    1,
    5
  );

  -- ===========================================================================
  -- SIMPLE JOYS QUESTIONS
  -- ===========================================================================

  INSERT INTO questions (category_id, question_text, question_subtext, question_type, response_schema, depth_level, display_order) VALUES
  (
    cat_simple_joys,
    'What small, everyday moment makes you happiest?',
    'Sometimes the best goals are about savoring what already brings us joy.',
    'text',
    '{"maxLength": 500, "placeholder": "What brings you joy?"}'::jsonb,
    1,
    1
  ),
  (
    cat_simple_joys,
    'Is there a simple pleasure you used to enjoy but have lost touch with?',
    'Life gets busy - sometimes we forget the little things that nourished us.',
    'text',
    '{"maxLength": 500, "placeholder": "What did you used to enjoy?"}'::jsonb,
    1,
    2
  ),
  (
    cat_simple_joys,
    'What time of day feels most precious to you?',
    '',
    'multiple_choice',
    '{"options": ["Early morning", "Mid-morning", "Afternoon", "Evening", "Late night", "It varies"], "allowMultiple": false, "allowOther": true}'::jsonb,
    1,
    3
  ),
  (
    cat_simple_joys,
    'When was the last time you felt truly at peace?',
    'Remembering these moments can help us create more of them.',
    'text',
    '{"maxLength": 500, "placeholder": "Describe that moment..."}'::jsonb,
    1,
    4
  ),
  (
    cat_simple_joys,
    'How often do you make time for things that simply make you happy?',
    '',
    'scale',
    '{"min": 1, "max": 10, "minLabel": "Rarely", "maxLabel": "Very often"}'::jsonb,
    1,
    5
  );

END $$;
