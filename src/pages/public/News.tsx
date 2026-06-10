import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Calendar, Search, Tag, ArrowRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Actualite } from '@/types'
import { formatDate, truncate, CATEGORIES_ACTUALITE } from '@/lib/utils'
import { Spinner } from '@/components/ui/Spinner'
import { Badge } from '@/components/ui/Badge'

export default function News() {
  const [search, setSearch] = useState('')
  const [categorie, setCategorie] = useState('')

  const { data: actualites, isLoading } = useQuery({
    queryKey: ['actualites', search, categorie],
    queryFn: async () => {
      let query = supabase
        .from('actualites')
        .select('*')
        .eq('publie', true)
        .order('publie_le', { ascending: false })

      if (categorie) query = query.eq('categorie', categorie)
      if (search) query = query.ilike('titre', `%${search}%`)

      const { data } = await query
      return data as Actualite[]
    },
  })

  return (
    <div>
      {/* Banner */}
      <div className="bg-hero-pattern py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex h-1 mb-1 w-16">
            <div className="flex-1 bg-tchad-blue" />
            <div className="flex-1 bg-tchad-yellow" />
            <div className="flex-1 bg-tchad-red" />
          </div>
          <h1 className="text-4xl font-bold text-white mt-3">Actualités</h1>
          <p className="text-white/70 mt-2">Toutes les actualités du Ministère</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Filtres */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setCategorie('')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${!categorie ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              Tout
            </button>
            {CATEGORIES_ACTUALITE.map(cat => (
              <button
                key={cat}
                onClick={() => setCategorie(cat)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${categorie === cat ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <Spinner />
        ) : !actualites?.length ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg font-medium">Aucune actualité trouvée</p>
            <p className="text-sm mt-1">Essayez de modifier vos critères de recherche.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {actualites.map(actu => (
              <Link
                key={actu.id}
                to={`/actualites/${actu.id}`}
                className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-44 bg-gradient-to-br from-primary-500 to-primary-800 flex items-center justify-center overflow-hidden">
                  {actu.image_url ? (
                    <img src={actu.image_url} alt={actu.titre} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white/20 text-5xl font-black">{actu.titre[0]}</span>
                  )}
                </div>
                <div className="p-5">
                  <Badge variant="primary" className="mb-2">
                    <Tag className="h-2.5 w-2.5 mr-1" />{actu.categorie}
                  </Badge>
                  <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-2">
                    {actu.titre}
                  </h3>
                  {actu.extrait && (
                    <p className="text-sm text-gray-500 line-clamp-3 mb-3">{truncate(actu.extrait, 120)}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar className="h-3 w-3" />
                      {formatDate(actu.publie_le)}
                    </div>
                    <span className="text-primary-500 text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Lire <ArrowRight className="h-3 w-3" />
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
