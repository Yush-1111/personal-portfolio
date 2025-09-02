import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { PlusCircle, Edit, Trash2, LogIn } from 'lucide-react'

export default function Admin() {
  const [projects, setProjects] = useState([])
  const [form, setForm] = useState({ title: '', description: '', url: '', repo: '', tags: '', cover: '' })
  const [editing, setEditing] = useState(null)
  const [file, setFile] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('admin_token') || '')

  const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    try {
      const r = await api.get('/api/admin/projects')
      setProjects(r.data.projects || [])
    } catch (e) {}
  }

  const submit = async (e) => {
    e.preventDefault()
    try {
      let coverUrl = form.cover
      if (file) {
        const fd = new FormData()
        fd.append('file', file)
        const up = await api.post('/api/admin/upload', fd, {
          headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'multipart/form-data' },
        })
        coverUrl = up.data.url
      }

      const payload = {
        ...form,
        cover: coverUrl,
        tags: form.tags.split(',').map((s) => s.trim()).filter(Boolean),
      }

      if (editing) {
        await api.put('/api/admin/projects/' + editing, payload, {
          headers: { Authorization: 'Bearer ' + token },
        })
      } else {
        await api.post('/api/admin/projects', payload, {
          headers: { Authorization: 'Bearer ' + token },
        })
      }

      setForm({ title: '', description: '', url: '', repo: '', tags: '', cover: '' })
      setFile(null)
      setEditing(null)
      await load()
    } catch (e) {
      alert(e.response?.data?.error || 'Error')
    }
  }

  const remove = async (id) => {
    if (!confirm('Delete project?')) return
    await api.delete('/api/admin/projects/' + id, { headers: { Authorization: 'Bearer ' + token } })
    await load()
  }

  const login = async () => {
    const user = prompt('admin username (register first):')
    const pass = prompt('password:')
    if (!user || !pass) return
    try {
      const r = await api.post('/api/auth/login', { username: user, password: pass })
      localStorage.setItem('admin_token', r.data.token)
      setToken(r.data.token)
      alert('Logged in')
    } catch (e) {
      alert('Login failed')
    }
  }

  return (
    <section className="py-24 bg-slate-950 text-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-extrabold"
          >
            Admin — Projects
          </motion.h2>

          <button
            onClick={login}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary/80 transition-colors"
          >
            <LogIn className="w-4 h-4" /> Login
          </button>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-8 grid gap-4 bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-lg"
        >
          <input
            required
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            placeholder="URL"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            className="bg-white/10 border border-white/20 rounded-xl px-4 py-3"
          />
          <input
            placeholder="Repo"
            value={form.repo}
            onChange={(e) => setForm({ ...form, repo: e.target.value })}
            className="bg-white/10 border border-white/20 rounded-xl px-4 py-3"
          />
          <input
            placeholder="Tags (comma separated)"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            className="bg-white/10 border border-white/20 rounded-xl px-4 py-3"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 h-28"
          />
          <div>
            <label className="block text-sm mb-2">Cover image</label>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
            {form.cover && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2">
                <img
                  src={import.meta.env.VITE_API_URL + form.cover}
                  alt="cover"
                  className="h-32 object-cover rounded-xl"
                />
              </motion.div>
            )}
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2 rounded-2xl bg-primary hover:bg-primary/80 transition-colors font-semibold">
              <PlusCircle className="w-4 h-4" /> {editing ? 'Update' : 'Create'}
            </button>
            {editing && (
              <button
                type="button"
                onClick={() => {
                  setEditing(null)
                  setForm({ title: '', description: '', url: '', repo: '', tags: '', cover: '' })
                }}
                className="px-4 py-2 rounded-2xl border border-white/20"
              >
                Cancel
              </button>
            )}
          </div>
        </motion.form>

        {/* Projects List */}
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <AnimatePresence>
            {projects.map((p, i) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.05 }}
                className="p-5 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-lg shadow-md hover:shadow-xl transition"
              >
                <div className="flex justify-between items-start">
                  <div className="max-w-[70%]">
                    <h3 className="font-semibold text-lg">{p.title}</h3>
                    <p className="text-xs text-slate-300 mt-1">{(p.tags || []).join(', ')}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditing(p._id)
                        setForm({
                          title: p.title,
                          description: p.description || '',
                          url: p.url || '',
                          repo: p.repo || '',
                          tags: (p.tags || []).join(', '),
                          cover: p.cover || '',
                        })
                      }}
                      className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 transition"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => remove(p._id)}
                      className="px-3 py-1 rounded-xl bg-red-600/80 hover:bg-red-600 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {p.cover && (
                  <img
                    src={import.meta.env.VITE_API_URL + p.cover}
                    alt=""
                    className="mt-3 h-36 w-full object-cover rounded-xl"
                  />
                )}
                <p className="mt-3 text-sm text-slate-300">{p.description}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
