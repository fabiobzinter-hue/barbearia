'use client'

import { useState, useMemo } from 'react'
import { Search, Filter, Plus, Star, Phone, Mail, Calendar, Gift, Heart, MessageSquare, Users } from 'lucide-react'
import { mockClientes } from '@/lib/mockData'
import { formatDate, formatPhone, calculateAge, formatCurrency, cn } from '@/utils'
import { Cliente } from '@/types'

const loyaltyColors = {
  bronze: 'from-yellow-600 to-yellow-700',
  prata: 'from-gray-400 to-gray-500', 
  ouro: 'from-yellow-400 to-yellow-500',
  diamond: 'from-blue-400 to-purple-500'
}

const loyaltyIcons = {
  bronze: '🥉',
  prata: '🥈', 
  ouro: '🥇',
  diamond: '💎'
}

export default function ClientManagement() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [selectedClient, setSelectedClient] = useState<Cliente | null>(null)

  const filteredClients = useMemo(() => {
    let filtered = mockClientes

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(client => 
        client.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.telefone.includes(searchQuery) ||
        client.email?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Loyalty filter
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(client => client.fidelidade.nivel === selectedFilter)
    }

    return filtered
  }, [searchQuery, selectedFilter])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Gestão de Clientes
          </h1>
          <p className="text-white/70">
            Gerencie informações, histórico e preferências dos seus clientes
          </p>
        </div>
        
        <button className="bg-gradient-primary px-6 py-3 rounded-lg text-white font-medium hover:scale-105 transition-transform flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Novo Cliente</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por nome, telefone ou email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>

          {/* Loyalty Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-white/60" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-400"
            >
              <option value="all">Todos os níveis</option>
              <option value="bronze">Bronze</option>
              <option value="prata">Prata</option>
              <option value="ouro">Ouro</option>
              <option value="diamond">Diamond</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{mockClientes.length}</p>
            <p className="text-white/70 text-sm">Total de Clientes</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">23</p>
            <p className="text-white/70 text-sm">Novos este mês</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">89%</p>
            <p className="text-white/70 text-sm">Taxa de retorno</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">R$ 58</p>
            <p className="text-white/70 text-sm">Ticket médio</p>
          </div>
        </div>
      </div>

      {/* Client List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 card-hover cursor-pointer"
            onClick={() => setSelectedClient(client)}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {client.nome.charAt(0)}
                </div>
                <div>
                  <h3 className="text-white font-bold">{client.nome}</h3>
                  {client.dataNascimento && (
                    <p className="text-white/60 text-sm">
                      {calculateAge(client.dataNascimento)} anos
                    </p>
                  )}
                </div>
              </div>
              
              <div className={cn(
                "px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1",
                `bg-gradient-to-r ${loyaltyColors[client.fidelidade.nivel]}`
              )}>
                <span>{loyaltyIcons[client.fidelidade.nivel]}</span>
                <span className="text-white">{client.fidelidade.nivel.toUpperCase()}</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-white/80">
                <Phone className="w-4 h-4" />
                <span className="text-sm">{formatPhone(client.telefone)}</span>
              </div>
              {client.email && (
                <div className="flex items-center space-x-2 text-white/80">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{client.email}</span>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center bg-white/5 rounded-lg py-2">
                <p className="text-white font-bold">{client.historico.servicos}</p>
                <p className="text-white/60 text-xs">Serviços</p>
              </div>
              <div className="text-center bg-white/5 rounded-lg py-2">
                <p className="text-white font-bold">{formatCurrency(client.historico.ticketMedio)}</p>
                <p className="text-white/60 text-xs">Ticket Médio</p>
              </div>
            </div>

            {/* Rating and Last Visit */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-white text-sm">{client.historico.avaliacaoMedia}</span>
              </div>
              <div className="text-white/60 text-xs">
                Última visita: {formatDate(client.historico.ultimaVisita)}
              </div>
            </div>

            {/* Preferences Preview */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center space-x-2 text-white/70 text-xs">
                <Heart className="w-3 h-3" />
                <span>
                  {client.preferencias.profissional && `${client.preferencias.profissional} • `}
                  {client.preferencias.ambiente === 'silencio' ? '🤫 Silêncio' : '💬 Conversa'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Client Detail Modal */}
      {selectedClient && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {selectedClient.nome.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedClient.nome}</h2>
                  <div className="flex items-center space-x-4 mt-1">
                    {selectedClient.dataNascimento && (
                      <span className="text-white/70">
                        {calculateAge(selectedClient.dataNascimento)} anos
                      </span>
                    )}
                    <div className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1",
                      `bg-gradient-to-r ${loyaltyColors[selectedClient.fidelidade.nivel]}`
                    )}>
                      <span>{loyaltyIcons[selectedClient.fidelidade.nivel]}</span>
                      <span className="text-white">{selectedClient.fidelidade.nivel.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setSelectedClient(null)}
                className="text-white/60 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            {/* Contact and Preferences */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <h3 className="text-white font-bold">Contato</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-white/80">
                    <Phone className="w-4 h-4" />
                    <span>{formatPhone(selectedClient.telefone)}</span>
                  </div>
                  {selectedClient.email && (
                    <div className="flex items-center space-x-2 text-white/80">
                      <Mail className="w-4 h-4" />
                      <span>{selectedClient.email}</span>
                    </div>
                  )}
                  {selectedClient.dataNascimento && (
                    <div className="flex items-center space-x-2 text-white/80">
                      <Gift className="w-4 h-4" />
                      <span>Aniversário: {formatDate(selectedClient.dataNascimento)}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-white font-bold">Preferências</h3>
                <div className="space-y-2 text-white/80">
                  {selectedClient.preferencias.profissional && (
                    <p>👨‍💼 Profissional: {selectedClient.preferencias.profissional}</p>
                  )}
                  <p>🎯 Ambiente: {selectedClient.preferencias.ambiente === 'silencio' ? '🤫 Silêncio' : '💬 Conversa'}</p>
                  {selectedClient.preferencias.bebida && (
                    <p>☕ Bebida: {selectedClient.preferencias.bebida}</p>
                  )}
                  <p>✂️ Serviços: {selectedClient.preferencias.servicos.join(', ')}</p>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-white">{selectedClient.historico.servicos}</p>
                <p className="text-white/60 text-sm">Total de Serviços</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-white">{formatCurrency(selectedClient.historico.ticketMedio)}</p>
                <p className="text-white/60 text-sm">Ticket Médio</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-white">{selectedClient.historico.avaliacaoMedia}</p>
                <p className="text-white/60 text-sm">Avaliação Média</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-white">{selectedClient.fidelidade.pontos}</p>
                <p className="text-white/60 text-sm">Pontos Fidelidade</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <button className="bg-gradient-primary px-4 py-2 rounded-lg text-white font-medium hover:scale-105 transition-transform flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Novo Agendamento</span>
              </button>
              <button className="bg-green-500 px-4 py-2 rounded-lg text-white font-medium hover:scale-105 transition-transform flex items-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </button>
              <button className="bg-white/10 border border-white/20 px-4 py-2 rounded-lg text-white font-medium hover:bg-white/20 transition-colors">
                Editar Perfil
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredClients.length === 0 && (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-12 text-center">
          <Users className="w-16 h-16 text-white/40 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Nenhum cliente encontrado</h3>
          <p className="text-white/60 mb-6">
            {searchQuery ? 'Tente ajustar sua busca ou filtros' : 'Comece adicionando seu primeiro cliente'}
          </p>
          <button className="bg-gradient-primary px-6 py-3 rounded-lg text-white font-medium hover:scale-105 transition-transform">
            Adicionar Cliente
          </button>
        </div>
      )}
    </div>
  )
}