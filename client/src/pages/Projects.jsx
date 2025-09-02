import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Folders, X } from 'lucide-react'

// Professional Animated Project Showcase
// - Single-file React component
// - Uses Tailwind CSS for styling
// - Uses Framer Motion for smooth animations
// - Includes search, tag filtering, project cards, and modal preview
// - Default export is the component so it can be previewed directly

const SAMPLE_PROJECTS = [
  {
    id: 'p1',
    title: 'Next-Gen Dashboard UI',
    description: 'A responsive analytics dashboard with realtime charts and beautiful micro-interactions.',
    tags: ['React', 'Dashboard', 'Animation'],
    img: 'https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=1',
  },
  {
    id: 'p2',
    title: 'E‑commerce website',
    description: 'Polished checkout flow with animated product cards and accessible forms.',
    tags: ['E‑commerce', 'Design', 'Accessibility'],
    img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=2',
  },
  {
    id: 'p3',
    title: '3D Portfolio website  ',
    description: 'Interactive 3D gallery using WebGL and subtle camera motion.',
    tags: ['Three.js', 'Portfolio', 'WebGL'],
    img: 'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=3',
  },
  {
    id: 'p4',
    title: 'Physio Therepist Landing Page',
    description: 'High-converting landing page with sequenced scroll animations.',
    tags: ['Landing', 'Marketing', 'SEO'],
    img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=4',
  },
]

export default function ProjectShowcase() {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState('All')
  const [selected, setSelected] = useState(null)

  const allTags = useMemo(() => {
    const s = new Set()
    SAMPLE_PROJECTS.forEach((p) => p.tags.forEach((t) => s.add(t)))
    return ['All', ...Array.from(s)]
  }, [])

  const filtered = useMemo(() => {
    return SAMPLE_PROJECTS.filter((p) => {
      const matchesQuery = (p.title + ' ' + p.description + ' ' + p.tags.join(' '))
        .toLowerCase()
        .includes(query.toLowerCase())
      const matchesTag = activeTag === 'All' ? true : p.tags.includes(activeTag)
      return matchesQuery && matchesTag
    })
  }, [query, activeTag])

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans text-slate-900">
      <header className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold">Projects — Showcase</h1>
            <p className="mt-1 text-slate-600">A current list of polished projects with delightful animations.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                aria-label="Search projects"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-2xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
                placeholder="Search projects, tags, description..."
              />
            </div>

            <button
              onClick={() => { setQuery(''); setActiveTag('All') }}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-2xl border border-slate-200 bg-white hover:shadow-md"
            >
              <Folders className="w-4 h-4 text-slate-600" />
              Reset
            </button>
          </div>
        </motion.div>

        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 flex gap-3 overflow-x-auto pb-2"
        >
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border ${
                activeTag === tag ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border-slate-200'
              } shadow-sm`}
            >
              {tag}
            </button>
          ))}
        </motion.nav>
      </header>

      <main className="mx-auto mt-8 max-w-6xl">
        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-xl border border-dashed border-slate-200 bg-white p-8 text-center"
            >
              <p className="text-slate-600">No projects found. Try a different search or tag.</p>
            </motion.div>
          )}
        </AnimatePresence>

        <section className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, boxShadow: '0 10px 30px rgba(2,6,23,0.08)' }}
              transition={{ delay: i * 0.06, type: 'spring', stiffness: 120 }}
              className="group relative rounded-2xl overflow-hidden bg-white border border-slate-100 cursor-pointer"
              onClick={() => setSelected(p)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') setSelected(p) }}
            >
              <div className="aspect-[16/10] w-full bg-slate-100">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-slate-500 line-clamp-2">{p.description}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs font-medium px-2 py-1 rounded-full bg-slate-100">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 pointer-events-none"
              />
            </motion.article>
          ))}
        </section>

        {/* Modal Preview */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
            >
              <motion.div
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.98, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100"
              >
                <div className="relative">
                  <img src={selected.img} alt={selected.title} className="w-full h-80 object-cover" />

                  <button
                    onClick={() => setSelected(null)}
                    className="absolute right-4 top-4 p-2 rounded-full bg-white/80 hover:bg-white"
                    aria-label="Close preview"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6">
                  <h2 className="text-2xl font-bold">{selected.title}</h2>
                  <p className="mt-2 text-slate-600">{selected.description}</p>

                  <div className="mt-4 flex items-center gap-3">
                    {selected.tags.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full bg-slate-100 text-sm font-medium">{t}</span>
                    ))}
                  </div>

                  <div className="mt-6 flex gap-3">
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="inline-flex items-center px-5 py-2 rounded-lg border bg-slate-900 text-white"
                    >
                      View case study
                    </a>

                    <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center px-5 py-2 rounded-lg border">
                      Live demo
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* backdrop */}
              <motion.div
                onClick={() => setSelected(null)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.45 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="mt-12 text-center text-sm text-slate-500">
          Built with — change the sample data to showcase your own projects.
        </footer>
      </main>
    </div>
  )
}
