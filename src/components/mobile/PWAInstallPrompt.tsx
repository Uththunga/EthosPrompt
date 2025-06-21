import React, { useState, useEffect } from 'react';
import { X, Download, Smartphone, Monitor, Share } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';

interface PWAInstallPromptProps {
  onInstall?: () => void;
  onDismiss?: () => void;
  className?: string;
}

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWAInstallPrompt: React.FC<PWAInstallPromptProps> = ({
  onInstall,
  onDismiss,
  className,
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [platform, setPlatform] = useState<'ios' | 'android' | 'desktop' | 'unknown'>('unknown');

  useEffect(() => {
    // Detect platform
    const userAgent = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setPlatform('ios');
    } else if (/android/.test(userAgent)) {
      setPlatform('android');
    } else {
      setPlatform('desktop');
    }

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show prompt after a delay (don't be too aggressive)
      setTimeout(() => {
        const hasShownBefore = localStorage.getItem('pwa-install-dismissed');
        if (!hasShownBefore) {
          setShowPrompt(true);
        }
      }, 5000);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
      onInstall?.();
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [onInstall]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setIsInstalled(true);
        onInstall?.();
      }
      
      setShowPrompt(false);
      setDeferredPrompt(null);
    } catch (error) {
      console.error('Error installing PWA:', error);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
    onDismiss?.();
  };

  const getInstallInstructions = () => {
    switch (platform) {
      case 'ios':
        return {
          icon: <Share className="w-5 h-5" />,
          title: 'Install EthosPrompt',
          steps: [
            'Tap the Share button in Safari',
            'Scroll down and tap "Add to Home Screen"',
            'Tap "Add" to install the app'
          ]
        };
      case 'android':
        return {
          icon: <Download className="w-5 h-5" />,
          title: 'Install EthosPrompt',
          steps: [
            'Tap "Install" when prompted',
            'Or use the menu and select "Install app"',
            'Follow the installation prompts'
          ]
        };
      default:
        return {
          icon: <Monitor className="w-5 h-5" />,
          title: 'Install EthosPrompt',
          steps: [
            'Click the install icon in the address bar',
            'Or use the menu and select "Install EthosPrompt"',
            'Follow the installation prompts'
          ]
        };
    }
  };

  if (isInstalled || !showPrompt) return null;

  const instructions = getInstallInstructions();

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 md:bottom-4 md:left-4 md:right-auto md:max-w-sm',
        'bg-gray-900/95 backdrop-blur-md border-t md:border border-gray-800/50 md:rounded-xl',
        'transform transition-transform duration-300 ease-out',
        'mobile-safe-bottom',
        className
      )}
    >
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
              {instructions.icon}
            </div>
            <div>
              <h3 className="text-white font-semibold">{instructions.title}</h3>
              <p className="text-gray-400 text-sm">Get the full app experience</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="text-gray-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Benefits */}
        <div className="mb-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="w-8 h-8 mx-auto mb-1 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Smartphone className="w-4 h-4 text-purple-400" />
              </div>
              <span className="text-xs text-gray-400">Native Feel</span>
            </div>
            <div>
              <div className="w-8 h-8 mx-auto mb-1 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Download className="w-4 h-4 text-green-400" />
              </div>
              <span className="text-xs text-gray-400">Offline Access</span>
            </div>
            <div>
              <div className="w-8 h-8 mx-auto mb-1 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Monitor className="w-4 h-4 text-blue-400" />
              </div>
              <span className="text-xs text-gray-400">Fast Loading</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {deferredPrompt && platform !== 'ios' ? (
            <Button
              onClick={handleInstallClick}
              className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Install App
            </Button>
          ) : (
            <Button
              onClick={() => setShowPrompt(false)}
              variant="outline"
              className="flex-1 border-gray-600 text-gray-300"
            >
              Show Instructions
            </Button>
          )}
          <Button
            variant="ghost"
            onClick={handleDismiss}
            className="text-gray-400 hover:text-white"
          >
            Later
          </Button>
        </div>

        {/* iOS Instructions Modal */}
        {platform === 'ios' && (
          <div className="mt-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
            <h4 className="text-white font-medium mb-2 text-sm">How to install:</h4>
            <ol className="text-xs text-gray-400 space-y-1">
              {instructions.steps.map((step, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

// Hook for PWA install state
export const usePWAInstall = () => {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const install = async () => {
    if (!deferredPrompt) return false;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setIsInstallable(false);
        setDeferredPrompt(null);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error installing PWA:', error);
      return false;
    }
  };

  return {
    isInstallable,
    isInstalled,
    install,
  };
};

export default PWAInstallPrompt;
