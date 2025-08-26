'use client'

import { useState } from 'react'
import { 
  BarChart3, 
  Users, 
  UserCheck, 
  Calendar, 
  ShoppingBag, 
  FileText, 
  Settings,
  Menu,
  X,
  Scissors
} from 'lucide-react'
import { cn } from '@/utils'

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const menuItems = [
  { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
  { id: 'clients', label: 'Clientes', icon: Users },
  { id: 'professionals', label: 'Profissionais', icon: UserCheck },
  { id: 'appointments', label: 'Agendamentos', icon: Calendar },
  { id: 'sales', label: 'Vendas', icon: ShoppingBag },
  { id: 'reports', label: 'Relatórios', icon: FileText },
  { id: 'settings', label: 'Configurações', icon: Settings },
]

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-primary-500 text-white p-3 rounded-lg shadow-lg"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-full bg-gradient-to-b from-primary-900 to-primary-950 text-white z-50 transition-all duration-300 shadow-2xl",
        isCollapsed ? "w-16" : "w-64",
        isMobileOpen ? "translate-x-0" : "-translate-x-full",
        "lg:translate-x-0"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-primary-800">
          <div className={cn("flex items-center space-x-3", isCollapsed && "justify-center")}>
            <div className="bg-gradient-primary p-2 rounded-lg">
              <Scissors className="w-8 h-8 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-primary-200 bg-clip-text text-transparent">
                  Vince Barbearia
                </h1>
                <p className="text-sm text-primary-300">Dashboard</p>
              </div>
            )}
          </div>
          
          {/* Desktop collapse button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:block text-primary-300 hover:text-white transition-colors"
          >
            {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </button>

          {/* Mobile close button */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden text-primary-300 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onSectionChange(item.id)
                      setIsMobileOpen(false)
                    }}
                    className={cn(
                      "w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group",
                      isActive 
                        ? "bg-gradient-primary text-white shadow-lg" 
                        : "text-primary-200 hover:bg-primary-800 hover:text-white",
                      isCollapsed && "justify-center"
                    )}
                  >
                    <Icon className={cn(
                      "w-5 h-5 transition-transform duration-200",
                      isActive && "scale-110",
                      !isActive && "group-hover:scale-105"
                    )} />
                    {!isCollapsed && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-primary-800">
          <div className={cn(
            "flex items-center space-x-3 text-primary-300",
            isCollapsed && "justify-center"
          )}>
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
              I
            </div>
            {!isCollapsed && (
              <div>
                <p className="text-sm font-medium text-white">Isa - AI Assistant</p>
                <p className="text-xs">Online</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}