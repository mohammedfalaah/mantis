import { createContext, useContext, useState } from 'react'
import { PRODUCTS, CATEGORIES } from '../../src/products/catalogData'

const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
  const [catalogState, setCatalogState] = useState({
    activeCategory: null,
    searchQuery: '',
    filters: {
      material: [],
      finish: [],
      color: [],
      size: [],
      application: []
    },
    sortBy: 'name-asc'
  })

  const [activeDrawerProduct, setActiveDrawerProduct] = useState(null)

  const updateFilters = (filterType, value) => {
    setCatalogState(prev => {
      const filters = { ...prev.filters }
      const index = filters[filterType].indexOf(value)
      
      if (index === -1) {
        filters[filterType] = [...filters[filterType], value]
      } else {
        filters[filterType] = filters[filterType].filter(v => v !== value)
      }
      
      return { ...prev, filters }
    })
  }

  const clearFilters = () => {
    setCatalogState(prev => ({
      ...prev,
      filters: {
        material: [],
        finish: [],
        color: [],
        size: [],
        application: []
      }
    }))
  }

  const setCategory = (category) => {
    setCatalogState(prev => ({ ...prev, activeCategory: category }))
  }

  const setSearchQuery = (query) => {
    setCatalogState(prev => ({ ...prev, searchQuery: query }))
  }

  const setSortBy = (sortBy) => {
    setCatalogState(prev => ({ ...prev, sortBy }))
  }

  const getFilteredProducts = () => {
    let filtered = PRODUCTS.filter(prod => {
      if (catalogState.activeCategory) {
        if (prod.category !== catalogState.activeCategory && 
            prod.subcategory !== catalogState.activeCategory) {
          return false
        }
      }
      
      if (catalogState.searchQuery) {
        const inName = prod.name.toLowerCase().includes(catalogState.searchQuery)
        const inDesc = prod.description.toLowerCase().includes(catalogState.searchQuery)
        if (!inName && !inDesc) return false
      }
      
      if (catalogState.filters.material.length > 0) {
        if (!catalogState.filters.material.includes(prod.material)) return false
      }
      
      if (catalogState.filters.finish.length > 0) {
        const hasFinish = prod.finishes.some(f => catalogState.filters.finish.includes(f))
        if (!hasFinish) return false
      }
      
      if (catalogState.filters.color.length > 0) {
        const hasColor = prod.colors.some(c => catalogState.filters.color.includes(c))
        if (!hasColor) return false
      }

      if (catalogState.filters.size.length > 0) {
        const hasSize = prod.sizes.some(s => catalogState.filters.size.includes(s))
        if (!hasSize) return false
      }

      if (catalogState.filters.application.length > 0) {
        const hasApp = prod.applications.some(a => catalogState.filters.application.includes(a))
        if (!hasApp) return false
      }
      
      return true
    })
    
    if (catalogState.sortBy === 'name-asc') {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    } else if (catalogState.sortBy === 'name-desc') {
      filtered.sort((a, b) => b.name.localeCompare(a.name))
    } else if (catalogState.sortBy === 'category') {
      filtered.sort((a, b) => a.category.localeCompare(b.category))
    }
    
    return filtered
  }

  const value = {
    catalogState,
    PRODUCTS,
    CATEGORIES,
    activeDrawerProduct,
    setActiveDrawerProduct,
    updateFilters,
    clearFilters,
    setCategory,
    setSearchQuery,
    setSortBy,
    getFilteredProducts
  }

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProducts = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider')
  }
  return context
}
