import React, { useEffect, useRef, useState } from 'react';

export interface GradualBlurProps {
  target?: 'parent' | 'self';
  position?: 'top' | 'bottom' | 'both' | 'item';
  height?: string;
  strength?: number;
  divCount?: number;
  curve?: 'bezier' | 'linear';
  exponential?: boolean;
  opacity?: number;
  className?: string;
  children?: React.ReactNode;
}

export const GradualBlur: React.FC<GradualBlurProps> = ({
  position = 'item',
  height = '5rem',
  strength = 1.2,
  divCount = 6,
  curve = 'bezier',
  exponential = true,
  opacity = 0.7,
  className = '',
  children,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 768) {
        setDeviceType('mobile');
      } else if (w < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Respect prefers-reduced-motion OS preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIsRevealed(true);
      return () => window.removeEventListener('resize', handleResize);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: deviceType === 'mobile' ? 0.1 : 0.18,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    observer.observe(el);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [deviceType]);

  // Responsive settings based on device viewport
  const activeHeight = deviceType === 'mobile' ? '3.5rem' : deviceType === 'tablet' ? '4.5rem' : height;
  const activeStrength = deviceType === 'mobile' ? 0.8 : deviceType === 'tablet' ? 1.0 : strength;
  const activeDivCount = deviceType === 'mobile' ? 4 : deviceType === 'tablet' ? 5 : divCount;
  const activeOpacity = deviceType === 'mobile' ? 0.6 : deviceType === 'tablet' ? 0.65 : opacity;

  // Unrevealed state styles per device
  const unrevealedStyles =
    deviceType === 'mobile'
      ? 'opacity-80 blur-[3px] translate-y-3'
      : deviceType === 'tablet'
      ? 'opacity-75 blur-[4px] translate-y-4'
      : 'opacity-70 blur-[5px] translate-y-6';

  const layers = Array.from({ length: Math.min(activeDivCount, 6) }, (_, i) => {
    const progress = (i + 1) / activeDivCount;
    const factor = exponential ? Math.pow(progress, 1.8) : progress;
    const blurPx = (factor * activeStrength * 4.5).toFixed(1);
    const layerOpacity = (activeOpacity * (1 - progress * 0.15)).toFixed(2);
    return { blurPx, layerOpacity, step: i };
  });

  return (
    <div
      ref={containerRef}
      className={`relative transition-all duration-900 ease-out will-change-[filter,opacity,transform] ${
        isRevealed ? 'opacity-100 filter-none translate-y-0' : unrevealedStyles
      } ${className}`}
      style={{
        transitionProperty: 'filter, opacity, transform',
        transitionDuration: deviceType === 'mobile' ? '600ms' : '900ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Children Content */}
      {children}

      {/* GRADUAL BLUR OVERLAY MASK LAYERS (Active before/during entrance reveal if position is specified) */}
      {!isRevealed && position !== 'item' && (
        <div
          className="absolute inset-x-0 pointer-events-none z-20 overflow-hidden transition-opacity duration-900"
          style={{
            height: activeHeight,
            top: position === 'top' || position === 'both' ? 0 : 'auto',
            bottom: position === 'bottom' || position === 'both' ? 0 : 'auto',
          }}
        >
          {layers.map(({ blurPx, layerOpacity, step }) => (
            <div
              key={step}
              className="absolute inset-0"
              style={{
                backdropFilter: `blur(${blurPx}px)`,
                WebkitBackdropFilter: `blur(${blurPx}px)`,
                opacity: layerOpacity,
                maskImage:
                  curve === 'bezier'
                    ? `linear-gradient(to ${position === 'top' ? 'top' : 'bottom'}, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)`
                    : `linear-gradient(to ${position === 'top' ? 'top' : 'bottom'}, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 90%)`,
                WebkitMaskImage:
                  curve === 'bezier'
                    ? `linear-gradient(to ${position === 'top' ? 'top' : 'bottom'}, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)`
                    : `linear-gradient(to ${position === 'top' ? 'top' : 'bottom'}, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 90%)`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GradualBlur;
