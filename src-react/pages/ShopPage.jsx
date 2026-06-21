import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProducts } from '../contexts/ProductContext'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import CategorySidebar from '../components/products/CategorySidebar'
import FilterPanel from '../components/products/FilterPanel'
import ProductGrid from '../components/products/ProductGrid'
import ProductDrawer from '../components/products/ProductDrawer'
import '../../src/shop.css'

const ShopPage = () => {
  const [searchParams] = useSearchParams()
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const { catalogState, setCategory, setSearchQuery, setSortBy, getFilteredProducts } = useProducts()
  const filteredProducts = getFilteredProducts()

  useEffect(() => {
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
  }, [searchParams, setCategory])

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
      <ProductDrawer />
    </>
  )
}

export default ShopPage
