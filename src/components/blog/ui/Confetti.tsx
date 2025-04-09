// src/components/blog/ui/Confetti.tsx
import { useTheme } from '../ThemeContext';

interface ConfettiProps {
  showConfetti: boolean;
}

export const Confetti = ({ showConfetti }: ConfettiProps) => {
  const { theme } = useTheme();

  return (
    <>
      {showConfetti && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
          {Array.from({ length: 100 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-2 h-2 rounded-full animate-confetti"
              style={{
                backgroundColor: theme === 'light' 
                  ? (Math.random() > 0.5 ? '#e74c3c' : '#3498db')
                  : (Math.random() > 0.5 ? '#f39c12' : '#9b59b6'),
                left: `${Math.random() * 100}%`,
                top: '-10px',
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 3 + 2}s`
              }}
            />
          ))}
          <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full font-bold animate-toast bg-light-card-bg text-light-accent border-2 border-light-accent dark:bg-dark-card-bg dark:text-dark-accent dark:border-dark-accent shadow-lg">
            You gained 10 pts!
          </div>
        </div>
      )}
    </>
  );
};