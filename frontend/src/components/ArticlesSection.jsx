import React, { useState, useEffect, useCallback, useMemo, memo } from "react";

// Data and utility functions
const API_URL = "http://localhost:3001/api/articles";
const ARTICLE_LIMIT = 4;

// Format date for display - memorized to avoid recalculations
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Memorized Article Card component to prevent unnecessary re-renders
const ArticleCard = memo(({ article }) => (
  <div className="group relative overflow-hidden rounded-xl bg-gradient-to-b from-black/60 to-black/80 backdrop-blur-sm border border-gray-800 hover:border-[#efc75e] transition-all duration-300 h-full flex flex-col hover:shadow-[0_0_15px_rgba(239,199,94,0.3)] hover:-translate-y-1">
    {/* Article image */}
    <div className="relative h-48 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
      <img 
        src={article.image} 
        alt={article.title} 
        className="w-full h-full object-cover object-center transform-gpu transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
        decoding="async"
        width="400"
        height="225"
        style={{ aspectRatio: '16/9' }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/400x225?text=StrivFitness';
        }}
      />
      
      {/* Category tag */}
      <div className="absolute top-3 left-3 z-20">
        <span className="bg-[#efc75e]/90 text-black text-xs px-2 py-1 rounded-md font-medium accent-font">
          {article.category}
        </span>
      </div>
    </div>
    
    {/* Content */}
    <div className="p-5 flex-grow flex flex-col">
      <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#efc75e] transition-colors duration-300 heading-font">
        {article.title}
      </h3>
      
      <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow body-font">
        {article.excerpt}
      </p>
      
      {/* Author and date */}
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-[#efc75e] text-xs font-bold mr-2">
            {article.author.split(' ').map(name => name[0]).join('')}
          </div>
          <div>
            <p className="text-white text-xs font-medium heading-font">{article.author}</p>
            <p className="text-gray-500 text-xs body-font">{article.date}</p>
          </div>
        </div>
        
        <div className="text-[#efc75e] text-xs flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <span className="body-font">{article.readTime} min read</span>
        </div>
      </div>
    </div>
    
    {/* Hover overlay for better UX */}
    <div className="absolute inset-0 bg-[#efc75e]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
  </div>
));

// Memorized loading skeleton component
const LoadingSkeleton = memo(() => (
  <div className="rounded-xl bg-gradient-to-b from-black/60 to-black/80 border border-gray-800 h-[350px] relative">
    <div className="h-48 bg-gray-800/50"></div>
    <div className="p-5">
      <div className="h-4 bg-gray-700/50 rounded w-3/4 mb-3"></div>
      <div className="h-3 bg-gray-700/50 rounded w-full mb-2"></div>
      <div className="h-3 bg-gray-700/50 rounded w-5/6 mb-2"></div>
      <div className="h-3 bg-gray-700/50 rounded w-4/5 mb-4"></div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-700/50 mr-2"></div>
          <div>
            <div className="h-2 bg-gray-700/50 rounded w-16 mb-1"></div>
            <div className="h-2 bg-gray-700/50 rounded w-12"></div>
          </div>
        </div>
        <div className="h-2 bg-gray-700/50 rounded w-16"></div>
      </div>
    </div>
  </div>
));

// Memorized error component
const ErrorDisplay = memo(({ error, onRetry }) => (
  <section className="py-16 bg-black">
    <div className="container mx-auto px-4">
      <div className="text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={onRetry} 
          className="bg-[#efc75e] text-black px-4 py-2 rounded-md font-bold"
        >
          Retry
        </button>
      </div>
    </div>
  </section>
));

// Memorized section header component
const SectionHeader = memo(() => (
  <div className="text-center mb-12">
    <div className="inline-flex items-center justify-center mb-3">
      <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#efc75e]"></span>
      <span className="text-[#efc75e] text-xs font-bold tracking-widest accent-font uppercase mx-3">
        LATEST ARTICLES
      </span>
      <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#efc75e]"></span>
    </div>
    
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 heading-font">
      Fitness <span className="text-[#efc75e]">Knowledge Hub</span>
    </h2>
    
    <p className="text-gray-400 max-w-2xl mx-auto body-font">
      Expert advice, training tips, and in-depth guides to help you achieve your fitness goals and optimize your performance.
    </p>
  </div>
));

const ArticlesSection = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Process article data - memoized to avoid recalculations
  const processArticleData = useCallback((articleData) => {
    return {
      id: articleData._id,
      title: articleData.title,
      excerpt: articleData.content.substring(0, 120) + '...',
      image: articleData.imageUrl || 'https://via.placeholder.com/400x300?text=StrivFitness',
      category: articleData.category,
      date: formatDate(articleData.publishDate || articleData.createdAt),
      author: articleData.author?.firstName ? 
        `${articleData.author.firstName} ${articleData.author.lastName}` : 
        (articleData.author?.username || 'StrivFitness Team'),
      readTime: 5
    };
  }, []);

  // Fetch articles function
  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const controller = new AbortController();
      const signal = controller.signal;

      try {
        const response = await fetch(`${API_URL}?limit=${ARTICLE_LIMIT}`, {
          headers: {
            Accept: "application/json",
          },
          signal,
          cache: "default",
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch articles: ${response.status}`
          );
        }

        // Parse the response data
        const data = await response.json();
        
      
        if (data && data.articles && Array.isArray(data.articles)) {
          // Map the articles to match the component's expected format
          const formattedArticles = data.articles.map(processArticleData);
          setArticles(formattedArticles.slice(0, ARTICLE_LIMIT));
        } else if (Array.isArray(data)) {
          // If the API directly returns an array of articles
          const formattedArticles = data.map(processArticleData);
          setArticles(formattedArticles.slice(0, ARTICLE_LIMIT));
        } else {
          // Fallback to empty array if data is in an unexpected format
          console.warn("Unexpected API response format:", data);
          setArticles([]);
        }
        
        setLoading(false);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error fetching articles:", err);
          setError(err.message || "Failed to load articles. Please try again later.");
          setLoading(false);
        }
      }
    } catch (outerErr) {
      console.error("Unexpected error in fetchArticles:", outerErr);
      setError("An unexpected error occurred. Please try again later.");
      setLoading(false);
    }
  }, [processArticleData]);

  // Handle retry
  const handleRetry = useCallback(() => {
    window.location.reload();
  }, []);

  // Fetch articles on component mount
  useEffect(() => {
    const controller = new AbortController();
    fetchArticles();

    return () => {
      controller.abort();
    };
  }, [fetchArticles]);

  // Memorize the articles grid to prevent unnecessary re-renders
  const articlesGrid = useMemo(() => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
      {articles.length > 0 ? (
        articles.map((article) => (
          <div 
            key={article.id} 
            onClick={() => window.location.href = `/articles/${article.id}`}
          >
            <ArticleCard article={article} />
          </div>
        ))
      ) : (
        <div className="col-span-4 text-center py-12 min-h-[200px] flex items-center justify-center">
          <p className="text-gray-400">No articles found. Check back soon for new content!</p>
        </div>
      )}
    </div>
  ), [articles]);

  // Render loading state
  if (loading && !articles.length) {
    return <LoadingSkeleton />;
  }

  // Render error state
  if (error && !articles.length) {
    return <ErrorDisplay error={error} onRetry={handleRetry} />;
  }

  return (
    <section className="py-16 relative">
      {/* Gold accent lines */}
      <div className="gold-accent-top"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header with minimum height to prevent layout shifts */}
        <div className="min-h-[150px] flex flex-col justify-center">
          <SectionHeader />
        </div>

        {/* Articles Grid */}
        {articlesGrid}

        {/* View All Button with fixed height */}
        <div className="text-center mt-12 h-[60px]">
          <a 
            href="/articles" 
            className="inline-flex items-center justify-center bg-transparent border-2 border-[#efc75e] text-[#efc75e] px-6 py-3 rounded-md font-bold transition-all duration-300 hover:bg-[#efc75e]/10 button-font tracking-wider uppercase"
          >
            View All Articles
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
      
      <div className="gold-accent-bottom"></div>
    </section>
  );
};

export default React.memo(ArticlesSection);