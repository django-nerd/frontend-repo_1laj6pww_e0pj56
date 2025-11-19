import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function NewsletterModal({ open, onClose, onSubmit }) {
  const [email, setEmail] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit && onSubmit(email)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center px-6"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-lg p-6"
          >
            <div className="text-center">
              <h3 className="font-serif text-2xl text-zinc-100">Join The Club</h3>
              <p className="mt-2 text-zinc-400">Early access, private events, and observatory notes.</p>
            </div>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                type="email"
                required
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-white/10 rounded px-4 py-3 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-white/30"
              />
              <div className="flex gap-3">
                <button type="submit" className="flex-1 bg-white text-black font-medium rounded px-4 py-3 hover:bg-zinc-200 transition-colors">Request Access</button>
                <button type="button" onClick={onClose} className="px-4 py-3 rounded border border-white/10 text-zinc-300 hover:text-white">Close</button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
