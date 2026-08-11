const COUNTRY_ALIAS_MAP: Record<string, string> = {
  // India & States & Cities
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
  'kadapa': 'India',
  'kancheepuram': 'India',
  'kanchipuram': 'India',
  'vizianagaram': 'India',
  'konada': 'India',
  'andhra pradesh': 'India',

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

  // Germany, Japan, France, Singapore, etc.
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

const KNOWN_INDIA_SUB_LOCATIONS = new Set([
  'west bengal', 'kadapa', 'vizianagaram', 'konada', 'kancheepuram', 'kanchipuram',
  'mumbai', 'delhi', 'bengaluru', 'bangalore', 'hyderabad', 'chennai', 'kolkata',
  'pune', 'ahmedabad', 'maharashtra', 'karnataka', 'tamil nadu', 'telangana',
  'kerala', 'gujarat', 'punjab', 'rajasthan', 'uttar pradesh', 'goa', 'haryana', 'andhra pradesh'
]);

export interface ParsedLocationResult {
  country: string;
  location: string | null;
}

/**
 * Sanitizes input text to prevent XSS and control character injection.
 */
export const sanitizeInput = (str?: string | null): string => {
  if (!str) return '';
  return str
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
    .replace(/<[^>]*>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
};

const getAlias = (key: string): string | undefined => {
  if (Object.prototype.hasOwnProperty.call(COUNTRY_ALIAS_MAP, key)) {
    return COUNTRY_ALIAS_MAP[key];
  }
  return undefined;
};

/**
 * Normalizes raw country & location inputs (or legacy string) into structured country & location.
 */
export const parseLocationAndCountry = (
  rawCountry?: string | null,
  rawLocation?: string | null
): ParsedLocationResult => {
  const c = sanitizeInput(rawCountry);
  const l = sanitizeInput(rawLocation);

  if (!c && !l) {
    return { country: 'Global', location: null };
  }

  // If separate country and location fields are provided
  if (c && l) {
    const canonical = getCanonicalCountryName(c);
    return {
      country: canonical,
      location: cleanLocationString(l),
    };
  }

  const targetStr = c || l;
  const lowerStr = targetStr.toLowerCase();

  if (lowerStr === 'global' || lowerStr === 'global family' || lowerStr === 'earth') {
    return { country: 'Global', location: null };
  }

  // Split by common delimiters (comma, slash)
  const parts = targetStr.split(/[,/]+/).map((p) => p.trim()).filter(Boolean);

  if (parts.length === 1) {
    const single = parts[0];
    const singleLower = single.toLowerCase();

    if (KNOWN_INDIA_SUB_LOCATIONS.has(singleLower)) {
      if (singleLower === 'india' || singleLower === 'in' || singleLower === 'bharat') {
        return { country: 'India', location: null };
      }
      const canonicalSub = single.split(/\s+/).map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
      return { country: 'India', location: canonicalSub };
    }

    return { country: getCanonicalCountryName(single), location: null };
  }

  // Multi-part string e.g. "india,vizianagaram,konada" or "INDIA / KANCHEEPURAM"
  let foundCountry: string | null = null;
  const locationParts: string[] = [];

  for (const part of parts) {
    const partLower = part.toLowerCase();
    if (!foundCountry && (COUNTRY_ALIAS_MAP[partLower] || isCountryName(partLower))) {
      foundCountry = getCanonicalCountryName(part);
    } else {
      const formattedPart = part
        .split(/\s+/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');
      locationParts.push(formattedPart);
    }
  }

  const finalCountry = foundCountry || getCanonicalCountryName(parts[0]);
  const finalLocation = locationParts.length > 0 ? locationParts.join(', ') : null;

  return {
    country: finalCountry,
    location: finalLocation,
  };
};

/**
 * Extracts pure canonical country name
 */
export const extractPureCountry = (raw: string): string => {
  return parseLocationAndCountry(raw).country;
};

/**
 * Returns canonical capitalized Country name (e.g. "India", "United States", "Global")
 */
export const getCanonicalCountryName = (raw: string): string => {
  const sanitized = sanitizeInput(raw);
  if (!sanitized) return 'Global';
  const lower = sanitized.toLowerCase();

  if (lower === 'global' || lower === 'global family' || lower === 'earth') {
    return 'Global';
  }

  const alias = getAlias(lower);
  if (alias) {
    return alias;
  }

  return sanitized
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Returns canonical key for unique country counting.
 * E.g., "India", "india", "INDIA", "India, Vizianagaram" -> "india"
 */
export const parseCanonicalCountryKey = (rawCountry?: string | null, rawLocation?: string | null): string | null => {
  const { country } = parseLocationAndCountry(rawCountry, rawLocation);
  if (!country || country === 'Global') return null;
  return country.toLowerCase().trim();
};

export const parseCanonicalCountry = (raw: string): string => {
  const key = parseCanonicalCountryKey(raw);
  return key || '';
};

const isCountryName = (lower: string): boolean => {
  return ['india', 'in', 'bharat', 'usa', 'us', 'uk', 'canada', 'australia', 'germany', 'japan', 'france', 'singapore', 'uae'].includes(lower);
};

const cleanLocationString = (loc: string): string | null => {
  if (!loc || !loc.trim()) return null;
  return loc
    .trim()
    .split(/[\s,]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
};
