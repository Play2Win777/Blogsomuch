// src/components/blog/ui/Typewriter.tsx
import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
}

export const Typewriter = ({ text, speed = 'normal', className = '' }: TypewriterProps) => {
  const [displayText, setDisplayText] = useState('');
  const speeds = {
    slow: 50,
    normal: 30,
    fast: 10
  };

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, speeds[speed] || speeds.normal);

    return () => clearInterval(typing);
  }, [text, speed]);

  return <span className={`typewriter ${className}`}>{displayText}</span>;
};