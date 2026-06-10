import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface RichEditorProps {
  value: string
  onChange: (value: string) => void
  label?: string
  error?: string
  className?: string
  minHeight?: number
}

const TOOLBAR_BUTTONS = [
  { cmd: 'bold',          icon: '<b>G</b>',          title: 'Gras' },
  { cmd: 'italic',        icon: '<i>I</i>',          title: 'Italique' },
  { cmd: 'underline',     icon: '<u>S</u>',          title: 'Souligner' },
  { cmd: 'separator' },
  { cmd: 'insertUnorderedList', icon: '≡',           title: 'Liste à puces' },
  { cmd: 'insertOrderedList',   icon: '1.',          title: 'Liste numérotée' },
  { cmd: 'separator' },
  { cmd: 'h2',            icon: 'H2',                title: 'Titre 2', isBlock: true },
  { cmd: 'h3',            icon: 'H3',                title: 'Titre 3', isBlock: true },
  { cmd: 'separator' },
  { cmd: 'createLink',    icon: '🔗',                title: 'Lien' },
  { cmd: 'removeFormat',  icon: '✖',                title: 'Supprimer le format' },
]

export function RichEditor({ value, onChange, label, error, className, minHeight = 220 }: RichEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const isUpdating = useRef(false)

  useEffect(() => {
    const el = editorRef.current
    if (!el || isUpdating.current) return
    if (el.innerHTML !== value) {
      el.innerHTML = value || ''
    }
  }, [value])

  function execCmd(cmd: string, isBlock?: boolean) {
    if (isBlock) {
      document.execCommand('formatBlock', false, cmd)
    } else if (cmd === 'createLink') {
      const url = prompt('URL du lien :')
      if (url) document.execCommand('createLink', false, url)
    } else {
      document.execCommand(cmd, false)
    }
    editorRef.current?.focus()
    isUpdating.current = true
    onChange(editorRef.current?.innerHTML || '')
    setTimeout(() => { isUpdating.current = false }, 0)
  }

  return (
    <div className={cn('w-full', className)}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

      <div className={cn(
        'border rounded-xl overflow-hidden shadow-sm',
        error ? 'border-red-400' : 'border-gray-300 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-200',
      )}>
        {/* Barre d'outils */}
        <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 bg-gray-50 border-b border-gray-200">
          {TOOLBAR_BUTTONS.map((btn, i) =>
            btn.cmd === 'separator' ? (
              <div key={i} className="w-px h-5 bg-gray-300 mx-1" />
            ) : (
              <button
                key={btn.cmd}
                type="button"
                title={btn.title}
                onMouseDown={e => { e.preventDefault(); execCmd(btn.cmd, btn.isBlock) }}
                className="w-7 h-7 flex items-center justify-center text-xs text-gray-600 rounded hover:bg-gray-200 hover:text-gray-900 transition-colors"
                dangerouslySetInnerHTML={{ __html: btn.icon! }}
              />
            )
          )}
        </div>

        {/* Zone de contenu éditable */}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={() => {
            isUpdating.current = true
            onChange(editorRef.current?.innerHTML || '')
            setTimeout(() => { isUpdating.current = false }, 0)
          }}
          className="px-4 py-3 text-sm text-gray-800 outline-none prose prose-sm max-w-none"
          style={{ minHeight }}
        />
      </div>

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}
