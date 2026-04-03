import { useStore } from '@tanstack/react-store';
import { codeHawkStore } from '@/lib/codehawk-store';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, Wifi, WifiOff } from 'lucide-react';

export default function ConnectionStatus() {
    const { isConnected, isConnecting } = useStore(codeHawkStore);

    const toggleConnection = () => {
        if (isConnected) {
            codeHawkStore.disconnect();
        } else {
            codeHawkStore.connect();
        }
    };

    return (
        <div className="flex items-center gap-2">
            {isConnected ? (
                <Badge variant="default" className="bg-green-600 hover:bg-green-700">
                    <Wifi className="mr-1 h-3 w-3" /> Connected
                </Badge>
            ) : (
                <Badge variant="destructive" className="bg-red-950 text-red-300">
                    <WifiOff className="mr-1 h-3 w-3" /> Offline
                </Badge>
            )}
            <Button
                variant="ghost"
                size="icon"
                onClick={toggleConnection}
                disabled={isConnecting}
                title={isConnected ? "Disconnect" : "Connect"}
                className="text-zinc-400 hover:text-white hover:bg-white/10"
            >
                <RefreshCw className={`h-4 w-4 ${isConnecting ? 'animate-spin' : ''}`} />
            </Button>
        </div>
    );
}
