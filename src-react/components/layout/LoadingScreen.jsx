import { useEffect, useState } from 'react'
import { gsap } from 'gsap'

const LoadingScreen = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            if (onLoadComplete) onLoadComplete()
          }, 300)
          return 100
        }
        return prev + 10
      })
    }, 100)

    return () => clearInterval(interval)
  }, [onLoadComplete])

  return (
    <div id="loading-screen" style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: '#ffffff',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'opacity 0.6s ease',
      pointerEvents: 'none'
    }}>
      <div className="loader-title" style={{
        fontSize: '2rem',
        fontWeight: 600,
        letterSpacing: '0.1em',
        marginBottom: '16px',
        color: '#000000'
      }}>
        <img 
          style={{ height: '80px' }} 
          src="/Screenshot_2026-06-17_at_1.32.38_PM-removebg-preview.png" 
          alt="" 
        />
      </div>
      
      <div className="loader-bar-bg" style={{
        width: '160px',
        height: '1px',
        background: 'rgba(0, 0, 0, 0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div 
          className="loader-bar-fill" 
          style={{
            width: `${progress}%`,
            height: '100%',
            background: '#000000',
            position: 'absolute',
            left: 0,
            top: 0,
            transition: 'width 0.3s ease'
          }}
        />
      </div>
    </div>
  )
}

export default LoadingScreen
