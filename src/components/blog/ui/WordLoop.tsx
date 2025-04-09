// src/components/blog/ui/WordLoop.tsx
interface WordLoopProps {
    text: string;
  }
  
  export const WordLoop = ({ text }: WordLoopProps) => {
    return (
      <div className="overflow-hidden whitespace-nowrap py-4 border-t-2 border-b-2 border-dashed border-light-accent-secondary dark:border-dark-accent-secondary">
        <span className="inline-block pl-[100%] animate-scroll">
          {text}
        </span>
      </div>
    );
  };