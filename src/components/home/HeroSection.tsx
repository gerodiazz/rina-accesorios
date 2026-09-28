import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useContent } from '../../context/SiteContentContext'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay: 0.35, ease: 'easeOut' as const } },
}

const avatars = [
  { color: '#E8C4B4', initial: 'V' },
  { color: '#C9A96E', initial: 'L' },
  { color: '#A8813F', initial: 'S' },
  { color: '#F0DDD5', initial: 'C' },
]

export function HeroSection() {
  const { get } = useContent()

  return (
    <section
      className="relative flex items-center overflow-hidden min-h-[100dvh]"
      style={{ background: 'var(--color-blush)' }}
    >
      <div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'var(--color-blush-deep)', filter: 'blur(120px)', opacity: 0.5 }}
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-5 md:px-8 w-full pt-32 pb-20 md:py-0 md:min-h-[100dvh] flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center w-full">

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="order-2 md:order-1"
          >
            <motion.span variants={fadeUp} className="section-eyebrow block mb-5">
              {get('home.hero.eyebrow')}
            </motion.span>

            <motion.h1 variants={fadeUp} className="mb-6" style={{ color: 'var(--color-ink)' }}>
              <span
                className="block font-display font-light italic leading-[1.08]"
                style={{ fontSize: 'clamp(2.6rem, 7vw, 5.5rem)' }}
              >
                {get('home.hero.title_line1')}
              </span>
              <span
                className="block font-display font-semibold leading-[1.08]"
                style={{ fontSize: 'clamp(2.6rem, 7vw, 5.5rem)' }}
              >
                {get('home.hero.title_line2')}
                <sup
                  className="font-sans font-light"
                  style={{
                    fontSize: 'clamp(0.75rem, 1.4vw, 1rem)',
                    color: 'var(--color-accent)',
                    verticalAlign: 'super',
                    marginLeft: '3px',
                  }}
                >
                  ™
                </sup>
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="font-sans font-light text-lg mb-10 max-w-md"
              style={{ color: 'var(--color-ink-muted)', lineHeight: 1.75 }}
            >
              {get('home.hero.subtitle')}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link to="/catalogo" className="btn-primary">
                {get('home.hero.cta_primary')}
              </Link>
              <Link to="/personalizar" className="btn-secondary">
                {get('home.hero.cta_secondary')}
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-2">
                {avatars.map(({ color, initial }) => (
                  <div
                    key={initial}
                    className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center font-sans font-semibold text-xs"
                    style={{ background: color, color: color === '#F0DDD5' ? 'var(--color-ink-muted)' : 'white' }}
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <p className="font-sans text-sm" style={{ color: 'var(--color-ink-muted)' }}>
                {get('home.hero.social_proof')}
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate="visible"
            className="order-1 md:order-2 flex justify-center md:justify-end"
          >
            <div className="relative">
              <img
                src="https://picsum.photos/seed/rina-hero/480/640"
                alt="Funda personalizada de celular"
                width={480}
                height={640}
                className="rounded-2xl object-cover"
                style={{
                  width: 'clamp(200px, 38vw, 400px)',
                  aspectRatio: '3/4',
                  transform: 'rotate(-3deg)',
                  boxShadow: '0 40px 100px rgba(0,0,0,0.22)',
                }}
                loading="eager"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.45, ease: 'backOut' }}
                className="absolute -bottom-4 -left-4 md:-left-10 bg-white rounded-xl px-4 py-3 flex items-center gap-3"
                style={{ boxShadow: 'var(--shadow-hover)' }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-base"
                  style={{ background: 'var(--color-blush)' }}
                >
                  ✨
                </div>
                <div>
                  <p className="font-sans font-semibold text-xs leading-tight" style={{ color: 'var(--color-ink)' }}>
                    Diseño único
                  </p>
                  <p className="font-mono text-xs" style={{ color: 'var(--color-ink-muted)' }}>
                    100% personalizado
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.45, ease: 'backOut' }}
                className="absolute -top-4 -right-4 md:-right-8 bg-white rounded-xl px-4 py-3"
                style={{ boxShadow: 'var(--shadow-hover)' }}
              >
                <p className="font-mono text-xs mb-0.5" style={{ color: 'var(--color-ink-muted)' }}>
                  Envíos a
                </p>
                <p className="font-sans font-semibold text-xs" style={{ color: 'var(--color-ink)' }}>
                  Todo el país 🇦🇷
                </p>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none select-none"
        style={{ animation: 'scroll-indicator 2s ease-in-out infinite' }}
        aria-hidden
      >
        <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--color-ink-muted)', fontSize: '0.65rem' }}>
          scroll
        </span>
        <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
          <path
            d="M7 1v18M1 13l6 7 6-7"
            stroke="var(--color-ink-muted)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  )
}
