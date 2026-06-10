import { useQuery } from '@tanstack/react-query'
import { Users, Shield, Edit2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Profil } from '@/types'
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Spinner } from '@/components/ui/Spinner'

const roleColors: Record<string, 'primary' | 'success' | 'warning'> = {
  admin: 'primary',
  editeur: 'success',
  lecteur: 'warning',
}

export default function UsersManager() {
  const { data: profils, isLoading } = useQuery({
    queryKey: ['admin-profils'],
    queryFn: async () => {
      const { data } = await supabase.from('profils').select('*').order('created_at', { ascending: false })
      return data as Profil[]
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Utilisateurs</h1>
          <p className="text-gray-500 text-sm">{profils?.length ?? 0} comptes enregistrés</p>
        </div>
      </div>

      {/* Info rôles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { role: 'admin', label: 'Administrateur', desc: 'Accès complet à toutes les fonctionnalités', color: 'bg-primary-50 border-primary-200 text-primary-700' },
          { role: 'editeur', label: 'Éditeur', desc: 'Peut créer et modifier les contenus', color: 'bg-green-50 border-green-200 text-green-700' },
          { role: 'lecteur', label: 'Lecteur', desc: 'Accès lecture seule au backoffice', color: 'bg-yellow-50 border-yellow-200 text-yellow-700' },
        ].map(r => (
          <div key={r.role} className={`p-4 border rounded-xl ${r.color}`}>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="h-4 w-4" />
              <span className="font-semibold text-sm">{r.label}</span>
            </div>
            <p className="text-xs opacity-70">{r.desc}</p>
          </div>
        ))}
      </div>

      {isLoading ? <Spinner /> : (
        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Utilisateur</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Rôle</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 hidden md:table-cell">Depuis le</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {profils?.length ? profils.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {(p.prenom?.[0] || 'U').toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{p.prenom} {p.nom}</p>
                        <p className="text-xs text-gray-400">{p.id.slice(0, 8)}…</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={roleColors[p.role] || 'gray'}>{p.role}</Badge>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell text-xs">
                    {formatDate(p.created_at)}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center text-gray-400">
                    <Users className="h-8 w-8 mx-auto mb-2 text-gray-200" />
                    <p>Aucun profil trouvé</p>
                    <p className="text-xs mt-1">Les profils sont créés automatiquement lors de la première connexion.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
