import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useProduct, useProducts } from '../hooks/useProducts'
import { usePhoneModels } from '../hooks/usePhoneModels'
import { useCartStore } from '../store/cart'
import { buildWhatsAppConsultUrl, CUSTOMIZE_MESSAGE } from '../utils/whatsapp'
import { Badge } from '../components/ui/Badge'
import { ProductCard } from '../components/catalog/ProductCard'
import type { Product as LocalProduct } from '../data/products'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const addItem = useCartStore((s) => s.addItem)

  const { product: dbProduct, loading: loadingProduct } = useProduct(id ?? '')
  const { products: allProducts } = useProducts()
  const { phoneModels, loading: loadingModels } = usePhoneModels()

  const [activeImage, setActiveImage] = useState(0)
  const [phoneModel, setPhoneModel] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  // Redirect to WhatsApp for whatsapp-only products
  useEffect(() => {
    if (dbProduct?.whatsapp_only) {
      window.location.href = buildWhatsAppConsultUrl(dbProduct.whatsapp_message ?? undefined)
    }
  }, [dbProduct])

  // Active phone models grouped by brand
  const activeModels = useMemo(() =>
    phoneModels.filter(m => m.active),
    [phoneModels]
  )

  const modelsByBrand = useMemo(() => {
    const groups: Record<string, typeof phoneModels> = {}
    activeModels.forEach((m) => {
      groups[m.brand] = groups[m.brand] ?? []
      groups[m.brand].push(m)
    })
    return groups
  }, [activeModels])

  // Convert DB product to local format for display
  const product: LocalProduct | null = useMemo(() => {
    if (!dbProduct) return null
    return {
      id: dbProduct.slug,
      name: dbProduct.name,
      description: dbProduct.description ?? '',
      category: dbProduct.category?.slug as LocalProduct['category'] ?? 'fundas',
      style: dbProduct.category ? [dbProduct.category.name] : [],
      compatibleModels: [],
      images: dbProduct.images.map(img => img.url),
      featured: dbProduct.featured,
      whatsappOnly: dbProduct.whatsapp_only,
      whatsappMessage: dbProduct.whatsapp_message ?? undefined,
      price: dbProduct.price_display ?? undefined,
    }
  }, [dbProduct])

  // Related products
  const relatedProducts: LocalProduct[] = useMemo(() => {
    if (!dbProduct) return []
    return allProducts
      .filter(p =>
        p.slug !== dbProduct.slug &&
        !p.whatsapp_only &&
        p.active &&
        p.category_id === dbProduct.category_id
      )
      .slice(0, 4)
      .map(p => ({
        id: p.slug,
        name: p.name,
        description: p.description ?? '',
        category: p.category?.slug as LocalProduct['category'] ?? 'fundas',
        style: p.category ? [p.category.name] : [],
        compatibleModels: [],
        images: p.images.map(img => img.url),
        featured: p.featured,
        whatsappOnly: p.whatsapp_only,
        whatsappMessage: p.whatsapp_message ?? undefined,
        price: p.price_display ?? undefined,
      }))
  }, [dbProduct, allProducts])

  const loading = loadingProduct || loadingModels

  if (loading) {
    return (
      <div className="pt-32 pb-20 flex justify-center" style={{ background: 'var(--color-bg)' }}>
        <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center px-5">
        <p className="font-display text-3xl mb-4">Producto no encontrado</p>
        <Link to="/catalogo" className="btn-secondary">
          Volver al catálogo
        </Link>
      </div>
    )
  }

  if (product.whatsappOnly) {
    return (
      <div className="pt-32 pb-20 text-center px-5">
        <p className="font-display text-3xl mb-4">Redirigiendo a WhatsApp...</p>
      </div>
    )
  }

  const imageCount = Math.max(product.images.length, 1)

  const handleAddToCart = () => {
    if (!phoneModel) return
    const modelLabel = activeModels.find((m) => m.id === phoneModel)?.name ?? phoneModel
    addItem({
      id: `${product.id}-${phoneModel}`,
      productId: product.id,
      name: product.name,
      phoneModel: modelLabel,
      quantity,
      thumbnail: product.images[0] || `https://picsum.photos/seed/${product.id}/200/260`,
    })
    setAdded(true)
  }

  return (
    <div className="pt-32 pb-20" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Breadcrumb */}
        <nav className="font-mono text-xs mb-8" style={{ color: 'var(--color-ink-muted)' }} aria-label="Breadcrumb">
          <Link to="/catalogo" className="hover:text-accent transition-colors">
            Catálogo
          </Link>
          <span className="mx-2">/</span>
          <span style={{ color: 'var(--color-ink)' }}>{product.name}</span>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-20"
        >
          {/* Gallery */}
          <div>
            <div className="rounded-lg overflow-hidden mb-3" style={{ aspectRatio: '3/4' }}>
              <img
                src={product.images[activeImage] || `https://picsum.photos/seed/${product.id}-${activeImage}/600/800`}
                alt={`Funda ${product.name}`}
                className="w-full h-full object-cover"
              />
            </div>
            {imageCount > 1 && (
              <div className="flex gap-3">
                {Array.from({ length: imageCount }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 transition-opacity duration-200"
                    style={{
                      outline: activeImage === i ? '2px solid var(--color-accent)' : 'none',
                      opacity: activeImage === i ? 1 : 0.7,
                    }}
                    aria-label={`Ver imagen ${i + 1}`}
                  >
                    <img
                      src={product.images[i] || `https://picsum.photos/seed/${product.id}-${i}/100/100`}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <h1 className="font-display font-light text-4xl mb-3" style={{ color: 'var(--color-ink)' }}>
              {product.name}
            </h1>

            <div className="flex flex-wrap gap-2 mb-5">
              {product.style.map((s) => (
                <Badge key={s} variant="blush">
                  {s}
                </Badge>
              ))}
            </div>

            <p
              className="font-sans font-light text-base mb-8"
              style={{ color: 'var(--color-ink-muted)', lineHeight: 1.75 }}
            >
              {product.description}
            </p>

            {/* Model selector */}
            <label className="block font-sans text-sm font-medium mb-2" style={{ color: 'var(--color-ink)' }}>
              Modelo de celular
            </label>
            <select
              value={phoneModel}
              onChange={(e) => {
                setPhoneModel(e.target.value)
                setAdded(false)
              }}
              className="w-full font-sans text-base px-4 py-3 rounded-md border bg-white mb-6"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink)' }}
            >
              <option value="">Elegí tu modelo</option>
              {Object.entries(modelsByBrand).map(([brand, models]) => (
                <optgroup key={brand} label={brand}>
                  {models.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>

            {/* Quantity */}
            <label className="block font-sans text-sm font-medium mb-2" style={{ color: 'var(--color-ink)' }}>
              Cantidad
            </label>
            <div className="flex items-center gap-3 mb-8">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 rounded-full border flex items-center justify-center font-sans text-lg hover:bg-surface transition-colors"
                style={{ borderColor: 'var(--color-border)' }}
                aria-label="Restar cantidad"
              >
                −
              </button>
              <span className="font-sans font-medium text-base w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-10 rounded-full border flex items-center justify-center font-sans text-lg hover:bg-surface transition-colors"
                style={{ borderColor: 'var(--color-border)' }}
                aria-label="Sumar cantidad"
              >
                +
              </button>
            </div>

            {!added ? (
              <button onClick={handleAddToCart} disabled={!phoneModel} className="btn-primary w-full md:w-auto" style={!phoneModel ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}>
                Agregar al carrito
              </button>
            ) : (
              <div className="flex flex-wrap items-center gap-4">
                <span className="font-sans text-sm" style={{ color: 'var(--color-accent-dark)' }}>
                  ✓ Agregado al carrito
                </span>
                <button onClick={() => navigate('/carrito')} className="btn-secondary">
                  Ir al carrito
                </button>
              </div>
            )}
            {!phoneModel && !added && (
              <p className="font-sans text-xs mt-3" style={{ color: 'var(--color-ink-muted)' }}>
                Elegí tu modelo de celular para continuar.
              </p>
            )}

            <p className="font-sans text-sm mt-8" style={{ color: 'var(--color-ink-muted)' }}>
              ¿Querés esta idea pero con tu toque?{' '}
              <a
                href={buildWhatsAppConsultUrl(CUSTOMIZE_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-accent"
              >
                Personalizala
              </a>
              .
            </p>
          </div>
        </motion.div>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="section-title text-center mb-10">También te puede gustar</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
