import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Trash2, Image, Eye, EyeOff } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { GalerieItem } from '@/types'
import { Button } from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { Spinner } from '@/components/ui/Spinner'
import { ImageUpload } from '@/components/ui/ImageUpload'
import toast from 'react-hot-toast'

const schema = z.object({
  titre:       z.string().min(2, 'Titre requis'),
  image_url:   z.string().min(1, 'Image requise'),
  description: z.string().optional(),
  ordre:       z.coerce.number().default(0),
  publie:      z.boolean().default(true),
})

type FormData = z.infer<typeof schema>

export default function GalleryManager() {
  const qc = useQueryClient()
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const { data: items, isLoading } = useQuery({
    queryKey: ['admin-galerie'],
    queryFn: async () => {
      const { data } = await supabase.from('galerie').select('*').order('ordre')
      return data as GalerieItem[]
    },
  })

  const { register, handleSubmit, reset, control, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { publie: true, ordre: 0, titre: '', image_url: '' },
  })

  const saveMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const { error } = await supabase.from('galerie').insert([data])
      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-galerie'] })
      toast.success('Image ajoutée à la galerie')
      setModalOpen(false)
      reset({ publie: true, ordre: 0, titre: '', image_url: '' })
    },
    onError: () => toast.error('Erreur lors de l\'ajout'),
  })

  const toggleMutation = useMutation({
    mutationFn: async ({ id, publie }: { id: string; publie: boolean }) => {
      const { error } = await supabase.from('galerie').update({ publie }).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-galerie'] }),
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('galerie').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-galerie'] }); setDeleteId(null); toast.success('Image supprimée') },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Galerie</h1>
          <p className="text-gray-500 text-sm mt-0.5">{items?.length ?? 0} images</p>
        </div>
        <Button onClick={() => { reset({ publie: true, ordre: 0, titre: '', image_url: '' }); setModalOpen(true) }}>
          <Plus className="h-4 w-4" /> Ajouter une image
        </Button>
      </div>

      {isLoading ? <Spinner /> : !items?.length ? (
        <div className="text-center py-20 bg-white rounded-xl border">
          <Image className="h-12 w-12 mx-auto text-gray-200 mb-3" />
          <p className="text-gray-500 font-medium">La galerie est vide</p>
          <p className="text-sm text-gray-400 mt-1">Ajoutez des photos d'activités du Ministère</p>
          <Button className="mt-4" onClick={() => setModalOpen(true)}><Plus className="h-4 w-4" /> Ajouter</Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(item => (
            <div key={item.id} className="group relative bg-gray-100 rounded-xl overflow-hidden aspect-square shadow-sm">
              <img src={item.image_url} alt={item.titre} className="w-full h-full object-cover" />

              {/* Overlay au hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 gap-2">
                <p className="text-white text-xs font-semibold text-center">{item.titre}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleMutation.mutate({ id: item.id, publie: !item.publie })}
                    className="p-1.5 bg-white/20 text-white rounded-lg hover:bg-white/30"
                    title={item.publie ? 'Masquer' : 'Afficher'}
                  >
                    {item.publie ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                  <button
                    onClick={() => setDeleteId(item.id)}
                    className="p-1.5 bg-red-500/80 text-white rounded-lg hover:bg-red-600"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Badge masqué */}
              {!item.publie && (
                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
                  Masqué
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal ajout */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Ajouter une image" size="md">
        <form onSubmit={handleSubmit(d => saveMutation.mutate(d))} className="space-y-4">
          {/* Upload en premier, bien mis en avant */}
          <Controller
            name="image_url"
            control={control}
            render={({ field }) => (
              <ImageUpload
                label="Photo *"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.image_url && <p className="text-xs text-red-600">{errors.image_url.message}</p>}

          <Input label="Titre de la photo *" placeholder="Ex: Réunion technique du 10 juin" {...register('titre')} error={errors.titre?.message} />
          <Textarea label="Description (optionnel)" rows={2} placeholder="Contexte, date, lieu…" {...register('description')} />

          <div className="grid grid-cols-2 gap-4">
            <Input label="Ordre d'affichage" type="number" {...register('ordre')} />
            <label className="flex flex-col justify-end pb-2">
              <div className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...register('publie')} defaultChecked className="w-4 h-4 rounded" />
                <span className="text-sm text-gray-700 font-medium">Visible sur le site</span>
              </div>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t">
            <Button variant="outline" type="button" onClick={() => setModalOpen(false)}>Annuler</Button>
            <Button type="submit" loading={isSubmitting || saveMutation.isPending}>Ajouter à la galerie</Button>
          </div>
        </form>
      </Modal>

      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Supprimer l'image" size="sm">
        <p className="text-gray-600 mb-6">Supprimer définitivement cette image de la galerie ?</p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setDeleteId(null)}>Annuler</Button>
          <Button variant="danger" loading={deleteMutation.isPending} onClick={() => deleteId && deleteMutation.mutate(deleteId)}>Supprimer</Button>
        </div>
      </Modal>
    </div>
  )
}
