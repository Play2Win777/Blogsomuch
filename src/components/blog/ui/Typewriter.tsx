import { useEffect, useState, useRef } from "react";

interface TypewriterProps {
  text: string;
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
}

export const Typewriter = ({ text, speed = 'normal', className = '' }: TypewriterProps) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isBlinkingAfter, setIsBlinkingAfter] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const speeds = {
    slow: 50,
    normal: 30,
    fast: 10
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isTyping && !isBlinkingAfter) {
          setIsTyping(true);
          let i = 0;
          const typing = setInterval(() => {
            if (i < text.length) {
              setDisplayText(text.substring(0, i + 1));
              i++;
            } else {
              setIsTyping(false);
              setIsBlinkingAfter(true);
              // Stop blinking after 3 seconds (3 blinks at 1s each)
              setTimeout(() => {
                setIsBlinkingAfter(false);
              }, 3000);
              clearInterval(typing);
            }
          }, speeds[speed] || speeds.normal);

          observer.disconnect(); // Ensure it runs only once
          return () => clearInterval(typing);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [text, speed]); // Dependencies only on text and speed to prevent retrigger

  return (
    <span
      ref={ref}
      className={`typewriter ${isTyping ? 'typing' : ''} ${
        isBlinkingAfter ? 'blinking-after' : ''
      } ${className}`}
    >
      {displayText}
    </span>
  );
};