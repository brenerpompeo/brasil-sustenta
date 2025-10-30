# Brasil Sustenta - TODO List

## Estrutura e Configuração
- [x] Configurar tema escuro e paleta de cores verde (#4ade80)
- [x] Adicionar fonte customizada (Inter ou similar)
- [x] Criar componente de Header com navegação
- [x] Criar componente de Footer

## Seções da Landing Page
- [x] Hero Section - "Transforme o Potencial. Impulse o Impacto."
- [x] Como Funciona o Processo (4 etapas)
- [x] Por que escolher o Brasil Sustenta? (3 cards)
- [x] Conheça nossos Talentos (cards de perfil)
- [x] Squads Sob Medida (grid 4x2 de especialidades)
- [x] Nosso Modelo de Impacto (pricing boxes)
- [x] O Que dizem nossos Parceiros (depoimentos)
- [x] Parceiros Universitários (logos)
- [x] Impacto em Números (estatísticas)
- [x] Pronto para Gerar Impacto? (CTA section)
- [x] Newsletter Section
- [x] Footer completo

## Componentes Reutilizáveis
- [x] Card component customizado
- [x] Button variants (primary, outline)
- [x] Icon wrapper component
- [x] Stats counter component
- [x] Testimonial card component
- [x] Talent profile card component

## Responsividade e UX
- [x] Implementar menu hamburguer mobile
- [x] Garantir responsividade em todas as seções
- [x] Adicionar animações de scroll (fade-in, slide-up)
- [x] Implementar hover effects nos cards
- [x] Adicionar microinterações nos botões

## Otimizações
- [x] Otimizar imagens e assets
- [x] Implementar lazy loading
- [x] Adicionar meta tags SEO
- [x] Testar performance e acessibilidade

## Novas Features
- [x] Seção de Perguntas Frequentes (FAQ)

## Rebranding e Novas Funcionalidades de Marketplace

### Rebranding Visual
- [x] Atualizar paleta de cores para #1ED760 (verde primário) e #121212 (base escura)
- [x] Mudar tipografia para Poppins
- [x] Adicionar gradientes radiais em botões principais
- [x] Revisar contraste e acessibilidade em todas as páginas

### Schema do Banco de Dados
- [x] Criar tabela users com userType
- [x] Criar tabelas de perfis (company, talent, university)
- [x] Criar tabelas de projetos e aplicações
- [x] Criar tabelas de squads e membros
- [x] Criar tabelas de avaliações
- [x] Criar tabelas de blog e eventos (CMS)
- [x] Criar tabela de notificações
- [x] Executar migrações do banco

### Navegação e Autenticação
- [x] Modificar botão Login para dropdown com 3 opções (Empresas, Jovens, Universidades)
- [ ] Criar página de Login para Empresas
- [ ] Criar página de Login para Jovens Talentos
- [ ] Criar página de Login para Universidades
- [ ] Criar página de Cadastro para Empresas
- [ ] Criar página de Cadastro para Jovens Talentos
- [ ] Criar página de Cadastro para Universidades

### Dashboard da Empresa
- [ ] Área para criar novos projetos (Squad Boxes)
- [ ] Painel para gerenciar projetos existentes
- [ ] Interface para revisar aplicações de jovens talentos

### Dashboard do Jovem Talento
- [ ] Área para construir e editar perfil
- [ ] Painel de Oportunidades (projetos abertos)
- [ ] Área para acompanhar candidaturas e projetos

### Dashboard da Universidade
- [ ] Painel para gerenciar convênio de extensão
- [ ] Visualizar alunos participando de projetos
- [ ] Acesso a relatórios de impacto e horas de extensão

### Painel Admin com CMS
- [ ] Blog - Interface CRUD para posts
- [ ] Eventos - Interface CRUD com campos (capa, título, data, local, link Sympla)
- [ ] Gestão de Projetos e Matching
- [ ] Gestão de Usuários (CRUD para todos os tipos)

### Páginas Adicionais
- [ ] Página de Blog (listagem de posts)
- [ ] Página de Eventos (listagem de eventos)
- [ ] Página individual de Post
- [ ] Página individual de Evento

## Páginas de Autenticação em Desenvolvimento
- [x] Implementar página de Login/Registro para Empresas
- [x] Implementar página de Login/Registro para Jovens Talentos
- [x] Implementar página de Login/Registro para Universidades
- [x] Criar rotas no App.tsx
- [x] Integrar com Manus OAuth
- [ ] Criar procedimentos tRPC para registro de perfis

## Painel de Administração em Desenvolvimento
- [x] Criar layout do painel admin com sidebar
- [x] Dashboard principal com estatísticas
- [x] Gestão de Usuários (listar, visualizar, editar, desativar)
- [ ] Gestão de Empresas (aprovar cadastros, visualizar perfis)
- [ ] Gestão de Talentos (visualizar perfis, aprovar/rejeitar)
- [ ] Gestão de Universidades (aprovar parcerias, visualizar dados)
- [ ] Gestão de Projetos (visualizar, aprovar, gerenciar status)
- [ ] Gestão de Squads (formar equipes, gerenciar membros)
- [ ] CMS de Blog (criar, editar, publicar posts)
- [ ] CMS de Eventos (criar, editar, gerenciar eventos)
- [ ] Sistema de notificações admin
- [ ] Relatórios e analytics

## Bugs Reportados
- [x] Corrigir erro de tags <a> aninhadas no AdminLayout (Link do wouter já renderiza <a>)

## Melhorias de Performance
- [x] Implementar paginação na tabela de usuários
- [x] Implementar ordenação por colunas na tabela de usuários
- [x] Criar modal de confirmação para ações críticas (excluir, alterar status)

## SPRINT 1: Rebranding Visual e Design System
- [x] Refatorar Landing Page com diretrizes rigorosas (#121212, #1ED760, Poppins)
- [x] Implementar gradientes radiais em banners
- [x] Implementar gradientes lineares em botões CTA
- [x] Criar componentes reutilizáveis de Botões (primário, secundário)
- [x] Criar componentes reutilizáveis de Cards
- [x] Criar componentes reutilizáveis de Inputs
- [x] Documentar Design System

## SPRINT 2: Fluxo de Autenticação Completo (JÁ INICIADO)
- [x] Modificar botão Login para dropdown (Empresas, Jovens, Universidades)
- [x] Criar páginas de Login e Cadastro segmentadas
- [ ] Integrar autenticação com backend (tRPC + Drizzle)
- [ ] Implementar lógica de criação de usuários por tipo
- [ ] Testar fluxo completo de autenticação

## SPRINT 3: Dashboard da Empresa
- [ ] Criar estrutura do Dashboard com sidebar
- [ ] Implementar formulário "Criar Novo Projeto"
- [ ] Criar listagem de projetos em cards
- [ ] Integrar criação de projetos com backend
- [ ] Implementar edição e visualização de projetos

## SPRINT 4: Dashboard do Jovem Talento
- [ ] Criar estrutura do Dashboard com abas
- [ ] Implementar formulário "Meu Perfil"
- [ ] Criar listagem de "Oportunidades" (projetos abertos)
- [ ] Implementar botão "Tenho Interesse" e lógica de candidatura
- [ ] Criar aba "Meus Projetos" com projetos em andamento

## SPRINT 5: Painel Admin e Matching
- [ ] Criar estrutura do Painel Admin com acesso restrito
- [ ] Implementar aprovação de projetos (aguardando → aberto)
- [ ] Criar interface de matching (seleção de projeto + talentos)
- [ ] Implementar lógica de formação de Squad
- [ ] Atualizar status de projeto para "em_andamento"

## SPRINT 6: CMS para Blog e Eventos
- [ ] Criar CRUD de Blog no Painel Admin
- [ ] Criar CRUD de Eventos no Painel Admin
- [ ] Criar página pública /blog
- [ ] Criar página pública /eventos
- [ ] Implementar integração com Sympla para eventos
