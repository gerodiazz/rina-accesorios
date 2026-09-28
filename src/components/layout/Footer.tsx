import { Link } from 'react-router-dom'
import { buildWhatsAppConsultUrl } from '../../utils/whatsapp'

const brandName = import.meta.env.VITE_BRAND_NAME ?? 'Rina Accesorios'
const instagramUrl = import.meta.env.VITE_INSTAGRAM_URL ?? '#'
const tiktokUrl = import.meta.env.VITE_TIKTOK_URL ?? '#'
const email = import.meta.env.VITE_BRAND_EMAIL ?? ''

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: 'var(--color-ink)', color: 'var(--color-bg)' }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-16 pb-8">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4 inline-block rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <img
                src="/logo.jpeg"
                alt={brandName}
                className="h-32 w-auto rounded-lg"
                style={{ objectFit: 'contain' }}
              />
            </div>
            <p className="font-display font-light text-lg italic" style={{ color: 'var(--color-accent)' }}>
              "Fundas que cuentan tu historia."
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--color-ink-muted)' }}>
              Navegación
            </h3>
            <ul className="space-y-2.5">
              {[
                { to: '/catalogo', label: 'Catálogo' },
                { to: '/personalizar', label: 'Personalizar' },
                { to: '/faq', label: 'Preguntas frecuentes' },
                { to: '/carrito', label: 'Mi carrito' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="font-sans text-sm transition-colors duration-150 hover:text-accent"
                    style={{ color: 'rgba(250,250,248,0.7)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--color-ink-muted)' }}>
              Contacto
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={buildWhatsAppConsultUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm transition-colors duration-150 hover:text-accent flex items-center gap-2"
                  style={{ color: 'rgba(250,250,248,0.7)' }}
                >
                  <span style={{ color: '#25D366' }}>●</span> WhatsApp
                </a>
              </li>
              {email && (
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="font-sans text-sm transition-colors duration-150 hover:text-accent"
                    style={{ color: 'rgba(250,250,248,0.7)' }}
                  >
                    {email}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Redes */}
          <div>
            <h3 className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--color-ink-muted)' }}>
              Redes
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm transition-colors duration-150 hover:text-accent flex items-center gap-2"
                  style={{ color: 'rgba(250,250,248,0.7)' }}
                >
                  <InstagramIcon /> Instagram
                </a>
              </li>
              <li>
                <a
                  href={tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm transition-colors duration-150 hover:text-accent flex items-center gap-2"
                  style={{ color: 'rgba(250,250,248,0.7)' }}
                >
                  <TikTokIcon /> TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs" style={{ color: 'rgba(250,250,248,0.4)' }}>
            © 2025 {brandName}. Hecho con ♡ en Argentina.
          </p>
          <p className="font-sans text-xs" style={{ color: 'rgba(250,250,248,0.4)' }}>
            Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

function InstagramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.77a4.85 4.85 0 01-1.01-.08z" />
    </svg>
  )
}
