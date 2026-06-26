import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'
import { PRODUCTS } from '../../../src/products/catalogData'

const FeaturedProducts = () => {
  const sectionRef = useRef(null)
  const animatedRef = useRef(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Select 6 featured products
    const featuredIds = ['p-01', 'm-03', 'h-02', 'p-03', 'dc-01', 'da-03']
    const featuredProducts = featuredIds
      .map(id => PRODUCTS.find(p => p.id === id))
      .filter(Boolean)

    const productsToShow = featuredProducts.length >= 6 ? featuredProducts : PRODUCTS.slice(0, 6)

    // Set up Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true
          
          const featuredHeader = sectionRef.current.querySelector('.featured-header')
          const featuredCards = sectionRef.current.querySelectorAll('.featured-product-card')
          const featuredCta = sectionRef.current.querySelector('.featured-cta')
          
          const tl = gsap.timeline()
          
          tl.to(featuredHeader.querySelector('.card-tag'), {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
          })
          .to(featuredHeader.querySelector('.featured-title'), {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out'
          }, '-=0.4')
          .to(featuredHeader.querySelector('.featured-subtitle'), {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
          }, '-=0.4')
          .to(featuredCards, {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out'
          }, '-=0.3')
          .to(featuredCta, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
          }, '-=0.4')
          
          observer.disconnect()
        }
      })
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    })
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const featuredIds = ['p-01', 'm-03', 'h-02', 'p-03', 'dc-01', 'da-03']
  const featuredProducts = featuredIds
    .map(id => PRODUCTS.find(p => p.id === id))
    .filter(Boolean)
  const productsToShow = featuredProducts.length >= 6 ? featuredProducts : PRODUCTS.slice(0, 6)

  return (
    <section id="featured-products" className="scroll-section featured-section" ref={sectionRef}>
      <div className="section-content featured-content">
        <div className="featured-header">
          <div 
            className="card-tag text-highlight"
            style={{ 
              fontWeight: 600, 
              letterSpacing: '0.2em', 
              textTransform: 'uppercase',
              opacity: 0,
              transform: 'translateY(30px)'
            }}
          >
            Next-Gen Hardware
          </div>
          <h2 
            className="featured-title creative-title"
            style={{ opacity: 0, transform: 'translateY(30px)' }}
          >
            Featured <span className="thin-accent">Products</span>
          </h2>
          <div className="header-divider"></div>
          <p 
            className="featured-subtitle"
            style={{ opacity: 0, transform: 'translateY(30px)' }}
          >
             Engineered for tomorrow's architecture.
          </p>
        </div>

        <div className="featured-grid" id="featured-products-grid">
          {productsToShow.map(product => (
            <div 
              key={product.id}
              className="featured-product-card" 
              data-product-id={product.id}
              style={{ opacity: 0, transform: 'translateY(30px)', cursor: 'pointer' }}
              onClick={() => {
                // Navigate to product detail page using React Router
                navigate(`/product/${product.id}`)
              }}
            >
              <div className="featured-product-image">
                <img src={product.image} alt={product.name} loading="lazy" />
              </div>
              <div className="featured-product-info">
                <div className="featured-product-category">{product.subcategory}</div>
                <h3 className="featured-product-name">{product.name}</h3>
                <div className="featured-product-meta">
                  <span>{product.material}</span>
                  <span>{product.sizes[0]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div 
          className="featured-cta"
          style={{ opacity: 0, transform: 'translateY(30px)' }}
        >
          <Link to="/shop" className="featured-btn-view-all">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
