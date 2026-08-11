import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './GridMotion.css';

export interface GridMotionProps {
  items?: (string | React.ReactNode)[];
  gradientColor?: string;
}

export const GridMotion: React.FC<GridMotionProps> = ({
  items = [],
  gradientColor = '#050507',
}) => {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  const totalItems = 28;
  const defaultItems = Array.from({ length: totalItems }, (_, index) => `Item ${index + 1}`);
  const combinedItems = items.length > 0 ? items.slice(0, totalItems) : defaultItems;

  useEffect(() => {
    let ticking = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const maxMoveAmount = 180;
          const mouseRatio = e.clientX / window.innerWidth;

          rowRefs.current.forEach((row, index) => {
            if (row) {
              const direction = index % 2 === 0 ? 1 : -1;
              const moveAmount = (mouseRatio * maxMoveAmount - maxMoveAmount / 2) * direction;

              gsap.to(row, {
                x: moveAmount,
                duration: 1.2,
                ease: 'power2.out',
                overwrite: 'auto',
              });
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="noscroll loading" ref={gridRef}>
      <section
        className="intro"
        style={{
          background: `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)`,
        }}
      >
        <div className="gridMotion-container">
          {[...Array(4)].map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="row"
              ref={(el) => {
                rowRefs.current[rowIndex] = el;
              }}
            >
              {[...Array(9)].map((_, itemIndex) => {
                const itemIdx = (rowIndex * 9 + itemIndex) % combinedItems.length;
                const content = combinedItems[itemIdx];
                const isImage =
                  typeof content === 'string' && (content.startsWith('http') || content.startsWith('/'));

                return (
                  <div key={itemIndex} className="row__item">
                    <div className="row__item-inner" style={{ backgroundColor: '#0c0d12' }}>
                      {isImage ? (
                        <div
                          className="row__item-img"
                          style={{
                            backgroundImage: `url(${content})`,
                          }}
                        />
                      ) : (
                        <div className="row__item-content">{content}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
