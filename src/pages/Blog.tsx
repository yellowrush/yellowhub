import React, { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import './Blog.css';

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
}

/**
 * Blog Page Component
 * 
 * Demonstrates usage of Loading component during data fetching.
 * Simulates API call with setTimeout.
 */
export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Mock data
        const mockPosts: BlogPost[] = [
          {
            id: 1,
            title: 'Getting Started with Vite + React SSG',
            excerpt: 'Learn how to build lightning-fast static sites with Vite and React...',
            date: '2026-06-15',
            tags: ['Vite', 'React', 'SSG'],
          },
          {
            id: 2,
            title: 'Design Systems Inspired by Animal Crossing',
            excerpt: 'Creating warm, friendly UI components with a cottage-core aesthetic...',
            date: '2026-06-10',
            tags: ['Design', 'UI', 'CSS'],
          },
          {
            id: 3,
            title: 'TypeScript Best Practices for 2026',
            excerpt: 'Modern TypeScript patterns and tips for better developer experience...',
            date: '2026-06-05',
            tags: ['TypeScript', 'Best Practices'],
          },
        ];

        setPosts(mockPosts);
      } catch (err) {
        console.error('Failed to fetch blog posts:', err);
        setError('Failed to load blog posts. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    // Re-trigger the effect
    window.location.reload();
  };

  // Show loading state
  if (loading) {
    return (
      <div className="blog-page">
        <Loading
          type="dots"
          size="large"
          variant="island"
          text="Loading blog posts..."
        />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="blog-page">
        <div className="error-container">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button className="retry-button" onClick={handleRetry}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Show blog posts
  return (
    <div className="blog-page">
      <header className="blog-header">
        <h1>Blog</h1>
        <p className="blog-description">
          Thoughts on frontend development, design, and building cool stuff.
        </p>
      </header>

      <div className="blog-posts">
        {posts.map((post) => (
          <article key={post.id} className="blog-post-card">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-excerpt">{post.excerpt}</p>
            <div className="post-meta">
              <time className="post-date">{post.date}</time>
              <div className="post-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="post-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
