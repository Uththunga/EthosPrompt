import React from 'react';
import { Card, CardContent } from './ui/Card';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import { useNavigate } from 'react-router-dom';

const resources = [
	{
		id: '1',
		title: 'Getting Started with AI Prompts',
		category: 'Guide',
		readTime: '5 min read',
		image: '/bg.jpg',
		path: '/prompt-engineering-guide',
	},
	{
		id: '2',
		title: 'Maximizing ROI with Engineered Prompts',
		category: 'Case Study',
		readTime: '8 min read',
		image: '/bg.webp',
		path: '/blog/case-studies',
	},
	{
		id: '3',
		title: 'AI Prompt Engineering Best Practices',
		category: 'Tutorial',
		readTime: '10 min read',
		image: '/bg.jpg',
		path: '/prompt-engineering-guide#best-practices',
	},
];

const ResourcesSection: React.FC = () => {
	const navigate = useNavigate();

	const handleResourceClick = (path: string) => {
		navigate(path);
	};

	return (
		<section className="py-12 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 relative overflow-hidden">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(124,58,237,0.1),transparent_60%)]"></div>
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-end mb-10">
					<div>
						<h2 className="text-3xl font-bold text-white mb-2">
							Latest Resources
						</h2>
						<p className="text-gray-400">
							Learn how to get the most out of AI prompts
						</p>
					</div>
					<Button
						variant="outline"
						className="group inline-flex items-center"
						onClick={() => navigate('/resources')}
					>
						View All Resources
						<ArrowRight
							className="ml-2 group-hover:translate-x-1 transition-transform"
							size={16}
						/>
					</Button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{resources.map((resource) => (
						<div
							key={resource.id}
							onClick={() => handleResourceClick(resource.path)}
							className="cursor-pointer"
						>
							<Card className="overflow-hidden hover:border-purple-500/50 transition-colors duration-300 h-full">
								<div className="h-48 relative overflow-hidden">
									<img
										src={resource.image}
										alt={resource.title}
										className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
									/>
									<div className="absolute top-4 left-4">
										<span className="px-3 py-1 bg-purple-500/90 backdrop-blur-sm rounded-full text-sm text-white">
											{resource.category}
										</span>
									</div>
								</div>
								<CardContent className="p-6">
									<h3 className="text-xl font-semibold text-white mb-2 hover:text-purple-400 transition-colors">
										{resource.title}
									</h3>
									<p className="text-gray-400">{resource.readTime}</p>
								</CardContent>
							</Card>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default ResourcesSection;
