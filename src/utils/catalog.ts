import type { Category, ProductWithRelations } from '../types/database'
import type { Product as LocalProduct, ProductCategory } from '../data/products'

/** Valor del filtro de catálogo que agrupa todas las categorías de estilo de funda. */
export const FUNDAS_FILTER = 'fundas'

/**
 * Indica si la categoría es un estilo de funda ("Con dijes", "Series"...).
 * Se define en la columna `is_funda_style` (ver sql/categories_funda_style.sql).
 * Mientras esa migración no esté aplicada la columna no llega, y se usa la
 * convención de nombres actual: "Funda ...", "Con ...", Series y Artistas.
 */
export function isFundaStyleCategory(category: Category): boolean {
  if (typeof category.is_funda_style === 'boolean') return category.is_funda_style
  return /^(funda|con)\s/i.test(category.name.trim()) || ['series', 'artistas'].includes(category.slug)
}

/**
 * Formatea el precio cargado en el admin ("$19000", "19.000", "Desde $5000")
 * al formato argentino: "$ 19.000". Devuelve null si no hay un monto.
 */
export function formatPrice(display?: string | null): string | null {
  const text = display?.trim()
  if (!text || !/\d/.test(text)) return null
  return text.replace(/\$?\s*(\d[\d.]*)/g, (_, amount: string) => {
    const digits = amount.replace(/\./g, '')
    return `$ ${digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
  })
}

/** Convierte un producto de la DB al formato que usa ProductCard. */
export function toCardProduct(p: ProductWithRelations): LocalProduct {
  return {
    id: p.slug,
    name: p.name,
    description: p.description ?? '',
    category: (p.category?.slug ?? 'fundas') as ProductCategory,
    style: p.category ? [p.category.name] : [],
    compatibleModels: [],
    images: p.images.map(img => img.url),
    featured: p.featured,
    whatsappOnly: p.whatsapp_only,
    whatsappMessage: p.whatsapp_message ?? undefined,
    price: p.price_display ?? undefined,
  }
}
