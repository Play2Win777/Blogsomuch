// src/pages/Bikes.tsx
import React from 'react';

// Helper function to get a random skew value with slightly reduced effect
const getRandomSkew = () => {
  const skewX = Math.random() * 8 - 4; // Random value between -4 and 4
  const skewY = Math.random() * 8 - 4;
  const scale = 1.05 + (Math.random() * 0.1); // Random scale between 1.05 and 1.15
  return `skew(${skewX}deg, ${skewY}deg) scale(${scale})`;
};

// Updated array with working images and new additions
const images = [
  'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1619771914272-e3c1ba17ba4d?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1622185135505-2d795003994a?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1682687220742-aba19b51f36e?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1682687221038-404670d5f7fe?auto=format&fit=crop&q=80'
];

function Bikes() {
  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 text-center">Bento Grid Gallery</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 24 }).map((_, index) => {
            const isLargeCell = index % 5 === 0;
            const shouldBeImageCell = Math.random() < 0.85;
            const spanClasses = isLargeCell ? 'col-span-2 row-span-2' : '';
            const imageIndex = Math.floor(Math.random() * images.length);
            
            if (shouldBeImageCell || isLargeCell) {
              return (
                <div 
                  key={index}
                  className={`relative overflow-visible rounded-xl ${spanClasses} transition-transform duration-300 hover:z-50`}
                  style={{ 
                    transform: getRandomSkew(),
                    zIndex: Math.floor(Math.random() * 10)
                  }}
                >
                  <img
                    src={images[imageIndex]}
                    alt={`Gallery Image ${index + 1}`}
                    className="w-full h-full object-cover rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                  />
                </div>
              );
            }

            return (
              <div
                key={index}
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

export default Bikes;