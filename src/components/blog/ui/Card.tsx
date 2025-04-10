// src/components/blog/ui/Card.tsx
import { useState, useEffect } from "react";

interface CardProps {
  id: string;
  title: string;
  content: string;
  longContent?: string;
  image?: string;
  theme?: "light" | "dark";
  isClicked?: boolean;
  onCardClick?: (id: string) => void;
  onNextCard?: () => void;
  onExit?: () => void;
  isModalOpen?: boolean;
}

export const Card = ({
  id,
  title,
  content,
  longContent = content,
  image,
  theme = "light",
  isClicked = false,
  onCardClick,
  onNextCard,
  onExit,
  isModalOpen = false,
}: CardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => onCardClick && onCardClick(id);

  const themeClasses = {
    light: { bg: "bg-white", border: "border-cyan-400", text: "text-gray-800" },
    dark: { bg: "bg-gray-800", border: "border-purple-500", text: "text-gray-100" },
  };

  const cardHeight = "h-64";

  // Sound effects with AudioContext initialization
  const playSound = (type: "hover" | "modal" | "close") => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    if (type === "hover") {
      oscillator.frequency.value = 600; // Subtle hover sound
      gainNode.gain.value = 0.1;
      oscillator.type = "sine";
    } else if (type === "modal") {
      oscillator.frequency.value = 400; // Achievement tone
      gainNode.gain.value = 0.15;
      oscillator.type = "triangle";
    } else if (type === "close") {
      oscillator.frequency.value = 300; // Subtle close sound
      gainNode.gain.value = 0.1;
      oscillator.type = "square";
    }

    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  useEffect(() => {
    if (isModalOpen) {
      playSound("modal");
    }
  }, [isModalOpen]);

  return (
    <>
      {/* Card Component */}
      <div
        className={`card relative w-full ${cardHeight} ${themeClasses[theme].bg} rounded-lg border-2 ${
          themeClasses[theme].border
        } cursor-pointer transition-transform duration-300 ${
          !isClicked ? "animate-sportGlow" : ""
        } ${isHovered ? "scale-105 z-10" : "scale-100 z-0"}`}
        onMouseEnter={() => {
          setIsHovered(true);
          playSound("hover"); // Trigger on hover (user gesture)
        }}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          handleClick();
          // No hover sound here; click triggers modal sound via useEffect
        }}
      >
        <div className={`w-full h-full ${themeClasses[theme].text} flex flex-col p-4`}>
          <h3 className="text-lg font-bold mb-2">{title}</h3>
          {image && (
            <div className="relative w-full h-32 mb-2 rounded overflow-hidden">
              <img src={image} alt={title} className="absolute w-full h-full object-cover" />
            </div>
          )}
          <p className="text-sm">{content.substring(0, 100)}...</p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl h-[90vh] bg-white dark:bg-gray-800 rounded-lg p-6 overflow-y-auto">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">{title}</h3>
            {image && (
              <div className="relative w-full h-48 mb-4 rounded overflow-hidden">
                <img src={image} alt={title} className="absolute w-full h-full object-cover" />
              </div>
            )}
            <div className="prose prose-sm dark:prose-invert text-gray-800 dark:text-gray-100">
              {longContent.split("\n").map((line, index) => (
                <p key={index} className="mb-4">{line}</p>
              ))}
            </div>
            <div className="mt-6 flex justify-end gap-4">
              {onNextCard && (
                <button
                  onClick={() => {
                    onNextCard();
                    playSound("modal");
                  }}
                  className="px-4 py-2 bg-cyan-400 text-white rounded hover:bg-cyan-500 transition-colors"
                >
                  Next Card
                </button>
              )}
              <button
                onClick={() => {
                  onExit && onExit();
                  playSound("close");
                }}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-700"
              >
                {onNextCard ? "Exit" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};