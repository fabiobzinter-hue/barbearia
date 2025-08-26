// Tipos para o dashboard da barbearia

export interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  email?: string;
  dataNascimento?: Date;
  preferencias: {
    profissional?: string;
    servicos: string[];
    bebida?: string;
    ambiente: 'silencio' | 'conversa';
  };
  historico: {
    servicos: number;
    ticketMedio: number;
    ultimaVisita: Date;
    avaliacaoMedia: number;
  };
  fidelidade: {
    pontos: number;
    nivel: 'bronze' | 'prata' | 'ouro' | 'diamond';
  };
}

export interface Profissional {
  id: string;
  nome: string;
  foto?: string;
  especialidades: string[];
  avaliacao: {
    media: number;
    totalAvaliacoes: number;
  };
  agenda: {
    horarioInicio: string;
    horarioFim: string;
    diasTrabalho: number[];
  };
  estatisticas: {
    atendimentosHoje: number;
    receitaHoje: number;
    ocupacao: number;
  };
}

export interface Agendamento {
  id: string;
  clienteId: string;
  profissionalId: string;
  servicos: string[];
  dataHora: Date;
  duracao: number;
  status: 'agendado' | 'confirmado' | 'em_andamento' | 'concluido' | 'cancelado';
  valor: number;
  observacoes?: string;
  googleCalendarId?: string;
}

export interface Servico {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  duracao: number;
  categoria: 'corte' | 'barba' | 'combo' | 'adicional';
}

export interface KPI {
  titulo: string;
  valor: string | number;
  variacao?: {
    percentual: number;
    periodo: string;
  };
  icone: string;
  cor: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
}

export interface Venda {
  id: string;
  clienteId: string;
  produtos: {
    id: string;
    nome: string;
    quantidade: number;
    preco: number;
  }[];
  total: number;
  data: Date;
  formaPagamento: 'dinheiro' | 'cartao' | 'pix';
}

export interface Produto {
  id: string;
  nome: string;
  categoria: string;
  preco: number;
  estoque: number;
  estoqueMinimo: number;
}

export interface Feedback {
  id: string;
  clienteId: string;
  agendamentoId: string;
  avaliacao: number;
  comentario?: string;
  data: Date;
  respondido: boolean;
}

export interface Relatorio {
  periodo: {
    inicio: Date;
    fim: Date;
  };
  receita: {
    servicos: number;
    produtos: number;
    total: number;
  };
  atendimentos: {
    total: number;
    porProfissional: { profissionalId: string; quantidade: number }[];
  };
  clientes: {
    novos: number;
    retornaram: number;
    total: number;
  };
  ocupacao: {
    media: number;
    porHorario: { hora: string; ocupacao: number }[];
  };
}