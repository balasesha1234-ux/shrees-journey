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
  const [inView, setInView] = useState(false);

  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  useEffect(() => {
    // Bulletproof fallback: Guarantee text is visible on all devices after max 350ms
    const fallbackTimer = setTimeout(() => {
      setInView(true);
    }, 350);

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
      { threshold: 0.01, rootMargin: '120px' }
    );

    observer.observe(el);
    return () => {
      clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (inView && onAnimationComplete) {
      const totalDuration = elements.length * delay + 500;
      const timer = setTimeout(() => {
        onAnimationComplete();
      }, totalDuration);
      return () => clearTimeout(timer);
    }
  }, [inView, elements.length, delay, onAnimationComplete]);

  return (
    <div
      ref={containerRef}
      className={`inline-flex flex-wrap gap-x-2 gap-y-1 ${className}`}
      style={style}
    >
      {elements.map((item, idx) => {
        const itemDelay = idx * delay;
        const translateY = direction === 'top' ? '-12px' : '12px';

        return (
          <span
            key={idx}
            className="inline-block transition-all duration-500 ease-out"
            style={{
              opacity: inView ? 1 : 0,
              filter: inView ? 'blur(0px)' : 'blur(8px)',
              transform: inView ? 'translateY(0)' : `translateY(${translateY})`,
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
