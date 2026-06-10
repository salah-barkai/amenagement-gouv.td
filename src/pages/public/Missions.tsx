import { Globe2, Home, Building2, MapPin, Check, FileText, TrendingUp, ChevronRight, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'
import { MinistrySubNav } from '@/components/ministry/MinistrySubNav'

const stats = [
  { value: '12 450', label: 'Logements livrés',     color: 'text-green-400'   },
  { value: '87',     label: "Plans d'urbanisme",     color: 'text-blue-300'    },
  { value: '156',    label: 'Zones cadastrées',      color: 'text-amber-400'   },
  { value: '23',     label: 'Régions couvertes',     color: 'text-primary-200' },
]

const domaines = [
  {
    id: 1,
    titre: 'Aménagement du Territoire',
    icon: Globe2,
    color: 'primary',
    headerClass: 'bg-primary-600',
    bodyClass: 'bg-primary-50 border-primary-200',
    accentClass: 'text-primary-700',
    numClass: 'bg-primary-600 text-white',
    img: '/images/descende.jpg',
    desc: "Organisation et planification de l'espace national pour garantir un développement harmonieux et équilibré entre toutes les régions du Tchad.",
    missions: [
      "Élaborer et mettre en œuvre la politique nationale d'aménagement du territoire",
      "Assurer la planification spatiale nationale, régionale et locale",
      "Établir les Schémas Directeurs d'Aménagement Régionaux (SDAR)",
      "Coordonner les interventions des différents acteurs sur le territoire",
      "Veiller à l'équilibre du développement entre régions rurales et urbaines",
      "Gérer les relations avec les collectivités territoriales décentralisées",
      "Développer des outils modernes de planification et de suivi territorial",
    ],
  },
  {
    id: 2,
    titre: 'Habitat & Logement',
    icon: Home,
    color: 'green',
    headerClass: 'bg-green-600',
    bodyClass: 'bg-green-50 border-green-200',
    accentClass: 'text-green-700',
    numClass: 'bg-green-600 text-white',
    img: '/images/activite-1.jpg',
    desc: "Promotion du logement social et garantie d'un accès équitable à un habitat décent pour l'ensemble des citoyens tchadiens.",
    missions: [
      "Élaborer et mettre en œuvre la politique nationale de l'habitat",
      "Promouvoir et développer l'habitat social et les logements abordables",
      "Résorber les habitats précaires, insalubres et à risques",
      "Encourager les partenariats public-privé dans le secteur immobilier",
      "Assurer la normalisation des matériaux et techniques de construction",
      "Mettre en place des mécanismes de financement du logement populaire",
    ],
  },
  {
    id: 3,
    titre: 'Urbanisme & Architecture',
    icon: Building2,
    color: 'blue',
    headerClass: 'bg-blue-600',
    bodyClass: 'bg-blue-50 border-blue-200',
    accentClass: 'text-blue-700',
    numClass: 'bg-blue-600 text-white',
    img: '/images/reunion.jpg',
    desc: "Planification et réglementation urbaine pour des villes durables, inclusives et bien ordonnées à travers l'ensemble du territoire national.",
    missions: [
      "Élaborer les Schémas Directeurs d'Aménagement et d'Urbanisme (SDAU)",
      "Délivrer et contrôler les autorisations d'urbanisme et permis de construire",
      "Lutter contre les constructions irrégulières et occupations illicites",
      "Promouvoir une architecture adaptée au contexte culturel et climatique",
      "Développer les espaces verts, parcs et équipements collectifs urbains",
      "Assurer la viabilisation et l'équipement des zones d'aménagement concerté",
    ],
  },
  {
    id: 4,
    titre: 'Gestion Foncière',
    icon: MapPin,
    color: 'amber',
    headerClass: 'bg-amber-600',
    bodyClass: 'bg-amber-50 border-amber-200',
    accentClass: 'text-amber-700',
    numClass: 'bg-amber-600 text-white',
    img: '/images/activite-3.jpg',
    desc: "Sécurisation et gestion moderne du patrimoine foncier national pour réduire les conflits et garantir les droits des citoyens.",
    missions: [
      "Assurer la gestion du domaine foncier et immobilier de l'État",
      "Établir et tenir à jour le cadastre national",
      "Sécuriser les droits fonciers des citoyens et des communautés",
      "Prévenir et résoudre les conflits fonciers",
      "Réformer le cadre juridique foncier pour l'adapter aux besoins actuels",
      "Développer des outils numériques de gestion cadastrale",
    ],
  },
]

const textes = [
  { ref: 'Loi n° 14/PR/2020',      desc: "portant réorganisation du Gouvernement de la République du Tchad" },
  { ref: 'Décret n° 1242/PR/PM/2021', desc: "fixant les attributions du Ministère de l'Aménagement du Territoire, de l'Habitat et de l'Urbanisme" },
  { ref: 'Loi n° 007/PR/2010',      desc: "portant Code de l'Urbanisme et de la Construction en République du Tchad" },
  { ref: 'Ordonnance n° 04/INT/SUR/62', desc: "fixant le régime de la propriété foncière et des droits coutumiers" },
]

export default function Missions() {
  return (
    <div>
      {/* ── Banner ── */}
      <div className="relative py-24 overflow-hidden">
        <img src="/images/batiment.jpg" alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950/92 to-primary-800/65" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex h-1.5 mb-5 w-20 rounded-full overflow-hidden">
            <div className="flex-1 bg-tchad-blue" /><div className="flex-1 bg-tchad-yellow" /><div className="flex-1 bg-tchad-red" />
          </div>
          <p className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-2">Le Ministère</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">Missions & Attributions</h1>
          <p className="text-white/65 mt-3 max-w-2xl">
            Le MATUH coordonne et met en œuvre la politique nationale d'aménagement territorial, d'urbanisme et d'habitat pour garantir un développement équilibré et durable.
          </p>
        </div>
      </div>

      {/* ── Tabs navigation ── */}
      <MinistrySubNav />

      {/* ── Stats ── */}
      <div className="bg-primary-800">
        <div className="max-w-7xl mx-auto px-4 py-7">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-primary-700">
            {stats.map(s => (
              <div key={s.label} className="text-center px-4">
                <p className={`text-3xl font-extrabold ${s.color}`}>{s.value}</p>
                <p className="text-primary-300 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">

        {/* Mission générale */}
        <div className="bg-white rounded-2xl border shadow-sm p-7">
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 bg-gold-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingUp className="h-6 w-6 text-gold-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Mission générale</h2>
              <p className="text-gray-600 leading-relaxed">
                Conformément aux décrets et textes législatifs en vigueur, le Ministère de l'Aménagement du Territoire, de l'Habitat et de l'Urbanisme a pour mission générale de{' '}
                <strong className="text-primary-800">coordonner et mettre en œuvre la politique nationale d'aménagement territorial, d'urbanisme et d'habitat</strong>,
                en vue de garantir un développement territorial équilibré, durable et inclusif sur l'ensemble du territoire national tchadien.
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                {['Aménagement du Territoire', 'Habitat & Logement', 'Urbanisme & Architecture', 'Gestion Foncière'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-primary-50 text-primary-700 border border-primary-100 rounded-full text-xs font-semibold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Grille 2×2 des domaines ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {domaines.map(d => (
            <div key={d.id} className={`rounded-2xl border-2 ${d.bodyClass} overflow-hidden shadow-sm hover:shadow-md transition-shadow`}>
              {/* En-tête */}
              <div className={`${d.headerClass} p-5 flex items-center gap-4`}>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <d.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-white/60 text-xs font-semibold uppercase tracking-wider">Domaine {d.id}</p>
                  <h3 className="text-lg font-bold text-white leading-tight">{d.titre}</h3>
                </div>
              </div>

              {/* Corps */}
              <div className="p-5">
                <p className={`text-sm ${d.accentClass} font-medium mb-4 leading-relaxed`}>{d.desc}</p>

                {/* Liste des missions */}
                <ul className="space-y-2.5">
                  {d.missions.map((m, i) => (
                    <li key={i} className="flex items-start gap-3 bg-white rounded-xl p-3 shadow-sm">
                      <span className={`w-5 h-5 ${d.numClass} rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5`}>
                        {i + 1}
                      </span>
                      <p className="text-gray-700 text-sm leading-relaxed">{m}</p>
                    </li>
                  ))}
                </ul>

                {/* Photo */}
                <div className="mt-4 rounded-xl overflow-hidden h-28">
                  <img src={d.img} alt={d.titre} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Textes juridiques + CTA ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Textes de référence */}
          <div className="bg-white rounded-2xl border shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary-500" />
              Textes de référence
            </h3>
            <ul className="space-y-4">
              {textes.map((t, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary-700">{t.ref}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{t.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Engagements */}
          <div className="bg-primary-700 rounded-2xl p-6 text-white">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-gold-400" />
              Nos Engagements
            </h3>
            <ul className="space-y-3">
              {[
                "Développement territorial équilibré et durable",
                "Accès universel à un logement décent",
                "Villes planifiées, inclusives et résilientes",
                "Gestion foncière moderne et transparente",
                "Coopération avec les collectivités locales",
              ].map((e, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/85">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-2 flex-shrink-0" />
                  {e}
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-primary-600">
              <Link
                to="/ministere/mot-ministre"
                className="flex items-center gap-2 text-gold-400 font-semibold text-sm hover:text-gold-300 transition-colors"
              >
                Lire le mot du Ministre <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
