import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useProducts } from '../hooks/useProducts'
import { useCategories } from '../hooks/useCategories'
import { ProductCard } from '../components/catalog/ProductCard'
import type { Product as LocalProduct } from '../data/products'

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryParam = searchParams.get('categoria')

  const { products: dbProducts, loading: loadingProducts } = useProducts()
  const { categories, loading: loadingCategories } = useCategories()

  const [activeCategoryId, setActiveCategoryId] = useState<string | 'all'>('all')
  const [activeStyles, setActiveStyles] = useState<string[]>([])

  // Categorías activas para los filtros
  const activeCategories = useMemo(() =>
    categories.filter(c => c.active),
    [categories]
  )

  // Set initial category from URL param
  useEffect(() => {
    if (categoryParam && categories.length > 0) {
      const cat = categories.find(c => c.slug === categoryParam)
      if (cat) {
        setActiveCategoryId(cat.id)
      }
    }
  }, [categoryParam, categories])

  // Estilos de fundas (categorías que son subcategorías de fundas)
  const fundaStyleCategories = useMemo(() =>
    activeCategories.filter(c =>
      c.slug.includes('stickers') ||
      c.slug.includes('dijes') ||
      c.slug.includes('flores') ||
      c.slug === 'series' ||
      c.slug === 'artistas'
    ),
    [activeCategories]
  )

  // Categorías principales para el filtro superior
  const mainCategories = useMemo(() =>
    activeCategories.filter(c =>
      ['straps', 'box', 'llaveros', 'gift-card'].includes(c.slug)
    ),
    [activeCategories]
  )

  const toggleStyle = (categoryId: string) => {
    setActiveStyles((current) =>
      current.includes(categoryId)
        ? current.filter((s) => s !== categoryId)
        : [...current, categoryId]
    )
  }

  // Convertir productos de DB a formato local para ProductCard
  const products: LocalProduct[] = useMemo(() =>
    dbProducts
      .filter(p => p.active)
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
      })),
    [dbProducts]
  )

  const filteredProducts = useMemo(() => {
    let result = products

    // Filtrar por categoría principal
    if (activeCategoryId !== 'all') {
      const activeCat = categories.find(c => c.id === activeCategoryId)
      if (activeCat) {
        result = result.filter((p) => p.category === activeCat.slug)
      }
    }

    // Filtrar por estilos (subcategorías de fundas)
    if (activeStyles.length > 0) {
      const styleNames = activeStyles
        .map(id => categories.find(c => c.id === id)?.name)
        .filter(Boolean)
      result = result.filter((p) =>
        p.style.some((s) => styleNames.includes(s))
      )
    }

    return result
  }, [activeCategoryId, activeStyles, products, categories])

  const showStyleFilters = activeCategoryId === 'all' ||
    fundaStyleCategories.some(c => c.id === activeCategoryId)

  const loading = loadingProducts || loadingCategories

  if (loading) {
    return (
      <div className="pt-32 pb-20 flex justify-center" style={{ background: 'var(--color-bg)' }}>
        <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="pt-32 pb-20" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <span className="section-eyebrow block mb-3">Catálogo</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)' }}>
            Elegí el diseño que{' '}
            <em className="font-display font-light italic">te represente</em>
          </h1>
        </motion.div>

        {/* Category filters */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
          <button
            onClick={() => {
              setActiveCategoryId('all')
              setActiveStyles([])
              setSearchParams({})
            }}
            className="font-sans text-sm px-4 py-2 rounded-full border transition-all duration-200"
            style={
              activeCategoryId === 'all'
                ? { background: 'var(--color-ink)', color: 'white', borderColor: 'var(--color-ink)' }
                : { background: 'transparent', color: 'var(--color-ink)', borderColor: 'var(--color-border)' }
            }
          >
            Todo
          </button>
          <button
            onClick={() => {
              setActiveCategoryId('fundas')
              setActiveStyles([])
              setSearchParams({ categoria: 'fundas' })
            }}
            className="font-sans text-sm px-4 py-2 rounded-full border transition-all duration-200"
            style={
              activeCategoryId === 'fundas'
                ? { background: 'var(--color-ink)', color: 'white', borderColor: 'var(--color-ink)' }
                : { background: 'transparent', color: 'var(--color-ink)', borderColor: 'var(--color-border)' }
            }
          >
            Fundas
          </button>
          {mainCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategoryId(cat.id)
                setActiveStyles([])
                setSearchParams({ categoria: cat.slug })
              }}
              className="font-sans text-sm px-4 py-2 rounded-full border transition-all duration-200"
              style={
                activeCategoryId === cat.id
                  ? { background: 'var(--color-ink)', color: 'white', borderColor: 'var(--color-ink)' }
                  : { background: 'transparent', color: 'var(--color-ink)', borderColor: 'var(--color-border)' }
              }
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Style filters (only for fundas) */}
        {showStyleFilters && fundaStyleCategories.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {fundaStyleCategories.map((cat) => {
              const active = activeStyles.includes(cat.id)
              return (
                <button
                  key={cat.id}
                  onClick={() => toggleStyle(cat.id)}
                  className="font-sans text-xs px-3 py-1.5 rounded-full border transition-all duration-200"
                  style={
                    active
                      ? { background: 'var(--color-accent)', color: 'white', borderColor: 'var(--color-accent)' }
                      : { background: 'transparent', color: 'var(--color-ink-muted)', borderColor: 'var(--color-border)' }
                  }
                >
                  {cat.name}
                </button>
              )
            })}
            {activeStyles.length > 0 && (
              <button
                onClick={() => setActiveStyles([])}
                className="font-sans text-xs px-3 py-1.5 rounded-full transition-colors duration-200 hover:text-accent"
                style={{ color: 'var(--color-ink-muted)' }}
              >
                Limpiar
              </button>
            )}
          </div>
        )}

        {/* Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-sans text-lg mb-2" style={{ color: 'var(--color-ink)' }}>
              No encontramos productos con esos filtros.
            </p>
            <p className="font-sans text-sm" style={{ color: 'var(--color-ink-muted)' }}>
              Probá con otra combinación o{' '}
              <button
                onClick={() => {
                  setActiveCategoryId('all')
                  setActiveStyles([])
                  setSearchParams({})
                }}
                className="underline hover:text-accent"
              >
                mirá todo el catálogo
              </button>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
