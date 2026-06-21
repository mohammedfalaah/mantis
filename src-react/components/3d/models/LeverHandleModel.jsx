import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useHardwareMaterial } from '../../../hooks/useHardwareMaterial'

const LeverHandleModel = ({ visible, finish }) => {
  const groupRef = useRef()
  const leverGroupRef = useRef()
  
  const mainMaterial = useHardwareMaterial(finish)
  const screwMaterial = useHardwareMaterial('silver')

  useFrame(({ mouse }) => {
    if (!groupRef.current || !visible) return
    
    // Subtle parallax effect
    const targetYRot = mouse.x * 0.08
    const targetXRot = -mouse.y * 0.05
    
    groupRef.current.rotation.y += (targetYRot - groupRef.current.rotation.y) * 0.03
    groupRef.current.rotation.x += (targetXRot - groupRef.current.rotation.x) * 0.03
  })

  return (
    <group 
      ref={groupRef} 
      visible={visible} 
      scale={1.2} 
      position={visible ? [0, 0, 0] : [6, 0, -3]}
      rotation={visible ? [0, 0, 0] : [0, -Math.PI / 4, 0]}
    >
      {/* Backplate */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.8, 3.2, 0.12]} />
        <meshPhysicalMaterial {...mainMaterial} />
      </mesh>
      
      {/* Lever group */}
      <group ref={leverGroupRef} position={[0, 0.7, 0.08]}>
        {/* Neck */}
        <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.15]}>
          <cylinderGeometry args={[0.18, 0.22, 0.35, 32]} />
          <meshPhysicalMaterial {...mainMaterial} />
        </mesh>
        
        {/* Lever arm - simplified */}
        <mesh castShadow receiveShadow position={[0.8, 0, 0.38]}>
          <boxGeometry args={[1.8, 0.24, 0.16]} />
          <meshPhysicalMaterial {...mainMaterial} />
        </mesh>
      </group>
      
      {/* Mounting screws */}
      <group>
        {[
          [-0.25, 1.35, 0.08],
          [0.25, 1.35, 0.08],
          [-0.25, -1.35, 0.08],
          [0.25, -1.35, 0.08]
        ].map((pos, i) => (
          <mesh key={i} position={pos} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.05, 12]} />
            <meshPhysicalMaterial {...screwMaterial} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

export default LeverHandleModel
