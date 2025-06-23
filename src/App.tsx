import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import { ErrorProvider } from './contexts/ErrorContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ErrorNotifications } from './components/ErrorNotifications';
import { ToastProvider } from './components/ui/Toast';
import Header from './components/Header';
import Footer from './components/Footer';
import BottomNavigation from './components/mobile/BottomNavigation';

import AppLoadingScreen from './components/mobile/AppLoadingScreen';
import MobilePerformanceMonitor from './components/mobile/MobilePerformanceMonitor';
import Hero from './components/Hero';
import CategoriesSection from './components/Categories';
import CallToAction from './components/CallToAction';
import StatsCounter from './components/StatsCounter';
import ResourcesSection from './components/ResourcesSection';
import EngineeringSection from './components/EngineeringSection';
import CategoryLayout from './components/layouts/CategoryLayout';
import { PageLoadingSpinner } from './components/LoadingSpinner';
import { PerformanceMonitor } from './components/PerformanceMonitor';

// Lazy-loaded Pages for Code Splitting
const PromptEngineeringGuide = React.lazy(() => import('./pages/PromptEngineeringGuide'));
const PromptEngineeringBasics = React.lazy(() => import('./pages/prompt-engineering/Basics'));
const PromptEngineeringTechniques = React.lazy(() => import('./pages/prompt-engineering/Techniques'));
const Resources = React.lazy(() => import('./pages/Resources'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = React.lazy(() => import('./pages/TermsOfService'));
const CookiePolicy = React.lazy(() => import('./pages/CookiePolicy'));

// Category & Prompt Pages (Heavy components - high priority for lazy loading)
const CategoriesOverview = React.lazy(() => import('./pages/categories/CategoriesOverview'));
const CategoryPage = React.lazy(() => import('./pages/CategoryPage'));
const PromptDetailPage = React.lazy(() => import('./pages/PromptDetailPage'));

// Resource Pages
const GettingStarted = React.lazy(() => import('./pages/resources/GettingStarted'));
const Documentation = React.lazy(() => import('./pages/resources/Documentation'));
const FAQ = React.lazy(() => import('./pages/resources/FAQ.new'));
const Tutorials = React.lazy(() => import('./pages/resources/Tutorials'));
const Blog = React.lazy(() => import('./pages/resources/Blog'));
const BlogPostDetail = React.lazy(() => import('./pages/BlogPostDetail'));
const DataTableDemo = React.lazy(() => import('./pages/DataTableDemo'));

const HomePage = () => (
  <main className="space-y-12 md:space-y-20">
    <Hero />
    <EngineeringSection />
    <CategoriesSection />
    <StatsCounter />
    <ResourcesSection />
    <CallToAction />
  </main>
);

function App() {
  const [isAppLoading, setIsAppLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorProvider>
      <ToastProvider>
        <ThemeProvider>
          <ErrorBoundary level="critical" onError={(error, errorInfo) => {
            console.error('Critical App Error:', error, errorInfo)
            // In production, send to error tracking service
          }}>
            <Router basename="/EthosPrompt">
              <div className="min-h-screen bg-gray-900 text-white">
                <Header />
                <ErrorBoundary level="page" onError={(error, errorInfo) => {
                  console.error('Route Error:', error, errorInfo)
                }}>
                  <Suspense fallback={<PageLoadingSpinner />}>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/prompt-engineering-guide" element={<PromptEngineeringGuide />} />
                      <Route path="/prompt-engineering-guide/basics" element={<PromptEngineeringBasics />} />
                      <Route path="/prompt-engineering-guide/techniques" element={<PromptEngineeringTechniques />} />
                      <Route path="/resources" element={<Resources />} />
                      <Route path="/resources/getting-started" element={<GettingStarted />} />
                      <Route path="/resources/documentation" element={<Documentation />} />
                      <Route path="/resources/faq" element={<FAQ />} />
                      <Route path="/resources/tutorials" element={<Tutorials />} />
                      <Route path="/resources/blog" element={<Blog />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/blog/:slug" element={
                        <Suspense fallback={<PageLoadingSpinner />}>
                          <BlogPostDetail />
                        </Suspense>
                      } />
                      <Route path="/components/datatable" element={<DataTableDemo />} />
                      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                      <Route path="/terms-of-service" element={<TermsOfService />} />
                      <Route path="/cookie-policy" element={<CookiePolicy />} />

                      {/* Category Routes with nested Suspense for heavy components */}
                      <Route path="/categories" element={<CategoryLayout />}>
                        <Route index element={
                          <Suspense fallback={<PageLoadingSpinner />}>
                            <CategoriesOverview />
                          </Suspense>
                        } />
                        <Route path=":id" element={
                          <Suspense fallback={<PageLoadingSpinner />}>
                            <CategoryPage />
                          </Suspense>
                        } />
                      </Route>

                      {/* Prompt Detail Route - Heavy component */}
                      <Route path="/prompts/:promptId" element={
                        <Suspense fallback={<PageLoadingSpinner />}>
                          <PromptDetailPage />
                        </Suspense>
                      } />
                    </Routes>
                  </Suspense>
                </ErrorBoundary>
                <Footer />
                <BottomNavigation />
              </div>
            </Router>
            <ErrorNotifications />

            <AppLoadingScreen
              isVisible={isAppLoading}
              onComplete={() => setIsAppLoading(false)}
            />

            {/* Performance Monitor (development only) */}
            <PerformanceMonitor
              enabled={process.env.NODE_ENV === 'development'}
              position="bottom-right"
            />

            {/* Mobile Performance Monitor */}
            <MobilePerformanceMonitor
              enabled={process.env.NODE_ENV === 'development'}
              position="bottom-left"
            />
          </ErrorBoundary>
        </ThemeProvider>
      </ToastProvider>
    </ErrorProvider>
  );
}

export default App;