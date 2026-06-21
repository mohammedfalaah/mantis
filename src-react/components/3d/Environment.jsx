const Environment = () => {
  return (
    <>
      {/* White background */}
      <color attach="background" args={['#ffffff']} />
      
      {/* Shadow receiving plane */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -3, 0]} 
        receiveShadow
      >
        <planeGeometry args={[20, 20]} />
        <shadowMaterial opacity={0.05} />
      </mesh>
    </>
  )
}

export default Environment
