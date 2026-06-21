import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useHardwareMaterial } from '../../../hooks/useHardwareMaterial'

const PullHandleModel = ({ visible, finish, explodeProgress = 0 }) => {
  const groupRef = useRef()
  const sleeveRef = useRef()
  const coreRef = useRef()
  const bracketTopRef = useRef()
  const bracketBottomRef = useRef()
  const flangeTopRef = useRef()
  const flangeBottomRef = useRef()
  const screwsRef = useRef([])
  
  const mainMaterial = useHardwareMaterial(finish)
  const coreMaterial = useHardwareMaterial('steel')
  const screwMaterial = useHardwareMaterial('silver')

  // Apply explode animation
  useEffect(() => {
    if (!visible) return
    
    // Sleeve slides forward
    if (sleeveRef.current) {
      sleeveRef.current.position.z = explodeProgress * 1.1
      sleeveRef.current.rotation.y = explodeProgress * 0.25
      sleeveRef.current.rotation.z = explodeProgress * 0.05
    }
    
    // Core moves back slightly
    if (coreRef.current) {
      coreRef.current.position.z = explodeProgress * -0.3
    }
    
    // Brackets push outward
    if (bracketTopRef.current) {
      bracketTopRef.current.position.y = 1.6 + explodeProgress * 0.55
      bracketTopRef.current.position.z = -0.3 + explodeProgress * 0.2
    }
    if (bracketBottomRef.current) {
      bracketBottomRef.current.position.y = -1.6 - explodeProgress * 0.55
      bracketBottomRef.current.position.z = -0.3 + explodeProgress * 0.2
    }
    
    // Flanges
    if (flangeTopRef.current) {
      flangeTopRef.current.position.y = 1.6 + explodeProgress * 0.1
      flangeTopRef.current.position.z = -0.6 - explodeProgress * 0.15
    }
    if (flangeBottomRef.current) {
      flangeBottomRef.current.position.y = -1.6 - explodeProgress * 0.1
      flangeBottomRef.current.position.z = -0.6 - explodeProgress * 0.15
    }
    
    // Screws explode outward
    if (screwsRef.current[0]) screwsRef.current[0].position.x = -0.2 - explodeProgress * 0.6
    if (screwsRef.current[1]) screwsRef.current[1].position.x = 0.2 + explodeProgress * 0.6
    if (screwsRef.current[2]) screwsRef.current[2].position.x = -0.2 - explodeProgress * 0.6
    if (screwsRef.current[3]) screwsRef.current[3].position.x = 0.2 + explodeProgress * 0.6
  }, [explodeProgress, visible])

  useFrame(({ mouse }) => {
    if (!groupRef.current || !visible) return
    
    // Subtle parallax effect
    const targetYRot = mouse.x * 0.08
    const targetXRot = -mouse.y * 0.05
    
    groupRef.current.rotation.y += (targetYRot - groupRef.current.rotation.y) * 0.03
    groupRef.current.rotation.x += (targetXRot - groupRef.current.rotation.x) * 0.03
  })

  return (
    <group ref={groupRef} visible={visible} scale={0.9} position={[0, 0, 0]}>
      {/* Sleeve - main outer handle */}
      <mesh ref={sleeveRef} castShadow receiveShadow>
        <boxGeometry args={[0.35, 4.5, 0.25]} />
        <meshPhysicalMaterial {...mainMaterial} />
      </mesh>
      
      {/* Core - inner bar */}
      <mesh ref={coreRef} castShadow receiveShadow>
        <cylinderGeometry args={[0.12, 0.12, 4.2, 16]} />
        <meshPhysicalMaterial {...coreMaterial} />
      </mesh>
      
      {/* Top bracket */}
      <mesh ref={bracketTopRef} position={[0, 1.6, -0.3]} castShadow receiveShadow>
        <boxGeometry args={[0.32, 0.35, 0.6]} />
        <meshPhysicalMaterial {...mainMaterial} />
      </mesh>
      
      {/* Bottom bracket */}
      <mesh ref={bracketBottomRef} position={[0, -1.6, -0.3]} castShadow receiveShadow>
        <boxGeometry args={[0.32, 0.35, 0.6]} />
        <meshPhysicalMaterial {...mainMaterial} />
      </mesh>
      
      {/* Top flange */}
      <mesh ref={flangeTopRef} position={[0, 1.6, -0.6]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.25, 0.25, 0.08, 32]} />
        <meshPhysicalMaterial {...mainMaterial} />
      </mesh>
      
      {/* Bottom flange */}
      <mesh ref={flangeBottomRef} position={[0, -1.6, -0.6]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.25, 0.25, 0.08, 32]} />
        <meshPhysicalMaterial {...mainMaterial} />
      </mesh>
      
      {/* Screws */}
      <group>
        <mesh ref={el => screwsRef.current[0] = el} position={[-0.2, 1.6, -0.3]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 0.15, 8]} />
          <meshPhysicalMaterial {...screwMaterial} />
        </mesh>
        <mesh ref={el => screwsRef.current[1] = el} position={[0.2, 1.6, -0.3]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 0.15, 8]} />
          <meshPhysicalMaterial {...screwMaterial} />
        </mesh>
        <mesh ref={el => screwsRef.current[2] = el} position={[-0.2, -1.6, -0.3]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 0.15, 8]} />
          <meshPhysicalMaterial {...screwMaterial} />
        </mesh>
        <mesh ref={el => screwsRef.current[3] = el} position={[0.2, -1.6, -0.3]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 0.15, 8]} />
          <meshPhysicalMaterial {...screwMaterial} />
        </mesh>
      </group>
    </group>
  )
}

export default PullHandleModel
