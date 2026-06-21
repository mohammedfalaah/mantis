import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

const AboutPage = () => {
  const [tiltStyle, setTiltStyle] = useState({ transform: 'rotateX(0deg) rotateY(0deg) scale(1)' })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((centerY - y) / centerY) * 12
    const rotateY = ((x - centerX) / centerX) * 12
    setTiltStyle({
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`,
      boxShadow: '0 20px 45px rgba(0, 0, 0, 0.12)',
      transition: 'transform 0.1s ease-out'
    })
  }

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'rotateX(0deg) rotateY(0deg) scale(1)',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
      transition: 'transform 0.5s ease-out'
    })
  }

  useEffect(() => {
    // Scroll-triggered animations for About Page columns
    gsap.fromTo('.about-intro-content', 
      { opacity: 0, x: -80 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power3.out'
      }
    )

    gsap.fromTo('.about-intro-image', 
      { opacity: 0, x: 80 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power3.out'
      }
    )

    // Stagger milestone items
    gsap.fromTo('.milestone-card',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.3
      }
    )
  }, [])

  return (
    <>
      <Header />
      
      <main className="shop-page" style={{ minHeight: '100vh', paddingBottom: '60px' }}>
        <div className="shop-hero" style={{ padding: '80px 20px 40px' }}>
          <h1 className="shop-title">About <span style={{ color: '#f39a35' }}>Mantis</span></h1>
          <p className="shop-subtitle">Precision engineering and luxurious architectural fittings since 2012</p>
        </div>

        <div className="shop-container">
          {/* Main Info Split Grid */}
          <div className="split-grid" style={{ marginBottom: '60px' }}>
            <div className="content-column about-intro-content">
              <div className="interactive-card glass-panel">
                <div className="card-tag">Our History</div>
                <h2 className="card-title">Crafting Security. Elevating Spaces</h2>
                <p className="card-desc">
                  Mantis is a leading door locks and architectural hardware brand in India,
                  dedicated to creating premium solutions that combine security, durability,
                  and timeless design. Every product is engineered with precision and crafted
                  using high-quality materials to deliver exceptional performance for modern
                  homes, commercial spaces, and luxury interiors.
                </p>
                <div className="spec-grid" style={{ marginTop: '24px' }}>
                  <div className="spec-grid-item">
                    <span className="grid-label">Industry Focus</span>
                    <span className="grid-value">Door Hardware</span>
                  </div>
                  <div className="spec-grid-item">
                    <span className="grid-label">Product Range</span>
                    <span className="grid-value">50+ Categories</span>
                  </div>
                  <div className="spec-grid-item">
                    <span className="grid-label">Core Values</span>
                    <span className="grid-value">Quality & Trust</span>
                  </div>
                  <div className="spec-grid-item">
                    <span className="grid-label">Applications</span>
                    <span className="grid-value">Residential & Commercial</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="image-column about-intro-image">
              <div 
                className="about-image-wrapper"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <img 
                  src="/handle_ss.png" 
                  alt="Mantis Premium Handle" 
                  style={{ ...tiltStyle, maxWidth: '100%', objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>

          {/* Milestones / Vision Section */}
          <div style={{ marginTop: '60px' }}>
            <h2 className="featured-title" style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2rem' }}>
              Mantis <span className="thin-accent">Milestones</span>
            </h2>
            
            <div className="featured-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              <div className="featured-product-card milestone-card" style={{ background: 'var(--color-bg-panel)', border: '1px solid var(--color-border)' }}>
                <div className="featured-product-info">
                  <span className="featured-product-category" style={{ color: '#f39a35' }}>2012</span>
                  <h3 className="featured-product-name" style={{ color: '#ffffff', margin: '8px 0' }}>The Beginning</h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>
                    Mantis was founded with a single manufacturing plant in Aligarh, producing high-tensile brass locks and security bolts.
                  </p>
                </div>
              </div>

              <div className="featured-product-card milestone-card" style={{ background: 'var(--color-bg-panel)', border: '1px solid var(--color-border)' }}>
                <div className="featured-product-info">
                  <span className="featured-product-category" style={{ color: '#f39a35' }}>2016</span>
                  <h3 className="featured-product-name" style={{ color: '#ffffff', margin: '8px 0' }}>Pan-India Expansion</h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>
                    Expanded product range to premium pull handles and lever handles, distributing products to over 20+ states across India.
                  </p>
                </div>
              </div>

              <div className="featured-product-card milestone-card" style={{ background: 'var(--color-bg-panel)', border: '1px solid var(--color-border)' }}>
                <div className="featured-product-info">
                  <span className="featured-product-category" style={{ color: '#f39a35' }}>2021</span>
                  <h3 className="featured-product-name" style={{ color: '#ffffff', margin: '8px 0' }}>Smart Integration</h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>
                    Launched the Helios Smart Lock series, integrating capacitive biometrics and close-proximity bluetooth configurations.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="featured-cta" style={{ marginTop: '50px', textAlign: 'center' }}>
            <Link to="/shop" className="featured-btn-view-all">
              Explore Entire Catalog
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default AboutPage
