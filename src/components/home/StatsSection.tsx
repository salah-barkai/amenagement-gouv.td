import { Building2, MapPin, Users, FileCheck } from 'lucide-react'

const stats = [
  { icon: Building2, value: '5 000+', label: 'Logements sociaux programmés', color: 'bg-primary-500' },
  { icon: MapPin,    value: '23',     label: 'Régions du Tchad couvertes',   color: 'bg-gold-500' },
  { icon: Users,     value: '15M+',   label: 'Citoyens bénéficiaires',       color: 'bg-tchad-red' },
  { icon: FileCheck, value: '120+',   label: 'Textes réglementaires publiés', color: 'bg-green-600' },
]

export function StatsSection() {
  return (
    <section className="bg-white py-12 border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(stat => (
            <div key={stat.label} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className={`${stat.color} rounded-lg p-3 flex-shrink-0`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 leading-tight">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
