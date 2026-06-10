import { useQuery } from '@tanstack/react-query'
import { Newspaper, FolderOpen, FileText, MessageSquare, TrendingUp, Eye, CheckCircle, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { formatDate } from '@/lib/utils'

async function fetchStats() {
  const [actualites, projets, documents, messages] = await Promise.all([
    supabase.from('actualites').select('id, publie', { count: 'exact' }),
    supabase.from('projets').select('id, publie, statut', { count: 'exact' }),
    supabase.from('documents').select('id', { count: 'exact' }),
    supabase.from('contacts').select('id, lu', { count: 'exact' }),
  ])
  return {
    totalActualites: actualites.count ?? 0,
    publishedActualites: actualites.data?.filter(a => a.publie).length ?? 0,
    totalProjets: projets.count ?? 0,
    projetsEnCours: projets.data?.filter(p => p.statut === 'En cours').length ?? 0,
    totalDocuments: documents.count ?? 0,
    totalMessages: messages.count ?? 0,
    messagesNonLus: messages.data?.filter(m => !m.lu).length ?? 0,
  }
}

export default function Dashboard() {
  const { data: stats } = useQuery({ queryKey: ['dashboard-stats'], queryFn: fetchStats })
  const { data: recentActus } = useQuery({
    queryKey: ['recent-actus'],
    queryFn: async () => {
      const { data } = await supabase
        .from('actualites')
        .select('id, titre, publie, publie_le, categorie')
        .order('created_at', { ascending: false })
        .limit(5)
      return data
    },
  })
  const { data: recentMessages } = useQuery({
    queryKey: ['recent-messages'],
    queryFn: async () => {
      const { data } = await supabase
        .from('contacts')
        .select('id, nom, sujet, lu, created_at')
        .order('created_at', { ascending: false })
        .limit(5)
      return data
    },
  })

  const cards = [
    { label: 'Actualités', value: stats?.totalActualites, sub: `${stats?.publishedActualites} publiées`, icon: Newspaper, color: 'bg-blue-500', href: '/admin/actualites' },
    { label: 'Projets', value: stats?.totalProjets, sub: `${stats?.projetsEnCours} en cours`, icon: FolderOpen, color: 'bg-green-500', href: '/admin/projets' },
    { label: 'Documents', value: stats?.totalDocuments, sub: 'publiés', icon: FileText, color: 'bg-purple-500', href: '/admin/documents' },
    { label: 'Messages', value: stats?.totalMessages, sub: `${stats?.messagesNonLus} non lus`, icon: MessageSquare, color: 'bg-orange-500', href: '/admin/messages' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-500 text-sm mt-1">Vue d'ensemble du site du Ministère</p>
      </div>

      {/* Cartes stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map(card => (
          <Link key={card.label} to={card.href} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between mb-4">
              <div className={`${card.color} rounded-lg p-3`}>
                <card.icon className="h-5 w-5 text-white" />
              </div>
              <TrendingUp className="h-4 w-4 text-gray-300 group-hover:text-green-400 transition-colors" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{card.value ?? '—'}</p>
            <p className="text-sm text-gray-500 mt-1">{card.label}</p>
            <p className="text-xs text-gray-400">{card.sub}</p>
          </Link>
        ))}
      </div>

      {/* Activité récente */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dernières actualités */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b">
            <h2 className="font-semibold text-gray-900">Dernières actualités</h2>
            <Link to="/admin/actualites" className="text-xs text-primary-500 hover:underline">Voir tout</Link>
          </div>
          <div className="divide-y">
            {recentActus?.length ? recentActus.map(actu => (
              <div key={actu.id} className="flex items-center gap-3 px-5 py-3">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${actu.publie ? 'bg-green-400' : 'bg-gray-300'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{actu.titre}</p>
                  <p className="text-xs text-gray-400">{formatDate(actu.publie_le)}</p>
                </div>
                {actu.publie
                  ? <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                  : <Clock className="h-4 w-4 text-gray-300 flex-shrink-0" />
                }
              </div>
            )) : (
              <p className="px-5 py-6 text-sm text-gray-400 text-center">Aucune actualité</p>
            )}
          </div>
        </div>

        {/* Derniers messages */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b">
            <h2 className="font-semibold text-gray-900">
              Derniers messages
              {stats?.messagesNonLus ? (
                <span className="ml-2 text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">{stats.messagesNonLus} non lus</span>
              ) : null}
            </h2>
            <Link to="/admin/messages" className="text-xs text-primary-500 hover:underline">Voir tout</Link>
          </div>
          <div className="divide-y">
            {recentMessages?.length ? recentMessages.map(msg => (
              <div key={msg.id} className={`flex items-center gap-3 px-5 py-3 ${!msg.lu ? 'bg-orange-50' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${!msg.lu ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500'}`}>
                  {msg.nom[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{msg.nom}</p>
                  <p className="text-xs text-gray-500 truncate">{msg.sujet}</p>
                </div>
                <span className="text-xs text-gray-400">{formatDate(msg.created_at, 'dd/MM')}</span>
              </div>
            )) : (
              <p className="px-5 py-6 text-sm text-gray-400 text-center">Aucun message</p>
            )}
          </div>
        </div>
      </div>

      {/* Liens rapides */}
      <div className="bg-primary-50 border border-primary-100 rounded-xl p-6">
        <h2 className="font-semibold text-primary-900 mb-4">Actions rapides</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: '+ Nouvelle actualité', href: '/admin/actualites' },
            { label: '+ Nouveau projet', href: '/admin/projets' },
            { label: '+ Nouveau document', href: '/admin/documents' },
            { label: '+ Ajouter une image', href: '/admin/galerie' },
          ].map(a => (
            <Link
              key={a.href}
              to={a.href}
              className="px-4 py-2 bg-white border border-primary-200 text-primary-700 text-sm font-medium rounded-lg hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-colors"
            >
              {a.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
