import React, { lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
const Home = lazy(()=>import('./pages/Home.jsx'))
const About = lazy(()=>import('./pages/About.jsx'))
const Projects = lazy(()=>import('./pages/Projects.jsx'))
const Contact = lazy(()=>import('./pages/Contact.jsx'))
const Admin = lazy(()=>import('./pages/Admin.jsx'))

export default function App(){ const loc = useLocation(); return (
  <div className='font-inter min-h-screen flex flex-col'>
    <Nav />
    <main className='flex-1'>
      <AnimatePresence mode='wait' initial={false}>
        <Routes location={loc} key={loc.pathname}>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/projects' element={<Projects/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/admin' element={<Admin/>} />
        </Routes>
      </AnimatePresence>
    </main>
    <Footer />
  </div>
)
}
