import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { MapPin, ArrowRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Projet } from '@/types'
import { cn, STATUTS_PROJET } from '@/lib/utils'
import { Spinner } from '@/components/ui/Spinner'

const FALLBACK_IMAGES = [
  '/images/activite-6.jpg',
  '/images/activite-4.jpg',
  '/images/activite-5.jpg',
]

export function ProjectsSection() {
  const { data: projets, isLoading } = useQuery({
    queryKey: ['projets-home'],
    queryFn: async () => {
      const { data } = await supabase
        .from('projets')
        .select('*')
        .eq('publie', true)
        .order('created_at', { ascending: false })
        .limit(3)
      return data as Projet[]
    },
  })

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest">Développement</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-1">Projets en cours</h2>
          </div>
          <Link
            to="/projets"
            className="hidden sm:flex items-center gap-1 text-primary-500 hover:text-primary-700 font-medium text-sm"
          >
            Tous les projets <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <Spinner />
        ) : !projets?.length ? (
          <p className="text-center text-gray-500 py-8">Aucun projet disponible.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projets.map((projet, i) => {
              const imgSrc = projet.image_url || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]
              return (
                <Link
                  key={projet.id}
                  to={`/projets/${projet.id}`}
                  className="group flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="h-52 relative overflow-hidden">
                    <img
                      src={imgSrc}
                      alt={projet.titre}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className={cn('absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full shadow-sm', STATUTS_PROJET[projet.statut])}>
                      {projet.statut}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors mb-2 line-clamp-2 text-base">
                      {projet.titre}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-3 flex-1">{projet.description}</p>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      {projet.localisation && (
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <MapPin className="h-3 w-3" />{projet.localisation}
                        </div>
                      )}
                      <span className="text-primary-500 text-xs font-semibold flex items-center gap-1 ml-auto group-hover:gap-2 transition-all">
                        Détails <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
