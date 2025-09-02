import React from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import Particles from '../three/Particles.jsx'
export default function Home(){ return (
  <div className='relative min-h-[80vh] flex items-center'>
    <div className='absolute inset-0 -z-10' aria-hidden>
      <Canvas camera={{position:[0,0,6], fov:60}}>
        <ambientLight intensity={0.5}/>
        <Particles />
      </Canvas>
    </div>
    <div className='max-w-6xl mx-auto px-6 py-24 text-center'>
      <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8}} className='text-4xl md:text-6xl font-bold'>Hi I Am Ayush Fareliya</motion.h1>
      <motion.p initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.15}} className='mt-4 text-slate-300'>I build high-impact web apps with delightful animations and accessible UX.</motion.p>
    </div>
  </div>
)}
