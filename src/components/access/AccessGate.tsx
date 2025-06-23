import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, Crown, LogIn, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { usePromptAccess, PromptAccessInfo } from '../../hooks/usePromptAccess';

interface AccessGateProps {
  accessInfo: PromptAccessInfo;
  children: React.ReactNode;
  showPreview?: boolean;
  previewContent?: string;
}

const AccessGate: React.FC<AccessGateProps> = ({ 
  accessInfo, 
  children, 
  showPreview = false,
  previewContent 
}) => {
  const { getAccessMessage, getAccessAction } = usePromptAccess();

  // If user has access, show the content
  if (accessInfo.hasAccess) {
    return <>{children}</>;
  }

  // Show access gate
  const message = getAccessMessage(accessInfo);
  const action = getAccessAction(accessInfo);

  return (
    <div className="relative">
      {/* Preview Content (if enabled) */}
      {showPreview && previewContent && (
        <div className="relative mb-6">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="text-gray-300 text-sm leading-relaxed">
              {previewContent.substring(0, 200)}
              {previewContent.length > 200 && '...'}
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900 rounded-lg" />
        </div>
      )}

      {/* Access Gate */}
      <Card className="bg-gray-800 border-gray-700 p-8 text-center">
        <div className="flex justify-center mb-4">
          {accessInfo.requiresAuth ? (
            <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center">
              <LogIn className="w-8 h-8 text-blue-400" />
            </div>
          ) : accessInfo.requiresUpgrade ? (
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-600/20 to-yellow-500/20 rounded-full flex items-center justify-center">
              <Crown className="w-8 h-8 text-yellow-400" />
            </div>
          ) : (
            <div className="w-16 h-16 bg-gray-600/20 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </div>

        <h3 className="text-xl font-semibold text-white mb-2">
          {accessInfo.requiresAuth ? 'Sign In Required' : 
           accessInfo.requiresUpgrade ? 'Premium Content' : 
           'Access Restricted'}
        </h3>

        <p className="text-gray-400 mb-6 max-w-md mx-auto">
          {message}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            as={Link}
            to={action.action}
            className={`${
              accessInfo.requiresUpgrade 
                ? 'bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600' 
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white px-6 py-3`}
          >
            {action.text}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          {accessInfo.requiresUpgrade && (
            <Button
              as={Link}
              to="/login"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700 px-6 py-3"
            >
              Sign In
            </Button>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          {accessInfo.requiresUpgrade ? (
            <div className="text-sm text-gray-400">
              <p className="mb-2">🎯 <strong>Lifetime Access includes:</strong></p>
              <ul className="text-left max-w-sm mx-auto space-y-1">
                <li>• Access to all premium prompts</li>
                <li>• Advanced prompt engineering techniques</li>
                <li>• Industry-specific templates</li>
                <li>• Priority support</li>
                <li>• Future updates included</li>
              </ul>
            </div>
          ) : (
            <p className="text-sm text-gray-400">
              Join thousands of professionals using EthosPrompt to enhance their AI workflows
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AccessGate;
