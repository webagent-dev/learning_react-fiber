/* eslint-disable react/no-unknown-property */
import React, { useEffect, useRef  }from 'react'
import { angleToRadians } from '../utils/angle'
import gsap from 'gsap'
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
const Three = () => {
  const orbitRef = useRef(null);
  const ballRef = useRef(null);
  useFrame((state) => {
     if(!!orbitRef.current) {
         const {x, y}  = state.mouse
         orbitRef.current.setAzimuthalAngle(-x * angleToRadians(45));
         orbitRef.current.setPolarAngle((y + 0.5) * angleToRadians(90-30));
         orbitRef.current.update();
      }
  })

  useEffect(() => {
    if(!!ballRef.current){
      const timeline = gsap.timeline({pause: true});
      timeline.to(ballRef.current.position,{
        x: 2,
        duration: 2,
        ease: "power2.out"
      })
      timeline.to(ballRef.current.position,{
        y: 0.5,
        duration: 2.0,
        ease: "bounce.out"
      }, "<")
      timeline.play(); 
    }
  },[ballRef.current])
  
  return (
    <>
    <PerspectiveCamera makeDefault position={[0, 1, 5]}/>
    <OrbitControls ref={orbitRef} minPolarAngle={angleToRadians(60)} maxPolarAngle={angleToRadians(80)}/>
        <mesh position={[-2,2.5,0]} castShadow ref={ballRef}>
            <sphereGeometry args={[0.6, 32,32]} metalness={0.6} roughness={0.2}/>
            <meshStandardMaterial  color='white'/>
        </mesh>
        <mesh rotation={[ -(angleToRadians(90)), 0, 0]} receiveShadow>
                  <planeGeometry args={[20,20]}/>
                   <meshStandardMaterial  color='#0c30a5'/>
        </mesh>
        <ambientLight args={['white', 0.25]}/> 
        <spotLight args={['white', 1.9, 10, angleToRadians(65), 0.8]} position={[-1,1,0.9]} castShadow/>
        <Environment background>
          <mesh>
          <sphereGeometry args={[50, 100, 100]}/>
          <meshBasicMaterial side={THREE.BackSide} color='#0d1fc1'  metalness={0.6} roughness={0.2}/>
          </mesh>
        </Environment>
    </>
  )
}

export default Three