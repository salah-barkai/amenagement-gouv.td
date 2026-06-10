import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Newspaper, FolderOpen, FileText,
  Image, MessageSquare, Users, LogOut, Menu, X, ChevronRight,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Tableau de bord', href: '/admin', icon: LayoutDashboard, exact: true },
  { label: 'Actualités', href: '/admin/actualites', icon: Newspaper },
  { label: 'Projets', href: '/admin/projets', icon: FolderOpen },
  { label: 'Documents', href: '/admin/documents', icon: FileText },
  { label: 'Galerie', href: '/admin/galerie', icon: Image },
  { label: 'Messages', href: '/admin/messages', icon: MessageSquare },
  { label: 'Utilisateurs', href: '/admin/utilisateurs', icon: Users },
]

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { signOut, user, profil } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar overlay mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-30 w-64 bg-primary-900 text-white flex flex-col transition-transform duration-200',
        'lg:static lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
      )}>
        {/* Logo sidebar */}
        <div className="flex items-center justify-between p-4 border-b border-primary-700">
          <div className="flex items-center gap-3">
            <img src="/images/logo.jpg" alt="Logo MATUH" className="w-9 h-9 object-contain bg-white rounded-full p-0.5 flex-shrink-0" />
            <div>
              <p className="font-bold text-sm leading-tight">Administration</p>
              <p className="text-xs text-white/60">MATUH — Tchad</p>
            </div>
          </div>
          <button className="lg:hidden p-1" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map(item => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.exact}
              className={({ isActive }) =>
                cn('flex items-center gap-3 px-4 py-3 text-sm transition-colors',
                  isActive
                    ? 'bg-primary-600 text-white font-medium border-r-2 border-gold-400'
                    : 'text-white/70 hover:bg-primary-700 hover:text-white')
              }
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {item.label}
              <ChevronRight className="h-3 w-3 ml-auto opacity-40" />
            </NavLink>
          ))}
        </nav>

        {/* Profil + Déconnexion */}
        <div className="border-t border-primary-700 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center text-sm font-bold text-white">
              {(profil?.prenom?.[0] || user?.email?.[0] || 'A').toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{profil?.prenom} {profil?.nom}</p>
              <p className="text-xs text-white/50 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-primary-700 rounded-md transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="bg-white border-b shadow-sm sticky top-0 z-10">
          <div className="flex items-center justify-between px-4 h-14">
            <button className="lg:hidden p-2" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5 text-gray-600" />
            </button>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="hidden sm:block">Bienvenue,</span>
              <span className="font-medium">{profil?.prenom || user?.email}</span>
            </div>
            <a href="/" target="_blank" rel="noopener noreferrer"
              className="text-xs text-primary-500 hover:underline hidden sm:block">
              Voir le site →
            </a>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
