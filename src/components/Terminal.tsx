import { useEffect, useRef, useState } from 'react'
import type { Mode } from '../data/profile'
import { profile, projects, skillGroups } from '../data/profile'

const autoSequences = [
  ['whoami', 'gabriel@production: software × support'],
  ['cat mindset.txt', 'build → observe → debug → automate → improve'],
  ['status --production', 'systems: healthy · users: supported · ideas: shipping'],
  ['skills --grep "bridge"', 'React ↔ APIs ↔ SQL ↔ Infra ↔ Support ↔ AI'],
]

type HistoryItem = {
  command: string
  output: string | string[]
  isError?: boolean
}

type Props = {
  mode?: Mode
  setMode?: (mode: Mode) => void
  onNotify?: (msg: string) => void
}

export function Terminal({ mode = 'dev', setMode, onNotify }: Props) {
  const [isInteractive, setIsInteractive] = useState(false)
  const [inputVal, setInputVal] = useState('')
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [autoIndex, setAutoIndex] = useState(0)
  const [autoTyped, setAutoTyped] = useState('')
  const [autoShowOutput, setAutoShowOutput] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  // Auto typing loop when not interactive
  useEffect(() => {
    if (isInteractive) return
    const command = autoSequences[autoIndex][0]
    setAutoTyped('')
    setAutoShowOutput(false)
    let i = 0
    let typingTimer: number
    let cycleTimer: number

    const type = () => {
      i += 1
      setAutoTyped(command.slice(0, i))
      if (i < command.length) {
        typingTimer = window.setTimeout(type, 48 + Math.random() * 32)
      } else {
        window.setTimeout(() => setAutoShowOutput(true), 260)
        cycleTimer = window.setTimeout(() => setAutoIndex((v) => (v + 1) % autoSequences.length), 3200)
      }
    }
    typingTimer = window.setTimeout(type, 500)
    return () => {
      clearTimeout(typingTimer)
      clearTimeout(cycleTimer)
    }
  }, [autoIndex, isInteractive])

  useEffect(() => {
    if (isInteractive && bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [history, isInteractive])

  const handleCommand = (raw: string) => {
    const cmd = raw.trim()
    const lower = cmd.toLowerCase()
    if (!cmd) return

    let output: string | string[] = ''
    let isError = false

    if (lower === 'help') {
      output = [
        'Comandos disponíveis:',
        '  whoami          — Identidade e especialidade',
        '  skills          — Mapa de tecnologias',
        '  projects        — Projetos em destaque',
        '  contact         — E-mail e redes de contato',
        '  cv [dev|ops]    — Abrir currículo em PDF',
        '  mode [dev|ops]  — Alternar tema do portfólio',
        '  status          — Status operacional dos sistemas',
        '  clear           — Limpar o terminal',
        '  auto            — Voltar ao modo demonstração',
      ]
    } else if (lower === 'whoami') {
      output = `${profile.name} — ${profile.role}. ${profile.summary}`
    } else if (lower === 'skills') {
      output = skillGroups.map((g) => `[${g.label}] ${g.items.slice(0, 5).join(', ')}...`)
    } else if (lower === 'projects') {
      output = projects.map((p) => `• ${p.title} (${p.eyebrow}) → ${p.preview}`)
    } else if (lower === 'contact' || lower === 'email') {
      output = `E-mail: ${profile.email} (Copiado!) · GitHub: ${profile.github}`
      navigator.clipboard?.writeText(profile.email)
      onNotify?.('E-mail copiado para a área de transferência! ✨')
    } else if (lower === 'cv' || lower === 'cv dev' || lower === 'cv ops') {
      const targetCv = lower === 'cv ops' ? '/cv-gabriel-rodrigues-suporte.pdf' : lower === 'cv dev' ? '/cv-gabriel-rodrigues-dev.pdf' : mode === 'dev' ? '/cv-gabriel-rodrigues-dev.pdf' : '/cv-gabriel-rodrigues-suporte.pdf'
      window.open(targetCv, '_blank')
      output = `Abrindo currículo: ${targetCv}`
    } else if (lower === 'mode' || lower === 'mode dev' || lower === 'mode ops') {
      const nextMode: Mode = lower === 'mode ops' ? 'ops' : lower === 'mode dev' ? 'dev' : mode === 'dev' ? 'ops' : 'dev'
      setMode?.(nextMode)
      output = `Modo do portfólio alterado para [${nextMode.toUpperCase()}]`
      onNotify?.(`Modo alterado para ${nextMode.toUpperCase()}! 🚀`)
    } else if (lower === 'status' || lower === 'status --production') {
      output = 'systems: healthy · users: supported · ideas: shipping'
    } else if (lower === 'cat mindset.txt') {
      output = 'build → observe → debug → automate → improve'
    } else if (lower === 'clear') {
      setHistory([])
      setInputVal('')
      return
    } else if (lower === 'auto') {
      setIsInteractive(false)
      setHistory([])
      setInputVal('')
      return
    } else {
      isError = true
      output = `Comando não reconhecido: "${cmd}". Digite "help" para ver a lista.`
    }

    setHistory((prev) => [...prev, { command: cmd, output, isError }])
    setInputVal('')
  }

  const activateInteractive = () => {
    setIsInteractive(true)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  return (
    <div className={`terminal-shell ${isInteractive ? 'interactive' : ''}`} onClick={activateInteractive}>
      <div className="terminal-bar">
        <div className="terminal-dots"><i /><i /><i /></div>
        <span>gabriel@portfolio — {isInteractive ? 'interativo (bash)' : 'auto-demo (zsh)'}</span>
        <button
          type="button"
          className="terminal-mode-badge"
          onClick={(e) => {
            e.stopPropagation()
            if (isInteractive) {
              setIsInteractive(false)
              setHistory([])
            } else {
              activateInteractive()
            }
          }}
          title={isInteractive ? 'Voltar para demonstração automática' : 'Clique para digitar comandos'}
        >
          {isInteractive ? 'VOLTAR AUTO' : 'INTERATIVO ↵'}
        </button>
      </div>

      <div className="terminal-body" ref={bodyRef}>
        {!isInteractive ? (
          <div>
            <div><span className="prompt">❯</span> {autoTyped}<span className="caret">▌</span></div>
            {autoShowOutput && <div className="terminal-output">{autoSequences[autoIndex][1]}</div>}
            <div className="terminal-hint">Clique para abrir o terminal interativo</div>
          </div>
        ) : (
          <div className="terminal-history">
            <div className="terminal-welcome">
              Gabriel Terminal v3.0 — Digite <b>help</b> para ver os comandos disponíveis.
            </div>
            {history.map((item, idx) => (
              <div key={idx} className="terminal-entry">
                <div><span className="prompt">❯</span> {item.command}</div>
                <div className={`terminal-output ${item.isError ? 'error' : ''}`}>
                  {Array.isArray(item.output) ? (
                    item.output.map((line, lIdx) => <div key={lIdx}>{line}</div>)
                  ) : (
                    item.output
                  )}
                </div>
              </div>
            ))}
            <form
              className="terminal-input-row"
              onSubmit={(e) => {
                e.preventDefault()
                handleCommand(inputVal)
              }}
            >
              <span className="prompt">❯</span>
              <input
                ref={inputRef}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="digite um comando (ex: help, projects, cv)..."
                autoFocus
                spellCheck={false}
              />
              <span className="caret">▌</span>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
