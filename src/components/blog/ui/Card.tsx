// src/components/blog/ui/Card.tsx
import { useState } from "react";

interface CardProps {
  id: string;
  isTall?: boolean;
  title: string;
  content: string;
  image?: string;
  theme?: 'light' | 'dark';
}

export const Card = ({ id, isTall = false, title, content, image, theme = 'light' }: CardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const themeClasses = {
    light: {
      bg: 'bg-white',
      border: 'border-cyan-400',
      text: 'text-gray-800'
    },
    dark: {
      bg: 'bg-gray-800',
      border: 'border-purple-500',
      text: 'text-gray-100'
    }
  };

  return (
    <div 
      className={`card relative w-full h-48 ${isTall ? 'md:h-96' : ''} ${
        themeClasses[theme].bg
      } rounded-lg border-2 ${
        themeClasses[theme].border
      } cursor-pointer transition-transform duration-300 transform-style-preserve-3d ${
        isFlipped ? 'rotate-y-180' : ''
      }`}
      onClick={handleFlip}
    >
      <div className={`card-face absolute w-full h-full p-4 backface-hidden ${
        isFlipped ? 'opacity-0' : 'opacity-100'
      } ${themeClasses[theme].text}`}>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        {image && <img src={image} alt="" className="w-full h-24 object-cover mb-2 rounded" />}
        <p className="text-sm">{content.substring(0, 100)}...</p>
      </div>
      <div className={`card-face absolute w-full h-full p-4 backface-hidden rotate-y-180 ${
        isFlipped ? 'opacity-100' : 'opacity-0'
      } ${themeClasses[theme].text}`}>
        <p className="text-sm">{content}</p>
      </div>
    </div>
  );
};