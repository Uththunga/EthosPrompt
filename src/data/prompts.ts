export type Difficulty = 'Very Easy' | 'Easy' | 'Moderate' | 'Challenging' | 'Advanced' | 'Expert' | 'Master';

export interface Prompt {
  id: string;
  title: string;
  description: string;
  prompt: string;
  tags?: string[];
  categories: string[];
  price: number;
  rating: number;
  reviews: number;
  difficulty?: Difficulty;
  estimatedTime?: string;
  prerequisites?: string[];
}

export const featuredPrompts: Prompt[] = [
  {
    id: '1',
    title: 'Ultimate Content Calendar Generator',
    description: 'Generate a full month of engaging social media content ideas tailored to your brand, audience, and marketing goals. Includes post types, hashtags, and optimal posting times.',
    prompt: 'Create a content calendar for [industry] with [number] posts per week, including [specific content types].',
    categories: ['Premium', 'Content'],
    price: 19.99,
    rating: 4.8,
    reviews: 126,
    difficulty: 'Moderate',
    estimatedTime: '30 minutes',
    tags: ['social media', 'content planning', 'marketing']
  },
  {
    id: '2',
    title: 'Technical Interview Question Pack',
    description: 'Comprehensive set of role-specific technical interview questions with evaluation criteria. Perfect for technical recruiters hiring software developers, data scientists, and engineers.',
    prompt: 'Generate [number] technical interview questions for a [job title] position focusing on [specific skills or technologies].',
    categories: ['HR', 'Recruiting'],
    price: 24.99,
    rating: 4.9,
    reviews: 87,
    difficulty: 'Challenging',
    estimatedTime: '35 minutes',
    tags: ['interviewing', 'hiring', 'technical skills']
  },
  {
    id: '3',
    title: 'Email Marketing Campaign Builder',
    description: 'Create high-converting email marketing campaigns with personalized subject lines, body content, and CTAs. Optimize for engagement and conversions with this tested prompt.',
    prompt: 'Create a [number]-email sequence for [product/service] that nurtures leads and drives conversions.',
    categories: ['Marketing', 'Premium'],
    price: 29.99,
    rating: 4.7,
    reviews: 204,
    difficulty: 'Advanced',
    estimatedTime: '45 minutes',
    tags: ['email marketing', 'automation', 'conversion']
  },
  {
    id: '4',
    title: 'SEO Content Optimizer',
    description: 'Transform existing content into SEO-optimized articles with improved readability, keyword integration, and semantic relevance. Perfect for content marketers and bloggers.',
    prompt: 'Optimize the following content for SEO, focusing on the keyword [keyword]: [paste content]',
    categories: ['SEO', 'Content'],
    price: 14.99,
    rating: 4.6,
    reviews: 153,
    difficulty: 'Moderate',
    estimatedTime: '25 minutes',
    tags: ['seo', 'content optimization', 'blogging']
  },
  {
    id: '5',
    title: 'LinkedIn Profile Enhancer',
    description: 'Upgrade your LinkedIn profile with compelling professional summaries, experience descriptions, and skill highlights that attract recruiters and opportunities.',
    prompt: 'Create a compelling LinkedIn profile summary for a [job title] with [number] years of experience in [industry].',
    categories: ['Career', 'Personal'],
    price: 9.99,
    rating: 4.7,
    reviews: 219,
    difficulty: 'Easy',
    estimatedTime: '20 minutes',
    tags: ['linkedin', 'career', 'personal branding']
  },
  {
    id: '6',
    title: 'Landing Page Copy Generator',
    description: 'Craft persuasive landing page copy that converts visitors into customers with compelling headlines, benefits, and CTAs.',
    prompt: 'Write landing page copy for [product/service] that converts visitors into [desired action].',
    categories: ['Conversion', 'Copywriting'],
    price: 21.99,
    rating: 4.8,
    reviews: 76,
    difficulty: 'Advanced',
    estimatedTime: '40 minutes',
    tags: ['conversion', 'copywriting', 'landing page']
  }
];