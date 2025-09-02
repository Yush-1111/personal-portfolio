import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
export default function Particles(){ const ref=useRef(); const pos = React.useMemo(()=>{ const a = new Float32Array(1200*3); for(let i=0;i<1200;i++){ a[i*3+0]=(Math.random()-0.5)*8; a[i*3+1]=(Math.random()-0.5)*6; a[i*3+2]=(Math.random()-0.5)*8 } return a },[])
 useFrame(()=>{ if(ref.current) ref.current.rotation.y += 0.001 })
 return (<points ref={ref}><bufferGeometry><bufferAttribute attach='attributes-position' count={pos.length/3} array={pos} itemSize={3} /></bufferGeometry><pointsMaterial size={0.03} sizeAttenuation depthWrite={false} transparent opacity={0.9} color={new THREE.Color('#60a5fa')} /></points>) }
