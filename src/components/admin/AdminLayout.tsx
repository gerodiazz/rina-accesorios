import { NavLink, Outlet, Link } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: '📊', end: true },
  { type: 'divider' as const },
  { to: '/admin/productos', label: 'Productos', icon: '🛍️' },
  { to: '/admin/categorias', label: 'Categorías', icon: '📁' },
  { to: '/admin/modelos', label: 'Modelos de celular', icon: '📱' },
  { type: 'divider' as const },
  { to: '/admin/contenido', label: 'Contenido del Home', icon: '🏠' },
  { to: '/admin/imagenes', label: 'Imágenes del sitio', icon: '🖼️' },
  { to: '/admin/faq', label: 'FAQ', icon: '❓' },
  { type: 'divider' as const },
  { to: '/admin/configuracion', label: 'Configuración', icon: '⚙️' },
]

export function AdminLayout() {
  const { signOut, user } = useAuthContext()

  return (
    <div className="min-h-screen flex bg-[#F5F5F5]">
      {/* Sidebar */}
      <aside className="w-60 bg-[#1A1A1A] flex flex-col flex-shrink-0">
        <div className="p-5 border-b border-white/10">
          <Link to="/" className="font-display text-lg text-white font-light">
            Rina Accesorios
          </Link>
          <p className="font-mono text-xs text-white/40 mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item, i) => {
            if (item.type === 'divider') {
              return <div key={i} className="my-3 mx-5 border-t border-white/10" />
            }
            return (
              <NavLink
                key={item.to}
                to={item.to!}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-5 py-2.5 font-sans text-sm transition-colors ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </NavLink>
            )
          })}
        </nav>

        <div className="p-5 border-t border-white/10">
          <p className="font-sans text-xs text-white/40 truncate mb-2">
            {user?.email}
          </p>
          <button
            onClick={signOut}
            className="w-full px-3 py-2 rounded-lg font-sans text-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors text-left"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
