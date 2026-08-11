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
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.05, rootMargin: '100px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (inView && onAnimationComplete) {
      const totalDuration = elements.length * (isMobile ? 30 : delay) + 400;
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
        const itemDelay = isMobile ? idx * 35 : idx * delay;
        const translateY = direction === 'top' ? '-12px' : '12px';

        return (
          <span
            key={idx}
            className="inline-block transition-all duration-500 ease-out will-change-transform"
            style={{
              opacity: inView ? 1 : 0,
              filter: inView ? 'none' : isMobile ? 'none' : 'blur(8px)',
              transform: inView ? 'translate3d(0,0,0)' : `translate3d(0,${translateY},0)`,
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
