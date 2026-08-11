import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured, type PetalRow } from '../lib/supabase';
import { parseLocationAndCountry } from '../utils/countryHelper';

export interface PetalData {
  id: number | string;
  text: string;
  author: string;
  country?: string;
  location?: string;
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

      // Try selecting with location field, fallback to without location if column not yet added
      let data: PetalRow[] | null = null;
      let dbError: unknown = null;

      const resWithLoc = await supabase
        .from('petals')
        .select('id, name, country, location, message, created_at')
        .order('created_at', { ascending: false });

      if (resWithLoc.error) {
        // Fallback query if location column doesn't exist yet in Supabase schema
        const resFallback = await supabase
          .from('petals')
          .select('id, name, country, message, created_at')
          .order('created_at', { ascending: false });

        data = resFallback.data as PetalRow[] | null;
        dbError = resFallback.error;
      } else {
        data = resWithLoc.data as PetalRow[] | null;
      }

      if (dbError) {
        console.warn('Supabase fetch notice: [REDACTED_ERROR_DETAILS]');
        setError('Unable to load the Memory Garden right now. Please try again in a moment.');
        setPetals([]);
        return;
      }

      if (data && data.length > 0) {
        const fetchedPetals: PetalData[] = data.map((row: PetalRow, idx: number) => {
          const parsed = parseLocationAndCountry(row.country, row.location);
          return {
            id: row.id || `sp-${idx}`,
            text: row.message,
            author: row.name || 'A Grateful Friend',
            country: parsed.country,
            location: parsed.location || undefined,
            created_at: row.created_at,
          };
        });
        setPetals(fetchedPetals);
      } else {
        setPetals([]);
      }
    } catch {
      console.warn('Failed to load petals from Supabase: [REDACTED]');
      setError('Unable to load the Memory Garden right now. Please try again in a moment.');
      setPetals([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPetals();
  }, [fetchPetals]);

  const addPetal = async (
    name: string,
    country: string,
    message: string,
    location?: string
  ): Promise<PetalData> => {
    const parsed = parseLocationAndCountry(country, location);
    const newPetal: PetalData = {
      id: Date.now(),
      text: message,
      author: name || 'A Grateful Friend',
      country: parsed.country,
      location: parsed.location || undefined,
      created_at: new Date().toISOString(),
    };

    // Optimistically update local state immediately so UI updates without refresh
    setPetals((prev) => [newPetal, ...prev]);
    setError(null);

    if (isSupabaseConfigured && supabase) {
      try {
        const insertPayload: Record<string, unknown> = {
          name: name.trim() || 'A Grateful Friend',
          country: parsed.country,
          message: message.trim(),
          created_at: new Date().toISOString(),
        };

        if (parsed.location) {
          insertPayload.location = parsed.location;
        }

        let insertRes = await supabase
          .from('petals')
          .insert([insertPayload])
          .select('id, name, country, location, message, created_at');

        // Fallback insert without location if column is not yet present on DB
        if (insertRes.error && insertPayload.location) {
          delete insertPayload.location;
          insertRes = await supabase
            .from('petals')
            .insert([insertPayload])
            .select('id, name, country, message, created_at');
        }

        if (insertRes.error) {
          console.warn('Supabase insert notice: [REDACTED_ERROR_DETAILS]');
        } else if (insertRes.data && insertRes.data[0]) {
          const insertedRow = insertRes.data[0];
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
      } catch {
        console.warn('Failed to insert petal into Supabase: [REDACTED]');
      }
    }

    return newPetal;
  };

  // User Data Deletion Flow: Allows users to remove their contributed petal
  const deletePetal = async (id: number | string): Promise<void> => {
    setPetals((prev) => prev.filter((p) => p.id !== id));
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('petals').delete().eq('id', id);
      } catch {
        console.warn('Petal deletion notice: [REDACTED]');
      }
    }
  };

  return {
    petals,
    loading,
    error,
    addPetal,
    deletePetal,
    refreshPetals: fetchPetals,
  };
}
