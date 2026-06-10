import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Calendar, ArrowRight, Tag } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Actualite } from '@/types'
import { formatDate, truncate } from '@/lib/utils'
import { Spinner } from '@/components/ui/Spinner'
import { Badge } from '@/components/ui/Badge'

// Images de fallback par ordre de rotation
const FALLBACK_IMAGES = [
  '/images/activite-1.jpg',
  '/images/reunion.jpg',
  '/images/activite-3.jpg',
  '/images/descende.jpg',
]

export function NewsSection() {
  const { data: actualites, isLoading } = useQuery({
    queryKey: ['actualites-home'],
    queryFn: async () => {
      const { data } = await supabase
        .from('actualites')
        .select('*')
        .eq('publie', true)
        .order('publie_le', { ascending: false })
        .limit(4)
      return data as Actualite[]
    },
  })

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* En-tête section */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest">Informations</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-1">Actualités récentes</h2>
          </div>
          <Link
            to="/actualites"
            className="hidden sm:flex items-center gap-1 text-primary-500 hover:text-primary-700 font-medium text-sm"
          >
            Toutes les actualités <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <Spinner />
        ) : !actualites?.length ? (
          <p className="text-center text-gray-500 py-8">Aucune actualité disponible.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {actualites.map((actu, i) => {
              const imgSrc = actu.image_url || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]
              const isFeature = i === 0
              return (
                <Link
                  key={actu.id}
                  to={`/actualites/${actu.id}`}
                  className={`group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${isFeature ? 'md:col-span-2 md:row-span-1' : ''}`}
                >
                  {/* Image */}
                  <div className={`relative overflow-hidden ${isFeature ? 'h-56' : 'h-44'}`}>
                    <img
                      src={imgSrc}
                      alt={actu.titre}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <Badge variant="primary" className="bg-primary-600/90 backdrop-blur-sm border-0 text-white text-xs">
                        <Tag className="h-2.5 w-2.5 mr-1" />{actu.categorie}
                      </Badge>
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="p-5">
                    <h3 className={`font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 ${isFeature ? 'text-lg' : 'text-sm'}`}>
                      {actu.titre}
                    </h3>
                    {actu.extrait && (
                      <p className="text-sm text-gray-500 mt-2 line-clamp-2">{truncate(actu.extrait, 100)}</p>
                    )}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Calendar className="h-3 w-3" />
                        {formatDate(actu.publie_le)}
                      </div>
                      <span className="text-primary-500 text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                        Lire <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        <div className="mt-6 text-center sm:hidden">
          <Link to="/actualites" className="text-primary-500 font-medium text-sm">
            Voir toutes les actualités →
          </Link>
        </div>
      </div>
    </section>
  )
}
