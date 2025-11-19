import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu } from 'lucide-react'

export default function Navbar({ onOpenNewsletter }) {
  const [open, setOpen] = useState(false)

  const linkClasses = ({ isActive }) =>
    `text-sm tracking-widest uppercase transition-colors ${isActive ? 'text-white' : 'text-zinc-400 hover:text-white'}`

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between h-16 border-b border-white/10">
          <Link to="/" className="text-zinc-200 hover:text-white">
            <span className="font-serif text-xl tracking-[0.15em]">The Chess Club</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/club" className={linkClasses}>The Club</NavLink>
            <NavLink to="/archive" className={linkClasses}>The Archive</NavLink>
            <NavLink to="/events" className={linkClasses}>Events</NavLink>
            <NavLink to="/shop" className={linkClasses}>Shop</NavLink>
            <button onClick={onOpenNewsletter} className="text-sm tracking-widest uppercase text-zinc-300 hover:text-white">Join</button>
          </nav>
          <button onClick={() => setOpen(!open)} className="md:hidden text-zinc-300">
            <Menu size={22} />
          </button>
        </div>
        {open && (
          <div className="md:hidden bg-black/70 backdrop-blur border-b border-white/10">
            <div className="px-6 py-4 flex flex-col gap-4">
              <NavLink onClick={() => setOpen(false)} to="/club" className={linkClasses}>The Club</NavLink>
              <NavLink onClick={() => setOpen(false)} to="/archive" className={linkClasses}>The Archive</NavLink>
              <NavLink onClick={() => setOpen(false)} to="/events" className={linkClasses}>Events</NavLink>
              <NavLink onClick={() => setOpen(false)} to="/shop" className={linkClasses}>Shop</NavLink>
              <button onClick={() => { setOpen(false); onOpenNewsletter && onOpenNewsletter(); }} className="text-left text-sm tracking-widest uppercase text-zinc-300 hover:text-white">Join</button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
