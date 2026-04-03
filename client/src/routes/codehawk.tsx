import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import ConnectionStatus from '@/components/codehawk/ConnectionStatus';
import CommandControl from '@/components/codehawk/CommandControl';
import EventStream from '@/components/codehawk/EventStream';
import ChatInterface from '@/components/codehawk/ChatInterface';
import { codeHawkStore } from '@/lib/codehawk-store';
import { Button } from '@/components/ui/button';
import { LogOut, ShieldCheck } from 'lucide-react';
import { useStore } from '@tanstack/react-store';

export const Route = createFileRoute('/codehawk')({
    validateSearch: (search: Record<string, unknown>): { repo?: string } => {
        return {
            repo: search.repo as string | undefined,
        }
    },
    beforeLoad: ({ location }) => {
        if (!codeHawkStore.state.auth.isAuthenticated) {
            throw redirect({
                to: '/login',
                search: { redirect: `${location.pathname}${location.searchStr}` },
            });
        }
    },
    component: CodeHawkPage,
});

function CodeHawkPage() {
    const { auth, latestReport } = useStore(codeHawkStore);
    const user = auth.user;

    return (
        <div className="min-h-screen bg-black text-white font-general-sans flex flex-col relative overflow-hidden selection:bg-white/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/30 via-black to-black pointer-events-none" />

            <nav className="relative z-10 p-6 flex justify-between items-center border-b border-white/5 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-bold tracking-tighter shadow-lg shadow-white/20">K</div>
                    <span className="font-medium tracking-tight">KODEHAWK</span>
                </div>
                <div className="flex gap-4 text-sm text-zinc-400 items-center">
                    <Link to="/" className="hover:text-white transition-colors">Home</Link>
                    <Link to="/report" className="hover:text-white transition-colors">Report</Link>
                    {user ? <span className="text-zinc-500">{user.name}</span> : null}
                    <div className="ml-4 pl-4 border-l border-white/10">
                        <ConnectionStatus />
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            codeHawkStore.logout();
                            window.location.assign('/');
                        }}
                        className="text-zinc-400 hover:text-white hover:bg-white/10"
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </div>
            </nav>

            <div className="container mx-auto flex flex-1 flex-col gap-6 p-6 relative z-10">
                <CommandControl initialRepo={Route.useSearch().repo} />
                <div className="min-h-0 flex-1 flex flex-col">
                    <EventStream />
                </div>
                <ChatInterface />
                <div className="flex justify-end">
                    <Button asChild variant="outline" className="bg-transparent border-white/10 text-zinc-300 hover:bg-white/5" disabled={!latestReport}>
                        <Link to="/report">
                            <ShieldCheck className="mr-2 h-4 w-4" />
                            Open report
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
