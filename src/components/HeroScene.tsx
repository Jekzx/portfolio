import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import type { Mode } from '../data/profile'

function Core({ mode }: { mode: Mode }) {
  const group = useRef<THREE.Group>(null)
  const knot = useRef<THREE.Mesh>(null)
  const ring = useRef<THREE.Mesh>(null)
  const accent = mode === 'dev' ? '#8b5cf6' : '#21d4c2'
  const secondary = mode === 'dev' ? '#39c6ff' : '#7dd3fc'

  useFrame((state, delta) => {
    if (!group.current || !knot.current || !ring.current) return
    group.current.rotation.y += delta * 0.08
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, state.pointer.y * 0.16, 0.04)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, state.pointer.x * 0.3 + state.clock.elapsedTime * 0.08, 0.04)
    knot.current.rotation.x += delta * 0.11
    knot.current.rotation.z += delta * 0.08
    ring.current.rotation.z -= delta * 0.06
  })

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.45} floatIntensity={0.8}>
        <mesh ref={knot} scale={1.18}>
          <torusKnotGeometry args={[1.2, 0.23, 180, 28]} />
          <meshPhysicalMaterial
            color={accent}
            roughness={0.16}
            metalness={0.72}
            transmission={0.24}
            thickness={1.2}
            clearcoat={1}
            clearcoatRoughness={0.12}
            emissive={accent}
            emissiveIntensity={0.18}
          />
        </mesh>
      </Float>

      <mesh ref={ring} rotation={[Math.PI / 2.25, 0.3, 0]} scale={1.8}>
        <torusGeometry args={[1.35, 0.012, 8, 180]} />
        <meshBasicMaterial color={secondary} transparent opacity={0.55} />
      </mesh>

      <mesh rotation={[0.5, 0.2, -0.4]} scale={2.5}>
        <icosahedronGeometry args={[1, 2]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={0.07} />
      </mesh>

      <Sparkles count={90} scale={7} size={2.2} speed={0.28} opacity={0.45} color={secondary} />
    </group>
  )
}

function Network() {
  const points = useMemo(() => {
    return Array.from({ length: 26 }, (_, i) => {
      const a = (i / 26) * Math.PI * 2
      const r = 2.8 + (i % 4) * 0.26
      return new THREE.Vector3(Math.cos(a) * r, Math.sin(a * 1.7) * 1.4, Math.sin(a) * r * 0.4)
    })
  }, [])

  const positions = useMemo(() => {
    const values: number[] = []
    for (let i = 0; i < points.length; i += 1) {
      const current = points[i]
      const next = points[(i + 3) % points.length]
      values.push(current.x, current.y, current.z, next.x, next.y, next.z)
    }
    return new Float32Array(values)
  }, [points])

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial color="#ffffff" transparent opacity={0.055} />
    </lineSegments>
  )
}

export function HeroScene({ mode }: { mode: Mode }) {
  return (
    <div className="hero-scene" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6.2], fov: 46 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.62} />
        <directionalLight position={[4, 5, 5]} intensity={2.6} color={mode === 'dev' ? '#b9a1ff' : '#89fff3'} />
        <pointLight position={[-4, -2, 3]} intensity={14} distance={12} color="#36bffa" />
        <Core mode={mode} />
        <Network />
      </Canvas>
    </div>
  )
}
