import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './SplitText.css';

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words' | 'lines';
  from?: Record<string, any>;
  to?: Record<string, any>;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  tag?: keyof React.JSX.IntrinsicElements;
  onLetterAnimationComplete?: () => void;
  showCallback?: boolean;
  style?: React.CSSProperties;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 30,
  duration = 0.8,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 24 },
  to = { opacity: 1, y: 0 },
  textAlign = 'left',
  tag = 'p',
  onLetterAnimationComplete,
  style = {},
}) => {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !text) return;

    const targets = containerRef.current.querySelectorAll('.split-char, .split-word');
    if (targets.length === 0) return;

    const anim = gsap.fromTo(
      targets,
      { ...from },
      {
        ...to,
        duration,
        ease,
        stagger: delay / 1000,
        onComplete: () => {
          if (onLetterAnimationComplete) onLetterAnimationComplete();
        },
      }
    );

    return () => {
      anim.kill();
    };
  }, [text, delay, duration, ease, from, to, onLetterAnimationComplete]);

  const words = text.split(' ');

  const renderContent = () => {
    if (splitType === 'words') {
      return words.map((word, wIdx) => (
        <span key={wIdx} className="split-word inline-block mr-[0.3em] will-change-transform">
          {word}
        </span>
      ));
    }

    // Default to 'chars'
    return words.map((word, wIdx) => (
      <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.3em]">
        {word.split('').map((char, cIdx) => (
          <span key={cIdx} className="split-char inline-block will-change-transform">
            {char}
          </span>
        ))}
      </span>
    ));
  };

  const Component = (tag as any) || 'p';

  return (
    <Component
      ref={containerRef}
      className={`split-parent ${className}`}
      style={{
        textAlign,
        display: 'inline-block',
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        ...style,
      }}
    >
      {renderContent()}
    </Component>
  );
};

export default SplitText;
