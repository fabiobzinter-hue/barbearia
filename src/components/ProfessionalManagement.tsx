'use client'

import { useState, useMemo } from 'react'
import { Calendar, Star, TrendingUp, Clock, Award, AlertTriangle, Users, DollarSign } from 'lucide-react'
import { mockProfissionais, mockAgendamentos } from '@/lib/mockData'
import { formatCurrency, formatTime, cn } from '@/utils'
import { Profissional } from '@/types'

const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
]

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

// Mock agenda data
const mockAgendaData = {
  '1': [
    { time: '09:00', client: 'Pedro Oliveira', service: 'Corte + Barba', status: 'confirmed' },
    { time: '10:00', client: 'João Santos', service: 'Corte Masculino', status: 'confirmed' },
    { time: '14:00', client: 'Carlos Silva', service: 'Combo Premium', status: 'pending' },
    { time: '15:30', client: 'Walk-in', service: 'Disponível', status: 'available' },
    { time: '16:30', client: 'Miguel Costa', service: 'Barba Completa', status: 'confirmed' },
  ],
  '2': [
    { time: '10:00', client: 'Ana Maria', service: 'Sobrancelha', status: 'confirmed' },
    { time: '11:00', client: 'Rafael Lima', service: 'Combo Premium', status: 'confirmed' },
    { time: '15:00', client: 'Walk-in', service: 'Disponível', status: 'available' },
    { time: '16:00', client: 'Lucas Ferreira', service: 'Corte + Barba', status: 'pending' },
  ],
  '3': [
    { time: '10:30', client: 'Marcos Oliveira', service: 'Barba + Sobrancelha', status: 'confirmed' },
    { time: '14:00', client: 'Walk-in', service: 'Disponível', status: 'available' },
    { time: '15:00', client: 'Roberto Santos', service: 'Barba Completa', status: 'confirmed' },
  ]
}

const statusColors = {
  confirmed: 'bg-green-500/20 border-green-500/30 text-green-300',
  pending: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300',
  available: 'bg-blue-500/20 border-blue-500/30 text-blue-300',
  completed: 'bg-gray-500/20 border-gray-500/30 text-gray-300'
}

export default function ProfessionalManagement() {
  const [selectedProfessional, setSelectedProfessional] = useState<Profissional>(mockProfissionais[0])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<'overview' | 'agenda' | 'performance'>('overview')

  const agendaData = mockAgendaData[selectedProfessional.id as keyof typeof mockAgendaData] || []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Gestão de Profissionais
          </h1>
          <p className="text-white/70">
            Acompanhe performance, agenda e avaliações dos profissionais
          </p>
        </div>

        {/* View Mode Selector */}
        <div className="flex bg-white/10 rounded-lg p-1">
          {[
            { id: 'overview', label: 'Visão Geral' },
            { id: 'agenda', label: 'Agenda' },
            { id: 'performance', label: 'Performance' }
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setViewMode(mode.id as any)}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all",
                viewMode === mode.id
                  ? "bg-gradient-primary text-white"
                  : "text-white/70 hover:text-white"
              )}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Professional Selector */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockProfissionais.map((professional) => (
            <button
              key={professional.id}
              onClick={() => setSelectedProfessional(professional)}
              className={cn(
                "p-4 rounded-xl border transition-all text-left",
                selectedProfessional.id === professional.id
                  ? "bg-gradient-primary border-primary-400"
                  : "bg-white/5 border-white/20 hover:bg-white/10"
              )}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center text-white font-bold">
                  {professional.nome.charAt(0)}
                </div>
                <div>
                  <h3 className="text-white font-bold">{professional.nome}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white/80 text-sm">{professional.avaliacao.media}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-center bg-white/10 rounded py-1">
                  <p className="text-white font-medium">{professional.estatisticas.atendimentosHoje}</p>
                  <p className="text-white/60">Hoje</p>
                </div>
                <div className="text-center bg-white/10 rounded py-1">
                  <p className="text-white font-medium">{professional.estatisticas.ocupacao}%</p>
                  <p className="text-white/60">Ocupação</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content based on view mode */}
      {viewMode === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Professional Stats */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Estatísticas de {selectedProfessional.nome}</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span className="text-white">Atendimentos Hoje</span>
                </div>
                <span className="text-white font-bold text-xl">{selectedProfessional.estatisticas.atendimentosHoje}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  <span className="text-white">Receita Hoje</span>
                </div>
                <span className="text-white font-bold text-xl">{formatCurrency(selectedProfessional.estatisticas.receitaHoje)}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  <span className="text-white">Taxa de Ocupação</span>
                </div>
                <span className="text-white font-bold text-xl">{selectedProfessional.estatisticas.ocupacao}%</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-white">Avaliação Média</span>
                </div>
                <div className="text-right">
                  <span className="text-white font-bold text-xl">{selectedProfessional.avaliacao.media}</span>
                  <p className="text-white/60 text-sm">({selectedProfessional.avaliacao.totalAvaliacoes} avaliações)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Specialties and Schedule */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Detalhes do Profissional</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-white font-medium mb-3">Especialidades</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProfessional.especialidades.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-primary rounded-full text-white text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-white font-medium mb-3">Horário de Trabalho</h4>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-white mb-2">
                    <Clock className="w-4 h-4 inline mr-2" />
                    {selectedProfessional.agenda.horarioInicio} - {selectedProfessional.agenda.horarioFim}
                  </p>
                  <div className="flex space-x-1">
                    {weekDays.map((day, index) => (
                      <span
                        key={index}
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-xs",
                          selectedProfessional.agenda.diasTrabalho.includes(index)
                            ? "bg-green-500 text-white"
                            : "bg-white/10 text-white/50"
                        )}
                      >
                        {day.charAt(0)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'agenda' && (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Agenda de {selectedProfessional.nome}</h3>
            <input
              type="date"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agendaData.map((appointment, index) => (
              <div
                key={index}
                className={cn(
                  "p-4 rounded-lg border",
                  statusColors[appointment.status as keyof typeof statusColors]
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-lg">{appointment.time}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-white/20">
                    {appointment.status === 'confirmed' ? 'Confirmado' :
                     appointment.status === 'pending' ? 'Pendente' :
                     appointment.status === 'available' ? 'Disponível' : 'Concluído'}
                  </span>
                </div>
                <h4 className="font-medium mb-1">{appointment.client}</h4>
                <p className="text-sm opacity-80">{appointment.service}</p>
              </div>
            ))}
          </div>

          {agendaData.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">Agenda Livre</h4>
              <p className="text-white/60">Nenhum agendamento para esta data</p>
            </div>
          )}
        </div>
      )}

      {viewMode === 'performance' && (
        <div className="space-y-6">
          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Award className="w-8 h-8 text-yellow-400" />
                <h3 className="text-white font-bold">Conquistas</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/80">Melhor avaliação do mês</span>
                  <span className="text-yellow-400">🏆</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">100+ atendimentos</span>
                  <span className="text-blue-400">⭐</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Cliente fiel (50 retornos)</span>
                  <span className="text-green-400">💚</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <TrendingUp className="w-8 h-8 text-green-400" />
                <h3 className="text-white font-bold">Crescimento</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/80">Receita vs mês anterior</span>
                  <span className="text-green-400">+12%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Avaliação média</span>
                  <span className="text-green-400">+0.3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Clientes novos</span>
                  <span className="text-green-400">+8</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="w-8 h-8 text-orange-400" />
                <h3 className="text-white font-bold">Pontos de Atenção</h3>
              </div>
              <div className="space-y-3">
                <div className="text-orange-300 text-sm">
                  • 2 cancelamentos recentes
                </div>
                <div className="text-orange-300 text-sm">
                  • Horário de almoço muito longo
                </div>
                <div className="text-blue-300 text-sm">
                  • Oportunidade: upsell de produtos
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Recent */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Feedbacks Recentes</h3>
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">Pedro Oliveira</span>
                  <div className="flex items-center space-x-1">
                    {[1,2,3,4,5].map(star => (
                      <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-white/80 text-sm">
                  "Excelente profissional! Sempre muito atencioso e faz exatamente o que peço. Recomendo!"
                </p>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">Carlos Santos</span>
                  <div className="flex items-center space-x-1">
                    {[1,2,3,4].map(star => (
                      <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                    <Star className="w-4 h-4 text-white/30" />
                  </div>
                </div>
                <p className="text-white/80 text-sm">
                  "Muito bom, mas o atendimento demorou um pouco mais que o esperado."
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}