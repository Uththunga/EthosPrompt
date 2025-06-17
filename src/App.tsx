import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import CategoriesSection from './components/Categories';
import CallToAction from './components/CallToAction';
import StatsCounter from './components/StatsCounter';
import ResourcesSection from './components/ResourcesSection';
import EngineeringSection from './components/EngineeringSection';
import CategoryLayout from './components/layouts/CategoryLayout';

// Pages
import PromptEngineeringGuide from './pages/PromptEngineeringGuide';
import PromptEngineeringBasics from './pages/prompt-engineering/Basics';
import PromptEngineeringTechniques from './pages/prompt-engineering/Techniques';
import Resources from './pages/Resources';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';

// Category & Prompt Pages
import CategoriesOverview from './pages/categories/CategoriesOverview';
import CategoryPage from './pages/CategoryPage';
import PromptDetailPage from './pages/PromptDetailPage';

// Resource Pages
import GettingStarted from './pages/resources/GettingStarted';
import Documentation from './pages/resources/Documentation';
import FAQ from './pages/resources/FAQ.new';
import Tutorials from './pages/resources/Tutorials';
import Blog from './pages/resources/Blog';
import DataTableDemo from './pages/DataTableDemo';

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
  return (
    <ThemeProvider>
      <Router basename="/EthosPrompt">
        <div className="min-h-screen bg-gray-900 text-white">
          <Header />
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
            <Route path="/components/datatable" element={<DataTableDemo />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            
            {/* Category Routes */}
            <Route path="/categories" element={<CategoryLayout />}>
              <Route index element={<CategoriesOverview />} />
              <Route path=":id" element={<CategoryPage />} />
            </Route>

            {/* Prompt Detail Route */}
            <Route path="/prompts/:promptId" element={<PromptDetailPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;