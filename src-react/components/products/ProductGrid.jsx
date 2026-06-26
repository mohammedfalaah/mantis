import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProducts } from '../../contexts/ProductContext'
import ProductCard from './ProductCard'

const ProductGrid = () => {
  const { getFilteredProducts } = useProducts()
  const navigate = useNavigate()
  
  const filteredProducts = getFilteredProducts()

  const handleProductClick = useCallback((product) => {
    console.log('Product clicked:', product.name, product.id)
    console.log('Navigating to:', `/product/${product.id}`)
    
    try {
      // Navigate to product detail page using React Router
      navigate(`/product/${product.id}`)
      console.log('Navigation called successfully')
    } catch (error) {
      console.error('Navigation error:', error)
    }
  }, [navigate])

  return (
    <div className="products-grid" id="shop-products-grid">
      {filteredProducts.length === 0 ? (
        <div className="no-results">
          <p>No products found matching your criteria.</p>
        </div>
      ) : (
        filteredProducts.map(prod => (
          <ProductCard 
            key={prod.id}
            product={prod}
            onClick={handleProductClick}
          />
        ))
      )}
    </div>
  )
}

export default ProductGrid
