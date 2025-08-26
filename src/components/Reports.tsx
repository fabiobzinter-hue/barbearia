'use client'

import { useState } from 'react'
import { FileText, Download, Calendar, TrendingUp, Users, DollarSign, BarChart3, PieChart, Filter, RefreshCw } from 'lucide-react'
import { formatCurrency, formatDate, cn } from '@/utils'
import { mockRelatorio, mockProfissionais } from '@/lib/mockData'

const reportTypes = [
  { id: 'daily', label: 'Relatório Diário', icon: Calendar },
  { id: 'financial', label: 'Relatório Financeiro', icon: DollarSign },
  { id: 'professional', label: 'Performance Profissionais', icon: Users },
  { id: 'client', label: 'Análise de Clientes', icon: BarChart3 },
  { id: 'occupancy', label: 'Ocupação & Horários', icon: PieChart },
]

// Mock additional report data
const mockDailyReport = {
  data: new Date(),
  servicosRealizados: 28,
  receita: 1680,
  clientesAtendidos: 24,
  ticketMedio: 70,
  avaliacaoMedia: 4.8,
  cancelamentos: 2,
  walkIns: 5,
  ocupacaoMedia: 85,
  profissionalDestaque: 'João Silva',
  servicoMaisVendido: 'Combo Premium'
}

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState('daily')
  const [selectedPeriod, setSelectedPeriod] = useState('today')
  const [isGenerating, setIsGenerating] = useState(false)

  const generateReport = async (format: 'pdf' | 'excel') => {
    setIsGenerating(true)
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsGenerating(false)
    
    // In a real app, this would trigger download
    alert(`Relatório ${format.toUpperCase()} gerado com sucesso!`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Relatórios Estratégicos
          </h1>
          <p className="text-white/70">
            Análises detalhadas e insights para otimização do negócio
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
            <option value="quarter">Este Trimestre</option>
            <option value="year">Este Ano</option>
          </select>
          
          <button
            onClick={() => generateReport('pdf')}
            disabled={isGenerating}
            className="bg-red-500 px-4 py-2 rounded-lg text-white font-medium hover:scale-105 transition-transform flex items-center space-x-2 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>PDF</span>
          </button>
          
          <button
            onClick={() => generateReport('excel')}
            disabled={isGenerating}
            className="bg-green-500 px-4 py-2 rounded-lg text-white font-medium hover:scale-105 transition-transform flex items-center space-x-2 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>Excel</span>
          </button>
        </div>
      </div>

      {/* Report Type Selector */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {reportTypes.map((report) => {
            const Icon = report.icon
            return (
              <button
                key={report.id}
                onClick={() => setSelectedReport(report.id)}
                className={cn(
                  "p-4 rounded-xl border transition-all text-center",
                  selectedReport === report.id
                    ? "bg-gradient-primary border-primary-400"
                    : "bg-white/5 border-white/20 hover:bg-white/10"
                )}
              >
                <Icon className="w-8 h-8 mx-auto mb-2 text-white" />
                <p className="text-white font-medium text-sm">{report.label}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Daily Report */}
      {selectedReport === 'daily' && (
        <div className="space-y-6">
          {/* Report Header */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Relatório Diário Automático</h2>
              <div className="flex items-center space-x-2 text-white/70">
                <RefreshCw className="w-4 h-4" />
                <span className="text-sm">Atualizado: {formatDate(mockDailyReport.data)} às 20:00</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-white">{mockDailyReport.servicosRealizados}</p>
                <p className="text-white/70">Serviços Realizados</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">{formatCurrency(mockDailyReport.receita)}</p>
                <p className="text-white/70">Receita Total</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">{mockDailyReport.clientesAtendidos}</p>
                <p className="text-white/70">Clientes Atendidos</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">{mockDailyReport.ocupacaoMedia}%</p>
                <p className="text-white/70">Ocupação Média</p>
              </div>
            </div>
          </div>

          {/* Performance Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Performance do Dia</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-white/80">Ticket Médio</span>
                  <span className="text-white font-bold">{formatCurrency(mockDailyReport.ticketMedio)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Avaliação Média</span>
                  <span className="text-white font-bold">{mockDailyReport.avaliacaoMedia} ⭐</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Cancelamentos</span>
                  <span className="text-red-400 font-bold">{mockDailyReport.cancelamentos}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Walk-ins Atendidos</span>
                  <span className="text-green-400 font-bold">{mockDailyReport.walkIns}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Destaques</h3>
              <div className="space-y-4">
                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
                  <p className="text-yellow-300 font-medium">🏆 Profissional Destaque</p>
                  <p className="text-white">{mockDailyReport.profissionalDestaque}</p>
                </div>
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                  <p className="text-green-300 font-medium">💰 Serviço Mais Vendido</p>
                  <p className="text-white">{mockDailyReport.servicoMaisVendido}</p>
                </div>
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                  <p className="text-blue-300 font-medium">📈 Meta do Dia</p>
                  <p className="text-white">112% da meta atingida</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Financial Report */}
      {selectedReport === 'financial' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Receita por Categoria</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/80">Serviços</span>
                  <span className="text-white font-bold">{formatCurrency(mockRelatorio.receita.servicos)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Produtos</span>
                  <span className="text-white font-bold">{formatCurrency(mockRelatorio.receita.produtos)}</span>
                </div>
                <div className="flex justify-between border-t border-white/20 pt-3">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-green-400 font-bold">{formatCurrency(mockRelatorio.receita.total)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Comparativo Mensal</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/80">Receita atual</span>
                  <span className="text-white font-bold">{formatCurrency(16000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Mês anterior</span>
                  <span className="text-white/60">{formatCurrency(14200)}</span>
                </div>
                <div className="flex justify-between border-t border-white/20 pt-3">
                  <span className="text-white font-bold">Crescimento</span>
                  <span className="text-green-400 font-bold">+12.7%</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Previsão</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/80">Meta do mês</span>
                  <span className="text-white/60">{formatCurrency(18000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Progresso</span>
                  <span className="text-yellow-400 font-bold">89%</span>
                </div>
                <div className="flex justify-between border-t border-white/20 pt-3">
                  <span className="text-white font-bold">Estimativa final</span>
                  <span className="text-green-400 font-bold">{formatCurrency(19200)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Professional Performance */}
      {selectedReport === 'professional' && (
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Ranking de Performance</h3>
            <div className="space-y-4">
              {mockProfissionais.map((professional, index) => (
                <div key={professional.id} className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`text-2xl ${index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-400' : 'text-yellow-600'}`}>
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                      </div>
                      <div>
                        <h4 className="text-white font-bold">{professional.nome}</h4>
                        <p className="text-white/60 text-sm">⭐ {professional.avaliacao.media} ({professional.avaliacao.totalAvaliacoes} avaliações)</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-6 text-center">
                      <div>
                        <p className="text-white font-bold">{professional.estatisticas.atendimentosHoje}</p>
                        <p className="text-white/60 text-xs">Atendimentos</p>
                      </div>
                      <div>
                        <p className="text-white font-bold">{formatCurrency(professional.estatisticas.receitaHoje)}</p>
                        <p className="text-white/60 text-xs">Receita</p>
                      </div>
                      <div>
                        <p className="text-white font-bold">{professional.estatisticas.ocupacao}%</p>
                        <p className="text-white/60 text-xs">Ocupação</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Client Analysis */}
      {selectedReport === 'client' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Análise de Clientes</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-white/80">Total de clientes</span>
                  <span className="text-white font-bold">{mockRelatorio.clientes.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Novos este mês</span>
                  <span className="text-green-400 font-bold">{mockRelatorio.clientes.novos}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Clientes que retornaram</span>
                  <span className="text-blue-400 font-bold">{mockRelatorio.clientes.retornaram}</span>
                </div>
                <div className="flex justify-between border-t border-white/20 pt-3">
                  <span className="text-white font-bold">Taxa de retenção</span>
                  <span className="text-purple-400 font-bold">86%</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Segmentação por Fidelidade</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/80">🥉 Bronze</span>
                  <span className="text-white">45 clientes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">🥈 Prata</span>
                  <span className="text-white">23 clientes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">🥇 Ouro</span>
                  <span className="text-white">12 clientes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">💎 Diamond</span>
                  <span className="text-white">5 clientes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Occupancy Report */}
      {selectedReport === 'occupancy' && (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Análise de Ocupação por Horário</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{mockRelatorio.ocupacao.media}%</p>
                <p className="text-white/70">Ocupação Média</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">14:00-17:00</p>
                <p className="text-white/70">Pico de Movimento</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">12:00-13:00</p>
                <p className="text-white/70">Menor Movimento</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">95%</p>
                <p className="text-white/70">Máxima Ocupação</p>
              </div>
            </div>

            {mockRelatorio.ocupacao.porHorario.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-white/80 w-20">{item.hora}</span>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-white/10 rounded-full h-3">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
                      style={{ width: `${item.ocupacao}%` }}
                    />
                  </div>
                </div>
                <span className="text-white font-medium w-12 text-right">{item.ocupacao}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Isa Recommendations */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-6">🤖 Recomendações da Isa</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
            <h4 className="text-blue-300 font-medium mb-2">💡 Otimização de Horários</h4>
            <p className="text-white/80 text-sm mb-3">
              Considere abrir mais cedo às segundas-feiras. Há demanda reprimida de 15% baseada em buscas no Google.
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded text-sm">
              Ver Detalhes
            </button>
          </div>

          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
            <h4 className="text-green-300 font-medium mb-2">📈 Aumento de Receita</h4>
            <p className="text-white/80 text-sm mb-3">
              Implementar combo "Pai e Filho" pode aumentar receita em 23% baseado no perfil dos clientes.
            </p>
            <button className="bg-green-500 text-white px-4 py-2 rounded text-sm">
              Implementar
            </button>
          </div>

          <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
            <h4 className="text-purple-300 font-medium mb-2">👥 Fidelização</h4>
            <p className="text-white/80 text-sm mb-3">
              12 clientes estão em risco de churn. Envie ofertas personalizadas via WhatsApp.
            </p>
            <button className="bg-purple-500 text-white px-4 py-2 rounded text-sm">
              Enviar Ofertas
            </button>
          </div>

          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
            <h4 className="text-yellow-300 font-medium mb-2">⚡ Ação Imediata</h4>
            <p className="text-white/80 text-sm mb-3">
              Estoque de "Óleo para Barba" acabando. Histórico mostra 35% de aumento de vendas quando em promoção.
            </p>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded text-sm">
              Reabastecer
            </button>
          </div>
        </div>
      </div>

      {isGenerating && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center">
            <RefreshCw className="w-12 h-12 text-primary-400 mx-auto mb-4 animate-spin" />
            <h3 className="text-white font-bold text-xl mb-2">Gerando Relatório</h3>
            <p className="text-white/70">Processando dados e criando documento...</p>
          </div>
        </div>
      )}
    </div>
  )
}