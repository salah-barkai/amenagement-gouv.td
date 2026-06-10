import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Lock, Mail } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const schema = z.object({
  email:    z.string().email('Email invalide'),
  password: z.string().min(6, 'Mot de passe requis'),
})

type FormData = z.infer<typeof schema>

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [authError, setAuthError] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    setAuthError('')
    const { error } = await signIn(data.email, data.password)
    if (error) {
      setAuthError('Email ou mot de passe incorrect.')
    } else {
      navigate('/admin')
    }
  }

  return (
    <div className="min-h-screen bg-hero-pattern flex items-center justify-center p-4">
      {/* Bande drapeau */}
      <div className="fixed top-0 left-0 right-0 flex h-1.5">
        <div className="flex-1 bg-tchad-blue" />
        <div className="flex-1 bg-tchad-yellow" />
        <div className="flex-1 bg-tchad-red" />
      </div>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-white rounded-full mx-auto flex items-center justify-center shadow-xl mb-4 ring-4 ring-white/20">
            <img src="/images/logo.jpg" alt="MATUH" className="w-20 h-20 object-contain rounded-full" />
          </div>
          <h1 className="text-2xl font-bold text-white">Administration</h1>
          <p className="text-white/60 text-sm mt-1">Ministère de l'Aménagement du Territoire</p>
          <p className="text-gold-400/80 text-xs mt-0.5 tracking-widest">UNITÉ · TRAVAIL · PROGRÈS</p>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Connexion</h2>

          {authError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {authError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 mt-3" />
              <Input
                label="Adresse email"
                type="email"
                placeholder="admin@mathu.td"
                className="pl-9"
                {...register('email')}
                error={errors.email?.message}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 bottom-[9px] h-4 w-4 text-gray-400" />
              <Input
                label="Mot de passe"
                type="password"
                placeholder="••••••••"
                className="pl-9"
                {...register('password')}
                error={errors.password?.message}
              />
            </div>

            <Button type="submit" loading={isSubmitting} size="lg" className="w-full mt-2">
              Se connecter
            </Button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            Accès réservé aux agents autorisés du Ministère
          </p>
        </div>
      </div>
    </div>
  )
}
