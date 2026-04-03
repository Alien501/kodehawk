import { Store } from '@tanstack/store'

export type EventType =
  | 'status'
  | 'thinking'
  | 'observation'
  | 'thought'
  | 'error'
  | 'complete'
  | 'result'

export type CommandType = 'analyze' | 'security' | 'chat'
export type AuthProvider = 'credentials' | 'github' | 'google'
export type Severity = 'Critical' | 'High' | 'Medium' | 'Low'

export interface CodeHawkEvent {
  type: EventType
  content?: string
  tool?: string
  args?: unknown
  command?: CommandType
  success?: boolean
  report?: ScanReport
  timestamp: number
}

export interface UserSession {
  email: string
  name: string
  provider: AuthProvider
}

export interface ScanIssue {
  id: string
  source: 'regex' | 'ai'
  category: string
  title: string
  description: string
  severity: Severity
  line?: number
  endLine?: number
  snippet?: string | null
  recommendation?: string | null
}

export interface ScanFileReport {
  path: string
  issueCount: number
  highestSeverity: Severity
  issues: ScanIssue[]
}

export interface ScanOverview {
  securityScore: number
  maintainability: number
  reliability: number
  totalIssues: number
  critical: number
  high: number
  medium: number
  low: number
  filesWithIssues: number
  scannedFiles?: number
}

export interface ScanReport {
  repoUrl: string
  repoName: string
  repoPath: string
  generatedAt?: string
  metadata?: unknown
  overview: ScanOverview
  files: ScanFileReport[]
  highlights: string[]
  raw?: unknown
}

interface PersistedState {
  auth: {
    isAuthenticated: boolean
    user: UserSession | null
  }
  repoUrl: string
  latestReport: ScanReport | null
}

export interface CodeHawkState {
  auth: {
    isAuthenticated: boolean
    user: UserSession | null
  }
  isConnected: boolean
  isConnecting: boolean
  socketUrl: string
  events: CodeHawkEvent[]
  error: string | null
  currentTask: string | null
  currentCommand: CommandType | null
  pendingCommand: { command: CommandType; params: Record<string, unknown> } | null
  repoUrl: string
  latestReport: ScanReport | null
}

const STORAGE_KEY = 'kodehawk.app.state'

function getDefaultSocketUrl() {
  const envUrl = import.meta.env.VITE_CODEHAWK_WS_URL as string | undefined
  if (envUrl) {
    return envUrl
  }

  if (typeof window === 'undefined') {
    return 'ws://localhost:8000/ws/analyze'
  }

  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
  const host = window.location.hostname || 'localhost'
  return `${protocol}//${host}:8000/ws/analyze`
}

function readPersistedState(): PersistedState | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return null
    }
    return JSON.parse(raw) as PersistedState
  } catch {
    return null
  }
}

export class CodeHawkStore extends Store<CodeHawkState> {
  private ws: WebSocket | null = null

  constructor() {
    const persisted = readPersistedState()
    super({
      auth: persisted?.auth ?? {
        isAuthenticated: false,
        user: null,
      },
      isConnected: false,
      isConnecting: false,
      socketUrl: getDefaultSocketUrl(),
      events: [],
      error: null,
      currentTask: null,
      currentCommand: null,
      pendingCommand: null,
      repoUrl: persisted?.repoUrl ?? '',
      latestReport: persisted?.latestReport ?? null,
    })
  }

  private commit = (updater: (state: CodeHawkState) => CodeHawkState) => {
    this.setState((state) => {
      const nextState = updater(state)
      if (typeof window !== 'undefined') {
        const persisted: PersistedState = {
          auth: nextState.auth,
          repoUrl: nextState.repoUrl,
          latestReport: nextState.latestReport,
        }
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted))
      }
      return nextState
    })
  }

  login = (input: { email: string; name?: string; provider?: AuthProvider }) => {
    const email = input.email.trim()
    const name =
      input.name?.trim() ||
      email.split('@')[0]?.replace(/[._-]+/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()) ||
      'KodeHawk User'

    this.commit((state) => ({
      ...state,
      auth: {
        isAuthenticated: true,
        user: {
          email,
          name,
          provider: input.provider ?? 'credentials',
        },
      },
      error: null,
    }))
  }

  logout = () => {
    this.disconnect()
    this.commit((state) => ({
      ...state,
      auth: {
        isAuthenticated: false,
        user: null,
      },
      repoUrl: '',
      latestReport: null,
      events: [],
      currentTask: null,
      currentCommand: null,
      pendingCommand: null,
      error: null,
    }))
  }

  setRepoUrl = (repoUrl: string) => {
    this.commit((state) => ({
      ...state,
      repoUrl,
    }))
  }

  connect = (url: string = this.state.socketUrl) => {
    if (this.ws?.readyState === WebSocket.OPEN || this.ws?.readyState === WebSocket.CONNECTING) {
      return
    }

    if (this.ws) {
      this.ws.close()
      this.ws = null
    }

    this.commit((state) => ({
      ...state,
      socketUrl: url,
      isConnecting: true,
      error: null,
    }))

    try {
      this.ws = new WebSocket(url)

      this.ws.onopen = () => {
        this.commit((state) => ({
          ...state,
          isConnected: true,
          isConnecting: false,
        }))

        if (this.state.pendingCommand) {
          const pending = this.state.pendingCommand
          this.ws?.send(JSON.stringify(pending))
        }
      }

      this.ws.onclose = () => {
        this.commit((state) => ({
          ...state,
          isConnected: false,
          isConnecting: false,
        }))
      }

      this.ws.onerror = () => {
        this.commit((state) => ({
          ...state,
          error: 'Connection failed',
          isConnecting: false,
        }))
      }

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as Omit<CodeHawkEvent, 'timestamp'>
          const nextEvent: CodeHawkEvent = {
            ...data,
            timestamp: Date.now(),
          }

          this.commit((state) => ({
            ...state,
            events: [...state.events, nextEvent],
            currentTask: data.type === 'status' ? data.content ?? state.currentTask : state.currentTask,
            currentCommand:
              data.type === 'complete'
                ? null
                : data.command ?? state.currentCommand,
            pendingCommand:
              data.type === 'complete' ? null : state.pendingCommand,
            latestReport: data.type === 'result' && data.report ? data.report : state.latestReport,
            repoUrl:
              data.type === 'result' && data.report?.repoUrl
                ? data.report.repoUrl
                : state.repoUrl,
            error: data.type === 'error' ? data.content ?? 'Unknown error' : state.error,
          }))
        } catch {
          this.commit((state) => ({
            ...state,
            error: 'Failed to parse server message',
          }))
        }
      }
    } catch {
      this.commit((state) => ({
        ...state,
        isConnecting: false,
        error: 'Failed to create WebSocket',
      }))
    }
  }

  disconnect = () => {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }

    this.commit((state) => ({
      ...state,
      isConnected: false,
      isConnecting: false,
      pendingCommand: null,
    }))
  }

  sendCommand = (command: CommandType, params: Record<string, unknown> = {}) => {
    const payload = { command, params }

    this.commit((state) => ({
      ...state,
      currentCommand: command,
      pendingCommand: payload,
      error: null,
    }))

    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      this.connect()
      return
    }

    this.ws.send(JSON.stringify(payload))
  }

  analyzeRepo = (repoUrl: string) => {
    this.commit((state) => ({
      ...state,
      repoUrl,
      latestReport: state.latestReport?.repoUrl === repoUrl ? state.latestReport : state.latestReport,
    }))
    this.sendCommand('analyze', { repoUrl })
  }

  runSecurityAudit = () => {
    this.sendCommand('security')
  }

  sendChatMessage = (message: string) => {
    this.sendCommand('chat', { message })
  }

  clearEvents = () => {
    this.commit((state) => ({
      ...state,
      events: [],
      error: null,
      currentTask: null,
    }))
  }
}

export const codeHawkStore = new CodeHawkStore()
