import { useEffect, useState } from 'react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Club() {
  const [items, setItems] = useState([])
  const [openForm, setOpenForm] = useState(false)
  const [form, setForm] = useState({ author_name: '', title: '', content: '', image_url: '' })

  useEffect(() => {
    fetch(`${baseUrl}/api/submissions`).then(r => r.json()).then(setItems).catch(() => setItems([]))
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    await fetch(`${baseUrl}/api/submissions`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setOpenForm(false)
    const refreshed = await fetch(`${baseUrl}/api/submissions`).then(r => r.json()).catch(() => [])
    setItems(refreshed)
  }

  return (
    <main className="bg-black min-h-[100svh] text-zinc-200 pt-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between">
          <h1 className="font-serif text-4xl">The Club</h1>
          <button onClick={() => setOpenForm(true)} className="text-[11px] tracking-[0.3em] uppercase text-zinc-300 hover:text-white">Submit to the Archive</button>
        </div>
        <p className="mt-2 text-zinc-500">A curated feed of contributions from members.</p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map(it => (
            <div key={it.id} className="border border-white/10 rounded overflow-hidden">
              {it.image_url && <img src={it.image_url} className="w-full h-64 object-cover" />}
              <div className="p-4">
                <p className="text-zinc-100">{it.title || it.author_name}</p>
                {it.content && <p className="text-zinc-400 text-sm mt-1">{it.content}</p>}
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-zinc-500">No submissions yet.</div>
          )}
        </div>
      </div>

      {openForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center px-6">
          <form onSubmit={submit} className="w-full max-w-lg bg-zinc-900 border border-white/10 rounded p-6 space-y-4">
            <h3 className="font-serif text-2xl">Submit to the Archive</h3>
            <input className="w-full bg-black border border-white/10 rounded px-4 py-3" placeholder="Your name" value={form.author_name} onChange={(e) => setForm({ ...form, author_name: e.target.value })} required />
            <input className="w-full bg-black border border-white/10 rounded px-4 py-3" placeholder="Title (optional)" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <input className="w-full bg-black border border-white/10 rounded px-4 py-3" placeholder="Image URL (optional)" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
            <textarea className="w-full bg-black border border-white/10 rounded px-4 py-3" placeholder="Short text (optional)" rows={4} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
            <div className="flex gap-3">
              <button type="submit" className="flex-1 bg-white text-black rounded px-4 py-3 hover:bg-zinc-200">Submit</button>
              <button type="button" onClick={() => setOpenForm(false)} className="px-4 py-3 rounded border border-white/10">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </main>
  )
}
