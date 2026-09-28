import { useEffect, useCallback, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import { useContent } from '../../context/SiteContentContext'

interface Testimonial {
  text: string
  name: string
  model: string
  initial: string
  avatarColor: string
}

const defaultTestimonials: Testimonial[] = [
  {
    text: 'Pedí una funda con la foto de mi perra y quedó hermosa. La calidad es increíble, el diseño salió perfectamente.',
    name: 'Valentina M.',
    model: 'iPhone 15',
    initial: 'V',
    avatarColor: '#C9A96E',
  },
  {
    text: 'Compré 3 de regalo para mis amigas. Todas quedaron enamoradas del resultado. ¡Definitivamente vuelvo a pedir!',
    name: 'Lucía F.',
    model: 'Samsung S24',
    initial: 'L',
    avatarColor: '#E8C4B4',
  },
  {
    text: 'El proceso fue facilísimo. Coordiné todo por WhatsApp sin complicaciones y llegó antes de lo esperado.',
    name: 'Sofía R.',
    model: 'iPhone 13',
    initial: 'S',
    avatarColor: '#A8813F',
  },
  {
    text: 'El diseño que pedí quedó exactamente como lo imaginé. 100% recomendada, atención personalizada increíble.',
    name: 'Camila T.',
    model: 'Motorola Edge',
    initial: 'C',
    avatarColor: '#F0DDD5',
  },
  {
    text: 'Primera vez que compro algo así y no fue la última. Los tiempos de entrega son excelentes y la calidad top.',
    name: 'María P.',
    model: 'Samsung A54',
    initial: 'M',
    avatarColor: '#C9A96E',
  },
]

function StarRating() {
  return (
    <div className="flex gap-0.5" aria-label="5 estrellas">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="var(--color-accent)" aria-hidden>
          <path d="M7 1l1.5 4H13l-3.7 2.7 1.4 4.3L7 9.4l-3.7 2.6 1.4-4.3L1 5h4.5L7 1z" />
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div
      className="flex-none w-[300px] md:w-[360px] mr-5 flex flex-col gap-5 p-7 rounded-xl select-none"
      style={{ background: 'var(--color-white)', boxShadow: 'var(--shadow-card)' }}
    >
      <span
        className="font-display font-semibold leading-none"
        style={{ fontSize: '4rem', color: 'var(--color-accent)', lineHeight: 0.7 }}
        aria-hidden
      >
        ❝
      </span>

      <p
        className="font-sans font-light text-base flex-1"
        style={{ color: 'var(--color-ink)', lineHeight: 1.7 }}
      >
        {testimonial.text}
      </p>

      <StarRating />

      <div className="flex items-center gap-3 pt-1 border-t" style={{ borderColor: 'var(--color-border)' }}>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center font-sans font-semibold text-sm flex-shrink-0"
          style={{
            background: testimonial.avatarColor,
            color: testimonial.avatarColor === '#F0DDD5' ? 'var(--color-ink-muted)' : 'white',
          }}
          aria-hidden
        >
          {testimonial.initial}
        </div>
        <div>
          <p className="font-sans font-medium text-sm" style={{ color: 'var(--color-ink)' }}>
            {testimonial.name}
          </p>
          <p className="font-mono text-xs" style={{ color: 'var(--color-ink-muted)' }}>
            {testimonial.model}
          </p>
        </div>
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  const { get } = useContent()
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', dragFree: true })
  const [isHovered, setIsHovered] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi, onSelect])

  useEffect(() => {
    if (!emblaApi || isHovered) return
    const id = setInterval(() => emblaApi.scrollNext(), 4000)
    return () => clearInterval(id)
  }, [emblaApi, isHovered])

  const testimonials = defaultTestimonials

  return (
    <section className="py-24 overflow-hidden" style={{ background: 'var(--color-blush)' }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-14"
        >
          <span className="section-eyebrow block mb-3">{get('home.testimonials.eyebrow')}</span>
          <h2 className="section-title">{get('home.testimonials.title')}</h2>
        </motion.div>
      </div>

      <div
        className="overflow-hidden cursor-grab active:cursor-grabbing"
        ref={emblaRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex pl-5 md:pl-8 lg:pl-[calc((100vw-80rem)/2+2rem)]">
          {[...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} testimonial={t} />
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Ir al testimonio ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width: selectedIndex % testimonials.length === i ? '24px' : '8px',
              height: '8px',
              background:
                selectedIndex % testimonials.length === i
                  ? 'var(--color-accent)'
                  : 'var(--color-blush-deep)',
            }}
          />
        ))}
      </div>
    </section>
  )
}
