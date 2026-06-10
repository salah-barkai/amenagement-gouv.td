import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Edit2, Trash2, Eye, EyeOff, Newspaper } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { Actualite } from '@/types'
import { formatDate, CATEGORIES_ACTUALITE } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Input, Textarea, Select } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Spinner } from '@/components/ui/Spinner'
import { ImageUpload } from '@/components/ui/ImageUpload'
import { RichEditor } from '@/components/ui/RichEditor'
import toast from 'react-hot-toast'

const schema = z.object({
  titre:     z.string().min(3, 'Titre requis'),
  extrait:   z.string().optional(),
  contenu:   z.string().min(10, 'Contenu requis'),
  categorie: z.string(),
  publie:    z.boolean(),
  publie_le: z.string(),
  image_url: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export default function NewsManager() {
  const qc = useQueryClient()
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Actualite | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const { data: actualites, isLoading } = useQuery({
    queryKey: ['admin-actualites'],
    queryFn: async () => {
      const { data } = await supabase.from('actualites').select('*').order('created_at', { ascending: false })
      return data as Actualite[]
    },
  })

  const { register, handleSubmit, reset, control, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { categorie: 'Actualité', publie: false, publie_le: new Date().toISOString().split('T')[0] },
  })

  function openCreate() {
    setEditing(null)
    reset({ categorie: 'Actualité', publie: false, publie_le: new Date().toISOString().split('T')[0], titre: '', contenu: '', extrait: '', image_url: '' })
    setModalOpen(true)
  }

  function openEdit(actu: Actualite) {
    setEditing(actu)
    reset({
      titre: actu.titre,
      extrait: actu.extrait || '',
      contenu: actu.contenu,
      categorie: actu.categorie,
      publie: actu.publie,
      publie_le: actu.publie_le.split('T')[0],
      image_url: actu.image_url || '',
    })
    setModalOpen(true)
  }

  const saveMutation = useMutation({
    mutationFn: async (data: FormData) => {
      if (editing) {
        const { error } = await supabase.from('actualites').update(data).eq('id', editing.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('actualites').insert([data])
        if (error) throw error
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-actualites'] })
      qc.invalidateQueries({ queryKey: ['actualites-home'] })
      toast.success(editing ? 'Actualité mise à jour' : 'Actualité créée avec succès')
      setModalOpen(false)
    },
    onError: () => toast.error('Une erreur est survenue'),
  })

  const toggleMutation = useMutation({
    mutationFn: async ({ id, publie }: { id: string; publie: boolean }) => {
      const { error } = await supabase.from('actualites').update({ publie }).eq('id', id)
      if (error) throw error
    },
    onSuccess: (_, { publie }) => {
      qc.invalidateQueries({ queryKey: ['admin-actualites'] })
      toast.success(publie ? 'Actualité publiée' : 'Actualité dépubliée')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('actualites').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-actualites'] })
      toast.success('Actualité supprimée')
      setDeleteId(null)
    },
  })

  const published = actualites?.filter(a => a.publie).length ?? 0
  const drafts = (actualites?.length ?? 0) - published

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Actualités</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {actualites?.length ?? 0} articles —
            <span className="text-green-600 font-medium"> {published} publiés</span>
            {drafts > 0 && <span className="text-gray-400"> · {drafts} brouillons</span>}
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" /> Nouvelle actualité
        </Button>
      </div>

      {isLoading ? <Spinner /> : !actualites?.length ? (
        <div className="text-center py-20 bg-white rounded-xl border">
          <Newspaper className="h-12 w-12 mx-auto text-gray-200 mb-3" />
          <p className="text-gray-500 font-medium">Aucune actualité</p>
          <p className="text-sm text-gray-400 mt-1">Créez votre première actualité</p>
          <Button onClick={openCreate} className="mt-4"><Plus className="h-4 w-4" /> Créer</Button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-500 w-10"></th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Titre</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 hidden sm:table-cell">Catégorie</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 hidden md:table-cell">Date</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Statut</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {actualites.map(actu => (
                <tr key={actu.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    {actu.image_url
                      ? <img src={actu.image_url} alt="" className="w-8 h-8 rounded-lg object-cover" />
                      : <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center text-primary-500 text-xs font-bold">{actu.titre[0]}</div>
                    }
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900 line-clamp-1">{actu.titre}</p>
                    {actu.extrait && <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{actu.extrait}</p>}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <Badge variant="primary">{actu.categorie}</Badge>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell text-xs">
                    {formatDate(actu.publie_le, 'dd/MM/yyyy')}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={actu.publie ? 'success' : 'gray'}>
                      {actu.publie ? 'Publié' : 'Brouillon'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => toggleMutation.mutate({ id: actu.id, publie: !actu.publie })}
                        title={actu.publie ? 'Dépublier' : 'Publier'}
                        className="p-1.5 text-gray-400 hover:text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        {actu.publie ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                      <button onClick={() => openEdit(actu)} className="p-1.5 text-gray-400 hover:text-primary-500 rounded-lg hover:bg-primary-50 transition-colors">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button onClick={() => setDeleteId(actu.id)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors">
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

      {/* Modal créer/éditer */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Modifier l\'actualité' : 'Nouvelle actualité'} size="xl">
        <form onSubmit={handleSubmit(d => saveMutation.mutate(d))} className="space-y-5">
          {/* Image en haut, bien visible */}
          <Controller
            name="image_url"
            control={control}
            render={({ field }) => (
              <ImageUpload
                label="Image de couverture"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Input label="Titre *" placeholder="Titre de l'actualité" {...register('titre')} error={errors.titre?.message} />
          <Textarea label="Extrait (résumé affiché dans les listes)" rows={2} placeholder="Résumé court de l'article…" {...register('extrait')} />

          {/* Éditeur riche pour le contenu */}
          <Controller
            name="contenu"
            control={control}
            render={({ field }) => (
              <RichEditor
                label="Contenu *"
                value={field.value}
                onChange={field.onChange}
                error={errors.contenu?.message}
                minHeight={250}
              />
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Catégorie"
              {...register('categorie')}
              options={CATEGORIES_ACTUALITE.map(c => ({ value: c, label: c }))}
            />
            <Input label="Date de publication" type="date" {...register('publie_le')} />
          </div>

          <label className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-xl cursor-pointer hover:bg-green-100 transition-colors">
            <input type="checkbox" {...register('publie')} className="w-4 h-4 rounded text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-800">Publier immédiatement</p>
              <p className="text-xs text-green-600">L'article sera visible sur le site dès l'enregistrement</p>
            </div>
          </label>

          <div className="flex justify-end gap-3 pt-2 border-t">
            <Button variant="outline" type="button" onClick={() => setModalOpen(false)}>Annuler</Button>
            <Button type="submit" loading={isSubmitting || saveMutation.isPending}>
              {editing ? 'Mettre à jour' : 'Créer l\'actualité'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Confirmation suppression */}
      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Supprimer l'actualité" size="sm">
        <p className="text-gray-600 mb-6">Cette action est irréversible. L'actualité sera définitivement supprimée.</p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setDeleteId(null)}>Annuler</Button>
          <Button variant="danger" loading={deleteMutation.isPending} onClick={() => deleteId && deleteMutation.mutate(deleteId)}>
            Supprimer définitivement
          </Button>
        </div>
      </Modal>
    </div>
  )
}
