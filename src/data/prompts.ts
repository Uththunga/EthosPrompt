export interface Prompt {
  id: string;
  title: string;
  description: string;
  categories: string[];
  price: number;
  rating: number;
  reviews: number;
}

export const featuredPrompts: Prompt[] = [
  {
    id: '1',
    title: 'Ultimate Content Calendar Generator',
    description: 'Generate a full month of engaging social media content ideas tailored to your brand, audience, and marketing goals. Includes post types, hashtags, and optimal posting times.',
    categories: ['Premium', 'Content'],
    price: 19.99,
    rating: 4.8,
    reviews: 126
  },
  {
    id: '2',
    title: 'Technical Interview Question Pack',
    description: 'Comprehensive set of role-specific technical interview questions with evaluation criteria. Perfect for technical recruiters hiring software developers, data scientists, and engineers.',
    categories: ['HR', 'Recruiting'],
    price: 24.99,
    rating: 4.9,
    reviews: 87
  },
  {
    id: '3',
    title: 'Email Marketing Campaign Builder',
    description: 'Create high-converting email marketing campaigns with personalized subject lines, body content, and CTAs. Optimize for engagement and conversions with this tested prompt.',
    categories: ['Marketing', 'Premium'],
    price: 29.99,
    rating: 4.7,
    reviews: 204
  },
  {
    id: '4',
    title: 'SEO Content Optimizer',
    description: 'Transform existing content into SEO-optimized articles with improved readability, keyword integration, and semantic relevance. Perfect for content marketers and bloggers.',
    categories: ['SEO', 'Content'],
    price: 14.99,
    rating: 4.6,
    reviews: 153
  },
  {
    id: '5',
    title: 'LinkedIn Profile Enhancer',
    description: 'Upgrade your LinkedIn profile with compelling professional summaries, experience descriptions, and skill highlights that attract recruiters and opportunities.',
    categories: ['Career', 'Personal'],
    price: 9.99,
    rating: 4.7,
    reviews: 219
  },
  {
    id: '6',
    title: 'Product Description Generator',
    description: 'Create compelling, benefit-focused product descriptions that convert browsers into buyers. Customize for tone, audience, and marketplace requirements.',
    categories: ['E-commerce', 'Marketing'],
    price: 19.99,
    rating: 4.8,
    reviews: 176
  }
];