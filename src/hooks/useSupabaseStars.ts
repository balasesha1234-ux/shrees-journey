import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const BASE_STAR_COUNT = 5000000;
const MAX_USER_STARS = 5;

export function useSupabaseStars() {
  const [globalStarCount, setGlobalStarCount] = useState<number>(BASE_STAR_COUNT);
  const [userStars, setUserStars] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // Initialize local user's contributed star count from localStorage
  useEffect(() => {
    const savedUserStars = localStorage.getItem('shree_user_stars_v3');
    if (savedUserStars) {
      setUserStars(parseInt(savedUserStars, 10));
    }
  }, []);

  // Fetch total global star count from Supabase
  const fetchGlobalStars = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) {
      // Fallback local calculation if Supabase is offline
      const savedCount = localStorage.getItem('shree_star_count_v2');
      if (savedCount) {
        setGlobalStarCount(parseInt(savedCount, 10));
      }
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // 1. Try querying dedicated star_blessings table first
      const { data: starData, error: starErr } = await supabase
        .from('star_blessings')
        .select('count');

      if (!starErr && starData) {
        const dbTotal = starData.reduce((sum: number, row: { count?: number }) => sum + (row.count || 1), 0);
        setGlobalStarCount(BASE_STAR_COUNT + dbTotal);
        setLoading(false);
        return;
      }

      // 2. Resilient Fallback: Query petals table for star blessing entries
      const { data: petalStarData } = await supabase
        .from('petals')
        .select('id')
        .or('message.ilike.%star blessing%,name.ilike.%star%');

      const dbTotal = petalStarData ? petalStarData.length : 0;
      const savedLocalAddons = localStorage.getItem('shree_star_count_v2');
      const localAdd = savedLocalAddons ? parseInt(savedLocalAddons, 10) - BASE_STAR_COUNT : 0;

      setGlobalStarCount(BASE_STAR_COUNT + dbTotal + Math.max(0, localAdd));
    } catch {
      // Fallback to local count if network error occurs
      const savedCount = localStorage.getItem('shree_star_count_v2');
      if (savedCount) {
        setGlobalStarCount(parseInt(savedCount, 10));
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Set up real-time subscription for global star blessings
  useEffect(() => {
    fetchGlobalStars();

    if (!isSupabaseConfigured || !supabase) return;
    const client = supabase;

    // Real-time channel for star_blessings
    const channel1 = client
      .channel('public:star_blessings_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'star_blessings' }, () => {
        fetchGlobalStars();
      })
      .subscribe();

    // Real-time channel for petals fallback
    const channel2 = client
      .channel('public:petals_star_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'petals' }, () => {
        fetchGlobalStars();
      })
      .subscribe();

    // Regular polling fallback every 8 seconds to ensure multi-device sync
    const pollInterval = setInterval(() => {
      fetchGlobalStars();
    }, 8000);

    return () => {
      client.removeChannel(channel1);
      client.removeChannel(channel2);
      clearInterval(pollInterval);
    };
  }, [fetchGlobalStars]);

  // Light a star: Increment both global Supabase counter and local user progress
  const lightStar = async (): Promise<boolean> => {
    if (userStars >= MAX_USER_STARS) {
      return false;
    }

    const nextUserStars = userStars + 1;
    setUserStars(nextUserStars);
    setGlobalStarCount((prev) => prev + 1);
    localStorage.setItem('shree_user_stars_v3', nextUserStars.toString());
    localStorage.setItem('shree_star_count_v2', (globalStarCount + 1).toString());

    if (isSupabaseConfigured && supabase) {
      try {
        // Attempt insert into star_blessings table
        const { error: insertErr } = await supabase
          .from('star_blessings')
          .insert([{ count: 1 }]);

        if (insertErr) {
          // Fallback: record blessing in petals table
          await supabase.from('petals').insert([
            {
              name: 'Global Family Star',
              country: 'Global Family 🌟',
              message: 'Golden Star Blessing Lit ✨',
            },
          ]);
        }
      } catch (e) {
        console.warn('Supabase star blessing sync warning:', e);
      }
    }

    return true;
  };

  return {
    globalStarCount,
    userStars,
    maxUserStars: MAX_USER_STARS,
    isLimitReached: userStars >= MAX_USER_STARS,
    lightStar,
    loading,
    refreshStars: fetchGlobalStars,
  };
}
