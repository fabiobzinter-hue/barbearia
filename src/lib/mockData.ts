import { Cliente, Profissional, Agendamento, Servico, KPI, Venda, Produto, Feedback, Relatorio } from '@/types'

export const mockServicos: Servico[] = [
  { id: '1', nome: 'Corte Masculino', descricao: 'Corte tradicional', preco: 35, duracao: 30, categoria: 'corte' },
  { id: '2', nome: 'Barba Completa', descricao: 'Barba + bigode', preco: 25, duracao: 20, categoria: 'barba' },
  { id: '3', nome: 'Combo Premium', descricao: 'Corte + Barba', preco: 55, duracao: 45, categoria: 'combo' },
  { id: '4', nome: 'Sobrancelha', descricao: 'Design de sobrancelha', preco: 15, duracao: 15, categoria: 'adicional' },
]

export const mockProfissionais: Profissional[] = [
  {
    id: '1',
    nome: 'João Silva',
    especialidades: ['Corte Masculino', 'Barba'],
    avaliacao: { media: 4.8, totalAvaliacoes: 156 },
    agenda: { horarioInicio: '08:00', horarioFim: '18:00', diasTrabalho: [1, 2, 3, 4, 5, 6] },
    estatisticas: { atendimentosHoje: 12, receitaHoje: 420, ocupacao: 85 }
  },
  {
    id: '2', 
    nome: 'Carlos Santos',
    especialidades: ['Combo Premium', 'Design'],
    avaliacao: { media: 4.9, totalAvaliacoes: 203 },
    agenda: { horarioInicio: '09:00', horarioFim: '19:00', diasTrabalho: [1, 2, 3, 4, 5, 6] },
    estatisticas: { atendimentosHoje: 8, receitaHoje: 440, ocupacao: 78 }
  },
  {
    id: '3',
    nome: 'Miguel Costa',
    especialidades: ['Barba', 'Sobrancelha'],
    avaliacao: { media: 4.7, totalAvaliacoes: 89 },
    agenda: { horarioInicio: '10:00', horarioFim: '18:00', diasTrabalho: [2, 3, 4, 5, 6] },
    estatisticas: { atendimentosHoje: 6, receitaHoje: 210, ocupacao: 92 }
  }
]

export const mockClientes: Cliente[] = [
  {
    id: '1',
    nome: 'Pedro Oliveira',
    telefone: '(11) 99999-9999',
    email: 'pedro@email.com',
    dataNascimento: new Date('1990-05-15'),
    preferencias: {
      profissional: 'João Silva',
      servicos: ['Corte Masculino', 'Barba'],
      bebida: 'Café',
      ambiente: 'conversa'
    },
    historico: {
      servicos: 24,
      ticketMedio: 58,
      ultimaVisita: new Date('2025-08-20'),
      avaliacaoMedia: 5
    },
    fidelidade: { pontos: 240, nivel: 'ouro' }
  },
  {
    id: '2',
    nome: 'Lucas Martinez',
    telefone: '(11) 88888-8888',
    preferencias: {
      servicos: ['Combo Premium'],
      ambiente: 'silencio'
    },
    historico: {
      servicos: 8,
      ticketMedio: 55,
      ultimaVisita: new Date('2025-08-25'),
      avaliacaoMedia: 4.8
    },
    fidelidade: { pontos: 80, nivel: 'prata' }
  }
]

export const mockAgendamentos: Agendamento[] = [
  {
    id: '1',
    clienteId: '1',
    profissionalId: '1', 
    servicos: ['Corte Masculino', 'Barba'],
    dataHora: new Date('2025-08-26T14:00:00'),
    duracao: 50,
    status: 'confirmado',
    valor: 60
  },
  {
    id: '2',
    clienteId: '2',
    profissionalId: '2',
    servicos: ['Combo Premium'],
    dataHora: new Date('2025-08-26T16:00:00'),
    duracao: 45,
    status: 'agendado',
    valor: 55
  }
]

export const mockKPIs: KPI[] = [
  {
    titulo: 'Agendamentos Hoje',
    valor: 24,
    variacao: { percentual: 12, periodo: 'vs ontem' },
    icone: 'calendar',
    cor: 'primary'
  },
  {
    titulo: 'Ocupação Média',
    valor: '85%',
    variacao: { percentual: 5, periodo: 'vs semana passada' },
    icone: 'users',
    cor: 'secondary'
  },
  {
    titulo: 'Receita Hoje',
    valor: 'R$ 1.280',
    variacao: { percentual: -3, periodo: 'vs ontem' },
    icone: 'dollar-sign',
    cor: 'accent'
  },
  {
    titulo: 'Ticket Médio',
    valor: 'R$ 58',
    variacao: { percentual: 8, periodo: 'vs mês passado' },
    icone: 'trending-up',
    cor: 'success'
  },
  {
    titulo: 'Clientes Ativos',
    valor: 156,
    variacao: { percentual: 15, periodo: 'vs mês passado' },
    icone: 'user-check',
    cor: 'primary'
  }
]

export const mockProdutos: Produto[] = [
  { id: '1', nome: 'Pomada Modeladora', categoria: 'Cabelo', preco: 25, estoque: 45, estoqueMinimo: 10 },
  { id: '2', nome: 'Óleo para Barba', categoria: 'Barba', preco: 35, estoque: 23, estoqueMinimo: 15 },
  { id: '3', nome: 'Shampoo Premium', categoria: 'Cabelo', preco: 28, estoque: 8, estoqueMinimo: 12 },
]

export const mockVendas: Venda[] = [
  {
    id: '1',
    clienteId: '1',
    produtos: [{ id: '1', nome: 'Pomada Modeladora', quantidade: 1, preco: 25 }],
    total: 25,
    data: new Date('2025-08-26T14:30:00'),
    formaPagamento: 'cartao'
  }
]

export const mockFeedbacks: Feedback[] = [
  {
    id: '1',
    clienteId: '1',
    agendamentoId: '1',
    avaliacao: 5,
    comentario: 'Excelente atendimento! João é muito profissional.',
    data: new Date('2025-08-25T18:00:00'),
    respondido: false
  }
]

export const mockRelatorio: Relatorio = {
  periodo: { inicio: new Date('2025-08-01'), fim: new Date('2025-08-26') },
  receita: { servicos: 12800, produtos: 3200, total: 16000 },
  atendimentos: {
    total: 284,
    porProfissional: [
      { profissionalId: '1', quantidade: 124 },
      { profissionalId: '2', quantidade: 98 },
      { profissionalId: '3', quantidade: 62 }
    ]
  },
  clientes: { novos: 23, retornaram: 145, total: 168 },
  ocupacao: {
    media: 78,
    porHorario: [
      { hora: '09:00', ocupacao: 45 },
      { hora: '10:00', ocupacao: 67 },
      { hora: '11:00', ocupacao: 89 },
      { hora: '14:00', ocupacao: 92 },
      { hora: '15:00', ocupacao: 95 },
      { hora: '16:00', ocupacao: 88 },
      { hora: '17:00', ocupacao: 76 },
    ]
  }
}