import React from 'react';
import { Link } from 'react-router-dom';
import { FaCog } from 'react-icons/fa';
import FocusTrap from 'focus-trap-react';
import { useSettingsStore } from '../store';

export const Header: React.FC = () => {
  const {
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

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [largeCellInput, setLargeCellInput] = React.useState(customLargeCellIndices.join(', '));
  const [infoCellInput, setInfoCellInput] = React.useState(customInfoCellIndices.join(', '));

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLargeCellInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLargeCellInput(e.target.value);
    const indices = e.target.value
      .split(',')
      .map((val) => parseInt(val.trim()))
      .filter((val) => !isNaN(val) && val >= 0 && val < gridDensity);
    setCustomLargeCellIndices(indices);
  };

  const handleInfoCellInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfoCellInput(e.target.value);
    const indices = e.target.value
      .split(',')
      .map((val) => parseInt(val.trim()))
      .filter((val) => !isNaN(val) && val >= 0 && val < gridDensity);
    setCustomInfoCellIndices(indices);
  };

  return (
    <header className={`p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          My Store
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/" className={theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-600'}>
            Home
          </Link>
          <Link to="/bikes" className={theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-600'}>
            Bikes
          </Link>
          <Link to="/accessories" className={theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-600'}>
            Accessories
          </Link>
          <button
            onClick={openModal}
            className={`${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-600'} focus:outline-none`}
            aria-label="Open settings"
          >
            <FaCog className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Modal */}
      {isModalOpen && (
        <FocusTrap>
          <div>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={closeModal}
              aria-hidden="true"
            ></div>

            {/* Modal Content */}
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className={`rounded-lg p-6 w-96 max-w-full mx-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Settings
                </h2>
                <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                  {/* Skew Toggle */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={toggleSkew}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          enableSkew
                            ? theme === 'dark'
                              ? 'bg-purple-600 hover:bg-purple-700'
                              : 'bg-purple-400 hover:bg-purple-500'
                            : theme === 'dark'
                            ? 'bg-gray-600 hover:bg-gray-700'
                            : 'bg-gray-400 hover:bg-gray-500'
                        } ${theme === 'dark' ? 'text-white' : 'text-gray-900'} transition-colors`}
                      >
                        {enableSkew ? 'Disable' : 'Enable'}
                      </button>
                      <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                        Skew: {enableSkew ? 'On' : 'Off'}
                      </span>
                    </div>
                  </div>

                  {/* Skew Intensity Slider */}
                  {enableSkew && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 w-full">
                        <label
                          htmlFor="skew-intensity"
                          className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                        >
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
                          className="w-full"
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
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-400 text-gray-900'
                        }`}
                      >
                        <option value="default">Default</option>
                        <option value="alternate">Alternate</option>
                        <option value="custom">Custom</option>
                      </select>
                      <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                        Grid Layout: {largeCellPattern.charAt(0).toUpperCase() + largeCellPattern.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Custom Large Cell Indices */}
                  {largeCellPattern === 'custom' && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 w-full">
                        <label
                          htmlFor="custom-large-cell-indices"
                          className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                        >
                          Large Cell Indices:
                        </label>
                        <input
                          id="custom-large-cell-indices"
                          type="text"
                          value={largeCellInput}
                          onChange={handleLargeCellInputChange}
                          placeholder="e.g., 0, 5, 10"
                          className={`px-2 py-1 rounded-md w-full ${
                            theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-400 text-gray-900'
                          }`}
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
                            ? theme === 'dark'
                              ? 'bg-purple-600 hover:bg-purple-700'
                              : 'bg-purple-400 hover:bg-purple-500'
                            : theme === 'dark'
                            ? 'bg-gray-600 hover:bg-gray-700'
                            : 'bg-gray-400 hover:bg-gray-500'
                        } ${theme === 'dark' ? 'text-white' : 'text-gray-900'} transition-colors`}
                      >
                        {enableInfoCells ? 'Disable' : 'Enable'}
                      </button>
                      <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
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
                            <label
                              htmlFor="custom-info-cell-indices"
                              className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                            >
                              Info Cell Indices:
                            </label>
                            <input
                              id="custom-info-cell-indices"
                              type="text"
                              value={infoCellInput}
                              onChange={handleInfoCellInputChange}
                              placeholder="e.g., 2, 7, 12"
                              className={`px-2 py-1 rounded-md w-full ${
                                theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-400 text-gray-900'
                              }`}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 w-full">
                            <label
                              htmlFor="info-cell-frequency"
                              className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                            >
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
                              className="w-full"
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
                            ? theme === 'dark'
                              ? 'bg-purple-600 hover:bg-purple-700'
                              : 'bg-purple-400 hover:bg-purple-500'
                            : theme === 'dark'
                            ? 'bg-gray-600 hover:bg-gray-700'
                            : 'bg-gray-400 hover:bg-gray-500'
                        } ${theme === 'dark' ? 'text-white' : 'text-gray-900'} transition-colors`}
                      >
                        {enableZIndexRandomization ? 'Disable' : 'Enable'}
                      </button>
                      <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
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
                            ? theme === 'dark'
                              ? 'bg-purple-600 hover:bg-purple-700'
                              : 'bg-purple-400 hover:bg-purple-500'
                            : theme === 'dark'
                            ? 'bg-gray-600 hover:bg-gray-700'
                            : 'bg-gray-400 hover:bg-gray-500'
                        } ${theme === 'dark' ? 'text-white' : 'text-gray-900'} transition-colors`}
                      >
                        {enableInfoCellGradient ? 'Disable' : 'Enable'}
                      </button>
                      <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                        Info Cell Gradient: {enableInfoCellGradient ? 'On' : 'Off'}
                      </span>
                    </div>
                  </div>

                  {/* Info Cell Gradient Intensity Slider */}
                  {enableInfoCellGradient && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 w-full">
                        <label
                          htmlFor="info-cell-gradient-intensity"
                          className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                        >
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
                          className="w-full"
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
                            ? theme === 'dark'
                              ? 'bg-purple-600 hover:bg-purple-700'
                              : 'bg-purple-400 hover:bg-purple-500'
                            : theme === 'dark'
                            ? 'bg-gray-600 hover:bg-gray-700'
                            : 'bg-gray-400 hover:bg-gray-500'
                        } ${theme === 'dark' ? 'text-white' : 'text-gray-900'} transition-colors`}
                      >
                        {allowDuplicateProducts ? 'Disable' : 'Enable'}
                      </button>
                      <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
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
                            ? 'bg-gray-600 hover:bg-gray-500'
                            : 'bg-gray-400 hover:bg-gray-300'
                        } ${theme === 'dark' ? 'text-white' : 'text-gray-900'} transition-colors`}
                      >
                        Toggle Theme
                      </button>
                      <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
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
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-400 text-gray-900'
                        }`}
                      >
                        <option value={12}>12 Cells</option>
                        <option value={24}>24 Cells</option>
                        <option value={36}>36 Cells</option>
                      </select>
                      <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
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
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-400 text-gray-900'
                        }`}
                      >
                        <option value="random">Random</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="category">Category</option>
                      </select>
                      <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
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
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-400 text-gray-900'
                        }`}
                      >
                        <option value="2x2">2x2</option>
                        <option value="3x3">3x3</option>
                      </select>
                      <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
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
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-400 text-gray-900'
                        }`}
                      >
                        <option value={2}>2 Columns</option>
                        <option value={4}>4 Columns</option>
                        <option value={6}>6 Columns</option>
                      </select>
                      <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                        Grid Columns: {gridColumnCount}
                      </span>
                    </div>
                  </div>

                  {/* Seed Input */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 w-full">
                      <label
                        htmlFor="seed"
                        className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                      >
                        Seed:
                      </label>
                      <input
                        id="seed"
                        type="number"
                        value={seed}
                        onChange={(e) => setSeed(parseInt(e.target.value) || 0)}
                        className={`px-2 py-1 rounded-md w-full ${
                          theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-400 text-gray-900'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Bento Grid Configuration Info */}
                  <div className="mt-4">
                    <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Bento Grid Configuration
                    </h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Large Cell Indices: {bentoGridConfig.largeCellIndices.join(', ') || 'None'}
                    </p>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Large Cell Size: {bentoGridConfig.largeCellSize}
                    </p>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Info Cell Indices: {bentoGridConfig.infoCellIndices.join(', ') || 'None'}
                    </p>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Seed: {bentoGridConfig.seed}
                    </p>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Column Count: {bentoGridConfig.columnCount}
                    </p>
                    <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      To reproduce this layout, set Grid Layout, Info Cells, Grid Density, Large Cell Size, Grid Columns, and Seed to these values.
                    </p>
                  </div>
                </div>

                {/* Close Button */}
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={closeModal}
                    className={`px-4 py-2 rounded-md ${
                      theme === 'dark' ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-gray-400 text-gray-900 hover:bg-gray-300'
                    } transition-colors`}
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