export type Mode = 'dev' | 'ops'

export const profile = {
  name: 'Gabriel Rodrigues',
  role: 'Software Developer × Support & Automation',
  city: 'Curitiba, PR',
  email: 'gabrielrodrigues23@protonmail.com',
  phone: '(21) 99585-2036',
  github: 'https://github.com/Jekzx',
  linkedin: 'https://www.linkedin.com/in/gabrielsrodrigues1',
  summary:
    'Profissional de TI com mais de 4 anos de experiência unindo desenvolvimento de software, sustentação de sistemas, suporte técnico, automação, banco de dados, infraestrutura e Inteligência Artificial.',
}

export const impact = [
  { value: 40, suffix: '%', label: 'menos tempo de primeira resposta', detail: 'Chatbot com IA para triagem de chamados.' },
  { value: 30, suffix: '%', label: 'mais eficiência no atendimento', detail: 'Sistema centralizado de tickets + WhatsApp.' },
  { value: 25, suffix: '%', label: 'mais desempenho operacional', detail: 'Migração de CRM e banco para servidor dedicado.' },
  { value: 4, suffix: '+', label: 'anos vivendo produção de verdade', detail: 'Dev, suporte, infraestrutura e sustentação.' },
]

export const experiences = [
  {
    period: '2024 — 2026',
    company: 'Exsis Tecnologia da Informação',
    devRole: 'Desenvolvedor de Software Júnior & Sustentação',
    opsRole: 'Analista de Suporte a Aplicações e Sistemas N2',
    summary:
      'Atuação na fronteira entre produto e produção: desenvolvimento web, APIs, automações, troubleshooting avançado, SQL e sustentação de sistemas corporativos.',
    dev: [
      'Migração de CRM Desktop para web com interfaces em React e consumo de APIs RESTful.',
      'Sistema de tickets integrado à API do WhatsApp para histórico, mídia e centralização de atendimento.',
      'Chatbot com Google Gemini e contexto documental para triagem inicial.',
      'Debug e análise de causa-raiz em produção com scripts e queries SQL.'
    ],
    ops: [
      'Suporte N2/N3 a CRM e sistemas corporativos com análise de logs e bancos SQL.',
      'Triagem inteligente de chamados com IA, reduzindo o tempo de primeira resposta.',
      'Notificações automatizadas via WhatsApp e centralização do fluxo de tickets.',
      'Testes de homologação, migração de dados e suporte a equipes multidisciplinares.'
    ]
  },
  {
    period: '2022 — 2024',
    company: 'JGM Serviços',
    devRole: 'Técnico de TI & Automação',
    opsRole: 'Técnico de Suporte de TI e Infraestrutura',
    summary:
      'Estruturação de TI, automações, migração de CRM, administração de servidores e suporte direto a usuários.',
    dev: [
      'Scripts para backup, integridade de dados e contingência.',
      'Otimização de consultas e migração de banco e aplicação CRM.',
      'Automação de rotinas operacionais e administrativas.'
    ],
    ops: [
      'Estruturação do departamento de TI, SOPs, Service Desk e base de conhecimento.',
      'Gestão de servidores locais, backup e continuidade operacional.',
      'Atendimento a mais de 50 usuários, hardware, rede e acesso remoto.'
    ]
  },
  {
    period: '2021 — 2022',
    company: 'Clínicas Reunidas São Víctor',
    devRole: 'Estagiário de TI',
    opsRole: 'Assistente / Estagiário de Suporte de TI',
    summary:
      'Base operacional em ambiente hospitalar de alta criticidade, com foco em disponibilidade, acessos e backup.',
    dev: [
      'Monitoramento de servidores e rotinas de backup híbrido com AWS S3.',
      'Vivência com continuidade, segurança e operação de sistemas.'
    ],
    ops: [
      'Suporte presencial e remoto N1/N2 em ambiente de alta criticidade.',
      'Administração de usuários, grupos, permissões e GPO no Active Directory.',
      'Monitoramento de servidores e recuperação de dados críticos.'
    ]
  }
]

export const projects = [
  {
    id: 'ecommerce',
    number: '01',
    title: 'NEXUS Store',
    eyebrow: 'FULL-STACK E-COMMERCE',
    description: 'Plataforma de e-commerce full-stack com storefront em dark glassmorphism, busca e filtros em tempo real, carrinho persistente, checkout com PIX/cartão e painel administrativo completo.',
    impact: 'Mostra domínio de produto ponta a ponta: experiência de compra, estado global, regras de negócio, autorização por perfil, CRUD administrativo e arquitetura pronta para evoluir com API e PostgreSQL.',
    tech: ['React 18', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Vercel'],
    href: 'https://github.com/Jekzx/ecommerce-platform',
    preview: 'https://ecommerce-platform-beta-lyart.vercel.app/',
    accent: 'cyan'
  },
  {
    id: 'smartflow',
    number: '02',
    title: 'SmartFlow AI',
    eyebrow: 'AI × INCIDENT MANAGEMENT',
    description: 'Gerenciador full-stack de tarefas e incidentes com Kanban drag-and-drop, SLA P1–P4, analytics e uma suíte de IA com Gemini para decomposição, triagem, standups e assistência contextual.',
    impact: 'É o projeto que melhor conecta meus dois mundos: engenharia de software, operação, incidentes e IA trabalhando no mesmo fluxo, com API REST, Docker e CI.',
    tech: ['React 18', 'TypeScript', 'Node.js', 'Express', 'Gemini API', 'Docker', 'GitHub Actions', 'Vite'],
    href: 'https://github.com/Jekzx/smartflow-ai',
    preview: 'https://smartflow-ai-phi.vercel.app/',
    accent: 'violet'
  },
  {
    id: 'servicedesk',
    number: '03',
    title: 'ServiceDesk AI Bot',
    eyebrow: 'AUTOMATION × SUPPORT OPS',
    description: 'Solução corporativa de autoatendimento N1 e diagnóstico ativo integrada ao WhatsApp, com triagem inteligente, SLA, healthchecks, auto-remediação, tickets persistidos e dashboard web em tempo real.',
    impact: 'Transforma experiência real de suporte em software: automação de incidentes, diagnóstico de infraestrutura, observabilidade operacional, API documentada e testes automatizados.',
    tech: ['Python', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'SQLite', 'WhatsApp API', 'Pytest', 'Docker', 'Vercel'],
    href: 'https://github.com/Jekzx/servicedesk-bot',
    preview: 'https://servicedesk-bot-w8kr.vercel.app/',
    accent: 'green'
  }
]

export const skillGroups = [
  {
    id: 'build',
    label: 'BUILD',
    title: 'Construir produto',
    description: 'Da interface à API, do banco ao deploy.',
    items: ['Python', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 'REST APIs', 'HTML5', 'CSS3', 'Tailwind', 'Chakra UI', 'Delphi']
  },
  {
    id: 'operate',
    label: 'OPERATE',
    title: 'Manter produção saudável',
    description: 'Diagnóstico, estabilidade, usuários e infraestrutura.',
    items: ['N1/N2/N3', 'Windows Server', 'Linux', 'Active Directory', 'GPO', 'TCP/IP', 'DNS', 'DHCP', 'VPN', 'RDP', 'Service Desk', 'SLA/SLO']
  },
  {
    id: 'data',
    label: 'DATA',
    title: 'Entender o que acontece por baixo',
    description: 'Dados, consultas, persistência e análise de causa-raiz.',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQL', 'Logs', 'Queries', 'Data Migration', 'Backup', 'AWS S3']
  },
  {
    id: 'automate',
    label: 'AUTOMATE',
    title: 'Eliminar trabalho repetitivo',
    description: 'Scripts, integrações e IA aplicada a processo.',
    items: ['Python Automation', 'Google Gemini', 'OpenAI APIs', 'WhatsApp API', 'Git', 'GitHub', 'Docker', 'CI/CD', 'Webhooks']
  }
]

export const education = [
  { title: 'Pós-Graduação em Engenharia de Software', institution: 'Faculdade Descomplica', period: 'Conclusão prevista: 2026' },
  { title: 'Análise e Desenvolvimento de Sistemas', institution: 'UniBF', period: '2023 — 2025' }
]

export const certifications = [
  'CS50: Computer Science — Harvard University',
  'Python for Data Science, AI & Dev — IBM',
  'Databases and SQL for Data Science — IBM',
  'Google Data Analytics Specialization — Google'
]

export const languages = ['Inglês — Fluente', 'Espanhol — Intermediário', 'Japonês — Intermediário']
