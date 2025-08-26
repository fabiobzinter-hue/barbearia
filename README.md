# 💈 Vince Barbearia - Dashboard Completo

Um dashboard moderno e completo para gestão de barbearias, integrado com WhatsApp (via n8n) e Google Calendar.

## 🎯 Funcionalidades Principais

### 📊 Visão Geral (Dashboard Principal)
- **KPIs em tempo real**: Agendamentos, ocupação, receita, ticket médio, clientes ativos
- **Gráficos interativos**: Ocupação por horário, receita por serviço, ranking de profissionais
- **Alertas inteligentes da Isa**: Insights automáticos para otimização do negócio
- **Visual premium**: Design sofisticado com cores roxo, lilás, degradês, creme e marrom

### 👥 Gestão de Clientes
- **Perfis completos**: Dados pessoais, preferências, histórico de serviços
- **Sistema de fidelidade**: Níveis Bronze, Prata, Ouro e Diamond
- **Busca avançada**: Por nome, telefone, email ou nível de fidelidade
- **Avaliações e feedback**: Histórico de satisfação do cliente
- **Comunicação direta**: Integração WhatsApp para contato rápido

### 👨‍💼 Gestão de Profissionais  
- **Agendas individuais**: Visualização por profissional e data
- **Performance tracking**: Atendimentos, receita, ocupação, avaliações
- **Especialidades**: Controle de serviços por profissional
- **Ranking e conquistas**: Gamificação para motivar a equipe

### 📅 Agendamentos
- **Integração Google Calendar**: Sincronização automática bidirecional
- **Múltiplas visualizações**: Calendário, lista e fila walk-in
- **Status em tempo real**: Agendado, confirmado, em andamento, concluído
- **Gestão de walk-ins**: Fila de espera com sugestões automáticas de encaixe
- **Notificações WhatsApp**: Lembretes e confirmações automáticas

### 💰 Vendas e Fidelização
- **Gestão de produtos**: Controle de estoque, preços e vendas
- **Programas VIP**: Planos de assinatura com benefícios exclusivos
- **Upselling inteligente**: Sugestões da IA baseadas no perfil do cliente
- **Análise de performance**: Métricas de conversão e receita adicional

### 📈 Relatórios Estratégicos
- **Relatórios automáticos**: Geração diária às 20h com resumo completo
- **Múltiplos formatos**: Visualização web, exportação PDF e Excel
- **Análises avançadas**: Ocupação, performance, clientes, financeiro
- **Recomendações da Isa**: Insights para crescimento do negócio

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS com sistema de cores customizado
- **Icons**: Lucide React
- **Integração**: n8n para automação, Google Calendar API
- **Responsividade**: Mobile-first design

## 🚀 Como Usar

### Pré-requisitos
- Node.js 18+ instalado
- Conta Google (para Calendar API)
- Instância n8n configurada (para WhatsApp)
- WhatsApp Business API

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/vince-barbearia
cd vince-barbearia
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env.local
# Edite .env.local com suas credenciais
```

4. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

5. **Acesse o dashboard**
```
http://localhost:3000
```

### Configuração do Google Calendar

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Habilite a Calendar API
4. Crie credenciais OAuth 2.0
5. Adicione as credenciais no `.env.local`

### Configuração do n8n + WhatsApp

1. Configure uma instância n8n
2. Crie workflows para:
   - Envio de mensagens WhatsApp
   - Recebimento de respostas
   - Sincronização com Google Calendar
3. Configure os webhooks no `.env.local`

## 📱 Funcionalidades Mobile

O dashboard é totalmente responsivo e funciona perfeitamente em:
- 📱 Smartphones (iOS e Android)
- 📱 Tablets 
- 💻 Desktop
- 🖥️ Monitores ultrawide

## 🤖 Isa - Assistente Virtual Inteligente

A Isa analisa constantemente os dados da barbearia e fornece:

- **Alertas em tempo real**: Cancelamentos, atrasos, oportunidades
- **Sugestões de otimização**: Horários, preços, serviços
- **Insights de crescimento**: Baseado em padrões de comportamento
- **Automações inteligentes**: Respostas e agendamentos via WhatsApp

## 🎨 Sistema de Cores

O dashboard utiliza uma paleta premium inspirada em barbearias modernas:

- **Roxo primário**: #7716ff (profissionalismo)
- **Lilás secundário**: #d946ef (sofisticação)  
- **Dourado accent**: #f8d181 (premium)
- **Marrom neutro**: #8b4513 (tradição)
- **Degradês**: Combinações harmoniosas

## 📊 Métricas e KPIs

### KPIs Principais
- Total de agendamentos (diário/semanal/mensal)
- Taxa de ocupação por profissional
- Receita total e por categoria
- Ticket médio por cliente
- Número de clientes ativos

### Análises Avançadas
- Horários de pico e baixa demanda
- Serviços mais rentáveis
- Performance individual dos profissionais
- Taxa de retenção de clientes
- ROI dos programas de fidelidade

## 🔄 Integrações

### WhatsApp Business (via n8n)
- Confirmação automática de agendamentos
- Lembretes 24h antes do serviço
- Pesquisa de satisfação pós-atendimento
- Promoções e ofertas personalizadas
- Reagendamentos via chat

### Google Calendar
- Sincronização bidirecional
- Calendários separados por profissional
- Notificações nativas do Google
- Integração com Google Meet (se necessário)

### Sistemas de Pagamento (futuro)
- Stripe para pagamentos online
- PIX para pagamentos instantâneos
- Controle de recebíveis

## 🛡️ Segurança e Privacidade

- Dados dos clientes protegidos conforme LGPD
- Conexões HTTPS obrigatórias
- Tokens de API seguros
- Backup automático dos dados
- Logs de auditoria

## 📈 Roadmap Futuro

### Versão 2.0
- [ ] Sistema de agendamento online para clientes
- [ ] App mobile nativo
- [ ] Integração com sistemas de pagamento
- [ ] Marketing automation avançado
- [ ] Análise preditiva com ML

### Versão 3.0
- [ ] Multi-unidades (franquias)
- [ ] Marketplace de produtos
- [ ] Sistema de comissionamento
- [ ] Integração com redes sociais
- [ ] API pública para desenvolvedores

## 💡 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📞 Suporte

Para suporte e dúvidas:
- 📧 Email: suporte@vincebarbearia.com
- 💬 WhatsApp: (11) 99999-9999
- 🐛 Issues: [GitHub Issues](https://github.com/seu-usuario/vince-barbearia/issues)

## 📜 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

**Desenvolvido com ❤️ para a Vince Barbearia**

*Dashboard premium que combina tecnologia moderna com a tradição da barbearia brasileira.*