// src/lib/rewardCache.ts
interface CacheEntry {
    hasRewarded: boolean;
    expiresAt: number;
    points?: number;
  }
  
  const CACHE_PREFIX = 'reward_';
  const CACHE_DURATION = 5 * 24 * 60 * 60 * 1000; // 5 days in ms
  
  export const checkRewardCache = (slug: string): CacheEntry | null => {
    const key = `${CACHE_PREFIX}${slug}`;
    const cachedData = localStorage.getItem(key);
    
    if (!cachedData) return null;
    
    const entry = JSON.parse(cachedData) as CacheEntry;
    if (Date.now() > entry.expiresAt) {
      localStorage.removeItem(key);
      return null;
    }
    
    return entry;
  };
  
  export const setRewardCache = (slug: string, points: number = 10): void => {
    const key = `${CACHE_PREFIX}${slug}`;
    const entry: CacheEntry = {
      hasRewarded: true,
      expiresAt: Date.now() + CACHE_DURATION,
      points
    };
    localStorage.setItem(key, JSON.stringify(entry));
  };