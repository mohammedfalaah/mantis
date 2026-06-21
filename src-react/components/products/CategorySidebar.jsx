import { useProducts } from '../../contexts/ProductContext'

const CategorySidebar = () => {
  const { catalogState, PRODUCTS, CATEGORIES, setCategory } = useProducts()

  const handleCategoryClick = (category) => {
    setCategory(category === 'all' ? null : category)
  }

  return (
    <div className="sidebar-section">
      <h3 className="sidebar-title">Categories</h3>
      <ul className="category-list" id="shop-categories-list">
        <li 
          className={`category-item ${catalogState.activeCategory === null ? 'active' : ''}`}
          onClick={() => handleCategoryClick('all')}
          data-cat="all"
        >
          <span>All Products</span>
          <span className="category-count">{PRODUCTS.length}</span>
        </li>
        
        {CATEGORIES.map(cat => {
          const catCount = PRODUCTS.filter(p => p.category === cat.name).length
          
          return (
            <li 
              key={cat.id}
              className={`category-item ${catalogState.activeCategory === cat.name ? 'active' : ''}`}
              onClick={() => handleCategoryClick(cat.name)}
              data-cat={cat.name}
            >
              <span>{cat.name}</span>
              <span className="category-count">{catCount}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default CategorySidebar
