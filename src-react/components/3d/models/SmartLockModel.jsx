import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useHardwareMaterial } from '../../../hooks/useHardwareMaterial'

const SmartLockModel = ({ visible, finish }) => {
  const groupRef = useRef()
  const keypadLightsRef = useRef([])
  
  const mainMaterial = useHardwareMaterial(finish)
  const glassMaterial = useHardwareMaterial('black')

  useFrame(({ clock, mouse }) => {
    if (!groupRef.current || !visible) return
    
    // Subtle parallax effect
    const targetYRot = mouse.x * 0.08
    const targetXRot = -mouse.y * 0.05
    
    groupRef.current.rotation.y += (targetYRot - groupRef.current.rotation.y) * 0.03
    groupRef.current.rotation.x += (targetXRot - groupRef.current.rotation.x) * 0.03
    
    // Pulse keypad lights
    const time = clock.getElapsedTime()
    keypadLightsRef.current.forEach((light, i) => {
      if (light) {
        const offset = i * 0.1
        const intensity = 1.5 + Math.sin(time * 2 + offset) * 0.3
        light.material.emissiveIntensity = intensity
      }
    })
  })

  return (
    <group 
      ref={groupRef} 
      visible={visible} 
      scale={1.0} 
      position={visible ? [0, 0, 0] : [-6, 0, -3]}
      rotation={visible ? [0, -0.3, 0] : [0, Math.PI / 4, 0]}
    >
      {/* Main body - backplate */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.2, 3.5, 0.15]} />
        <meshPhysicalMaterial {...mainMaterial} />
      </mesh>
      
      {/* Glass faceplate with biometric scanner */}
      <mesh position={[0, 0.8, 0.08]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 1.2, 0.05]} />
        <meshPhysicalMaterial 
          color="#000000"
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Biometric scanner (glowing cyan) */}
      <mesh position={[0, 1.2, 0.12]}>
        <circleGeometry args={[0.15, 32]} />
        <meshBasicMaterial color="#00b7ff" />
      </mesh>
      
      {/* Keypad lights (3x4 grid) */}
      <group position={[0, -0.2, 0.12]}>
        {Array.from({ length: 12 }).map((_, i) => {
          const row = Math.floor(i / 3)
          const col = i % 3
          const x = (col - 1) * 0.2
          const y = (1.5 - row) * 0.22
          
          return (
            <mesh 
              key={i} 
              ref={el => keypadLightsRef.current[i] = el}
              position={[x, y, 0]}
            >
              <circleGeometry args={[0.06, 16]} />
              <meshStandardMaterial 
                color="#00b7ff"
                emissive="#00b7ff"
                emissiveIntensity={1.5}
              />
            </mesh>
          )
        })}
      </group>
      
      {/* Lever handle */}
      <group position={[0, -1.2, 0.08]}>
        <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.15]}>
          <cylinderGeometry args={[0.15, 0.18, 0.3, 32]} />
          <meshPhysicalMaterial {...mainMaterial} />
        </mesh>
        
        <mesh castShadow receiveShadow position={[0.6, 0, 0.32]}>
          <boxGeometry args={[1.2, 0.2, 0.12]} />
          <meshPhysicalMaterial {...mainMaterial} />
        </mesh>
      </group>
    </group>
  )
}

export default SmartLockModel
