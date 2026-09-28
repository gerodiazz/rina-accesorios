import { motion } from 'framer-motion'
import { useFaq } from '../hooks/useFaq'
import { Accordion } from '../components/ui/Accordion'
import { buildWhatsAppConsultUrl } from '../utils/whatsapp'

export default function FAQ() {
  const { faqItems, loading } = useFaq()

  const activeItems = faqItems
    .filter(item => item.active)
    .map(item => ({ question: item.question, answer: item.answer }))

  if (loading) {
    return (
      <div className="pt-32 pb-20 flex justify-center" style={{ background: 'var(--color-bg)' }}>
        <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="pt-32 pb-20" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-2xl mx-auto px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <span className="section-eyebrow block mb-3">Preguntas frecuentes</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)' }}>
            Todo lo que necesitás{' '}
            <em className="font-display font-light italic">saber</em>
          </h1>
        </motion.div>

        <div className="card px-6 md:px-10">
          <Accordion items={activeItems} />
        </div>

        <div className="text-center mt-12">
          <p className="font-sans text-base mb-4" style={{ color: 'var(--color-ink-muted)' }}>
            ¿Tenés otra duda? Escribinos directamente.
          </p>
          <a
            href={buildWhatsAppConsultUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ background: '#25D366' }}
          >
            Consultá por WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
