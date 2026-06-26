import { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { gsap } from 'gsap'
import { useProducts } from '../contexts/ProductContext'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import CategorySidebar from '../components/products/CategorySidebar'
import FilterPanel from '../components/products/FilterPanel'
import ProductGrid from '../components/products/ProductGrid'
// import ProductDrawer from '../components/products/ProductDrawer' // Removed - using dedicated product page
import '../../src/shop.css'

const ShopPage = () => {
  const [searchParams] = useSearchParams()
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const { catalogState, setCategory, setSearchQuery, setSortBy, getFilteredProducts } = useProducts()
  const filteredProducts = getFilteredProducts()
  const hasSetCategory = useRef(false)
  const shopMainRef = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    // Only set category once to avoid infinite loop
    if (hasSetCategory.current) return
    
    const categoryParam = searchParams.get('category')
    if (categoryParam) {
      const categoryMap = {
        'pull-handles': 'Pull Handles',
        'lever-handles': 'Lever Handles',
        'smart-locks': 'Smart Locks',
        'door-hinges': 'Door Hinges',
        'door-closers': 'Door Closers',
        'accessories': 'Accessories'
      }
      setCategory(categoryMap[categoryParam] || null)
    } else {
      setCategory(null)
    }
    
    hasSetCategory.current = true
  }, [searchParams])

  useEffect(() => {
    // Animate shop elements on mount
    if (hasAnimated.current) return
    hasAnimated.current = true

    const tl = gsap.timeline()
    
    // Animate hero section
    tl.from('.shop-title', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    })
    .from('.shop-subtitle', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.4')
    
    // Animate sidebar
    .from('.shop-sidebar', {
      opacity: 0,
      x: -30,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.3')
    
    // Animate controls
    .from('.shop-controls', {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power2.out'
    }, '-=0.4')
    
    // Animate results count
    .from('.shop-results', {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out'
    }, '-=0.2')

  }, [])

  useEffect(() => {
    // Animate product cards when they change
    const productCards = document.querySelectorAll('.product-card')
    
    if (productCards.length > 0) {
      gsap.fromTo(productCards,
        {
          opacity: 0,
          y: 30,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power2.out',
          clearProps: 'all'
        }
      )
    }
  }, [filteredProducts])

  return (
    <>
      <Header />
      
      <main className="shop-page">
        <div className="shop-hero">
          <h1 className="shop-title">Hardware <span style={{ color: '#f39a35' }}>Collection</span></h1>
          <p className="shop-subtitle">Precision-engineered fittings for modern architecture</p>
        </div>

        <div className="shop-container">
          <div className="mobile-filter-header">
            <button 
              className={`mobile-filter-btn ${isFiltersOpen ? 'active' : ''}`}
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            >
              <span>{isFiltersOpen ? 'Hide Filters ✕' : 'Filter & Categories ☰'}</span>
            </button>
          </div>

          <aside className={`shop-sidebar ${isFiltersOpen ? 'mobile-show' : ''}`}>
            <CategorySidebar />
            <FilterPanel />
          </aside>

          <div className="shop-main">
            <div className="shop-controls">
              <div className="search-box">
                <input
                  type="text"
                  id="shop-search"
                  placeholder="Search products..."
                  value={catalogState.searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="sort-box">
                <select
                  id="shop-sort"
                  value={catalogState.sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="name-asc">Name: A-Z</option>
                  <option value="name-desc">Name: Z-A</option>
                  <option value="category">Category</option>
                </select>
              </div>
            </div>

            <div className="shop-results">
              <span id="shop-results-count">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </span>
            </div>

            <ProductGrid filteredProducts={filteredProducts} />
          </div>
        </div>
      </main>

      <Footer />
      {/* ProductDrawer removed - products now navigate to /product.html */}
    </>
  )
}

export default ShopPage
