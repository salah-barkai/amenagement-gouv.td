import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { FileText, Download, Search, Calendar } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Document } from '@/types'
import { formatDate } from '@/lib/utils'
import { Spinner } from '@/components/ui/Spinner'
import { Badge } from '@/components/ui/Badge'

const categories = ["Texte officiel", "Rapport", "Publication", "Communiqué", "Appel d'offres"]

const categoryColors: Record<string, 'primary' | 'success' | 'warning' | 'danger' | 'gray'> = {
  'Texte officiel': 'primary',
  'Rapport': 'success',
  'Publication': 'warning',
  "Communiqué": 'gray',
  "Appel d'offres": 'danger',
}

export default function Documents() {
  const [categorie, setCategorie] = useState('')
  const [search, setSearch] = useState('')

  const { data: documents, isLoading } = useQuery({
    queryKey: ['documents', categorie, search],
    queryFn: async () => {
      let query = supabase
        .from('documents')
        .select('*')
        .eq('publie', true)
        .order('publie_le', { ascending: false })

      if (categorie) query = query.eq('categorie', categorie)
      if (search) query = query.ilike('titre', `%${search}%`)

      const { data } = await query
      return data as Document[]
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
          <h1 className="text-4xl font-bold text-white mt-3">Documents</h1>
          <p className="text-white/70 mt-2">Textes officiels, rapports, publications et appels d'offres</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Filtres */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un document..."
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
            {categories.map(cat => (
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
        ) : !documents?.length ? (
          <div className="text-center py-16 text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p className="text-lg font-medium">Aucun document disponible</p>
          </div>
        ) : (
          <div className="space-y-3">
            {documents.map(doc => (
              <div key={doc.id} className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-primary-300 hover:shadow-sm transition-all">
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="h-6 w-6 text-primary-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={categoryColors[doc.categorie] || 'gray'}>{doc.categorie}</Badge>
                  </div>
                  <h3 className="font-semibold text-gray-900 truncate">{doc.titre}</h3>
                  {doc.description && (
                    <p className="text-sm text-gray-500 truncate">{doc.description}</p>
                  )}
                  <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                    <Calendar className="h-3 w-3" />
                    {formatDate(doc.publie_le)}
                  </div>
                </div>
                {doc.fichier_url && (
                  <a
                    href={doc.fichier_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white text-sm rounded-lg hover:bg-primary-600 transition-colors flex-shrink-0"
                  >
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">Télécharger</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
