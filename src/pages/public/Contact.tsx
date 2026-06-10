import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import toast from 'react-hot-toast'

const schema = z.object({
  nom:       z.string().min(2, 'Le nom est requis'),
  email:     z.string().email('Email invalide'),
  telephone: z.string().optional(),
  sujet:     z.string().min(3, 'Le sujet est requis'),
  message:   z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
})

type FormData = z.infer<typeof schema>

const infos = [
  { icon: MapPin, label: 'Adresse', value: 'Avenue Charles de Gaulle, N\'Djaména, République du Tchad' },
  { icon: Phone,  label: 'Téléphone', value: '+235 66 53 57 19' },
  { icon: Mail,   label: 'Email', value: 'contact@amenagement.gouv.td' },
  { icon: Clock,  label: 'Horaires', value: 'Lundi - Vendredi : 7h30 - 15h30' },
]

export default function Contact() {
  const [sent, setSent] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    const { error } = await supabase.from('contacts').insert([data])
    if (error) {
      toast.error('Une erreur est survenue. Veuillez réessayer.')
    } else {
      setSent(true)
      reset()
    }
  }

  return (
    <div>
      <div className="bg-hero-pattern py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex h-1 mb-1 w-16">
            <div className="flex-1 bg-tchad-blue" />
            <div className="flex-1 bg-tchad-yellow" />
            <div className="flex-1 bg-tchad-red" />
          </div>
          <h1 className="text-4xl font-bold text-white mt-3">Contact</h1>
          <p className="text-white/70 mt-2">Contactez le Ministère de l'Aménagement du Territoire</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Formulaire */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Envoyer un message</h2>
              <p className="text-gray-500 text-sm mb-6">Nous vous répondrons dans les meilleurs délais.</p>

              {sent ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message envoyé !</h3>
                  <p className="text-gray-600 mb-4">Votre message a été transmis avec succès. Nous vous contacterons prochainement.</p>
                  <Button onClick={() => setSent(false)} variant="outline">Envoyer un autre message</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Nom complet *" placeholder="Votre nom" {...register('nom')} error={errors.nom?.message} />
                    <Input label="Email *" type="email" placeholder="votre@email.com" {...register('email')} error={errors.email?.message} />
                  </div>
                  <Input label="Téléphone" placeholder="+235 XX XX XX XX" {...register('telephone')} />
                  <Input label="Sujet *" placeholder="Objet de votre message" {...register('sujet')} error={errors.sujet?.message} />
                  <Textarea label="Message *" rows={5} placeholder="Décrivez votre demande..." {...register('message')} error={errors.message?.message} />
                  <Button type="submit" loading={isSubmitting} size="lg" className="w-full">
                    Envoyer le message
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Infos */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Coordonnées</h2>
              <div className="space-y-4">
                {infos.map(info => (
                  <div key={info.label} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{info.label}</p>
                      <p className="text-sm text-gray-700 mt-0.5">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carte placeholder */}
            <div className="bg-gray-100 rounded-xl h-48 flex items-center justify-center border">
              <div className="text-center text-gray-400">
                <MapPin className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">N'Djaména, Tchad</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
