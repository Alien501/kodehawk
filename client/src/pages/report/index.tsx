import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    AlertTriangle, 
    CheckCircle2, 
    ChevronRight, 
    LayoutDashboard, 
    Shield, 
    Zap,
    Bug,
    Terminal,
    Hash,
    Cpu,
    Network,
    Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock Data (Enhanced)
const analysisData = {
    overview: {
        securityScore: 85,
        maintainability: 72,
        reliability: 90,
        totalIssues: 12,
        critical: 2,
        medium: 5,
        low: 5,
        scanDuration: "1.4s",
        linesScanned: 14502
    },
    files: [
        {
            name: "src/auth/login.ts",
            status: "critical",
            type: "ts",
            issues: [
                { type: "SECURITY", severity: "High", title: "HARDCODED_CREDENTIALS", description: "Potential secret key detected in source code.", line: 42, snippet: "const API_KEY = 'sk_live_...';" },
                { type: "RELIABILITY", severity: "Medium", title: "UNHANDLED_PROMISE", description: "Async operation missing catch block.", line: 28, snippet: "await authProvider.login(creds);" }
            ]
        },
        {
            name: "server/api/routes.js",
            status: "warning",
            type: "js",
            issues: [
                { type: "SECURITY", severity: "Medium", title: "WEAK_INPUT_VALIDATION", description: "Input scrubbing missing for 'req.body.email'.", line: 15, snippet: "const { email } = req.body;" },
                { type: "MAINTAINABILITY", severity: "Low", title: "HIGH_COMPLEXITY", description: "Cyclomatic complexity index > 15.", line: 5, snippet: "function process(req, res) { ... }" }
            ]
        },
        {
            name: "src/components/Sidebar.tsx",
            status: "success",
            type: "tsx",
            issues: []
        },
        {
            name: "src/utils/helpers.ts",
            status: "warning",
            type: "ts",
            issues: [
                 { type: "COMPLEXITY", severity: "Low", title: "NESTED_CONDITIONALS", description: "Deeply nested if-statements (depth 4).", line: 88, snippet: "if (a) { if (b) { if (c) ... } }" }
            ]
        }
    ]
};

const SeverityBadge = ({ severity }: { severity: string }) => {
    const styles = {
        High: "text-red-500 border-red-500/30 bg-red-500/10 shadow-[0_0_10px_rgba(239,68,68,0.2)]",
        Medium: "text-orange-500 border-orange-500/30 bg-orange-500/10",
        Low: "text-blue-500 border-blue-500/30 bg-blue-500/10"
    };
    return (
        <span className={`px-2 py-0.5 rounded-sm text-[10px] font-mono border uppercase tracking-wider ${styles[severity as keyof typeof styles] || styles.Low}`}>
            {severity}
        </span>
    );
};

export default function ReportPage() {
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [hoveredFile, setHoveredFile] = useState<string | null>(null);

    const currentFileArgs = selectedFile ? analysisData.files.find(f => f.name === selectedFile) : null;

    return (
        <div className="dark min-h-screen bg-black text-green-50 font-mono selection:bg-green-500/30 selection:text-green-50 overflow-hidden flex">
            
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%]"></div>
                <div className="absolute top-0 left-0 w-full h-[1px] bg-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.4)]"></div>
            </div>

            <aside className="w-72 bg-zinc-950/80 backdrop-blur-sm border-r border-zinc-800/50 flex flex-col z-10">
                <div className="p-6 border-b border-zinc-800/50">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-500/10 border border-green-500/30 rounded flex items-center justify-center">
                            <Terminal className="w-4 h-4 text-green-500" />
                        </div>
                        <div>
                            <h1 className="text-sm font-bold tracking-[0.2em] text-white">KODEHAWK</h1>
                            <p className="text-[10px] text-zinc-500 uppercase">System v2.4.0</p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    <div>
                        <p className="px-2 text-[10px] text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <LayoutDashboard className="w-3 h-3" /> System Overview
                        </p>
                        <Button 
                            variant="ghost" 
                            className={`w-full justify-start h-9 rounded-sm border ${!selectedFile ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'border-transparent text-zinc-400 hover:text-white hover:bg-white/5'}`}
                            onClick={() => setSelectedFile(null)}
                        >
                            <Cpu className="w-3.5 h-3.5 mr-2" />
                            <span className="text-xs">DASHBOARD</span>
                        </Button>
                    </div>

                    <div>
                        <p className="px-2 text-[10px] text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <Hash className="w-3 h-3" /> File Explorer
                        </p>
                        <div className="space-y-1">
                            {analysisData.files.map((file) => (
                                <motion.div key={file.name} whileHover={{ x: 2 }}>
                                    <Button
                                        variant="ghost"
                                        className={`w-full justify-start h-8 rounded-sm text-xs font-normal border transition-all ${
                                            selectedFile === file.name 
                                            ? 'bg-zinc-900 border-zinc-700 text-white shadow-lg' 
                                            : 'border-transparent text-zinc-500 hover:text-zinc-300'
                                        }`}
                                        onClick={() => setSelectedFile(file.name)}
                                        onMouseEnter={() => setHoveredFile(file.name)}
                                        onMouseLeave={() => setHoveredFile(null)}
                                    >
                                        <div className={`w-1.5 h-1.5 rounded-full mr-3 ${
                                            file.status === 'critical' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse' : 
                                            file.status === 'warning' ? 'bg-orange-500' : 'bg-green-500'
                                        }`} />
                                        <span className="truncate flex-1">{file.name}</span>
                                        {hoveredFile === file.name && <ChevronRight className="w-3 h-3 text-zinc-600 opacity-50" />}
                                    </Button>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
                
                <div className="p-4 border-t border-zinc-800/50">
                    <div className="bg-zinc-900/50 p-3 rounded-sm border border-zinc-800/50">
                        <div className="flex justify-between items-center text-[10px] text-zinc-500 mb-1">
                            <span>SCAN_PROGRESS</span>
                            <span className="text-green-500">COMPLETE</span>
                        </div>
                        <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 w-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                        </div>
                    </div>
                </div>
            </aside>

            <main className="flex-1 overflow-y-auto relative z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black">
                <div className="p-8 max-w-7xl mx-auto min-h-full">
                    
                    <div className="mb-10 flex items-end justify-between border-b border-zinc-800 pb-4">
                        <div>
                            <div className="flex items-center text-xs text-zinc-500 mb-2 font-mono">
                                <span className="opacity-50">ROOT</span>
                                <ChevronRight className="w-3 h-3 mx-1" />
                                <span className="opacity-50">SRC</span>
                                <ChevronRight className="w-3 h-3 mx-1" />
                                <span className="text-green-500 font-bold">{selectedFile ? selectedFile.split("/").pop() : "OVERVIEW"}</span>
                            </div>
                            <h2 className="text-3xl font-light text-white tracking-tight">
                                {selectedFile ? "File Analysis" : "System Diagnostics"}
                            </h2>
                        </div>
                        <div className="flex gap-4">
                           <div className="text-right">
                                <p className="text-[10px] text-zinc-500 uppercase">Duration</p>
                                <p className="text-xl font-mono text-white">{analysisData.overview.scanDuration}</p>
                           </div>
                           <div className="w-px h-10 bg-zinc-800"></div>
                           <div className="text-right">
                                <p className="text-[10px] text-zinc-500 uppercase">Files</p>
                                <p className="text-xl font-mono text-white">{analysisData.files.length}</p>
                           </div>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {!selectedFile ? (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }} 
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-8"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {[
                                        { label: "SECURITY_SCORE", value: analysisData.overview.securityScore, icon: Lock, color: "text-green-500" },
                                        { label: "MAINTAINABILITY", value: analysisData.overview.maintainability, icon: Cpu, color: "text-orange-500" },
                                        { label: "RELIABILITY", value: analysisData.overview.reliability, icon: Network, color: "text-blue-500" }
                                    ].map((stat, i) => (
                                        <Card key={i} className="bg-zinc-900/30 border-zinc-800 backdrop-blur-sm relative overflow-hidden group hover:border-zinc-700 transition-colors">
                                            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${stat.color}`}>
                                                <stat.icon className="w-24 h-24" />
                                            </div>
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-zinc-500 text-[10px] uppercase tracking-widest font-mono flex items-center justify-between">
                                                    {stat.label}
                                                    <stat.icon className="w-4 h-4 opacity-50" />
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-5xl font-light text-white tracking-tighter">{stat.value}</span>
                                                    <span className="text-sm text-zinc-500">/100</span>
                                                </div>
                                                <div className="w-full h-1 bg-zinc-800 mt-4 overflow-hidden">
                                                    <motion.div 
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${stat.value}%` }}
                                                        transition={{ duration: 1, delay: 0.2 + (i * 0.1) }}
                                                        className={`h-full ${stat.color.replace('text', 'bg')} shadow-[0_0_10px_currentColor]`} 
                                                    />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="bg-zinc-900/20 border border-zinc-800/50 rounded p-1">
                                        <div className="bg-black/50 p-4 border-b border-zinc-800/50 flex justify-between items-center">
                                            <h3 className="text-sm font-bold text-red-500 flex items-center gap-2 tracking-wider">
                                                <Shield className="w-4 h-4" /> ACTIVE THREATS
                                            </h3>
                                            <Badge variant="outline" className="text-[10px] text-red-500 border-red-900 bg-red-900/10 animate-pulse">CRITICAL</Badge>
                                        </div>
                                        <div className="p-4 space-y-3">
                                            <div className="flex items-start gap-4 p-3 bg-red-950/10 border border-red-500/10 rounded-sm hover:bg-red-950/20 transition-colors group cursor-pointer">
                                                <div className="mt-1">
                                                    <AlertTriangle className="w-4 h-4 text-red-500" />
                                                </div>
                                                <div>
                                                    <p className="text-red-400 text-xs font-bold uppercase mb-0.5">Hardcoded Credentials</p>
                                                    <p className="text-zinc-500 text-[10px] font-mono">SRC/AUTH/LOGIN.TS:42</p>
                                                </div>
                                                <ChevronRight className="w-4 h-4 text-red-500/30 ml-auto group-hover:text-red-500 transition-colors" />
                                            </div>
                                             <div className="flex items-start gap-4 p-3 bg-orange-950/10 border border-orange-500/10 rounded-sm hover:bg-orange-950/20 transition-colors group cursor-pointer">
                                                <div className="mt-1">
                                                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                                                </div>
                                                <div>
                                                    <p className="text-orange-400 text-xs font-bold uppercase mb-0.5">Weak Input Validation</p>
                                                    <p className="text-zinc-500 text-[10px] font-mono">SERVER/API/ROUTES.JS:15</p>
                                                </div>
                                                <ChevronRight className="w-4 h-4 text-orange-500/30 ml-auto group-hover:text-orange-500 transition-colors" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-zinc-900/20 border border-zinc-800/50 rounded p-1">
                                        <div className="bg-black/50 p-4 border-b border-zinc-800/50">
                                            <h3 className="text-sm font-bold text-blue-400 flex items-center gap-2 tracking-wider">
                                                <Zap className="w-4 h-4" /> REFACTOR_OPS
                                            </h3>
                                        </div>
                                         <div className="p-4">
                                            <ul className="space-y-4">
                                                {[
                                                    "Remove unused imports (5 files)",
                                                    "Standardize API error handling",
                                                    "Optimize image assets in /public"
                                                ].map((item, i) => (
                                                    <li key={i} className="flex items-center gap-3 group">
                                                        <div className="w-5 h-5 rounded bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:border-blue-500 transition-colors">
                                                            <CheckCircle2 className="w-3 h-3 text-blue-500" />
                                                        </div>
                                                        <span className="text-xs text-zinc-400 font-mono group-hover:text-white transition-colors">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                         </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="detail"
                                initial={{ opacity: 0, x: 20 }} 
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                {currentFileArgs && currentFileArgs.issues.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-20 border border-dashed border-zinc-800 rounded bg-zinc-900/20">
                                        <CheckCircle2 className="w-16 h-16 text-green-500 mb-6 opacity-80 shadow-[0_0_30px_rgba(34,197,94,0.3)] rounded-full" />
                                        <h3 className="text-xl font-light text-white mb-2">System Optimal</h3>
                                        <p className="text-zinc-500 font-mono text-sm">No anomalies detected in this sector.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {currentFileArgs && currentFileArgs.issues.map((issue, idx) => (
                                            <motion.div 
                                                key={idx}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="group"
                                            >
                                                <div className="bg-zinc-900/40 border border-zinc-800 hover:border-zinc-600 transition-colors overflow-hidden rounded-sm">
                                                    <div className="flex">
                                                        <div className={`w-1 ${
                                                            issue.severity === 'High' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 
                                                            issue.severity === 'Medium' ? 'bg-orange-500' : 'bg-blue-500'
                                                        }`} />
                                                        <div className="p-5 flex-1">
                                                            <div className="flex items-start justify-between mb-3">
                                                                <div className="flex items-center gap-3">
                                                                    <SeverityBadge severity={issue.severity} />
                                                                    <span className="text-zinc-500 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1">
                                                                        <Bug className="w-3 h-3" /> {issue.type}
                                                                    </span>
                                                                </div>
                                                                <span className="text-zinc-600 text-xs font-mono">LN {issue.line}</span>
                                                            </div>
                                                            
                                                            <h3 className="text-sm font-bold text-white mb-2 tracking-wide">{issue.title}</h3>
                                                            <p className="text-zinc-400 text-xs mb-4 max-w-2xl leading-relaxed">{issue.description}</p>
                                                            
                                                            <div className="relative group/code">
                                                                <div className="absolute top-0 left-0 px-2 py-1 bg-zinc-800 text-[10px] text-zinc-400 font-mono rounded-br">SNAP_0{idx+1}</div>
                                                                <div className="bg-black/80 rounded p-4 pt-8 border border-zinc-800 font-mono text-xs text-zinc-400 overflow-x-auto">
                                                                    <code>
                                                                        {issue.snippet}
                                                                    </code>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}

