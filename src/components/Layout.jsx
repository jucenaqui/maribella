import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, MessageCircle, ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { INSTAGRAM, nav, navGroups, navMore, navPrimary, PHONE_LABEL, WHATSAPP } from '../data'
import RegionSwitch from './RegionSwitch.jsx'

function linkClass(isActive, dark) {
  return `whitespace-nowrap text-[11px] uppercase tracking-[0.14em] ${
    isActive ? 'text-fuchsia' : dark ? 'text-beige/80 hover:text-beige' : 'text-purple/80 hover:text-purple'
  }`
}

export default function Layout({ children, theme = 'light' }) {
  const [open, setOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const location = useLocation()
  const dark = theme === 'dark'
  const hideFab = location.pathname === '/cotizador' || location.pathname === '/tu-terapia'

  useEffect(() => {
    setOpen(false)
    setMoreOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <div className={dark ? 'page-dark' : 'page-light'}>
      <header className={`relative sticky top-0 z-40 backdrop-blur-md ${dark ? 'nav-dark' : 'nav-light'}`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-5">
          <Link to="/" className="flex min-w-0 items-center gap-2 sm:gap-3" onClick={() => setOpen(false)}>
            <img src="/logo.jpg" alt="Maribella" className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-purple/15 sm:h-11 sm:w-11" />
            <span className="leading-tight">
              <span className="block font-serif text-xl italic sm:text-2xl">Maribella</span>
              <span className={`hidden text-[10px] uppercase tracking-[0.18em] sm:block ${dark ? 'text-beige/70' : 'text-purple/70'}`}>
                Sanación sistémica
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-4 xl:flex" aria-label="Menú principal">
            {navPrimary.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => linkClass(isActive, dark)}>
                {item.label}
              </NavLink>
            ))}
            <div className="relative">
              <button
                type="button"
                className={`inline-flex items-center gap-1 ${linkClass(navMore.some((i) => location.pathname === i.to), dark)}`}
                aria-expanded={moreOpen}
                onClick={() => setMoreOpen((v) => !v)}
              >
                Más
                <ChevronDown size={14} />
              </button>
              {moreOpen && (
                <div
                  className={`absolute right-0 top-full z-50 mt-2 min-w-[11rem] rounded-sm border py-2 shadow-soft ${
                    dark ? 'border-beige/15 bg-[#2a1838]' : 'border-purple/10 bg-[#fbf8ef]'
                  }`}
                >
                  {navMore.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`block px-4 py-2 text-sm ${location.pathname === item.to ? 'text-fuchsia' : ''}`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden md:block">
              <RegionSwitch dark={dark} />
            </div>
            <button
              className="grid h-11 w-11 place-items-center xl:hidden"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {open && (
          <div
            className={`xl:hidden absolute inset-x-0 top-full z-50 h-[calc(100dvh-4.25rem)] overflow-y-auto px-5 pb-10 pt-4 ${
              dark ? 'bg-[#2a1838] text-beige' : 'bg-[#f7efe4] text-purple'
            }`}
          >
            <div className="mb-5 md:hidden">
              <RegionSwitch dark={dark} />
            </div>
            {navGroups.map((group) => (
              <div key={group.title} className="mb-6">
                <p className="eyebrow mb-1">{group.title}</p>
                <div className="flex flex-col">
                  {group.items.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`border-b py-3.5 text-[1.05rem] ${
                        dark ? 'border-beige/10' : 'border-purple/10'
                      } ${location.pathname === item.to ? 'text-fuchsia' : ''}`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </header>

      <main>{children}</main>

      <footer className={`mt-12 border-t sm:mt-16 ${dark ? 'border-beige/15' : 'border-purple/10'}`}>
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-3">
          <div>
            <p className="font-serif text-3xl italic">Maribella</p>
            <p className={`mt-2 max-w-sm text-sm leading-relaxed ${dark ? 'text-beige/75' : 'text-purple/75'}`}>
              Acompaño a personas en búsqueda de sentido y paz interior a descifrar bloqueos emocionales y genealógicos, con un método claro, ético y personalizado.
            </p>
          </div>
          <div>
            <p className="eyebrow">Explora</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
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
                  WhatsApp {PHONE_LABEL}
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
        <p className={`px-5 pb-24 text-center text-xs md:pb-8 ${dark ? 'text-beige/50' : 'text-purple/50'}`}>
          © {new Date().getFullYear()} Maribella · La sanación en todas tus dimensiones
        </p>
      </footer>

      {!hideFab && !open && (
        <a className="whatsapp-fab" href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="WhatsApp">
          <MessageCircle size={22} />
        </a>
      )}
    </div>
  )
}
