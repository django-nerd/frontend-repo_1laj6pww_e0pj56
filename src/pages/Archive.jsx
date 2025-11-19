import { useEffect, useState } from 'react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Archive() {
  const [items, setItems] = useState([])
  useEffect(() => {
    fetch(`${baseUrl}/api/archive`).then(r => r.json()).then(setItems).catch(() => setItems([]))
  }, [])

  return (
    <main className="bg-black min-h-[100svh] text-zinc-200 pt-24">
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="font-serif text-4xl">The Archive</h1>
        <p className="mt-2 text-zinc-500">Editorial journeys, prototypes and evolution logs.</p>

        <div className="mt-10 space-y-16">
          {items.map((it) => (
            <article key={it.id} className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
              <div className="md:col-span-3">
                {it.image_urls?.[0] && (
                  <img src={it.image_urls[0]} className="w-full aspect-[16/9] object-cover rounded border border-white/10" />
                )}
              </div>
              <div className="md:col-span-2">
                <h3 className="text-2xl">{it.title}</h3>
                {it.subtitle && <p className="text-zinc-400 mt-2">{it.subtitle}</p>}
                {it.body && <p className="text-zinc-400 mt-4 whitespace-pre-wrap">{it.body}</p>}
                {it.timeline_label && <p className="text-[11px] tracking-[0.3em] uppercase text-zinc-500 mt-6">{it.timeline_label}</p>}
              </div>
            </article>
          ))}
          {items.length === 0 && <p className="text-zinc-500">The archive awaits its first entry.</p>}
        </div>
      </div>
    </main>
  )
}
