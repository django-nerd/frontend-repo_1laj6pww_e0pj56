import { useEffect, useState } from 'react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Events() {
  const [items, setItems] = useState([])
  useEffect(() => {
    fetch(`${baseUrl}/api/events`).then(r => r.json()).then(setItems).catch(() => setItems([]))
  }, [])

  return (
    <main className="bg-black min-h-[100svh] text-zinc-200 pt-24">
      <div className="mx-auto max-w-4xl px-6">
        <h1 className="font-serif text-4xl">Events</h1>
        <p className="mt-2 text-zinc-500">Past and upcoming appearances.</p>

        <div className="mt-10 relative border-l border-white/10 pl-6">
          {items.map((it, idx) => (
            <div key={it.id} className="relative pb-10">
              <span className="absolute -left-[9px] top-1 block w-4 h-4 rounded-full bg-white" />
              <h3 className="text-xl">{it.title}</h3>
              <p className="text-zinc-500 text-sm">{new Date(it.date).toLocaleDateString()} — {it.location}</p>
              {it.image_url && <img src={it.image_url} className="mt-4 w-full rounded border border-white/10" />}
              {it.description && <p className="text-zinc-400 mt-2">{it.description}</p>}
              {it.rsvp_open && (
                <a href="#" className="inline-block mt-4 text-[11px] tracking-[0.3em] uppercase text-black bg-white px-4 py-2 rounded">RSVP</a>
              )}
            </div>
          ))}
          {items.length === 0 && <p className="text-zinc-500">No events yet.</p>}
        </div>
      </div>
    </main>
  )
}
