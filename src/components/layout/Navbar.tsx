import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useCartStore } from '../../store/cart'
import { categoryLabels, allCategories, type ProductCategory } from '../../data/products'

const brandName = import.meta.env.VITE_BRAND_NAME ?? 'Rina Accesorios'

const navLinks = [
  { to: '/personalizar', label: 'Personalizar' },
  { to: '/faq', label: 'FAQ' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const productsRef = useRef<HTMLDivElement>(null)
  const itemCount = useCartStore((s) => s.items.reduce((acc, i) => acc + i.quantity, 0))
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setDrawerOpen(false)
    setProductsOpen(false)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (productsRef.current && !productsRef.current.contains(e.target as Node)) {
        setProductsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getCategoryUrl = (cat: ProductCategory) => `/catalogo?categoria=${cat}`

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300"
        style={
          scrolled
            ? {
                background: 'rgba(250,250,248,0.92)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid var(--color-border)',
              }
            : { background: 'transparent' }
        }
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-24 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" aria-label={brandName}>
            <img
              src="/logo.jpeg"
              alt={brandName}
              className="h-20 w-auto"
              style={{ objectFit: 'contain' }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
            {/* Products dropdown */}
            <div ref={productsRef} className="relative">
              <button
                onClick={() => setProductsOpen(!productsOpen)}
                className={`font-sans text-sm font-medium transition-colors duration-150 flex items-center gap-1 ${
                  location.pathname.startsWith('/catalogo') ? 'text-accent' : 'text-ink hover:text-accent'
                }`}
              >
                Productos
                <ChevronIcon open={productsOpen} />
              </button>
              {productsOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-48 py-2 rounded-lg shadow-lg"
                  style={{ background: 'white', border: '1px solid var(--color-border)' }}
                >
                  <Link
                    to="/catalogo"
                    className="block px-4 py-2 font-sans text-sm transition-colors hover:bg-surface"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    Ver todo
                  </Link>
                  {allCategories.map((cat) => (
                    <Link
                      key={cat}
                      to={getCategoryUrl(cat)}
                      className="block px-4 py-2 font-sans text-sm transition-colors hover:bg-surface"
                      style={{ color: 'var(--color-ink)' }}
                    >
                      {categoryLabels[cat]}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `font-sans text-sm font-medium transition-colors duration-150 relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:bg-accent after:transition-all after:duration-300 ${
                    isActive
                      ? 'text-accent after:w-full'
                      : 'text-ink hover:text-accent after:w-0 hover:after:w-full'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Cart + hamburger */}
          <div className="flex items-center gap-3">
            <Link
              to="/carrito"
              className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface transition-colors"
              aria-label={`Carrito${itemCount > 0 ? `, ${itemCount} ítems` : ''}`}
            >
              <CartIcon />
              {itemCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center rounded-full text-white font-sans font-medium"
                  style={{ fontSize: '0.65rem', background: 'var(--color-accent)' }}
                >
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>

            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface transition-colors"
              onClick={() => setDrawerOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={drawerOpen}
            >
              <HamburgerIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-[110] bg-black/40 md:hidden"
          onClick={() => setDrawerOpen(false)}
          aria-hidden
        />
      )}

      {/* Mobile drawer */}
      <aside
        className="fixed top-0 right-0 bottom-0 z-[120] w-72 bg-white flex flex-col md:hidden transition-transform duration-[280ms] ease-out"
        style={{
          transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
          boxShadow: 'var(--shadow-modal)',
        }}
        aria-label="Menú de navegación"
      >
        <div className="flex items-center justify-between px-6 h-16 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <img
            src="/logo.jpeg"
            alt={brandName}
            className="h-16 w-auto"
            style={{ objectFit: 'contain' }}
          />
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface transition-colors"
            onClick={() => setDrawerOpen(false)}
            aria-label="Cerrar menú"
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="flex-1 flex flex-col px-6 py-8 gap-2 overflow-y-auto" aria-label="Menú móvil">
          {/* Products section */}
          <span
            className="font-sans text-xs font-medium uppercase tracking-wider mb-2"
            style={{ color: 'var(--color-ink-muted)' }}
          >
            Productos
          </span>
          <NavLink
            to="/catalogo"
            className={({ isActive }) =>
              `font-display text-xl font-light py-2 transition-colors duration-150 ${
                isActive ? 'text-accent' : 'text-ink hover:text-accent'
              }`
            }
          >
            Ver todo
          </NavLink>
          {allCategories.map((cat) => (
            <NavLink
              key={cat}
              to={getCategoryUrl(cat)}
              className="font-sans text-base font-light py-1.5 pl-3 transition-colors duration-150 text-ink hover:text-accent"
              style={{ borderLeft: '2px solid var(--color-border)' }}
            >
              {categoryLabels[cat]}
            </NavLink>
          ))}

          <div className="my-4 border-t" style={{ borderColor: 'var(--color-border)' }} />

          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-display text-xl font-light py-2 transition-colors duration-150 ${
                  isActive ? 'text-accent' : 'text-ink hover:text-accent'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/carrito"
            className={({ isActive }) =>
              `font-display text-xl font-light py-2 transition-colors duration-150 flex items-center gap-2 ${
                isActive ? 'text-accent' : 'text-ink hover:text-accent'
              }`
            }
          >
            Carrito
            {itemCount > 0 && (
              <span
                className="w-5 h-5 flex items-center justify-center rounded-full text-white font-sans font-medium"
                style={{ fontSize: '0.65rem', background: 'var(--color-accent)' }}
              >
                {itemCount}
              </span>
            )}
          </NavLink>
        </nav>

        <div className="px-6 pb-8">
          <a
            href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER ?? ''}?text=${encodeURIComponent('¡Hola! Quiero consultar sobre fundas.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-sans font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: '#25D366' }}
          >
            <WhatsAppIcon />
            Consultá por WhatsApp
          </a>
        </div>
      </aside>
    </>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="transition-transform duration-200"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
      aria-hidden
    >
      <path d="M3 4.5L6 7.5L9 4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
      <path d="M16 10a4 4 0 01-8 0" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function HamburgerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
      <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
      <line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M2 2l12 12M14 2L2 14" strokeLinecap="round" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.856L0 24l6.335-1.511A11.947 11.947 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.369l-.36-.213-3.73.889.929-3.627-.234-.373A9.818 9.818 0 112 12c0 5.42 4.398 9.818 9.818 9.818H12z" />
    </svg>
  )
}
