'use client'

import { useState, useEffect } from 'react'
import KPICard from './KPICard'
import { mockKPIs, mockRelatorio, mockProfissionais } from '@/lib/mockData'
import { formatCurrency, getOccupationColor } from '@/utils'

// Simulando Chart.js para não ter problemas de dependency
const mockChartData = {
  occupationByHour: [
    { hour: '08:00', occupation: 45 },
    { hour: '09:00', occupation: 67 },
    { hour: '10:00', occupation: 89 },
    { hour: '11:00', occupation: 92 },
    { hour: '12:00', occupation: 30 },
    { hour: '13:00', occupation: 25 },
    { hour: '14:00', occupation: 95 },
    { hour: '15:00', occupation: 98 },
    { hour: '16:00', occupation: 88 },
    { hour: '17:00', occupation: 76 },
    { hour: '18:00', occupation: 45 },
  ],
  revenueByService: [
    { service: 'Corte Masculino', revenue: 4800, percentage: 35 },
    { service: 'Combo Premium', revenue: 3200, percentage: 25 },
    { service: 'Barba Completa', revenue: 2400, percentage: 20 },
    { service: 'Sobrancelha', revenue: 1600, percentage: 20 },
  ]
}

export default function Overview() {
  const [selectedPeriod, setSelectedPeriod] = useState('today')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Visão Geral
          </h1>
          <p className="text-white/70">
            Acompanhe as métricas principais da sua barbearia em tempo real
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
          >
            <option value="today">Hoje</option>
            <option value="week">Esta Semana</option>
            <option value="month">Este Mês</option>
          </select>
        </div>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {mockKPIs.map((kpi, index) => (
          <KPICard key={index} kpi={kpi} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ocupação por Horário */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Ocupação por Horário</h3>
          <div className="space-y-3">
            {mockChartData.occupationByHour.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-white/80 text-sm w-16">{item.hour}</span>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-white/10 rounded-full h-3">
                    <div
                      className="h-3 rounded-full transition-all duration-500"
                      style={{
                        width: `${item.occupation}%`,
                        background: `linear-gradient(90deg, ${getOccupationColor(item.occupation)} 0%, ${getOccupationColor(item.occupation)}80 100%)`
                      }}
                    />
                  </div>
                </div>
                <span className="text-white font-medium text-sm w-12 text-right">{item.occupation}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Receita por Serviço */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Receita por Serviço</h3>
          <div className="space-y-4">
            {mockChartData.revenueByService.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">{item.service}</span>
                  <span className="text-white font-medium">{formatCurrency(item.revenue)}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ranking dos Profissionais */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-6">Ranking dos Profissionais</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockProfissionais.map((profissional, index) => (
            <div key={profissional.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                    {profissional.nome.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{profissional.nome}</h4>
                    <p className="text-white/60 text-sm">
                      ⭐ {profissional.avaliacao.media} ({profissional.avaliacao.totalAvaliacoes} avaliações)
                    </p>
                  </div>
                </div>
                <div className={`text-2xl ${index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-400' : 'text-yellow-600'}`}>
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Atendimentos hoje:</span>
                  <span className="text-white font-medium">{profissional.estatisticas.atendimentosHoje}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Receita hoje:</span>
                  <span className="text-white font-medium">{formatCurrency(profissional.estatisticas.receitaHoje)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Ocupação:</span>
                  <span className="text-white font-medium">{profissional.estatisticas.ocupacao}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alertas Inteligentes */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-6">🤖 Alertas Inteligentes da Isa</h3>
        <div className="space-y-4">
          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                ⚠️
              </div>
              <div>
                <p className="text-white font-medium">Horário de pico detectado</p>
                <p className="text-white/70 text-sm">Das 14h às 17h há alta demanda. Considere adicionar um profissional extra.</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                💡
              </div>
              <div>
                <p className="text-white font-medium">Oportunidade de upsell</p>
                <p className="text-white/70 text-sm">Clientes que fazem apenas corte têm 73% de aceitação para combo. Sugira na recepção!</p>
              </div>
            </div>
          </div>

          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                📈
              </div>
              <div>
                <p className="text-white font-medium">Meta mensal em dia</p>
                <p className="text-white/70 text-sm">Você está 15% acima da meta. Continue assim para bater o recorde!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}