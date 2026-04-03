import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { codeHawkStore } from '@/lib/codehawk-store';
import { useStore } from '@tanstack/react-store';

export default function ChatInterface() {
    const [message, setMessage] = useState('');
    const { isConnected, isConnecting } = useStore(codeHawkStore);

    const handleSend = () => {
        if (!message.trim()) return;
        codeHawkStore.sendChatMessage(message.trim());
        setMessage('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="flex w-full items-center space-x-2 rounded-lg border border-white/10 bg-zinc-950/50 p-2 backdrop-blur-sm">
            <Input
                type="text"
                placeholder="Ask CodeHawk a question..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={!isConnected}
                className="flex-1 border-0 bg-transparent text-white placeholder:text-zinc-600 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button
                type="submit"
                size="icon"
                onClick={handleSend}
                disabled={!isConnected || isConnecting}
                className="bg-white text-black hover:bg-zinc-200"
            >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
            </Button>
        </div>
    );
}
