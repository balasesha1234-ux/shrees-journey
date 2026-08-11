const COUNTRY_ALIAS_MAP: Record<string, string> = {
  // USA & States/Cities
  'usa': 'United States',
  'us': 'United States',
  'united states': 'United States',
  'united states of america': 'United States',
  'america': 'United States',
  'california': 'United States',
  'texas': 'United States',
  'new york': 'United States',
  'florida': 'United States',
  'washington': 'United States',
  'illinois': 'United States',
  
  // UK & Regions
  'uk': 'United Kingdom',
  'united kingdom': 'United Kingdom',
  'england': 'United Kingdom',
  'scotland': 'United Kingdom',
  'wales': 'United Kingdom',
  'london': 'United Kingdom',

  // India & States & Major Cities
  'india': 'India',
  'bharat': 'India',
  'in': 'India',
  'mumbai': 'India',
  'delhi': 'India',
  'bengaluru': 'India',
  'bangalore': 'India',
  'hyderabad': 'India',
  'chennai': 'India',
  'kolkata': 'India',
  'pune': 'India',
  'ahmedabad': 'India',
  'maharashtra': 'India',
  'karnataka': 'India',
  'tamil nadu': 'India',
  'telangana': 'India',
  'kerala': 'India',
  'gujarat': 'India',
  'punjab': 'India',
  'rajasthan': 'India',
  'uttar pradesh': 'India',
  'west bengal': 'India',
  'goa': 'India',
  'haryana': 'India',

  // UAE
  'uae': 'United Arab Emirates',
  'united arab emirates': 'United Arab Emirates',
  'dubai': 'United Arab Emirates',
  'abu dhabi': 'United Arab Emirates',

  // Canada
  'canada': 'Canada',
  'ca': 'Canada',
  'toronto': 'Canada',
  'vancouver': 'Canada',
  'ontario': 'Canada',

  // Australia
  'australia': 'Australia',
  'au': 'Australia',
  'sydney': 'Australia',
  'melbourne': 'Australia',

  // Germany & Europe
  'germany': 'Germany',
  'de': 'Germany',
  'berlin': 'Germany',
  'munich': 'Germany',
  'japan': 'Japan',
  'jp': 'Japan',
  'tokyo': 'Japan',
  'france': 'France',
  'paris': 'France',
  'singapore': 'Singapore',
  'sg': 'Singapore',
};

/**
 * Extracts a clean, capitalized, canonical Country name from any raw location input.
 * E.g., "Mumbai, India" -> "India", "California, USA" -> "United States"
 */
export const extractPureCountry = (raw: string): string => {
  if (!raw || !raw.trim()) return 'Global';
  const cleaned = raw.trim();
  const lower = cleaned.toLowerCase();
  
  if (lower === 'global' || lower === 'global family' || lower === 'earth') {
    return 'Global';
  }

  // If input contains comma/slash (e.g. "Mumbai, India" or "California, USA"), take the last part
  const parts = lower.split(/[,/-]+/);
  const candidate = parts[parts.length - 1].trim();

  if (COUNTRY_ALIAS_MAP[candidate]) {
    return COUNTRY_ALIAS_MAP[candidate];
  }
  if (COUNTRY_ALIAS_MAP[lower]) {
    return COUNTRY_ALIAS_MAP[lower];
  }

  // Capitalize candidate words
  const words = candidate.split(/\s+/).map((w) => w.charAt(0).toUpperCase() + w.slice(1));
  return words.join(' ');
};

export const parseCanonicalCountry = (raw: string): string => {
  const pure = extractPureCountry(raw);
  return pure === 'Global' ? '' : pure.toLowerCase();
};
