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
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [referenceId, setReferenceId] = useState('')

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

  const handleContactSubmit = (e) => {
    e.preventDefault()
    const randomId = Math.floor(100000 + Math.random() * 900000)
    setReferenceId(randomId.toString())
    
    const card = document.querySelector('.contact-card')
    gsap.to(card, {
      opacity: 0,
      y: 10,
      duration: 0.3,
      onComplete: () => {
        setIsSubmitted(true)
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out'
        })
      }
    })
  }

  useEffect(() => {
    // Trigger entrance animations immediately
    triggerHeroEntrance()

    // Hero image parallax scroll animation
    gsap.to('.hero-banner-image img', {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    })

    // Scroll-triggered split-reveal for About section
    gsap.fromTo('#lever-gallery .content-column', 
      { opacity: 0, x: -80 },
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
    gsap.fromTo('#lever-gallery .image-column', 
      { opacity: 0, x: 80 },
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

    // Scroll-triggered split-reveal for Smart Technology section
    gsap.fromTo('#smart-tech .image-column', 
      { opacity: 0, x: -80 },
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
    gsap.fromTo('#smart-tech .content-column', 
      { opacity: 0, x: 80 },
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

    // Scroll-triggered split-reveal for Stats section
    gsap.fromTo('#stats-section .stats-left', 
      { opacity: 0, x: -80 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#stats-section',
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      }
    )
    gsap.fromTo('#stats-section .stats-right', 
      { opacity: 0, x: 80 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#stats-section',
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      }
    )

    // GSAP Count-up animation for stats numbers
    const statItems = document.querySelectorAll('.stat-number-val')
    statItems.forEach(item => {
      const targetVal = parseFloat(item.dataset.value)
      const isFloat = item.dataset.value.includes('.')
      const suffix = item.dataset.suffix || ''
      const obj = { val: 0 }
      gsap.to(obj, {
        val: targetVal,
        duration: 2.0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#stats-section',
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        onUpdate: () => {
          let formattedVal = isFloat ? obj.val.toFixed(1) : Math.floor(obj.val);
          if (!isFloat && targetVal >= 1000) {
            formattedVal = Math.floor(obj.val).toLocaleString();
          }
          item.textContent = formattedVal + suffix
        }
      })
    })

    // Scroll-triggered split-reveal for Contact section
    gsap.fromTo('#contact .content-column', 
      { opacity: 0, x: -80 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#contact',
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      }
    )
    gsap.fromTo('#contact .image-column', 
      { opacity: 0, x: 80 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#contact',
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

        {/* Statistics / Trust Section */}
       

        {/* Featured Products Section */}
        <FeaturedProducts />
         <section id="stats-section" className="scroll-section stats-section">
          <div className="section-content split-grid" style={{ gap: '40px' }}>
            <div className="content-column stats-left">
              <div className="card-tag" style={{ color: '#f39a35', letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 600 }}>
                INDIA'S #1 LOCK MANUFACTURER — JAINSON LOCKS
              </div>
              <h2 className="featured-title" style={{ fontSize: '2.5rem', fontWeight: 700, margin: '20px 0 0', color: '#ffffff', lineHeight: 1.2, textAlign: 'left' }}>
                Premium Main Door Locks for Modern Homes & Businesses
              </h2>
            </div>
            
            <div className="content-column stats-right" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
                For over six decades, Jainson has been redefining security and hardware solutions. With a strong commitment to design, durability, and technology, we bring you premium products that safeguard homes and elevate modern living.
              </p>
              
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-number-val" data-value="10" data-suffix="+">0+</span>
                  <span className="stat-label">Countries</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number-val" data-value="10000" data-suffix="+">0+</span>
                  <span className="stat-label">Dealers & Distributors</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number-val" data-value="150" data-suffix="+">0+</span>
                  <span className="stat-label">Builders & Architects</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number-val" data-value="3.4" data-suffix="M+">0M+</span>
                  <span className="stat-label">Homes</span>
                </div>
              </div>
            </div>
          </div>
        </section>

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

        {/* Contact Section */}
        <section id="contact" className="scroll-section">
          <div className="section-content split-grid">
            <div className="content-column">
              <div className="interactive-card glass-panel contact-card">
                {!isSubmitted ? (
                  <>
                    <div className="card-tag">Get in Touch</div>
                    <h2 className="card-title">Inquire for Projects</h2>
                    <form className="contact-form" onSubmit={handleContactSubmit}>
                      <div className="form-group">
                        <input 
                          type="text" 
                          placeholder="Your Name" 
                          required 
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <input 
                          type="email" 
                          placeholder="Your Email" 
                          required 
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <textarea 
                          rows="4" 
                          placeholder="Describe your project requirements..."
                          required
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                        ></textarea>
                      </div>
                      <button type="submit" className="card-action-btn">Submit Inquiry</button>
                    </form>
                  </>
                ) : (
                  <>
                    <div className="card-tag">Inquiry Received</div>
                    <h2 className="card-title">Thank You</h2>
                    <p className="card-desc">
                      Your inquiry has been successfully transmitted to Mantis Studio. One of our architectural design consultants will review your specifications and contact you within 24 hours.
                    </p>
                    <div className="micro-note" style={{ color: '#f39a35', fontWeight: 600 }}>Reference ID: MNT-{referenceId}</div>
                  </>
                )}
              </div>
            </div>
            <div className="image-column">
              <img src="/ChatGPT Image Jun 20, 2026, 04_06_31 PM.png" alt="Mantis Project Inquiry" />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default HomePage
