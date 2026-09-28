import { motion } from 'framer-motion'
import { useContent } from '../../context/SiteContentContext'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

function DiamondIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path d="M14 3L20 10H8L14 3Z" fill="var(--color-accent)" />
      <path d="M8 10L14 25L20 10H8Z" fill="var(--color-accent)" opacity="0.55" />
    </svg>
  )
}

function PenIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="var(--color-accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 24l5-1.5L22 9.5a2.83 2.83 0 10-4-4L5.5 19 4 24z" />
      <path d="M17.5 6.5l4 4" />
    </svg>
  )
}

function PhonesIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="var(--color-accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5" width="8" height="14" rx="2" />
      <rect x="13" y="3" width="8" height="18" rx="2" />
      <circle cx="7" cy="17" r="0.8" fill="var(--color-accent)" stroke="none" />
      <circle cx="17" cy="18.5" r="0.8" fill="var(--color-accent)" stroke="none" />
    </svg>
  )
}

function ChatHeartIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="var(--color-accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 4h20a1 1 0 011 1v13a1 1 0 01-1 1H8l-5 4V5a1 1 0 011-1z" />
      <path d="M14 10.5c0-1 .8-1.8 1.8-1.5.6.2 1 .7 1.2 1.3.2-.6.6-1.1 1.2-1.3 1-.3 1.8.5 1.8 1.5 0 1.5-3 3.5-3 3.5s-3-2-3-3.5z" fill="var(--color-accent)" stroke="none" />
    </svg>
  )
}

const benefitIcons = [DiamondIcon, PenIcon, PhonesIcon, ChatHeartIcon]

export function BenefitsSection() {
  const { get } = useContent()

  const benefits = [
    {
      Icon: DiamondIcon,
      title: get('home.benefits.item1_title') || 'Diseños únicos',
      description: get('home.benefits.item1_desc') || 'Cada funda es un diseño exclusivo, no hay dos iguales.',
    },
    {
      Icon: PenIcon,
      title: get('home.benefits.item2_title') || 'Personalización completa',
      description: get('home.benefits.item2_desc') || 'Subí tu foto, pedí tu diseño o elegí del catálogo.',
    },
    {
      Icon: PhonesIcon,
      title: get('home.benefits.item3_title') || 'Gran variedad de modelos',
      description: get('home.benefits.item3_desc') || '+100 modelos disponibles. Siempre actualizamos.',
    },
    {
      Icon: ChatHeartIcon,
      title: get('home.benefits.item4_title') || 'Atención personalizada',
      description: get('home.benefits.item4_desc') || 'Hablás directo con la creadora. Sin intermediarios.',
    },
  ]

  return (
    <section className="py-24" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-14"
        >
          <span className="section-eyebrow block mb-3">{get('home.benefits.eyebrow')}</span>
          <h2 className="section-title">{get('home.benefits.title')}</h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {benefits.map(({ Icon, title, description }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="card p-6 md:p-8 flex flex-col gap-4"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'var(--color-blush)' }}
              >
                <Icon />
              </div>
              <h3
                className="font-sans font-medium text-sm md:text-base leading-snug"
                style={{ color: 'var(--color-ink)' }}
              >
                {title}
              </h3>
              <p
                className="font-sans font-light text-sm"
                style={{ color: 'var(--color-ink-muted)', lineHeight: 1.65 }}
              >
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
