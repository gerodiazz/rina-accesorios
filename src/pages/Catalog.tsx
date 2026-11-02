import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useProducts } from '../hooks/useProducts'
import { useCategories } from '../hooks/useCategories'
import { ProductCard } from '../components/catalog/ProductCard'
import { FUNDAS_FILTER, isFundaStyleCategory, toCardProduct } from '../utils/catalog'

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryParam = searchParams.get('categoria')

  const { products: dbProducts, loading: loadingProducts } = useProducts()
  const { categories, loading: loadingCategories } = useCategories()

  const [activeStyles, setActiveStyles] = useState<string[]>([])

  // Categorías activas para los filtros
  const activeCategories = useMemo(() =>
    categories.filter(c => c.active),
    [categories]
  )

  // Estilos de fundas (categorías marcadas como estilo de funda)
  const fundaStyleCategories = useMemo(() =>
    activeCategories.filter(isFundaStyleCategory),
    [activeCategories]
  )

  // Categorías principales para el filtro superior: todo lo que no es funda
  const mainCategories = useMemo(() =>
    activeCategories.filter(c => !isFundaStyleCategory(c)),
    [activeCategories]
  )

  // La URL (?categoria=) es la única fuente del filtro principal:
  // 'all', 'fundas' o el id de una categoría principal.
  const paramCategory = activeCategories.find(c => c.slug === categoryParam)
  const activeCategoryId: string =
    categoryParam === FUNDAS_FILTER || (paramCategory && isFundaStyleCategory(paramCategory))
      ? FUNDAS_FILTER
      : paramCategory?.id ?? 'all'

  // Al cambiar de categoría se limpian los estilos; si la URL apunta a un
  // estilo de funda, queda preseleccionado.
  useEffect(() => {
    setActiveStyles(paramCategory && isFundaStyleCategory(paramCategory) ? [paramCategory.id] : [])
  }, [categoryParam, paramCategory])

  const selectCategory = (slug: string | null) => {
    setSearchParams(slug ? { categoria: slug } : {})
  }

  const toggleStyle = (categoryId: string) => {
    setActiveStyles((current) =>
      current.includes(categoryId)
        ? current.filter((s) => s !== categoryId)
        : [...current, categoryId]
    )
  }

  const filteredProducts = useMemo(() => {
    let result = dbProducts.filter(p => p.active)

    // Filtrar por categoría principal (por id, no por nombre)
    if (activeCategoryId === FUNDAS_FILTER) {
      result = result.filter(p => p.category !== null && isFundaStyleCategory(p.category))
    } else if (activeCategoryId !== 'all') {
      result = result.filter(p => p.category_id === activeCategoryId)
    }

    // Filtrar por estilos (subcategorías de fundas)
    if (activeStyles.length > 0) {
      result = result.filter(p => p.category_id !== null && activeStyles.includes(p.category_id))
    }

    return result.map(toCardProduct)
  }, [activeCategoryId, activeStyles, dbProducts])

  const showStyleFilters = activeCategoryId === 'all' || activeCategoryId === FUNDAS_FILTER

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
            onClick={() => selectCategory(null)}
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
            onClick={() => selectCategory(FUNDAS_FILTER)}
            className="font-sans text-sm px-4 py-2 rounded-full border transition-all duration-200"
            style={
              activeCategoryId === FUNDAS_FILTER
                ? { background: 'var(--color-ink)', color: 'white', borderColor: 'var(--color-ink)' }
                : { background: 'transparent', color: 'var(--color-ink)', borderColor: 'var(--color-border)' }
            }
          >
            Fundas
          </button>
          {mainCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => selectCategory(cat.slug)}
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
                  setActiveStyles([])
                  selectCategory(null)
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
