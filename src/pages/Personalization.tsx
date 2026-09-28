import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useSiteImages } from '../hooks/useSiteImages'
import { defaultGalleryImages, type GalleryImage } from '../data/galleryImages'
import { buildWhatsAppConsultUrl, CUSTOM_CASE_MESSAGE } from '../utils/whatsapp'

const GALLERY_COUNT = 6

const steps = [
  {
    icon: '📸',
    title: 'Tenés una idea',
    description: 'Una foto, un diseño, un estilo, un texto.',
  },
  {
    icon: '💬',
    title: 'Nos la contás',
    description: 'Por WhatsApp, sin formularios largos.',
  },
  {
    icon: '✨',
    title: 'La creamos',
    description: 'Tu funda única lista en días.',
  },
]

const infoPills = [
  'Respondemos en menos de 1 hora',
  'Envíos a todo el país',
  'Precio según diseño',
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function Personalization() {
  const { images: dbImages, loading } = useSiteImages('gallery')

  const galleryImages: GalleryImage[] = useMemo(() => {
    const source: GalleryImage[] =
      dbImages.length > 0
        ? dbImages.map((img) => ({
            id: img.id,
            url: img.url,
            alt: img.alt ?? 'Funda personalizada',
            height: 350,
          }))
        : defaultGalleryImages
    return source.slice(0, GALLERY_COUNT)
  }, [dbImages])

  const whatsappUrl = buildWhatsAppConsultUrl(CUSTOM_CASE_MESSAGE)

  return (
    <div style={{ background: 'var(--color-bg)' }}>
      {/* 1. Hero de la sección */}
      <section className="pt-32 pb-20 px-5 md:px-8" style={{ background: 'var(--color-blush)' }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="section-eyebrow block mb-3">Personalizar</span>
          <h1
            className="font-display font-light"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 4rem)', lineHeight: 1.1, color: 'var(--color-ink)' }}
          >
            Tu funda,{' '}
            <em className="font-display font-light italic">tu historia.</em>
          </h1>
          <p
            className="font-sans font-light text-lg mt-6 max-w-xl mx-auto"
            style={{ color: 'var(--color-ink-muted)', lineHeight: 1.75 }}
          >
            Contanos tu idea y la hacemos realidad. Cada diseño es único y se
            coordina directamente con nosotras.
          </p>
        </motion.div>
      </section>

      {/* 2. Cómo funciona la personalización */}
      <section className="py-24 px-5 md:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-center mb-14"
          >
            <h2 className="section-title">
              Cómo funciona{' '}
              <em className="font-display font-light italic">la personalización</em>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.12 }}
                className="text-center px-4"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 text-2xl"
                  style={{ background: 'var(--color-blush)' }}
                  aria-hidden
                >
                  {step.icon}
                </div>
                <h3
                  className="font-display font-light text-xl mb-2"
                  style={{ color: 'var(--color-ink)' }}
                >
                  {step.title}
                </h3>
                <p
                  className="font-sans font-light text-base"
                  style={{ color: 'var(--color-ink-muted)', lineHeight: 1.7 }}
                >
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Galería de inspiración */}
      <section className="pb-24 px-5 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-center mb-14"
          >
            <span className="section-eyebrow block mb-3">Inspiración</span>
            <h2 className="section-title">
              Lo que{' '}
              <em className="font-display font-light italic">podés lograr</em>
            </h2>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.6 }}
              className="[column-count:2] md:[column-count:3] [column-gap:12px] md:[column-gap:16px]"
            >
              {galleryImages.map((img) => (
                <div
                  key={img.id}
                  className="overflow-hidden rounded-lg [break-inside:avoid] mb-3 md:mb-4"
                >
                  <img
                    src={img.url}
                    alt={`Funda personalizada para ${img.alt}`}
                    width={400}
                    height={img.height}
                    className="w-full block"
                    loading="lazy"
                  />
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* 4. CTA principal — WhatsApp · 5. Información útil */}
      <section className="py-24 px-5 md:px-8" style={{ background: 'var(--color-ink)' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2
            className="font-display font-light"
            style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)', lineHeight: 1.15, color: 'var(--color-white)' }}
          >
            ¿Lista para tu{' '}
            <em className="font-display font-light italic">funda personalizada?</em>
          </h2>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 font-sans font-medium text-base mt-10 px-8 py-4 rounded-full transition-transform duration-200 hover:scale-[1.03]"
            style={{ background: '#25D366', color: 'var(--color-white)' }}
          >
            <span aria-hidden>💬</span>
            Quiero personalizar mi funda
          </a>

          <div className="flex flex-wrap justify-center gap-3 mt-12">
            {infoPills.map((pill) => (
              <span
                key={pill}
                className="font-sans text-sm px-4 py-2 rounded-full"
                style={{
                  background: 'rgba(250,250,248,0.08)',
                  color: 'rgba(250,250,248,0.75)',
                  border: '1px solid rgba(250,250,248,0.15)',
                }}
              >
                {pill}
              </span>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  )
}
