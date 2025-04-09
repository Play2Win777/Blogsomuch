// src/components/blog/ui/RelatedPosts.tsx
interface Post {
    id: number;
    title: string;
    excerpt: string;
  }
  
  interface RelatedPostsProps {
    posts: Post[];
  }
  
  export const RelatedPosts = ({ posts }: RelatedPostsProps) => {
    return (
      <section className="mb-16">
        <h3 className="text-xl font-bold mb-6">Related Posts</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map(post => (
            <div 
              key={post.id}
              className="p-6 rounded-lg border-2 border-light-accent-secondary bg-light-card-bg dark:border-dark-accent-secondary dark:bg-dark-card-bg"
            >
              <h4 className="font-bold mb-2">{post.title}</h4>
              <p className="text-sm mb-4">{post.excerpt}</p>
              <button 
                className="px-4 py-2 rounded-full text-sm font-medium bg-light-button-secondary text-light-button-text hover:bg-opacity-90 dark:bg-dark-button-secondary dark:text-dark-button-text dark:hover:bg-opacity-90 transition-colors shadow-button hover:shadow-button-hover"
              >
                Read More
              </button>
            </div>
          ))}
        </div>
      </section>
    );
  };