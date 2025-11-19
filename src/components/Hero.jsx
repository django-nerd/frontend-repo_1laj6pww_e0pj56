import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero({ onScrollHintClick }) {
  return (
    <section className="relative h-[100svh] w-full bg-black overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/UGnf9D1Hp3OG8vSG/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient veils for mood */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-black/30 to-black"></div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
          className="font-serif text-5xl md:text-7xl text-zinc-100 tracking-tight"
        >
          The Observatory
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.6 }}
          className="mt-5 text-zinc-300 tracking-wide"
        >
          Where luxury meets strategy.
        </motion.p>
      </div>

      {/* Scroll cue */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 2, duration: 1.2 }}
        onClick={onScrollHintClick}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-400 hover:text-white transition-colors"
      >
        <span className="block text-[11px] tracking-[0.3em] uppercase">Scroll</span>
        <span className="block mt-2 w-px h-8 bg-zinc-600 mx-auto"></span>
      </motion.button>
    </section>
  )
}
