import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Edit2, Trash2, Eye, EyeOff, FolderOpen } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { Projet } from '@/types'
import { cn, STATUTS_PROJET } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Input, Textarea, Select } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { Spinner } from '@/components/ui/Spinner'
import { ImageUpload } from '@/components/ui/ImageUpload'
import { RichEditor } from '@/components/ui/RichEditor'
import toast from 'react-hot-toast'

const schema = z.object({
  titre:        z.string().min(3, 'Titre requis'),
  description:  z.string().min(10, 'Description requise'),
  contenu:      z.string().optional(),
  statut:       z.enum(['En cours', 'Terminé', 'Planifié', 'Suspendu']),
  localisation: z.string().optional(),
  budget:       z.coerce.number().optional(),
  date_debut:   z.string().optional(),
  date_fin:     z.string().optional(),
  publie:       z.boolean(),
  image_url:    z.string().optional(),
})

type FormData = z.infer<typeof schema>

export default function ProjectsManager() {
  const qc = useQueryClient()
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Projet | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const { data: projets, isLoading } = useQuery({
    queryKey: ['admin-projets'],
    queryFn: async () => {
      const { data } = await supabase.from('projets').select('*').order('created_at', { ascending: false })
      return data as Projet[]
    },
  })

  const { register, handleSubmit, reset, control, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { statut: 'En cours', publie: false },
  })

  function openCreate() {
    setEditing(null)
    reset({ statut: 'En cours', publie: false, titre: '', description: '', image_url: '' })
    setModalOpen(true)
  }

  function openEdit(p: Projet) {
    setEditing(p)
    reset({
      titre: p.titre, description: p.description, contenu: p.contenu || '',
      statut: p.statut, localisation: p.localisation || '',
      budget: p.budget ?? undefined, date_debut: p.date_debut || '',
      date_fin: p.date_fin || '', publie: p.publie, image_url: p.image_url || '',
    })
    setModalOpen(true)
  }

  const saveMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const payload = { ...data, budget: data.budget || null, date_debut: data.date_debut || null, date_fin: data.date_fin || null }
      if (editing) {
        const { error } = await supabase.from('projets').update(payload).eq('id', editing.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('projets').insert([payload])
        if (error) throw error
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-projets'] })
      toast.success(editing ? 'Projet mis à jour' : 'Projet créé')
      setModalOpen(false)
    },
    onError: () => toast.error('Erreur lors de la sauvegarde'),
  })

  const toggleMutation = useMutation({
    mutationFn: async ({ id, publie }: { id: string; publie: boolean }) => {
      const { error } = await supabase.from('projets').update({ publie }).eq('id', id)
      if (error) throw error
    },
    onSuccess: (_, { publie }) => {
      qc.invalidateQueries({ queryKey: ['admin-projets'] })
      toast.success(publie ? 'Projet publié' : 'Projet masqué')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('projets').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-projets'] }); setDeleteId(null); toast.success('Projet supprimé') },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projets</h1>
          <p className="text-gray-500 text-sm mt-0.5">{projets?.length ?? 0} projets au total</p>
        </div>
        <Button onClick={openCreate}><Plus className="h-4 w-4" /> Nouveau projet</Button>
      </div>

      {isLoading ? <Spinner /> : !projets?.length ? (
        <div className="text-center py-20 bg-white rounded-xl border">
          <FolderOpen className="h-12 w-12 mx-auto text-gray-200 mb-3" />
          <p className="text-gray-500 font-medium">Aucun projet</p>
          <Button onClick={openCreate} className="mt-4"><Plus className="h-4 w-4" /> Créer</Button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-500 w-10"></th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Projet</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 hidden sm:table-cell">Statut</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 hidden md:table-cell">Localisation</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Visible</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {projets.map(p => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    {p.image_url
                      ? <img src={p.image_url} alt="" className="w-8 h-8 rounded-lg object-cover" />
                      : <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600 text-xs font-bold">{p.titre[0]}</div>
                    }
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900 line-clamp-1">{p.titre}</p>
                    <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{p.description}</p>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', STATUTS_PROJET[p.statut])}>
                      {p.statut}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell text-xs">{p.localisation || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${p.publie ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {p.publie ? 'Publié' : 'Masqué'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => toggleMutation.mutate({ id: p.id, publie: !p.publie })} className="p-1.5 text-gray-400 hover:text-blue-500 rounded-lg hover:bg-blue-50 transition-colors">
                        {p.publie ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                      <button onClick={() => openEdit(p)} className="p-1.5 text-gray-400 hover:text-primary-500 rounded-lg hover:bg-primary-50 transition-colors">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button onClick={() => setDeleteId(p.id)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Modifier le projet' : 'Nouveau projet'} size="xl">
        <form onSubmit={handleSubmit(d => saveMutation.mutate(d))} className="space-y-5">
          <Controller
            name="image_url"
            control={control}
            render={({ field }) => (
              <ImageUpload label="Image du projet" value={field.value} onChange={field.onChange} />
            )}
          />

          <Input label="Titre *" placeholder="Nom du projet" {...register('titre')} error={errors.titre?.message} />
          <Textarea label="Description *" rows={3} placeholder="Résumé du projet…" {...register('description')} error={errors.description?.message} />

          <Controller
            name="contenu"
            control={control}
            render={({ field }) => (
              <RichEditor label="Contenu détaillé" value={field.value || ''} onChange={field.onChange} minHeight={200} />
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <Select label="Statut" {...register('statut')}
              options={['En cours', 'Terminé', 'Planifié', 'Suspendu'].map(s => ({ value: s, label: s }))} />
            <Input label="Localisation" placeholder="N'Djaména, Tchad" {...register('localisation')} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Input label="Budget (FCFA)" type="number" placeholder="0" {...register('budget')} />
            <Input label="Date début" type="date" {...register('date_debut')} />
            <Input label="Date fin prévue" type="date" {...register('date_fin')} />
          </div>

          <label className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-xl cursor-pointer hover:bg-green-100 transition-colors">
            <input type="checkbox" {...register('publie')} className="w-4 h-4 rounded text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-800">Publier ce projet</p>
              <p className="text-xs text-green-600">Il sera visible sur le site public</p>
            </div>
          </label>

          <div className="flex justify-end gap-3 pt-2 border-t">
            <Button variant="outline" type="button" onClick={() => setModalOpen(false)}>Annuler</Button>
            <Button type="submit" loading={isSubmitting || saveMutation.isPending}>
              {editing ? 'Mettre à jour' : 'Créer le projet'}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Supprimer le projet" size="sm">
        <p className="text-gray-600 mb-6">Cette action est irréversible. Confirmer la suppression ?</p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setDeleteId(null)}>Annuler</Button>
          <Button variant="danger" loading={deleteMutation.isPending} onClick={() => deleteId && deleteMutation.mutate(deleteId)}>Supprimer</Button>
        </div>
      </Modal>
    </div>
  )
}
