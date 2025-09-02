import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Suspense fallback={<div className='p-8 text-center'>Loading…</div>}>
      <App />
    </Suspense>
  </BrowserRouter>
)
