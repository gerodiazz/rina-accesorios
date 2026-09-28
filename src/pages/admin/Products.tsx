import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from '../../hooks/useProducts'
import { useCategories } from '../../hooks/useCategories'
import { deleteProduct, updateProduct } from '../../services/products'

export default function AdminProducts() {
  const { products, refetch } = useProducts()
  const { categories } = useCategories()
  const [deleting, setDeleting] = useState<string | null>(null)

  const getCategoryName = (categoryId: string | null) => {
    if (!categoryId) return '—'
    const category = categories.find(c => c.id === categoryId)
    return category?.name ?? '—'
  }

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    await updateProduct(id, { active: !currentActive })
    refetch()
  }

  const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
    await updateProduct(id, { featured: !currentFeatured })
    refetch()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este producto?')) return
    setDeleting(id)
    await deleteProduct(id)
    setDeleting(null)
    refetch()
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-light text-[#1A1A1A] mb-2">
            Productos
          </h1>
          <p className="font-sans text-[#6B6B6B]">
            Gestión de productos del catálogo
          </p>
        </div>
        <Link
          to="/admin/productos/nuevo"
          className="px-4 py-2.5 rounded-lg bg-[#1A1A1A] text-white font-sans text-sm font-medium hover:bg-[#333] transition-colors"
        >
          + Nuevo producto
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F5F5F5]">
            <tr>
              <th className="px-4 py-3 text-left font-sans text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
                Producto
              </th>
              <th className="px-4 py-3 text-left font-sans text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
                Categoría
              </th>
              <th className="px-4 py-3 text-left font-sans text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
                Precio
              </th>
              <th className="px-4 py-3 text-center font-sans text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
                Activo
              </th>
              <th className="px-4 py-3 text-center font-sans text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
                Destacado
              </th>
              <th className="px-4 py-3 text-right font-sans text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E2DC]">
            {products.map(product => (
              <tr key={product.id} className="hover:bg-[#FAFAF8]">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-[#F5F5F5] overflow-hidden flex-shrink-0">
                      <img
                        src={product.images[0]?.url || `https://picsum.photos/seed/${product.slug}/96/96`}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-sans text-sm font-medium text-[#1A1A1A]">
                        {product.name}
                      </p>
                      {product.whatsapp_only && (
                        <span className="inline-flex px-1.5 py-0.5 rounded text-xs bg-[#C9A96E]/20 text-[#A8813F]">
                          Solo WhatsApp
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="font-sans text-sm text-[#6B6B6B]">
                    {getCategoryName(product.category_id)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-sans text-sm text-[#6B6B6B]">
                    {product.price_display || '—'}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleToggleActive(product.id, product.active)}
                    className={`w-10 h-6 rounded-full relative transition-colors ${
                      product.active ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        product.active ? 'left-5' : 'left-1'
                      }`}
                    />
                  </button>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleToggleFeatured(product.id, product.featured)}
                    className={`w-10 h-6 rounded-full relative transition-colors ${
                      product.featured ? 'bg-[#C9A96E]' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        product.featured ? 'left-5' : 'left-1'
                      }`}
                    />
                  </button>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to={`/admin/productos/${product.id}`}
                      className="px-3 py-1.5 rounded-lg bg-[#F5F5F5] hover:bg-[#E5E2DC] font-sans text-sm text-[#1A1A1A] transition-colors"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      disabled={deleting === product.id}
                      className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 font-sans text-sm text-red-600 transition-colors disabled:opacity-50"
                    >
                      {deleting === product.id ? '...' : 'Eliminar'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="px-4 py-12 text-center">
            <p className="font-sans text-[#6B6B6B]">No hay productos aún</p>
          </div>
        )}
      </div>
    </div>
  )
}
