import React, { useState } from 'react';
import { Image as ImageIcon, Heart } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  fallbackSubtitle?: string;
  aspectClass?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle,
  fallbackSubtitle,
  aspectClass = 'aspect-4/3',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`w-full ${aspectClass} bg-gradient-to-br from-cream-100 via-yellow-soft/30 to-yellow-primary/20 border border-yellow-primary/30 rounded-lg flex flex-col items-center justify-center p-4 text-center select-none relative overflow-hidden group`}
      >
        <div className="absolute inset-0 bg-radial-gradient from-yellow-soft/20 to-transparent pointer-events-none" />
        <div className="w-12 h-12 rounded-full bg-yellow-primary/20 border border-yellow-primary/40 flex items-center justify-center mb-2.5 text-charcoal/80 group-hover:scale-110 transition-transform">
          <Heart className="w-5 h-5 text-yellow-deep fill-yellow-primary/40 animate-pulse" />
        </div>
        <p className="text-xs sm:text-sm font-semibold text-charcoal/90 tracking-wide font-sans">
          {fallbackTitle || alt || "Our Memory"}
        </p>
        <p className="text-[11px] text-charcoal/60 mt-1 font-mono">
          {fallbackSubtitle || "💛 photo placeholder"}
        </p>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-cream-200/60 animate-pulse flex items-center justify-center">
          <ImageIcon className="w-6 h-6 text-yellow-deep/40 animate-bounce" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-all duration-700 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        {...props}
      />
    </div>
  );
};
