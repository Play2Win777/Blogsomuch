// src/components/blog/ui/TableOfContents.tsx
interface TocProps {
    items: string[];
  }
  
  export const TableOfContents = ({ items }: TocProps) => {
    return (
      <div className="mb-12 p-6 rounded-lg border-2 border-light-accent-secondary bg-light-card-bg dark:border-dark-accent-secondary dark:bg-dark-card-bg">
        <h3 className="text-xl font-bold mb-4">Table of Contents</h3>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item}>
              <a 
                href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                className="hover:underline text-light-accent dark:text-dark-accent"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };