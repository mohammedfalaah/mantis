import { useCallback } from 'react'
import { useProducts } from '../../contexts/ProductContext'
import ProductCard from './ProductCard'

const ProductGrid = () => {
  const { getFilteredProducts, setActiveDrawerProduct } = useProducts()
  
  const filteredProducts = getFilteredProducts()

  const handleProductClick = useCallback((product) => {
    setActiveDrawerProduct(product)
  }, [setActiveDrawerProduct])

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
