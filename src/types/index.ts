export interface Actualite {
  id: string
  titre: string
  contenu: string
  extrait?: string
  image_url?: string
  categorie: string
  publie: boolean
  publie_le: string
  auteur_id?: string
  created_at: string
  updated_at: string
}

export interface Projet {
  id: string
  titre: string
  description: string
  contenu?: string
  image_url?: string
  statut: 'En cours' | 'Terminé' | 'Planifié' | 'Suspendu'
  localisation?: string
  budget?: number
  date_debut?: string
  date_fin?: string
  publie: boolean
  created_at: string
  updated_at: string
}

export interface Document {
  id: string
  titre: string
  description?: string
  fichier_url?: string
  categorie: string
  publie: boolean
  publie_le: string
  created_at: string
}

export interface GalerieItem {
  id: string
  titre: string
  image_url: string
  description?: string
  ordre: number
  publie: boolean
  created_at: string
}

export interface Contact {
  id: string
  nom: string
  email: string
  telephone?: string
  sujet: string
  message: string
  lu: boolean
  created_at: string
}

export interface Page {
  id: string
  slug: string
  titre: string
  contenu?: string
  publie: boolean
  updated_at: string
}

export interface Profil {
  id: string
  nom?: string
  prenom?: string
  role: 'admin' | 'editeur' | 'lecteur'
  avatar_url?: string
  created_at: string
}

export type StatutProjet = 'En cours' | 'Terminé' | 'Planifié' | 'Suspendu'
export type CategorieDocument = 'Texte officiel' | 'Rapport' | 'Publication' | 'Communiqué' | "Appel d'offres"
