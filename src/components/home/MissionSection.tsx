import { Link } from 'react-router-dom'
import { Target, Eye, Shield, ArrowRight } from 'lucide-react'

const missions = [
  {
    icon: Target,
    title: 'Notre Mission',
    text: 'Élaborer et mettre en œuvre la politique nationale d\'aménagement du territoire, de l\'habitat et de l\'urbanisme pour un développement équilibré.',
    color: 'bg-primary-500',
  },
  {
    icon: Eye,
    title: 'Notre Vision',
    text: 'Un Tchad dont le territoire est aménagé de façon équilibrée, durable et inclusive, offrant à chaque citoyen un cadre de vie digne.',
    color: 'bg-gold-500',
  },
  {
    icon: Shield,
    title: 'Nos Valeurs',
    text: 'Intégrité, transparence, efficacité et service à la nation. Nous agissons dans l\'intérêt général de la population tchadienne.',
    color: 'bg-tchad-red',
  },
]

export function MissionSection() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        {/* En-tête */}
        <div className="text-center mb-14">
          <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest">Le Ministère</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Missions & Engagements</h2>
        </div>

        {/* Cartes missions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {missions.map(m => (
            <div key={m.title} className="group bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className={`${m.color} w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <m.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">{m.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{m.text}</p>
            </div>
          ))}
        </div>

        {/* Bandeau avec photo du ministre */}
        <div className="relative rounded-3xl overflow-hidden">
          {/* Image fond */}
          <img
            src="/images/ceremonie.jpg"
            alt="Cérémonie du Ministère"
            className="w-full h-80 object-cover object-top"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/95 via-primary-900/80 to-transparent" />

          <div className="absolute inset-0 flex items-center">
            <div className="max-w-2xl px-8 md:px-12">
              <div className="flex items-center gap-4 mb-5">
                <img
                  src="/images/logo.jpg"
                  alt="Logo MATUH"
                  className="w-14 h-14 object-contain bg-white/10 rounded-full p-1"
                />
                <div>
                  <p className="text-gold-300 font-bold text-sm uppercase tracking-wide">MATUH</p>
                  <p className="text-white/60 text-xs">République du Tchad</p>
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                Découvrez le Ministère en détail
              </h3>
              <p className="text-white/70 text-sm mb-6 max-w-md">
                Organisation, attributions, directions et contacts officiels du Ministère de l'Aménagement du Territoire, de l'Habitat et de l'Urbanisme.
              </p>
              <Link
                to="/ministere"
                className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                En savoir plus <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
