-- Insert Beginner Prompts SQL
-- Run this in the Supabase SQL Editor to add comprehensive beginner prompts

-- First, temporarily disable RLS for prompts table to allow inserts
ALTER TABLE public.prompts DISABLE ROW LEVEL SECURITY;

-- Insert Marketing Strategy & Planning Prompts
INSERT INTO public.prompts (title, description, content, category_id, subcategory_id, prompt_group_id, tags, skill_level, access_type) VALUES
('Create a Customer Persona', 'Develop a detailed customer persona for your target audience.', 'Create a comprehensive customer persona for [your product/service]. Include: 1) Demographics (age, gender, location, income), 2) Psychographics (interests, values, lifestyle), 3) Pain points and challenges, 4) Goals and motivations, 5) Preferred communication channels, 6) Buying behavior patterns. Give your persona a name and write a brief story about their typical day.', 'marketing', 'marketing-strategy-planning', 'market-audience-research', ARRAY['persona', 'target audience', 'market research'], 'beginner', 'free'),

('Competitive Analysis Framework', 'Analyze your competitors to identify opportunities and threats.', 'Conduct a competitive analysis for [your industry/niche]. For each of your top 5 competitors, analyze: 1) Their unique value proposition, 2) Pricing strategy, 3) Marketing channels they use, 4) Strengths and weaknesses, 5) Customer reviews and feedback, 6) Market positioning. Then identify 3 opportunities where you can differentiate yourself.', 'marketing', 'marketing-strategy-planning', 'market-audience-research', ARRAY['competitive analysis', 'market research', 'positioning'], 'beginner', 'free'),

('Marketing Campaign Brief', 'Create a comprehensive brief for your next marketing campaign.', 'Develop a marketing campaign brief for [your product/service launch]. Include: 1) Campaign objectives and KPIs, 2) Target audience description, 3) Key messaging and value proposition, 4) Recommended marketing channels, 5) Budget allocation suggestions, 6) Timeline and milestones, 7) Success metrics and measurement plan.', 'marketing', 'marketing-strategy-planning', 'campaign-strategy-briefs', ARRAY['campaign planning', 'marketing strategy', 'brief'], 'beginner', 'free'),

('Content Marketing Strategy', 'Plan a 3-month content marketing strategy for your business.', 'Create a 3-month content marketing strategy for [your business type]. Include: 1) Content pillars and themes, 2) Content types and formats, 3) Publishing schedule and frequency, 4) Distribution channels, 5) SEO keyword targets, 6) Content creation workflow, 7) Performance metrics to track.', 'marketing', 'marketing-strategy-planning', 'content-seo-planning', ARRAY['content strategy', 'SEO', 'content planning'], 'beginner', 'free');

-- Insert Content Creation & Copywriting Prompts
INSERT INTO public.prompts (title, description, content, category_id, subcategory_id, prompt_group_id, tags, skill_level, access_type) VALUES
('Blog Post Outline Generator', 'Create engaging blog post outlines that drive traffic and engagement.', 'Create a detailed blog post outline for the topic "[your topic]" targeting [your audience]. Include: 1) Compelling headline with emotional hook, 2) Introduction that addresses reader pain points, 3) 5-7 main sections with subheadings, 4) Key points and examples for each section, 5) Call-to-action suggestions, 6) SEO keywords to include naturally.', 'marketing', 'content-creation-copywriting', 'long-form-content', ARRAY['blog writing', 'content outline', 'SEO'], 'beginner', 'free'),

('Social Media Caption Creator', 'Write engaging social media captions that boost engagement.', 'Write 5 different social media captions for [platform] about [your topic/product]. Each caption should: 1) Start with a hook that stops scrolling, 2) Provide value or entertainment, 3) Include relevant hashtags, 4) Have a clear call-to-action, 5) Match the platform''s tone and style. Vary the approaches: educational, behind-the-scenes, user-generated content, promotional, and storytelling.', 'marketing', 'content-creation-copywriting', 'social-media-content', ARRAY['social media', 'captions', 'engagement'], 'beginner', 'free'),

('Email Newsletter Template', 'Create compelling email newsletters that subscribers love to read.', 'Design an email newsletter template for [your business/niche]. Include: 1) Subject line that increases open rates, 2) Personal greeting and introduction, 3) 3-4 content sections (news, tips, featured content), 4) Clear call-to-action buttons, 5) Social media links, 6) Unsubscribe and contact information. Write sample content for each section.', 'marketing', 'content-creation-copywriting', 'email-ad-copy', ARRAY['email marketing', 'newsletter', 'engagement'], 'beginner', 'free');

-- Insert Education - Lesson Planning Prompts
INSERT INTO public.prompts (title, description, content, category_id, subcategory_id, prompt_group_id, tags, skill_level, access_type) VALUES
('Interactive Lesson Plan Template', 'Create engaging lesson plans that keep students actively involved.', 'Design a 45-minute interactive lesson plan for [subject] on the topic of "[lesson topic]" for [grade level]. Include: 1) Learning objectives (3-4 specific goals), 2) Materials needed, 3) Warm-up activity (5 minutes), 4) Main instruction with interactive elements (25 minutes), 5) Hands-on activity or group work (10 minutes), 6) Wrap-up and assessment (5 minutes), 7) Differentiation strategies for different learning styles.', 'education', 'lesson-planning', 'lesson-plans', ARRAY['lesson planning', 'interactive learning', 'education'], 'beginner', 'free'),

('Assessment Rubric Creator', 'Develop clear rubrics that help students understand expectations.', 'Create a detailed assessment rubric for [assignment type] in [subject area]. Include: 1) 4-5 key criteria to evaluate, 2) 4 performance levels (Excellent, Good, Satisfactory, Needs Improvement), 3) Specific descriptors for each level, 4) Point values for each criterion, 5) Space for written feedback, 6) Student self-assessment section.', 'education', 'lesson-planning', 'instructional-materials', ARRAY['assessment', 'rubrics', 'evaluation'], 'beginner', 'free'),

('Classroom Activity Designer', 'Design engaging activities that reinforce learning objectives.', 'Create 3 different classroom activities for teaching [concept] to [grade level] students. For each activity, include: 1) Activity name and brief description, 2) Learning objectives addressed, 3) Materials needed, 4) Step-by-step instructions, 5) Time required, 6) Assessment method, 7) Modifications for different ability levels.', 'education', 'lesson-planning', 'activity-design', ARRAY['classroom activities', 'engagement', 'learning'], 'beginner', 'free');

-- Insert Software Development - Code Assistance Prompts
INSERT INTO public.prompts (title, description, content, category_id, subcategory_id, prompt_group_id, tags, skill_level, access_type) VALUES
('Code Review Checklist', 'Create comprehensive checklists for thorough code reviews.', 'Generate a code review checklist for [programming language] projects. Include checks for: 1) Code functionality and logic, 2) Code style and formatting, 3) Performance considerations, 4) Security vulnerabilities, 5) Documentation and comments, 6) Test coverage, 7) Error handling, 8) Code reusability and maintainability. Provide specific examples for each category.', 'development', 'code-assistance', 'debugging-help', ARRAY['code review', 'best practices', 'quality assurance'], 'beginner', 'free'),

('Function Documentation Generator', 'Write clear, comprehensive documentation for your functions.', 'Create documentation for this [programming language] function: [paste your function here]. Include: 1) Brief description of what the function does, 2) Parameters with types and descriptions, 3) Return value description, 4) Usage examples, 5) Potential exceptions or edge cases, 6) Time/space complexity if relevant, 7) Related functions or dependencies.', 'development', 'code-assistance', 'code-generation', ARRAY['documentation', 'functions', 'code clarity'], 'beginner', 'free'),

('Debugging Strategy Guide', 'Systematic approach to identifying and fixing code issues.', 'Create a debugging strategy for this [programming language] error: "[error message]" in the context of [brief description of what you were trying to do]. Provide: 1) Possible causes of this error, 2) Step-by-step debugging approach, 3) Common solutions to try, 4) How to prevent this error in the future, 5) Tools or techniques that can help, 6) When to seek additional help.', 'development', 'code-assistance', 'debugging-help', ARRAY['debugging', 'problem solving', 'troubleshooting'], 'beginner', 'free');

-- Update category prompt counts
UPDATE public.categories SET prompt_count = (
  SELECT COUNT(*) FROM public.prompts WHERE category_id = categories.id
);

-- Re-enable RLS for prompts table
ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;
