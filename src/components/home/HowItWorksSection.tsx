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

function ModelIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="9" y="3" width="14" height="26" rx="3" />
      <circle cx="16" cy="25" r="1" fill="var(--color-accent)" stroke="none" />
      <path d="M12 7h8" />
    </svg>
  )
}

function DesignIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="16" cy="16" r="12" />
      <circle cx="16" cy="16" r="5" />
      <path d="M16 4v4M16 24v4M4 16h4M24 16h4" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 4h3l3 14h14l3-10H9" />
      <circle cx="14" cy="24" r="2" fill="var(--color-accent)" stroke="none" />
      <circle cx="22" cy="24" r="2" fill="var(--color-accent)" stroke="none" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="var(--color-accent)" aria-hidden>
      <path d="M22.3 19.2c-.4-.2-2.3-1.1-2.7-1.3-.4-.1-.6-.2-.9.2s-1 1.3-1.2 1.5c-.2.3-.5.3-.9.1-.4-.2-1.7-.6-3.2-2-1.2-1-2-2.4-2.2-2.8-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.3-.4.4-.7.1-.3.1-.5 0-.7-.1-.2-.9-2.1-1.2-2.9-.3-.8-.6-.7-.9-.7h-.8c-.3 0-.7.1-1.1.5-.4.4-1.4 1.4-1.4 3.3 0 2 1.4 3.8 1.6 4.1.2.3 2.8 4.3 6.8 6 1 .4 1.7.7 2.3.9 1 .3 1.8.3 2.5.2.8-.1 2.3-1 2.7-1.9.4-.9.4-1.7.3-1.9-.1-.2-.4-.3-.8-.5z" />
      <path d="M16 2C8.3 2 2 8.3 2 16c0 2.8.8 5.5 2.1 7.8L2 30l6.5-2c2.2 1.2 4.8 1.9 7.5 1.9 7.7 0 14-6.3 14-14S23.7 2 16 2zm0 25.6a11.6 11.6 0 01-5.9-1.6l-.4-.3L5.6 27l1.1-4.3-.3-.5A11.57 11.57 0 014.4 16C4.4 9.6 9.6 4.4 16 4.4S27.6 9.6 27.6 16 22.4 27.6 16 27.6z" />
    </svg>
  )
}

export function HowItWorksSection() {
  const { get } = useContent()

  const steps = [
    {
      number: '01',
      Icon: ModelIcon,
      title: get('home.how.step1_title') || 'Elegís tu modelo',
      description: get('home.how.step1_desc') || 'Buscá tu celular entre más de 100 modelos disponibles.',
    },
    {
      number: '02',
      Icon: DesignIcon,
      title: get('home.how.step2_title') || 'Elegís tu diseño',
      description: get('home.how.step2_desc') || 'Del catálogo o personalizás desde cero con tu idea.',
    },
    {
      number: '03',
      Icon: CartIcon,
      title: get('home.how.step3_title') || 'Enviás el pedido',
      description: get('home.how.step3_desc') || 'Todo queda registrado en tu carrito con todos los detalles.',
    },
    {
      number: '04',
      Icon: WhatsAppIcon,
      title: get('home.how.step4_title') || 'Coordinamos por WhatsApp',
      description: get('home.how.step4_desc') || 'Te contactamos para confirmar, pagar y coordinar la entrega.',
    },
  ]

  return (
    <section className="py-24" style={{ background: 'var(--color-surface)' }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span className="section-eyebrow block mb-3">{get('home.how.eyebrow')}</span>
          <h2 className="section-title">{get('home.how.title')}</h2>
        </motion.div>

        <div className="relative">
          <div
            className="hidden md:block absolute pointer-events-none"
            style={{
              top: '23px',
              left: 'calc(12.5% + 4px)',
              right: 'calc(12.5% + 4px)',
              borderTop: '2px dashed var(--color-border)',
            }}
            aria-hidden
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 relative z-10"
          >
            {steps.map(({ number, Icon, title, description }) => (
              <motion.div
                key={number}
                variants={fadeUp}
                className="flex flex-col items-start md:items-center md:text-center gap-5"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--color-bg)', border: '2px solid var(--color-border)' }}
                >
                  <span
                    className="font-mono font-medium"
                    style={{ fontSize: '0.7rem', letterSpacing: '0.05em', color: 'var(--color-accent)' }}
                  >
                    {number}
                  </span>
                </div>

                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ background: 'var(--color-bg)' }}
                >
                  <Icon />
                </div>

                <div>
                  <h3
                    className="font-sans font-medium text-base mb-2"
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
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
