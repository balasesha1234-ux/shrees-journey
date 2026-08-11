import React, { useMemo } from 'react';
import { Sparkles, Heart, Globe } from 'lucide-react';
import { type PetalData } from '../hooks/useSupabasePetals';

interface LivingGardenCounterProps {
  petals: PetalData[];
}

const COUNTRY_ALIAS_MAP: Record<string, string> = {
  // USA & States/Cities
  'usa': 'united states',
  'us': 'united states',
  'united states': 'united states',
  'united states of america': 'united states',
  'america': 'united states',
  'california': 'united states',
  'texas': 'united states',
  'new york': 'united states',
  'florida': 'united states',
  'washington': 'united states',
  'illinois': 'united states',
  
  // UK & Regions
  'uk': 'united kingdom',
  'united kingdom': 'united kingdom',
  'england': 'united kingdom',
  'scotland': 'united kingdom',
  'wales': 'united kingdom',
  'london': 'united kingdom',

  // India & States & Major Cities
  'india': 'india',
  'bharat': 'india',
  'in': 'india',
  'mumbai': 'india',
  'delhi': 'india',
  'bengaluru': 'india',
  'bangalore': 'india',
  'hyderabad': 'india',
  'chennai': 'india',
  'kolkata': 'india',
  'pune': 'india',
  'ahmedabad': 'india',
  'maharashtra': 'india',
  'karnataka': 'india',
  'tamil nadu': 'india',
  'telangana': 'india',
  'kerala': 'india',
  'gujarat': 'india',
  'punjab': 'india',
  'rajasthan': 'india',
  'uttar pradesh': 'india',
  'west bengal': 'india',
  'goa': 'india',
  'haryana': 'india',

  // UAE
  'uae': 'united arab emirates',
  'united arab emirates': 'united arab emirates',
  'dubai': 'united arab emirates',
  'abu dhabi': 'united arab emirates',

  // Canada
  'canada': 'canada',
  'ca': 'canada',
  'toronto': 'canada',
  'vancouver': 'canada',
  'ontario': 'canada',

  // Australia
  'australia': 'australia',
  'au': 'australia',
  'sydney': 'australia',
  'melbourne': 'australia',

  // Germany & Europe
  'germany': 'germany',
  'de': 'germany',
  'berlin': 'germany',
  'munich': 'germany',
  'japan': 'japan',
  'jp': 'japan',
  'tokyo': 'japan',
  'france': 'france',
  'paris': 'france',
  'singapore': 'singapore',
  'sg': 'singapore',
};

export const parseCanonicalCountry = (raw: string): string => {
  if (!raw || !raw.trim()) return '';
  const cleaned = raw.trim().toLowerCase();
  
  if (cleaned === 'global' || cleaned === 'global family' || cleaned === 'earth') {
    return '';
  }

  // If input is "City, State, Country" or "State, Country", extract the last segment
  const parts = cleaned.split(/[,/-]+/);
  const candidate = parts[parts.length - 1].trim();

  if (COUNTRY_ALIAS_MAP[candidate]) {
    return COUNTRY_ALIAS_MAP[candidate];
  }
  if (COUNTRY_ALIAS_MAP[cleaned]) {
    return COUNTRY_ALIAS_MAP[cleaned];
  }

  return candidate;
};

export const LivingGardenCounter: React.FC<LivingGardenCounterProps> = ({ petals }) => {
  const totalPetals = petals.length;

  const uniqueCountriesCount = useMemo(() => {
    const set = new Set<string>();
    petals.forEach((p) => {
      if (p.country) {
        const canonical = parseCanonicalCountry(p.country);
        if (canonical) set.add(canonical);
      }
    });
    return set.size;
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

      {/* Small Supporting Text */}
      <p className="relative z-10 font-general italic text-sm sm:text-base text-[#f0f0f5]/70 max-w-md leading-relaxed mt-8 drop-shadow">
        “Every message becomes a part of this journey.”
      </p>
    </section>
  );
};

export default LivingGardenCounter;
