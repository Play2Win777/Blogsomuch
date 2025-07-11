import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FocusTrap from 'focus-trap-react';
import { useSettingsStore } from '../store';

export const Header: React.FC = () => {
  const {
    // All original settings store props
    enableSkew,
    toggleSkew,
    skewIntensity,
    setSkewIntensity,
    largeCellPattern,
    setLargeCellPattern,
    customLargeCellIndices,
    setCustomLargeCellIndices,
    enableInfoCells,
    toggleInfoCells,
    infoCellFrequency,
    setInfoCellFrequency,
    customInfoCellIndices,
    setCustomInfoCellIndices,
    enableZIndexRandomization,
    toggleZIndexRandomization,
    enableInfoCellGradient,
    toggleInfoCellGradient,
    infoCellGradientIntensity,
    setInfoCellGradientIntensity,
    allowDuplicateProducts,
    toggleAllowDuplicateProducts,
    theme,
    setTheme,
    gridDensity,
    setGridDensity,
    productSort,
    setProductSort,
    bentoGridConfig,
    largeCellSize,
    setLargeCellSize,
    gridColumnCount,
    setGridColumnCount,
    seed,
    setSeed,
  } = useSettingsStore();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [largeCellInput, setLargeCellInput] = React.useState(customLargeCellIndices.join(', '));
  const [infoCellInput, setInfoCellInput] = React.useState(customInfoCellIndices.join(', '));
  
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const getLogo = () => {
    return theme === 'dark' 
      ? '/images/logo3.gif' 
      : '/images/logo.gif'; // Or vice versa
  };

  const handleLargeCellInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLargeCellInput(e.target.value);
    const indices = e.target.value
      .split(',')
      .map(val => parseInt(val.trim()))
      .filter(val => !isNaN(val) && val >= 0 && val < gridDensity);
    setCustomLargeCellIndices(indices);
  };

  const handleInfoCellInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfoCellInput(e.target.value);
    const indices = e.target.value
      .split(',')
      .map(val => parseInt(val.trim()))
      .filter(val => !isNaN(val) && val >= 0 && val < gridDensity);
    setCustomInfoCellIndices(indices);
  };

  return (
    <header className="px-3 py-1 bg-light-card-bg border-b border-light-accent-secondary dark:bg-dark-card-bg dark:border-dark-accent-secondary">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
      <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-md text-light-text hover:bg-light-accent-secondary/20 hover:text-light-accent dark:text-dark-text dark:hover:bg-dark-accent-secondary/20 dark:hover:text-dark-accent transition-colors"
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
        </button>

        {/* Mobile menu flyout */}
        {mobileMenuOpen && (
          <div className="absolute left-0 top-16 w-full bg-light-card-bg dark:bg-dark-card-bg shadow-lg z-40 border-t border-light-accent-secondary dark:border-dark-accent-secondary">
            <div className="flex flex-col space-y-2 p-4">
              <Link 
                to="/" 
                className="px-4 py-2 rounded-md text-light-text hover:bg-light-accent-secondary/20 hover:text-light-accent dark:text-dark-text dark:hover:bg-dark-accent-secondary/20 dark:hover:text-dark-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/bikes" 
                className="px-4 py-2 rounded-md text-light-text hover:bg-light-accent-secondary/20 hover:text-light-accent dark:text-dark-text dark:hover:bg-dark-accent-secondary/20 dark:hover:text-dark-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Bikes
              </Link>
              <Link 
                to="/accessories" 
                className="px-4 py-2 rounded-md text-light-text hover:bg-light-accent-secondary/20 hover:text-light-accent dark:text-dark-text dark:hover:bg-dark-accent-secondary/20 dark:hover:text-dark-accent transition-colorspx-4 py-2 hover:bg-light-accent-secondary/20 dark:hover:bg-dark-accent-secondary/20 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Accessories
              </Link>
              <Link 
                to="/blog" 
                className="px-4 py-2 rounded-md text-light-text hover:bg-light-accent-secondary/20 hover:text-light-accent dark:text-dark-text dark:hover:bg-dark-accent-secondary/20 dark:hover:text-dark-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
            </div>
          </div>
        )}
        <img
  src={getLogo()}
  alt="/images/8BIT.png"
  className="w-auto h-14 rounded-lg object-cover"
  />
        {/*  
        <div className="text-xl font-bold text-light-text dark:text-dark-text mx-4">
          My Store
        </div> */}
        {/* Right side icons */}
        <div className="flex items-center space-x-2">
          {/* Lightbulb theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md text-light-text hover:bg-light-accent-secondary/20 hover:text-light-accent dark:text-dark-text dark:hover:bg-dark-accent-secondary/20 dark:hover:text-dark-accent transition-colors"
            aria-label="Toggle theme"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
              <path d="M12 4v1M18 6l-1 1M20 12h-1M18 18l-1-1M12 19v1M7 17l-1 1M5 12H4M7 7l1-1"></path>
            </svg>
          </button>

          {/* Beaker settings button */}
          <button
            onClick={openModal}
            className="p-2 rounded-md text-light-text hover:bg-light-accent-secondary/20 hover:text-light-accent dark:text-dark-text dark:hover:bg-dark-accent-secondary/20 dark:hover:text-dark-accent transition-colors"
            aria-label="Open settings"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
            </svg>
          </button>
        </div>
          
      </nav>

      {/* Settings Modal - Fully Restored */}
      {isModalOpen && (
        <FocusTrap>
          <div>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={closeModal}
              aria-hidden="true"
            />

            {/* Modal Content */}
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="rounded-lg p-6 w-96 max-w-full mx-4 bg-light-card-bg dark:bg-dark-card-bg shadow-xl">
                <h2 className="text-xl font-bold mb-4 text-light-text dark:text-dark-text">
                  Settings
                </h2>
                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                  
                  {/* Skew Toggle */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={toggleSkew}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          enableSkew 
                            ? 'bg-light-accent text-light-card-bg hover:bg-light-accent/90 dark:bg-dark-accent dark:text-dark-card-bg dark:hover:bg-dark-accent/90'
                            : 'bg-gray-400 text-gray-900 hover:bg-gray-500 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500'
                        } transition-colors`}
                      >
                        {enableSkew ? 'Disable' : 'Enable'}
                      </button>
                      <span className="text-light-text dark:text-dark-text">
                        Skew: {enableSkew ? 'On' : 'Off'}
                      </span>
                    </div>
                  </div>

                  {/* Skew Intensity Slider */}
                  {enableSkew && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 w-full">
                        <label htmlFor="skew-intensity" className="text-sm text-light-text dark:text-dark-text">
                          Skew Intensity: {skewIntensity.toFixed(1)}
                        </label>
                        <input
                          id="skew-intensity"
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={skewIntensity}
                          onChange={(e) => setSkewIntensity(parseFloat(e.target.value))}
                          className="w-full accent-light-accent dark:accent-dark-accent"
                        />
                      </div>
                    </div>
                  )}

                  {/* Grid Layout Pattern Selector */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <select
                        value={largeCellPattern}
                        onChange={(e) => setLargeCellPattern(e.target.value as 'default' | 'alternate' | 'custom')}
                        className="px-3 py-1 rounded-md text-sm font-medium bg-gray-200 text-gray-900 dark:bg-gray-600 dark:text-white"
                      >
                        <option value="default">Default</option>
                        <option value="alternate">Alternate</option>
                        <option value="custom">Custom</option>
                      </select>
                      <span className="text-light-text dark:text-dark-text">
                        Grid Layout: {largeCellPattern.charAt(0).toUpperCase() + largeCellPattern.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Custom Large Cell Indices */}
                  {largeCellPattern === 'custom' && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 w-full">
                        <label htmlFor="custom-large-cell-indices" className="text-sm text-light-text dark:text-dark-text">
                          Large Cell Indices:
                        </label>
                        <input
                          id="custom-large-cell-indices"
                          type="text"
                          value={largeCellInput}
                          onChange={handleLargeCellInputChange}
                          placeholder="e.g., 0, 5, 10"
                          className="px-2 py-1 rounded-md w-full bg-gray-200 text-gray-900 dark:bg-gray-600 dark:text-white"
                        />
                      </div>
                    </div>
                  )}

                  {/* Info Cells Toggle */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={toggleInfoCells}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          enableInfoCells
                            ? 'bg-light-accent text-light-card-bg hover:bg-light-accent/90 dark:bg-dark-accent dark:text-dark-card-bg dark:hover:bg-dark-accent/90'
                            : 'bg-gray-400 text-gray-900 hover:bg-gray-500 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500'
                        } transition-colors`}
                      >
                        {enableInfoCells ? 'Disable' : 'Enable'}
                      </button>
                      <span className="text-light-text dark:text-dark-text">
                        Info Cells: {enableInfoCells ? 'On' : 'Off'}
                      </span>
                    </div>
                  </div>

                  {/* Info Cell Frequency Slider or Custom Indices */}
                  {enableInfoCells && (
                    <>
                      {largeCellPattern === 'custom' ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 w-full">
                            <label htmlFor="custom-info-cell-indices" className="text-sm text-light-text dark:text-dark-text">
                              Info Cell Indices:
                            </label>
                            <input
                              id="custom-info-cell-indices"
                              type="text"
                              value={infoCellInput}
                              onChange={handleInfoCellInputChange}
                              placeholder="e.g., 2, 7, 12"
                              className="px-2 py-1 rounded-md w-full bg-gray-200 text-gray-900 dark:bg-gray-600 dark:text-white"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 w-full">
                            <label htmlFor="info-cell-frequency" className="text-sm text-light-text dark:text-dark-text">
                              Info Cell Frequency: {(infoCellFrequency * 100).toFixed(0)}%
                            </label>
                            <input
                              id="info-cell-frequency"
                              type="range"
                              min="0"
                              max="0.5"
                              step="0.05"
                              value={infoCellFrequency}
                              onChange={(e) => setInfoCellFrequency(parseFloat(e.target.value))}
                              className="w-full accent-light-accent dark:accent-dark-accent"
                            />
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Z-Index Randomization Toggle */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={toggleZIndexRandomization}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          enableZIndexRandomization
                            ? 'bg-light-accent text-light-card-bg hover:bg-light-accent/90 dark:bg-dark-accent dark:text-dark-card-bg dark:hover:bg-dark-accent/90'
                            : 'bg-gray-400 text-gray-900 hover:bg-gray-500 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500'
                        } transition-colors`}
                      >
                        {enableZIndexRandomization ? 'Disable' : 'Enable'}
                      </button>
                      <span className="text-light-text dark:text-dark-text">
                        Z-Index Randomization: {enableZIndexRandomization ? 'On' : 'Off'}
                      </span>
                    </div>
                  </div>

                  {/* Info Cell Gradient Toggle */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={toggleInfoCellGradient}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          enableInfoCellGradient
                            ? 'bg-light-accent text-light-card-bg hover:bg-light-accent/90 dark:bg-dark-accent dark:text-dark-card-bg dark:hover:bg-dark-accent/90'
                            : 'bg-gray-400 text-gray-900 hover:bg-gray-500 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500'
                        } transition-colors`}
                      >
                        {enableInfoCellGradient ? 'Disable' : 'Enable'}
                      </button>
                      <span className="text-light-text dark:text-dark-text">
                        Info Cell Gradient: {enableInfoCellGradient ? 'On' : 'Off'}
                      </span>
                    </div>
                  </div>

                  {/* Info Cell Gradient Intensity Slider */}
                  {enableInfoCellGradient && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 w-full">
                        <label htmlFor="info-cell-gradient-intensity" className="text-sm text-light-text dark:text-dark-text">
                          Gradient Intensity: {infoCellGradientIntensity.toFixed(1)}
                        </label>
                        <input
                          id="info-cell-gradient-intensity"
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={infoCellGradientIntensity}
                          onChange={(e) => setInfoCellGradientIntensity(parseFloat(e.target.value))}
                          className="w-full accent-light-accent dark:accent-dark-accent"
                        />
                      </div>
                    </div>
                  )}

                  {/* Allow Duplicate Products Toggle */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={toggleAllowDuplicateProducts}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          allowDuplicateProducts
                            ? 'bg-light-accent text-light-card-bg hover:bg-light-accent/90 dark:bg-dark-accent dark:text-dark-card-bg dark:hover:bg-dark-accent/90'
                            : 'bg-gray-400 text-gray-900 hover:bg-gray-500 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500'
                        } transition-colors`}
                      >
                        {allowDuplicateProducts ? 'Disable' : 'Enable'}
                      </button>
                      <span className="text-light-text dark:text-dark-text">
                        Duplicate Products: {allowDuplicateProducts ? 'Allowed' : 'Not Allowed'}
                      </span>
                    </div>
                  </div>

                  {/* Theme Toggle */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          theme === 'dark'
                            ? 'bg-gray-600 text-white hover:bg-gray-500'
                            : 'bg-gray-400 text-gray-900 hover:bg-gray-300'
                        } transition-colors`}
                      >
                        Toggle Theme
                      </button>
                      <span className="text-light-text dark:text-dark-text">
                        Theme: {theme === 'dark' ? 'Dark' : 'Light'}
                      </span>
                    </div>
                  </div>

                  {/* Grid Density Selector */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <select
                        value={gridDensity}
                        onChange={(e) => setGridDensity(parseInt(e.target.value) as 12 | 24 | 36)}
                        className="px-3 py-1 rounded-md text-sm font-medium bg-gray-200 text-gray-900 dark:bg-gray-600 dark:text-white"
                      >
                        <option value={12}>12 Cells</option>
                        <option value={24}>24 Cells</option>
                        <option value={36}>36 Cells</option>
                      </select>
                      <span className="text-light-text dark:text-dark-text">
                        Grid Density: {gridDensity} Cells
                      </span>
                    </div>
                  </div>

                  {/* Product Sorting Selector */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <select
                        value={productSort}
                        onChange={(e) =>
                          setProductSort(e.target.value as 'random' | 'price-asc' | 'price-desc' | 'category')
                        }
                        className="px-3 py-1 rounded-md text-sm font-medium bg-gray-200 text-gray-900 dark:bg-gray-600 dark:text-white"
                      >
                        <option value="random">Random</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="category">Category</option>
                      </select>
                      <span className="text-light-text dark:text-dark-text">
                        Product Sort: {productSort === 'random' ? 'Random' : productSort === 'price-asc' ? 'Price (Low to High)' : productSort === 'price-desc' ? 'Price (High to Low)' : 'Category'}
                      </span>
                    </div>
                  </div>

                  {/* Large Cell Size Selector */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <select
                        value={largeCellSize}
                        onChange={(e) => setLargeCellSize(e.target.value as '2x2' | '3x3')}
                        className="px-3 py-1 rounded-md text-sm font-medium bg-gray-200 text-gray-900 dark:bg-gray-600 dark:text-white"
                      >
                        <option value="2x2">2x2</option>
                        <option value="3x3">3x3</option>
                      </select>
                      <span className="text-light-text dark:text-dark-text">
                        Large Cell Size: {largeCellSize}
                      </span>
                    </div>
                  </div>

                  {/* Grid Column Count Selector */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <select
                        value={gridColumnCount}
                        onChange={(e) => setGridColumnCount(parseInt(e.target.value) as 2 | 4 | 6)}
                        className="px-3 py-1 rounded-md text-sm font-medium bg-gray-200 text-gray-900 dark:bg-gray-600 dark:text-white"
                      >
                        <option value={2}>2 Columns</option>
                        <option value={4}>4 Columns</option>
                        <option value={6}>6 Columns</option>
                      </select>
                      <span className="text-light-text dark:text-dark-text">
                        Grid Columns: {gridColumnCount}
                      </span>
                    </div>
                  </div>

                  {/* Seed Input */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 w-full">
                      <label htmlFor="seed" className="text-sm text-light-text dark:text-dark-text">
                        Seed:
                      </label>
                      <input
                        id="seed"
                        type="number"
                        value={seed}
                        onChange={(e) => setSeed(parseInt(e.target.value) || 0)}
                        className="px-2 py-1 rounded-md w-full bg-gray-200 text-gray-900 dark:bg-gray-600 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Bento Grid Configuration Info */}
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">
                      Bento Grid Configuration
                    </h3>
                    <p className="text-sm text-light-text/70 dark:text-dark-text/70">
                      Large Cell Indices: {bentoGridConfig.largeCellIndices.join(', ') || 'None'}
                    </p>
                    <p className="text-sm text-light-text/70 dark:text-dark-text/70">
                      Large Cell Size: {bentoGridConfig.largeCellSize}
                    </p>
                    <p className="text-sm text-light-text/70 dark:text-dark-text/70">
                      Info Cell Indices: {bentoGridConfig.infoCellIndices.join(', ') || 'None'}
                    </p>
                    <p className="text-sm text-light-text/70 dark:text-dark-text/70">
                      Seed: {bentoGridConfig.seed}
                    </p>
                    <p className="text-sm text-light-text/70 dark:text-dark-text/70">
                      Column Count: {bentoGridConfig.columnCount}
                    </p>
                    <p className="text-xs mt-2 text-light-text/50 dark:text-dark-text/50">
                      To reproduce this layout, set Grid Layout, Info Cells, Grid Density, Large Cell Size, Grid Columns, and Seed to these values.
                    </p>
                  </div>
                </div>

                {/* Close Button */}
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 rounded-md bg-light-accent text-light-card-bg hover:bg-light-accent/90 dark:bg-dark-accent dark:text-dark-card-bg dark:hover:bg-dark-accent/90 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </FocusTrap>
      )}
    </header>
  );
};