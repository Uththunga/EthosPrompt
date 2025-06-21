import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initWebVitals } from './utils/webVitals';
import { registerSW } from './utils/serviceWorker';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)

// Initialize Web Vitals monitoring
initWebVitals();

// Register Service Worker for offline caching and performance
if (import.meta.env.PROD) {
  registerSW({
    onSuccess: (registration) => {
      console.log('Service Worker registered successfully:', registration);
    },
    onUpdate: (registration) => {
      console.log('Service Worker update available:', registration);
      // In a real app, you might show a notification to the user
    },
    onOfflineReady: () => {
      console.log('App is ready to work offline');
    },
    onError: (error) => {
      console.error('Service Worker registration failed:', error);
    }
  });
}
