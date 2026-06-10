import { ChevronRight, User, Users, Building2, Globe2, Home, MapPin, FileText, Settings } from 'lucide-react'
import { Link } from 'react-router-dom'
import { MinistrySubNav } from '@/components/ministry/MinistrySubNav'

const ministre = {
  nom: 'M. Mahamat Assileck Halata',
  titre: 'Ministre de l\'Aménagement du Territoire,\nde l\'Habitat et de l\'Urbanisme',
  photo: '/images/ministre-officiel.jpg',
}

const cabinet = [
  { titre: 'Chef de Cabinet',                  desc: 'Coordination et supervision du cabinet ministériel' },
  { titre: 'Conseiller Technique Principal',   desc: 'Études, analyses et conseils techniques supérieurs'  },
  { titre: 'Chargé de Communication',          desc: 'Relations publiques, presse et communication digitale' },
  { titre: 'Inspection Générale',              desc: 'Contrôle interne, audit et conformité administrative'  },
]

const secretariat = {
  titre: 'Secrétariat Général (SG)',
  nom: 'Secrétaire Général',
  desc: 'Coordination administrative, gestion des ressources humaines, budgétaires et matérielles',
  icon: Settings,
  color: 'bg-gray-700',
  directions: [
    { abbr: 'DAGB', name: 'Direction des Affaires Générales et du Budget',  desc: 'Gestion financière, comptabilité, marchés publics et patrimoine de l\'État.', icon: FileText },
    { abbr: 'DRH',  name: 'Direction des Ressources Humaines',              desc: 'Recrutement, formation, gestion des carrières et bien-être du personnel.',    icon: Users   },
  ],
}

const directionGenerale = {
  titre: 'Direction Générale de l\'Aménagement du Territoire (DGAT)',
  nom: 'Directeur Général',
  desc: 'Pilotage de la politique nationale d\'aménagement du territoire et coordination des directions techniques',
  icon: Globe2,
  color: 'bg-primary-600',
  directions: [
    { abbr: 'DAT',  name: 'Direction de l\'Aménagement du Territoire',      desc: 'Schémas directeurs régionaux, planification spatiale et coordination interministérielle.',     icon: Globe2   },
    { abbr: 'DUH',  name: 'Direction de l\'Urbanisme et de l\'Habitat',      desc: 'Plans directeurs d\'urbanisme, permis de construire et politique nationale de l\'habitat.',    icon: Building2 },
    { abbr: 'DAF',  name: 'Direction des Affaires Foncières',                desc: 'Gestion du domaine foncier de l\'État, cadastre national et sécurisation des droits fonciers.', icon: MapPin   },
    { abbr: 'DHS',  name: 'Direction de l\'Habitat Social',                  desc: 'Programmes de logements sociaux, habitat précaire et mécanismes de financement populaire.',    icon: Home     },
    { abbr: 'DEP',  name: 'Direction des Études et de la Planification',     desc: 'Études sectorielles, statistiques territoriales, coopération technique et suivi-évaluation.', icon: FileText },
  ],
}

const organismes = [
  { nom: 'Agence Nationale de l\'Habitat (ANAH)',             desc: 'Mise en œuvre des programmes d\'habitat social et logements abordables.'              },
  { nom: 'Office des Propriétés Immobilières de l\'État (OPIE)', desc: 'Gestion et valorisation du patrimoine immobilier de l\'État.'                       },
  { nom: 'Comité National de l\'Habitat (CNH)',               desc: 'Concertation nationale sur la politique de l\'habitat et du logement.'                 },
  { nom: 'Commission Nationale de l\'Urbanisme (CNU)',        desc: 'Avis et recommandations sur les grands projets d\'aménagement et d\'urbanisme.'        },
]

export default function Organigramme() {
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
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">Organigramme</h1>
          <p className="text-white/65 mt-3 max-w-2xl">
            Structure organisationnelle du Ministère de l'Aménagement du Territoire, de l'Habitat et de l'Urbanisme
          </p>
        </div>
      </div>

      {/* ── Tabs navigation ── */}
      <MinistrySubNav />

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">

        {/* ── MINISTRE ── */}
        <div className="flex flex-col items-center">
          <div className="bg-primary-700 text-white rounded-2xl shadow-xl overflow-hidden w-full max-w-lg">
            <div className="relative h-2">
              <div className="absolute inset-0 flex">
                <div className="flex-1 bg-tchad-blue" />
                <div className="flex-1 bg-tchad-yellow" />
                <div className="flex-1 bg-tchad-red" />
              </div>
            </div>
            <div className="p-6 flex items-center gap-5">
              <img
                src={ministre.photo}
                alt={ministre.nom}
                className="w-20 h-24 object-cover object-top rounded-xl border-2 border-gold-400/50 shadow-lg flex-shrink-0"
              />
              <div>
                <p className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-1">MINISTRE</p>
                <p className="font-bold text-white text-lg leading-snug">{ministre.nom}</p>
                <p className="text-white/65 text-sm mt-1 leading-snug whitespace-pre-line">{ministre.titre}</p>
              </div>
            </div>
          </div>

          {/* Ligne de connexion */}
          <div className="w-px h-8 bg-primary-300 mt-0" />
        </div>

        {/* ── CABINET ── */}
        <div>
          <div className="flex flex-col items-center">
            <div className="w-full max-w-lg bg-primary-100 border-2 border-primary-300 rounded-xl px-6 py-4 text-center">
              <p className="font-bold text-primary-800 text-sm uppercase tracking-wider">Cabinet du Ministre</p>
              <p className="text-primary-600 text-xs mt-0.5">Conseillers, Chef de Cabinet, Chargés de Mission</p>
            </div>
            <div className="w-px h-6 bg-primary-300" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-0">
            {cabinet.map(m => (
              <div key={m.titre} className="bg-primary-50 border border-primary-200 rounded-xl p-4 flex items-start gap-3">
                <div className="w-8 h-8 bg-primary-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-primary-700" />
                </div>
                <div>
                  <p className="font-semibold text-primary-900 text-sm leading-snug">{m.titre}</p>
                  <p className="text-xs text-primary-600 mt-0.5 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Ligne de bifurcation ── */}
        <div className="relative flex justify-center">
          <div className="w-full border-t-2 border-dashed border-gray-300 relative">
            <div className="absolute -top-3 left-1/4 transform -translate-x-1/2 w-px h-3 bg-gray-300" />
            <div className="absolute -top-3 right-1/4 transform translate-x-1/2 w-px h-3 bg-gray-300" />
          </div>
        </div>

        {/* ── SECRÉTARIAT + DIRECTION GÉNÉRALE ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Secrétariat Général */}
          <div className="space-y-3">
            <div className={`${secretariat.color} text-white rounded-xl p-5`}>
              <div className="flex items-center gap-3 mb-1">
                <secretariat.icon className="h-5 w-5 text-white/80" />
                <p className="font-bold text-sm">{secretariat.titre}</p>
              </div>
              <p className="text-white/60 text-xs leading-relaxed">{secretariat.desc}</p>
            </div>
            <div className="flex justify-center"><div className="w-px h-4 bg-gray-300" /></div>
            <div className="space-y-2 pl-4 border-l-2 border-gray-200">
              {secretariat.directions.map(d => (
                <div key={d.abbr} className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-start gap-3">
                  <span className="px-2 py-0.5 bg-gray-200 text-gray-700 rounded text-xs font-bold flex-shrink-0 mt-0.5">{d.abbr}</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-xs leading-snug">{d.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Direction Générale */}
          <div className="space-y-3">
            <div className={`${directionGenerale.color} text-white rounded-xl p-5`}>
              <div className="flex items-center gap-3 mb-1">
                <directionGenerale.icon className="h-5 w-5 text-white/80" />
                <p className="font-bold text-sm leading-snug">{directionGenerale.titre}</p>
              </div>
              <p className="text-white/60 text-xs leading-relaxed">{directionGenerale.desc}</p>
            </div>
            <div className="flex justify-center"><div className="w-px h-4 bg-gray-300" /></div>
            <div className="space-y-2 pl-4 border-l-2 border-primary-200">
              {directionGenerale.directions.map(d => (
                <div key={d.abbr} className="bg-primary-50 border border-primary-100 rounded-xl p-4 flex items-start gap-3">
                  <span className="px-2 py-0.5 bg-primary-200 text-primary-800 rounded text-xs font-bold flex-shrink-0 mt-0.5">{d.abbr}</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-xs leading-snug">{d.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Organismes sous tutelle ── */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
            <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center">
              <Building2 className="h-4 w-4 text-white" />
            </div>
            Organismes sous tutelle
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {organismes.map(o => (
              <div key={o.nom} className="bg-white border-l-4 border-gold-500 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <p className="font-semibold text-gray-900 text-sm leading-snug mb-1">{o.nom}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Liens rapides ── */}
        <div className="bg-primary-50 border border-primary-100 rounded-2xl p-6">
          <h3 className="font-bold text-primary-900 text-sm mb-4">En savoir plus sur le Ministère</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: 'Présentation',      href: '/ministere',               icon: Building2 },
              { label: 'Mot du Ministre',   href: '/ministere/mot-ministre',  icon: User      },
              { label: 'Nos Missions',      href: '/ministere/missions',      icon: Globe2    },
            ].map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                to={href}
                className="flex items-center gap-3 px-4 py-3 bg-white border border-primary-200 rounded-xl text-sm font-medium text-primary-700 hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all group"
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {label}
                <ChevronRight className="h-3.5 w-3.5 ml-auto opacity-50 group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
