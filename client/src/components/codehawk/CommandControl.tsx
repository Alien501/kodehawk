import { useEffect, useRef, useState } from 'react'
import { useStore } from '@tanstack/react-store'
import { Play, Shield, Trash2 } from 'lucide-react'

import { codeHawkStore } from '@/lib/codehawk-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface CommandControlProps {
  initialRepo?: string
}

export default function CommandControl({ initialRepo }: CommandControlProps) {
  const { isConnected, isConnecting, repoUrl, latestReport, currentCommand, error } = useStore(codeHawkStore)
  const [draftRepoUrl, setDraftRepoUrl] = useState(repoUrl || 'https://github.com/tanstack/router')
  const autoTriggeredRepo = useRef<string | null>(null)

  useEffect(() => {
    if (!initialRepo) {
      return
    }

    setDraftRepoUrl(initialRepo)
    codeHawkStore.setRepoUrl(initialRepo)

    if (autoTriggeredRepo.current === initialRepo) {
      return
    }

    autoTriggeredRepo.current = initialRepo
    codeHawkStore.analyzeRepo(initialRepo)
  }, [initialRepo])

  useEffect(() => {
    if (repoUrl && repoUrl !== draftRepoUrl) {
      setDraftRepoUrl(repoUrl)
    }
  }, [repoUrl, draftRepoUrl])

  const handleAnalyze = () => {
    const normalizedRepoUrl = draftRepoUrl.trim()
    if (!normalizedRepoUrl) {
      return
    }
    codeHawkStore.setRepoUrl(normalizedRepoUrl)
    codeHawkStore.analyzeRepo(normalizedRepoUrl)
  }

  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl border border-white/10 bg-zinc-950/40 p-5 backdrop-blur-sm">
      <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Workspace control</p>
          <h2 className="mt-2 text-2xl font-medium text-white">Analyze a repository and keep the report session attached.</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm text-zinc-400 md:text-right">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-600">Socket</p>
            <p className="mt-1 text-white">{isConnecting ? 'Connecting' : isConnected ? 'Connected' : 'Idle'}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-600">Current task</p>
            <p className="mt-1 text-white">{currentCommand ?? 'None'}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 xl:flex-row">
          <Input
            className="h-12 flex-1 border-white/10 bg-black/40 text-white placeholder:text-zinc-600"
            placeholder="https://github.com/owner/repository"
            value={draftRepoUrl}
            onChange={(event) => setDraftRepoUrl(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleAnalyze()
              }
            }}
          />
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={handleAnalyze}
              disabled={currentCommand === 'analyze' || isConnecting}
              className="bg-white text-black hover:bg-zinc-200"
            >
              <Play className="mr-2 h-4 w-4" />
              {currentCommand === 'analyze' ? 'Analyzing' : 'Analyze'}
            </Button>
            <Button
              variant="outline"
              onClick={() => codeHawkStore.runSecurityAudit()}
              disabled={!latestReport || currentCommand === 'security'}
              className="border-white/10 bg-transparent text-zinc-300 hover:bg-white/5"
            >
              <Shield className="mr-2 h-4 w-4" />
              {currentCommand === 'security' ? 'Auditing' : 'Security audit'}
            </Button>
            <Button
              variant="ghost"
              onClick={() => codeHawkStore.clearEvents()}
              className="text-zinc-400 hover:text-white hover:bg-white/10"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear log
            </Button>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <div className="border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-600">Repository</p>
            <p className="mt-2 truncate font-mono text-sm text-white">{repoUrl || 'Not selected'}</p>
          </div>
          <div className="border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-600">Latest report</p>
            <p className="mt-2 text-sm text-white">{latestReport?.repoName ?? 'No report yet'}</p>
          </div>
          <div className="border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-600">Status</p>
            <p className={`mt-2 text-sm ${error ? 'text-red-400' : 'text-white'}`}>{error ?? 'Ready'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
