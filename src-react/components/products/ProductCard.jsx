import { memo } from 'react'
import { Link } from 'react-router-dom'

const ProductCard = memo(({ product, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('ProductCard handleClick called for:', product.id)
    onClick(product)
  }

  return (
    <Link 
      to={`/product/${product.id}`}
      className="product-card" 
      data-id={product.id}
      style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}
    >
      <div className="product-image">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-meta">{product.material} &bull; {product.sizes[0]}</p>
      </div>
      <button 
        className="product-btn"
        onClick={handleClick}
      >
        View Details
      </button>
    </Link>
  )
})

ProductCard.displayName = 'ProductCard'

export default ProductCard
