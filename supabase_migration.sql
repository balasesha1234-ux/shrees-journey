-- Supabase SQL Migration Script for Petals Table
-- Resolves Country vs Sub-area / Location tracking bug

-- 1. Add nullable 'location' column to petals table
ALTER TABLE petals ADD COLUMN IF NOT EXISTS location TEXT;

-- 2. Migrate existing records safely
-- Normalize case and separate sub-areas/cities/states into the location column

-- Vizianagaram / Konada
UPDATE petals 
SET country = 'India', location = 'Vizianagaram, Konada' 
WHERE LOWER(country) LIKE '%vizianagaram%';

-- Kancheepuram
UPDATE petals 
SET country = 'India', location = 'Kancheepuram' 
WHERE LOWER(country) LIKE '%kancheepuram%';

-- West Bengal
UPDATE petals 
SET country = 'India', location = 'West Bengal' 
WHERE LOWER(country) = 'west bengal';

-- Kadapa
UPDATE petals 
SET country = 'India', location = 'Kadapa' 
WHERE LOWER(country) = 'kadapa';

-- General case normalization for India
UPDATE petals 
SET country = 'India' 
WHERE LOWER(TRIM(country)) = 'india' OR LOWER(TRIM(country)) = 'in' OR LOWER(TRIM(country)) = 'bharat';
