'use client'

import { useState, useEffect } from 'react'
import { Bell, Search, User, Clock, Wifi } from 'lucide-react'
import { formatDateTime } from '@/utils'
import { cn } from '@/utils'

interface HeaderProps {
  sidebarCollapsed: boolean
}

export default function Header({ sidebarCollapsed }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [searchQuery, setSearchQuery] = useState('')
  const [notifications] = useState(3) // Mock notification count

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <header className={cn(
      "fixed top-0 right-0 h-16 bg-white/10 backdrop-blur-md border-b border-white/20 z-30 transition-all duration-300",
      sidebarCollapsed ? "left-16" : "left-64",
      "lg:left-64"
    )}>
      <div className="flex items-center justify-between h-full px-6">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar clientes, agendamentos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Current time */}
          <div className="hidden sm:flex items-center space-x-2 text-white/80">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">
              {formatDateTime(currentTime)}
            </span>
          </div>

          {/* Status indicator */}
          <div className="flex items-center space-x-2 text-white/80">
            <Wifi className="w-4 h-4 text-green-400" />
            <span className="hidden sm:inline text-sm">Online</span>
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-white/80 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>

          {/* User menu */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-white">Admin</p>
              <p className="text-xs text-white/60">Vince Barbearia</p>
            </div>
            <button className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white hover:scale-105 transition-transform">
              <User className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}