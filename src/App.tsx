import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProductCard } from './components/ProductCard';
import { Header } from './components/Header';
import Bikes from './pages/Bikes';
import Accessories from './pages/Accessories';
import { supabase } from './supabaseClient';
import { Product } from './types';
import { useSettingsStore } from './store';
import { ThemeProvider } from './components/blog/ThemeContext';
import BlogPage from './pages/BlogPage';
import './styles/blog.css';
import Cheatsheet from './pages/Cheatsheet';
import Websites from './pages/Websites';


// Simple seedable random number generator
const mulberry32 = (seed: number) => {
  return function () {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

const getRandomSkew = (intensity: number = 1, random: () => number) => {
  if (intensity === 0) {
    return 'none';
  }
  const maxSkew = 8 * intensity;
  const skewX = random() * maxSkew - maxSkew / 2;
  const skewY = random() * maxSkew - maxSkew / 2;
  const maxScale = 1.05 + (0.1 * intensity);
  const scale = 1 + (maxScale - 1) * intensity;
  return `skew(${skewX}deg, ${skewY}deg) scale(${scale})`;
};

interface GridItem {
  cellKey: string;
  isLargeCell: boolean;
  shouldBeImageCell: boolean;
  spanClasses: string;
  product: Product;
}

const generateGridData = (
  products: Product[],
  largeCellPattern: 'default' | 'alternate' | 'custom',
  customLargeCellIndices: number[],
  enableInfoCells: boolean,
  infoCellFrequency: number,
  customInfoCellIndices: number[],
  gridDensity: number,
  allowDuplicateProducts: boolean,
  productSort: 'random' | 'price-asc' | 'price-desc' | 'category',
  largeCellSize: '2x2' | '3x3',
  gridColumnCount: 2 | 4 | 6,
  seed: number,
  setBentoGridConfig: (config: {
    largeCellIndices: number[];
    largeCellSize: '2x2' | '3x3';
    infoCellIndices: number[];
    seed: number;
    columnCount: 2 | 4 | 6;
  }) => void
): GridItem[] => {
  const gridItems: GridItem[] = [];
  let largeCellCounter = 0;
  const largeCellIndices: number[] = [];
  const infoCellIndices: number[] = [];
  const usedProductIndices: Set<number> = new Set();
  const random = mulberry32(seed);

  // Sort products based on the selected sort option
  let sortedProducts = [...products];
  if (productSort === 'price-asc') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (productSort === 'price-desc') {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (productSort === 'category') {
    sortedProducts.sort((a, b) => (a.category || '').localeCompare(b.category || ''));
  }

  for (let index = 0; index < gridDensity; index++) {
    // Determine if this cell should be large
    let isLargeCell = false;
    if (largeCellPattern === 'custom') {
      isLargeCell = customLargeCellIndices.includes(index);
    } else {
      const shouldBeLargeCell = largeCellPattern === 'default' ? index % 5 === 0 : index % 3 === 0;
      isLargeCell = shouldBeLargeCell;
    }
    if (isLargeCell) {
      largeCellIndices.push(index);
      largeCellCounter++;
    }

    // Determine if this cell should be an image cell
    let shouldBeImageCell = true;
    if (enableInfoCells) {
      if (largeCellPattern === 'custom' && customInfoCellIndices.includes(index)) {
        shouldBeImageCell = false;
      } else {
        shouldBeImageCell = random() < (1 - infoCellFrequency);
      }
    }
    // Ensure large cells are always image cells
    if (isLargeCell) {
      shouldBeImageCell = true;
    } else if (!shouldBeImageCell) {
      infoCellIndices.push(index);
    }

    // Determine column position for large cells
    let spanClasses = '';
    if (isLargeCell) {
      const spanSize = largeCellSize === '2x2' ? 2 : 3;
      spanClasses = `col-span-${spanSize} row-span-${spanSize}`;
      if (largeCellPattern === 'alternate') {
        const isLeft = largeCellCounter % 2 === 0;
        // Adjust col-start to fit within the gridColumnCount
        const colStart = isLeft ? 1 : Math.max(1, gridColumnCount - spanSize + 1);
        spanClasses += ` col-start-${colStart}`;
      } else if (largeCellPattern === 'custom') {
        // Calculate col-start based on index and gridColumnCount
        const row = Math.floor(index / gridColumnCount);
        const col = index % gridColumnCount;
        const colStart = col + 1;
        // Ensure the large cell fits within the grid
        if (colStart + spanSize - 1 <= gridColumnCount) {
          spanClasses += ` col-start-${colStart}`;
        } else {
          // Adjust to fit within the grid
          spanClasses += ` col-start-${Math.max(1, gridColumnCount - spanSize + 1)}`;
        }
      }
    }

    // Select a product
    let productIndex: number;
    if (allowDuplicateProducts) {
      productIndex = Math.floor(random() * sortedProducts.length);
    } else {
      const availableIndices = sortedProducts
        .map((_, idx) => idx)
        .filter((idx) => !usedProductIndices.has(idx));
      if (availableIndices.length === 0) {
        usedProductIndices.clear();
        productIndex = Math.floor(random() * sortedProducts.length);
      } else {
        productIndex = availableIndices[Math.floor(random() * availableIndices.length)];
      }
      usedProductIndices.add(productIndex);
    }

    const product = sortedProducts[productIndex];
    const cellKey = `cell-${index}`;

    gridItems.push({
      cellKey,
      isLargeCell,
      shouldBeImageCell,
      spanClasses,
      product,
    });
  }

  // Save the Bento grid configuration
  setBentoGridConfig({ largeCellIndices, largeCellSize, infoCellIndices, seed, columnCount: gridColumnCount });

  return gridItems;
};

function Home() {
  const {
    enableSkew,
    skewIntensity,
    largeCellPattern,
    customLargeCellIndices,
    enableInfoCells,
    infoCellFrequency,
    customInfoCellIndices,
    enableZIndexRandomization,
    enableInfoCellGradient,
    infoCellGradientIntensity,
    allowDuplicateProducts,
    theme,
    gridDensity,
    productSort,
    largeCellSize,
    gridColumnCount,
    seed,
    setBentoGridConfig,
  } = useSettingsStore();

  const [expandedCellKey, setExpandedCellKey] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Create a seeded random function
  const random = useMemo(() => mulberry32(seed), [seed]);

  // Memoize grid data to prevent unnecessary re-renders
  const gridData = useMemo(() => {
    if (products.length === 0) return [];
    return generateGridData(
      products,
      largeCellPattern,
      customLargeCellIndices,
      enableInfoCells,
      infoCellFrequency,
      customInfoCellIndices,
      gridDensity,
      allowDuplicateProducts,
      productSort,
      largeCellSize,
      gridColumnCount,
      seed,
      setBentoGridConfig
    );
  }, [
    products,
    largeCellPattern,
    customLargeCellIndices,
    enableInfoCells,
    infoCellFrequency,
    customInfoCellIndices,
    gridDensity,
    allowDuplicateProducts,
    productSort,
    largeCellSize,
    gridColumnCount,
    seed,
    setBentoGridConfig,
  ]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products_view')
          .select('id, name, description, cost_price, discount_percentage, media_urls, category');

        if (error) throw error;

        const fetchedProducts: Product[] = data.map((item) => ({
          ...item,
          price: item.cost_price * 1.7,
          images: item.media_urls,
        }));

        setProducts(fetchedProducts);
        setLoading(false);
      } catch (err: any) {
        setError(`Failed to fetch products: ${err.message}`);
        setLoading(false);
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} flex items-center justify-center`}>
        <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} flex items-center justify-center`}>
        <p className="text-red-400 text-xl">{error}</p>
      </div>
    );
  }

  const getGradientColors = (intensity: number) => {
    if (intensity === 0) {
      return theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300';
    }
    const fromColor = `from-purple-${Math.round(600 - (intensity * 100))} `;
    const toColor = `to-blue-${Math.round(700 - (intensity * 100))}`;
    return `bg-gradient-to-br ${fromColor} ${toColor} hover:from-purple-${Math.round(
      700 - (intensity * 100)
    )} hover:to-blue-${Math.round(800 - (intensity * 100))}`;
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} p-4 md:p-8`}>
      <div className="max-w-7xl mx-auto">
        <h1 className={`text-4xl md:text-6xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-8 text-center`}>
          Products Gallery
        </h1>
        
        <div className={`grid grid-cols-2 md:grid-cols-${gridColumnCount} gap-4`}>
          {gridData.map(({ cellKey, isLargeCell, shouldBeImageCell, spanClasses, product }) => {
            if (shouldBeImageCell || isLargeCell) {
              const isExpanded = expandedCellKey === cellKey;

              return (
                <div 
                  key={cellKey}
                  className={`relative overflow-visible rounded-xl ${spanClasses} transition-transform duration-300 hover:z-50`}
                  style={{ 
                    transform: isExpanded || !enableSkew ? 'none' : getRandomSkew(skewIntensity, random),
                    zIndex: isExpanded ? 50 : enableZIndexRandomization ? Math.floor(random() * 10) : 0,
                  }}
                >
                  <ProductCard
                    product={product}
                    isExpanded={isExpanded}
                    onExpand={() => setExpandedCellKey(cellKey)}
                    onCollapse={() => setExpandedCellKey(null)}
                  />
                </div>
              );
            }

            return (
              <div
                key={cellKey}
                className={`p-4 rounded-xl flex items-center justify-center ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                } text-center font-medium shadow-lg transition-colors ${
                  enableInfoCellGradient ? getGradientColors(infoCellGradientIntensity) : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
                }`}
              >
                <p className="text-sm md:text-base">This is an information cell</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function App() {
  const { theme } = useSettingsStore();

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bikes" element={<Bikes />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/blog" element={  // For direct /blog access
          <ThemeProvider>
            <BlogPage />
          </ThemeProvider>
        } />
        <Route path="/blog/:slug" element={  // For specific posts
          <ThemeProvider>
            <BlogPage />
          </ThemeProvider>
        } />
        <Route path="/cheatsheet" element={<Cheatsheet />} />
        <Route path="/websites" element={<Websites />} />
      </Routes>
    </div>
  );
}

export default App;