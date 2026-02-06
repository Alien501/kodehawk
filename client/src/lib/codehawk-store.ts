import { Store } from '@tanstack/store';

export type EventType = 'status' | 'thinking' | 'observation' | 'thought' | 'error' | 'complete';

export interface CodeHawkEvent {
    type: EventType;
    content?: string;
    tool?: string;
    args?: any;
    full_content_length?: number;
    command?: string;
    timestamp: number;
}

export interface CodeHawkState {
    isConnected: boolean;
    isConnecting: boolean;
    events: CodeHawkEvent[];
    error: string | null;
    currentTask: string | null;
}

export class CodeHawkStore extends Store<CodeHawkState> {
    private ws: WebSocket | null = null;

    constructor() {
        super({
            isConnected: false,
            isConnecting: false,
            events: [],
            error: null,
            currentTask: null,
        });
    }

    connect = (url: string = 'ws://localhost:8000/ws/analyze') => {
        if (this.ws) {
            this.ws.close();
        }

        this.setState((state) => ({ ...state, isConnecting: true, error: null }));

        try {
            this.ws = new WebSocket(url);

            this.ws.onopen = () => {
                this.setState((state) => ({ ...state, isConnected: true, isConnecting: false }));
            };

            this.ws.onclose = () => {
                this.setState((state) => ({ ...state, isConnected: false, isConnecting: false }));
            };

            this.ws.onerror = (err) => {
                console.error("WebSocket error:", err);
                this.setState((state) => ({ ...state, error: 'Connection failed', isConnecting: false }));
            };

            this.ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    const newEvent: CodeHawkEvent = { ...data, timestamp: Date.now() };

                    this.setState((state) => ({
                        ...state,
                        events: [...state.events, newEvent],
                        currentTask: data.type === 'status' ? data.content : state.currentTask
                    }));
                } catch (e) {
                    console.error('Failed to parse WS message', e);
                }
            };

        } catch (e) {
            this.setState((state) => ({ ...state, isConnecting: false, error: 'Failed to create WebSocket' }));
        }
    };

    disconnect = () => {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    };

    sendCommand = (command: string, params: any = {}) => {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
        this.ws.send(JSON.stringify({ command, params }));
    };

    clearEvents = () => {
        this.setState((state) => ({ ...state, events: [] }));
    }
}

export const codeHawkStore = new CodeHawkStore();
