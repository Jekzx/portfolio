import { useQuery } from '@tanstack/react-query'
import { ExternalLink, GitFork, Star } from 'lucide-react'

type Repo = {
  id: number
  name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
}

const fallback: Repo[] = [
  { id: 1, name: 'smartflow-ai', html_url: 'https://github.com/Jekzx/smartflow-ai', description: 'AI-powered task, incident, SLA and standup management platform.', language: 'TypeScript', stargazers_count: 0, forks_count: 0, updated_at: '2026-08-24T00:00:00Z' },
  { id: 2, name: 'servicedesk-bot', html_url: 'https://github.com/Jekzx/servicedesk-bot', description: 'WhatsApp N1 automation, diagnostics, SLA and service desk dashboard.', language: 'Python', stargazers_count: 0, forks_count: 0, updated_at: '2026-08-24T00:00:00Z' },
  { id: 3, name: 'ecommerce-platform', html_url: 'https://github.com/Jekzx/ecommerce-platform', description: 'Full-stack NEXUS Store with checkout and administrative dashboard.', language: 'TypeScript', stargazers_count: 0, forks_count: 0, updated_at: '2026-08-24T00:00:00Z' },
]

async function getRepos(): Promise<Repo[]> {
  const response = await fetch('https://api.github.com/users/Jekzx/repos?sort=updated&per_page=6')
  if (!response.ok) throw new Error('GitHub unavailable')
  return response.json()
}

export function GitHubLab() {
  const { data = fallback, isError, isLoading } = useQuery({ queryKey: ['github-repos'], queryFn: getRepos })

  return (
    <section className="github-lab section" id="github">
      <div className="container">
        <div className="section-kicker"><span>06</span> / LIVE GITHUB</div>
        <div className="section-heading split-heading">
          <h2>O código não termina<br />no portfólio.</h2>
          <p>Esta seção consulta a API pública do GitHub em tempo real. Se a API estiver indisponível ou atingir rate limit, o conteúdo essencial permanece disponível por fallback.</p>
        </div>

        <div className="github-status">
          <span className={`status-light ${isError ? 'warning' : ''}`} />
          {isLoading ? 'Conectando com github.com/Jekzx…' : isError ? 'Fallback local ativo' : 'GitHub API conectada'}
        </div>

        <div className="repo-grid">
          {data.slice(0, 6).map((repo, index) => (
            <a className="repo-card spotlight-card" href={repo.html_url} target="_blank" rel="noreferrer" key={repo.id} data-cursor="interactive">
              <div className="repo-top">
                <span className="repo-index">0{index + 1}</span>
                <ExternalLink size={18} />
              </div>
              <h3>{repo.name}</h3>
              <p>{repo.description || 'Repositório público no GitHub.'}</p>
              <div className="repo-meta">
                <span><i className="language-dot" />{repo.language || 'Mixed'}</span>
                <span><Star size={14} /> {repo.stargazers_count}</span>
                <span><GitFork size={14} /> {repo.forks_count}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
