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

// Category Pages
import CategoriesOverview from './pages/categories/CategoriesOverview';
import MarketingContent from './pages/categories/MarketingContent';
import EducationTeaching from './pages/categories/EducationTeaching';
import SoftwareDevelopment from './pages/categories/SoftwareDevelopment';
import CustomerSupport from './pages/categories/CustomerSupport';
import LegalServices from './pages/categories/LegalServices';
import HRRecruitment from './pages/categories/HRRecruitment';
import Healthcare from './pages/categories/Healthcare';
import DataScience from './pages/categories/DataScience';
import SubcategoryDetail from './pages/categories/SubcategoryDetail';
import PromptExamples from './pages/prompt-engineering/prompt-examples';

// Resource Pages
import GettingStarted from './pages/resources/GettingStarted';
import Documentation from './pages/resources/Documentation';
import FAQ from './pages/resources/FAQ.new';
import Tutorials from './pages/resources/Tutorials';
import Blog from './pages/resources/Blog';

const HomePage = () => (
  <main className="space-y-16 md:space-y-24">
    <Hero />
    <div className="relative">
      <EngineeringSection />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-transparent pointer-events-none" />
    </div>
    <CategoriesSection />
    <div className="relative overflow-hidden">
      <StatsCounter />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/30 to-transparent pointer-events-none" />
    </div>
    <div className="relative">
      <ResourcesSection />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/30 to-transparent pointer-events-none" />
    </div>
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
            <Route path="/prompt-engineering-guide/examples" element={<PromptExamples />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/getting-started" element={<GettingStarted />} />
            <Route path="/resources/documentation" element={<Documentation />} />
            <Route path="/resources/faq" element={<FAQ />} />
            <Route path="/resources/tutorials" element={<Tutorials />} />
            <Route path="/resources/blog" element={<Blog />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            
            {/* Category Routes */}
            <Route path="/categories/*" element={<CategoryLayout />}>
              <Route index element={<CategoriesOverview />} />
              <Route path="marketing" element={<MarketingContent />} />
              <Route path="marketing/:subcategoryId" element={<SubcategoryDetail categoryId="marketing" />} />
              <Route path="education" element={<EducationTeaching />} />
              <Route path="education/:subcategoryId" element={<SubcategoryDetail categoryId="education" />} />
              <Route path="development" element={<SoftwareDevelopment />} />
              <Route path="development/:subcategoryId" element={<SubcategoryDetail categoryId="development" />} />
              <Route path="support" element={<CustomerSupport />} />
              <Route path="support/:subcategoryId" element={<SubcategoryDetail categoryId="support" />} />
              <Route path="legal" element={<LegalServices />} />
              <Route path="legal/:subcategoryId" element={<SubcategoryDetail categoryId="legal" />} />
              <Route path="hr" element={<HRRecruitment />} />
              <Route path="hr/:subcategoryId" element={<SubcategoryDetail categoryId="hr" />} />
              <Route path="healthcare" element={<Healthcare />} />
              <Route path="healthcare/:subcategoryId" element={<SubcategoryDetail categoryId="healthcare" />} />
              <Route path="data-science" element={<DataScience />} />
              <Route path="data-science/:subcategoryId" element={<SubcategoryDetail categoryId="data-science" />} />
            </Route>
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;