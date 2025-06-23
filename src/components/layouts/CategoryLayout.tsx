import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
}

const CategoryLayout: React.FC = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  const breadcrumbs: BreadcrumbItem[] = pathSegments.map((segment, index) => ({
    label: segment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    path: '/' + pathSegments.slice(0, index + 1).join('/')
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900 pt-24">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="flex mb-8 bg-gray-800/30 p-4 rounded-lg border border-gray-700/50" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors font-medium">
                Home
              </Link>
            </li>
            {breadcrumbs.map((item, index) => (
              <li key={item.path}>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-gray-500 mx-2" />
                  <Link
                    to={item.path}
                    className={`text-sm font-medium transition-colors ${
                      index === breadcrumbs.length - 1
                        ? 'text-purple-400 font-semibold'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </nav>

        {/* Main Content */}
        <Outlet />
      </div>
    </div>
  );
};

export default CategoryLayout;
