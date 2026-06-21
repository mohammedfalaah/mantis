import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [touchStartPos, setTouchStartPos] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path) => location.pathname === path

  const targets = [
    { pathname: '/', hash: '' },
    { pathname: '/shop', hash: '' },
    { pathname: '/', hash: '#about' },
    { pathname: '/', hash: '#contact' }
  ]

  const getCurrentIndex = () => {
    if (location.pathname === '/shop') return 1
    if (location.hash === '#about') return 2
    if (location.hash === '#contact') return 3
    return 0
  }

  const navigateToIndex = (index) => {
    const target = targets[index]
    if (index === 0) {
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        navigate('/')
      } else {
        navigate('/')
        window.scrollTo(0, 0)
      }
    } else if (target.pathname === '/' && target.hash) {
      if (location.pathname !== '/') {
        navigate('/' + target.hash)
      } else {
        const element = document.querySelector(target.hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
        navigate(target.hash)
      }
    } else {
      navigate(target.pathname)
    }
  }

  const handleTouchStart = (e) => {
    const touch = e.touches[0]
    setTouchStartPos({ x: touch.clientX, y: touch.clientY })
  }

  const handleTouchEnd = () => {
    setTouchStartPos(null)
  }

  const handleTouchMove = (e) => {
    if (!touchStartPos) return
    const touch = e.touches[0]
    const diffX = Math.abs(touch.clientX - touchStartPos.x)
    const diffY = Math.abs(touch.clientY - touchStartPos.y)

    // Only capture navigation scrubbing if finger moves more than 10px to avoid canceling tap clicks
    if (diffX > 10 || diffY > 10) {
      if (e.cancelable) {
        e.preventDefault() // Stop page scroll while dragging over nav bar
      }
      const element = document.elementFromPoint(touch.clientX, touch.clientY)
      if (element) {
        const navItem = element.closest('.mobile-nav-item')
        if (navItem) {
          const indexAttr = navItem.getAttribute('data-index')
          if (indexAttr !== null) {
            const index = parseInt(indexAttr, 10)
            if (index !== getCurrentIndex()) {
              navigateToIndex(index)
            }
          }
        }
      }
    }
  }

  const handleHomeClick = (e) => {
    e.preventDefault()
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      navigate('/')
    } else {
      navigate('/')
      window.scrollTo(0, 0)
    }
  }

  const handleAnchorClick = (e, targetId) => {
    e.preventDefault()
    if (location.pathname === '/') {
      const target = document.querySelector(targetId)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
      navigate(targetId)
    } else {
      navigate('/' + targetId)
    }
  }

  return (
    <>
      {/* Mobile Top Announcement Bar (Looping Ticker) */}
      <div className="mobile-top-announcement">
        <div className="announcement-track">
          <span>Order Now</span>
          <span>Order Now</span>
          <span>Order Now</span>
          <span>Order Now</span>
          {/* Duplicate items for seamless loop */}
          <span>Order Now</span>
          <span>Order Now</span>
          <span>Order Now</span>
          <span>Order Now</span>
        </div>
      </div>

      <header className="global-header" style={{ opacity: 1, display: 'flex' }}>
        <a href="/" className="logo" style={{ opacity: 1 }} onClick={handleHomeClick}>
          <img 
            style={{ height: '80px' }} 
            src="/Screenshot_2026-06-17_at_1.32.38_PM-removebg-preview.png" 
            alt="MANTIS" 
          />
        </a>
        
        <nav className="nav-links" style={{ opacity: 1, display: 'flex' }}>
          <a 
            href="/" 
            className={`nav-item ${isActive('/') && !location.hash ? 'active' : ''}`}
            data-sec="hero"
            onClick={handleHomeClick}
          >
            Home
          </a>
          
          <div 
            className="nav-item-dropdown"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <Link to="/shop" className={`nav-item ${isActive('/shop') ? 'active' : ''}`}>
              Shop ▾
            </Link>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/shop" className="dropdown-item">All Products</Link>
                <Link to="/shop?category=pull-handles" className="dropdown-item">Pull Handles</Link>
                <Link to="/shop?category=lever-handles" className="dropdown-item">Lever Handles</Link>
                <Link to="/shop?category=smart-locks" className="dropdown-item">Smart Locks</Link>
                <Link to="/shop?category=door-hinges" className="dropdown-item">Door Hinges</Link>
                <Link to="/shop?category=door-closers" className="dropdown-item">Door Closers</Link>
                <Link to="/shop?category=accessories" className="dropdown-item">Accessories</Link>
              </div>
            )}
          </div>
          
          <a href="/#about" className="nav-item" data-sec="about" onClick={(e) => handleAnchorClick(e, '#about')}>About</a>
          <a href="/#contact" className="nav-item" data-sec="contact" onClick={(e) => handleAnchorClick(e, '#contact')}>Contact</a>
        </nav>
        
        <a href="/#contact" className="header-cta" style={{ opacity: 1 }} onClick={(e) => handleAnchorClick(e, '#contact')}>Inquire</a>
      </header>

      {/* Mobile Glass Bottom Navigation Dock */}
      <nav 
        className="mobile-bottom-nav" 
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        <a 
          href="/" 
          className={`mobile-nav-item ${isActive('/') && !location.hash ? 'active' : ''}`}
          data-index={0}
          onClick={handleHomeClick}
        >
          <svg className="mobile-nav-icon" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
        </a>
        
        <Link 
          to="/shop" 
          className={`mobile-nav-item ${isActive('/shop') ? 'active' : ''}`}
          data-index={1}
        >
          <svg className="mobile-nav-icon" viewBox="0 0 24 24">
            <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-8-2h4v2h-4V4zm8 15H4V8h16v11z"/>
          </svg>
        </Link>
        
        <a 
          href="/#about" 
          className={`mobile-nav-item ${location.hash === '#about' ? 'active' : ''}`}
          onClick={(e) => handleAnchorClick(e, '#about')}
          data-index={2}
        >
          <svg className="mobile-nav-icon" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
          </svg>
        </a>
        
        <a 
          href="/#contact" 
          className={`mobile-nav-item ${location.hash === '#contact' ? 'active' : ''}`}
          onClick={(e) => handleAnchorClick(e, '#contact')}
          data-index={3}
        >
          <svg className="mobile-nav-icon" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        </a>
      </nav>
    </>
  )
}

export default Header
