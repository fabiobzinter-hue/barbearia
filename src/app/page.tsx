'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import Overview from '@/components/Overview'
import ClientManagement from '@/components/ClientManagement'
import ProfessionalManagement from '@/components/ProfessionalManagement'
import AppointmentManagement from '@/components/AppointmentManagement'
import SalesManagement from '@/components/SalesManagement'
import Reports from '@/components/Reports'

// Componentes que serão implementados nas próximas iterações
const Settings = () => (
  <div className="text-white">
    <h1 className="text-3xl font-bold mb-4">Configurações</h1>
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
      <p>Seção de Configurações em desenvolvimento...</p>
    </div>
  </div>
)

const componentMap = {
  overview: Overview,
  clients: ClientManagement,
  professionals: ProfessionalManagement,
  appointments: AppointmentManagement,
  sales: SalesManagement,
  reports: Reports,
  settings: Settings,
}

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('overview')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const ActiveComponent = componentMap[activeSection as keyof typeof componentMap]

  return (
    <div className="min-h-screen bg-gradient-secondary">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
      />
      
      <Header sidebarCollapsed={sidebarCollapsed} />
      
      <main className="lg:ml-64 pt-16 min-h-screen">
        <div className="p-6">
          <ActiveComponent />
        </div>
      </main>
    </div>
  )
}