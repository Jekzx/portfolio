import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowDown,
  ArrowUpRight,
  Braces,
  Check,
  CircleDot,
  Code2,
  Copy,
  Download,
  Github,
  Linkedin,
  Mail,
  MousePointer2,
  Sparkles,
  TerminalSquare,
  Wrench,
} from 'lucide-react'
import { Cursor } from './components/Cursor'
import { Magnetic } from './components/Magnetic'
import { CountUp } from './components/CountUp'
import { CommandPalette } from './components/CommandPalette'
import { GitHubLab } from './components/GitHubLab'
import { Terminal } from './components/Terminal'
import {
  certifications,
  education,
  experiences,
  impact,
  languages,
  profile,
  projects,
  skillGroups,
  type Mode,
} from './data/profile'

// Lazy load Three.js scene for ultra fast initial render
const HeroScene = React.lazy(() => import('./components/HeroScene').then((m) => ({ default: m.HeroScene })))

gsap.registerPlugin(ScrollTrigger)

const ease = [0.22, 1, 0.36, 1] as const

function Toast({ message }: { message: string | null }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className="toast-notification"
          initial={{ opacity: 0, y: 24, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.94 }}
          transition={{ duration: 0.25, ease }}
        >
          <Sparkles size={16} />
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Loader() {
  const [done, setDone] = useState(false)
  const [number, setNumber] = useState(0)

  useEffect(() => {
    let raf = 0
    const start = performance.now()
    const duration = 1250
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      setNumber(Math.round((1 - Math.pow(1 - p, 3)) * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else window.setTimeout(() => setDone(true), 180)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div className="loader" exit={{ y: '-100%' }} transition={{ duration: 0.9, ease }}>
          <div className="loader-grid" />
          <div className="loader-brand">
            <span>GR / SYSTEM</span>
            <small>INITIALIZING PORTFOLIO EXPERIENCE</small>
          </div>
          <div className="loader-count">{number.toString().padStart(3, '0')}</div>
          <div className="loader-progress"><i style={{ width: `${number}%` }} /></div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Header({ mode, setMode }: { mode: Mode; setMode: (mode: Mode) => void }) {
  const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.userAgent)

  return (
    <header className="site-header">
      <a href="#top" className="brand" aria-label="Voltar ao início">
        <span className="brand-mark">GR</span>
        <span className="brand-copy">Gabriel<br />Rodrigues</span>
      </a>
      <nav className="desktop-nav" aria-label="Navegação principal">
        <a href="#work">Projetos</a>
        <a href="#experience">Experiência</a>
        <a href="#stack">Stack</a>
        <a href="#contact">Contato</a>
      </nav>
      <div className="header-actions">
        <button className="cmd-button" type="button" onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))}>
          <TerminalSquare size={15} /> <span>Command</span> <kbd>{isMac ? '⌘K' : 'Ctrl K'}</kbd>
        </button>
        <div className="mode-toggle" role="group" aria-label="Perfil do portfólio">
          <button className={mode === 'dev' ? 'active' : ''} onClick={() => setMode('dev')} type="button"><Code2 size={15} />DEV</button>
          <button className={mode === 'ops' ? 'active' : ''} onClick={() => setMode('ops')} type="button"><Wrench size={15} />OPS</button>
          <i className={mode} />
        </div>
      </div>
    </header>
  )
}

function Hero({ mode }: { mode: Mode }) {
  return (
    <section className="hero" id="top">
      <React.Suspense fallback={<div className="hero-scene-fallback" />}>
        <HeroScene mode={mode} />
      </React.Suspense>
      <div className="hero-grid-overlay" aria-hidden="true" />
      <div className="hero-orb hero-orb-a" />
      <div className="hero-orb hero-orb-b" />
      <div className="container hero-content">
        <div className="hero-meta reveal-up">
          <span><i /> CURITIBA · BRASIL</span>
          <span>DISPONÍVEL PARA REMOTO</span>
        </div>
        <div className="hero-title-wrap">
          <div className="hero-index">PORTFOLIO / 2026</div>
          <h1 className="hero-title" aria-label="Eu construo software. Eu mantenho sistemas de pé.">
            <span className="hero-line"><span>EU CONSTRUO</span></span>
            <span className="hero-line outline"><span>SOFTWARE.</span></span>
            <span className="hero-line hero-line-alt"><span>EU MANTENHO</span></span>
            <span className="hero-line"><span>SISTEMAS DE PÉ.</span></span>
          </h1>
        </div>
        <div className="hero-bottom">
          <p>
            Software Developer <b>×</b> Support & Automation.<br />
            Construção, sustentação, troubleshooting, dados e IA no mesmo fluxo de raciocínio.
          </p>
          <div className="hero-ctas">
            <Magnetic><a className="round-cta primary" href="#work"><span>Explorar<br />trabalho</span><ArrowDown /></a></Magnetic>
            <Magnetic strength={0.15}>
              <a
                className="round-cta ghost"
                href={mode === 'dev' ? '/cv-gabriel-rodrigues-dev.pdf' : '/cv-gabriel-rodrigues-suporte.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                title={mode === 'dev' ? 'Baixar CV de Desenvolvimento' : 'Baixar CV de Suporte'}
                aria-label={`Baixar CV (${mode === 'dev' ? 'Desenvolvimento' : 'Suporte'})`}
              >
                <span>Baixar<br />CV {mode === 'dev' ? 'Dev' : 'Ops'}</span>
                <Download />
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
      <div className="scroll-indicator"><MousePointer2 size={15} /> SCROLL TO EXPLORE <i /></div>
    </section>
  )
}

function Manifesto({ mode }: { mode: Mode }) {
  return (
    <section className="manifesto section" id="about">
      <div className="container manifesto-grid">
        <div className="section-kicker"><span>01</span> / O DIFERENCIAL</div>
        <div className="manifesto-copy">
          <p className="eyebrow-copy">NÃO ESCOLHI UM LADO DA TI.</p>
          <h2 className="word-reveal">
            Eu aprendi a enxergar <em>o sistema inteiro.</em>
          </h2>
          <div className="manifesto-details">
            <p>{profile.summary}</p>
            <p>
              {mode === 'dev'
                ? 'Quando desenvolvo, penso em logs, suporte, dados, deploy, estabilidade e na pessoa que vai usar aquilo em produção.'
                : 'Quando sustento, não paro no sintoma: investigo logs, queries, integrações e código até encontrar a causa e automatizar o que for repetitivo.'}
            </p>
          </div>
        </div>
        <div className="manifesto-side">
          <div className="mode-card">
            <span>ACTIVE PROFILE</span>
            <AnimatePresence mode="wait">
              <motion.div key={mode} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                {mode === 'dev' ? <Braces size={30} /> : <CircleDot size={30} />}
                <strong>{mode === 'dev' ? 'BUILD MODE' : 'OPERATE MODE'}</strong>
                <small>{mode === 'dev' ? 'React · Node · Python · SQL · APIs · AI' : 'N1/N2/N3 · Infra · AD · Networks · SQL · SLA'}</small>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

function Impact() {
  const items = [
    'PRODUCTION MINDSET',
    'SOFTWARE ENGINEERING',
    'SUPPORT & SUSTAINABILITY',
    'AUTOMATION',
    'ROOT CAUSE ANALYSIS',
    'AI & DEVTOOLS',
    'METRICS & DATA',
  ]

  return (
    <section className="impact-section">
      <div className="impact-marquee" aria-label="Production mindset, software engineering, support, automation, root cause, AI and data">
        <div className="impact-marquee-track" aria-hidden="true">
          {[0, 1, 2, 3].map((setIndex) => (
            <div key={setIndex} className="marquee-group">
              {items.map((text, i) => (
                <React.Fragment key={i}>
                  <strong>{text}</strong>
                  <span className="marquee-dot">·</span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="container impact-grid">
        {impact.map((item) => (
          <article className="impact-card spotlight-card" key={item.label}>
            <strong><CountUp value={item.value} suffix={item.suffix} /></strong>
            <h3>{item.label}</h3>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: typeof projects[number]; index: number }) {
  const card = useRef<HTMLElement>(null)

  const pointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const node = card.current
    if (!node || window.matchMedia('(pointer: coarse)').matches) return
    const rect = node.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    node.style.setProperty('--rx', `${-y * 4.5}deg`)
    node.style.setProperty('--ry', `${x * 5.5}deg`)
    node.style.setProperty('--mx', `${(x + 0.5) * 100}%`)
    node.style.setProperty('--my', `${(y + 0.5) * 100}%`)
  }

  const pointerLeave = () => {
    const node = card.current
    if (!node) return
    node.style.setProperty('--rx', '0deg')
    node.style.setProperty('--ry', '0deg')
  }

  return (
    <article
      ref={card}
      className={`project-card project-${project.accent}`}
      onPointerMove={pointerMove}
      onPointerLeave={pointerLeave}
      data-project-index={index}
    >
      <div className="project-light" />
      <div className="project-noise" />
      <div className="project-top">
        <span>{project.number}</span>
        <span>{project.eyebrow}</span>
        <span className="project-live"><i /> LIVE PROJECT</span>
      </div>
      <div className="project-visual" aria-hidden="true">
        <div className="visual-window">
          <div className="visual-window-bar"><i /><i /><i /><b>{project.preview.replace('https://', '').replace('/', '')}</b></div>
          {project.id === 'ecommerce' && (
            <div className="fake-commerce-ui">
              <div className="commerce-nav"><strong>NEXUS</strong><span>Loja</span><span>Novidades</span><span>Ofertas</span><i>02</i></div>
              <div className="commerce-hero"><small>TECH, REFINED.</small><b>Elevate your setup.</b><em>Explorar coleção →</em></div>
              <div className="commerce-products">
                <div><i /><span>Wireless Headset</span><b>R$ 899</b></div>
                <div><i /><span>Smart Watch Pro</span><b>R$ 1.299</b></div>
                <div><i /><span>Mechanical Keys</span><b>R$ 749</b></div>
              </div>
              <div className="commerce-cart">CART / ZUSTAND <span>persisted</span></div>
            </div>
          )}
          {project.id === 'smartflow' && (
            <div className="fake-smartflow-ui">
              <div className="flow-sidebar"><b>SF</b><i /><i /><i /><i /><span>AI</span></div>
              <div className="flow-main">
                <div className="flow-head"><strong>SmartFlow</strong><span>SLA 96%</span><span>12 tasks</span></div>
                <div className="flow-columns">
                  <section><small>BACKLOG · 3</small><div className="flow-task high"><b>P1</b><span>API latency spike</span><em>Gemini triage</em></div><div className="flow-task"><b>P3</b><span>Refactor auth flow</span><em>5 pts</em></div></section>
                  <section><small>IN PROGRESS · 2</small><div className="flow-task ai"><b>AI</b><span>Break down release</span><em>6 subtasks</em></div><div className="flow-task"><b>P2</b><span>Checkout incident</span><em>42 min SLA</em></div></section>
                  <section><small>DONE · 8</small><div className="flow-task done"><b>✓</b><span>Daily standup</span><em>generated</em></div></section>
                </div>
                <div className="flow-assistant"><i /> FLOWBOT <span>context synced</span></div>
              </div>
            </div>
          )}
          {project.id === 'servicedesk' && (
            <div className="fake-servicedesk-ui">
              <div className="sd-head"><strong>ServiceDesk AI</strong><span><i /> systems operational</span></div>
              <div className="sd-metrics"><div><small>AUTO-RESOLUÇÃO</small><b>78%</b></div><div><small>OPEN / QUEUE</small><b>04</b></div><div><small>P1 CRÍTICOS</small><b>01</b></div></div>
              <div className="sd-body">
                <div className="sd-table"><div className="sd-row head"><span>PROTOCOLO</span><span>CATEGORIA</span><span>SLA</span></div><div className="sd-row"><b>SD-2841</b><span>VPN / REDE</span><em>12m</em></div><div className="sd-row"><b>SD-2844</b><span>ACTIVE DIRECTORY</span><em>auto</em></div><div className="sd-row"><b>SD-2847</b><span>ERP / CRM</span><em>P1</em></div></div>
                <div className="sd-bot"><div><i /> WhatsApp N1 Bot</div><p>Diagnóstico concluído.<br />VPN Gateway está operacional.</p><span>AUTO-REMEDIAÇÃO → RESOLVED</span></div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="project-copy">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-impact"><span>POR QUE IMPORTA</span>{project.impact}</div>
        <div className="project-tech">{project.tech.map((tech) => <span key={tech}>{tech}</span>)}</div>
        <div className="project-actions">
          <a className="project-action primary" href={project.preview} target="_blank" rel="noreferrer" data-cursor="interactive">Abrir live demo <ArrowUpRight size={16} /></a>
          <a className="project-action" href={project.href} target="_blank" rel="noreferrer" data-cursor="interactive"><Github size={15} /> Ver código</a>
        </div>
      </div>
    </article>
  )
}

function Work() {
  return (
    <section className="work section" id="work">
      <div className="container">
        <div className="section-kicker"><span>02</span> / SELECTED WORK</div>
        <div className="section-heading work-heading">
          <h2>Projetos que conectam<br /><em>código com problema real.</em></h2>
          <p>Três projetos, três provas complementares: produto full-stack, IA aplicada a incidentes e automação de suporte. Todos têm código público e uma demo real para explorar.</p>
        </div>
        <div className="projects-stack">
          {projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
        </div>
      </div>
    </section>
  )
}

function Experience({ mode }: { mode: Mode }) {
  return (
    <section className="experience section" id="experience">
      <div className="container experience-head">
        <div className="section-kicker"><span>03</span> / TRAJETÓRIA</div>
        <div className="section-heading">
          <h2>Aprendi TI<br />onde ela <em>quebra.</em></h2>
          <p>Minha experiência não veio só de ambiente controlado. Ela nasceu em suporte, migração, incidentes, infraestrutura e sistemas usados por pessoas reais.</p>
        </div>
      </div>
      <div className="experience-pin">
        <div className="experience-track-wrap">
          <div className="experience-track">
            {experiences.map((experience, index) => (
              <article className="experience-panel" key={experience.company}>
                <div className="experience-line-number">0{index + 1}</div>
                <div className="experience-period">{experience.period}</div>
                <h3>{experience.company}</h3>
                <AnimatePresence mode="wait">
                  <motion.h4 key={`${index}-${mode}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                    {mode === 'dev' ? experience.devRole : experience.opsRole}
                  </motion.h4>
                </AnimatePresence>
                <p className="experience-summary">{experience.summary}</p>
                <ul>
                  {(mode === 'dev' ? experience.dev : experience.ops).map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
                <div className="experience-mode-label">VIEWING / {mode.toUpperCase()}</div>
              </article>
            ))}
            <article className="experience-panel experience-next">
              <Sparkles size={30} />
              <span>NEXT</span>
              <h3>O próximo sistema ainda não existe.</h3>
              <p>Estou buscando um time onde eu possa construir, investigar, automatizar e evoluir software com contexto de produção.</p>
              <a href="#contact">Vamos conversar <ArrowUpRight size={18} /></a>
            </article>
          </div>
        </div>
        <div className="experience-scroll-hint" aria-hidden="true"><span>SCROLL TO MOVE THROUGH TIME</span><i /></div>
      </div>
    </section>
  )
}

function Stack() {
  const [active, setActive] = useState(skillGroups[0].id)
  const current = skillGroups.find((group) => group.id === active) || skillGroups[0]

  return (
    <section className="stack-section section" id="stack">
      <div className="container">
        <div className="section-kicker"><span>04</span> / SYSTEM MAP</div>
        <div className="section-heading split-heading">
          <h2>Minha stack não é<br />uma lista de logos.</h2>
          <p>É um mapa de como eu resolvo problemas: construir, operar, entender os dados e automatizar o que não deveria consumir tempo humano.</p>
        </div>
        <div className="stack-console">
          <div className="stack-tabs" role="tablist">
            {skillGroups.map((group, index) => (
              <button key={group.id} className={active === group.id ? 'active' : ''} onClick={() => setActive(group.id)} type="button">
                <span>0{index + 1}</span><strong>{group.label}</strong><small>{group.title}</small>
              </button>
            ))}
          </div>
          <div className="stack-display">
            <AnimatePresence mode="wait">
              <motion.div key={current.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35, ease }}>
                <div className="stack-display-head"><span>{current.label}.module</span><span>ready</span></div>
                <h3>{current.title}</h3>
                <p>{current.description}</p>
                <div className="skill-cloud">
                  {current.items.map((item, index) => <span style={{ '--delay': `${index * 20}ms` } as React.CSSProperties} key={item}>{item}</span>)}
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="stack-radar" aria-hidden="true">
              <i /><i /><i /><i />
              <span>DEV</span><span>OPS</span><span>DATA</span><span>AUTO</span>
              <b />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Philosophy({ mode, setMode, onNotify }: { mode: Mode; setMode: (m: Mode) => void; onNotify: (msg: string) => void }) {
  return (
    <section className="philosophy section">
      <div className="container philosophy-grid">
        <div>
          <div className="section-kicker"><span>05</span> / HOW I THINK</div>
          <h2>Eu não quero apenas<br /><em>fazer funcionar.</em></h2>
          <p>Quero entender por que funciona, como falha, como observar, como recuperar e como fazer a próxima ocorrência custar menos tempo.</p>
          <div className="pipeline">
            {['Understand', 'Build', 'Observe', 'Debug', 'Automate', 'Improve'].map((item, index) => (
              <div key={item}><span>0{index + 1}</span><strong>{item}</strong>{index < 5 && <i />}</div>
            ))}
          </div>
        </div>
        <Terminal mode={mode} setMode={setMode} onNotify={onNotify} />
      </div>
    </section>
  )
}

function Credentials() {
  return (
    <section className="credentials section">
      <div className="container credentials-grid">
        <div className="credential-column">
          <div className="section-kicker"><span>07</span> / FORMAÇÃO</div>
          {education.map((item) => (
            <article key={item.title}>
              <span>{item.period}</span>
              <h3>{item.title}</h3>
              <p>{item.institution}</p>
            </article>
          ))}
        </div>
        <div className="credential-column">
          <div className="section-kicker">CERTIFICAÇÕES</div>
          {certifications.map((item, index) => <article className="compact" key={item}><span>0{index + 1}</span><h3>{item}</h3></article>)}
        </div>
        <div className="credential-column languages-column">
          <div className="section-kicker">IDIOMAS</div>
          {languages.map((item) => <div className="language-row" key={item}><i />{item}</div>)}
        </div>
      </div>
    </section>
  )
}

function Contact({ mode, onNotify }: { mode: Mode; onNotify: (msg: string) => void }) {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard?.writeText(profile.email)
    setCopied(true)
    onNotify('E-mail copiado para a área de transferência! ✨')
    setTimeout(() => setCopied(false), 2600)
  }

  return (
    <footer className="contact section" id="contact">
      <div className="contact-grid-bg" />
      <div className="container contact-inner">
        <div className="section-kicker"><span>08</span> / LET'S BUILD</div>
        <p className="contact-pretitle">SE VOCÊ PRECISA DE ALGUÉM QUE ENTENDA</p>
        <h2>
          <span>o código.</span>
          <span className="outline">a produção.</span>
          <span>e o usuário.</span>
        </h2>
        <div className="contact-row">
          <div className="contact-copy">
            <p>Estou aberto a oportunidades em desenvolvimento, sustentação e posições híbridas onde contexto técnico e capacidade de execução façam diferença.</p>
            <span>Curitiba, PR · Remoto / Home Office</span>
          </div>
          <div className="contact-actions">
            <Magnetic>
              <button
                type="button"
                className={`contact-circle ${copied ? 'copied' : ''}`}
                onClick={copyEmail}
                title="Clique para copiar o e-mail"
                aria-label="Copiar e-mail"
              >
                {copied ? <Check size={24} /> : <Copy size={24} />}
                <span>{copied ? 'E-mail\ncopiado!' : 'Copiar\ne-mail'}</span>
              </button>
            </Magnetic>
            <div className="social-links">
              <a href={`mailto:${profile.email}`} title="Abrir aplicativo de e-mail">
                <Mail />{profile.email}<ArrowUpRight />
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer"><Github />GitHub<ArrowUpRight /></a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin />LinkedIn<ArrowUpRight /></a>
              <a
                href={mode === 'dev' ? '/cv-gabriel-rodrigues-dev.pdf' : '/cv-gabriel-rodrigues-suporte.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                className="cv-link active-cv"
                title={mode === 'dev' ? 'Baixar CV de Desenvolvimento' : 'Baixar CV de Suporte'}
              >
                <Download />CV {mode === 'dev' ? 'Dev (Ativo)' : 'Suporte (Ativo)'}<ArrowUpRight />
              </a>
              <a
                href={mode === 'dev' ? '/cv-gabriel-rodrigues-suporte.pdf' : '/cv-gabriel-rodrigues-dev.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                className="cv-link"
                title={mode === 'dev' ? 'Baixar CV de Suporte' : 'Baixar CV de Desenvolvimento'}
              >
                <Download />CV {mode === 'dev' ? 'Suporte' : 'Dev'}<ArrowUpRight />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Gabriel Rodrigues</span>
          <span>Designed as a living system — not a static résumé.</span>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const root = useRef<HTMLDivElement>(null)
  const [mode, setModeState] = useState<Mode>(() => (localStorage.getItem('portfolio-mode') === 'ops' ? 'ops' : 'dev'))
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const notify = useCallback((msg: string) => {
    setToastMessage(msg)
    window.clearTimeout((window as unknown as { _toastTimer?: number })._toastTimer)
    ;(window as unknown as { _toastTimer?: number })._toastTimer = window.setTimeout(() => {
      setToastMessage(null)
    }, 2600)
  }, [])

  const setMode = useCallback((nextMode: Mode) => {
    setModeState(nextMode)
    localStorage.setItem('portfolio-mode', nextMode)
  }, [])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.9 })
    lenis.on('scroll', ScrollTrigger.update)
    const update = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)
    return () => {
      lenis.destroy()
      gsap.ticker.remove(update)
    }
  }, [])

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.from('.hero-line > span', {
        yPercent: 110,
        rotate: 2,
        duration: 1.25,
        stagger: 0.1,
        delay: 1.15,
        ease: 'power4.out',
      })
      gsap.from('.hero-meta, .hero-bottom, .scroll-indicator', {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.08,
        delay: 1.65,
        ease: 'power3.out',
      })

      gsap.utils.toArray<HTMLElement>('.section-kicker, .section-heading, .reveal-up').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 45,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 87%', once: true },
        })
      })

      const words = document.querySelector('.word-reveal')
      if (words) {
        gsap.from(words, {
          opacity: 0.1,
          y: 30,
          filter: 'blur(10px)',
          scrollTrigger: { trigger: words, start: 'top 85%', end: 'top 45%', scrub: 1 },
        })
      }

      gsap.utils.toArray<HTMLElement>('.impact-card').forEach((card, index) => {
        gsap.from(card, { opacity: 0, y: 55 + index * 10, rotateX: 8, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 90%' } })
      })

      gsap.utils.toArray<HTMLElement>('.project-card').forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 90,
          scale: 0.96,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
          delay: index * 0.03,
        })
      })

      const track = document.querySelector<HTMLElement>('.experience-track')
      const pin = document.querySelector<HTMLElement>('.experience-pin')
      if (track && pin && window.innerWidth > 900) {
        const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth)
        gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: () => `+=${getDistance() + window.innerHeight * 0.35}`,
            scrub: 0.65,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
      }

      gsap.utils.toArray<HTMLElement>('.pipeline > div').forEach((item, index) => {
        gsap.from(item, { opacity: 0, x: -20, duration: 0.5, delay: index * 0.04, scrollTrigger: { trigger: '.pipeline', start: 'top 80%' } })
      })
    }, root)
    return () => context.revert()
  }, [])

  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [])

  useEffect(() => {
    const handler = (event: PointerEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>('.spotlight-card')
      if (!target) return
      const rect = target.getBoundingClientRect()
      target.style.setProperty('--mx', `${event.clientX - rect.left}px`)
      target.style.setProperty('--my', `${event.clientY - rect.top}px`)
    }
    window.addEventListener('pointermove', handler)
    return () => window.removeEventListener('pointermove', handler)
  }, [])

  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - innerHeight
      const progress = total > 0 ? scrollY / total : 0
      document.documentElement.style.setProperty('--scroll-progress', `${progress * 100}%`)
    }
    update()
    addEventListener('scroll', update, { passive: true })
    return () => removeEventListener('scroll', update)
  }, [])

  return (
    <div ref={root} className="app" data-mode={mode}>
      <Loader />
      <Cursor />
      <Toast message={toastMessage} />
      <div className="page-progress"><i /></div>
      <div className="global-noise" aria-hidden="true" />
      <div className="cursor-ambient" aria-hidden="true" />
      <Header mode={mode} setMode={setMode} />
      <CommandPalette mode={mode} setMode={setMode} onNotify={notify} />
      <main>
        <Hero mode={mode} />
        <Manifesto mode={mode} />
        <Impact />
        <Work />
        <Experience mode={mode} />
        <Stack />
        <Philosophy mode={mode} setMode={setMode} onNotify={notify} />
        <GitHubLab />
        <Credentials />
      </main>
      <Contact mode={mode} onNotify={notify} />
    </div>
  )
}
