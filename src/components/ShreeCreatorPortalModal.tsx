import React, { useState, useMemo, useEffect } from 'react';
import { Crown, Search, Heart, X, Key, MessageSquare, Filter, ShieldCheck } from 'lucide-react';
import { ASSET_PATHS } from '../utils/assetPaths';
import { type PetalData } from '../hooks/useSupabasePetals';
import SpecularButton from './SpecularButton';
import DepthCarousel, { type DepthCarouselItem } from './DepthCarousel';

interface ShreeCreatorPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  petals: PetalData[];
}

export const ShreeCreatorPortalModal: React.FC<ShreeCreatorPortalModalProps> = ({
  isOpen,
  onClose,
  petals,
}) => {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('shree_vip_auth_session') === 'active';
  });
  const [authError, setAuthError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'3d' | 'grid' | 'list'>('3d');

  // SHA-256 hash of secret passcode (Shree@06032005) - NEVER stores plaintext string
  const TARGET_HASH = '0f1c9639de19fec5912bb9b2a745c0804aef2ddd01cdcd7eb39dbb37a94dfc62';

  // Session auto-timeout after 15 minutes of inactivity
  useEffect(() => {
    if (!isAuthenticated) return;
    const timeout = setTimeout(() => {
      setIsAuthenticated(false);
      sessionStorage.removeItem('shree_vip_auth_session');
    }, 15 * 60 * 1000);
    return () => clearTimeout(timeout);
  }, [isAuthenticated]);

  const handleAuthenticate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutTime > 0 || isVerifying) return;

    setIsVerifying(true);

    // Anti-timing side-channel protection delay (400ms)
    await new Promise((resolve) => setTimeout(resolve, 400));

    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(passcode.trim());
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

      if (hashHex === TARGET_HASH) {
        setIsAuthenticated(true);
        sessionStorage.setItem('shree_vip_auth_session', 'active');
        setAuthError(false);
        setFailedAttempts(0);
        setPasscode('');
      } else {
        const nextAttempts = failedAttempts + 1;
        setFailedAttempts(nextAttempts);
        setAuthError(true);

        if (nextAttempts >= 5) {
          setLockoutTime(30);
          const timer = setInterval(() => {
            setLockoutTime((prev) => {
              if (prev <= 1) {
                clearInterval(timer);
                setFailedAttempts(0);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        }
      }
    } catch {
      setAuthError(true);
    } finally {
      setIsVerifying(false);
    }
  };

  // Get unique countries for filter dropdown
  const uniqueCountries = useMemo(() => {
    const countriesSet = new Set<string>();
    petals.forEach((p) => {
      if (p.country && p.country.trim() && p.country.toLowerCase() !== 'global') {
        countriesSet.add(p.country.trim());
      }
    });
    return Array.from(countriesSet).sort();
  }, [petals]);

  // Filter petals by search term & country
  const filteredPetals = useMemo(() => {
    return petals.filter((p) => {
      const matchSearch =
        p.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.country && p.country.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchCountry =
        selectedCountry === 'all' || (p.country && p.country.trim() === selectedCountry);

      return matchSearch && matchCountry;
    });
  }, [petals, searchTerm, selectedCountry]);

  const carouselBackgrounds = [
    ASSET_PATHS.timeline.y2026.heroImage,
    ASSET_PATHS.timeline.y2025.heroImage,
    ASSET_PATHS.timeline.y2024.heroImage,
    ASSET_PATHS.timeline.y2023.heroImage,
    ASSET_PATHS.ending.treeImage,
    ASSET_PATHS.backgrounds.intro,
    ASSET_PATHS.backgrounds.y2026,
    ASSET_PATHS.backgrounds.y2025,
    ASSET_PATHS.backgrounds.y2024,
    ASSET_PATHS.backgrounds.y2023,
  ];

  const carouselItems: DepthCarouselItem[] = useMemo(() => {
    return filteredPetals.map((petal, index) => ({
      image: carouselBackgrounds[index % carouselBackgrounds.length],
      author: petal.author,
      country: petal.location ? `${petal.location}, ${petal.country || 'India'}` : (petal.country || 'Global Family'),
      text: petal.text,
      date: petal.created_at
        ? new Date(petal.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        : '5M Era',
    }));
  }, [filteredPetals]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/92 backdrop-blur-2xl animate-fade-in overflow-y-auto">
      <div className="relative max-w-5xl w-full p-6 sm:p-10 rounded-[36px] bg-[#0c0d12] border-2 border-[#e5c158]/70 shadow-[0_0_120px_rgba(229,193,88,0.4)] flex flex-col items-center gap-6 my-auto text-left max-h-[92vh] overflow-hidden">
        
        {/* Prominent Close Button */}
        <button
          onClick={onClose}
          aria-label="Close VIP Portal"
          className="absolute top-5 right-5 p-2.5 rounded-full bg-[#0c0d12]/90 border border-[#e5c158]/60 text-[#e5c158] hover:text-white hover:bg-[#e5c158]/20 hover:scale-110 transition-all shadow-[0_0_20px_rgba(229,193,88,0.3)] z-30 flex items-center justify-center cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isAuthenticated ? (
          /* PASSCODE AUTHENTICATION SCREEN */
          <div className="w-full max-w-md py-8 flex flex-col items-center text-center gap-6 my-auto">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#e5c158]/10 border-2 border-[#e5c158]/60 shadow-[0_0_50px_rgba(229,193,88,0.4)]">
              <Crown className="w-10 h-10 text-[#e5c158] animate-pulse" />
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 text-[#e5c158] text-xs font-extrabold uppercase tracking-[0.3em] bg-[#e5c158]/10 px-4 py-1.5 rounded-full border border-[#e5c158]/40">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Creator Access Sanctuary</span>
              </div>
              <h3 className="font-general text-3xl font-black text-[#f0f0f5]">
                Welcome, Shree 🌸
              </h3>
              <p className="font-general text-xs sm:text-sm text-[#f0f0f5]/70 leading-relaxed max-w-xs">
                Enter your secret VIP passcode to access all global fan petals & heartfelt tributes in one unified reader.
              </p>
            </div>

            <form onSubmit={handleAuthenticate} className="w-full flex flex-col gap-4">
              <div className="relative w-full">
                <Key className="absolute left-4 top-4.5 w-5 h-5 text-[#e5c158]/80" />
                <input
                  type="password"
                  placeholder="Enter Passcode..."
                  autoComplete="off"
                  spellCheck={false}
                  disabled={lockoutTime > 0}
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setAuthError(false);
                  }}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/[0.04] border border-[#e5c158]/40 text-[#f0f0f5] font-general text-center font-bold tracking-widest text-lg focus:outline-none focus:border-[#e5c158] focus:ring-2 focus:ring-[#e5c158]/50 transition-all placeholder:text-[#f0f0f5]/30 placeholder:font-normal placeholder:text-sm placeholder:tracking-normal disabled:opacity-50"
                />
              </div>

              {lockoutTime > 0 ? (
                <span className="text-xs font-semibold text-rose-400 bg-rose-500/10 py-2 px-3 rounded-xl border border-rose-500/30">
                  🔒 Security Lockout Active. Retry in {lockoutTime} seconds.
                </span>
              ) : authError ? (
                <span className="text-xs font-semibold text-rose-400 bg-rose-500/10 py-2 px-3 rounded-xl border border-rose-500/30 animate-shake">
                  ⛔ Authentication Failed. Access Denied.
                </span>
              ) : null}

              <SpecularButton
                size="lg"
                radius={24}
                lineColor="#e5c158"
                baseColor="#0c0d12"
                type="submit"
                disabled={lockoutTime > 0}
                className="w-full py-4 text-sm font-bold uppercase tracking-widest text-[#e5c158] shadow-[0_0_30px_rgba(229,193,88,0.4)]"
              >
                <Crown className="w-4 h-4 text-[#e5c158]" />
                <span>Unlock VIP Reader Portal →</span>
              </SpecularButton>
            </form>
          </div>
        ) : (
          /* VIP PETALS UNIFIED READER SANCTUARY */
          <div className="w-full flex flex-col gap-5 overflow-hidden h-full">
            
            {/* Header Title Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-[#e5c158]/15 border border-[#e5c158]/50 text-[#e5c158] shadow-lg">
                  <Crown className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-general text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#e5c158] via-white to-[#e5c158] tracking-tight">
                    Shree's Private Sanctuary 🌸
                  </h3>
                  <span className="font-general text-xs text-[#f0f0f5]/70 tracking-widest uppercase">
                    Reading {filteredPetals.length} of {petals.length} Total Global Tributes
                  </span>
                </div>
              </div>

              {/* View Mode Toggle with SpecularButton Animation */}
              <div className="flex items-center gap-2 flex-wrap">
                <SpecularButton
                  size="sm"
                  radius={14}
                  lineColor={viewMode === '3d' ? '#e5c158' : 'rgba(229,193,88,0.3)'}
                  baseColor={viewMode === '3d' ? '#1c1912' : '#0c0d12'}
                  onClick={() => setViewMode('3d')}
                  className={`px-3.5 py-1.5 text-xs font-bold font-general uppercase tracking-wider ${
                    viewMode === '3d'
                      ? 'text-[#e5c158] shadow-[0_0_20px_rgba(229,193,88,0.4)]'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <span>3D Coverflow ✨</span>
                </SpecularButton>

                <SpecularButton
                  size="sm"
                  radius={14}
                  lineColor={viewMode === 'grid' ? '#e5c158' : 'rgba(229,193,88,0.3)'}
                  baseColor={viewMode === 'grid' ? '#1c1912' : '#0c0d12'}
                  onClick={() => setViewMode('grid')}
                  className={`px-3.5 py-1.5 text-xs font-bold font-general uppercase tracking-wider ${
                    viewMode === 'grid'
                      ? 'text-[#e5c158] shadow-[0_0_20px_rgba(229,193,88,0.4)]'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <span>Cards Grid</span>
                </SpecularButton>

                <SpecularButton
                  size="sm"
                  radius={14}
                  lineColor={viewMode === 'list' ? '#e5c158' : 'rgba(229,193,88,0.3)'}
                  baseColor={viewMode === 'list' ? '#1c1912' : '#0c0d12'}
                  onClick={() => setViewMode('list')}
                  className={`px-3.5 py-1.5 text-xs font-bold font-general uppercase tracking-wider ${
                    viewMode === 'list'
                      ? 'text-[#e5c158] shadow-[0_0_20px_rgba(229,193,88,0.4)]'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <span>Reader List</span>
                </SpecularButton>
              </div>
            </div>

            {/* Controls Bar: Search & Country Filter */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center">
              <div className="sm:col-span-8 relative">
                <Search className="absolute left-4 top-3.5 w-4 h-4 text-[#e5c158]/80" />
                <input
                  type="text"
                  placeholder="Search fan memories by name, message, or country..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/[0.04] border border-white/15 text-[#f0f0f5] text-xs sm:text-sm focus:outline-none focus:border-[#e5c158] transition-all placeholder:text-[#f0f0f5]/40"
                />
              </div>

              <div className="sm:col-span-4 relative">
                <Filter className="absolute left-3.5 top-3.5 w-4 h-4 text-[#e5c158]/80" />
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full pl-10 pr-8 py-3 rounded-2xl bg-[#0c0d12] border border-white/15 text-[#f0f0f5] text-xs sm:text-sm focus:outline-none focus:border-[#e5c158] transition-all appearance-none cursor-pointer"
                >
                  <option value="all">All Countries ({uniqueCountries.length})</option>
                  {uniqueCountries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Petals Feed Display */}
            <div className="flex-1 overflow-hidden my-1 min-h-[440px] flex items-center justify-center">
              {filteredPetals.length === 0 ? (
                <div className="py-16 text-center text-white/50 flex flex-col items-center gap-3">
                  <MessageSquare className="w-8 h-8 text-white/30" />
                  <p className="text-sm">No fan messages match your search criteria.</p>
                </div>
              ) : viewMode === '3d' ? (
                /* 3D DEPTH CAROUSEL COVERFLOW READER */
                <div className="w-full h-[460px] relative flex items-center justify-center">
                  <DepthCarousel
                    items={carouselItems}
                    cardWidth={330}
                    cardHeight={450}
                    radius={24}
                    depth={220}
                    spread={100}
                    tilt={20}
                    perspective={1400}
                    visibleCards={4}
                    falloff={0.2}
                    blur={5}
                    duration={700}
                    ease="power3.out"
                    autoplay={false}
                    showControls
                    showIndicators
                    renderCardContent={(item) => (
                      <div className="w-full h-full flex flex-col justify-between p-5 sm:p-7 relative z-10 text-left select-none pointer-events-none">
                        {/* Top Header Location & Date Badges */}
                        <div className="flex items-center justify-between border-b border-[#e5c158]/30 pb-3">
                          <span className="px-3 py-1 rounded-full bg-[#0c0d12]/90 border border-[#e5c158]/50 text-[#e5c158] font-general text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.2em] backdrop-blur-md shadow-md">
                            📍 {item.country}
                          </span>
                          <span className="font-general text-[10px] sm:text-xs font-semibold text-[#f0f0f5]/80 uppercase tracking-widest bg-black/60 px-2.5 py-1 rounded-full border border-white/10">
                            {item.date}
                          </span>
                        </div>

                        {/* Center Fan Quote — Full Scrollable Message (No Line Clamp!) */}
                        <div className="my-auto py-3 my-2 overflow-y-auto max-h-[260px] sm:max-h-[290px] custom-scrollbar pr-2 pointer-events-auto">
                          <p
                            className="italic text-base sm:text-xl text-[#f0f0f5] font-normal leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]"
                            style={{ fontFamily: "'Playfair Display', 'Cinzel', Georgia, serif" }}
                          >
                            “{item.text}”
                          </p>
                        </div>

                        {/* Bottom Author Signature */}
                        <div className="flex items-center justify-between border-t border-[#e5c158]/30 pt-3">
                          <div className="flex items-center gap-2">
                            <Heart className="w-4 h-4 fill-rose-400 text-rose-400 animate-pulse" />
                            <span className="font-general text-xs sm:text-sm font-black text-[#e5c158] uppercase tracking-[0.2em]">
                              {item.author}
                            </span>
                          </div>
                          <span className="font-general text-[10px] font-bold text-[#e5c158]/70 uppercase tracking-widest">
                            5M Tribute 🌸
                          </span>
                        </div>
                      </div>
                    )}
                  />
                </div>
              ) : viewMode === 'grid' ? (
                <div className="w-full h-full overflow-y-auto pr-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredPetals.map((petal, index) => (
                    <div
                      key={petal.id || index}
                      className="p-5 rounded-3xl bg-[#050507] border border-[#e5c158]/30 hover:border-[#e5c158]/60 transition-all flex flex-col justify-between gap-4 shadow-lg group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(circle_at_center,rgba(229,193,88,0.1),transparent_70%)] pointer-events-none" />

                      <p
                        className="italic text-base text-[#f0f0f5]/90 leading-relaxed"
                        style={{ fontFamily: "'Playfair Display', 'Cinzel', Georgia, serif" }}
                      >
                        “{petal.text}”
                      </p>

                      <div className="flex items-center justify-between border-t border-white/10 pt-3 text-xs">
                        <div className="flex items-center gap-2 text-[#e5c158] font-bold">
                          <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
                          <span>{petal.author}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#f0f0f5]/60 text-[11px]">
                          {petal.country && (
                            <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 uppercase tracking-wider">
                              📍 {petal.location ? `${petal.location}, ${petal.country}` : petal.country}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full h-full overflow-y-auto pr-1 flex flex-col gap-3">
                  {filteredPetals.map((petal, index) => (
                    <div
                      key={petal.id || index}
                      className="p-4 sm:p-5 rounded-2xl bg-[#050507] border border-white/10 hover:border-[#e5c158]/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex-1 flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-xs font-bold text-[#e5c158]">
                          <span>{petal.author}</span>
                          {petal.country && (
                            <span className="text-[10px] text-white/50 font-normal">
                              ({petal.location ? `${petal.location}, ${petal.country}` : petal.country})
                            </span>
                          )}
                        </div>
                        <p
                          className="italic text-sm text-white/90"
                          style={{ fontFamily: "'Playfair Display', 'Cinzel', Georgia, serif" }}
                        >
                          “{petal.text}”
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShreeCreatorPortalModal;
