import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Panel = ({ title, subtitle, to }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.8 }}
    className="group relative overflow-hidden rounded-md border border-white/10 bg-gradient-to-b from-zinc-900 to-black"
  >
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_0%,rgba(255,215,0,0.08),transparent_60%)]" />
    <div className="p-8 md:p-10 min-h-[220px] flex flex-col justify-end">
      <h3 className="font-serif text-2xl text-zinc-100">{title}</h3>
      <p className="mt-2 text-zinc-400">{subtitle}</p>
      <Link
        to={to}
        className="mt-6 inline-block text-[11px] tracking-[0.3em] uppercase text-zinc-300 group-hover:text-white"
      >
        Enter
      </Link>
    </div>
  </motion.div>
)

export default function ThreePanel() {
  return (
    <section id="panels" className="relative bg-black py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <Panel title="Next Pop‑Up" subtitle="Private invitations and locations" to="/events" />
          <Panel title="Latest Drop" subtitle="Early access for members" to="/shop" />
          <Panel title="Community Stories" subtitle="The Club, curated" to="/club" />
        </div>
      </div>
    </section>
  )
}
