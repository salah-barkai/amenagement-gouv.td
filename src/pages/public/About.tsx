import { Building2, Globe2, Home, MapPin, Phone, Mail, Clock, Users, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { MinistrySubNav } from '@/components/ministry/MinistrySubNav'

const stats = [
  { value: '1 284 000', unit: 'km²', label: 'Territoire national' },
  { value: '23',        unit: '',    label: 'Régions couvertes'  },
  { value: '12 450',    unit: '',    label: 'Logements livrés'   },
  { value: '87',        unit: '',    label: "Plans d'urbanisme"  },
]

const directions = [
  { abbr: 'DGAT', name: "Direction Générale de l'Aménagement du Territoire",  desc: "Planification et coordination du développement territorial national. Élaboration des schémas directeurs régionaux.",                          border: 'border-l-primary-500', bg: 'bg-primary-50', badge: 'bg-primary-100 text-primary-700' },
  { abbr: 'DUA',  name: "Direction de l'Urbanisme et de l'Architecture",       desc: "Plans directeurs d'urbanisme, permis de construire, contrôle des constructions et promotion de l'architecture adaptée.",                    border: 'border-l-blue-500',    bg: 'bg-blue-50',    badge: 'bg-blue-100 text-blue-700'    },
  { abbr: 'DH',   name: "Direction de l'Habitat",                              desc: "Politique nationale du logement, programmes d'habitat social et amélioration des conditions de vie des populations.",                         border: 'border-l-green-500',   bg: 'bg-green-50',   badge: 'bg-green-100 text-green-700'  },
  { abbr: 'DAF',  name: "Direction des Affaires Foncières",                    desc: "Gestion du domaine foncier de l'État, cadastre national et sécurisation des droits fonciers des citoyens.",                                  border: 'border-l-amber-500',   bg: 'bg-amber-50',   badge: 'bg-amber-100 text-amber-700'  },
  { abbr: 'DEP',  name: "Direction des Études et de la Planification",         desc: "Études sectorielles, statistiques, planification stratégique et coopération technique internationale.",                                       border: 'border-l-purple-500',  bg: 'bg-purple-50',  badge: 'bg-purple-100 text-purple-700'},
  { abbr: 'SG',   name: "Secrétariat Général",                                 desc: "Coordination administrative, ressources humaines, gestion financière et communication institutionnelle du ministère.",                        border: 'border-l-gray-400',    bg: 'bg-gray-50',    badge: 'bg-gray-100 text-gray-600'    },
]

const domaines = [
  { icon: Globe2,    title: "Aménagement du Territoire", desc: "Organisation optimale de l'espace national pour un développement harmonieux entre les 23 régions.",               img: '/images/descende.jpg',  grad: 'from-primary-800/80 to-primary-600/60' },
  { icon: Home,      title: "Habitat & Logement",        desc: "Promotion du logement social et accès à un habitat décent pour tous les citoyens tchadiens.",                      img: '/images/activite-1.jpg', grad: 'from-green-800/80 to-green-600/60'   },
  { icon: Building2, title: "Urbanisme & Architecture",  desc: "Planification urbaine, permis de construire et développement de villes durables et inclusives.",                   img: '/images/reunion.jpg',   grad: 'from-blue-800/80 to-blue-600/60'     },
]

const gallery = [
  { src: '/images/ceremonie.jpg',           label: 'Cérémonie officielle'      },
  { src: '/images/reunion.jpg',             label: 'Réunion technique'         },
  { src: '/images/descende.jpg',            label: 'Descente de terrain'       },
  { src: '/images/jif.jpg',                 label: 'JIF 2026'                  },
  { src: '/images/parlement-panafricain.jpg', label: 'Parlement Panafricain'   },
  { src: '/images/visite-azerbaidjan.jpg',  label: 'Coopération internationale'},
]

export default function About() {
  return (
    <div>
      {/* ── Banner ── */}
      <div className="relative py-24 overflow-hidden">
        <img src="/images/batiment.jpg" alt="Siège du Ministère" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/92 to-primary-800/60" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex h-1.5 mb-5 w-20 rounded-full overflow-hidden">
            <div className="flex-1 bg-tchad-blue" /><div className="flex-1 bg-tchad-yellow" /><div className="flex-1 bg-tchad-red" />
          </div>
          <p className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-2">Le Ministère</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">Présentation</h1>
          <p className="text-white/65 mt-3 max-w-xl text-base">
            Ministère de l'Aménagement du Territoire, de l'Habitat et de l'Urbanisme — République du Tchad
          </p>
        </div>
      </div>

      {/* ── Tabs navigation ── */}
      <MinistrySubNav />

      {/* ── Stats ── */}
      <div className="bg-primary-700">
        <div className="max-w-7xl mx-auto px-4 py-7">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-primary-600">
            {stats.map(s => (
              <div key={s.label} className="text-center px-4">
                <p className="text-3xl font-extrabold text-white">
                  {s.value}
                  {s.unit && <span className="text-base font-normal text-primary-200 ml-1">{s.unit}</span>}
                </p>
                <p className="text-primary-200 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── Colonne principale ── */}
          <div className="lg:col-span-2 space-y-12">

            {/* Qui sommes-nous */}
            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Qui sommes-nous ?</h2>
              </div>
              <div className="bg-white rounded-2xl border shadow-sm p-7 space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Le <strong className="text-primary-800">Ministère de l'Aménagement du Territoire, de l'Habitat et de l'Urbanisme (MATUH)</strong> est l'institution gouvernementale de la République du Tchad chargée d'élaborer et de mettre en œuvre la politique nationale en matière d'aménagement du territoire, d'habitat et d'urbanisme.
                </p>
                <p>
                  Établi à <strong>N'Djaména</strong>, le Ministère intervient sur l'ensemble des <strong>1 284 000 km²</strong> du territoire national — couvrant 23 régions, du Sahara au nord aux plaines fertiles du Logone-Chari au sud — pour garantir un développement spatial équilibré, durable et inclusif.
                </p>
                <p>
                  Notre vision est de transformer le Tchad en modèle d'aménagement territorial intégré, avec des villes contemporaines, durables et inclusives. À l'horizon <strong>2030</strong>, nous ambitionnons d'avoir posé les fondements d'un urbanisme responsable, d'un habitat décent pour tous et d'une gestion foncière sécurisée et moderne.
                </p>
                <div className="pt-4 border-t border-dashed border-gray-200">
                  <img src="/images/batiment.jpg" alt="Siège du MATUH" className="w-full h-52 object-cover rounded-xl" />
                  <p className="text-xs text-gray-400 mt-2 text-center">Siège du Ministère — Avenue Charles de Gaulle, N'Djaména</p>
                </div>
              </div>
            </section>

            {/* Domaines d'intervention */}
            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 bg-gold-500 rounded-xl flex items-center justify-center">
                  <Globe2 className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Domaines d'Intervention</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {domaines.map(d => (
                  <Link key={d.title} to="/ministere/missions" className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                    <div className="relative h-48">
                      <img src={d.img} alt={d.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className={`absolute inset-0 bg-gradient-to-t ${d.grad}`} />
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-end p-4">
                      <d.icon className="h-6 w-6 text-white/80 mb-2" />
                      <h3 className="font-bold text-white text-sm leading-snug">{d.title}</h3>
                      <p className="text-white/65 text-xs mt-1 leading-relaxed line-clamp-2">{d.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-4 text-right">
                <Link to="/ministere/missions" className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:underline">
                  Voir toutes nos missions <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </section>

            {/* Structure organisationnelle */}
            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Structure Organisationnelle</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {directions.map(d => (
                  <div key={d.abbr} className={`p-5 border-l-4 ${d.border} ${d.bg} rounded-xl hover:shadow-sm transition-shadow`}>
                    <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-2 ${d.badge}`}>{d.abbr}</span>
                    <h4 className="font-semibold text-gray-900 text-sm leading-snug mb-1">{d.name}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{d.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Galerie activités */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-5">Nos Activités</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {gallery.map(img => (
                  <div key={img.src} className="relative rounded-xl overflow-hidden aspect-video group cursor-default">
                    <img src={img.src} alt={img.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2.5">
                      <span className="text-white text-xs font-medium leading-tight">{img.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-6">

            {/* Mot du Ministre */}
            <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-100">
              <div className="relative h-56">
                <img src="/images/ministre-officiel.jpg" alt="Le Ministre" className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex h-0.5 mb-2 w-10">
                    <div className="flex-1 bg-tchad-blue" /><div className="flex-1 bg-tchad-yellow" /><div className="flex-1 bg-tchad-red" />
                  </div>
                  <p className="text-gold-300 font-bold text-sm">M. Mahamat Assileck Halata</p>
                  <p className="text-white/55 text-xs mt-0.5">Ministre — MATUH</p>
                </div>
              </div>
              <div className="bg-primary-800 p-4">
                <p className="text-sm italic text-white/85 leading-relaxed">
                  « Notre ambition est de construire un Tchad prospère, où chaque citoyen bénéficie d'un cadre de vie digne et d'une ville bien planifiée. »
                </p>
              </div>
              <Link to="/ministere/mot-ministre" className="flex items-center justify-center gap-2 bg-primary-700 text-white text-sm font-semibold py-3 hover:bg-primary-600 transition-colors">
                Lire le message complet <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Logo & Devise */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border text-center">
              <img src="/images/logo.jpg" alt="Armoiries" className="w-28 h-28 object-contain mx-auto mb-3" />
              <p className="font-bold text-gray-900 text-sm">MATUH</p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Ministère de l'Aménagement du Territoire,<br />de l'Habitat et de l'Urbanisme
              </p>
              <div className="flex justify-center items-center gap-2 mt-4 pt-3 border-t">
                <span className="text-xs font-bold text-tchad-blue tracking-widest">UNITÉ</span>
                <span className="text-gold-500 font-bold">·</span>
                <span className="text-xs font-bold text-tchad-yellow tracking-widest">TRAVAIL</span>
                <span className="text-gold-500 font-bold">·</span>
                <span className="text-xs font-bold text-tchad-red tracking-widest">PROGRÈS</span>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gray-50 rounded-2xl p-5 border space-y-3">
              <h3 className="font-bold text-gray-800 text-sm mb-4">Nous contacter</h3>
              {[
                { icon: MapPin, text: "Avenue Charles de Gaulle, N'Djaména" },
                { icon: Phone,  text: '+235 66 53 57 19'                     },
                { icon: Mail,   text: 'contact@amenagement.gouv.td'          },
                { icon: Clock,  text: 'Lun – Ven : 7h30 – 15h30'            },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3 text-sm text-gray-600">
                  <Icon className="h-4 w-4 text-primary-400 mt-0.5 flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
              <div className="pt-3">
                <Link to="/contact" className="block w-full text-center bg-primary-600 text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-primary-700 transition-colors">
                  Envoyer un message
                </Link>
              </div>
            </div>

            {/* Lien vers missions */}
            <Link to="/ministere/missions" className="flex items-center gap-4 p-5 bg-primary-600 rounded-2xl text-white hover:bg-primary-700 transition-colors shadow-sm group">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Globe2 className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm">Nos missions</p>
                <p className="text-white/70 text-xs mt-0.5">Aménagement · Habitat · Urbanisme · Foncier</p>
              </div>
              <ChevronRight className="h-5 w-5 text-white/50 group-hover:text-white transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
