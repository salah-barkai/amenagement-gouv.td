import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { MapPin, Calendar, DollarSign, ArrowLeft, Clock } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Projet } from '@/types'
import { formatDate, formatCurrency, cn, STATUTS_PROJET } from '@/lib/utils'
import { Spinner } from '@/components/ui/Spinner'

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>()

  const { data: projet, isLoading } = useQuery({
    queryKey: ['projet', id],
    queryFn: async () => {
      const { data } = await supabase.from('projets').select('*').eq('id', id!).single()
      return data as Projet
    },
    enabled: !!id,
  })

  if (isLoading) return <Spinner className="min-h-screen" />
  if (!projet) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-lg font-medium text-gray-700">Projet introuvable</p>
        <Link to="/projets" className="text-primary-500 mt-2 inline-block">← Retour aux projets</Link>
      </div>
    </div>
  )

  return (
    <div>
      <div className="bg-hero-pattern py-12">
        <div className="max-w-5xl mx-auto px-4">
          <Link to="/projets" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-4">
            <ArrowLeft className="h-4 w-4" /> Tous les projets
          </Link>
          <span className={cn('inline-flex text-xs font-semibold px-2.5 py-1 rounded-full mb-3', STATUTS_PROJET[projet.statut])}>
            {projet.statut}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-2">{projet.titre}</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <article className="lg:col-span-2">
            {projet.image_url && (
              <img src={projet.image_url} alt={projet.titre} className="w-full h-72 object-cover rounded-xl mb-8" />
            )}
            <p className="text-lg text-gray-700 font-medium mb-6 leading-relaxed">{projet.description}</p>
            {projet.contenu && (
              <div
                className="prose prose-gray max-w-none"
                dangerouslySetInnerHTML={{ __html: projet.contenu }}
              />
            )}
          </article>

          <aside className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-5 border space-y-4">
              <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Détails du projet</h4>

              {projet.localisation && (
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-primary-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Localisation</p>
                    <p className="text-sm text-gray-700 font-medium">{projet.localisation}</p>
                  </div>
                </div>
              )}

              {projet.budget && (
                <div className="flex items-start gap-3">
                  <DollarSign className="h-4 w-4 text-primary-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Budget</p>
                    <p className="text-sm text-gray-700 font-medium">{formatCurrency(projet.budget)}</p>
                  </div>
                </div>
              )}

              {projet.date_debut && (
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 text-primary-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Date de début</p>
                    <p className="text-sm text-gray-700 font-medium">{formatDate(projet.date_debut)}</p>
                  </div>
                </div>
              )}

              {projet.date_fin && (
                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-primary-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Date de fin prévue</p>
                    <p className="text-sm text-gray-700 font-medium">{formatDate(projet.date_fin)}</p>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
