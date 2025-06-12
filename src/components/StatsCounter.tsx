import React from 'react';
import { Users2, Star, Box, Trophy } from 'lucide-react';

const stats = [
	{
		id: 'users',
		label: 'Active Users',
		value: '10,000+',
		icon: Users2,
		color: 'text-blue-400',
	},
	{
		id: 'prompts',
		label: 'Engineered Prompts',
		value: '150+',
		icon: Box,
		color: 'text-purple-400',
	},
	{
		id: 'rating',
		label: 'Average Rating',
		value: '4.8/5',
		icon: Star,
		color: 'text-yellow-400',
	},
	{
		id: 'success',
		label: 'Success Rate',
		value: '97%',
		icon: Trophy,
		color: 'text-emerald-400',
	},
];

const StatsCounter: React.FC = () => {
	return (
		<section className="py-20 bg-gradient-to-b from-gray-900/50 via-gray-900/50 to-gray-900/90 relative">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.1),transparent_70%)]"></div>
			<div className="container mx-auto px-4 relative z-10">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
					{stats.map((stat) => {
						const Icon = stat.icon;
						return (
							<div
								key={stat.id}
								className="text-center p-4 sm:p-6 rounded-lg bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 hover:border-purple-500/20 transition-all duration-300"
							>
								<div className="flex justify-center mb-3 sm:mb-4">
									<Icon className={`w-7 h-7 sm:w-8 sm:h-8 ${stat.color}`} />
								</div>
								<div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">
									{stat.value}
								</div>
								<div className="text-sm text-gray-400">{stat.label}</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default StatsCounter;
