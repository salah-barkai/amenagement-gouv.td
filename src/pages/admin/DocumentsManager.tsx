import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Edit2, Trash2, Eye, EyeOff, FileText } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { Document } from '@/types'
import { formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Input, Textarea, Select } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Spinner } from '@/components/ui/Spinner'
import toast from 'react-hot-toast'

const CATS = ["Texte officiel", "Rapport", "Publication", "Communiqué", "Appel d'offres"]

const schema = z.object({
  titre:       z.string().min(3),
  description: z.string().optional(),
  fichier_url: z.string().optional(),
  categorie:   z.string(),
  publie:      z.boolean(),
  publie_le:   z.string(),
})

type FormData = z.infer<typeof schema>

export default function DocumentsManager() {
  const qc = useQueryClient()
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Document | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const { data: documents, isLoading } = useQuery({
    queryKey: ['admin-documents'],
    queryFn: async () => {
      const { data } = await supabase.from('documents').select('*').order('created_at', { ascending: false })
      return data as Document[]
    },
  })

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { categorie: 'Publication', publie: false, publie_le: new Date().toISOString().split('T')[0] },
  })

  function openCreate() {
    setEditing(null)
    reset({ categorie: 'Publication', publie: false, publie_le: new Date().toISOString().split('T')[0], titre: '' })
    setModalOpen(true)
  }

  function openEdit(doc: Document) {
    setEditing(doc)
    reset({
      titre: doc.titre, description: doc.description || '',
      fichier_url: doc.fichier_url || '', categorie: doc.categorie,
      publie: doc.publie, publie_le: doc.publie_le.split('T')[0],
    })
    setModalOpen(true)
  }

  const saveMutation = useMutation({
    mutationFn: async (data: FormData) => {
      if (editing) {
        const { error } = await supabase.from('documents').update(data).eq('id', editing.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('documents').insert([data])
        if (error) throw error
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-documents'] })
      toast.success(editing ? 'Document mis à jour' : 'Document créé')
      setModalOpen(false)
    },
    onError: () => toast.error('Erreur lors de la sauvegarde'),
  })

  const toggleMutation = useMutation({
    mutationFn: async ({ id, publie }: { id: string; publie: boolean }) => {
      const { error } = await supabase.from('documents').update({ publie }).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-documents'] }),
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('documents').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-documents'] }); setDeleteId(null); toast.success('Document supprimé') },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-500 text-sm">{documents?.length ?? 0} documents</p>
        </div>
        <Button onClick={openCreate}><Plus className="h-4 w-4" /> Nouveau document</Button>
      </div>

      {isLoading ? <Spinner /> : (
        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Document</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 hidden sm:table-cell">Catégorie</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 hidden md:table-cell">Date</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Statut</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {documents?.length ? documents.map(doc => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary-400 flex-shrink-0" />
                      <p className="font-medium text-gray-900 line-clamp-1">{doc.titre}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <Badge variant="gray">{doc.categorie}</Badge>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">
                    {formatDate(doc.publie_le, 'dd/MM/yyyy')}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={doc.publie ? 'success' : 'gray'}>{doc.publie ? 'Publié' : 'Brouillon'}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => toggleMutation.mutate({ id: doc.id, publie: !doc.publie })} className="p-1.5 text-gray-400 hover:text-blue-500">
                        {doc.publie ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                      <button onClick={() => openEdit(doc)} className="p-1.5 text-gray-400 hover:text-primary-500">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button onClick={() => setDeleteId(doc.id)} className="p-1.5 text-gray-400 hover:text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">Aucun document</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Modifier le document' : 'Nouveau document'} size="lg">
        <form onSubmit={handleSubmit(d => saveMutation.mutate(d))} className="space-y-4">
          <Input label="Titre *" {...register('titre')} error={errors.titre?.message} />
          <Textarea label="Description" rows={2} {...register('description')} />
          <Input label="URL du fichier (PDF, etc.)" placeholder="https://..." {...register('fichier_url')} />
          <div className="grid grid-cols-2 gap-4">
            <Select label="Catégorie" {...register('categorie')}
              options={CATS.map(c => ({ value: c, label: c }))} />
            <Input label="Date de publication" type="date" {...register('publie_le')} />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" {...register('publie')} className="rounded" />
            <span className="text-sm text-gray-700">Publier ce document</span>
          </label>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" type="button" onClick={() => setModalOpen(false)}>Annuler</Button>
            <Button type="submit" loading={isSubmitting || saveMutation.isPending}>
              {editing ? 'Mettre à jour' : 'Créer'}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Supprimer le document" size="sm">
        <p className="text-gray-600 mb-6">Confirmer la suppression de ce document ?</p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setDeleteId(null)}>Annuler</Button>
          <Button variant="danger" loading={deleteMutation.isPending} onClick={() => deleteId && deleteMutation.mutate(deleteId)}>Supprimer</Button>
        </div>
      </Modal>
    </div>
  )
}
