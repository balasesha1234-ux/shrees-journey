import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured, type PetalRow } from '../lib/supabase';

export interface PetalData {
  id: number | string;
  text: string;
  author: string;
  country?: string;
  created_at?: string;
}

const DEFAULT_CURATED_PETALS: PetalData[] = [
  { id: 'curated-1', text: 'Thank you for inspiring me to show up with faith every day.', author: 'A Grateful Supporter', country: 'India' },
  { id: 'curated-2', text: 'Your authenticity made difficult days so much easier.', author: 'Community Member', country: 'Canada' },
  { id: 'curated-3', text: 'You proved that small, quiet beginnings can touch millions of hearts.', author: 'Fellow Creator', country: 'United Kingdom' },
  { id: 'curated-4', text: 'I will always cherish memories of this beautiful journey.', author: 'Longtime Fan', country: 'Australia' },
  { id: 'curated-5', text: 'Where passion meets purpose, lives are transformed.', author: 'Anonymous Friend', country: 'United States' },
];

export function useSupabasePetals() {
  const [petals, setPetals] = useState<PetalData[]>(DEFAULT_CURATED_PETALS);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPetals = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: dbError } = await supabase
        .from('petals')
        .select('*')
        .order('created_at', { ascending: false });

      if (dbError) {
        console.warn('Supabase fetch notice:', dbError.message);
        setError(dbError.message);
        return;
      }

      if (data && data.length > 0) {
        const fetchedPetals: PetalData[] = data.map((row: PetalRow, idx: number) => ({
          id: row.id || `sp-${idx}`,
          text: row.message,
          author: row.name || 'A Grateful Friend',
          country: row.country || 'Global',
          created_at: row.created_at,
        }));

        // Merge fetched database petals with curated petals so Memory Tree is always rich
        setPetals([...fetchedPetals, ...DEFAULT_CURATED_PETALS]);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch petals';
      console.warn('Failed to load petals from Supabase:', msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPetals();
  }, [fetchPetals]);

  const addPetal = async (name: string, country: string, message: string): Promise<PetalData> => {
    const newPetal: PetalData = {
      id: Date.now(),
      text: message,
      author: name || 'A Grateful Friend',
      country: country || 'Global',
      created_at: new Date().toISOString(),
    };

    // Optimistically update local state immediately so UI updates without refresh
    setPetals((prev) => [newPetal, ...prev]);

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error: insertError } = await supabase
          .from('petals')
          .insert([
            {
              name: name.trim() || 'A Grateful Friend',
              country: country.trim() || 'Global',
              message: message.trim(),
              created_at: new Date().toISOString(),
            },
          ])
          .select('*');

        if (insertError) {
          console.warn('Supabase insert notice:', insertError.message);
        } else if (data && data[0]) {
          const insertedRow = data[0];
          setPetals((prev) =>
            prev.map((p) =>
              p.id === newPetal.id
                ? {
                    ...p,
                    id: insertedRow.id || p.id,
                    created_at: insertedRow.created_at || p.created_at,
                  }
                : p
            )
          );
        }
      } catch (err) {
        console.warn('Failed to insert petal into Supabase:', err);
      }
    }

    return newPetal;
  };

  return {
    petals,
    loading,
    error,
    addPetal,
    refreshPetals: fetchPetals,
  };
}
