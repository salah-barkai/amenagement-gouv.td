import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, ChevronDown, ExternalLink, Building2, MessageSquare, Target, GitBranch } from 'lucide-react'
import { cn } from '@/lib/utils'

const ministereChildren = [
  { label: 'Présentation',            href: '/ministere',                 icon: Building2,    desc: 'Qui sommes-nous, structure, activités'       },
  { label: 'Mot du Ministre',         href: '/ministere/mot-ministre',    icon: MessageSquare, desc: 'Message de M. Mahamat Assileck Halata'       },
  { label: 'Missions & Attributions', href: '/ministere/missions',        icon: Target,        desc: 'Territoire, Habitat, Urbanisme, Foncier'     },
  { label: 'Organigramme',            href: '/ministere/organigramme',    icon: GitBranch,     desc: 'Hiérarchie et structure organisationnelle'    },
]

const navigation = [
  { label: 'Accueil',      href: '/' },
  { label: 'Le Ministère', href: '/ministere', hasDropdown: true },
  { label: 'Actualités',   href: '/actualites' },
  { label: 'Projets',      href: '/projets'    },
  { label: 'Documents',    href: '/documents'  },
  { label: 'Contact',      href: '/contact'    },
]

export function Header() {
  const [mobileOpen, setMobileOpen]       = useState(false)
  const [ministereOpen, setMinistereOpen] = useState(false)
  const [mobileMinistere, setMobileMinistere] = useState(false)

  return (
    <header className="w-full relative z-50">
      {/* Bande tricolore */}
      <div className="flex h-1.5">
        <div className="flex-1 bg-tchad-blue" />
        <div className="flex-1 bg-tchad-yellow" />
        <div className="flex-1 bg-tchad-red" />
      </div>

      {/* Barre supérieure */}
      <div className="bg-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-xs">
          <span className="hidden sm:block text-white/70">République du Tchad — Unité · Travail · Progrès</span>
          <div className="flex items-center gap-2">
            <a href="http://www.presidence.td" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 px-2 py-0.5 rounded border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-colors">
              <ExternalLink className="h-2.5 w-2.5" />
              <span>Présidence.td</span>
            </a>
            <a href="http://www.primature.gouv.td" target="_blank" rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-colors">
              <ExternalLink className="h-2.5 w-2.5" />
              <span>Primature</span>
            </a>
            <span className="hidden md:block text-white/30 mx-1">|</span>
            <span className="hidden md:block text-white/60">+235 66 53 57 19</span>
            <span className="hidden lg:block text-white/30 mx-1">|</span>
            <span className="hidden lg:block text-white/60">contact@amenagement.gouv.td</span>
          </div>
        </div>
      </div>

      {/* Header principal */}
      <div className="bg-primary-500 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">

            {/* Logo + Nom */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0">
              <img src="/images/logo.jpg" alt="Logo MATUH"
                className="h-14 w-14 object-contain bg-white rounded-full p-0.5 shadow-md flex-shrink-0" />
              <div className="hidden md:block text-white">
                <p className="font-bold text-sm leading-tight">Ministère de l'Aménagement du</p>
                <p className="font-bold text-sm leading-tight">Territoire, de l'Habitat et de</p>
                <p className="font-bold text-sm leading-tight">l'Urbanisme</p>
              </div>
            </Link>

            {/* ── Navigation desktop ── */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navigation.map(item => {
                if (item.hasDropdown) {
                  return (
                    /* Dropdown "Le Ministère" — s'ouvre au SURVOL */
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => setMinistereOpen(true)}
                      onMouseLeave={() => setMinistereOpen(false)}
                    >
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          cn('flex items-center gap-1 px-3 py-2 text-sm rounded-md transition-colors',
                            isActive || ministereOpen
                              ? 'bg-white/20 text-white font-semibold'
                              : 'text-white/90 hover:text-white hover:bg-white/10')
                        }
                      >
                        {item.label}
                        <ChevronDown className={cn('h-3 w-3 transition-transform duration-200', ministereOpen && 'rotate-180')} />
                      </NavLink>

                      {/* Mega-dropdown */}
                      {ministereOpen && (
                        <div className="absolute top-full left-0 pt-1 w-72">
                          <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
                            {/* En-tête du dropdown */}
                            <div className="bg-primary-600 px-4 py-3">
                              <p className="text-white font-bold text-xs uppercase tracking-widest">Le Ministère</p>
                              <p className="text-white/60 text-xs mt-0.5">MATUH — République du Tchad</p>
                            </div>
                            {/* Liens */}
                            {ministereChildren.map(child => (
                              <NavLink
                                key={child.href}
                                to={child.href}
                                end={child.href === '/ministere'}
                                onClick={() => setMinistereOpen(false)}
                                className={({ isActive }) =>
                                  cn('flex items-start gap-3 px-4 py-3 border-b border-gray-50 last:border-0 transition-colors',
                                    isActive
                                      ? 'bg-primary-50 text-primary-700'
                                      : 'text-gray-700 hover:bg-gray-50')
                                }
                              >
                                {({ isActive }) => (
                                  <>
                                    <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5',
                                      isActive ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-500')}>
                                      <child.icon className="h-4 w-4" />
                                    </div>
                                    <div>
                                      <p className={cn('text-sm font-semibold leading-snug', isActive ? 'text-primary-700' : 'text-gray-800')}>
                                        {child.label}
                                      </p>
                                      <p className="text-xs text-gray-400 mt-0.5">{child.desc}</p>
                                    </div>
                                  </>
                                )}
                              </NavLink>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                }

                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    end={item.href === '/'}
                    className={({ isActive }) =>
                      cn('px-3 py-2 text-sm rounded-md transition-colors',
                        isActive ? 'bg-white text-primary-700 font-semibold' : 'text-white/90 hover:text-white hover:bg-white/10')
                    }
                  >
                    {item.label}
                  </NavLink>
                )
              })}
            </nav>

            {/* Bouton hamburger mobile */}
            <button className="lg:hidden p-2 text-white" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Menu mobile ── */}
      {mobileOpen && (
        <div className="lg:hidden bg-primary-700 border-t border-primary-600">
          <nav className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {navigation.map(item => {
              if (item.hasDropdown) {
                return (
                  <div key={item.label}>
                    <button
                      onClick={() => setMobileMinistere(!mobileMinistere)}
                      className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-white rounded-lg hover:bg-primary-600 transition-colors"
                    >
                      {item.label}
                      <ChevronDown className={cn('h-4 w-4 transition-transform', mobileMinistere && 'rotate-180')} />
                    </button>
                    {mobileMinistere && (
                      <div className="mt-1 ml-2 space-y-0.5 border-l-2 border-primary-500 pl-3">
                        {ministereChildren.map(child => (
                          <NavLink
                            key={child.href}
                            to={child.href}
                            end={child.href === '/ministere'}
                            onClick={() => { setMobileOpen(false); setMobileMinistere(false) }}
                            className={({ isActive }) =>
                              cn('flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                                isActive
                                  ? 'bg-white/20 text-white font-semibold'
                                  : 'text-white/80 hover:text-white hover:bg-white/10')
                            }
                          >
                            <child.icon className="h-4 w-4 flex-shrink-0" />
                            {child.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.href === '/'}
                  className={({ isActive }) =>
                    cn('block px-3 py-2.5 text-sm rounded-lg transition-colors',
                      isActive ? 'bg-white/20 text-white font-semibold' : 'text-white/80 hover:text-white hover:bg-white/10')
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </NavLink>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}
