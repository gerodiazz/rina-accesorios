import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCartStore, type CartItem } from '../store/cart'
import { buildWhatsAppUrl } from '../utils/whatsapp'
import { Badge } from '../components/ui/Badge'

function CartItemRow({ item }: { item: CartItem }) {
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)
  const isCustom = !!item.customization

  return (
    <div className="card p-4 md:p-5 flex flex-col sm:flex-row gap-4">
      <img
        src={item.thumbnail}
        alt={item.name}
        onError={(e) => {
          e.currentTarget.src = `https://picsum.photos/seed/${item.productId}/200/260`
        }}
        className="w-full sm:w-24 h-32 sm:h-24 rounded-md object-cover flex-shrink-0"
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 mb-1.5">
          <div>
            <h3 className="font-sans font-medium text-base" style={{ color: 'var(--color-ink)' }}>
              {item.name}
            </h3>
            <p className="font-mono text-xs mt-0.5" style={{ color: 'var(--color-ink-muted)' }}>
              {item.phoneModel}
            </p>
          </div>
          <Badge variant={isCustom ? 'blush' : 'surface'}>{isCustom ? 'Personalizada' : 'Catálogo'}</Badge>
        </div>

        {isCustom && item.customization && (
          <div
            className="mt-3 mb-3 p-3 rounded-md text-sm flex flex-col gap-1"
            style={{ background: 'var(--color-surface)', color: 'var(--color-ink-muted)' }}
          >
            <p>
              <span className="font-medium" style={{ color: 'var(--color-ink)' }}>
                Estilo:
              </span>{' '}
              {item.customization.style}
            </p>
            <p>
              <span className="font-medium" style={{ color: 'var(--color-ink)' }}>
                Idea:
              </span>{' '}
              {item.customization.instructions}
            </p>
            {item.customization.text && (
              <p>
                <span className="font-medium" style={{ color: 'var(--color-ink)' }}>
                  Texto en la funda:
                </span>{' '}
                "{item.customization.text}"
                {item.customization.textColor ? ` (${item.customization.textColor})` : ''}
              </p>
            )}
            {item.customization.references && (
              <p>
                <span className="font-medium" style={{ color: 'var(--color-ink)' }}>
                  Referencias:
                </span>{' '}
                {item.customization.references}
              </p>
            )}
            {item.customization.imageFile && (
              <p style={{ color: 'var(--color-accent-dark)' }}>📷 Tiene una foto para enviar por WhatsApp</p>
            )}
          </div>
        )}

        <div className="flex items-center justify-between gap-3 mt-3">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
              className="w-8 h-8 rounded-full border flex items-center justify-center font-sans hover:bg-surface transition-colors"
              style={{ borderColor: 'var(--color-border)' }}
              aria-label="Restar cantidad"
            >
              −
            </button>
            <span className="font-sans font-medium text-sm w-6 text-center">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 rounded-full border flex items-center justify-center font-sans hover:bg-surface transition-colors"
              style={{ borderColor: 'var(--color-border)' }}
              aria-label="Sumar cantidad"
            >
              +
            </button>
          </div>

          <button
            onClick={() => removeItem(item.id)}
            className="font-sans text-sm underline-offset-2 hover:underline transition-colors"
            style={{ color: 'var(--color-ink-muted)' }}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Cart() {
  const items = useCartStore((s) => s.items)
  const clearCart = useCartStore((s) => s.clearCart)
  const [note, setNote] = useState('')

  const itemCount = items.reduce((acc, i) => acc + i.quantity, 0)

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-20 px-5 text-center" style={{ background: 'var(--color-bg)' }}>
        <p className="font-display font-light text-3xl mb-3" style={{ color: 'var(--color-ink)' }}>
          Tu carrito está vacío
        </p>
        <p className="font-sans text-base mb-8" style={{ color: 'var(--color-ink-muted)' }}>
          Elegí un diseño del catálogo o armá el tuyo desde cero.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/catalogo" className="btn-primary">
            Ver catálogo
          </Link>
          <Link to="/personalizar" className="btn-secondary">
            Personalizar una funda
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-20" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-10"
        >
          <span className="section-eyebrow block mb-3">Carrito</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)' }}>
            Tu pedido
          </h1>
          <p className="font-sans font-light text-sm mt-3 max-w-xl" style={{ color: 'var(--color-ink-muted)', lineHeight: 1.7 }}>
            Esto no es una compra online: acá solo armás tu pedido. El precio final,
            el pago y el envío se coordinan directamente por WhatsApp con nosotras.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {items.map((item) => (
              <CartItemRow key={item.id} item={item} />
            ))}

            <button
              onClick={clearCart}
              className="self-start font-sans text-sm mt-2 underline-offset-2 hover:underline transition-colors"
              style={{ color: 'var(--color-ink-muted)' }}
            >
              Vaciar carrito
            </button>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 flex flex-col gap-5 lg:sticky lg:top-28">
              <div>
                <p className="font-sans text-sm" style={{ color: 'var(--color-ink-muted)' }}>
                  {itemCount} {itemCount === 1 ? 'funda' : 'fundas'} en tu pedido
                </p>
                <p className="font-mono text-xs mt-1" style={{ color: 'var(--color-accent-dark)' }}>
                  Precios a coordinar por WhatsApp
                </p>
              </div>

              <div>
                <label className="block font-sans text-sm font-medium mb-2" style={{ color: 'var(--color-ink)' }}>
                  Nota adicional (opcional)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  placeholder="Ej: dirección de envío, fecha límite, alguna aclaración..."
                  className="w-full font-sans text-sm px-3.5 py-3 rounded-md border bg-white resize-none"
                  style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink)' }}
                />
              </div>

              <a
                href={buildWhatsAppUrl(items, note)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full"
                style={{ background: '#25D366' }}
              >
                Finalizar pedido por WhatsApp
              </a>

              <p className="font-sans text-xs" style={{ color: 'var(--color-ink-muted)', lineHeight: 1.6 }}>
                Al tocar el botón se abre WhatsApp con el detalle de tu pedido ya
                armado. No se realiza ningún pago acá: todo se coordina por chat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
