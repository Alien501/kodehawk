import { useStore } from '@tanstack/react-store'

import { Badge } from '@/components/ui/badge'
import { codeHawkStore, type CodeHawkEvent } from '@/lib/codehawk-store'

function EventItem({ event }: { event: CodeHawkEvent }) {
  switch (event.type) {
    case 'status':
      return (
        <div className="mb-3 flex items-center gap-3 text-sm text-zinc-300">
          <Badge variant="outline" className="border-white/10 bg-white/5 text-zinc-300">
            STATUS
          </Badge>
          <span>{event.content}</span>
        </div>
      )
    case 'thinking':
      return (
        <details className="mb-3 border border-blue-500/20 bg-blue-500/5 p-3 text-sm text-zinc-200">
          <summary className="cursor-pointer font-medium text-blue-300">
            Reasoning
            <span className="ml-2 font-mono text-xs text-blue-200/70">{event.tool}</span>
          </summary>
          <div className="mt-3 space-y-2">
            <pre className="overflow-auto whitespace-pre-wrap bg-black/30 p-3 text-xs text-zinc-400">
              {JSON.stringify(event.args, null, 2)}
            </pre>
            <p className="whitespace-pre-wrap text-zinc-300">{event.content}</p>
          </div>
        </details>
      )
    case 'observation':
      return (
        <div className="mb-3 border-l-2 border-emerald-500 pl-3 text-sm">
          <p className="mb-1 text-xs uppercase tracking-[0.25em] text-emerald-400">Observation</p>
          <pre className="max-h-40 overflow-auto whitespace-pre-wrap bg-black/30 p-3 text-xs text-zinc-300">
            {event.content}
          </pre>
        </div>
      )
    case 'thought':
      return (
        <div className="mb-3 rounded-xl bg-white/5 p-4 text-sm text-zinc-200">
          <p className="mb-2 text-xs uppercase tracking-[0.25em] text-zinc-500">Agent</p>
          <p className="whitespace-pre-wrap">{event.content}</p>
        </div>
      )
    case 'error':
      return (
        <div className="mb-3 border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
          <p className="mb-1 font-medium">Error</p>
          <p>{event.content}</p>
        </div>
      )
    case 'result':
      return (
        <div className="mb-3 border border-white/10 bg-white/5 p-3 text-sm text-zinc-200">
          <p className="mb-1 text-xs uppercase tracking-[0.25em] text-zinc-500">Report updated</p>
          <p>
            {event.report?.repoName} with {event.report?.overview.totalIssues ?? 0} findings across{' '}
            {event.report?.overview.filesWithIssues ?? 0} files.
          </p>
        </div>
      )
    case 'complete':
      return (
        <div className="mb-4 border-t border-white/10 pt-3 text-center text-sm text-emerald-400">
          {event.command ? `${event.command} completed` : 'Command completed'}
        </div>
      )
    default:
      return null
  }
}

export default function EventStream() {
  const { events } = useStore(codeHawkStore)

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/30 backdrop-blur-sm">
      <div className="border-b border-white/10 bg-white/5 p-4">
        <h3 className="text-sm font-medium text-white">Activity Log</h3>
      </div>
      <div className="h-[500px] flex-1 overflow-y-auto p-4">
        {events.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-zinc-500">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <span className="animate-pulse text-lg">o</span>
            </div>
            <p className="text-sm">Session ready for analysis.</p>
          </div>
        ) : (
          events.map((event, index) => <EventItem key={`${event.timestamp}-${index}`} event={event} />)
        )}
      </div>
    </div>
  )
}
