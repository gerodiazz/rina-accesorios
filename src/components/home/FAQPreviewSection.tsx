import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Accordion } from '../ui/Accordion'
import { useFaq } from '../../hooks/useFaq'

export function FAQPreviewSection() {
  const { faqItems, loading } = useFaq()

  const previewItems = faqItems
    .filter(item => item.active)
    .slice(0, 4)
    .map(item => ({ question: item.question, answer: item.answer }))

  if (loading) {
    return (
      <section className="py-24" style={{ background: 'var(--color-bg)' }}>
        <div className="max-w-3xl mx-auto px-5 md:px-8 flex justify-center">
          <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    )
  }

  if (previewItems.length === 0) {
    return null
  }

  return (
    <section className="py-24" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <span className="section-eyebrow block mb-3">Preguntas frecuentes</span>
          <h2 className="section-title">Todo lo que necesitás saber</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        >
          <Accordion items={previewItems} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <Link
            to="/faq"
            className="font-sans text-sm font-medium inline-flex items-center gap-2 transition-colors hover:text-accent"
            style={{ color: 'var(--color-ink-muted)' }}
          >
            Ver todas las preguntas
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
