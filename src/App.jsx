import { useRef, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ThreePanel from './components/ThreePanel'
import { ClubPreview, ArchivePreview, EventsPreview, Footer } from './components/Sections'
import NewsletterModal from './components/NewsletterModal'
import Club from './pages/Club'
import Archive from './pages/Archive'
import Events from './pages/Events'
import Shop from './pages/Shop'
import Product from './pages/Product'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Landing() {
  const panelRef = useRef(null)
  const [newsletterOpen, setNewsletterOpen] = useState(false)
  const scrollToPanels = () => {
    const el = document.getElementById('panels')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const submitNewsletter = async (email) => {
    try {
      await fetch(`${baseUrl}/api/newsletter`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, source: 'hero-modal' })
      })
      setNewsletterOpen(false)
      alert('Request received. Welcome to The Club.')
    } catch (e) {
      setNewsletterOpen(false)
    }
  }

  return (
    <div className="bg-black text-zinc-200">
      <Navbar onOpenNewsletter={() => setNewsletterOpen(true)} />
      <Hero onScrollHintClick={scrollToPanels} />
      <ThreePanel />
      <ClubPreview />
      <ArchivePreview />
      <EventsPreview />
      <Footer />
      <NewsletterModal open={newsletterOpen} onClose={() => setNewsletterOpen(false)} onSubmit={submitNewsletter} />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/club" element={<Club />} />
      <Route path="/archive" element={<Archive />} />
      <Route path="/events" element={<Events />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/shop/:slug" element={<Product />} />
    </Routes>
  )
}
