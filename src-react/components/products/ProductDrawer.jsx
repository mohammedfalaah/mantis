import { useEffect, useState } from 'react'
import { useProducts } from '../../contexts/ProductContext'

const ProductDrawer = () => {
  const { activeDrawerProduct, setActiveDrawerProduct } = useProducts()
  const [currentProduct, setCurrentProduct] = useState(null)
  
  const [selectedSpecs, setSelectedSpecs] = useState({
    finish: '',
    color: '',
    size: '',
    application: ''
  })

  useEffect(() => {
    if (activeDrawerProduct) {
      setCurrentProduct(activeDrawerProduct)
      setSelectedSpecs({
        finish: activeDrawerProduct.finishes?.[0] || '',
        color: activeDrawerProduct.colors?.[0] || '',
        size: activeDrawerProduct.sizes?.[0] || '',
        application: activeDrawerProduct.applications?.[0] || ''
      })
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [activeDrawerProduct])

  const closeDrawer = () => {
    setActiveDrawerProduct(null)
  }

  if (!currentProduct) return null

  const getWhatsAppUrl = () => {
    const phone = '9895544007'
    const msg = `Hello MANTIS Hardware,

I am interested in inquiring about the following hardware product:

Product Name: ${currentProduct.name}
Category: ${currentProduct.category}
Subcategory: ${currentProduct.subcategory}
Base Material: ${currentProduct.material}

My configured specification:
- Selected Finish: ${selectedSpecs.finish}
- Selected Color: ${selectedSpecs.color}
- Selected Size: ${selectedSpecs.size}
- Door Application: ${selectedSpecs.application}

Please provide catalog details, lead time, and pricing quotation for my project.`

    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`
  }

  return (
    <div 
      id="product-drawer-overlay" 
      className={`spec-drawer-overlay ${activeDrawerProduct ? 'active' : ''}`}
      onClick={(e) => {
        if (e.target.id === 'product-drawer-overlay') closeDrawer()
      }}
    >
      <div className="spec-drawer">
        <button 
          id="close-drawer-btn" 
          className="close-drawer-btn"
          onClick={closeDrawer}
        >
          &times;
        </button>
        
        <div className="drawer-scroll-content">
          <div className="drawer-header">
            <span className="drawer-category" id="drawer-category">{currentProduct.category}</span>
            <h2 className="drawer-title" id="drawer-title">{currentProduct.name}</h2>
            <div className="drawer-subcategory" id="drawer-subcategory">{currentProduct.subcategory}</div>
          </div>

          <div className="drawer-image-frame">
            <img id="drawer-image" src={currentProduct.image} alt={currentProduct.name} />
            <div className="image-blueprint-overlay"></div>
          </div>

          <div className="drawer-description-group">
            <span className="section-label">Description</span>
            <p className="drawer-desc" id="drawer-desc">{currentProduct.description}</p>
          </div>

          <div className="drawer-configurator">
            <span className="section-label">Configure Specs</span>
            
            <div className="configurator-row">
              <span className="config-label">Material</span>
              <span className="config-val" id="drawer-material">{currentProduct.material}</span>
            </div>

            {currentProduct.finishes && currentProduct.finishes.length > 0 && (
              <div className="configurator-row">
                <span className="config-label">Finish</span>
                <div className="config-selectors" id="drawer-finish-select">
                  {currentProduct.finishes.map(f => (
                    <button 
                      key={f}
                      className={`selector-tag ${selectedSpecs.finish === f ? 'active' : ''}`}
                      onClick={() => setSelectedSpecs(prev => ({ ...prev, finish: f }))}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentProduct.colors && currentProduct.colors.length > 0 && (
              <div className="configurator-row">
                <span className="config-label">Color</span>
                <div className="config-selectors" id="drawer-color-select">
                  {currentProduct.colors.map(c => (
                    <button 
                      key={c}
                      className={`selector-tag ${selectedSpecs.color === c ? 'active' : ''}`}
                      onClick={() => setSelectedSpecs(prev => ({ ...prev, color: c }))}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentProduct.sizes && currentProduct.sizes.length > 0 && (
              <div className="configurator-row">
                <span className="config-label">Size</span>
                <div className="config-selectors" id="drawer-size-select">
                  {currentProduct.sizes.map(s => (
                    <button 
                      key={s}
                      className={`selector-tag ${selectedSpecs.size === s ? 'active' : ''}`}
                      onClick={() => setSelectedSpecs(prev => ({ ...prev, size: s }))}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentProduct.applications && currentProduct.applications.length > 0 && (
              <div className="configurator-row">
                <span className="config-label">Application</span>
                <div className="config-selectors" id="drawer-app-select">
                  {currentProduct.applications.map(a => (
                    <button 
                      key={a}
                      className={`selector-tag ${selectedSpecs.application === a ? 'active' : ''}`}
                      onClick={() => setSelectedSpecs(prev => ({ ...prev, application: a }))}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <a 
            href={getWhatsAppUrl()} 
            className="action-trigger-btn primary whatsapp-cta" 
            id="whatsapp-inquiry-btn" 
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="whatsapp-btn-content">
              <span className="whatsapp-icon"></span>
              <span>Inquire on WhatsApp</span>
            </div>
          </a>
          <p className="whatsapp-note">Clicking will open WhatsApp chat with pre-filled product specs configuration.</p>
        </div>
      </div>
    </div>
  )
}

export default ProductDrawer
