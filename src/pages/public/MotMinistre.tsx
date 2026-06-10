import { Quote, Home, Globe2, MapPin, Target, ChevronRight, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { MinistrySubNav } from '@/components/ministry/MinistrySubNav'

const messageParas = [
  { text: `Mesdames, Messieurs, chers visiteurs,`, style: 'intro' },
  { text: `C'est avec un profond sentiment de responsabilité et d'engagement que je vous souhaite la bienvenue sur le portail officiel du Ministère de l'Aménagement du Territoire, de l'Habitat et de l'Urbanisme de la République du Tchad.`, style: 'normal' },
  { text: `Ce portail se veut un espace d'information, de transparence et d'échange au service des citoyens, des collectivités territoriales, des professionnels du secteur et de l'ensemble des partenaires du développement urbain. Il reflète notre engagement constant à rapprocher l'administration du citoyen et à rendre nos actions plus lisibles et accessibles à tous.`, style: 'normal' },
  { text: `Le Tchad, avec ses 1 284 000 km² et sa diversité géographique remarquable — du désert saharien au nord aux plaines fertiles du Logone-Chari au sud, en passant par les rives du Lac Tchad —, représente un vaste champ d'action pour notre Ministère. Les défis sont nombreux : urbanisation accélérée, pression démographique, besoins croissants en logements et en infrastructures, gestion foncière complexe. Mais les opportunités sont tout aussi immenses.`, style: 'normal' },
  { text: `Notre ambition est claire : contribuer à la construction d'un Tchad prospère, où chaque citoyen, qu'il vive dans nos grandes villes ou dans les zones rurales les plus reculées, bénéficie d'un cadre de vie digne, d'un logement décent et d'une ville bien planifiée. Nous travaillons pour un urbanisme moderne, inclusif et durable, capable de répondre aux défis de la croissance urbaine et de transformer notre pays en modèle d'aménagement territorial intégré d'ici 2030.`, style: 'highlight' },
  { text: `Dans cette perspective, notre Ministère a engagé plusieurs chantiers prioritaires : la révision des Schémas Directeurs d'Aménagement et d'Urbanisme des principales agglomérations, le déploiement de programmes d'habitat social en faveur des populations modestes, la modernisation de la gestion foncière et du cadastre national, ainsi que le renforcement des capacités de nos administrations régionales et locales.`, style: 'normal' },
  { text: `Je vous invite à explorer ce portail, à vous informer sur nos projets et réalisations, et à contribuer par vos observations et suggestions à la construction d'un urbanisme responsable et planifié. Car c'est ensemble, administration et citoyens, que nous bâtirons le Tchad de demain.`, style: 'closing' },
]

const priorities = [
  { icon: Home,    title: 'Habitat Social',     desc: "Programmes nationaux pour l'accès au logement décent pour tous" },
  { icon: Globe2,  title: 'Schémas Directeurs', desc: "Révision et actualisation des SDAU des grandes agglomérations"  },
  { icon: MapPin,  title: 'Gestion Foncière',   desc: "Modernisation du cadastre et sécurisation des droits fonciers"  },
  { icon: Target,  title: 'Vision 2030',         desc: "Transformer le Tchad en modèle d'urbanisme intégré et durable"  },
]

export default function MotMinistre() {
  return (
    <div>
      {/* ── Banner avec photo du ministre intégrée ── */}
      <div className="relative overflow-hidden">
        <img src="/images/batiment.jpg" alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950/95 via-primary-900/85 to-primary-800/50" />
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row items-end gap-10">
            {/* Texte */}
            <div className="flex-1 min-w-0">
              <div className="flex h-1.5 mb-5 w-20 rounded-full overflow-hidden">
                <div className="flex-1 bg-tchad-blue" /><div className="flex-1 bg-tchad-yellow" /><div className="flex-1 bg-tchad-red" />
              </div>
              <p className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-3">Le Ministère</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">Mot du Ministre</h1>
              <div className="mt-5 flex items-center gap-3">
                <div className="w-px h-10 bg-gold-400/50" />
                <div>
                  <p className="text-white font-semibold">M. Mahamat Assileck Halata</p>
                  <p className="text-white/60 text-sm mt-0.5">Ministre de l'Aménagement du Territoire, de l'Habitat et de l'Urbanisme</p>
                </div>
              </div>
            </div>
            {/* Photo du ministre */}
            <div className="flex-shrink-0 self-end">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-gold-400/20 blur-xl scale-110" />
                <img
                  src="/images/ministre-officiel.jpg"
                  alt="M. Mahamat Assileck Halata"
                  className="relative w-44 md:w-56 h-64 md:h-72 object-cover object-top rounded-2xl shadow-2xl border-2 border-white/20"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tabs navigation ── */}
      <MinistrySubNav />

      {/* ── Contenu centré ── */}
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">

        {/* Citation phare */}
        <div className="relative bg-primary-800 rounded-2xl p-8 overflow-hidden">
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary-700 rounded-full opacity-50" />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-primary-900 rounded-full opacity-30" />
          <Quote className="h-10 w-10 text-gold-400/50 mb-4 relative z-10" />
          <blockquote className="text-lg md:text-xl leading-relaxed italic text-white/95 relative z-10">
            « Ce portail se veut un espace d'information, de transparence et d'échange au service des citoyens, des collectivités territoriales, des professionnels du secteur et de l'ensemble des partenaires du développement urbain. »
          </blockquote>
          <div className="mt-6 pt-4 border-t border-primary-600 flex items-center gap-3 relative z-10">
            <img src="/images/ministre-officiel.jpg" alt="" className="w-10 h-10 rounded-full object-cover object-top border border-white/20" />
            <div>
              <p className="text-gold-400 font-bold text-sm">M. Mahamat Assileck Halata</p>
              <p className="text-white/50 text-xs">Ministre de l'Aménagement du Territoire — République du Tchad</p>
            </div>
          </div>
        </div>

        {/* Message complet — format lettre officielle */}
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          {/* En-tête lettre */}
          <div className="bg-gray-50 border-b px-8 py-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src="/images/logo.jpg" alt="Logo MATUH" className="w-10 h-10 object-contain bg-white rounded-full p-0.5 shadow-sm border" />
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">République du Tchad</p>
                <p className="text-xs text-gray-400">Ministère de l'Aménagement du Territoire, de l'Habitat et de l'Urbanisme</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 hidden sm:block">
              N'Djaména, {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}
            </p>
          </div>

          {/* Corps de la lettre */}
          <div className="px-8 md:px-12 py-10 space-y-5">
            {messageParas.map((p, i) => {
              if (p.style === 'intro') {
                return <p key={i} className="font-semibold text-primary-800 text-base">{p.text}</p>
              }
              if (p.style === 'highlight') {
                return (
                  <div key={i} className="bg-primary-50 border-l-4 border-primary-500 rounded-r-xl pl-5 pr-4 py-4">
                    <p className="text-primary-800 leading-relaxed font-medium text-sm">{p.text}</p>
                  </div>
                )
              }
              if (p.style === 'closing') {
                return <p key={i} className="text-gray-700 leading-relaxed italic">{p.text}</p>
              }
              return <p key={i} className="text-gray-700 leading-relaxed">{p.text}</p>
            })}

            {/* Signature officielle */}
            <div className="pt-8 mt-6 border-t-2 border-dashed border-gray-200">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <img
                  src="/images/ministre-officiel.jpg"
                  alt=""
                  className="w-20 h-24 rounded-xl object-cover object-top border-2 border-primary-100 shadow-md flex-shrink-0"
                />
                <div>
                  <p className="text-gray-500 text-sm mb-3">
                    N'Djaména, le {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <p className="font-extrabold text-gray-900 text-xl">M. Mahamat Assileck Halata</p>
                  <p className="text-primary-600 font-medium text-sm mt-1">Ministre de l'Aménagement du Territoire,</p>
                  <p className="text-primary-600 font-medium text-sm">de l'Habitat et de l'Urbanisme</p>
                  <p className="text-gray-400 text-xs mt-2">République du Tchad</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Priorités */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
            <Star className="h-5 w-5 text-gold-500" />
            Priorités du Ministre
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {priorities.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl border p-5 hover:shadow-md transition-shadow hover:border-primary-200">
                <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center mb-3">
                  <Icon className="h-5 w-5 text-primary-600" />
                </div>
                <p className="font-bold text-gray-900 text-sm">{title}</p>
                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA vers missions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/ministere/missions"
            className="flex-1 flex items-center justify-center gap-2 bg-primary-600 text-white font-semibold py-4 px-6 rounded-2xl hover:bg-primary-700 transition-colors text-sm"
          >
            Découvrir nos missions <ChevronRight className="h-4 w-4" />
          </Link>
          <Link
            to="/projets"
            className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-primary-200 text-primary-700 font-semibold py-4 px-6 rounded-2xl hover:bg-primary-50 transition-colors text-sm"
          >
            Voir nos projets <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
