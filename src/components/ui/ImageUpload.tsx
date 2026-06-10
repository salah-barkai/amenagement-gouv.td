import { useState, useRef, useCallback } from 'react'
import { Upload, X, Loader2, ImageIcon, AlertCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { cn } from '@/lib/utils'

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  label?: string
  className?: string
}

const MAX_SIZE_MB = 5

export function ImageUpload({ value, onChange, label, className }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function uploadFile(file: File) {
    setError('')

    if (!file.type.startsWith('image/')) {
      setError('Seuls les fichiers image sont acceptés (JPG, PNG, WEBP, GIF)')
      return
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`L'image ne doit pas dépasser ${MAX_SIZE_MB} Mo`)
      return
    }

    setUploading(true)
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const path = `public/${filename}`

    const { data, error: uploadError } = await supabase.storage
      .from('images')
      .upload(path, file, { upsert: true, contentType: file.type })

    if (uploadError) {
      setError(`Erreur : ${uploadError.message}`)
      setUploading(false)
      return
    }

    const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(data.path)
    onChange(publicUrl)
    setUploading(false)
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) uploadFile(file)
  }, [])

  function handleClear() {
    onChange('')
    setError('')
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      )}

      {value ? (
        /* Prévisualisation de l'image uploadée */
        <div className="relative rounded-xl overflow-hidden border border-gray-200 group">
          <img
            src={value}
            alt="Aperçu"
            className="w-full h-52 object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="px-4 py-2 bg-white text-gray-800 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Remplacer
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          {uploading && (
            <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center gap-2">
              <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
              <p className="text-sm text-gray-600 font-medium">Upload en cours…</p>
            </div>
          )}
        </div>
      ) : (
        /* Zone de dépôt */
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={cn(
            'relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all',
            dragOver
              ? 'border-primary-400 bg-primary-50 scale-[1.01]'
              : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50',
          )}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-10 w-10 text-primary-500 animate-spin" />
              <p className="text-sm font-medium text-primary-600">Upload en cours…</p>
              <p className="text-xs text-gray-400">Veuillez patienter</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className={cn(
                'w-14 h-14 rounded-full flex items-center justify-center transition-colors',
                dragOver ? 'bg-primary-100' : 'bg-gray-100'
              )}>
                {dragOver
                  ? <Upload className="h-7 w-7 text-primary-500" />
                  : <ImageIcon className="h-7 w-7 text-gray-400" />
                }
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">
                  {dragOver ? 'Relâchez pour uploader' : 'Glissez une image ici'}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  ou <span className="text-primary-500 font-medium">cliquez pour parcourir</span>
                </p>
              </div>
              <p className="text-xs text-gray-400">JPG, PNG, WEBP, GIF — max {MAX_SIZE_MB} Mo</p>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="mt-2 flex items-center gap-2 text-xs text-red-600">
          <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
          {error}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => e.target.files?.[0] && uploadFile(e.target.files[0])}
      />
    </div>
  )
}
