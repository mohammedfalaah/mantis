const Lighting = () => {
  return (
    <>
      {/* Ambient light for overall illumination */}
      <ambientLight intensity={0.8} color="#ffffff" />
      
      {/* Key directional light with shadows */}
      <directionalLight
        position={[2, 3, 3]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        color="#ffffff"
      />
    </>
  )
}

export default Lighting
