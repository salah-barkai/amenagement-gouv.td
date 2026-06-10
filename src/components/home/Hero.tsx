import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Photo de fond : bâtiment du ministère */}
      <div className="absolute inset-0">
        <img
          src="/images/batiment.jpg"
          alt="Bâtiment du Ministère"
          className="w-full h-full object-cover object-center"
        />
        {/* Overlay dégradé bleu profond */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/95 via-primary-800/85 to-primary-700/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
      </div>

      {/* Bande verticale couleurs Tchad à gauche */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 flex flex-col z-10">
        <div className="flex-1 bg-tchad-blue" />
        <div className="flex-1 bg-tchad-yellow" />
        <div className="flex-1 bg-tchad-red" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Colonne gauche : texte */}
          <div>
            {/* Badge République */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
              <span className="text-white/90 text-sm font-medium">République du Tchad</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Aménager le
              <span className="block text-gold-400">Territoire,</span>
              <span className="block">Bâtir l'Avenir</span>
            </h1>

            <p className="text-lg text-white/80 mb-8 max-w-lg leading-relaxed">
              Le Ministère de l'Aménagement du Territoire, de l'Habitat et de l'Urbanisme du Tchad œuvre pour un développement équilibré et durable au service de tous les citoyens.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/projets"
                className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-white px-7 py-3.5 rounded-lg font-semibold transition-all shadow-lg hover:shadow-gold-500/25 hover:-translate-y-0.5"
              >
                Nos Projets <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/actualites"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-7 py-3.5 rounded-lg font-semibold transition-all backdrop-blur-sm"
              >
                Actualités
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-14 grid grid-cols-3 gap-4 border-t border-white/20 pt-8">
              {[
                { value: '23', label: 'Régions couvertes' },
                { value: '50+', label: 'Projets actifs' },
                { value: '2030', label: 'Plan quinquennal' },
              ].map(stat => (
                <div key={stat.label}>
                  <p className="text-3xl font-bold text-gold-400">{stat.value}</p>
                  <p className="text-xs text-white/60 mt-1 leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Colonne droite : logo officiel + carte identité du ministère */}
          <div className="hidden lg:flex flex-col items-center gap-6">
            {/* Logo officiel */}
            <div className="relative">
              <div className="w-56 h-56 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/20 flex items-center justify-center shadow-2xl">
                <img
                  src="/images/logo.jpg"
                  alt="Armoiries MATUH"
                  className="w-48 h-48 object-contain rounded-full"
                />
              </div>
              {/* Halo */}
              <div className="absolute inset-0 rounded-full bg-gold-400/10 blur-2xl scale-150 pointer-events-none" />
            </div>

            {/* Devise */}
            <div className="text-center">
              <p className="text-gold-300 font-bold text-lg tracking-widest uppercase">MATUH</p>
              <div className="flex items-center gap-3 mt-2 text-white/60 text-xs font-medium tracking-wider">
                <span>UNITÉ</span>
                <span className="w-1 h-1 rounded-full bg-gold-400" />
                <span>TRAVAIL</span>
                <span className="w-1 h-1 rounded-full bg-gold-400" />
                <span>PROGRÈS</span>
              </div>
            </div>

            {/* Carte photo activité */}
            <div className="relative w-full max-w-xs rounded-2xl overflow-hidden shadow-2xl border border-white/20">
              <img
                src="/images/activite-1.jpg"
                alt="Activité du Ministère"
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <p className="text-white text-sm font-medium">Activités & missions sur le terrain</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <ChevronDown className="h-6 w-6 text-white/40" />
      </div>
    </section>
  )
}
