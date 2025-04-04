// src/components/blog/BlogPost.tsx
import { useState, useEffect, useRef } from 'react';
import { useTheme } from './ThemeContext';
import { Card } from './ui/Card';
import { Typewriter } from './ui/Typewriter';
import { TapToReveal } from './ui/TapToReveal';
import { useRewardCheck } from "../../hooks/useRewardCheck";

export const BlogPost = ({ slug }: { slug: string }) => {
  const { theme, toggleTheme } = useTheme();
  const [progress, setProgress] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showRadialMenu, setShowRadialMenu] = useState(false);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const { shouldReward, grantReward } = useRewardCheck(slug);

  // Handle scroll progress
  useEffect(() => {
    let lastScrollTop = window.scrollY;
    const scrollThreshold = 20; // pixels

    const handleScroll = () => {
      if (!contentRef.current) return;
      
      const scrollHeight = contentRef.current.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      const scrollProgress = (scrollTop / scrollHeight) * 100;
      setProgress(scrollProgress);
      
      // Show sidebar after intro
      setShowSidebar(scrollTop > 2500);
      
      // New scroll direction logic
      if (scrollTop > lastScrollTop) {
        setShowMenu(false); // Hide on scroll down
      } else if (lastScrollTop - scrollTop > scrollThreshold) {
        setShowMenu(true); // Show only after intentional scroll up
      }
    
      lastScrollTop = scrollTop;
    };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track time on page
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeOnPage(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Check for confetti trigger
  useEffect(() => {
    if (shouldReward && timeOnPage > 90 && progress >= 95) {
      setShowConfetti(true);
      grantReward();
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [timeOnPage, progress, shouldReward, grantReward]);

    
  // Handle card flip
  const handleCardFlip = (id: string) => {
    setFlippedCards(prev => 
      prev.includes(id) ? prev.filter(cardId => cardId !== id) : [...prev, id]
    );
  };

  // Related posts data
  const relatedPosts = [
    { id: 1, title: "Digital Trends in the Caribbean", excerpt: "Exploring unique patterns..." },
    { id: 2, title: "Multilingual SEO Strategies", excerpt: "How to optimize for diverse..." },
    { id: 3, title: "Analytics in Emerging Markets", excerpt: "Special considerations..." }
  ];

  // Card data
  const cardData = [
    { id: "card1", isTall: true, title: "Population Size", content: "With fewer than 600,000 residents, Suriname's search volume is too small for reliable trend analysis using standard tools." },
    { id: "card2", title: "Urban vs Rural", content: "Paramaribo has good connectivity but rural areas often lack infrastructure." },
    { id: "card3", title: "Data Thresholds", content: "Most platforms don't report data below certain volume thresholds." },
    { id: "card4", title: "Language Diversity", content: "Searches are fragmented across Dutch, Sranan Tongo, English, and other languages." },
    { id: "card5", title: "Technical Issues", content: "IP geolocation inaccuracies and VPN usage distort data." },
    { id: "card6", isTall: true, title: "Infrastructure Gaps", content: "Limited broadband in rural areas creates 'digital shadows' where behavior goes unmeasured." }
  ];

  return (
    <div 
      ref={contentRef}
      className={`blog-container min-h-screen p-8 max-w-6xl mx-auto relative ${
        theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* Progress bar */}
      <div 
        className="progress-bar fixed top-0 left-0 h-1 z-50 transition-all duration-100" 
        style={{ 
          width: `${progress}%`,
          background: theme === 'light' 
            ? 'linear-gradient(to right, #ff6b6b, #48dbfb)'
            : 'linear-gradient(to right, #ff9e5e, #6c5ce7)'
        }}
      ></div>

      {/* Floating sidebar */}
      {showSidebar && (
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-40">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
              theme === 'light' ? 'border-cyan-400 bg-white' : 'border-purple-500 bg-gray-800'
            }`}
          >
            ↑
          </button>
          <button 
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
              theme === 'light' ? 'border-cyan-400 bg-white' : 'border-purple-500 bg-gray-800'
            }`}
          >
            ↓
          </button>
          <button 
            onClick={() => setShowRadialMenu(!showRadialMenu)}
            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
              theme === 'light' ? 'border-cyan-400 bg-white' : 'border-purple-500 bg-gray-800'
            }`}
          >
            🕹️
          </button>
          
          {showRadialMenu && (
            <div className={`absolute right-12 top-0 grid grid-cols-3 gap-2 p-3 rounded-lg border-2 ${
              theme === 'light' 
                ? 'border-red-400 bg-white shadow-lg' 
                : 'border-orange-400 bg-gray-800 shadow-lg'
            }`}>
              {['Share', 'Comment', '🔥', '🤯', '🎮', '👾'].map((item) => (
                <button 
                  key={item}
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    theme === 'light' 
                      ? 'hover:bg-cyan-100' 
                      : 'hover:bg-purple-900'
                  }`}
                >
                  {item}
                </button>
              ))}
              <button 
                onClick={toggleTheme}
                className={`w-8 h-8 flex items-center justify-center rounded-full ${
                  theme === 'light' 
                    ? 'hover:bg-cyan-100' 
                    : 'hover:bg-purple-900'
                }`}
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
              <button 
                className={`w-8 h-8 flex items-center justify-center rounded-full ${
                  theme === 'light' 
                    ? 'hover:bg-cyan-100' 
                    : 'hover:bg-purple-900'
                }`}
              >
                ✂️
              </button>
            </div>
          )}
        </div>
      )}

      {/* Floating bottom menu */}
      {showMenu && (
        <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4 px-6 py-2 rounded-full z-40 ${
          theme === 'light' 
            ? 'bg-white border-2 border-red-400 shadow-md' 
            : 'bg-gray-800 border-2 border-orange-400 shadow-md'
        }`}>
          <button className="hover:underline">Home</button>
          <button className="hover:underline">Share</button>
          <button className="hover:underline">Next</button>
        </div>
      )}

      {/* Blog content */}
      <article className="max-w-3xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">The Hidden Challenges of Measuring Search Trends in Suriname</h1>
          <p className="text-xl mb-6">Discover why tracking digital behavior in Suriname presents unique challenges and what this means for businesses and researchers looking to understand this unique South American market.</p>
          <div className="flex gap-2 text-sm mb-6">
            <span className="px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 dark:bg-purple-900 dark:text-purple-100">
              Digital Analytics
            </span>
            <span>•</span>
            <span>5 min read</span>
          </div>
          <img 
            src="/images/suriname-digital-landscape.webp" 
            alt="8-bit pixel art of a map of Suriname with search icons and question marks floating above it" 
            className="w-full rounded-lg border-2 border-cyan-400 dark:border-purple-500"
          />
        </header>

        {/* Auto-generated TOC */}
        <div className={`mb-12 p-6 rounded-lg border-2 ${
          theme === 'light' ? 'border-cyan-400 bg-white' : 'border-purple-500 bg-gray-800'
        }`}>
          <h3 className="text-xl font-bold mb-4">Table of Contents</h3>
          <ul className="space-y-2">
            {[
              'Introduction',
              'The Digital Landscape of Suriname',
              'Population Challenges',
              'Infrastructure Limitations',
              'Language Complexity',
              'Technical Barriers',
              'What This Means for Businesses',
              'Future Outlook',
              'Conclusion'
            ].map((item) => (
              <li key={item}>
                <a 
                  href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                  className={`hover:underline ${
                    theme === 'light' ? 'text-red-500' : 'text-orange-400'
                  }`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Introduction Section */}
        <section id="introduction" className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Introduction</h2>
          <p className="mb-4">When digital marketers and researchers attempt to analyze search trends around the world, most countries follow predictable patterns. However, Suriname—a small yet culturally rich nation on the northeastern coast of South America—remains something of a digital mystery. Despite being home to vibrant communities and growing digital adoption, Suriname presents unique challenges for anyone attempting to measure online search behavior.</p>
          
          <div className="float-right w-64 ml-6 mb-4 p-4 rounded-lg border-2 border-cyan-400 dark:border-purple-500 bg-white dark:bg-gray-800 shadow-md">
            <blockquote className="italic">
              "Suriname represents one of the most intriguing digital paradoxes in the Americas—a nation with rapidly growing connectivity yet persistently difficult to measure through traditional search analytics."
            </blockquote>
          </div>

          <p className="mb-4">This isn't just an academic concern. Understanding search trends helps businesses identify market opportunities, researchers track public interests, and governments develop better digital policies. So why is Suriname such a challenging market to analyze? Let's dive into the hidden factors creating this digital blind spot.</p>
        </section>

        {/* Digital Landscape Section */}
        <section id="the-digital-landscape-of-suriname" className="mb-16">
          <h2 className="text-2xl font-bold mb-6">The Digital Landscape of Suriname</h2>
          <p className="mb-4">Before we can understand why measuring search trends in Suriname is difficult, we need to establish some context about the nation's digital landscape.</p>
          <p className="mb-4">Suriname, formerly known as Dutch Guiana, gained independence from the Netherlands in 1975. With a population of approximately 600,000 people, it's one of the least populated countries in South America. However, its unique position as a Dutch-speaking nation with strong Caribbean, South American, and European influences makes it culturally significant.</p>
          <p className="mb-4">Digital adoption in Suriname has grown steadily over the past decade. Internet penetration has increased from around 32% in 2010 to approximately 60% in recent years—a significant improvement, but still well below the rates seen in more developed nations.</p>
          <p className="font-bold">The primary challenge begins with this fundamental reality: smaller data pools create less reliable analytics.</p>
        </section>

        {/* Card grid section */}
        <section id="key-challenges" className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Key Challenges Visualized</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cardData.map((card, index) => (
              <div 
                key={card.id}
                className={`
                  ${index % 6 < 3 && index % 2 === 0 ? 'md:row-span-2' : ''}
                  ${index % 6 >= 3 && index % 2 !== 0 ? 'md:row-span-2' : ''}
                `}
              >
                <Card
                  id={card.id}
                  isTall={card.isTall}
                  title={card.title}
                  content={card.content}
                  theme={theme}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Typewriter example */}
        <section id="language-complexity" className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Language Complexity</h2>
          <p className="mb-4">
            <Typewriter 
              text="Suriname's official language is Dutch, but Sranan Tongo (a creole language) serves as the lingua franca, while English, Javanese, Hindi, Chinese dialects, and indigenous languages are also spoken." 
              speed="normal"
            />
          </p>
        </section>

        {/* Tap to reveal example */}
        <section id="for-businesses" className="mb-16">
          <h2 className="text-2xl font-bold mb-6">For Businesses</h2>
          <p className="mb-4">
            <TapToReveal revealText="▶ Click to reveal business implications">
              For businesses operating in or targeting Suriname, these measurement challenges create significant obstacles to market research and strategy development. The limitations in search trend data mean businesses must rely more heavily on primary research, consider regional proxies, invest in localized data collection, and combine multiple data sources.
            </TapToReveal>
          </p>
        </section>

        {/* Related posts */}
        <section className="mb-16">
          <h3 className="text-xl font-bold mb-6">Related Posts</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map(post => (
              <div 
                key={post.id}
                className={`p-6 rounded-lg border-2 ${
                  theme === 'light' ? 'border-cyan-400 bg-white' : 'border-purple-500 bg-gray-800'
                }`}
              >
                <h4 className="font-bold mb-2">{post.title}</h4>
                <p className="text-sm mb-4">{post.excerpt}</p>
                <button 
                  className={`px-4 py-2 rounded-full text-sm ${
                    theme === 'light' 
                      ? 'bg-red-100 text-red-800 hover:bg-red-200' 
                      : 'bg-orange-900 text-orange-100 hover:bg-orange-800'
                  }`}
                >
                  Read More
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Endless word loop */}
        <div className="overflow-hidden whitespace-nowrap py-4 border-t-2 border-b-2 border-dashed border-cyan-400 dark:border-purple-500">
          <span className="inline-block pl-[100%] animate-scroll">
            Welcome to my first blog, please like, share, comment or save for future reading
          </span>
        </div>
      </article>

      {/* Confetti effect */}
      {showConfetti && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
          {Array.from({ length: 100 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-2 h-2 rounded-full animate-confetti"
              style={{
                backgroundColor: theme === 'light' 
                  ? (Math.random() > 0.5 ? '#ff6b6b' : '#48dbfb')
                  : (Math.random() > 0.5 ? '#ff9e5e' : '#6c5ce7'),
                left: `${Math.random() * 100}%`,
                top: '-10px',
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 3 + 2}s`
              }}
            ></div>
          ))}
          <div className={`fixed bottom-16 left-1/2 transform -translate-x-1/2
            px-6 py-3 rounded-full font-bold animate-toast ${
            theme === 'light' 
              ? 'bg-white text-red-500 border-2 border-red-400 shadow-lg' 
              : 'bg-gray-800 text-orange-400 border-2 border-orange-500 shadow-lg'
          }`}>
            You gained 10 pts!
          </div>
        </div>
      )}
    </div>
  );
};