import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Grid, List, TrendingUp, Users, Clock } from 'lucide-react';
import { useCategories } from '../hooks/useDatabaseLoader';
import { ComponentLoadingSpinner } from '../components/LoadingSpinner';
import Breadcrumb from '../components/ui/Breadcrumb';


import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { cn } from '../lib/utils';

const CategoryOverview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: categories, loading, error } = useCategories();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [skillLevelFilter, setSkillLevelFilter] = useState<string>('all');

  const category = useMemo(() => 
    categories?.find(cat => cat.id === id), 
    [categories, id]
  );

  // Filter subcategories based on search and skill level
  const filteredSubcategories = useMemo(() => {
    if (!category?.subcategories) return [];
    
    return category.subcategories.filter(sub => {
      const matchesSearch = searchQuery === '' || 
        sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.examples.some(example => example.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesSkillLevel = skillLevelFilter === 'all' || 
        sub.skillLevel.toLowerCase() === skillLevelFilter.toLowerCase();
      
      return matchesSearch && matchesSkillLevel;
    });
  }, [category, searchQuery, skillLevelFilter]);

  const breadcrumbItems = [
    { label: 'Categories', href: '/categories' },
    { label: category?.name || 'Loading...', current: true }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <ComponentLoadingSpinner text="Loading category overview..." />
        </div>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <p className="text-gray-400 mb-6">The category you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/categories')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Categories
          </Button>
        </div>
      </div>
    );
  }

  const handleSubcategoryClick = (subcategoryId: string) => {
    navigate(`/categories/${id}?subcategory=${subcategoryId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white">
      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800/50 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} className="mb-4" />
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate(-1)}
                className="p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5 text-gray-400" />
              </button>
              
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent flex items-center gap-3">
                  <span className="text-purple-400">{category.icon}</span>
                  {category.name}
                </h1>
                <p className="text-gray-400 mt-1">{category.description}</p>
              </div>
            </div>
            

          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filters */}
            <Card className="bg-gray-800/60 border-gray-700/40 p-5">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5 text-purple-400" />
                Filters
              </h3>
              
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search subcategories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-700/50 border border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
                />
              </div>
              
              {/* Skill Level Filter */}
              <div>
                <label className="text-sm font-medium text-gray-400 mb-2 block">Skill Level</label>
                <select
                  value={skillLevelFilter}
                  onChange={(e) => setSkillLevelFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  <option value="all">All Levels</option>
                  <option value="basic">Basic</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </Card>


          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            {/* View Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold text-white">
                  Subcategories ({filteredSubcategories.length})
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      'p-2 rounded-lg transition-colors',
                      viewMode === 'grid' 
                        ? 'bg-purple-600/20 text-purple-400' 
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    )}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={cn(
                      'p-2 rounded-lg transition-colors',
                      viewMode === 'list' 
                        ? 'bg-purple-600/20 text-purple-400' 
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    )}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Subcategories Grid/List */}
            <div className={cn(
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
                : 'space-y-4'
            )}>
              {filteredSubcategories.map((subcategory) => (
                <Card
                  key={subcategory.id}
                  className="bg-gray-800/60 border-gray-700/40 hover:border-purple-500/50 transition-all duration-300 cursor-pointer group"
                  onClick={() => handleSubcategoryClick(subcategory.id)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                        {subcategory.name}
                      </h3>
                      <span className={cn(
                        'px-2 py-1 rounded-full text-xs font-medium',
                        subcategory.skillLevel === 'Basic' && 'bg-green-900/40 text-green-300 border border-green-800/50',
                        subcategory.skillLevel === 'Intermediate' && 'bg-yellow-900/40 text-yellow-300 border border-yellow-800/50',
                        subcategory.skillLevel === 'Advanced' && 'bg-red-900/40 text-red-300 border border-red-800/50'
                      )}>
                        {subcategory.skillLevel}
                      </span>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {subcategory.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {subcategory.examples.slice(0, 3).map((example, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 rounded-full bg-gray-700/50 text-gray-300 border border-gray-600/50"
                        >
                          {example}
                        </span>
                      ))}
                      {subcategory.examples.length > 3 && (
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-700/50 text-gray-400">
                          +{subcategory.examples.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        Popular
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Recently updated
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredSubcategories.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                <h3 className="text-xl font-semibold text-white mb-2">No subcategories found</h3>
                <p className="text-gray-400 mb-4">
                  Try adjusting your search or filter criteria.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setSkillLevelFilter('all');
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryOverview;
