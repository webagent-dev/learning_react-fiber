import React from 'react'
import 
const Three = () => {
  return (
    <>
        <mesh>
            <sphereGeometry args={[1, 32,32]}/>
            <meshStandardMaterial  color='white'/>
        </mesh>
        <mesh rotate={}>
                  <planeGeometry args={[7,7]}/>
                   <meshStandardMaterial  color='blue'/>
        </mesh>
        <ambientLight color='white'/>
    </>
  )
}

export default Three