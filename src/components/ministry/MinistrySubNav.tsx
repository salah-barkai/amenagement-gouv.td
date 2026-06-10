import { NavLink } from 'react-router-dom'
import { Building2, MessageSquare, Target, GitBranch } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { label: 'Présentation',           href: '/ministere',                  icon: Building2,    end: true },
  { label: 'Mot du Ministre',        href: '/ministere/mot-ministre',     icon: MessageSquare, end: false },
  { label: 'Missions & Attributions', href: '/ministere/missions',        icon: Target,        end: false },
  { label: 'Organigramme',           href: '/ministere/organigramme',     icon: GitBranch,     end: false },
]

export function MinistrySubNav() {
  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex overflow-x-auto scrollbar-hide -mb-px">
          {links.map(({ label, href, icon: Icon, end }) => (
            <NavLink
              key={href}
              to={href}
              end={end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors flex-shrink-0',
                  isActive
                    ? 'border-primary-600 text-primary-700 bg-primary-50/60'
                    : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                )
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  )
}
