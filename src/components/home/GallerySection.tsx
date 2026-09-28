import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Modal } from '../ui/Modal'
import { useSiteImages } from '../../hooks/useSiteImages'

interface GalleryImage {
  id: string
  url: string
  alt: string
  height: number
}

const defaultImages: GalleryImage[] = [
  { id: 'rina-g1', url: 'https://picsum.photos/seed/rina-g1/400/280', alt: 'iPhone 15 Pro', height: 280 },
  { id: 'rina-g2', url: 'https://picsum.photos/seed/rina-g2/400/370', alt: 'Samsung S24', height: 370 },
  { id: 'rina-g3', url: 'https://picsum.photos/seed/rina-g3/400/310', alt: 'iPhone 14', height: 310 },
  { id: 'rina-g4', url: 'https://picsum.photos/seed/rina-g4/400/430', alt: 'Motorola Edge 50', height: 430 },
  { id: 'rina-g5', url: 'https://picsum.photos/seed/rina-g5/400/260', alt: 'iPhone 15 Pro Max', height: 260 },
  { id: 'rina-g6', url: 'https://picsum.photos/seed/rina-g6/400/390', alt: 'Samsung A55', height: 390 },
  { id: 'rina-g7', url: 'https://picsum.photos/seed/rina-g7/400/320', alt: 'iPhone 13', height: 320 },
  { id: 'rina-g8', url: 'https://picsum.photos/seed/rina-g8/400/350', alt: 'Xiaomi 14', height: 350 },
  { id: 'rina-g9', url: 'https://picsum.photos/seed/rina-g9/400/410', alt: 'iPhone 15', height: 410 },
  { id: 'rina-g10', url: 'https://picsum.photos/seed/rina-g10/400/275', alt: 'Samsung S24 Ultra', height: 275 },
  { id: 'rina-g11', url: 'https://picsum.photos/seed/rina-g11/400/445', alt: 'iPhone 14 Pro', height: 445 },
  { id: 'rina-g12', url: 'https://picsum.photos/seed/rina-g12/400/300', alt: 'Motorola G84', height: 300 },
]

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
    return defaultImages
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
              <Link
                to="/personalizar"
                className="btn-primary whitespace-nowrap"
                onClick={() => setSelectedImage(null)}
              >
                Quiero una así
              </Link>
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}
