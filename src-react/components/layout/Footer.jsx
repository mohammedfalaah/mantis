import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="global-footer" style={{
      background: '#0f0f12',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '60px 40px 30px',
      color: 'var(--color-text-secondary)',
      fontSize: '0.85rem',
      position: 'relative',
      zIndex: 10
    }}>
      <div className="footer-container" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '40px',
        paddingBottom: '40px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        {/* Column 1: Brand Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <img 
              style={{ height: '70px', filter: 'brightness(1)' }} 
              src="/Screenshot_2026-06-17_at_1.32.38_PM-removebg-preview.png" 
              alt="MANTIS" 
            />
          </Link>
          <p style={{ margin: 0, lineHeight: 1.6, color: 'var(--color-text-muted)' }}>
            Sculpting luxury architectural fittings and security systems. Premium quality. Timeless design.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h4 style={{ color: '#ffffff', fontWeight: 600, margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.9rem' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li>
              <Link 
                to="/" 
                style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}
                onClick={(e) => {
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    window.location.href = '/';
                  }
                }}
              >
                Home
              </Link>
            </li>
            <li><Link to="/shop" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Shop</Link></li>
            <li><Link to="/about" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>About</Link></li>
            <li><Link to="/contact" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Collections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h4 style={{ color: '#ffffff', fontWeight: 600, margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.9rem' }}>Collections</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><Link to="/shop?category=pull-handles" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Pull Handles</Link></li>
            <li><Link to="/shop?category=lever-handles" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Lever Handles</Link></li>
            <li><Link to="/shop?category=smart-locks" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Smart Locks</Link></li>
            <li><Link to="/shop?category=accessories" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Accessories</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h4 style={{ color: '#ffffff', fontWeight: 600, margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.9rem' }}>Contact Info</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ lineHeight: 1.5 }}>
              <span style={{ color: '#ffffff', fontWeight: 500 }}>Email:</span> info@mantisfittings.com
            </li>
            <li style={{ lineHeight: 1.5 }}>
              <span style={{ color: '#ffffff', fontWeight: 500 }}>Phone:</span> +91 99999 99999
            </li>
            <li style={{ lineHeight: 1.5 }}>
              <span style={{ color: '#ffffff', fontWeight: 500 }}>Support:</span> 1800-123-4567
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div style={{
        maxWidth: '1200px',
        margin: '20px auto 0',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        color: 'var(--color-text-muted)',
        fontSize: '0.75rem'
      }}>
        <span>&copy; {new Date().getFullYear()} MANTIS Studio. All rights reserved.</span>
        <span>India &bull; Designed for Luxury</span>
      </div>
    </footer>
  )
}

export default Footer
