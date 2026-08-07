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
  delay = 170,
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
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (inView && onAnimationComplete) {
      const totalDuration = elements.length * delay + 600;
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
        const translateY = direction === 'top' ? '-18px' : '18px';

        return (
          <span
            key={idx}
            className="inline-block transition-all duration-700 ease-out"
            style={{
              opacity: inView ? 1 : 0,
              filter: inView ? 'blur(0px)' : 'blur(10px)',
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
