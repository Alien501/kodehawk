import { createFileRoute } from '@tanstack/react-router';
import ConnectionStatus from '@/components/codehawk/ConnectionStatus';
import CommandControl from '@/components/codehawk/CommandControl';
import EventStream from '@/components/codehawk/EventStream';
import ChatInterface from '@/components/codehawk/ChatInterface';

export const Route = createFileRoute('/codehawk')({
    validateSearch: (search: Record<string, unknown>): { repo?: string } => {
        return {
            repo: search.repo as string | undefined,
        }
    },
    component: CodeHawkPage,
});

function CodeHawkPage() {
    return (
        <div className="min-h-screen bg-black text-white font-general-sans flex flex-col relative overflow-hidden selection:bg-white/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/30 via-black to-black pointer-events-none" />

            <nav className="relative z-10 p-6 flex justify-between items-center border-b border-white/5 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-bold tracking-tighter shadow-lg shadow-white/20">K</div>
                    <span className="font-medium tracking-tight">KODEHAWK</span>
                </div>
                <div className="flex gap-6 text-sm text-zinc-400 items-center">
                    <span className="hover:text-white cursor-pointer transition-colors">Documentation</span>
                    <span className="hover:text-white cursor-pointer transition-colors">Enterprise</span>
                    <span className="hover:text-white cursor-pointer transition-colors">Login</span>
                    <div className="ml-4 pl-4 border-l border-white/10">
                        <ConnectionStatus />
                    </div>
                </div>
            </nav>

            <div className="container mx-auto flex flex-1 flex-col gap-6 p-6 relative z-10">
                <CommandControl initialRepo={Route.useSearch().repo} />
                <div className="min-h-0 flex-1 flex flex-col">
                    <EventStream />
                </div>
                <ChatInterface />
            </div>
        </div>
    );
}
