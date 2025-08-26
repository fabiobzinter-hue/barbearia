'use client'

import { TrendingUp, TrendingDown, Calendar, Users, DollarSign, UserCheck } from 'lucide-react'
import { KPI } from '@/types'
import { cn } from '@/utils'

const iconMap = {
  calendar: Calendar,
  users: Users,
  'dollar-sign': DollarSign,
  'trending-up': TrendingUp,
  'user-check': UserCheck,
}

const colorMap = {
  primary: 'from-primary-500 to-primary-600',
  secondary: 'from-secondary-500 to-secondary-600', 
  accent: 'from-accent-500 to-accent-600',
  success: 'from-green-500 to-green-600',
  warning: 'from-yellow-500 to-yellow-600',
  danger: 'from-red-500 to-red-600',
}

interface KPICardProps {
  kpi: KPI
  className?: string
}

export default function KPICard({ kpi, className }: KPICardProps) {
  const Icon = iconMap[kpi.icone as keyof typeof iconMap] || TrendingUp
  const isPositive = kpi.variacao ? kpi.variacao.percentual > 0 : true
  const TrendIcon = isPositive ? TrendingUp : TrendingDown

  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 card-hover group",
      className
    )}>
      {/* Background gradient overlay */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity",
        colorMap[kpi.cor]
      )} />

      <div className="relative z-10">
        {/* Icon and title */}
        <div className="flex items-start justify-between mb-4">
          <div className={cn(
            "p-3 rounded-xl bg-gradient-to-br",
            colorMap[kpi.cor]
          )}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          
          {kpi.variacao && (
            <div className={cn(
              "flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium",
              isPositive 
                ? "bg-green-500/20 text-green-300" 
                : "bg-red-500/20 text-red-300"
            )}>
              <TrendIcon className="w-3 h-3" />
              <span>{Math.abs(kpi.variacao.percentual)}%</span>
            </div>
          )}
        </div>

        {/* Value */}
        <div className="mb-2">
          <h3 className="text-2xl font-bold text-white">
            {kpi.valor}
          </h3>
        </div>

        {/* Title and variation */}
        <div>
          <p className="text-white/80 font-medium mb-1">
            {kpi.titulo}
          </p>
          {kpi.variacao && (
            <p className="text-white/60 text-sm">
              {kpi.variacao.periodo}
            </p>
          )}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-full -translate-y-10 translate-x-10" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/5 to-transparent rounded-full translate-y-8 -translate-x-8" />
    </div>
  )
}