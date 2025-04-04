import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  enableSkew: boolean;
  skewIntensity: number;
  largeCellPattern: 'default' | 'alternate' | 'custom';
  customLargeCellIndices: number[];
  enableInfoCells: boolean;
  infoCellFrequency: number;
  customInfoCellIndices: number[];
  enableZIndexRandomization: boolean;
  enableInfoCellGradient: boolean;
  infoCellGradientIntensity: number;
  allowDuplicateProducts: boolean;
  theme: 'dark' | 'light';
  gridDensity: 12 | 24 | 36;
  productSort: 'random' | 'price-asc' | 'price-desc' | 'category';
  bentoGridConfig: {
    largeCellIndices: number[];
    largeCellSize: '2x2' | '3x3';
    infoCellIndices: number[];
    seed: number;
    columnCount: 2 | 4 | 6;
  };
  largeCellSize: '2x2' | '3x3';
  gridColumnCount: 2 | 4 | 6;
  seed: number;
  toggleSkew: () => void;
  setSkewIntensity: (intensity: number) => void;
  setLargeCellPattern: (pattern: 'default' | 'alternate' | 'custom') => void;
  setCustomLargeCellIndices: (indices: number[]) => void;
  toggleInfoCells: () => void;
  setInfoCellFrequency: (frequency: number) => void;
  setCustomInfoCellIndices: (indices: number[]) => void;
  toggleZIndexRandomization: () => void;
  toggleInfoCellGradient: () => void;
  setInfoCellGradientIntensity: (intensity: number) => void;
  toggleAllowDuplicateProducts: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
  setGridDensity: (density: 12 | 24 | 36) => void;
  setProductSort: (sort: 'random' | 'price-asc' | 'price-desc' | 'category') => void;
  setBentoGridConfig: (config: {
    largeCellIndices: number[];
    largeCellSize: '2x2' | '3x3';
    infoCellIndices: number[];
    seed: number;
    columnCount: 2 | 4 | 6;
  }) => void;
  setLargeCellSize: (size: '2x2' | '3x3') => void;
  setGridColumnCount: (count: 2 | 4 | 6) => void;
  setSeed: (seed: number) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      enableSkew: true,
      skewIntensity: 1,
      largeCellPattern: 'default',
      customLargeCellIndices: [],
      enableInfoCells: true,
      infoCellFrequency: 0.15,
      customInfoCellIndices: [],
      enableZIndexRandomization: true,
      enableInfoCellGradient: true,
      infoCellGradientIntensity: 1,
      allowDuplicateProducts: true,
      theme: 'dark',
      gridDensity: 24,
      productSort: 'random',
      bentoGridConfig: { largeCellIndices: [], largeCellSize: '2x2', infoCellIndices: [], seed: 0, columnCount: 4 },
      largeCellSize: '2x2',
      gridColumnCount: 4,
      seed: 0,
      toggleSkew: () => set((state) => ({ enableSkew: !state.enableSkew })),
      setSkewIntensity: (intensity) => set({ skewIntensity: Math.max(0, Math.min(1, intensity)) }),
      setLargeCellPattern: (pattern) => set({ largeCellPattern: pattern }),
      setCustomLargeCellIndices: (indices) => set({ customLargeCellIndices: indices }),
      toggleInfoCells: () => set((state) => ({ enableInfoCells: !state.enableInfoCells })),
      setInfoCellFrequency: (frequency) => set({ infoCellFrequency: Math.max(0, Math.min(0.5, frequency)) }),
      setCustomInfoCellIndices: (indices) => set({ customInfoCellIndices: indices }),
      toggleZIndexRandomization: () => set((state) => ({ enableZIndexRandomization: !state.enableZIndexRandomization })),
      toggleInfoCellGradient: () => set((state) => ({ enableInfoCellGradient: !state.enableInfoCellGradient })),
      setInfoCellGradientIntensity: (intensity) =>
        set({ infoCellGradientIntensity: Math.max(0, Math.min(1, intensity)) }),
      toggleAllowDuplicateProducts: () => set((state) => ({ allowDuplicateProducts: !state.allowDuplicateProducts })),
      setTheme: (theme) => set({ theme }),
      setGridDensity: (density) => set({ gridDensity: density }),
      setProductSort: (sort) => set({ productSort: sort }),
      setBentoGridConfig: (config) => set({ bentoGridConfig: config }),
      setLargeCellSize: (size) => set({ largeCellSize: size }),
      setGridColumnCount: (count) => set({ gridColumnCount: count }),
      setSeed: (seed) => set({ seed }),
    }),
    {
      name: 'settings-storage',
    }
  )
);