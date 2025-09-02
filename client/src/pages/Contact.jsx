import React, { useState } from "react"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"
import { Send } from "lucide-react"

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setStatus("Sending…")

    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/api/contact",
        form
      )
      if (res.data?.ok) {
        setStatus("Thanks Your message has been sent.")
        setForm({ name: "", email: "", message: "" })
      } else {
        setStatus(" Error sending message")
      }
    } catch (err) {
      setStatus(" Server error, please try again later")
    }
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Floating background circles */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
          className="absolute w-72 h-72 rounded-full bg-primary/40 blur-3xl top-10 left-10"
        />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 0.25, y: -30 }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
          className="absolute w-96 h-96 rounded-full bg-pink-500/30 blur-3xl bottom-10 right-10"
        />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 py-24">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-center"
        >
          Get in Touch
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-3 text-center text-slate-300"
        >
          Have a question, proposal, or just want to say hello? Fill out the form
          below.
        </motion.p>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 grid gap-6 bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/10"
        >
          {/* Name */}
          <motion.div whileFocus={{ scale: 1.02 }}>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your Name"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/80"
            />
          </motion.div>

          {/* Email */}
          <motion.div whileFocus={{ scale: 1.02 }}>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Your Email"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/80"
            />
          </motion.div>

          {/* Message */}
          <motion.div whileFocus={{ scale: 1.02 }}>
            <textarea
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Your Message"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 h-40 focus:outline-none focus:ring-2 focus:ring-primary/80"
            />
          </motion.div>

          {/* Submit */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 rounded-2xl px-6 py-3 bg-primary hover:bg-primary/80 transition-colors font-semibold shadow-lg"
          >
            <Send className="w-5 h-5" />
            Send Message
          </motion.button>

          {/* Status */}
          <AnimatePresence>
            {status && (
              <motion.p
                key="status"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-sm text-center text-slate-200"
              >
                {status}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  )
}
