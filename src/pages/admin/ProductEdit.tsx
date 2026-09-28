import { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProduct } from '../../hooks/useProducts'
import { useCategories } from '../../hooks/useCategories'
import { usePhoneModels } from '../../hooks/usePhoneModels'
import { createProduct, updateProduct } from '../../services/products'
import { ProductCard } from '../../components/catalog/ProductCard'
import type { Product as LocalProduct } from '../../data/products'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function AdminProductEdit() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isNew = id === 'nuevo'

  const { product: existingProduct, loading: loadingProduct } = useProduct(isNew ? '' : id ?? '')
  const { categories } = useCategories()
  const { modelsByBrand } = usePhoneModels()

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    category_id: '',
    price_display: '',
    whatsapp_only: false,
    whatsapp_message: '',
    active: true,
    featured: false,
  })

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (existingProduct && !isNew) {
      setFormData({
        name: existingProduct.name,
        slug: existingProduct.slug,
        description: existingProduct.description ?? '',
        category_id: existingProduct.category_id ?? '',
        price_display: existingProduct.price_display ?? '',
        whatsapp_only: existingProduct.whatsapp_only,
        whatsapp_message: existingProduct.whatsapp_message ?? '',
        active: existingProduct.active,
        featured: existingProduct.featured,
      })
    }
  }, [existingProduct, isNew])

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: isNew ? slugify(name) : prev.slug
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSaving(true)

    try {
      if (isNew) {
        const result = await createProduct(formData)
        if (result) {
          navigate('/admin/productos')
        } else {
          setError('Error al crear el producto')
        }
      } else {
        const result = await updateProduct(id!, formData)
        if (result) {
          navigate('/admin/productos')
        } else {
          setError('Error al actualizar el producto')
        }
      }
    } catch {
      setError('Ocurrió un error inesperado')
    } finally {
      setSaving(false)
    }
  }

  const previewProduct: LocalProduct = useMemo(() => ({
    id: formData.slug || 'preview',
    name: formData.name || 'Nombre del producto',
    description: formData.description || 'Descripción del producto',
    category: 'fundas',
    style: [],
    compatibleModels: [],
    images: existingProduct?.images.map(img => img.url) ?? [],
    featured: formData.featured,
    whatsappOnly: formData.whatsapp_only,
    whatsappMessage: formData.whatsapp_message,
    price: formData.price_display,
  }), [formData, existingProduct])

  if (!isNew && loadingProduct) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-light text-[#1A1A1A] mb-2">
          {isNew ? 'Nuevo producto' : 'Editar producto'}
        </h1>
        <p className="font-sans text-[#6B6B6B]">
          {isNew ? 'Completá los datos del nuevo producto' : `Editando: ${existingProduct?.name}`}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-sans text-sm font-medium text-[#1A1A1A] mb-1.5">
                Nombre *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={e => handleNameChange(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-[#E5E2DC] font-sans text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block font-sans text-sm font-medium text-[#1A1A1A] mb-1.5">
                Slug (URL)
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={e => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg border border-[#E5E2DC] font-sans text-[#6B6B6B] focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block font-sans text-sm font-medium text-[#1A1A1A] mb-1.5">
                Descripción
              </label>
              <textarea
                value={formData.description}
                onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg border border-[#E5E2DC] font-sans text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block font-sans text-sm font-medium text-[#1A1A1A] mb-1.5">
                Categoría
              </label>
              <select
                value={formData.category_id}
                onChange={e => setFormData(prev => ({ ...prev, category_id: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg border border-[#E5E2DC] font-sans text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent"
              >
                <option value="">Sin categoría</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-sans text-sm font-medium text-[#1A1A1A] mb-1.5">
                Precio (texto a mostrar)
              </label>
              <input
                type="text"
                value={formData.price_display}
                onChange={e => setFormData(prev => ({ ...prev, price_display: e.target.value }))}
                placeholder="Ej: Desde $5000 o A consultar"
                className="w-full px-4 py-2.5 rounded-lg border border-[#E5E2DC] font-sans text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent"
              />
            </div>

            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={e => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                  className="w-4 h-4 rounded border-[#E5E2DC] text-[#C9A96E] focus:ring-[#C9A96E]"
                />
                <span className="font-sans text-sm text-[#1A1A1A]">Activo</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={e => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  className="w-4 h-4 rounded border-[#E5E2DC] text-[#C9A96E] focus:ring-[#C9A96E]"
                />
                <span className="font-sans text-sm text-[#1A1A1A]">Destacado</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.whatsapp_only}
                  onChange={e => setFormData(prev => ({ ...prev, whatsapp_only: e.target.checked }))}
                  className="w-4 h-4 rounded border-[#E5E2DC] text-[#C9A96E] focus:ring-[#C9A96E]"
                />
                <span className="font-sans text-sm text-[#1A1A1A]">Solo WhatsApp</span>
              </label>
            </div>

            {formData.whatsapp_only && (
              <div>
                <label className="block font-sans text-sm font-medium text-[#1A1A1A] mb-1.5">
                  Mensaje de WhatsApp
                </label>
                <input
                  type="text"
                  value={formData.whatsapp_message}
                  onChange={e => setFormData(prev => ({ ...prev, whatsapp_message: e.target.value }))}
                  placeholder="Hola! Quiero consultar sobre..."
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E5E2DC] font-sans text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent"
                />
              </div>
            )}

            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg font-sans text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 rounded-lg bg-[#1A1A1A] text-white font-sans text-sm font-medium hover:bg-[#333] transition-colors disabled:opacity-50"
              >
                {saving ? 'Guardando...' : 'Guardar'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/productos')}
                className="px-6 py-2.5 rounded-lg bg-[#F5F5F5] text-[#1A1A1A] font-sans text-sm font-medium hover:bg-[#E5E2DC] transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>

        {/* Preview */}
        <div>
          <div className="sticky top-8">
            <h3 className="font-sans font-medium text-[#1A1A1A] mb-4">Vista previa</h3>
            <div className="bg-[#FAFAF8] rounded-xl p-6">
              <div className="max-w-[300px]">
                <ProductCard product={previewProduct} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
