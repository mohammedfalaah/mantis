import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import Header from '../components/layout/Header'

const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [referenceId, setReferenceId] = useState('')

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
    // Scroll-triggered animations for Contact Page columns
    gsap.fromTo('.contact-intro-content', 
      { opacity: 0, x: -80 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power3.out'
      }
    )

    gsap.fromTo('.contact-intro-details', 
      { opacity: 0, x: 80 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power3.out'
      }
    )
  }, [])

  return (
    <>
      <Header />
      
      <main className="shop-page" style={{ minHeight: '100vh', paddingBottom: '60px' }}>
        <div className="shop-hero" style={{ padding: '80px 20px 40px' }}>
          <h1 className="shop-title">Contact <span style={{ color: '#f39a35' }}>Mantis</span></h1>
          <p className="shop-subtitle">Architectural consultancies, design showrooms, and project inquiries</p>
        </div>

        <div className="shop-container">
          <div className="split-grid" style={{ gap: '40px', alignItems: 'stretch' }}>
            {/* Form Column */}
            <div className="content-column contact-intro-content" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="interactive-card glass-panel contact-card" style={{ flex: 1 }}>
                {!isSubmitted ? (
                  <>
                    <div className="card-tag">Get in Touch</div>
                    <h2 className="card-title" style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Inquire for Projects</h2>
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
                      <button type="submit" className="card-action-btn" style={{ width: '100%' }}>Submit Inquiry</button>
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

            {/* Showroom Coordinates Column */}
            <div className="content-column contact-intro-details" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="interactive-card glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <div>
                  <div className="card-tag">Showrooms</div>
                  <h2 className="card-title" style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Corporate Coordinates</h2>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <h3 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '6px' }}>Mumbai Studio</h3>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>
                      Mantis Tower, Off Link Road, Andheri West, Mumbai, Maharashtra 400053
                    </p>
                  </div>

                  <div>
                    <h3 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '6px' }}>Bangalore Showroom</h3>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>
                      100 Feet Road, Indiranagar, Bangalore, Karnataka 560038
                    </p>
                  </div>
                </div>

                <div style={{ marginTop: 'auto', borderTop: '1px solid var(--color-border)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                    <strong style={{ color: '#ffffff' }}>Email:</strong> info@mantisfittings.com
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                    <strong style={{ color: '#ffffff' }}>Phone:</strong> +91 99999 99999
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                    <strong style={{ color: '#ffffff' }}>Support:</strong> 1800-123-4567 (Toll Free)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default ContactPage
