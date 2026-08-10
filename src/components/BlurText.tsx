import React, { useEffect, useRef, useState } from 'react';

export interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  onAnimationComplete?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 140,
  animateBy = 'words',
  direction = 'top',
  onAnimationComplete,
  className = '',
  style = {},
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // Guarantee text is immediately visible on mobile devices (screen width < 768px)
  const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window);
  const [inView, setInView] = useState<boolean>(isMobile);

  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  useEffect(() => {
    if (isMobile) {
      setInView(true);
      if (onAnimationComplete) onAnimationComplete();
      return;
    }

    const fallbackTimer = setTimeout(() => {
      setInView(true);
    }, 150);

    const el = containerRef.current;
    if (!el) return () => clearTimeout(fallbackTimer);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            clearTimeout(fallbackTimer);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.01, rootMargin: '150px' }
    );

    observer.observe(el);
    return () => {
      clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, [isMobile, onAnimationComplete]);

  useEffect(() => {
    if (!isMobile && inView && onAnimationComplete) {
      const totalDuration = elements.length * delay + 400;
      const timer = setTimeout(() => {
        onAnimationComplete();
      }, totalDuration);
      return () => clearTimeout(timer);
    }
  }, [inView, elements.length, delay, onAnimationComplete, isMobile]);

  return (
    <div
      ref={containerRef}
      className={`inline-flex flex-wrap gap-x-2 gap-y-1 ${className}`}
      style={style}
    >
      {elements.map((item, idx) => {
        const itemDelay = isMobile ? 0 : idx * delay;
        const translateY = direction === 'top' ? '-10px' : '10px';

        return (
          <span
            key={idx}
            className="inline-block transition-all duration-300 ease-out"
            style={{
              opacity: inView || isMobile ? 1 : 0,
              filter: inView || isMobile ? 'none' : 'blur(8px)',
              transform: inView || isMobile ? 'translateY(0)' : `translateY(${translateY})`,
              transitionDelay: `${itemDelay}ms`,
            }}
          >
            {item === ' ' ? '\u00A0' : item}
          </span>
        );
      })}
    </div>
  );
};

export default BlurText;
