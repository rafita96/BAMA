function Shape({ shape, position, color}) {
  return (
    <mesh position={position}>
      <meshPhongMaterial attach="material" color={color} />
      <shapeBufferGeometry attach="geometry" args={[shape]} />
    </mesh>
  )
}

export default Shape;