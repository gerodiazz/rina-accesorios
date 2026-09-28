import { Link } from 'react-router-dom'
import { useProducts } from '../../hooks/useProducts'
import { useCategories } from '../../hooks/useCategories'
import { usePhoneModels } from '../../hooks/usePhoneModels'
import { useFaq } from '../../hooks/useFaq'

export default function AdminDashboard() {
  const { products } = useProducts()
  const { categories } = useCategories()
  const { phoneModels } = usePhoneModels()
  const { faqItems } = useFaq()

  const stats = [
    { label: 'Productos', value: products.length, to: '/admin/productos', icon: '🛍️' },
    { label: 'Categorías', value: categories.length, to: '/admin/categorias', icon: '📁' },
    { label: 'Modelos', value: phoneModels.length, to: '/admin/modelos', icon: '📱' },
    { label: 'FAQ', value: faqItems.length, to: '/admin/faq', icon: '❓' },
  ]

  const quickLinks = [
    { label: 'Agregar producto', to: '/admin/productos/nuevo', icon: '➕' },
    { label: 'Editar contenido del Home', to: '/admin/contenido', icon: '🏠' },
    { label: 'Subir imágenes', to: '/admin/imagenes', icon: '🖼️' },
    { label: 'Ver sitio', to: '/', icon: '🔗', external: true },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-light text-[#1A1A1A] mb-2">
          Dashboard
        </h1>
        <p className="font-sans text-[#6B6B6B]">
          Bienvenida al panel de administración
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map(stat => (
          <Link
            key={stat.label}
            to={stat.to}
            className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{stat.icon}</span>
              <span className="font-display text-3xl font-light text-[#1A1A1A]">
                {stat.value}
              </span>
            </div>
            <p className="font-sans text-sm text-[#6B6B6B]">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div className="mb-10">
        <h2 className="font-sans font-medium text-[#1A1A1A] mb-4">Accesos rápidos</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickLinks.map(link => (
            <Link
              key={link.label}
              to={link.to}
              target={link.external ? '_blank' : undefined}
              className="flex items-center gap-3 bg-white rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-lg">{link.icon}</span>
              <span className="font-sans text-sm text-[#1A1A1A]">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent products */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-sans font-medium text-[#1A1A1A]">Productos recientes</h2>
          <Link
            to="/admin/productos"
            className="font-sans text-sm text-[#C9A96E] hover:underline"
          >
            Ver todos
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
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E2DC]">
              {products.slice(0, 5).map(product => (
                <tr key={product.id} className="hover:bg-[#FAFAF8]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] overflow-hidden flex-shrink-0">
                        {product.images[0] && (
                          <img
                            src={product.images[0].url || `https://picsum.photos/seed/${product.slug}/80/80`}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <span className="font-sans text-sm text-[#1A1A1A]">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-sans text-sm text-[#6B6B6B]">
                      {product.category?.name ?? '—'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full font-sans text-xs ${
                        product.active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {product.active ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
