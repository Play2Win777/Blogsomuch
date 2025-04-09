// src/components/blog/ui/Sidebar.tsx
import { useState } from 'react';
import { useTheme } from '../ThemeContext';

interface SidebarProps {
  showSidebar: boolean;
}

export const Sidebar = ({ showSidebar }: SidebarProps) => {
  const { theme, toggleTheme } = useTheme();
  const [showRadialMenu, setShowRadialMenu] = useState(false);

  return (
    <>
      {showSidebar && (
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-40">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-light-accent-secondary bg-light-card-bg dark:border-dark-accent-secondary dark:bg-dark-card-bg"
          >
            ↑
          </button>
          <button 
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-light-accent-secondary bg-light-card-bg dark:border-dark-accent-secondary dark:bg-dark-card-bg"
          >
            ↓
          </button>
          <button 
            onClick={() => setShowRadialMenu(!showRadialMenu)}
            className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-light-accent-secondary bg-light-card-bg dark:border-dark-accent-secondary dark:bg-dark-card-bg"
          >
            🕹️
          </button>
          
          {showRadialMenu && (
            <div className="absolute right-12 top-0 grid grid-cols-3 gap-4 p-4 rounded-lg border-2 border-light-accent bg-light-card-bg dark:border-dark-accent dark:bg-dark-card-bg shadow-lg w-[12rem]">
              {['Share', 'Comment', '🔥', '🤯', '🎮', '👾'].map((item) => (
                <button 
                  key={item}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-light-accent-secondary/20 dark:hover:bg-dark-accent-secondary/20"
                >
                  {item}
                </button>
              ))}
              <button 
                onClick={toggleTheme}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-light-accent-secondary/20 dark:hover:bg-dark-accent-secondary/20"
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
              <button 
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-light-accent-secondary/20 dark:hover:bg-dark-accent-secondary/20"
              >
                ✂️
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};