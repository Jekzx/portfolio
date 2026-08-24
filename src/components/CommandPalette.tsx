import { useEffect, useMemo, useState } from 'react'
import { BriefcaseBusiness, Code2, Copy, Download, Github, Mail, Network, Search, Wrench } from 'lucide-react'
import type { Mode } from '../data/profile'
import { profile } from '../data/profile'

type Props = {
  mode: Mode
  setMode: (mode: Mode) => void
  onNotify?: (msg: string) => void
}

export function CommandPalette({ mode, setMode, onNotify }: Props) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((value) => !value)
      }
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const actions = useMemo(() => [
    { label: 'Ir para projetos', hint: '#work', icon: BriefcaseBusiness, action: () => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: 'Ir para experiência', hint: '#experience', icon: Network, action: () => document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: 'Ativar modo DEV', hint: mode === 'dev' ? 'ativo' : 'software', icon: Code2, action: () => { setMode('dev'); onNotify?.('Modo DEV ativado! ⚡') } },
    { label: 'Ativar modo OPS', hint: mode === 'ops' ? 'ativo' : 'support', icon: Wrench, action: () => { setMode('ops'); onNotify?.('Modo OPS ativado! 🛠️') } },
    {
      label: 'Copiar e-mail',
      hint: profile.email,
      icon: Copy,
      action: () => {
        navigator.clipboard?.writeText(profile.email)
        onNotify?.('E-mail copiado para a área de transferência! ✨')
      },
    },
    { label: 'Enviar e-mail (abrir app)', hint: 'mailto', icon: Mail, action: () => { window.location.href = `mailto:${profile.email}` } },
    { label: 'Abrir GitHub', hint: 'github.com/Jekzx', icon: Github, action: () => window.open(profile.github, '_blank') },
    {
      label: mode === 'dev' ? 'Baixar CV de desenvolvimento (Ativo)' : 'Baixar CV de desenvolvimento',
      hint: mode === 'dev' ? 'PDF Atual' : 'PDF',
      icon: Download,
      action: () => window.open('/cv-gabriel-rodrigues-dev.pdf', '_blank'),
    },
    {
      label: mode === 'ops' ? 'Baixar CV de suporte (Ativo)' : 'Baixar CV de suporte',
      hint: mode === 'ops' ? 'PDF Atual' : 'PDF',
      icon: Download,
      action: () => window.open('/cv-gabriel-rodrigues-suporte.pdf', '_blank'),
    },
  ], [mode, setMode, onNotify])

  const visible = actions.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()) || item.hint.toLowerCase().includes(query.toLowerCase()))

  const run = (action: () => void) => {
    action()
    setOpen(false)
    setQuery('')
  }

  if (!open) return null

  return (
    <div className="command-backdrop" onMouseDown={() => setOpen(false)}>
      <div className="command-palette" onMouseDown={(event) => event.stopPropagation()}>
        <div className="command-search">
          <Search size={18} />
          <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Navegue pelo sistema…" />
          <kbd>ESC</kbd>
        </div>
        <div className="command-results">
          {visible.map(({ label, hint, icon: Icon, action }) => (
            <button type="button" key={label} onClick={() => run(action)}>
              <span><Icon size={17} /> {label}</span>
              <small>{hint}</small>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
