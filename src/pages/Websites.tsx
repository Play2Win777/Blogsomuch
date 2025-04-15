// src/pages/Websites.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Bookmark, ExternalLink, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Define Website interface
interface Website {
  id: string;
  url: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
}

const initialWebsites: Website[] = [
  {
    id: '1',
    url: 'https://unicornplatform.com/',
    title: 'Unicorn Platform',
    description: 'Unicorn Platform is a drag-and-drop builder for creating professional websites without coding.',
    imageUrl: 'https://picsum.photos/id/237/400/300',
    tags: ['website builder', 'no-code', 'drag-and-drop'],
  },
  {
    id: '2',
    url: 'https://basehub.com/play2win777/8bitdesigns/dev/main/dev:connect',
    title: 'Basehub 8Bit Designs',
    description: 'Basehub site showcasing 8Bit Designs.',
    imageUrl: 'https://picsum.photos/id/238/400/300',
    tags: ['portfolio', 'web design', '8bit'],
  },
  {
    id: '3',
    url: 'https://www.ninjatools.ai/playground',
    title: 'NinjaTools AI Playground',
    description: 'AI Playground by NinjaTools.',
    imageUrl: 'https://picsum.photos/id/239/400/300',
    tags: ['AI', 'playground', 'machine learning'],
  },
  {
    id: '4',
    url: 'https://clerk.com/',
    title: 'Clerk',
    description: 'Clerk provides authentication and user management solutions.',
    imageUrl: 'https://picsum.photos/id/240/400/300',
    tags: ['authentication', 'user management', 'security'],
  },
  {
    id: '5',
    url: 'https://www.prisma.io',
    title: 'Prisma',
    description: 'Prisma simplifies database access with a modern ORM.',
    imageUrl: 'https://picsum.photos/id/241/400/300',
    tags: ['database', 'orm', 'developer tools'],
  },
  {
    id: '6',
    url: 'https://www.linkedin.com/',
    title: 'LinkedIn',
    description: 'LinkedIn is a professional networking platform.',
    imageUrl: 'https://picsum.photos/id/242/400/300',
    tags: ['social media', 'professional', 'networking'],
  },
  {
    id: '7',
    url: 'https://unsplash.com/',
    title: 'Unsplash',
    description: 'Unsplash offers high-quality, free stock photos.',
    imageUrl: 'https://picsum.photos/id/243/400/300',
    tags: ['photography', 'stock images', 'creative'],
  },
  {
    id: '8',
    url: 'https://www.unicorn.studio/',
    title: 'Unicorn Studio',
    description: 'Website for Unicorn Studio.',
    imageUrl: 'https://picsum.photos/id/244/400/300',
    tags: ['studio', 'design', 'creative'],
  },
  {
    id: '9',
    url: 'https://resend.com',
    title: 'Resend',
    description: 'Resend provides transactional email services.',
    imageUrl: 'https://picsum.photos/id/245/400/300',
    tags: ['email', 'transactional', 'api'],
  },
  {
    id: '10',
    url: 'https://p2wgames.onrender.com/',
    title: 'P2W Games',
    description: 'P2W Games is a platform for play-to-win games.',
    imageUrl: 'https://picsum.photos/id/246/400/300',
    tags: ['games', 'play-to-win', 'platform'],
  },
  {
    id: '11',
    url: 'https://bloggingtrial.vercel.app/blog',
    title: 'Blogging Trial',
    description: 'Blogging Trial is a platform for blogging.',
    imageUrl: 'https://picsum.photos/id/247/400/300',
    tags: ['blogging', 'platform', 'articles'],
  },
  {
    id: '12',
    url: 'https://deepai.org/machine-learning-model/watercolor-painting-generator',
    title: 'DeepAI Watercolor',
    description: 'DeepAI Watercolor Painting Generator.',
    imageUrl: 'https://picsum.photos/id/248/400/300',
    tags: ['AI', 'image generation', 'watercolor'],
  },
  {
    id: '13',
    url: 'https://janusproai.org/janus-pro',
    title: 'JanusPro AI',
    description: 'JanusPro AI is a platform for AI tools.',
    imageUrl: 'https://picsum.photos/id/249/400/300',
    tags: ['AI', 'tools', 'platform'],
  },
  {
    id: '14',
    url: 'https://www.clay.com',
    title: 'Clay',
    description: 'Clay is a platform for social networking and collaboration.',
    imageUrl: 'https://picsum.photos/id/250/400/300',
    tags: ['social media', 'networking', 'collaboration'],
  },
  {
    id: '15',
    url: 'https://grok.com',
    title: 'Grok AI',
    description: 'Grok is an AI platform for answering questions and insights.',
    imageUrl: 'https://picsum.photos/id/251/400/300',
    tags: ['AI', 'chat', 'platform'],
  },
];

const Websites: React.FC = () => {
  const [websites, setWebsites] = useState<Website[]>(initialWebsites);
  const [selectedWebsite, setSelectedWebsite] = useState<Website | null>(null);
  const [newWebsite, setNewWebsite] = useState({
    url: '',
    title: '',
    description: '',
    tags: '',
    imageUrl: '',
  });
  const navigate = useNavigate();

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewWebsite((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission to add new website
  const handleAddWebsite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWebsite.url || !newWebsite.title) return;

    const newId = (parseInt(websites[websites.length - 1]?.id || '0') + 1).toString();
    const tagsArray = newWebsite.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    const website: Website = {
      id: newId,
      url: newWebsite.url.startsWith('http') ? newWebsite.url : `https://${newWebsite.url}`,
      title: newWebsite.title,
      description: newWebsite.description || 'No description provided.',
      imageUrl: newWebsite.imageUrl || 'https://picsum.photos/400/300',
      tags: tagsArray,
    };

    setWebsites((prev) => [...prev, website]);
    setNewWebsite({ url: '', title: '', description: '', tags: '', imageUrl: '' });

    // Optional: Save to localStorage
    // localStorage.setItem('websites', JSON.stringify([...websites, website]));
  };

  // Handle delete website
  const handleDelete = (id: string) => {
    setWebsites((prev) => prev.filter((website) => website.id !== id));
    if (selectedWebsite?.id === id) setSelectedWebsite(null);

    // Optional: Update localStorage
    // localStorage.setItem('websites', JSON.stringify(websites.filter((w) => w.id !== id)));
  };

  // Handle card click to show details
  const handleCardClick = (website: Website) => {
    setSelectedWebsite(website);
  };

  // Close details modal
  const handleCloseDetails = () => {
    setSelectedWebsite(null);
  };

  // Handle like button
  const handleLike = (websiteId: string) => {
    console.log('Liked website:', websiteId);
  };

  // Handle save to favorites
  const handleSave = (websiteId: string) => {
    console.log('Saved website:', websiteId);
  };

  // Handle outside click for modal
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseDetails();
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-darkBg text-coolGray dark:text-lightGray font-inter">
      {/* Header */}
      <header className="bg-navy text-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold">Website Showcase</h1>
        </div>
      </header>

      {/* Add Website Form */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Add New Website</h2>
        <form onSubmit={handleAddWebsite} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-lightGray dark:bg-cardDark p-6 rounded-xl">
          <div>
            <label className="block text-sm font-medium mb-1">URL</label>
            <input
              type="text"
              name="url"
              value={newWebsite.url}
              onChange={handleInputChange}
              placeholder="https://example.com"
              className="w-full p-2 rounded border border-coolGray dark:border-hoverBlue bg-white dark:bg-darkBg text-coolGray dark:text-lightGray"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={newWebsite.title}
              onChange={handleInputChange}
              placeholder="Website Name"
              className="w-full p-2 rounded border border-coolGray dark:border-hoverBlue bg-white dark:bg-darkBg text-coolGray dark:text-lightGray"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={newWebsite.description}
              onChange={handleInputChange}
              placeholder="Brief description"
              className="w-full p-2 rounded border border-coolGray dark:border-hoverBlue bg-white dark:bg-darkBg text-coolGray dark:text-lightGray"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              name="tags"
              value={newWebsite.tags}
              onChange={handleInputChange}
              placeholder="tag1, tag2, tag3"
              className="w-full p-2 rounded border border-coolGray dark:border-hoverBlue bg-white dark:bg-darkBg text-coolGray dark:text-lightGray"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Image URL (optional)</label>
            <input
              type="text"
              name="imageUrl"
              value={newWebsite.imageUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
              className="w-full p-2 rounded border border-coolGray dark:border-hoverBlue bg-white dark:bg-darkBg text-coolGray dark:text-lightGray"
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-electric text-white px-4 py-2 rounded-lg hover:bg-hoverBlue transition-colors"
            >
              Add Website
            </button>
          </div>
        </form>
      </section>

      {/* Website Cards */}
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 max-w-7xl mx-auto">
          {websites.map((website) => (
            <div
              key={website.id}
              className="flex flex-col md:flex-row md:gap-x-16"
              onClick={() => handleCardClick(website)}
            >
              {/* Left Column */}
              <div className="md:w-1/4 p-6 bg-lightGray dark:bg-hoverBlue rounded-xl flex items-center justify-center">
                <h3 className="text-lg font-semibold text-coolGray dark:text-white text-center">
                  {website.title}
                </h3>
              </div>
              {/* Right Column */}
              <motion.div
                className="md:w-3/4 bg-white dark:bg-cardDark rounded-xl overflow-hidden shadow-lg hover:shadow-card-hover relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* 16:9 Live Preview with Fallback */}
                <div className="w-full aspect-video bg-gray-200 relative">
                  <iframe
                    src={website.url}
                    title={website.title}
                    className="w-full h-full"
                    sandbox="allow-scripts allow-same-origin"
                    loading="lazy"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                  <img
                    src={website.imageUrl}
                    alt={website.title}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    style={{ display: iframeFailed(website.url) ? 'block' : 'none' }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{website.title}</h3>
                  <p className="text-coolGray text-base mt-2">{website.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {website.tags.map((tag) => (
                      <span
                        key={`${website.id}-${tag}`}
                        className="text-xs bg-lightGray dark:bg-hoverBlue text-coolGray dark:text-white px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(website.id);
                    }}
                    className="p-2 bg-white dark:bg-cardDark rounded-full hover:bg-electric hover:text-white transition-colors"
                  >
                    <Heart size={20} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSave(website.id);
                    }}
                    className="p-2 bg-white dark:bg-cardDark rounded-full hover:bg-electric hover:text-white transition-colors"
                  >
                    <Bookmark size={20} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(website.id);
                    }}
                    className="p-2 bg-white dark:bg-cardDark rounded-full hover:bg-red-500 hover:text-white transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </main>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedWebsite && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleOutsideClick}
          >
            <motion.div
              className="bg-white dark:bg-cardDark rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <button
                  onClick={handleCloseDetails}
                  className="absolute top-4 right-4 text-coolGray hover:text-electric"
                >
                  ✕
                </button>
                {/* 16:9 Live Preview in Modal with Fallback */}
                <div className="w-full aspect-video bg-gray-200 mb-4 rounded-lg overflow-hidden relative">
                  <iframe
                    src={selectedWebsite.url}
                    title={selectedWebsite.title}
                    className="w-full h-full"
                    sandbox="allow-scripts allow-same-origin"
                    loading="lazy"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                  <img
                    src={selectedWebsite.imageUrl}
                    alt={selectedWebsite.title}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    style={{ display: iframeFailed(selectedWebsite.url) ? 'block' : 'none' }}
                  />
                </div>
                <h2 className="text-2xl font-bold mb-2">{selectedWebsite.title}</h2>
                <p className="text-coolGray mb-4">{selectedWebsite.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedWebsite.tags.map((tag) => (
                    <span
                      key={`${selectedWebsite.id}-${tag}`}
                      className="text-xs bg-lightGray dark:bg-hoverBlue text-coolGray dark:text-white px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 mb-4">
                  <a
                    href={selectedWebsite.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-electric text-white px-4 py-2 rounded-lg hover:bg-hoverBlue transition-colors"
                  >
                    Visit Live Site <ExternalLink size={16} />
                  </a>
                  <button
                    onClick={() => handleSave(selectedWebsite.id)}
                    className="flex items-center gap-2 border border-electric text-electric px-4 py-2 rounded-lg hover:bg-electric hover:text-white transition-colors"
                  >
                    Save to Favorites <Bookmark size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(selectedWebsite.id)}
                    className="flex items-center gap-2 border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                  >
                    Delete <Trash2 size={16} />
                  </button>
                </div>
                <div className="border-t border-lightGray dark:border-hoverBlue pt-4">
                  <h3 className="text-lg font-semibold mb-2">Metadata</h3>
                  <p className="text-coolGray">
                    <strong>URL:</strong>{' '}
                    <a href={selectedWebsite.url} target="_blank" rel="noopener noreferrer" className="underline">
                      {selectedWebsite.url}
                    </a>
                  </p>
                </div>
                {/* Comments Section (Stub) */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Comments</h3>
                  <p className="text-coolGray">No comments yet. Be the first to comment!</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Helper to check URLs known to fail in iframes
const iframeFailed = (url: string) => {
  const blockedDomains = [
    'linkedin.com',
    'clerk.com',
    'prisma.io',
    'unicornplatform.com',
    'janusproai.org',
    'unicorn.studio',
  ];
  return blockedDomains.some((domain) => url.includes(domain));
};

export default Websites;