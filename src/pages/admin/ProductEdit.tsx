import { useState, useEffect, useMemo, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProduct } from '../../hooks/useProducts'
import { useCategories } from '../../hooks/useCategories'
import { usePhoneModels } from '../../hooks/usePhoneModels'
import { createProduct, updateProduct, getProductById, addProductImage, deleteProductImage } from '../../services/products'
import { uploadImage, deleteImage, getImagePathFromUrl, validateImageFile, ACCEPTED_IMAGE_TYPES } from '../../services/storage'
import { ProductCard } from '../../components/catalog/ProductCard'
import type { Product as LocalProduct } from '../../data/products'
import type { ProductWithRelations, ProductImage } from '../../types/database'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

interface PendingImage {
  file: File
  preview: string
}

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

  // La lista del admin linkea por id (uuid); useProduct busca por slug, así que se usa solo como fallback
  const isUuid = !isNew && UUID_RE.test(id ?? '')
  const { product: productBySlug, loading: loadingBySlug } = useProduct(isNew || isUuid ? '' : id ?? '')
  const [productById, setProductById] = useState<ProductWithRelations | null>(null)
  const [loadingById, setLoadingById] = useState(isUuid)

  useEffect(() => {
    if (!isUuid || !id) return
    let cancelled = false
    setLoadingById(true)
    getProductById(id).then(p => {
      if (cancelled) return
      setProductById(p)
      setLoadingById(false)
    })
    return () => { cancelled = true }
  }, [id, isUuid])

  const existingProduct = isUuid ? productById : productBySlug
  const loadingProduct = isUuid ? loadingById : loadingBySlug

  const [images, setImages] = useState<ProductImage[]>([])
  const [pendingImages, setPendingImages] = useState<PendingImage[]>([])
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (existingProduct && !isNew) setImages(existingProduct.images)
  }, [existingProduct, isNew])

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

  // Sube los archivos a Storage y los registra en product_images. Devuelve los errores encontrados.
  const uploadFilesToProduct = async (productId: string, files: File[], startCount: number): Promise<string[]> => {
    const errors: string[] = []
    let count = startCount
    for (const file of files) {
      const { url, error: uploadError } = await uploadImage('product-images', file)
      if (!url) {
        errors.push(uploadError ?? `No se pudo subir "${file.name}"`)
        continue
      }
      const alt = formData.name || file.name.replace(/\.[^.]+$/, '')
      const saved = await addProductImage(productId, url, alt, count === 0)
      if (!saved) {
        errors.push(`"${file.name}" se subió pero no se pudo asociar al producto.`)
        continue
      }
      count++
      setImages(prev => [...prev, saved])
    }
    return errors
  }

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return
    setError(null)

    const files: File[] = []
    const errors: string[] = []
    Array.from(fileList).forEach(file => {
      const invalid = validateImageFile(file)
      if (invalid) errors.push(invalid)
      else files.push(file)
    })

    if (files.length > 0) {
      if (isNew || !existingProduct) {
        // Todavía no existe el producto: se suben al guardar
        setPendingImages(prev => [...prev, ...files.map(file => ({ file, preview: URL.createObjectURL(file) }))])
      } else {
        setUploading(true)
        errors.push(...await uploadFilesToProduct(existingProduct.id, files, images.length))
        setUploading(false)
      }
    }

    if (errors.length > 0) setError(errors.join('\n'))
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const removePendingImage = (index: number) => {
    setPendingImages(prev => {
      URL.revokeObjectURL(prev[index].preview)
      return prev.filter((_, i) => i !== index)
    })
  }

  const removeImage = async (image: ProductImage) => {
    setError(null)
    const ok = await deleteProductImage(image.id)
    if (!ok) {
      setError('No se pudo eliminar la foto.')
      return
    }
    const path = getImagePathFromUrl(image.url)
    if (path && image.url.includes('/product-images/')) await deleteImage('product-images', path)
    setImages(prev => prev.filter(img => img.id !== image.id))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSaving(true)

    try {
      if (isNew) {
        const result = await createProduct(formData)
        if (result) {
          if (pendingImages.length > 0) {
            const uploadErrors = await uploadFilesToProduct(result.id, pendingImages.map(p => p.file), 0)
            pendingImages.forEach(p => URL.revokeObjectURL(p.preview))
            setPendingImages([])
            if (uploadErrors.length > 0) {
              // El producto ya existe: pasamos a modo edición para poder reintentar las fotos
              setError(`El producto se creó, pero algunas fotos fallaron:\n${uploadErrors.join('\n')}`)
              navigate(`/admin/productos/${result.id}`, { replace: true })
              return
            }
          }
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
    images: [...images.map(img => img.url), ...pendingImages.map(p => p.preview)],
    featured: formData.featured,
    whatsappOnly: formData.whatsapp_only,
    whatsappMessage: formData.whatsapp_message,
    price: formData.price_display,
  }), [formData, images, pendingImages])

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

            <div>
              <label className="block font-sans text-sm font-medium text-[#1A1A1A] mb-1.5">
                Fotos
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED_IMAGE_TYPES}
                multiple
                onChange={e => handleFiles(e.target.files)}
                className="hidden"
              />
              <div
                role="button"
                tabIndex={0}
                onClick={() => !uploading && fileInputRef.current?.click()}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click() }}
                onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={e => { e.preventDefault(); setDragOver(false); if (!uploading) handleFiles(e.dataTransfer.files) }}
                className={`w-full px-4 py-6 rounded-lg border-2 border-dashed text-center cursor-pointer transition-colors ${
                  dragOver ? 'border-[#C9A96E] bg-[#FAF6EE]' : 'border-[#E5E2DC] hover:border-[#C9A96E]'
                } ${uploading ? 'opacity-50 cursor-wait' : ''}`}
              >
                <p className="font-sans text-sm text-[#1A1A1A]">
                  {uploading ? 'Subiendo fotos...' : 'Hacé click o arrastrá fotos desde tu compu'}
                </p>
                <p className="font-sans text-xs text-[#6B6B6B] mt-1">
                  JPG, PNG, WEBP o GIF · hasta 10 MB · la primera es la principal
                </p>
              </div>

              {(images.length > 0 || pendingImages.length > 0) && (
                <div className="grid grid-cols-4 gap-3 mt-3">
                  {images.map((img, i) => (
                    <div key={img.id} className="relative aspect-square rounded-lg overflow-hidden bg-[#F5F5F5] group">
                      <img src={img.url} alt={img.alt ?? ''} className="w-full h-full object-cover" />
                      {i === 0 && (
                        <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/60 text-white font-sans text-[10px]">
                          Principal
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => removeImage(img)}
                        aria-label="Eliminar foto"
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white/90 text-red-600 text-sm leading-none shadow"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {pendingImages.map((p, i) => (
                    <div key={p.preview} className="relative aspect-square rounded-lg overflow-hidden bg-[#F5F5F5]">
                      <img src={p.preview} alt={p.file.name} className="w-full h-full object-cover opacity-80" />
                      <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/60 text-white font-sans text-[10px]">
                        {images.length === 0 && i === 0 ? 'Principal · ' : ''}Se sube al guardar
                      </span>
                      <button
                        type="button"
                        onClick={() => removePendingImage(i)}
                        aria-label="Quitar foto"
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white/90 text-red-600 text-sm leading-none shadow"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg font-sans text-sm whitespace-pre-line">
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
