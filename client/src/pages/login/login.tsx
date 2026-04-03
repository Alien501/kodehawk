import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ChromeIcon, GithubIcon, Lock, Shield, TerminalSquare } from 'lucide-react'

import { Route } from '@/routes/login'
import { codeHawkStore } from '@/lib/codehawk-store'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  const { redirect } = Route.useSearch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const redirectTarget = redirect && redirect.startsWith('/') ? redirect : '/codehawk'

  const finishLogin = (provider: 'credentials' | 'github' | 'google') => {
    const normalizedEmail =
      email.trim() ||
      (provider === 'github'
        ? 'demo.github@kodehawk.dev'
        : provider === 'google'
          ? 'demo.google@kodehawk.dev'
          : '')

    if (!normalizedEmail) {
      setError('Enter an email to continue.')
      return
    }

    if (provider === 'credentials' && password.trim().length < 4) {
      setError('Use at least 4 characters for the prototype password.')
      return
    }

    codeHawkStore.login({ email: normalizedEmail, provider })
    window.location.assign(redirectTarget)
  }

  return (
    <div className="min-h-screen bg-black text-white font-general-sans grid lg:grid-cols-[1.1fr_0.9fr]">
      <section className="relative overflow-hidden border-b border-white/5 lg:border-b-0 lg:border-r">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.12),_transparent_40%),linear-gradient(135deg,_rgba(255,255,255,0.04),_transparent_55%)]" />
        <div className="relative flex h-full flex-col justify-between p-8 lg:p-12">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center bg-white text-black font-bold tracking-tight">K</div>
            <div>
              <p className="text-lg font-medium tracking-tight">KODEHAWK</p>
              <p className="text-xs text-zinc-500 uppercase tracking-[0.25em]">Security Workspace</p>
            </div>
          </div>

          <div className="max-w-xl space-y-8 py-12">
            <Badge variant="outline" className="rounded-none border-white/10 bg-white/5 px-3 py-1 text-zinc-300">
              Prototype session auth
            </Badge>
            <h1 className="text-5xl font-semibold tracking-tight leading-tight">
              Stitch auth, live analysis, and reporting into one workspace.
            </h1>
            <p className="max-w-lg text-base text-zinc-400 leading-7">
              This login is local prototype auth for now. It protects the analysis and report routes, persists your
              session in the browser, and gives the frontend a single state model to work from.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="border border-white/10 bg-white/5 p-4">
                <Shield className="mb-3 h-5 w-5 text-white" />
                <p className="text-sm font-medium">Protected routes</p>
                <p className="mt-2 text-xs text-zinc-500">`/codehawk` and `/report` now depend on session state.</p>
              </div>
              <div className="border border-white/10 bg-white/5 p-4">
                <TerminalSquare className="mb-3 h-5 w-5 text-white" />
                <p className="text-sm font-medium">Single workspace</p>
                <p className="mt-2 text-xs text-zinc-500">Analysis and report use the same repo/report session.</p>
              </div>
              <div className="border border-white/10 bg-white/5 p-4">
                <Lock className="mb-3 h-5 w-5 text-white" />
                <p className="text-sm font-medium">Prototype safe</p>
                <p className="mt-2 text-xs text-zinc-500">No backend identity yet. This is local-only auth.</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-600">
            <span>&copy; KodeHawk</span>
            <Link to="/" className="hover:text-white transition-colors">
              Back to home
            </Link>
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md border border-white/10 bg-zinc-950/80 p-8 shadow-2xl backdrop-blur">
          <div className="mb-8 space-y-2">
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Access workspace</p>
            <h2 className="text-3xl font-semibold tracking-tight">Sign in</h2>
            <p className="text-sm text-zinc-500">Use credentials or one-click demo providers.</p>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-400">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="team@college.edu"
                className="border-white/10 bg-black/40 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-zinc-400">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="prototype password"
                className="border-white/10 bg-black/40 text-white"
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    finishLogin('credentials')
                  }
                }}
              />
            </div>

            {error ? <p className="text-sm text-red-400">{error}</p> : null}

            <Button
              className="w-full rounded-none bg-white text-black hover:bg-zinc-200"
              onClick={() => finishLogin('credentials')}
            >
              Sign in with credentials
            </Button>

            <div className="relative py-2 text-center text-xs uppercase tracking-[0.3em] text-zinc-600">
              <span className="bg-zinc-950 px-3">or</span>
              <div className="absolute inset-x-0 top-1/2 -z-10 h-px -translate-y-1/2 bg-white/10" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Button
                variant="outline"
                className="rounded-none border-white/10 bg-transparent text-zinc-200 hover:bg-white/5"
                onClick={() => finishLogin('github')}
              >
                <GithubIcon className="mr-2 h-4 w-4" />
                GitHub demo
              </Button>
              <Button
                variant="outline"
                className="rounded-none border-white/10 bg-transparent text-zinc-200 hover:bg-white/5"
                onClick={() => finishLogin('google')}
              >
                <ChromeIcon className="mr-2 h-4 w-4" />
                Google demo
              </Button>
            </div>

            <p className="text-xs text-zinc-500">
              Redirect after login:
              <span className="ml-2 font-mono text-zinc-300">{redirectTarget}</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
