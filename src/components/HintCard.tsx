import React from 'react';
import { Compass } from 'lucide-react';

interface HintCardProps {
  text: string;
}

export const HintCard: React.FC<HintCardProps> = ({ text }) => {
  return (
    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0c0d12]/90 border border-[#e5c158]/30 backdrop-blur-md shadow-lg my-4">
      <Compass className="w-3.5 h-3.5 text-[#e5c158] animate-spin-slow" />
      <span className="font-general text-xs font-medium tracking-wider text-[#f0f0f5]/80">
        {text}
      </span>
    </div>
  );
};
