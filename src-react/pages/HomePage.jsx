import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '../components/layout/Header'
import FeaturedProducts from '../components/products/FeaturedProducts'
import { PRODUCTS } from '../../src/products/catalogData'

gsap.registerPlugin(ScrollTrigger)

const HomePage = () => {
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
    // Trigger entrance animations immediately
    triggerHeroEntrance()

    // Scroll-triggered slide-in for the About section image
    gsap.fromTo('#lever-gallery .image-column', 
      { opacity: 0, x: 120 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#lever-gallery',
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      }
    )

    // Scroll-triggered slide-in for the Smart Technology section text
    gsap.fromTo('#smart-tech .content-column', 
      { opacity: 0, x: 120 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#smart-tech',
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      }
    )

    // Initialize scroll animations
    const sections = document.querySelectorAll('.scroll-section')
    const navItems = document.querySelectorAll('.nav-item')
    
    sections.forEach((sec) => {
      ScrollTrigger.create({
        trigger: sec,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => updateActiveNav(sec.id),
        onEnterBack: () => updateActiveNav(sec.id)
      })
    })

    function updateActiveNav(id) {
      navItems.forEach(item => {
        item.classList.toggle('active', item.dataset.sec === id)
      })
    }

    // Smooth scroll for anchor links
    const handleAnchorClick = (e) => {
      const href = e.target.getAttribute('href')
      if (href && href.startsWith('#')) {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    // Smooth scroll to initial hash on mount
    if (window.location.hash) {
      setTimeout(() => {
        const target = document.querySelector(window.location.hash)
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' })
        }
      }, 500)
    }

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const triggerHeroEntrance = () => {
    // Slide in title lines from the left side
    gsap.fromTo('.text-line span', 
      { opacity: 0, x: -80 }, 
      { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out', stagger: 0.18, delay: 0.1 }
    )
    
    // Slide in subtitle lines from the left side
    gsap.fromTo('.subtitle-line', 
      { opacity: 0, x: -50 }, 
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12, delay: 0.45 }
    )

    // Slide up CTA buttons
    gsap.fromTo('.hero-cta-section', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.75 }
    )

    // Fade in the global header
    gsap.fromTo('.global-header', 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.3 }
    )
  }

  return (
    <>
      <Header />

      <main className="scroll-container">
        {/* Hero Section */}
        <section id="hero" className="scroll-section active hero-banner" style={{ opacity: 1 }}>
          <div className="hero-banner-image">
            <img src="/ChatGPT Image Jun 20, 2026, 02_55_39 PM.png" alt="MANTIS Hardware Collection" />
          </div>
          <div className="hero-banner-overlay">
            <div className="hero-banner-content">
              <div className="hero-text-animated">
                <h1 className="hero-main-title">
                  <span className="text-line"><span>Hardware that</span></span>
                  <span className="text-line text-highlight"><span>Completes Perfection.</span></span>
                </h1>
                <p className="hero-subtitle">
                  <span className="subtitle-line">Premium quality. Timeless design.</span>
                  <span className="subtitle-line">Trusted by millions across India.</span>
                </p>
              </div>
              <div className="hero-cta-section">
                <Link to="/shop" className="hero-btn-primary">Explore Collection</Link>
                <a href="#about" className="hero-btn-secondary">Learn More</a>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="lever-gallery" className="scroll-section">
          <div className="section-content split-grid">
            <div className="content-column">
              <div className="interactive-card glass-panel">
                <div className="card-tag">About Mantis</div>
                <h2 className="card-title">Crafting Security. Elevating Spaces</h2>
                <p className="card-desc">
                  Mantis is a leading door locks and architectural hardware brand in India,
                  dedicated to creating premium solutions that combine security, durability,
                  and timeless design. Every product is engineered with precision and crafted
                  using high-quality materials to deliver exceptional performance for modern
                  homes, commercial spaces, and luxury interiors.
                </p>
                <div className="spec-grid">
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
                <div className="card-ctas">
                  <Link to="/shop" className="card-action-btn">
                    Explore Collection
                  </Link>
                </div>
              </div>
            </div>
            <div className="image-column">
              <div 
                className="about-image-wrapper"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <img 
                  src="/handle_ss.png" 
                  alt="M-472 Lever Handle" 
                  style={tiltStyle}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <FeaturedProducts />

        {/* Smart Technology Section */}
        <section id="smart-tech" className="scroll-section">
          <div className="section-content split-grid">
            <div className="image-column">
              <img src="/helios_smart_lock.png" alt="Helios Smart Lock" />
            </div>
            <div className="content-column">
              <div className="interactive-card glass-panel">
                <div className="card-tag">Biometric Security</div>
                <h2 className="card-title">HELIOS SMART LOCK</h2>
                <p className="card-desc">
                  Security concealed within minimalist elegance. A black glass faceplate integrated with state-of-the-art
                  biometrics, dynamic numeric keypad, and close-proximity Bluetooth.
                </p>
                <ul className="spec-list">
                  <li><strong>Biometric Sensor:</strong> Hidden capacitive reader with 0.15s identification speed.</li>
                  <li><strong>OLED Panel:</strong> Micro-perforated numbers appearing through black brushed metal only when active.</li>
                  <li><strong>Fail-Safe:</strong> Hidden mechanical key cylinder behind pivot-cover and emergency USB-C bypass.</li>
                </ul>
                <div className="card-ctas">
                  <Link to="/shop" className="card-action-btn">
                    View Specs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default HomePage
