import { Link } from 'react-router-dom'
import { ArrowRight, Camera } from 'lucide-react'

const photos = [
  { src: '/images/activite-1.jpg', label: 'Mission officielle' },
  { src: '/images/reunion.jpg', label: 'Réunion technique' },
  { src: '/images/ceremonie.jpg', label: 'Cérémonie MATUH 2026' },
  { src: '/images/descende.jpg', label: 'Descente terrain' },
  { src: '/images/jif.jpg', label: 'Journée Int. de la Femme' },
  { src: '/images/activite-3.jpg', label: 'Conférence plénière' },
  { src: '/images/parlement-panafricain.jpg', label: 'Parlement panafricain' },
]

export function GallerySection() {
  return (
    <section className="py-20 bg-primary-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* En-tête */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-gold-400 font-semibold text-sm uppercase tracking-widest">Médiathèque</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-1">Galerie photos</h2>
          </div>
          <Link
            to="/documents"
            className="hidden sm:flex items-center gap-1 text-gold-400 hover:text-gold-300 font-medium text-sm"
          >
            Tous les documents <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Grille photos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {photos.map((photo, i) => (
            <div
              key={photo.src}
              className={`relative group rounded-xl overflow-hidden cursor-pointer
                ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}
              `}
            >
              <img
                src={photo.src}
                alt={photo.label}
                className={`w-full object-cover group-hover:scale-105 transition-transform duration-500
                  ${i === 0 ? 'h-72' : 'h-36'}
                `}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white text-xs font-semibold">{photo.label}</p>
              </div>
              {/* Icône caméra au hover */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-7 h-7 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Camera className="h-3.5 w-3.5 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
