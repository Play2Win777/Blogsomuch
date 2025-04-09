// src/components/blog/ui/BlogHeader.tsx
interface BlogHeaderProps {
    title: string;
    description: string;
    tags: string[];
    imageSrc: string;
    imageAlt: string;
  }
  
  export const BlogHeader = ({ title, description, tags, imageSrc, imageAlt }: BlogHeaderProps) => {
    return (
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-xl mb-6">{description}</p>
        <div className="flex gap-2 text-sm mb-6">
          {tags.map((tag, index) => (
            <span key={index} className="px-3 py-1 rounded-full bg-light-button-primary text-light-button-text dark:bg-dark-button-primary dark:text-dark-button-text font-medium shadow-button hover:shadow-button-hover">
              {tag}
            </span>
          ))}
          <span>•</span>
          <span>5 min read</span>
        </div>
        <img 
          src={imageSrc}
          alt={imageAlt} 
          className="w-full rounded-lg border-2 border-light-accent-secondary dark:border-dark-accent-secondary"
        />
      </header>
    );
  };