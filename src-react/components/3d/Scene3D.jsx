import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { Suspense, memo } from 'react'
import PullHandleModel from './models/PullHandleModel'
import LeverHandleModel from './models/LeverHandleModel'
import SmartLockModel from './models/SmartLockModel'
import Lighting from './Lighting'
import Environment from './Environment'

const Scene3D = memo(({ 
  activeProduct = 'pull',
  finish = 'black',
  explodeProgress = 0,
  onReady 
}) => {
  return (
    <Canvas
      shadows
      dpr={[1, 2]} // Limit pixel ratio for performance
      gl={{ 
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance'
      }}
      style={{ 
        width: '100%', 
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
      
      <Lighting />
      <Environment />
      
      <Suspense fallback={null}>
        <PullHandleModel 
          visible={activeProduct === 'pull'}
          finish={finish}
          explodeProgress={explodeProgress}
        />
        
        <LeverHandleModel 
          visible={activeProduct === 'lever'}
          finish={finish}
        />
        
        <SmartLockModel 
          visible={activeProduct === 'smart'}
          finish={finish}
        />
      </Suspense>
      
      {/* Optional: Add OrbitControls for testing */}
      {/* <OrbitControls enableDamping dampingFactor={0.05} /> */}
    </Canvas>
  )
})

Scene3D.displayName = 'Scene3D'

export default Scene3D
