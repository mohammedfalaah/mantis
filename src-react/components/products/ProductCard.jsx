import { memo } from 'react'

const ProductCard = memo(({ product, onClick }) => {
  return (
    <div 
      className="product-card" 
      data-id={product.id}
      onClick={() => onClick(product)}
    >
      <div className="product-image">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-meta">{product.material} &bull; {product.sizes[0]}</p>
      </div>
      <button  className="product-btn">View Details</button>
    </div>
  )
})

ProductCard.displayName = 'ProductCard'

export default ProductCard
