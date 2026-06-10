import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-primary-900 text-white">
      {/* Bande drapeau */}
      <div className="flex h-1">
        <div className="flex-1 bg-tchad-blue" />
        <div className="flex-1 bg-tchad-yellow" />
        <div className="flex-1 bg-tchad-red" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Colonne 1 : Identité */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/logo.jpg"
                alt="Logo MATUH"
                className="w-12 h-12 object-contain bg-white rounded-full p-0.5 flex-shrink-0"
              />
              <div>
                <p className="font-bold text-sm leading-tight">Ministère de l'Aménagement</p>
                <p className="text-xs text-white/70 leading-tight">du Territoire, de l'Habitat<br/>et de l'Urbanisme</p>
              </div>
            </div>
            <p className="text-white/60 text-sm">
              Portail officiel du Ministère de l'Aménagement du Territoire, de l'Habitat et de l'Urbanisme de la République du Tchad.
            </p>
          </div>

          {/* Colonne 2 : Navigation */}
          <div>
            <h3 className="font-semibold text-gold-400 mb-4 uppercase text-xs tracking-wider">Navigation</h3>
            <ul className="space-y-2 text-sm text-white/70">
              {[
                { label: 'Accueil', href: '/' },
                { label: 'Le Ministère', href: '/ministere' },
                { label: 'Actualités', href: '/actualites' },
                { label: 'Projets', href: '/projets' },
                { label: 'Documents', href: '/documents' },
                { label: 'Contact', href: '/contact' },
              ].map(link => (
                <li key={link.href}>
                  <Link to={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 : Le Ministère */}
          <div>
            <h3 className="font-semibold text-gold-400 mb-4 uppercase text-xs tracking-wider">Le Ministère</h3>
            <ul className="space-y-2 text-sm text-white/70">
              {[
                { label: 'Présentation', href: '/ministere' },
                { label: 'Mot du Ministre', href: '/ministere/mot-ministre' },
                { label: 'Missions & Attributions', href: '/ministere/missions' },
                { label: 'Organigramme', href: '/ministere/organigramme' },
              ].map(link => (
                <li key={link.href}>
                  <Link to={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 : Contact */}
          <div>
            <h3 className="font-semibold text-gold-400 mb-4 uppercase text-xs tracking-wider">Nous contacter</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gold-400 mt-0.5 flex-shrink-0" />
                <span>Avenue Charles de Gaulle, N'Djaména, République du Tchad</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold-400 flex-shrink-0" />
                <a href="tel:+23566535719" className="hover:text-white">+235 66 53 57 19</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gold-400 flex-shrink-0" />
                <a href="mailto:contact@amenagement.gouv.td" className="hover:text-white">contact@amenagement.gouv.td</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Portails gouvernementaux */}
      <div className="border-t border-primary-700/60 bg-primary-950/30">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4 text-center">Portails Gouvernementaux</p>
          <div className="flex flex-wrap justify-center items-center gap-3">
            {[
              { label: 'Présidence de la République', href: 'http://www.presidence.td', short: 'Présidence' },
              { label: 'Primature — Premier Ministère', href: 'http://www.primature.gouv.td', short: 'Primature' },
              { label: 'Secrétariat Général du Gouvernement', href: 'http://www.sgg.gouv.td', short: 'SGG' },
            ].map(link => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-primary-700/50 border border-primary-600/40 rounded-full text-xs text-white/70 hover:bg-primary-600/60 hover:text-white transition-all"
              >
                <ExternalLink className="h-3 w-3 flex-shrink-0" />
                <span className="hidden sm:inline">{link.label}</span>
                <span className="sm:hidden">{link.short}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bas du footer */}
      <div className="border-t border-primary-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Ministère de l'Aménagement du Territoire, de l'Habitat et de l'Urbanisme — Tous droits réservés</p>
          <p>République du Tchad</p>
        </div>
      </div>
    </footer>
  )
}
