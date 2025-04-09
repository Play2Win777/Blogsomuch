// src/components/blog/ui/ProgressBar.tsx
import { useState, useEffect } from 'react';
import { useTheme } from '../ThemeContext';

export const ProgressBar = () => {
  const { theme } = useTheme();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      const scrollProgress = (scrollTop / scrollHeight) * 100;
      setProgress(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="progress-bar fixed top-0 left-0 h-1 z-50 transition-all duration-100" 
      style={{ 
        width: `${progress}%`,
        background: theme === 'light' 
          ? 'linear-gradient(to right, var(--tw-gradient-stops))'
          : 'linear-gradient(to right, var(--tw-gradient-stops))',
        '--tw-gradient-from': theme === 'light' ? '#e74c3c' : '#f39c12',
        '--tw-gradient-to': theme === 'light' ? '#3498db' : '#9b59b6',
        '--tw-gradient-stops': theme === 'light' 
          ? 'var(--tw-gradient-from), var(--tw-gradient-to)'
          : 'var(--tw-gradient-from), var(--tw-gradient-to)'
      }}
    />
  );
};