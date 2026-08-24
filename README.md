# Gabriel Rodrigues — Interactive Portfolio v3

Portfólio imersivo construído com React + TypeScript + WebGL para apresentar o perfil híbrido **Software Development × Support / Operations / Automation**.

## Stack do portfólio

- **Vite + React + TypeScript** — app e build
- **Three.js + React Three Fiber + Drei** — cena WebGL 3D da hero
- **GSAP + ScrollTrigger** — storytelling, reveals e timeline horizontal pinada
- **Lenis** — smooth scrolling
- **Framer Motion** — transições de UI, perfil DEV/OPS e command palette
- **TanStack Query** — integração resiliente com API pública do GitHub
- **Lucide React** — ícones
- **CSS moderno** — glassmorphism, spotlight, 3D tilt, noise, gradients, grids, responsive motion e cursor adaptativo por blend mode

## Projetos em destaque

Os cards principais agora são baseados nos projetos reais e incluem links separados para **Live Demo** e **GitHub**:

1. **NEXUS Store** — `ecommerce-platform`
   - Demo: https://ecommerce-platform-beta-lyart.vercel.app/
   - Storefront, busca/filtros, Zustand, checkout PIX/cartão e dashboard admin.
2. **SmartFlow AI** — `smartflow-ai`
   - Demo: https://smartflow-ai-phi.vercel.app/
   - Kanban, incidentes P1–P4, SLA, analytics, Gemini, FlowBot, Docker e CI.
3. **ServiceDesk AI Bot** — `servicedesk-bot`
   - Demo: https://servicedesk-bot-w8kr.vercel.app/
   - WhatsApp N1, triagem, healthchecks, auto-remediação, FastAPI, SQLAlchemy e testes.

## Ajustes desta versão

- Marquee **PRODUCTION MINDSET · SOFTWARE ENGINEERING · ...** agora roda continuamente em loop real e pausa ao passar o mouse.
- Timeline da seção **03 / TRAJETÓRIA** foi reestruturada: o título rola normalmente e somente o palco dos cards é pinado, mantendo os cards inteiros dentro da viewport durante o deslocamento horizontal.
- Cursor customizado usa `mix-blend-mode: difference`, alternando contraste automaticamente sobre fundos claros e escuros.
- Miniaturas dos projetos foram redesenhadas para representar a interface e a proposta de cada aplicação.
- Fallback da seção Live GitHub atualizado para os três projetos principais.

## Rodar localmente

Recomendado: **Node.js 18.18+** (ideal Node 20+).

```bash
npm install
npm run dev
```

Abra a URL mostrada pelo Vite (normalmente `http://localhost:5173`).

## Gerar build de produção

```bash
npm run build
npm run preview
```

A build será criada em `dist/`.

## Interações para testar

- Mova o mouse sobre a hero e observe a cena WebGL responder ao ponteiro.
- Alterne **DEV / OPS** no topo; o tema, accent e conteúdo profissional mudam.
- Pressione **Ctrl+K** (ou Cmd+K) para abrir a command palette.
- Passe o cursor pelos cards para spotlight e tilt 3D.
- No marquee de impacto, veja o texto correr continuamente; hover pausa a faixa para leitura.
- Na seção **03**, continue rolando verticalmente para mover a trajetória horizontalmente.
- Veja os counters de impacto animarem quando entram em viewport.
- A seção GitHub consulta `api.github.com/users/Jekzx/repos` em tempo real, com fallback local.
- O terminal troca comandos automaticamente.
- Em dispositivos móveis, efeitos dependentes de cursor são desligados e a timeline vira swipe horizontal.
- `prefers-reduced-motion` é respeitado.

## Currículos

Os dois PDFs estão em `public/` e são expostos como:

- `/cv-gabriel-rodrigues-dev.pdf`
- `/cv-gabriel-rodrigues-suporte.pdf`

## Deploy

O projeto é estático após build. Pode ser publicado em Vercel, Netlify, Cloudflare Pages ou GitHub Pages (ajuste `base` no Vite se publicar em subdiretório).

## Observação sobre fontes

O CSS usa Google Fonts por CDN (`Inter`, `Space Grotesk`, `DM Mono`). Se quiser um projeto 100% offline, substitua o `@import` por fontes locais com licença apropriada.
