import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured, type PetalRow } from '../lib/supabase';

export interface PetalData {
  id: number | string;
  text: string;
  author: string;
  country?: string;
  created_at?: string;
}

export function useSupabasePetals() {
  const [petals, setPetals] = useState<PetalData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPetals = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
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
        setError('Unable to load the Memory Garden right now. Please try again in a moment.');
        setPetals([]);
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
        setPetals(fetchedPetals);
      } else {
        setPetals([]);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch petals';
      console.warn('Failed to load petals from Supabase:', msg);
      setError('Unable to load the Memory Garden right now. Please try again in a moment.');
      setPetals([]);
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
    setError(null);

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
