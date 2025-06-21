import React, { useState, useEffect } from 'react';
import { WifiOff, Download, Check, AlertCircle, RefreshCw, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';

interface OfflineReadingProps {
  articleId?: string;
  content?: string;
  title?: string;
  className?: string;
}

interface OfflineArticle {
  id: string;
  title: string;
  content: string;
  downloadedAt: number;
  size: number;
}

const OfflineReading: React.FC<OfflineReadingProps> = ({
  articleId,
  content,
  title,
  className,
}) => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [offlineArticles, setOfflineArticles] = useState<OfflineArticle[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  useEffect(() => {
    // Listen for online/offline events
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load offline articles from storage
    loadOfflineArticles();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadOfflineArticles = async () => {
    try {
      const stored = localStorage.getItem('offline-articles');
      if (stored) {
        setOfflineArticles(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading offline articles:', error);
    }
  };

  const saveOfflineArticle = async (article: OfflineArticle) => {
    try {
      const updated = [...offlineArticles.filter(a => a.id !== article.id), article];
      setOfflineArticles(updated);
      localStorage.setItem('offline-articles', JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving offline article:', error);
    }
  };

  const removeOfflineArticle = async (id: string) => {
    try {
      const updated = offlineArticles.filter(a => a.id !== id);
      setOfflineArticles(updated);
      localStorage.setItem('offline-articles', JSON.stringify(updated));
    } catch (error) {
      console.error('Error removing offline article:', error);
    }
  };

  const downloadForOffline = async () => {
    if (!articleId || !content || !title) return;

    setIsDownloading(true);
    setDownloadProgress(0);

    try {
      // Simulate download progress
      const progressInterval = setInterval(() => {
        setDownloadProgress(prev => {
          const newProgress = prev + 10;
          if (newProgress >= 100) {
            clearInterval(progressInterval);
          }
          return Math.min(newProgress, 100);
        });
      }, 100);

      // Calculate content size (rough estimate)
      const size = new Blob([content]).size;

      const article: OfflineArticle = {
        id: articleId,
        title,
        content,
        downloadedAt: Date.now(),
        size,
      };

      await saveOfflineArticle(article);

      // Add haptic feedback
      if ('vibrate' in navigator) {
        navigator.vibrate([50, 50, 50]);
      }
    } catch (error) {
      console.error('Error downloading article:', error);
    } finally {
      setIsDownloading(false);
      setDownloadProgress(0);
    }
  };

  const isArticleOffline = articleId ? offlineArticles.some(a => a.id === articleId) : false;

  const getTotalOfflineSize = () => {
    const totalBytes = offlineArticles.reduce((sum, article) => sum + article.size, 0);
    return formatBytes(totalBytes);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  if (isOffline) {
    return (
      <div className={cn('p-4 bg-orange-900/20 border border-orange-500/30 rounded-lg', className)}>
        <div className="flex items-center gap-3 mb-3">
          <WifiOff className="w-5 h-5 text-orange-400" />
          <div>
            <h3 className="text-orange-300 font-medium">You're offline</h3>
            <p className="text-orange-400/80 text-sm">
              {offlineArticles.length > 0 
                ? `${offlineArticles.length} articles available offline`
                : 'No offline content available'
              }
            </p>
          </div>
        </div>

        {offlineArticles.length > 0 && (
          <div className="space-y-2">
            {offlineArticles.slice(0, 3).map((article) => (
              <div
                key={article.id}
                className="p-3 bg-gray-800/50 rounded-lg border border-gray-700/50"
              >
                <h4 className="text-white font-medium text-sm mb-1">{article.title}</h4>
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>Downloaded {formatDate(article.downloadedAt)}</span>
                  <span>{formatBytes(article.size)}</span>
                </div>
              </div>
            ))}
            {offlineArticles.length > 3 && (
              <p className="text-xs text-gray-400 text-center">
                +{offlineArticles.length - 3} more articles
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Download for Offline */}
      {articleId && content && (
        <div className="p-4 bg-gray-800/40 border border-gray-700/50 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                {isArticleOffline ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Download className="w-4 h-4 text-blue-400" />
                )}
              </div>
              <div>
                <h3 className="text-white font-medium text-sm">
                  {isArticleOffline ? 'Available Offline' : 'Download for Offline'}
                </h3>
                <p className="text-gray-400 text-xs">
                  {isArticleOffline 
                    ? 'This article is saved for offline reading'
                    : 'Save this article to read without internet'
                  }
                </p>
              </div>
            </div>

            {!isArticleOffline && (
              <Button
                variant="outline"
                size="sm"
                onClick={downloadForOffline}
                disabled={isDownloading}
                className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
              >
                {isDownloading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
              </Button>
            )}

            {isArticleOffline && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => articleId && removeOfflineArticle(articleId)}
                className="text-gray-400 hover:text-red-400"
              >
                Remove
              </Button>
            )}
          </div>

          {/* Download Progress */}
          {isDownloading && (
            <div className="space-y-2">
              <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-100"
                  style={{ width: `${downloadProgress}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 text-center">
                Downloading... {downloadProgress}%
              </p>
            </div>
          )}
        </div>
      )}

      {/* Offline Library */}
      {offlineArticles.length > 0 && (
        <div className="p-4 bg-gray-800/40 border border-gray-700/50 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-medium">Offline Library</h3>
            <span className="text-xs text-gray-400">{getTotalOfflineSize()}</span>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {offlineArticles.map((article) => (
              <div
                key={article.id}
                className="flex items-center justify-between p-2 bg-gray-700/30 rounded-lg"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="text-white text-sm font-medium truncate">
                    {article.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>{formatDate(article.downloadedAt)}</span>
                    <span>•</span>
                    <span>{formatBytes(article.size)}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeOfflineArticle(article.id)}
                  className="text-gray-400 hover:text-red-400 p-1"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>

          {offlineArticles.length > 5 && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-2 text-gray-400 hover:text-white"
            >
              Clear All Offline Content
            </Button>
          )}
        </div>
      )}

      {/* Storage Info */}
      <div className="p-3 bg-gray-800/20 border border-gray-700/30 rounded-lg">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <AlertCircle className="w-3 h-3" />
          <span>
            Offline content is stored locally and will be available without internet connection.
          </span>
        </div>
      </div>
    </div>
  );
};

// Hook for offline state management
export const useOfflineReading = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [offlineArticles, setOfflineArticles] = useState<OfflineArticle[]>([]);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load offline articles
    const loadArticles = async () => {
      try {
        const stored = localStorage.getItem('offline-articles');
        if (stored) {
          setOfflineArticles(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Error loading offline articles:', error);
      }
    };

    loadArticles();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return {
    isOffline,
    offlineArticles,
    hasOfflineContent: offlineArticles.length > 0,
  };
};

export default OfflineReading;
