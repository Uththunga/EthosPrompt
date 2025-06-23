import { useAuth } from '../contexts/AuthContext';
import { Prompt } from '../lib/supabase';

export interface PromptAccessInfo {
  hasAccess: boolean;
  requiresAuth: boolean;
  requiresUpgrade: boolean;
  accessType: 'free' | 'paid';
  reason?: string;
}

export const usePromptAccess = () => {
  const { user, hasLifetimeAccess } = useAuth();

  const checkPromptAccess = (prompt: Prompt | { access_type: 'free' | 'paid' }): PromptAccessInfo => {
    const accessType = prompt.access_type;

    // Free prompts are always accessible
    if (accessType === 'free') {
      return {
        hasAccess: true,
        requiresAuth: false,
        requiresUpgrade: false,
        accessType: 'free',
      };
    }

    // Paid prompts require authentication and lifetime access
    if (accessType === 'paid') {
      // Not authenticated
      if (!user) {
        return {
          hasAccess: false,
          requiresAuth: true,
          requiresUpgrade: false,
          accessType: 'paid',
          reason: 'Please sign in to access premium prompts',
        };
      }

      // Authenticated but no lifetime access
      if (!hasLifetimeAccess) {
        return {
          hasAccess: false,
          requiresAuth: false,
          requiresUpgrade: true,
          accessType: 'paid',
          reason: 'Upgrade to lifetime access to unlock this premium prompt',
        };
      }

      // Authenticated with lifetime access
      return {
        hasAccess: true,
        requiresAuth: false,
        requiresUpgrade: false,
        accessType: 'paid',
      };
    }

    // Fallback (should not happen)
    return {
      hasAccess: false,
      requiresAuth: true,
      requiresUpgrade: false,
      accessType: 'free',
      reason: 'Unknown access type',
    };
  };

  const getAccessMessage = (accessInfo: PromptAccessInfo): string => {
    if (accessInfo.hasAccess) {
      return '';
    }

    if (accessInfo.requiresAuth) {
      return 'Sign in to access this premium prompt';
    }

    if (accessInfo.requiresUpgrade) {
      return 'Upgrade to lifetime access to unlock this prompt';
    }

    return accessInfo.reason || 'Access denied';
  };

  const getAccessAction = (accessInfo: PromptAccessInfo): { text: string; action: string } => {
    if (accessInfo.hasAccess) {
      return { text: '', action: '' };
    }

    if (accessInfo.requiresAuth) {
      return { text: 'Sign In', action: '/login' };
    }

    if (accessInfo.requiresUpgrade) {
      return { text: 'Upgrade Now', action: '/upgrade' };
    }

    return { text: 'Learn More', action: '/' };
  };

  return {
    checkPromptAccess,
    getAccessMessage,
    getAccessAction,
    hasLifetimeAccess,
    isAuthenticated: !!user,
  };
};
