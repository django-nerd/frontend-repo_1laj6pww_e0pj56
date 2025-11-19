import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export function ClubPreview() {
  const [items, setItems] = useState([])
  useEffect(() => {
    fetch(`${baseUrl}/api/submissions?limit=6`).then(r => r.json()).then(setItems).catch(() => setItems([]))
  }, [])
  return (
    <section className="bg-black py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-serif text-3xl text-zinc-100">The Club</h2>
          <a href="/club" className="text-[11px] tracking-[0.3em] uppercase text-zinc-400 hover:text-white">View All</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((it) => (
            <motion.div key={it.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="border border-white/10 rounded overflow-hidden">
              {it.image_url && <img src={it.image_url} alt={it.title || 'Submission'} className="w-full h-56 object-cover" />}
              <div className="p-4">
                <p className="text-zinc-200">{it.title || it.author_name}</p>
                {it.content && <p className="mt-1 text-sm text-zinc-400 line-clamp-2">{it.content}</p>}
              </div>
            </motion.div>
          ))}
          {items.length === 0 && (
            <div className="text-zinc-400">No submissions yet. Be the first to contribute.</div>
          )}
        </div>
      </div>
    </section>
  )
}

export function ArchivePreview() {
  const [items, setItems] = useState([])
  useEffect(() => {
    fetch(`${baseUrl}/api/archive?limit=6`).then(r => r.json()).then(setItems).catch(() => setItems([]))
  }, [])
  return (
    <section className="bg-black py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-serif text-3xl text-zinc-100">The Archive</h2>
          <a href="/archive" className="text-[11px] tracking-[0.3em] uppercase text-zinc-400 hover:text-white">Explore</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((it) => (
            <div key={it.id} className="border border-white/10 rounded overflow-hidden">
              {it.image_urls?.[0] && <img src={it.image_urls[0]} alt={it.title} className="w-full h-72 object-cover" />}
              <div className="p-6">
                <p className="text-zinc-200 font-medium">{it.title}</p>
                {it.subtitle && <p className="text-zinc-400 mt-1">{it.subtitle}</p>}
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-zinc-400">Archive is quiet for now.</div>
          )}
        </div>
      </div>
    </section>
  )
}

export function EventsPreview() {
  const [items, setItems] = useState([])
  useEffect(() => {
    fetch(`${baseUrl}/api/events?limit=6`).then(r => r.json()).then(setItems).catch(() => setItems([]))
  }, [])
  return (
    <section className="bg-black py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-serif text-3xl text-zinc-100">Events</h2>
          <a href="/events" className="text-[11px] tracking-[0.3em] uppercase text-zinc-400 hover:text-white">See More</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((it) => (
            <div key={it.id} className="border border-white/10 rounded overflow-hidden">
              {it.image_url && <img src={it.image_url} alt={it.title} className="w-full h-56 object-cover" />}
              <div className="p-4">
                <p className="text-zinc-200">{it.title}</p>
                <p className="text-zinc-500 text-sm">{new Date(it.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-zinc-400">No upcoming events yet.</div>
          )}
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-zinc-500 text-sm">© {new Date().getFullYear()} The Chess Club.</p>
        <p className="text-zinc-500 text-sm tracking-[0.25em] uppercase">Luxury • Strategy • Creativity</p>
      </div>
    </footer>
  )
}
