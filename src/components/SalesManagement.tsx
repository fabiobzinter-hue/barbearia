'use client'

import { useState, useMemo } from 'react'
import { ShoppingBag, Package, TrendingUp, Gift, Crown, Star, AlertTriangle, Plus, DollarSign } from 'lucide-react'
import { mockProdutos, mockVendas, mockClientes } from '@/lib/mockData'
import { formatCurrency, cn } from '@/utils'

// Mock VIP program data
const mockVIPPrograms = [
  {
    id: '1',
    nome: 'VIP Bronze',
    preco: 99,
    beneficios: ['10% desconto em serviços', 'Agendamento prioritário', 'Bebida grátis'],
    clientesAtivos: 45,
    receitaMensal: 4455,
    cor: 'from-yellow-600 to-yellow-700'
  },
  {
    id: '2', 
    nome: 'VIP Prata',
    preco: 199,
    beneficios: ['15% desconto em serviços', 'Agendamento prioritário', 'Produto mensalgarátis', 'Corte noturno'],
    clientesAtivos: 23,
    receitaMensal: 4577,
    cor: 'from-gray-400 to-gray-500'
  },
  {
    id: '3',
    nome: 'VIP Ouro', 
    preco: 299,
    beneficios: ['20% desconto em serviços', 'Atendimento domiciliar', 'Kit premium mensal', 'Eventos exclusivos'],
    clientesAtivos: 12,
    receitaMensal: 3588,
    cor: 'from-yellow-400 to-yellow-500'
  }
]

// Mock upselling suggestions
const mockUpsellSuggestions = [
  {
    cliente: 'Pedro Oliveira',
    servicoAtual: 'Corte Masculino',
    sugestao: 'Combo Premium (Corte + Barba)',
    valorAdicional: 20,
    probabilidade: 85,
    motivo: 'Cliente fez barba nas últimas 3 visitas'
  },
  {
    cliente: 'Carlos Santos',
    servicoAtual: 'Barba Completa',
    sugestao: 'Óleo para Barba Premium',
    valorAdicional: 35,
    probabilidade: 73,
    motivo: 'Histórico de compra de produtos para barba'
  },
  {
    cliente: 'João Silva',
    servicoAtual: 'Corte Masculino',
    sugestao: 'VIP Bronze',
    valorAdicional: 99,
    probabilidade: 67,
    motivo: 'Visita mais de 4x por mês'
  }
]

export default function SalesManagement() {
  const [selectedTab, setSelectedTab] = useState<'products' | 'vip' | 'upsell' | 'reports'>('products')
  const [selectedPeriod, setSelectedPeriod] = useState('month')

  const salesStats = useMemo(() => {
    const totalVendas = mockVendas.reduce((sum, venda) => sum + venda.total, 0)
    const totalVIP = mockVIPPrograms.reduce((sum, program) => sum + program.receitaMensal, 0)
    const totalClientes = mockVIPPrograms.reduce((sum, program) => sum + program.clientesAtivos, 0)
    
    return {
      totalVendas,
      totalVIP,
      totalClientes,
      ticketMedio: totalVendas / mockVendas.length
    }
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Vendas e Fidelização
          </h1>
          <p className="text-white/70">
            Gerencie produtos, programas VIP e estratégias de upselling
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-400"
          >
            <option value="today">Hoje</option>
            <option value="week">Esta Semana</option>
            <option value="month">Este Mês</option>
          </select>
          <button className="bg-gradient-primary px-6 py-3 rounded-lg text-white font-medium hover:scale-105 transition-transform flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Nova Venda</span>
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <ShoppingBag className="w-8 h-8 text-green-400" />
            <h3 className="text-white font-bold">Vendas de Produtos</h3>
          </div>
          <p className="text-2xl font-bold text-white">{formatCurrency(salesStats.totalVendas)}</p>
          <p className="text-green-400 text-sm">+12% vs mês anterior</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Crown className="w-8 h-8 text-yellow-400" />
            <h3 className="text-white font-bold">Receita VIP</h3>
          </div>
          <p className="text-2xl font-bold text-white">{formatCurrency(salesStats.totalVIP)}</p>
          <p className="text-yellow-400 text-sm">{salesStats.totalClientes} clientes ativos</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="w-8 h-8 text-purple-400" />
            <h3 className="text-white font-bold">Ticket Médio</h3>
          </div>
          <p className="text-2xl font-bold text-white">{formatCurrency(salesStats.ticketMedio)}</p>
          <p className="text-purple-400 text-sm">+8% vs mês anterior</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Gift className="w-8 h-8 text-pink-400" />
            <h3 className="text-white font-bold">Taxa Conversão</h3>
          </div>
          <p className="text-2xl font-bold text-white">23%</p>
          <p className="text-pink-400 text-sm">Upselling para produtos</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2">
        <div className="flex space-x-1">
          {[
            { id: 'products', label: 'Produtos', icon: Package },
            { id: 'vip', label: 'Programas VIP', icon: Crown },
            { id: 'upsell', label: 'Upselling', icon: TrendingUp },
            { id: 'reports', label: 'Relatórios', icon: DollarSign }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={cn(
                  "flex items-center space-x-2 px-6 py-3 rounded-lg transition-all font-medium",
                  selectedTab === tab.id
                    ? "bg-gradient-primary text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Products Tab */}
      {selectedTab === 'products' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProdutos.map((produto) => (
              <div key={produto.id} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 card-hover">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-white font-bold text-lg">{produto.nome}</h3>
                    <p className="text-white/60 text-sm">{produto.categoria}</p>
                  </div>
                  <span className="text-white font-bold text-xl">{formatCurrency(produto.preco)}</span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/80">Estoque:</span>
                    <span className={cn(
                      "font-medium",
                      produto.estoque <= produto.estoqueMinimo ? "text-red-400" : "text-green-400"
                    )}>
                      {produto.estoque} unidades
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-white/80">Estoque mínimo:</span>
                    <span className="text-white/60">{produto.estoqueMinimo}</span>
                  </div>

                  {produto.estoque <= produto.estoqueMinimo && (
                    <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      <span className="text-red-300 text-sm">Estoque baixo!</span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2 mt-4">
                  <button className="flex-1 bg-gradient-primary text-white py-2 rounded-lg text-sm font-medium">
                    Vender
                  </button>
                  <button className="px-4 bg-white/10 text-white py-2 rounded-lg text-sm">
                    Editar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Produtos Mais Vendidos</h3>
            <div className="space-y-4">
              {[
                { nome: 'Pomada Modeladora', vendas: 45, receita: 1125 },
                { nome: 'Óleo para Barba', vendas: 32, receita: 1120 },
                { nome: 'Shampoo Premium', vendas: 28, receita: 784 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-secondary rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <span className="text-white font-medium">{item.nome}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">{formatCurrency(item.receita)}</p>
                    <p className="text-white/60 text-sm">{item.vendas} vendas</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIP Programs Tab */}
      {selectedTab === 'vip' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {mockVIPPrograms.map((program) => (
              <div key={program.id} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 card-hover">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={cn("w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r", program.cor)}>
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{program.nome}</h3>
                    <p className="text-white/60">{formatCurrency(program.preco)}/mês</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {program.beneficios.map((beneficio, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-white/80 text-sm">{beneficio}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center bg-white/5 rounded-lg py-3">
                    <p className="text-white font-bold text-xl">{program.clientesAtivos}</p>
                    <p className="text-white/60 text-sm">Clientes</p>
                  </div>
                  <div className="text-center bg-white/5 rounded-lg py-3">
                    <p className="text-white font-bold text-xl">{formatCurrency(program.receitaMensal)}</p>
                    <p className="text-white/60 text-sm">Receita/mês</p>
                  </div>
                </div>

                <button className="w-full bg-gradient-primary text-white py-3 rounded-lg font-medium hover:scale-105 transition-transform">
                  Gerenciar Plano
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Performance dos Programas VIP</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                <span className="text-white">Taxa de conversão para VIP</span>
                <span className="text-green-400 font-bold">18%</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                <span className="text-white">Receita média por cliente VIP</span>
                <span className="text-white font-bold">{formatCurrency(156)}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                <span className="text-white">Taxa de retenção (12 meses)</span>
                <span className="text-blue-400 font-bold">87%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upselling Tab */}
      {selectedTab === 'upsell' && (
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">🤖 Sugestões de Upselling da Isa</h3>
            <div className="space-y-4">
              {mockUpsellSuggestions.map((suggestion, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-white font-bold">{suggestion.cliente}</h4>
                      <p className="text-white/60 text-sm">Serviço atual: {suggestion.servicoAtual}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-bold">+{formatCurrency(suggestion.valorAdicional)}</p>
                      <p className="text-white/60 text-sm">{suggestion.probabilidade}% probabilidade</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-white font-medium mb-1">Sugestão: {suggestion.sugestao}</p>
                    <p className="text-white/70 text-sm">{suggestion.motivo}</p>
                  </div>

                  <div className="flex space-x-3">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-transform">
                      Aplicar Sugestão
                    </button>
                    <button className="bg-white/10 text-white px-4 py-2 rounded-lg text-sm border border-white/20">
                      Adiar
                    </button>
                    <button className="bg-red-500/20 text-red-300 px-4 py-2 rounded-lg text-sm border border-red-500/30">
                      Descartar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Performance Upselling</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-white/80">Taxa de aceitação</span>
                  <span className="text-green-400 font-bold">73%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Receita adicional (mês)</span>
                  <span className="text-white font-bold">{formatCurrency(3240)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Valor médio por upsell</span>
                  <span className="text-white font-bold">{formatCurrency(45)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Produtos + Sugeridos</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/80">Combo Premium</span>
                  <span className="text-green-400">89% aceitação</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Óleo para Barba</span>
                  <span className="text-green-400">67% aceitação</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">VIP Bronze</span>
                  <span className="text-yellow-400">45% aceitação</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {selectedTab === 'reports' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Comparativo Mensal</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Receita Serviços</span>
                  <div className="text-right">
                    <p className="text-white font-bold">{formatCurrency(12800)}</p>
                    <p className="text-green-400 text-sm">+8%</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Receita Produtos</span>
                  <div className="text-right">
                    <p className="text-white font-bold">{formatCurrency(3200)}</p>
                    <p className="text-green-400 text-sm">+15%</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Receita VIP</span>
                  <div className="text-right">
                    <p className="text-white font-bold">{formatCurrency(salesStats.totalVIP)}</p>
                    <p className="text-green-400 text-sm">+23%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Metas do Mês</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white/80">Vendas de Produtos</span>
                    <span className="text-white">78%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full" style={{width: '78%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white/80">Novos VIPs</span>
                    <span className="text-white">45%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-2 rounded-full" style={{width: '45%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white/80">Taxa Upselling</span>
                    <span className="text-white">92%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-400 h-2 rounded-full" style={{width: '92%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Exportar Relatórios</h3>
              <div className="flex space-x-3">
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium">
                  PDF
                </button>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium">
                  Excel
                </button>
              </div>
            </div>
            <p className="text-white/70">
              Exporte relatórios detalhados de vendas, fidelização e performance para análise externa.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}