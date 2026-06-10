import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateStr: string, pattern = 'dd MMMM yyyy') {
  try {
    return format(parseISO(dateStr), pattern, { locale: fr })
  } catch {
    return dateStr
  }
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XAF',
    minimumFractionDigits: 0,
  }).format(amount)
}

export function truncate(str: string, length: number) {
  if (str.length <= length) return str
  return str.slice(0, length).trimEnd() + '…'
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export const CATEGORIES_ACTUALITE = [
  'Actualité',
  'Communiqué',
  'Programme',
  'Formation',
  'Partenariat',
  'Annonce',
]

export const STATUTS_PROJET: Record<string, string> = {
  'En cours':  'bg-blue-100 text-blue-800',
  'Terminé':   'bg-green-100 text-green-800',
  'Planifié':  'bg-yellow-100 text-yellow-800',
  'Suspendu':  'bg-red-100 text-red-800',
}
