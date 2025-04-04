// src/pages/Accessories.tsx
import React, { useState, useEffect } from 'react';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';

const getRandomSkew = () => {
  const skewX = Math.random() * 8 - 4;
  const skewY = Math.random() * 8 - 4;
  const scale = 1.05 + (Math.random() * 0.1);
  return `skew(${skewX}deg, ${skewY}deg) scale(${scale})`;
};

const generateGridData = () => {
  return Array.from({ length: 24 }).map((_, index) => {
    const isLargeCell = index % 5 === 0;
    const shouldBeImageCell = Math.random() < 0.85;
    const spanClasses = isLargeCell ? 'col-span-2 row-span-2' : '';
    const productIndex = Math.floor(Math.random() * products.length);
    const product = products[productIndex];
    const cellKey = `cell-${index}`;

    return {
      cellKey,
      isLargeCell,
      shouldBeImageCell,
      spanClasses,
      product,
    };
  });
};

function Accessories() {
  const [expandedCellKey, setExpandedCellKey] = useState<string | null>(null);
  const [gridData, setGridData] = useState<ReturnType<typeof generateGridData>>([]);

  useEffect(() => {
    setGridData(generateGridData());
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 text-center">Accessories Gallery</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gridData.map(({ cellKey, isLargeCell, shouldBeImageCell, spanClasses, product }) => {
            if (shouldBeImageCell || isLargeCell) {
              const isExpanded = expandedCellKey === cellKey;

              return (
                <div 
                  key={cellKey}
                  className={`relative overflow-visible rounded-xl ${spanClasses} transition-transform duration-300 hover:z-50`}
                  style={{ 
                    transform: isExpanded ? 'none' : getRandomSkew(),
                    zIndex: isExpanded ? 50 : Math.floor(Math.random() * 10)
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
                className="bg-gradient-to-br from-purple-600 to-blue-700 p-4 rounded-xl flex items-center justify-center text-white text-center font-medium shadow-lg hover:from-purple-700 hover:to-blue-800 transition-colors"
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

export default Accessories;