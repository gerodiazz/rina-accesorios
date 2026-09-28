import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useContent } from '../../context/SiteContentContext'

const decorativeDots = [
  { x: 5,  y: 15, size: 3, opacity: 0.2 },
  { x: 14, y: 72, size: 5, opacity: 0.13 },
  { x: 23, y: 38, size: 2, opacity: 0.18 },
  { x: 33, y: 82, size: 4, opacity: 0.15 },
  { x: 41, y: 22, size: 3, opacity: 0.2 },
  { x: 52, y: 68, size: 2, opacity: 0.12 },
  { x: 61, y: 44, size: 5, opacity: 0.16 },
  { x: 70, y: 88, size: 3, opacity: 0.14 },
  { x: 81, y: 28, size: 2, opacity: 0.2 },
  { x: 90, y: 58, size: 4, opacity: 0.15 },
  { x: 8,  y: 55, size: 2, opacity: 0.12 },
  { x: 28, y: 92, size: 3, opacity: 0.18 },
  { x: 73, y: 10, size: 4, opacity: 0.16 },
  { x: 84, y: 76, size: 2, opacity: 0.13 },
  { x: 48, y: 90, size: 3, opacity: 0.15 },
  { x: 18, y: 6,  size: 2, opacity: 0.2 },
  { x: 58, y: 33, size: 4, opacity: 0.14 },
  { x: 93, y: 82, size: 3, opacity: 0.12 },
  { x: 38, y: 48, size: 2, opacity: 0.18 },
  { x: 96, y: 18, size: 3, opacity: 0.16 },
]

export function CTASection() {
  const { get } = useContent()

  return (
    <section
      className="relative py-32 overflow-hidden"
      style={{ background: 'var(--color-ink)' }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {decorativeDots.map((dot, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              background: 'var(--color-accent)',
              opacity: dot.opacity,
            }}
          />
        ))}
      </div>

      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-64 rounded-full pointer-events-none"
        style={{ background: 'var(--color-accent)', filter: 'blur(100px)', opacity: 0.07 }}
        aria-hidden
      />

      <div className="max-w-4xl mx-auto px-5 md:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span
            className="section-eyebrow block mb-6"
            style={{ color: 'var(--color-accent)' }}
          >
            {get('home.cta.eyebrow')}
          </span>

          <h2
            className="font-display font-semibold mb-4"
            style={{
              fontSize: 'clamp(2.2rem, 6vw, 4rem)',
              color: 'var(--color-white)',
              lineHeight: 1.1,
            }}
          >
            {get('home.cta.title_line1')}
            <br />
            <em className="font-display font-light italic">{get('home.cta.title_line2')}</em>
          </h2>

          <p
            className="font-sans font-light text-lg mb-12 max-w-md mx-auto"
            style={{ color: 'rgba(250,250,248,0.6)', lineHeight: 1.7 }}
          >
            {get('home.cta.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/personalizar"
              className="btn-primary inline-flex items-center gap-2"
            >
              {get('home.cta.button_primary')}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
            <Link
              to="/catalogo"
              className="font-sans font-medium text-sm underline underline-offset-4 transition-opacity hover:opacity-70"
              style={{ color: 'rgba(250,250,248,0.7)' }}
            >
              {get('home.cta.button_secondary')}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
