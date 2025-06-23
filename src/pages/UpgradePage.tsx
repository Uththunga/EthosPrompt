import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, Check, ArrowLeft, Zap, Target, Users, Shield } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useAuth } from '../contexts/AuthContext';

const UpgradePage: React.FC = () => {
  const { user, hasLifetimeAccess } = useAuth();

  const features = [
    {
      icon: <Target className="w-5 h-5" />,
      title: 'Access to All Premium Prompts',
      description: 'Unlock our complete library of 500+ professional AI prompts'
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: 'Advanced Prompt Engineering',
      description: 'Master sophisticated techniques used by AI professionals'
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: 'Industry-Specific Templates',
      description: 'Specialized prompts for marketing, development, content creation, and more'
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Priority Support',
      description: 'Get help when you need it with dedicated customer support'
    }
  ];

  const benefits = [
    'Unlimited access to all premium prompts',
    'New prompts added weekly',
    'Advanced filtering and search',
    'Downloadable prompt collections',
    'Community access and discussions',
    'Lifetime updates included',
    'No recurring fees ever',
    '30-day money-back guarantee'
  ];

  if (hasLifetimeAccess) {
    return (
      <div className="min-h-screen bg-gray-900 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-600 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">You're All Set!</h1>
            <p className="text-gray-400 text-lg">
              You already have lifetime access to all premium features.
            </p>
          </div>

          <Card className="bg-gray-800 border-gray-700 p-8 max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-white mb-4">Your Benefits</h2>
            <div className="space-y-3 text-left">
              {benefits.slice(0, 4).map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
            <Button
              as={Link}
              to="/categories"
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Explore Premium Prompts
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link 
            to="/"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-600 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Crown className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4">
            Upgrade to Lifetime Access
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Unlock the complete EthosPrompt experience with one-time payment. 
            No subscriptions, no recurring fees.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Features */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">What You'll Get</h2>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-400 flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Benefits List */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-white mb-4">Complete Benefits</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="lg:sticky lg:top-8">
            <Card className="bg-gray-800 border-gray-700 p-8">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-white mb-2">$299</div>
                <div className="text-gray-400">One-time payment</div>
                <div className="text-sm text-green-400 mt-2">Save $100+ vs monthly plans</div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-300">Premium Prompts</span>
                  <span className="text-white font-semibold">500+</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-300">Monthly Updates</span>
                  <Check className="w-5 h-5 text-green-400" />
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-300">Priority Support</span>
                  <Check className="w-5 h-5 text-green-400" />
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-300">Lifetime Access</span>
                  <Check className="w-5 h-5 text-green-400" />
                </div>
              </div>

              {user ? (
                <Button className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-white py-4 text-lg font-semibold">
                  Upgrade Now - $299
                </Button>
              ) : (
                <div className="space-y-3">
                  <Button
                    as={Link}
                    to="/register"
                    className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-white py-4 text-lg font-semibold"
                  >
                    Sign Up & Upgrade - $299
                  </Button>
                  <Button
                    as={Link}
                    to="/login"
                    variant="outline"
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    Already have an account? Sign In
                  </Button>
                </div>
              )}

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  🔒 Secure payment • 30-day money-back guarantee
                </p>
              </div>
            </Card>

            {/* Testimonial */}
            <Card className="bg-gray-800 border-gray-700 p-6 mt-6">
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 text-yellow-400">⭐</div>
                  ))}
                </div>
                <p className="text-gray-300 text-sm italic mb-3">
                  "EthosPrompt transformed how I work with AI. The prompts are incredibly well-crafted and save me hours every week."
                </p>
                <p className="text-gray-400 text-xs">
                  — Sarah Chen, Marketing Director
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradePage;
