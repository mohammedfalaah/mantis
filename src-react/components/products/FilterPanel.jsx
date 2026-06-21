import { useProducts } from '../../contexts/ProductContext'

const FilterPanel = () => {
  const { 
    catalogState, 
    PRODUCTS, 
    updateFilters, 
    clearFilters 
  } = useProducts()

  const materials = [...new Set(PRODUCTS.map(p => p.material))].sort()
  const finishes = [...new Set(PRODUCTS.flatMap(p => p.finishes))].sort()
  const colors = [...new Set(PRODUCTS.flatMap(p => p.colors))].sort()

  const colorHexMap = {
    'Silver': '#c0c0c0',
    'Gold': '#cca456',
    'Rose Gold': '#b76e79',
    'Black': '#121212',
    'Antique Brass': '#ab7a22',
    'Gun Metal': '#43464b',
    'Copper': '#b87333'
  }

  return (
    <div className="sidebar-section">
      <h3 className="sidebar-title">
        <span>Filters</span>
        <button id="clear-filters-btn" className="clear-btn" onClick={clearFilters}>Clear</button>
      </h3>

      {/* Material */}
      <div className="filter-group">
        <span className="filter-label">Material</span>
        <div className="filter-options" id="filter-materials">
          {materials.map(mat => (
            <button
              key={mat}
              className={`filter-tag ${catalogState.filters.material.includes(mat) ? 'active' : ''}`}
              onClick={() => updateFilters('material', mat)}
            >
              {mat}
            </button>
          ))}
        </div>
      </div>

      {/* Finish */}
      <div className="filter-group">
        <span className="filter-label">Finish</span>
        <div className="filter-options" id="filter-finishes">
          {finishes.map(fin => (
            <button
              key={fin}
              className={`filter-tag ${catalogState.filters.finish.includes(fin) ? 'active' : ''}`}
              onClick={() => updateFilters('finish', fin)}
            >
              {fin}
            </button>
          ))}
        </div>
      </div>

      {/* Color */}
      <div className="filter-group">
        <span className="filter-label">Color</span>
        <div className="filter-options color-swatches" id="filter-colors">
          {colors.map(col => {
            const hex = colorHexMap[col] || '#888'
            return (
              <button
                key={col}
                className={`color-swatch ${catalogState.filters.color.includes(col) ? 'active' : ''}`}
                style={{ backgroundColor: hex }}
                title={col}
                onClick={() => updateFilters('color', col)}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default FilterPanel
