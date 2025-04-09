// src/components/blog/ui/BottomMenu.tsx
import { useState, useEffect } from 'react';

interface BottomMenuProps {
  showMenu: boolean;
}

export const BottomMenu = ({ showMenu }: BottomMenuProps) => {
  return (
    <>
      {showMenu && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4 px-6 py-2 rounded-full z-40 bg-light-card-bg border-2 border-light-accent dark:bg-dark-card-bg dark:border-dark-accent shadow-md">
          <button className="hover:underline">Home</button>
          <button className="hover:underline">Share</button>
          <button className="hover:underline">Next</button>
        </div>
      )}
    </>
  );
};