import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useCameraDolly(containerRef: React.RefObject<HTMLDivElement | null>) {
  const cameraRef = useRef<{ zoom: number; depth: number; rotate: number }>({
    zoom: 1,
    depth: 0,
    rotate: 0,
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Create continuous cinematic camera parallax timeline
      gsap.to(cameraRef.current, {
        zoom: 1.15,
        depth: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
            onUpdate: (self) => {
              if (containerRef.current) {
                const scale = 1 + self.progress * 0.12;
                const vel = typeof self.getVelocity === 'function' ? self.getVelocity() : 0;
                const blur = Math.min(4, Math.abs(vel) * 0.0005);
                containerRef.current.style.transform = `scale(${scale})`;
                containerRef.current.style.filter = `blur(${blur}px)`;
              }
            },
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);

  return cameraRef;
}
