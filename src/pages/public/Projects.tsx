import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { MapPin, Search, ArrowRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Projet } from '@/types'
import { cn, STATUTS_PROJET } from '@/lib/utils'
import { Spinner } from '@/components/ui/Spinner'

const statuts = ['En cours', 'Terminé', 'Planifié', 'Suspendu']

export default function Projects() {
  const [statut, setStatut] = useState('')
  const [search, setSearch] = useState('')

  const { data: projets, isLoading } = useQuery({
    queryKey: ['projets', statut, search],
    queryFn: async () => {
      let query = supabase
        .from('projets')
        .select('*')
        .eq('publie', true)
        .order('created_at', { ascending: false })

      if (statut) query = query.eq('statut', statut)
      if (search) query = query.ilike('titre', `%${search}%`)

      const { data } = await query
      return data as Projet[]
    },
  })

  return (
    <div>
      <div className="bg-hero-pattern py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex h-1 mb-1 w-16">
            <div className="flex-1 bg-tchad-blue" />
            <div className="flex-1 bg-tchad-yellow" />
            <div className="flex-1 bg-tchad-red" />
          </div>
          <h1 className="text-4xl font-bold text-white mt-3">Projets</h1>
          <p className="text-white/70 mt-2">Les projets d'aménagement et de développement du territoire</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Filtres */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un projet..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setStatut('')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${!statut ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              Tous
            </button>
            {statuts.map(s => (
              <button
                key={s}
                onClick={() => setStatut(s)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${statut === s ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <Spinner />
        ) : !projets?.length ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg font-medium">Aucun projet trouvé</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projets.map(projet => (
              <Link
                key={projet.id}
                to={`/projets/${projet.id}`}
                className="group flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-gradient-to-br from-primary-700 to-primary-900 relative">
                  {projet.image_url ? (
                    <img src={projet.image_url} alt={projet.titre} className="w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white/20 text-6xl font-black">{projet.titre[0]}</span>
                    </div>
                  )}
                  <span className={cn('absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full', STATUTS_PROJET[projet.statut])}>
                    {projet.statut}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors mb-2 line-clamp-2">
                    {projet.titre}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-3 flex-1">{projet.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    {projet.localisation && (
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <MapPin className="h-3 w-3" />{projet.localisation}
                      </div>
                    )}
                    <span className="text-primary-500 text-xs font-medium flex items-center gap-1 ml-auto">
                      Détails <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
