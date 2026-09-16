import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { INSTAGRAM, nav, WHATSAPP } from '../data'

export default function Layout({ children, theme = 'light' }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const dark = theme === 'dark'

  return (
    <div className={dark ? 'page-dark' : 'page-light'}>
      <header className={`sticky top-0 z-30 backdrop-blur-md ${dark ? 'nav-dark' : 'nav-light'}`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.jpg" alt="Maribella" className="h-12 w-12 rounded-full object-cover ring-1 ring-purple/15" />
            <span className="leading-tight">
              <span className="block font-serif text-2xl italic">Maribella</span>
              <span className={`block text-[10px] uppercase tracking-[0.22em] ${dark ? 'text-beige/70' : 'text-purple/70'}`}>
                Sanación sistémica
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-5 lg:flex" aria-label="Menú principal">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-[11px] uppercase tracking-[0.18em] ${
                    isActive
                      ? 'text-fuchsia'
                      : dark
                        ? 'text-beige/80 hover:text-beige'
                        : 'text-purple/80 hover:text-purple'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            className="lg:hidden"
            aria-label="Abrir menú"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div className="flex flex-col gap-3 px-5 pb-4 lg:hidden">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={`text-sm tracking-wide ${location.pathname === item.to ? 'text-fuchsia' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <main>{children}</main>

      <footer className={`mt-16 border-t ${dark ? 'border-beige/15' : 'border-purple/10'}`}>
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-3">
          <div>
            <p className="font-serif text-3xl italic">Maribella</p>
            <p className={`mt-2 max-w-sm text-sm leading-relaxed ${dark ? 'text-beige/75' : 'text-purple/75'}`}>
              Acompaño a personas en búsqueda de sentido y paz interior a descifrar bloqueos emocionales y genealógicos, con un método claro, ético y personalizado.
            </p>
          </div>
          <div>
            <p className="eyebrow">Explora</p>
            <ul className="mt-3 space-y-2 text-sm">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Conecta</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href={WHATSAPP} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={INSTAGRAM} target="_blank" rel="noreferrer">
                  Instagram @maribella_conexion
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className={`px-5 pb-8 text-center text-xs ${dark ? 'text-beige/50' : 'text-purple/50'}`}>
          © {new Date().getFullYear()} Maribella · La sanación en todas tus dimensiones
        </p>
      </footer>

      <a className="whatsapp-fab" href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="WhatsApp">
        <MessageCircle size={22} />
      </a>
    </div>
  )
}
