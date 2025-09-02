import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const links = [
    ['Home', '/'],
    ['About', '/about'],
    ['Projects', '/projects'],
    ['Contact', '/contact'],
    ['Admin', '/admin'],
  ]

  const [open, setOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="backdrop-blur-xl bg-slate-900/60 sticky top-0 z-50 border-b border-white/10"
      role="navigation"
      aria-label="Main"
    >
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="font-extrabold text-xl tracking-tight"
        >
          Ayush • Dev
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-2 items-center">
          {links.map(([label, to], i) => (
            <motion.div
              key={to}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`
                }
                aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
              >
                {label}
              </NavLink>
            </motion.div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t border-white/10 bg-slate-900/80 backdrop-blur-xl"
          >
            <div className="flex flex-col px-6 py-4 gap-2">
              {links.map(([label, to]) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                      isActive
                        ? 'bg-white/10 text-white'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
