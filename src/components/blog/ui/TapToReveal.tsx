// src/components/blog/ui/TapToReveal.tsx
import { useState } from "react";

interface TapToRevealProps {
  children: React.ReactNode;
  className?: string;
  revealText?: string;
}

export const TapToReveal = ({ 
  children, 
  className = '', 
  revealText = '▶' 
}: TapToRevealProps) => {
  const [revealed, setRevealed] = useState(false);
  
  return (
    <span 
      onClick={() => setRevealed(!revealed)}
      className={`cursor-pointer underline underline-offset-4 decoration-dotted ${className}`}
    >
      {revealed ? children : revealText}
    </span>
  );
};