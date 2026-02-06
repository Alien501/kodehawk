import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Play, Shield } from 'lucide-react';
import { codeHawkStore } from '@/lib/codehawk-store';
import { useStore } from '@tanstack/react-store';

interface CommandControlProps {
    initialRepo?: string;
}

export default function CommandControl({ initialRepo }: CommandControlProps) {
    const [repoUrl, setRepoUrl] = useState('https://github.com/tanstack/router');
    const { isConnected, isConnecting } = useStore(codeHawkStore);

    // Initialize repoUrl from prop and handle auto-connect
    useEffect(() => {
        if (initialRepo) {
            setRepoUrl(initialRepo);
            if (!isConnected && !isConnecting) {
                codeHawkStore.connect();
            }
        }
    }, [initialRepo, isConnected, isConnecting]);

    // Handle auto-analyze once connected if we have an initial intention
    useEffect(() => {
        if (initialRepo && isConnected && repoUrl === initialRepo) {
            // Determine if we haven't already started (this is a bit naive but works for now)
            // Ideally store would track "isAnalyzing" separately or we'd check event history length
            if (codeHawkStore.state.events.length === 0) {
                codeHawkStore.sendCommand('analyze', { repoUrl });
            }
        }
    }, [isConnected, initialRepo, repoUrl]);


    const handleAnalyze = () => {
        if (!codeHawkStore.state.isConnected) {
            codeHawkStore.connect();
            // Wait for connection? The store is reactive, but sendCommand checks connection.
            // For manual click, if not connected, we might need a way to queue it or simply rely on user clicking again/logic handling it.
            // Actually, let's keep it simple: if not connected, connect. User might need to click again or we add a "connect and analyze" flow.
            // For now, let's assume manual usage implies they might check connection status.
            // Better UX: Auto-connect on action if not connected.

            // However, keeping existing behavior for manual click unless we want to enhance it.
            // Existing behavior: simple sendCommand.
        }
        codeHawkStore.sendCommand('analyze', { repoUrl });
    };

    const handleSecurity = () => {
        codeHawkStore.sendCommand('security');
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <h2 className="text-xl font-medium text-white mb-4">Control Panel</h2>
            <div className="flex flex-col gap-4">
                <div className="relative flex items-center">
                    <Input
                        className="flex-1 bg-zinc-950/50 border-white/10 text-white placeholder:text-zinc-600 h-12 focus-visible:ring-white/20 focus-visible:border-white/20"
                        placeholder="GitHub Repository URL"
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                        disabled={!isConnected && !initialRepo /* Allow editing if auto-connecting */}
                    />
                    <Button
                        onClick={handleAnalyze}
                        disabled={(!isConnected && !initialRepo) || isConnecting}
                        className="absolute right-1 top-1 bottom-1 bg-white text-black hover:bg-zinc-200"
                    >
                        <Play className="mr-2 h-4 w-4" /> Analyze
                    </Button>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={handleSecurity}
                        disabled={!isConnected}
                        className="bg-transparent border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 hover:border-white/20"
                    >
                        <Shield className="mr-2 h-4 w-4" /> Security Audit
                    </Button>
                </div>
            </div>
        </div>
    );
}
