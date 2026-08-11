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

  const totalItems = 36;
  const defaultItems = Array.from({ length: totalItems }, (_, index) => `Item ${index + 1}`);
  const combinedItems = items.length > 0 ? items.slice(0, totalItems) : defaultItems;

  useEffect(() => {
    let mouseX = 0;
    let targetMouseX = 0;
    let baseOffset = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 160;
    };

    const updateMotion = () => {
      baseOffset += 0.4; // Continuous smooth ambient drift
      mouseX += (targetMouseX - mouseX) * 0.06; // Smooth lerp mouse follow

      rowRefs.current.forEach((row, index) => {
        if (row) {
          const direction = index % 2 === 0 ? 1 : -1;
          const totalX = (baseOffset + mouseX) * direction;
          gsap.set(row, { x: totalX % 450 });
        }
      });
    };

    gsap.ticker.add(updateMotion);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      gsap.ticker.remove(updateMotion);
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
