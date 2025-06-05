import React from 'react';
import { Card, CardContent } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Star, ShoppingCart } from 'lucide-react';
import { featuredPrompts } from '../data/prompts';

const FeaturedPrompts: React.FC = () => {
  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Featured Prompts</h2>
            <p className="text-gray-400">Our most popular engineered prompts for various use cases</p>
          </div>
          <Button variant="outline">View All</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPrompts.map((prompt) => (
            <Card key={prompt.id} hover className="overflow-hidden h-full flex flex-col">
              <div className="h-48 bg-gradient-to-br from-purple-900/70 to-indigo-900/70 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_120%,white,transparent_70%)]"></div>
                <div className="absolute top-4 left-4 z-10 flex space-x-2">
                  {prompt.categories.map((category) => (
                    <Badge key={category} variant={category === 'Premium' ? 'default' : 'info'}>
                      {category}
                    </Badge>
                  ))}
                </div>
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <h3 className="text-xl font-bold text-white truncate">{prompt.title}</h3>
                </div>
              </div>

              <CardContent className="flex-grow flex flex-col">
                <p className="text-gray-400 mb-4 line-clamp-3">{prompt.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-400 mb-4 mt-auto">
                  <div className="flex items-center">
                    <Star className="text-yellow-500 mr-1" size={16} />
                    <span>{prompt.rating} ({prompt.reviews} reviews)</span>
                  </div>
                  <span>${prompt.price.toFixed(2)}</span>
                </div>

                <div className="flex space-x-2">
                  <Button fullWidth>View Details</Button>
                  <Button variant="outline" className="p-2 flex-shrink-0">
                    <ShoppingCart size={20} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPrompts;