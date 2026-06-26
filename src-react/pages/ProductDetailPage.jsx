import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { PRODUCTS } from '../../src/products/catalogData'
import '../../src/shop.css'

const ProductDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
    
    // Find product by ID
    const foundProduct = PRODUCTS.find(p => p.id === id)
    
    if (!foundProduct) {
      // Redirect to shop if product not found
      console.error('Product not found with ID:', id)
      setTimeout(() => navigate('/shop'), 100)
      return
    }

    setProduct(foundProduct)
    setLoading(false)

    // Update page title
    document.title = `${foundProduct.name} — MANTIS Hardware`
  }, [id, navigate])

  const handleInquiry = () => {
    if (!product) return
    
    const subject = encodeURIComponent(`Inquiry about ${product.name}`)
    const body = encodeURIComponent(
      `Hello,\n\nI am interested in learning more about the ${product.name} (${product.category}).\n\nPlease provide more information.\n\nThank you.`
    )
    window.location.href = `mailto:info@mantishardware.com?subject=${subject}&body=${body}`
  }

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `Check out ${product.name} from MANTIS Hardware`,
      url: window.location.href
    }

    // Check if Web Share API is supported
    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyToClipboard(window.location.href)
        }
      }
    } else {
      copyToClipboard(window.location.href)
    }
  }

  const copyToClipboard = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => alert('Product link copied to clipboard!'))
        .catch(() => fallbackCopy(text))
    } else {
      fallbackCopy(text)
    }
  }

  const fallbackCopy = (text) => {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    try {
      document.execCommand('copy')
      alert('Product link copied to clipboard!')
    } catch (err) {
      alert('Failed to copy link')
    }
    document.body.removeChild(textarea)
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="product-page">
          <div className="product-container">
            <div style={{ textAlign: 'center', padding: '100px 20px' }}>
              <p>Loading product details...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (!product) {
    return null // Will redirect
  }

  return (
    <>
      <Header />

      {/* Breadcrumb Navigation */}
      <div className="breadcrumb-container">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="separator">›</span>
          <Link to="/shop">Shop</Link>
          <span className="separator">›</span>
          <span>{product.category}</span>
          <span className="separator">›</span>
          <span>{product.name}</span>
        </div>
      </div>

      {/* Product Detail */}
      <main className="product-page">
        <div className="product-container">
          
          {/* Back Button */}
          <Link to="/shop" className="back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Shop
          </Link>

          <div className="product-grid">
            
            {/* Image Section */}
            <div className="product-image-section">
              <div className="product-image-wrapper">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="product-image" 
                />
              </div>
            </div>

            {/* Details Section */}
            <div className="product-details-section">
              
              <span className="product-category-badge">{product.category}</span>
              
              <h1 className="product-title">{product.name}</h1>
              
              <p className="product-subcategory">{product.subcategory}</p>
              
              <div className="product-description">
                <h3>Description</h3>
                <p>{product.description}</p>
              </div>

              <div className="product-specs">
                <h3>Specifications</h3>
                
                <div className="spec-row">
                  <span className="spec-label">Material</span>
                  <span className="spec-value">{product.material || '-'}</span>
                </div>
                
                <div className="spec-row">
                  <span className="spec-label">Available Finishes</span>
                  <span className="spec-value">
                    {product.finishes?.join(', ') || '-'}
                  </span>
                </div>
                
                <div className="spec-row">
                  <span className="spec-label">Available Colors</span>
                  <span className="spec-value">
                    {product.colors?.join(', ') || '-'}
                  </span>
                </div>
                
                <div className="spec-row">
                  <span className="spec-label">Available Sizes</span>
                  <span className="spec-value">
                    {product.sizes?.join(', ') || '-'}
                  </span>
                </div>
              </div>

              <div className="product-actions">
                <button 
                  className="btn-inquire" 
                  onClick={handleInquiry}
                >
                  Inquire About This Product
                </button>
                <button 
                  className="btn-secondary" 
                  onClick={handleShare}
                >
                  Share Product
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default ProductDetailPage
