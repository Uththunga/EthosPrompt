/// <reference types="vite/client" />

interface ImportMetaEnv {
  // App
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_DESCRIPTION: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_APP_BASE_URL: string;
  
  // API
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_TIMEOUT: string;
  
  // Features
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_ENABLE_MAINTENANCE: string;
  
  // Third-party services
  readonly VITE_GOOGLE_ANALYTICS_ID?: string;
  readonly VITE_SENTRY_DSN?: string;
  readonly VITE_STRIPE_PUBLIC_KEY?: string;
  
  // Development
  readonly VITE_DEBUG: string;
  readonly VITE_VERBOSE_LOGGING: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
