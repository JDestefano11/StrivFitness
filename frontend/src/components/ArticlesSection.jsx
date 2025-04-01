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
  <article 
    className="bg-[#111] rounded-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-[1.02] hover:shadow-lg group will-change-transform cursor-pointer"
  >
    {/* Article Image */}
    <div className="relative w-full pt-[56.25%] bg-gray-900 overflow-hidden">
      <img 
        src={article.image} 
        alt={article.title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
      <div className="absolute top-0 left-0 m-3">
        <span className="bg-[#efc75e] text-black text-xs font-bold px-2 py-1 rounded">
          {article.category}
        </span>
      </div>
    </div>
    
    {/* Article Content */}
    <div className="p-5 flex flex-col h-[220px]">
      <div className="flex items-center text-xs text-gray-500 mb-2">
        <span>{article.date}</span>
        <span className="mx-2">•</span>
        <span>{article.author}</span>
      </div>
      <h3 className="text-white text-lg font-bold mb-2 line-clamp-2 group-hover:text-[#efc75e] transition-colors duration-300">
        {article.title}
      </h3>
      <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
        {article.excerpt}
      </p>
      <a 
        href={`/articles/${article.id}`} 
        className="inline-flex items-center text-[#efc75e] font-bold text-sm group-hover:underline mt-auto"
        onClick={(e) => e.stopPropagation()}
      >
        Read More
        <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </a>
    </div>
  </article>
));

// Memorized loading skeleton component
const LoadingSkeleton = memo(() => (
  <section className="py-16 bg-black">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        {/* Skeleton for section header */}
        <div className="inline-block h-8 w-32 bg-[#efc75e]/20 rounded-full mb-4"></div>
        <div className="h-10 bg-[#efc75e]/20 rounded w-3/4 max-w-xl mx-auto mb-4"></div>
        <div className="h-4 bg-[#efc75e]/20 rounded w-full max-w-2xl mx-auto"></div>
      </div>
      
      {/* Grid skeleton with fixed dimensions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-[#111] rounded-lg overflow-hidden h-[400px]">
            {/* Image placeholder  */}
            <div className="relative w-full pt-[56.25%] bg-[#efc75e]/10"></div>
            <div className="p-5 space-y-4">
              <div className="h-4 bg-[#efc75e]/20 rounded w-1/2"></div>
              <div className="h-6 bg-[#efc75e]/20 rounded w-3/4"></div>
              <div className="h-4 bg-[#efc75e]/20 rounded w-full"></div>
              <div className="h-4 bg-[#efc75e]/20 rounded w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
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
    <div className="inline-flex items-center space-x-2 bg-black/50 backdrop-blur-sm border border-[#efc75e]/20 rounded-full px-3 py-1 mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-[#efc75e]"></span>
      <span className="text-[#efc75e] text-xs font-bold tracking-widest font-['Rajdhani']">
        LATEST ARTICLES
      </span>
    </div>
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-['Rajdhani']">
      Fitness Knowledge <span className="text-[#efc75e]">Hub</span>
    </h2>
    <p className="text-gray-400 max-w-2xl mx-auto">
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
        (articleData.author?.username || 'StrivFitness Team')
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
    <section className="py-16 bg-black" id="articles">
      <div className="container mx-auto px-4">
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
            className="inline-flex items-center justify-center bg-transparent border-2 border-[#efc75e] text-[#efc75e] px-6 py-3 rounded-md font-bold transition-all duration-300 hover:bg-[#efc75e]/10 font-['Rajdhani'] tracking-wider uppercase"
          >
            View All Articles
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default React.memo(ArticlesSection);