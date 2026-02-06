import { useStore } from '@tanstack/react-store';
import { codeHawkStore } from '@/lib/codehawk-store';
import type { CodeHawkEvent } from '@/lib/codehawk-store';
import { Badge } from '@/components/ui/badge';

function EventItem({ event }: { event: CodeHawkEvent }) {
    switch (event.type) {
        case 'status':
            return (
                <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="outline">STATUS</Badge>
                    <span>{event.content}</span>
                </div>
            );
        case 'thinking':
            return (
                <details className="mb-2 rounded-md border bg-muted/50 p-2 text-sm group">
                    <summary className="cursor-pointer font-semibold text-blue-500 hover:underline">
                        Thinking... <span className="text-xs text-muted-foreground font-mono ml-2">{event.tool}</span>
                    </summary>
                    <div className="mt-2 pl-4">
                        <div className="font-mono text-xs mb-1">Args: {JSON.stringify(event.args)}</div>
                        <div>{event.content}</div>
                    </div>
                </details>
            );
        case 'observation':
            return (
                <div className="mb-2 ml-4 border-l-2 border-green-500 pl-2 text-xs text-muted-foreground">
                    <div className="font-semibold text-green-600">Observation</div>
                    <pre className="max-h-40 overflow-auto whitespace-pre-wrap rounded bg-black/5 p-2 font-mono">
                        {event.content}
                    </pre>
                </div>
            );
        case 'thought':
            return (
                <div className="mb-4 rounded-lg bg-primary/10 p-3 text-sm">
                    <div className="font-semibold text-primary">Agent</div>
                    <div className="whitespace-pre-wrap">{event.content}</div>
                </div>
            );
        case 'error':
            return (
                <div className="mb-2 rounded border border-red-200 bg-red-50 p-2 text-sm text-red-600 dark:bg-red-900/20">
                    <div className="font-bold">Error</div>
                    {event.content}
                </div>
            );
        case 'complete':
            return (
                <div className="mb-4 border-t pt-2 text-center text-sm font-semibold text-green-600">
                    --- Command Completed ---
                </div>
            )
        default:
            return null;
    }
}

export default function EventStream() {
    const { events } = useStore(codeHawkStore);

    return (
        <div className="h-full flex flex-col rounded-lg border border-white/10 bg-zinc-950/30 backdrop-blur-sm overflow-hidden">
            <div className="p-4 border-b border-white/10 bg-white/5">
                <h3 className="text-sm font-medium text-white">Activity Log</h3>
            </div>
            <div className="flex-1 overflow-hidden p-0">
                <div className="h-[500px] overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    {events.map((event, i) => (
                        <EventItem key={i} event={event} />
                    ))}
                    {events.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full text-zinc-500 gap-2">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                                <span className="animate-pulse">●</span>
                            </div>
                            <p className="text-sm">Ready to analyze</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
