// src/hooks/useRewardCheck.ts
import { useEffect, useState } from 'react';
import { checkRewardCache, setRewardCache } from '../lib/rewardCache';

export const useRewardCheck = (slug: string) => {
  const [shouldReward, setShouldReward] = useState(false);

  useEffect(() => {
    const cached = checkRewardCache(slug);
    setShouldReward(!cached?.hasRewarded);
  }, [slug]);

  const grantReward = () => {
    setRewardCache(slug);
    setShouldReward(false);
  };

  return { shouldReward, grantReward };
};