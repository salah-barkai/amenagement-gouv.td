import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Mail, MailOpen, Trash2, Eye } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Contact } from '@/types'
import { formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Spinner } from '@/components/ui/Spinner'
import toast from 'react-hot-toast'

export default function MessagesManager() {
  const qc = useQueryClient()
  const [selected, setSelected] = useState<Contact | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const { data: messages, isLoading } = useQuery({
    queryKey: ['admin-contacts'],
    queryFn: async () => {
      const { data } = await supabase.from('contacts').select('*').order('created_at', { ascending: false })
      return data as Contact[]
    },
  })

  const markReadMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('contacts').update({ lu: true }).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-contacts'] }),
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('contacts').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-contacts'] })
      setDeleteId(null)
      toast.success('Message supprimé')
    },
  })

  function openMessage(msg: Contact) {
    setSelected(msg)
    if (!msg.lu) markReadMutation.mutate(msg.id)
  }

  const nonLus = messages?.filter(m => !m.lu).length ?? 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-500 text-sm">
          {messages?.length ?? 0} messages au total
          {nonLus > 0 && <span className="ml-2 text-orange-600 font-medium">· {nonLus} non lus</span>}
        </p>
      </div>

      {isLoading ? <Spinner /> : (
        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-500 w-8"></th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Expéditeur</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 hidden sm:table-cell">Sujet</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 hidden md:table-cell">Date</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {messages?.length ? messages.map(msg => (
                <tr key={msg.id} className={`hover:bg-gray-50 ${!msg.lu ? 'bg-orange-50/40' : ''}`}>
                  <td className="px-4 py-3">
                    {msg.lu
                      ? <MailOpen className="h-4 w-4 text-gray-300" />
                      : <Mail className="h-4 w-4 text-orange-500" />
                    }
                  </td>
                  <td className="px-4 py-3">
                    <p className={`font-medium ${!msg.lu ? 'text-gray-900' : 'text-gray-600'}`}>{msg.nom}</p>
                    <p className="text-xs text-gray-400">{msg.email}</p>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <p className={`line-clamp-1 ${!msg.lu ? 'font-medium text-gray-900' : 'text-gray-500'}`}>{msg.sujet}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell text-xs">
                    {formatDate(msg.created_at)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openMessage(msg)} className="p-1.5 text-gray-400 hover:text-primary-500">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button onClick={() => setDeleteId(msg.id)} className="p-1.5 text-gray-400 hover:text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">Aucun message reçu</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal détail message */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title="Détail du message" size="md">
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wide">Nom</p>
                <p className="font-medium text-gray-900">{selected.nom}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wide">Email</p>
                <a href={`mailto:${selected.email}`} className="text-primary-500 hover:underline">{selected.email}</a>
              </div>
              {selected.telephone && (
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wide">Téléphone</p>
                  <p className="text-gray-900">{selected.telephone}</p>
                </div>
              )}
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wide">Date</p>
                <p className="text-gray-900">{formatDate(selected.created_at)}</p>
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Sujet</p>
              <p className="font-semibold text-gray-900">{selected.sujet}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Message</p>
              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap">
                {selected.message}
              </div>
            </div>
            <div className="flex justify-between">
              <a href={`mailto:${selected.email}?subject=RE: ${selected.sujet}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white text-sm rounded-lg hover:bg-primary-600">
                <Mail className="h-4 w-4" /> Répondre par email
              </a>
              <Button variant="outline" onClick={() => setSelected(null)}>Fermer</Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Supprimer le message" size="sm">
        <p className="text-gray-600 mb-6">Supprimer définitivement ce message ?</p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setDeleteId(null)}>Annuler</Button>
          <Button variant="danger" loading={deleteMutation.isPending} onClick={() => deleteId && deleteMutation.mutate(deleteId)}>Supprimer</Button>
        </div>
      </Modal>
    </div>
  )
}
