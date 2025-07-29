import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Cylinder, Ring } from '@react-three/drei'
import * as THREE from 'three'

export function Aperture3D() {
  const groupRef = useRef<THREE.Group>(null)
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main aperture body */}
      <Cylinder 
        args={[2, 2, 0.5, 32]} 
        position={[0, 0, 0]}
      >
        <meshStandardMaterial 
          color="#6366F1" 
          metalness={0.8} 
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </Cylinder>

      {/* Aperture blades */}
      {[...Array(8)].map((_, i) => (
        <Ring
          key={i}
          ref={ringRef}
          args={[1.5, 2, 32, 1]}
          position={[0, 0, 0.1]}
          rotation={[0, 0, (i * Math.PI) / 4]}
        >
          <meshStandardMaterial 
            color="#1E293B" 
            metalness={0.9} 
            roughness={0.1}
            transparent
            opacity={0.6}
          />
        </Ring>
      ))}

      {/* Inner glow */}
      <Cylinder 
        args={[0.8, 0.8, 0.6, 32]} 
        position={[0, 0, 0]}
      >
        <meshStandardMaterial 
          color="#6366F1" 
          emissive="#6366F1"
          emissiveIntensity={0.3}
          transparent
          opacity={0.4}
        />
      </Cylinder>

      {/* Ambient particles */}
      {[...Array(20)].map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4
          ]}
        >
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial 
            color="#6366F1" 
            emissive="#6366F1"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  )
} 