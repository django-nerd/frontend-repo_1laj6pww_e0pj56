import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Shop() {
  const [items, setItems] = useState([])
  useEffect(() => {
    fetch(`${baseUrl}/api/products`).then(r => r.json()).then(setItems).catch(() => setItems([]))
  }, [])

  return (
    <main className="bg-black min-h-[100svh] text-zinc-200 pt-24">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="font-serif text-4xl">Shop</h1>
        <p className="mt-2 text-zinc-500">Minimal grid. Cinematic detail pages.</p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map(p => (
            <Link key={p.id} to={`/shop/${p.slug}`} className="group block border border-white/10 rounded overflow-hidden">
              {p.images?.[0] && <img src={p.images[0]} className="w-full aspect-[4/5] object-cover" />}
              <div className="p-4 flex items-center justify-between">
                <p className="text-zinc-100">{p.name}</p>
                <p className="text-zinc-400">${p.price.toFixed(0)}</p>
              </div>
            </Link>
          ))}
          {items.length === 0 && <p className="text-zinc-500">No products yet.</p>}
        </div>
      </div>
    </main>
  )
}
