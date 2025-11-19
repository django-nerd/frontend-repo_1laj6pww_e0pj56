import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Product() {
  const { slug } = useParams()
  const [p, setP] = useState(null)

  useEffect(() => {
    fetch(`${baseUrl}/api/products/${slug}`).then(async r => {
      if (r.ok) setP(await r.json())
    })
  }, [slug])

  if (!p) return <main className="bg-black min-h-[100svh] text-zinc-400 pt-24 px-6">Loading…</main>

  return (
    <main className="bg-black min-h-[100svh] text-zinc-200 pt-24">
      <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          {p.images?.[0] && <img src={p.images[0]} className="w-full rounded border border-white/10" />}
        </div>
        <div>
          <h1 className="font-serif text-4xl">{p.name}</h1>
          {p.short && <p className="text-zinc-400 mt-2">{p.short}</p>}
          <p className="mt-6 text-xl">${p.price.toFixed(0)} {p.currency}</p>
          {p.description && <p className="mt-6 text-zinc-400 whitespace-pre-wrap">{p.description}</p>}
          <button className="mt-8 bg-white text-black rounded px-6 py-3">Add to bag</button>
        </div>
      </div>
      {p.images?.slice(1).length > 0 && (
        <div className="mx-auto max-w-6xl px-6 mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {p.images.slice(1).map((img, i) => (
            <img key={i} src={img} className="w-full rounded border border-white/10" />
          ))}
        </div>
      )}
    </main>
  )
}
