import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholder?: string;
  blurDataURL?: string;
  quality?: number;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  className?: string;
  containerClassName?: string;
  sizes?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape' | number;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  placeholder,
  blurDataURL,
  quality = 75,
  priority = false,
  onLoad,
  onError,
  className,
  containerClassName,
  sizes,
  aspectRatio,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const getOptimizedSrc = (originalSrc: string, width?: number) => {
    // In a real implementation, you would use a service like Cloudinary, ImageKit, or Next.js Image Optimization
    // For now, we'll return the original src with quality parameter if supported
    try {
      const url = new URL(originalSrc, window.location.origin);
      if (quality < 100) {
        url.searchParams.set('q', quality.toString());
      }
      if (width) {
        url.searchParams.set('w', width.toString());
      }
      return url.toString();
    } catch {
      return originalSrc;
    }
  };

  const getAspectRatioClass = () => {
    if (!aspectRatio) return '';
    
    if (typeof aspectRatio === 'number') {
      return '';
    }
    
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square';
      case 'video':
        return 'aspect-video';
      case 'portrait':
        return 'aspect-[3/4]';
      case 'landscape':
        return 'aspect-[4/3]';
      default:
        return '';
    }
  };

  const getResponsiveSizes = () => {
    if (sizes) return sizes;
    
    // Default responsive sizes for mobile-first approach
    return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden bg-gray-800/20',
        getAspectRatioClass(),
        containerClassName
      )}
      style={
        typeof aspectRatio === 'number'
          ? { aspectRatio: aspectRatio.toString() }
          : undefined
      }
    >
      {/* Placeholder/Blur */}
      {(!isLoaded || hasError) && (
        <div className="absolute inset-0 flex items-center justify-center">
          {blurDataURL ? (
            <img
              src={blurDataURL}
              alt=""
              className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110"
              aria-hidden="true"
            />
          ) : placeholder ? (
            <img
              src={placeholder}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-50"
              aria-hidden="true"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 animate-pulse" />
          )}
          
          {/* Loading indicator */}
          {!hasError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          
          {/* Error state */}
          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50">
              <div className="text-center text-gray-400">
                <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-gray-700 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-xs">Failed to load</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Image */}
      {isInView && !hasError && (
        <img
          ref={imgRef}
          src={getOptimizedSrc(src)}
          alt={alt}
          sizes={getResponsiveSizes()}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'absolute inset-0 w-full h-full object-cover transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          {...props}
        />
      )}
    </div>
  );
};

// Progressive image component with multiple sources
export const ProgressiveImage: React.FC<{
  src: string;
  lowQualitySrc?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: LazyImageProps['aspectRatio'];
}> = ({ src, lowQualitySrc, alt, className, containerClassName, aspectRatio }) => {
  const [currentSrc, setCurrentSrc] = useState(lowQualitySrc || src);
  const [isHighQualityLoaded, setIsHighQualityLoaded] = useState(false);

  useEffect(() => {
    if (lowQualitySrc && src !== lowQualitySrc) {
      // Preload high quality image
      const img = new Image();
      img.onload = () => {
        setCurrentSrc(src);
        setIsHighQualityLoaded(true);
      };
      img.src = src;
    }
  }, [src, lowQualitySrc]);

  return (
    <LazyImage
      src={currentSrc}
      alt={alt}
      className={cn(
        'transition-all duration-500',
        !isHighQualityLoaded && lowQualitySrc && 'filter blur-sm',
        className
      )}
      containerClassName={containerClassName}
      aspectRatio={aspectRatio}
    />
  );
};

// Image gallery component with lazy loading
export const LazyImageGallery: React.FC<{
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
  columns?: number;
  gap?: number;
  className?: string;
}> = ({ images, columns = 3, gap = 4, className }) => {
  return (
    <div
      className={cn(
        'grid gap-4',
        columns === 1 && 'grid-cols-1',
        columns === 2 && 'grid-cols-1 sm:grid-cols-2',
        columns === 3 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        columns === 4 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
        className
      )}
      style={{ gap: `${gap * 0.25}rem` }}
    >
      {images.map((image, index) => (
        <div key={index} className="group">
          <LazyImage
            src={image.src}
            alt={image.alt}
            aspectRatio="square"
            className="group-hover:scale-105 transition-transform duration-300"
            containerClassName="rounded-lg overflow-hidden"
          />
          {image.caption && (
            <p className="mt-2 text-sm text-gray-400 text-center">
              {image.caption}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default LazyImage;
