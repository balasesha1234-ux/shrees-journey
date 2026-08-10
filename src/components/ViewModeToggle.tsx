import React from 'react';
import { Smartphone, Monitor } from 'lucide-react';

interface ViewModeToggleProps {
  viewMode: 'auto' | 'mobile' | 'desktop';
  onChangeViewMode: (mode: 'auto' | 'mobile' | 'desktop') => void;
}

export const ViewModeToggle: React.FC<ViewModeToggleProps> = ({
  viewMode,
  onChangeViewMode,
}) => {
  return (
    <div className="fixed bottom-4 left-4 z-[9999] flex items-center gap-1.5 p-1.5 rounded-full bg-[#0c0d12]/95 border border-[#e5c158]/40 backdrop-blur-2xl shadow-[0_0_30px_rgba(0,0,0,0.9)] text-[10px] font-extrabold uppercase tracking-wider select-none">
      <button
        onClick={() => onChangeViewMode('desktop')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
          viewMode === 'desktop'
            ? 'bg-[#e5c158] text-[#0c0d12] font-black shadow-[0_0_15px_rgba(229,193,88,0.6)]'
            : 'text-[#f0f0f5]/70 hover:text-[#e5c158]'
        }`}
        title="Force PC Desktop Interface View"
      >
        <Monitor className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Desktop</span>
      </button>

      <button
        onClick={() => onChangeViewMode('mobile')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
          viewMode === 'mobile'
            ? 'bg-[#e5c158] text-[#0c0d12] font-black shadow-[0_0_15px_rgba(229,193,88,0.6)]'
            : 'text-[#f0f0f5]/70 hover:text-[#e5c158]'
        }`}
        title="Force Mobile Smartphone Interface View"
      >
        <Smartphone className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Mobile</span>
      </button>

      <button
        onClick={() => onChangeViewMode('auto')}
        className={`px-2.5 py-1.5 rounded-full transition-all ${
          viewMode === 'auto'
            ? 'bg-white/15 text-[#e5c158] font-black'
            : 'text-[#f0f0f5]/50 hover:text-white'
        }`}
        title="Auto Detect Screen Width"
      >
        Auto
      </button>
    </div>
  );
};

export default ViewModeToggle;
