'use client'

import { useState, useMemo } from 'react'
import { Calendar, Clock, Plus, Filter, MapPin, Phone, MessageSquare, CheckCircle, XCircle, AlertCircle, Users } from 'lucide-react'
import { mockAgendamentos, mockClientes, mockProfissionais, mockServicos } from '@/lib/mockData'
import { formatDateTime, formatTime, formatCurrency, cn } from '@/utils'
import { Agendamento } from '@/types'

const statusConfig = {
  agendado: { 
    label: 'Agendado', 
    color: 'bg-blue-500/20 border-blue-500/30 text-blue-300',
    icon: Clock 
  },
  confirmado: { 
    label: 'Confirmado', 
    color: 'bg-green-500/20 border-green-500/30 text-green-300',
    icon: CheckCircle 
  },
  em_andamento: { 
    label: 'Em Andamento', 
    color: 'bg-purple-500/20 border-purple-500/30 text-purple-300',
    icon: Users 
  },
  concluido: { 
    label: 'Concluído', 
    color: 'bg-gray-500/20 border-gray-500/30 text-gray-300',
    icon: CheckCircle 
  },
  cancelado: { 
    label: 'Cancelado', 
    color: 'bg-red-500/20 border-red-500/30 text-red-300',
    icon: XCircle 
  }
}

// Mock walk-in queue
const mockWalkInQueue = [
  { id: '1', nome: 'João Silva', chegada: new Date(), posicao: 1, servicoSolicitado: 'Corte Masculino' },
  { id: '2', nome: 'Pedro Santos', chegada: new Date(), posicao: 2, servicoSolicitado: 'Barba Completa' },
  { id: '3', nome: 'Carlos Lima', chegada: new Date(), posicao: 3, servicoSolicitado: 'Combo Premium' },
]

// Generate time slots for the day
const generateTimeSlots = () => {
  const slots = []
  for (let hour = 8; hour <= 19; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      slots.push(time)
    }
  }
  return slots
}

const timeSlots = generateTimeSlots()

export default function AppointmentManagement() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedView, setSelectedView] = useState<'calendar' | 'list' | 'walkin'>('calendar')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [selectedAppointment, setSelectedAppointment] = useState<Agendamento | null>(null)

  const filteredAppointments = useMemo(() => {
    let filtered = mockAgendamentos

    if (selectedFilter !== 'all') {
      filtered = filtered.filter(appointment => appointment.status === selectedFilter)
    }

    return filtered
  }, [selectedFilter])

  const getClientById = (id: string) => mockClientes.find(c => c.id === id)
  const getProfessionalById = (id: string) => mockProfissionais.find(p => p.id === id)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Agendamentos
          </h1>
          <p className="text-white/70">
            Gerencie agendamentos, walk-ins e integração com Google Calendar
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button className="bg-green-500 px-4 py-2 rounded-lg text-white font-medium hover:scale-105 transition-transform flex items-center space-x-2">
            <MessageSquare className="w-4 h-4" />
            <span>Sync WhatsApp</span>
          </button>
          <button className="bg-gradient-primary px-6 py-3 rounded-lg text-white font-medium hover:scale-105 transition-transform flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Novo Agendamento</span>
          </button>
        </div>
      </div>

      {/* Top Controls */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Date Picker */}
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-white/60" />
            <input
              type="date"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>

          {/* View Selector */}
          <div className="flex bg-white/10 rounded-lg p-1">
            {[
              { id: 'calendar', label: 'Calendário' },
              { id: 'list', label: 'Lista' },
              { id: 'walkin', label: 'Walk-in' }
            ].map((view) => (
              <button
                key={view.id}
                onClick={() => setSelectedView(view.id as any)}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-all",
                  selectedView === view.id
                    ? "bg-gradient-primary text-white"
                    : "text-white/70 hover:text-white"
                )}
              >
                {view.label}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-white/60" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-400"
            >
              <option value="all">Todos os status</option>
              <option value="agendado">Agendado</option>
              <option value="confirmado">Confirmado</option>
              <option value="em_andamento">Em Andamento</option>
              <option value="concluido">Concluído</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{mockAgendamentos.length}</p>
            <p className="text-white/70 text-sm">Agendamentos Hoje</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{mockWalkInQueue.length}</p>
            <p className="text-white/70 text-sm">Walk-ins na Fila</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">85%</p>
            <p className="text-white/70 text-sm">Taxa de Ocupação</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">R$ 1.280</p>
            <p className="text-white/70 text-sm">Receita Prevista</p>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      {selectedView === 'calendar' && (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Mapa de Horários</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {mockProfissionais.map((professional) => (
              <div key={professional.id} className="space-y-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-secondary rounded-full flex items-center justify-center text-white font-bold">
                    {professional.nome.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{professional.nome}</h4>
                    <p className="text-white/60 text-sm">Ocupação: {professional.estatisticas.ocupacao}%</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {timeSlots.slice(0, 12).map((time) => {
                    const appointment = filteredAppointments.find(apt => 
                      formatTime(apt.dataHora) === time && apt.profissionalId === professional.id
                    )
                    
                    return (
                      <div
                        key={time}
                        className={cn(
                          "p-3 rounded-lg border text-sm cursor-pointer transition-all",
                          appointment 
                            ? statusConfig[appointment.status]?.color || 'bg-white/5 border-white/20'
                            : 'bg-white/5 border-white/20 hover:bg-white/10'
                        )}
                        onClick={() => appointment && setSelectedAppointment(appointment)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-white font-medium">{time}</span>
                          {appointment && (
                            <span className="text-xs px-2 py-1 rounded-full bg-white/20">
                              {statusConfig[appointment.status]?.label}
                            </span>
                          )}
                        </div>
                        {appointment ? (
                          <div className="mt-1">
                            <p className="text-white font-medium">
                              {getClientById(appointment.clienteId)?.nome}
                            </p>
                            <p className="text-white/70 text-xs">
                              {appointment.servicos.join(', ')}
                            </p>
                          </div>
                        ) : (
                          <p className="text-white/50 mt-1">Disponível</p>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* List View */}
      {selectedView === 'list' && (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Lista de Agendamentos</h3>
          
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => {
              const client = getClientById(appointment.clienteId)
              const professional = getProfessionalById(appointment.profissionalId)
              const config = statusConfig[appointment.status]
              const StatusIcon = config?.icon || Clock

              return (
                <div
                  key={appointment.id}
                  className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                  onClick={() => setSelectedAppointment(appointment)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                        {client?.nome.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-white font-bold">{client?.nome}</h4>
                        <p className="text-white/70 text-sm">
                          {formatDateTime(appointment.dataHora)} • {professional?.nome}
                        </p>
                      </div>
                    </div>
                    
                    <div className={cn("px-3 py-1 rounded-full text-sm flex items-center space-x-2", config?.color)}>
                      <StatusIcon className="w-4 h-4" />
                      <span>{config?.label}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-white/80 text-sm">
                      <p>Serviços: {appointment.servicos.join(', ')}</p>
                      <p>Duração: {appointment.duracao} min • Valor: {formatCurrency(appointment.valor)}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-green-400 hover:bg-green-500/20 rounded">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-blue-400 hover:bg-blue-500/20 rounded">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Walk-in View */}
      {selectedView === 'walkin' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Walk-in Queue */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Fila Walk-in</h3>
              <button className="bg-gradient-primary px-4 py-2 rounded-lg text-white font-medium">
                Adicionar à Fila
              </button>
            </div>

            <div className="space-y-4">
              {mockWalkInQueue.map((customer, index) => (
                <div key={customer.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {customer.posicao}
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{customer.nome}</h4>
                        <p className="text-white/60 text-sm">
                          Chegada: {formatTime(customer.chegada)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-white/80 text-sm">{customer.servicoSolicitado}</p>
                      <p className="text-white/60 text-xs">~30 min</p>
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-3">
                    <button className="flex-1 bg-green-500 text-white py-2 rounded text-sm font-medium">
                      Atender Agora
                    </button>
                    <button className="px-4 bg-white/10 text-white py-2 rounded text-sm">
                      Agendar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Encaixes Sugeridos */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">🤖 Sugestões da Isa</h3>
            
            <div className="space-y-4">
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <AlertCircle className="w-5 h-5 text-blue-300" />
                  <h4 className="text-blue-300 font-medium">Encaixe Disponível</h4>
                </div>
                <p className="text-white/80 text-sm mb-3">
                  João Silva pode ser encaixado às 14:30 com Carlos Santos (15 min livres)
                </p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded text-sm font-medium">
                  Confirmar Encaixe
                </button>
              </div>

              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <h4 className="text-green-300 font-medium">Otimização de Agenda</h4>
                </div>
                <p className="text-white/80 text-sm mb-3">
                  Reagendando 2 clientes, você pode liberar 45 min para walk-ins
                </p>
                <button className="bg-green-500 text-white px-4 py-2 rounded text-sm font-medium">
                  Aplicar Sugestão
                </button>
              </div>

              <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Users className="w-5 h-5 text-purple-300" />
                  <h4 className="text-purple-300 font-medium">Upsell Opportunity</h4>
                </div>
                <p className="text-white/80 text-sm mb-3">
                  Pedro Santos (próximo cliente) tem histórico de aceitar combo premium
                </p>
                <button className="bg-purple-500 text-white px-4 py-2 rounded text-sm font-medium">
                  Preparar Oferta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-lg w-full">
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Detalhes do Agendamento</h2>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="text-white/60 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-white font-medium mb-2">Cliente</h3>
                <p className="text-white/80">{getClientById(selectedAppointment.clienteId)?.nome}</p>
              </div>

              <div>
                <h3 className="text-white font-medium mb-2">Profissional</h3>
                <p className="text-white/80">{getProfessionalById(selectedAppointment.profissionalId)?.nome}</p>
              </div>

              <div>
                <h3 className="text-white font-medium mb-2">Data e Hora</h3>
                <p className="text-white/80">{formatDateTime(selectedAppointment.dataHora)}</p>
              </div>

              <div>
                <h3 className="text-white font-medium mb-2">Serviços</h3>
                <p className="text-white/80">{selectedAppointment.servicos.join(', ')}</p>
              </div>

              <div>
                <h3 className="text-white font-medium mb-2">Valor</h3>
                <p className="text-white/80">{formatCurrency(selectedAppointment.valor)}</p>
              </div>

              <div className="flex space-x-3 pt-4">
                <button className="flex-1 bg-green-500 text-white py-3 rounded-lg font-medium">
                  Confirmar
                </button>
                <button className="flex-1 bg-red-500 text-white py-3 rounded-lg font-medium">
                  Cancelar
                </button>
                <button className="px-4 bg-blue-500 text-white py-3 rounded-lg">
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Google Calendar Sync Status */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white">Google Calendar sincronizado</span>
            <span className="text-white/60 text-sm">Última sync: há 2 minutos</span>
          </div>
          <button className="text-primary-400 hover:text-primary-300 text-sm">
            Forçar sincronização
          </button>
        </div>
      </div>
    </div>
  )
}