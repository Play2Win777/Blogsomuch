// src/components/ProductCard.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Product } from '../types';
import { NeonBorder } from './NeonBorder';

interface ProductCardProps {
  product: Product;
  isExpanded: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isExpanded,
  onExpand,
  onCollapse,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <AnimatePresence>
      {isExpanded ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
          onClick={onCollapse}
        >
          <motion.div
            className="relative w-full max-w-4xl z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <NeonBorder isActive>
              <div className="relative aspect-[16/9] w-full">
                <motion.img
                  key={currentImageIndex}
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
                <button
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                  onClick={onCollapse}
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
              <div className="p-6 bg-black text-white">
                <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                <p className="text-xl text-cyan-400 mb-4">${product.price.toFixed(2)}</p>
                <p className="text-gray-300 mb-4">{product.description}</p>
                <button
                  className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500
                           text-white font-bold py-3 px-6 rounded-lg
                           hover:opacity-90 transition-opacity"
                >
                  Add to Cart
                </button>
              </div>
            </NeonBorder>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          layout
          className="h-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onClick={onExpand}
        >
          <NeonBorder>
            <div className="relative aspect-square">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </NeonBorder>
        </motion.div>
      )}
    </AnimatePresence>
  );
};