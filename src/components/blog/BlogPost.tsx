// src/components/blog/BlogPost.tsx
import { useState, useEffect, useRef } from 'react';
import { useTheme } from './ThemeContext';
import { Card } from './ui/Card';
import { Typewriter } from './ui/Typewriter';
import { TapToReveal } from './ui/TapToReveal';
import { useRewardCheck } from "../../hooks/useRewardCheck";
import '../../styles/blog.css';

export const BlogPost = ({ slug }: { slug: string }) => {
  const { theme, toggleTheme } = useTheme();
  const [progress, setProgress] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showRadialMenu, setShowRadialMenu] = useState(false);
  const [clickedCards, setClickedCards] = useState<string[]>([]); // Track clicked cards
  const [openCardId, setOpenCardId] = useState<string | null>(null); // Track open modal
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const { shouldReward, grantReward } = useRewardCheck(slug);

  // Handle scroll progress
  useEffect(() => {
    let lastScrollTop = window.scrollY;
    const scrollThreshold = 31; // pixels

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

  // Card interaction handlers
  const handleCardClick = (id: string) => {
    if (!clickedCards.includes(id)) {
      setClickedCards(prev => [...prev, id]);
    }
    setOpenCardId(id);
  };

  const handleNextCard = () => {
    const currentIndex = cardData.findIndex(card => card.id === openCardId);
    const nextIndex = currentIndex + 1;
    if (nextIndex < cardData.length) {
      setOpenCardId(cardData[nextIndex].id);
      if (!clickedCards.includes(cardData[nextIndex].id)) {
        setClickedCards(prev => [...prev, cardData[nextIndex].id]);
      }
    }
  };

  const handleExit = () => {
    setOpenCardId(null);
  };

  // Related posts data
  const relatedPosts = [
    { id: 1, title: "Digital Trends in the Caribbean", excerpt: "Exploring unique patterns..." },
    { id: 2, title: "Multilingual SEO Strategies", excerpt: "How to optimize for diverse..." },
    { id: 3, title: "Analytics in Emerging Markets", excerpt: "Special considerations..." }
  ];

  // Card data
  const cardData = [
    { id: "card1", title: "Population Size", content: "With fewer than 600,000 residents, Suriname's search volume is too small for reliable trend analysis using standard tools.", longContent: `Another significant challenge involves Suriname's digital infrastructure development, which varies dramatically between urban and rural areas.

      While the capital city of Paramaribo enjoys relatively good connectivity, many interior regions face significant challenges:
      
      - Limited broadband infrastructure in rural areas
      - Inconsistent mobile network coverage
      - Higher costs of connectivity relative to average income
      - Intermittent power supply in some regions
      
      These infrastructure gaps create what analysts call "digital shadows"—areas where online behavior goes largely unmeasured. This leads to a situation where search trends may only represent urban populations, creating a skewed picture of national interests and needs.
      
      The result is that search trend analysis for Suriname often represents primarily urban, higher-income populations—missing significant segments of the country.`,image: "/images/population_size.webp" },
    { id: "card2", title: "Urban vs Rural", content: "Paramaribo has good connectivity but rural areas often lack infrastructure.", image: "/images/rural_smaller.webp"  },
    { id: "card3", title: "Data Thresholds", content: "Most platforms don't report data below certain volume thresholds.", longContent: `One of the most fascinating aspects of Suriname is its linguistic diversity, which creates another layer of complexity for search trend analysis.

      Suriname's official language is Dutch, but Sranan Tongo (a creole language) serves as the lingua franca, while English, Javanese, Hindi, Chinese dialects, and indigenous languages are also spoken.
      
      This multilingual reality creates several challenges:
      
      - **Fragmented search behavior**: Searches split across multiple languages
      - **Different search engines**: Dutch speakers may use different platforms than English speakers
      - **Limited local-language content**: Fewer websites in local languages means less search data
      - **Algorithmic limitations**: Search engines may not optimize for languages with smaller user bases
      
      These linguistic factors mean that a single topic might generate searches in multiple languages—each too small to register as a significant trend when analyzed separately, but important when considered collectively.`, image: "/images/data_treshold.webp" },
    { id: "card4", title: "Language Diversity", content: "Searches are fragmented across Dutch, Sranang Tongo, English, and other languages.", longContent: `Beyond the social and infrastructure factors, there are technical challenges specific to measuring search behavior in smaller markets like Suriname:

      1. **IP geolocation accuracy**: Many analytics tools struggle to precisely locate searches from smaller nations
      2. **VPN usage**: Higher rates of VPN usage in regions with limited content can mask true location data
      3. **Cross-border digital service usage**: Many Surinamese users may access services hosted in neighboring countries
      4. **Limited local digital advertising market**: Fewer businesses investing in localized digital marketing means fewer data points collected
      
      These technical barriers compound the challenges already created by population size and infrastructure limitations.
      
      Consider this real-world example: a major search platform might show "insufficient data" for a term in Suriname that generates substantial interest, simply because the absolute number of searches falls below reporting thresholds.`, image: "/images/language_diversity.webp" },
    { id: "card5", title: "Technical Issues", content: "IP geolocation inaccuracies and VPN usage distort data.", image: "/images/distorteddata.webp" },
    { id: "card6", title: "Infrastructure Gaps", content: "Limited broadband in rural areas creates 'digital shadows' where behavior goes unmeasured.", image: "/images/rural2.webp" }
  ];

  return (
    <div className="min-h-screen border-2 border-red-500 overflow-x-hidden overflow-y-hidden">
    <div 
      ref={contentRef}
      className={`min-h-screen p-4 md:p-8 max-w-6xl mx-auto relative bg-light-primary text-light-text dark:bg-dark-primary dark:text-dark-text`}
    >
      {/* Progress bar */}
      <div 
        className="progress-bar fixed top-0 left-0 h-1 z-50 transition-all duration-100" 
        style={{ 
          width: `${progress}%`,
          background: theme === 'light' 
            ? 'linear-gradient(to right, var(--tw-gradient-stops))'
            : 'linear-gradient(to right, var(--tw-gradient-stops))',
          '--tw-gradient-from': theme === 'light' ? '#e74c3c' : '#f39c12',
          '--tw-gradient-to': theme === 'light' ? '#3498db' : '#9b59b6',
          '--tw-gradient-stops': theme === 'light' 
            ? 'var(--tw-gradient-from), var(--tw-gradient-to)'
            : 'var(--tw-gradient-from), var(--tw-gradient-to)'
        }}
      ></div>

      {/* Floating sidebar */}
      {showSidebar && (
        <div className="fixed right-2 md:right-1 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-40">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-light-accent-secondary bg-light-card-bg dark:border-dark-accent-secondary dark:bg-dark-card-bg"
          >
            ↑
          </button>
          <button 
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-light-accent-secondary bg-light-card-bg dark:border-dark-accent-secondary dark:bg-dark-card-bg"
          >
            ↓
          </button>
          <button 
            onClick={() => setShowRadialMenu(!showRadialMenu)}
            className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-light-accent-secondary bg-light-card-bg dark:border-dark-accent-secondary dark:bg-dark-card-bg"
          >
            🕹️
          </button>
          
          {showRadialMenu && (
            <div className="absolute right-12 top-0 grid grid-cols-3 gap-4 p-4 rounded-lg border-2 border-light-accent bg-light-card-bg dark:border-dark-accent dark:bg-dark-card-bg shadow-lg w-[12rem]">
            {['Share', 'Comment', '🔥', '🤯', '🎮', '👾'].map((item) => (
              <button 
                key={item}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-light-accent-secondary/20 dark:hover:bg-dark-accent-secondary/20"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={toggleTheme}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-light-accent-secondary/20 dark:hover:bg-dark-accent-secondary/20"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button 
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-light-accent-secondary/20 dark:hover:bg-dark-accent-secondary/20"
            >
              ✂️
            </button>
            </div>
          )}
        </div>
      )}

      {/* Floating bottom menu */}
      {showMenu && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4 px-6 py-2 rounded-full z-40 bg-light-card-bg border-2 border-light-accent dark:bg-dark-card-bg dark:border-dark-accent shadow-md">
          <button className="hover:underline">Home</button>
          <button className="hover:underline">Share</button>
          <button className="hover:underline">Next</button>
        </div>
      )}

      {/* Blog content */}
      <article className="max-w-7xl mx-auto">
        <header className="mb-12">
        <img 
            src="/images/suriname-digital-landscape.webp"
            alt="8-bit pixel art of a map of Suriname with search icons and question marks floating above it" 
            className="w-full rounded-lg border-2 border-light-accent-secondary dark:border-dark-accent-secondary"
          />
          <h1 className="text-4xl font-bold mb-4">The Hidden Challenges of Measuring Search Trends in <span className="text-transparent bg-clip-text bg-gradient-to-r from-light-accent to-light-accent-secondary dark:from-dark-accent dark:to-dark-accent-secondary bg-[length:220%_auto] animate-shine">Suriname</span></h1>
          <p className="text-xl mb-6">Discover why tracking digital behavior in Suriname presents unique challenges and what this means for businesses and researchers looking to understand this unique South American market.</p>
          <div className="flex gap-2 text-sm mb-6">
            <span className="px-3 py-1 rounded-full bg-light-button-primary text-light-button-text dark:bg-dark-button-primary dark:text-dark-button-text font-medium shadow-button hover:shadow-button-hover">
              Digital Analytics
            </span>
            <span>•</span>
            <span>5 min read</span>
          </div>
          
        </header>

        {/* Auto-generated TOC */}
        <div className="mb-12 p-6 rounded-lg border-2 border-light-accent-secondary bg-light-card-bg dark:border-dark-accent-secondary dark:bg-dark-card-bg">
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
                  className="hover:underline text-light-accent dark:text-dark-accent"
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
          
          <div className="float-right w-64 ml-6 mb-4 p-4 rounded-lg border-2 border-light-accent-secondary dark:border-dark-accent-secondary bg-light-card-bg dark:bg-dark-card-bg shadow-md">
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
          {cardData.map((card, index) => (
            <div
              key={card.id}>
              <Card
                id={card.id}
                title={card.title}
                content={card.content}
                longContent={card.longContent}
                image={card.image}
                theme={theme}
                isClicked={clickedCards.includes(card.id)} // Control glow
                onCardClick={handleCardClick} // Open modal
                onNextCard={index < cardData.length - 1 ? handleNextCard : undefined} // Next button
                onExit={handleExit} // Close modal
                isModalOpen={openCardId === card.id} // Show modal
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

        {/* Endless word loop */}
        <div className="overflow-hidden whitespace-nowrap py-4 border-t-2 border-b-2 border-dashed border-light-accent-secondary dark:border-dark-accent-secondary">
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
                  ? (Math.random() > 0.5 ? '#e74c3c' : '#3498db')
                  : (Math.random() > 0.5 ? '#f39c12' : '#9b59b6'),
                left: `${Math.random() * 100}%`,
                top: '-10px',
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 3 + 2}s`
              }}
            ></div>
          ))}
          <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full font-bold animate-toast bg-light-card-bg text-light-accent border-2 border-light-accent dark:bg-dark-card-bg dark:text-dark-accent dark:border-dark-accent shadow-lg">
            You gained 10 pts!
          </div>
        </div>
      )}
    </div>
    </div>
  );
};