// src/pages/BlogPage.tsx
import { useParams } from 'react-router-dom';
import { BlogPost } from '../components/blog/BlogPost';

export default function BlogPage() {
  const { slug } = useParams();
  
  // If no slug provided, use default or redirect
  const postSlug = slug || "measuring-search-trends-in-suriname";
  
  return (
    <div className="blog-container">
      <BlogPost slug={postSlug} />
    </div>
  );
}