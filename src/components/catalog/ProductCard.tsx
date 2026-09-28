import { Link } from 'react-router-dom'
import { Badge } from '../ui/Badge'
import { buildWhatsAppConsultUrl } from '../../utils/whatsapp'
import type { Product } from '../../data/products'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const visibleStyles = product.style.slice(0, 2)
  const extraStyles = product.style.length - visibleStyles.length

  const isGiftCard = product.category === 'giftcard'
  const isWhatsAppOnly = product.whatsappOnly

  const cardContent = (
    <>
      <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
        <img
          src={product.images[0] || `https://picsum.photos/seed/${product.id}/480/640`}
          alt={product.name}
          width={480}
          height={640}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {product.featured && !isWhatsAppOnly && (
          <span
            className="absolute top-3 left-3 font-mono text-xs px-2.5 py-1 rounded-full"
            style={{ background: 'var(--color-accent)', color: 'white' }}
          >
            Destacado
          </span>
        )}
        {isWhatsAppOnly && (
          <span
            className="absolute top-3 left-3 font-mono text-xs px-2.5 py-1 rounded-full"
            style={{ background: 'var(--color-gold)', color: 'white' }}
          >
            Personalizado
          </span>
        )}
        {isGiftCard && (
          <span
            className="absolute top-3 right-3 text-xl"
            aria-hidden
          >
            🎀
          </span>
        )}
      </div>

      <div className="p-4 md:p-5">
        <h3 className="font-sans font-medium text-base mb-1.5" style={{ color: 'var(--color-ink)' }}>
          {product.name}
        </h3>
        <p
          className="font-sans font-light text-sm mb-3 line-clamp-2"
          style={{ color: 'var(--color-ink-muted)', lineHeight: 1.5 }}
        >
          {product.description}
        </p>

        {visibleStyles.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {visibleStyles.map((s) => (
              <Badge key={s} variant="surface">
                {s}
              </Badge>
            ))}
            {extraStyles > 0 && <Badge variant="surface">+{extraStyles}</Badge>}
          </div>
        )}

        {isWhatsAppOnly && (
          <div className="mt-auto">
            {product.price && (
              <p className="font-sans text-xs mb-2" style={{ color: 'var(--color-ink-muted)' }}>
                {product.price}
              </p>
            )}
            <span
              className="inline-flex items-center gap-1.5 font-sans text-sm font-medium px-4 py-2 rounded-full transition-opacity hover:opacity-90"
              style={{ background: '#25D366', color: 'white' }}
            >
              <WhatsAppIcon />
              Consultar
            </span>
          </div>
        )}
      </div>
    </>
  )

  if (isWhatsAppOnly) {
    return (
      <a
        href={buildWhatsAppConsultUrl(product.whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="card group block overflow-hidden"
      >
        {cardContent}
      </a>
    )
  }

  return (
    <Link to={`/catalogo/${product.id}`} className="card group block overflow-hidden">
      {cardContent}
    </Link>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.856L0 24l6.335-1.511A11.947 11.947 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.369l-.36-.213-3.73.889.929-3.627-.234-.373A9.818 9.818 0 112 12c0 5.42 4.398 9.818 9.818 9.818H12z" />
    </svg>
  )
}
