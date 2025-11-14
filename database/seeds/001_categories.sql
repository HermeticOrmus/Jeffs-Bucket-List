-- Question Categories Seed Data
-- Based on the six core life areas for seniors

INSERT INTO question_categories (name, slug, description, display_order, icon, color, is_active) VALUES
  (
    'Reconnection',
    'reconnection',
    'Relationships to rebuild or deepen with people who matter to you',
    1,
    '❤️',
    '#E74C3C',
    TRUE
  ),
  (
    'Learning',
    'learning',
    'Skills to acquire and knowledge to explore at your own pace',
    2,
    '📚',
    '#3498DB',
    TRUE
  ),
  (
    'Creation',
    'creation',
    'Things to make, build, or bring into the world',
    3,
    '🎨',
    '#9B59B6',
    TRUE
  ),
  (
    'Completion',
    'completion',
    'Unfinished business and projects worth completing',
    4,
    '✅',
    '#2ECC71',
    TRUE
  ),
  (
    'Contribution',
    'contribution',
    'Ways to give back and make a difference in your community',
    5,
    '🤝',
    '#F39C12',
    TRUE
  ),
  (
    'Simple Joys',
    'simple-joys',
    'Moments to savor and experiences to enjoy regularly',
    6,
    '🌟',
    '#1ABC9C',
    TRUE
  );
