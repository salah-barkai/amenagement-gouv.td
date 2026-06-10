import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Calendar, ArrowLeft, Tag } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Actualite } from '@/types'
import { formatDate } from '@/lib/utils'
import { Spinner } from '@/components/ui/Spinner'
import { Badge } from '@/components/ui/Badge'

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>()

  const { data: actu, isLoading } = useQuery({
    queryKey: ['actualite', id],
    queryFn: async () => {
      const { data } = await supabase.from('actualites').select('*').eq('id', id!).single()
      return data as Actualite
    },
    enabled: !!id,
  })

  const { data: related } = useQuery({
    queryKey: ['actualites-related', actu?.categorie],
    queryFn: async () => {
      const { data } = await supabase
        .from('actualites')
        .select('*')
        .eq('publie', true)
        .eq('categorie', actu!.categorie)
        .neq('id', id!)
        .limit(3)
      return data as Actualite[]
    },
    enabled: !!actu,
  })

  if (isLoading) return <Spinner className="min-h-screen" />

  if (!actu) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-lg font-medium text-gray-700">Actualité introuvable</p>
        <Link to="/actualites" className="text-primary-500 mt-2 inline-block">← Retour aux actualités</Link>
      </div>
    </div>
  )

  return (
    <div>
      {/* Hero */}
      <div className="bg-hero-pattern py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Link to="/actualites" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Toutes les actualités
          </Link>
          <Badge variant="primary" className="mb-3">
            <Tag className="h-3 w-3 mr-1" />{actu.categorie}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-2 leading-tight">{actu.titre}</h1>
          <div className="flex items-center gap-2 mt-4 text-white/60 text-sm">
            <Calendar className="h-4 w-4" />
            {formatDate(actu.publie_le, 'EEEE dd MMMM yyyy')}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Article */}
          <article className="lg:col-span-2">
            {actu.image_url && (
              <img src={actu.image_url} alt={actu.titre} className="w-full h-64 object-cover rounded-xl mb-8" />
            )}
            {actu.extrait && (
              <p className="text-lg text-gray-600 font-medium border-l-4 border-primary-500 pl-4 mb-8 italic">
                {actu.extrait}
              </p>
            )}
            <div
              className="prose prose-lg prose-gray max-w-none"
              dangerouslySetInnerHTML={{ __html: actu.contenu }}
            />
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-5 border">
              <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Informations</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary-400" />
                  {formatDate(actu.publie_le)}
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-primary-400" />
                  {actu.categorie}
                </div>
              </div>
            </div>

            {related && related.length > 0 && (
              <div>
                <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Articles similaires</h4>
                <div className="space-y-3">
                  {related.map(r => (
                    <Link
                      key={r.id}
                      to={`/actualites/${r.id}`}
                      className="block p-3 bg-white border rounded-lg hover:border-primary-300 transition-colors"
                    >
                      <p className="font-medium text-sm text-gray-900 line-clamp-2">{r.titre}</p>
                      <p className="text-xs text-gray-400 mt-1">{formatDate(r.publie_le)}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}
