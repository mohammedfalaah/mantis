import { useMemo } from 'react'

// Material specifications matching the original FINISH_SPECS
const FINISH_SPECS = {
  black: {
    color: '#0a0a0a',
    roughness: 0.25,
    metalness: 0.85,
    clearcoat: 0.3,
    clearcoatRoughness: 0.15
  },
  steel: {
    color: '#c5c5c5',
    roughness: 0.35,
    metalness: 0.95,
    clearcoat: 0.2,
    clearcoatRoughness: 0.1
  },
  gold: {
    color: '#d4af37',
    roughness: 0.18,
    metalness: 0.92,
    clearcoat: 0.4,
    clearcoatRoughness: 0.05
  },
  silver: {
    color: '#aaaaaa',
    roughness: 0.1,
    metalness: 0.9,
    clearcoat: 0.5,
    clearcoatRoughness: 0.02
  }
}

export const useHardwareMaterial = (finish = 'black') => {
  return useMemo(() => {
    const spec = FINISH_SPECS[finish] || FINISH_SPECS.black
    
    return {
      color: spec.color,
      roughness: spec.roughness,
      metalness: spec.metalness,
      clearcoat: spec.clearcoat,
      clearcoatRoughness: spec.clearcoatRoughness,
      envMapIntensity: 1
    }
  }, [finish])
}
