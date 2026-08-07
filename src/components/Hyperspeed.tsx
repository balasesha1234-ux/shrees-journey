import React, { useEffect, useRef } from 'react';

export interface HyperspeedOptions {
  onSpeedUp?: () => void;
  onSlowDown?: () => void;
  distortion?: string;
  length?: number;
  roadWidth?: number;
  islandWidth?: number;
  lanesPerRoad?: number;
  fov?: number;
  fovSpeedUp?: number;
  speedUp?: number;
  carLightsFade?: number;
  totalSideLightSticks?: number;
  lightPairsPerRoadWay?: number;
  shoulderLinesWidthPerRoad?: number;
  brokenLinesWidthPerRoad?: number;
  brokenLinesLengthPerRoad?: number;
  lightStickWidth?: number[];
  lightStickHeight?: number[];
  movingAwaySpeed?: number[];
  movingCloserSpeed?: number[];
  carLightsLength?: number[];
  carLightsRadius?: number[];
  carWidth?: number[];
  carHeight?: number[];
  carSpace?: number[];
  colors?: {
    roadColor?: number;
    islandColor?: number;
    background?: number;
    shoulderLines?: number;
    brokenLines?: number;
    leftCars?: number[];
    rightCars?: number[];
    sticks?: number;
  };
}

export const hyperspeedPresets = {
  one: {
    distortion: 'turbulentDistortion',
    length: 400,
    roadWidth: 9,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 50,
    lightPairsPerRoadWay: 50,
    shoulderLinesWidthPerRoad: 0.05,
    brokenLinesWidthPerRoad: 0.05,
    brokenLinesLengthPerRoad: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [400 * 0.05, 400 * 0.15],
    carLightsRadius: [0.05, 0.14],
    carWidth: [1, 2],
    carHeight: [0.3, 0.6],
    carSpace: [3, 5],
    colors: {
      roadColor: 0x08080c,
      islandColor: 0x0a0a10,
      background: 0x050507,
      shoulderLines: 0xffffff,
      brokenLines: 0xffffff,
      leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
      rightCars: [0xe5c158, 0xecb435, 0xf6d678],
      sticks: 0xe5c158,
    },
  },
};

interface HyperspeedProps {
  effectOptions?: HyperspeedOptions;
  className?: string;
  style?: React.CSSProperties;
}

export const Hyperspeed: React.FC<HyperspeedProps> = ({
  effectOptions = hyperspeedPresets.one,
  className = '',
  style = {},
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let h = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      w = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      h = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Light Streaks Starfield Tunnel Particles
    const streaks = Array.from({ length: 140 }, () => ({
      x: (Math.random() - 0.5) * w * 1.5,
      y: (Math.random() - 0.5) * h * 1.5,
      z: Math.random() * 1000 + 1,
      length: Math.random() * 90 + 50,
      color: Math.random() > 0.4 ? '#e5c158' : Math.random() > 0.5 ? '#72a5cf' : '#ffffff',
      speed: Math.random() * 25 + 15,
    }));

    let time = 0;

    const render = () => {
      time += 0.03;
      ctx.fillStyle = '#050507';
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // Draw Warp Speed Light Streaks
      streaks.forEach((st) => {
        st.z -= st.speed;
        if (st.z <= 1) {
          st.z = 1000;
          st.x = (Math.random() - 0.5) * w * 1.5;
          st.y = (Math.random() - 0.5) * h * 1.5;
        }

        const k = 400 / st.z;
        const px = st.x * k + cx;
        const py = st.y * k + cy;

        const kPrev = 400 / (st.z + st.length);
        const pxPrev = st.x * kPrev + cx;
        const pyPrev = st.y * kPrev + cy;

        if (px >= 0 && px <= w && py >= 0 && py <= h) {
          ctx.strokeStyle = st.color;
          ctx.lineWidth = Math.max(1, (1000 - st.z) * 0.004);
          ctx.beginPath();
          ctx.moveTo(pxPrev, pyPrev);
          ctx.lineTo(px, py);
          ctx.stroke();
        }
      });

      // Warp Tunnel Central Light Core Glow
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) * 0.4);
      coreGrad.addColorStop(0, 'rgba(229, 193, 88, 0.25)');
      coreGrad.addColorStop(0.5, 'rgba(114, 165, 207, 0.1)');
      coreGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = coreGrad;
      ctx.fillRect(0, 0, w, h);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [effectOptions]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`} style={style}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />
    </div>
  );
};

export default Hyperspeed;
