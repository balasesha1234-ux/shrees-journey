import React, { useMemo } from 'react';
import { Sparkles, Heart, Globe, MessageSquare } from 'lucide-react';
import { type PetalData } from '../hooks/useSupabasePetals';

interface LivingGardenCounterProps {
  petals: PetalData[];
}

export const LivingGardenCounter: React.FC<LivingGardenCounterProps> = ({ petals }) => {
  const totalPetals = petals.length;

  const indianStates = new Set([
    'andhra pradesh','arunachal pradesh','assam','bihar','chhattisgarh','goa','gujarat','haryana','himachal pradesh','jharkhand','karnataka','kerala','madhya pradesh','maharashtra','manipur','meghalaya','mizoram','nagaland','odisha','punjab','rajasthan','sikkim','tamil nadu','telangana','tripura','uttar pradesh','uttarakhand','west bengal','delhi','puducherry','jammu and kashmir','ladakh']
  );
  const normalizeCountry = (c: string) => {
    const lower = c.trim().toLowerCase();
    if (indianStates.has(lower)) return 'india';
    return lower;
  };
  const uniqueCountriesCount = useMemo(() => {
    const set = new Set<string>();
    petals.forEach((p) => {
      if (p.country && p.country.trim() && p.country.trim().toLowerCase() !== 'global') {
        set.add(normalizeCountry(p.country));
      }
    });
    return set.size;
  }, [petals]);

  // Recent 6 public petals for secure live ticker stream
  const recentPetals = useMemo(() => {
    return petals.slice(0, 6);
  }, [petals]);

  return (
    <section
      id="living-garden-counter"
      className="relative w-full py-24 sm:py-32 px-6 bg-[#0B0B0F] text-[#f0f0f5] font-general select-none flex flex-col items-center justify-center text-center overflow-hidden border-t border-[#e5c158]/15"
    >
      {/* Soft Ambient Radial Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(229,193,88,0.1),transparent_70%)] pointer-events-none" />

      {/* Header Tag */}
      <div className="relative z-10 flex items-center gap-2 text-[#e5c158] bg-[#0c0d12]/90 px-4 py-1.5 rounded-full border border-[#e5c158]/30 backdrop-blur-md mb-8">
        <Sparkles className="w-3.5 h-3.5" />
        <span className="font-general text-[11px] font-bold uppercase tracking-[0.35em]">
          The Garden Is Growing
        </span>
      </div>

      {/* ELEGANT MINIMAL COUNTER STATS */}
      <div className="relative z-10 max-w-4xl w-full flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-24 my-6">
        
        {/* STAT 1: REAL PETAL COUNT */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-rose-300 fill-rose-300/80 animate-pulse" />
            <span className="font-general text-6xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#f0f0f5] via-[#f0f0f5] to-[#e5c158] tracking-tight transition-all duration-700">
              {totalPetals}
            </span>
          </div>
          <span className="font-serif italic text-lg sm:text-xl text-[#e5c158] tracking-wide">
            memories
          </span>
        </div>

        {/* ELEGANT DIVIDER LINE */}
        <div className="hidden sm:block w-px h-20 bg-gradient-to-b from-transparent via-[#e5c158]/30 to-transparent" />

        {/* STAT 2: UNIQUE COUNTRY COUNT */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-3">
            <Globe className="w-6 h-6 text-[#e5c158] opacity-80" />
            <span className="font-general text-6xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#f0f0f5] via-[#f0f0f5] to-[#e5c158] tracking-tight transition-all duration-700">
              {uniqueCountriesCount}
            </span>
          </div>
          <span className="font-serif italic text-lg sm:text-xl text-[#e5c158] tracking-wide">
            countries
          </span>
        </div>

      </div>

      {/* SECURE RECENT COMMUNITY MEMORIES STREAM TICKER */}
      {recentPetals.length > 0 && (
        <div className="relative z-10 max-w-3xl w-full mt-10 p-4 sm:p-6 rounded-3xl bg-[#0c0d12]/90 border border-[#e5c158]/25 backdrop-blur-xl shadow-xl flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-[#e5c158] text-xs font-bold uppercase tracking-[0.3em]">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Recent Community Notes</span>
          </div>

          <div className="w-full flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs">
            {recentPetals.map((item, idx) => (
              <div
                key={item.id || idx}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#f0f0f5]/90 shadow-sm"
              >
                <span className="font-semibold text-[#e5c158]">{item.author}</span>
                {item.country && (
                  <span className="text-[10px] text-[#f0f0f5]/50 bg-white/5 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {indianStates.has(item.country.trim().toLowerCase()) ? 'India' : item.country}
                  </span>
                )}
                <span className="text-[#f0f0f5]/70 italic truncate max-w-[180px] sm:max-w-[240px]">
                  “{item.text}”
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Small Supporting Text */}
      <p className="relative z-10 font-general italic text-sm sm:text-base text-[#f0f0f5]/70 max-w-md leading-relaxed mt-8 drop-shadow">
        “Every message becomes a part of this journey.”
      </p>
    </section>
  );
};

export default LivingGardenCounter;
