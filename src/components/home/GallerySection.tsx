import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Modal } from '../ui/Modal'
import { useSiteImages } from '../../hooks/useSiteImages'
import { defaultGalleryImages, type GalleryImage } from '../../data/galleryImages'
import { buildWhatsAppConsultUrl, CUSTOMIZE_MESSAGE } from '../../utils/whatsapp'

const INITIAL_COUNT = 12

interface GalleryItemProps {
  image: GalleryImage
  onClick: (image: GalleryImage) => void
}

function GalleryItem({ image, onClick }: GalleryItemProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative overflow-hidden rounded-lg cursor-zoom-in [break-inside:avoid] mb-3 md:mb-4"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(image)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(image)}
      aria-label={`Ver funda para ${image.alt}`}
    >
      <img
        src={image.url}
        alt={`Funda personalizada para ${image.alt}`}
        width={400}
        height={image.height}
        className="w-full block transition-transform duration-500"
        style={{ transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
        loading="lazy"
      />

      <div
        className="absolute inset-0 flex items-end p-3 transition-opacity duration-300"
        style={{
          background: 'rgba(240, 221, 213, 0.5)',
          opacity: hovered ? 1 : 0,
        }}
      >
        <span
          className="font-mono text-xs px-2.5 py-1 rounded-full"
          style={{ background: 'var(--color-accent)', color: 'white' }}
        >
          {image.alt}
        </span>
      </div>
    </div>
  )
}

export function GallerySection() {
  const { images: dbImages, loading } = useSiteImages('gallery')
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  const allImages: GalleryImage[] = useMemo(() => {
    if (dbImages.length > 0) {
      return dbImages.map(img => ({
        id: img.id,
        url: img.url,
        alt: img.alt ?? 'Funda personalizada',
        height: 350,
      }))
    }
    return defaultGalleryImages
  }, [dbImages])

  const visibleImages = allImages.slice(0, visibleCount)
  const hasMore = visibleCount < allImages.length

  if (loading) {
    return (
      <section className="py-24" style={{ background: 'var(--color-bg)' }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex justify-center">
          <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    )
  }

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
          <span className="section-eyebrow block mb-3">Galería</span>
          <h2 className="section-title">
            Cada funda,{' '}
            <em className="font-display font-light italic">una historia</em>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6 }}
          className="[column-count:2] md:[column-count:3] lg:[column-count:4] [column-gap:12px] md:[column-gap:16px]"
        >
          <AnimatePresence>
            {visibleImages.map((img) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <GalleryItem image={img} onClick={setSelectedImage} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {hasMore && (
          <div className="flex justify-center mt-10">
            <button
              className="btn-secondary"
              onClick={() => setVisibleCount((c) => c + 8)}
            >
              Ver más trabajos
            </button>
          </div>
        )}
      </div>

      <Modal open={selectedImage !== null} onClose={() => setSelectedImage(null)}>
        {selectedImage && (
          <div>
            <img
              src={selectedImage.url}
              alt={`Funda para ${selectedImage.alt}`}
              className="w-full rounded-t-xl object-cover"
              style={{ maxHeight: '70vh' }}
            />
            <div className="p-6 flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-xs mb-1" style={{ color: 'var(--color-ink-muted)' }}>
                  Modelo compatible
                </p>
                <p className="font-sans font-medium" style={{ color: 'var(--color-ink)' }}>
                  {selectedImage.alt}
                </p>
              </div>
              <a
                href={buildWhatsAppConsultUrl(CUSTOMIZE_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary whitespace-nowrap"
                onClick={() => setSelectedImage(null)}
              >
                Quiero una así
              </a>
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}
