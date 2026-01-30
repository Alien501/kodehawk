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
    Hash,
    Cpu,
    Network,
    Lock,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AnalysisGraph from "@/components/AnalysisGraph";

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
        linesScanned: 14502,
        graphData: [
            { subject: 'Security', A: 85, B: 95, fullMark: 100 },
            { subject: 'Reliability', A: 90, B: 98, fullMark: 100 },
            { subject: 'Maintainability', A: 72, B: 90, fullMark: 100 },
            { subject: 'Performance', A: 80, B: 85, fullMark: 100 },
            { subject: 'Complexity', A: 65, B: 85, fullMark: 100 },
            { subject: 'Best Practices', A: 78, B: 95, fullMark: 100 },
        ]
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
        High: "text-red-500 border-red-500/30 bg-red-500/10",
        Medium: "text-orange-500 border-orange-500/30 bg-orange-500/10",
        Low: "text-blue-500 border-blue-500/30 bg-blue-500/10"
    };
    return (
        <span className={`px-2 py-0.5 text-[10px] font-mono border uppercase tracking-wider ${styles[severity as keyof typeof styles] || styles.Low}`}>
            {severity}
        </span>
    );
};

export default function ReportPage() {
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [hoveredFile, setHoveredFile] = useState<string | null>(null);
    const [refactorOps, setRefactorOps] = useState([
        { id: 1, label: "Remove unused imports (5 files)", status: "pending" },
        { id: 2, label: "Standardize API error handling", status: "pending" },
        { id: 3, label: "Optimize image assets in /public", status: "pending" }
    ]);

    const handleRefactor = (id: number) => {
        setRefactorOps(prev => prev.map(op => 
            op.id === id ? { ...op, status: "refactoring" } : op
        ));

        setTimeout(() => {
            setRefactorOps(prev => prev.map(op => 
                op.id === id ? { ...op, status: "completed" } : op
            ));
        }, 2000);
    };

    const currentFileArgs = selectedFile ? analysisData.files.find(f => f.name === selectedFile) : null;

    return (
        <div className="dark h-screen bg-black text-white font-general-sans flex selection:bg-white/20 overflow-hidden">
            
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-zinc-900/40 via-black to-black" />
            </div>

            <aside className="w-80 bg-zinc-950 border-r border-white/5 flex flex-col z-10 relative shadow-2xl h-full">
                <div className="p-6 border-b border-white/5 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-bold tracking-tighter shadow-lg shadow-white/20">K</div>
                        <div>
                            <h1 className="text-sm font-bold tracking-[0.2em] text-white">KODEHAWK</h1>
                            <p className="text-[10px] text-zinc-500 uppercase">System v2.4.0</p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-8">
                    <div>
                        <p className="px-2 text-[10px] text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <LayoutDashboard className="w-3 h-3" /> System Overview
                        </p>
                        <Button 
                            variant="ghost" 
                            className={`w-full justify-start h-10 rounded-none border-l-2 ${!selectedFile ? 'border-white bg-white/5 text-white shadow-inner' : 'border-transparent text-zinc-400 hover:text-white hover:bg-white/5'}`}
                            onClick={() => setSelectedFile(null)}
                        >
                            <Cpu className="w-4 h-4 mr-3" />
                            <span className="text-xs font-medium tracking-wide">DASHBOARD</span>
                        </Button>
                    </div>

                    <div>
                        <p className="px-2 text-[10px] text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <Hash className="w-3 h-3" /> File Explorer
                        </p>
                        <div className="space-y-1">
                            {analysisData.files.map((file) => (
                                <Button
                                    key={file.name}
                                    variant="ghost"
                                    className={`w-full justify-start h-9 rounded-none text-xs font-normal border-l-2 transition-all ${
                                        selectedFile === file.name 
                                        ? 'border-white bg-white/5 text-white shadow-inner' 
                                        : 'border-transparent text-zinc-500 hover:text-white hover:bg-white/5'
                                    }`}
                                    onClick={() => setSelectedFile(file.name)}
                                    onMouseEnter={() => setHoveredFile(file.name)}
                                    onMouseLeave={() => setHoveredFile(null)}
                                >
                                    <div className={`w-1.5 h-1.5 rounded-full mr-3 ${
                                        file.status === 'critical' ? 'bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]' : 
                                        file.status === 'warning' ? 'bg-orange-500' : 'bg-green-500'
                                    }`} />
                                    <span className="truncate flex-1 font-mono">{file.name}</span>
                                    {hoveredFile === file.name && <ChevronRight className="w-3 h-3 text-zinc-600" />}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
                
                <div className="p-4 border-t border-white/5 bg-zinc-950 shadow-[0_-5px_15px_rgba(0,0,0,0.5)] shrink-0">
                    <div className="flex justify-between items-center text-[10px] text-zinc-500 mb-2 font-mono">
                        <span>SCAN_PROGRESS</span>
                        <span className="text-white">100%</span>
                    </div>
                    <div className="w-full h-0.5 bg-zinc-900">
                        <div className="h-full bg-white w-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                    </div>
                </div>
            </aside>

            <main className="flex-1 h-full overflow-y-auto relative z-10 bg-black">
                <div className="p-10 max-w-7xl mx-auto min-h-full">
                    
                    <div className="mb-12 flex items-end justify-between border-b border-white/5 pb-6">
                        <div>
                            <div className="flex items-center text-xs text-zinc-500 mb-3 font-mono">
                                <span className="opacity-50">ROOT</span>
                                <ChevronRight className="w-3 h-3 mx-1" />
                                <span className="opacity-50">SRC</span>
                                <ChevronRight className="w-3 h-3 mx-1" />
                                <span className="text-white font-medium">{selectedFile ? selectedFile.split("/").pop() : "OVERVIEW"}</span>
                            </div>
                            <h2 className="text-4xl font-light text-white tracking-tight drop-shadow-lg">
                                {selectedFile ? "File Analysis" : "System Diagnostics"}
                            </h2>
                        </div>
                        <div className="flex gap-8">
                           <div className="text-right">
                                <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Duration</p>
                                <p className="text-2xl font-light text-white drop-shadow-md">{analysisData.overview.scanDuration}</p>
                           </div>
                           <div className="w-px h-12 bg-white/10"></div>
                           <div className="text-right">
                                <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Files</p>
                                <p className="text-2xl font-light text-white drop-shadow-md">{analysisData.files.length}</p>
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
                                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
                                        {[
                                            { label: "SECURITY_SCORE", value: analysisData.overview.securityScore, icon: Lock },
                                            { label: "MAINTAINABILITY", value: analysisData.overview.maintainability, icon: Cpu },
                                            { label: "RELIABILITY", value: analysisData.overview.reliability, icon: Network }
                                        ].map((stat, i) => (
                                            <Card key={i} className="bg-zinc-900/40 border-white/5 rounded-none relative overflow-hidden group hover:border-white/10 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)] backdrop-blur-sm">
                                                <CardHeader className="pb-2">
                                                    <CardTitle className="text-zinc-500 text-[10px] uppercase tracking-widest font-mono flex items-center justify-between">
                                                        {stat.label}
                                                        <stat.icon className="w-4 h-4 opacity-30" />
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-6xl font-light text-white tracking-tighter drop-shadow-lg">{stat.value}</span>
                                                        <span className="text-sm text-zinc-500">/100</span>
                                                    </div>
                                                    <div className="w-full h-0.5 bg-zinc-800 mt-6">
                                                        <motion.div 
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${stat.value}%` }}
                                                            transition={{ duration: 1, delay: 0.2 + (i * 0.1) }}
                                                            className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.4)]" 
                                                        />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                    <div className="md:col-span-1 bg-zinc-900/40 border border-white/5 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm flex flex-col justify-center">
                                       <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">Metric Visualization</h3>
                                       <AnalysisGraph data={analysisData.overview.graphData} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="bg-zinc-900/40 border border-white/5 p-6 shadow-xl backdrop-blur-sm">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-sm font-medium text-white flex items-center gap-2 tracking-wide">
                                                <Shield className="w-4 h-4" /> ACTIVE THREATS
                                            </h3>
                                            <Badge variant="outline" className="text-[10px] rounded-none border-red-900 text-red-500 bg-red-950/10 px-2 py-0.5 shadow-[0_0_10px_rgba(239,68,68,0.1)]">CRITICAL</Badge>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-start gap-4 p-4 bg-red-950/5 border border-red-500/10 hover:border-red-500/30 transition-all group cursor-pointer hover:shadow-lg hover:shadow-red-900/10">
                                                <div className="mt-1">
                                                    <AlertTriangle className="w-4 h-4 text-red-500 drop-shadow-md" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-red-200 text-sm font-medium mb-1">Hardcoded Credentials Logic</p>
                                                    <p className="text-zinc-500 text-[10px] font-mono">SRC/AUTH/LOGIN.TS:42</p>
                                                </div>
                                                <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-white transition-colors" />
                                            </div>
                                             <div className="flex items-start gap-4 p-4 bg-orange-950/5 border border-orange-500/10 hover:border-orange-500/30 transition-all group cursor-pointer hover:shadow-lg hover:shadow-orange-900/10">
                                                <div className="mt-1">
                                                    <AlertTriangle className="w-4 h-4 text-orange-500 drop-shadow-md" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-orange-200 text-sm font-medium mb-1">Weak Input Validation</p>
                                                    <p className="text-zinc-500 text-[10px] font-mono">SERVER/API/ROUTES.JS:15</p>
                                                </div>
                                                <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-white transition-colors" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-zinc-900/40 border border-white/5 p-6 shadow-xl backdrop-blur-sm">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-sm font-medium text-white flex items-center gap-2 tracking-wide">
                                                <Zap className="w-4 h-4" /> REFACTOR OPS
                                            </h3>
                                        </div>
                                         <div className="space-y-4">
                                            {refactorOps.map((op) => (
                                                <div 
                                                    key={op.id} 
                                                    className={`flex items-center gap-4 group p-3 border border-transparent transition-all cursor-pointer hover:bg-white/5 ${op.status === 'completed' ? 'opacity-50' : ''}`}
                                                    onClick={() => op.status === 'pending' && handleRefactor(op.id)}
                                                >
                                                    <div className={`w-5 h-5 flex items-center justify-center transition-colors border ${
                                                        op.status === 'completed' ? 'bg-green-500/20 border-green-500/50' : 'bg-zinc-900 border-zinc-800 group-hover:border-white/50'
                                                    } shadow-inner`}>
                                                        {op.status === 'completed' ? (
                                                            <CheckCircle2 className="w-3 h-3 text-green-500" />
                                                        ) : op.status === 'refactoring' ? (
                                                            <Loader2 className="w-3 h-3 text-white animate-spin" />
                                                        ) : (
                                                            <CheckCircle2 className="w-3 h-3 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                                        )}
                                                    </div>
                                                    <span className={`text-sm transition-colors ${
                                                        op.status === 'completed' ? 'text-zinc-500 line-through decoration-zinc-700' : 'text-zinc-400 group-hover:text-white'
                                                    }`}>{op.label}</span>
                                                    {op.status === 'refactoring' && (
                                                        <span className="text-[10px] text-zinc-500 font-mono animate-pulse ml-auto">PROCESSING...</span>
                                                    )}
                                                    {op.status === 'completed' && (
                                                        <span className="text-[10px] text-green-500 font-mono ml-auto">DONE</span>
                                                    )}
                                                </div>
                                            ))}
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
                                    <div className="flex flex-col items-center justify-center py-24 border border-dashed border-white/10 bg-zinc-900/5 shadow-inner">
                                        <CheckCircle2 className="w-16 h-16 text-green-500/50 mb-6 drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]" />
                                        <h3 className="text-xl font-light text-white mb-2">System Optimal</h3>
                                        <p className="text-zinc-500 font-mono text-sm">No anomalies detected in this sector.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {currentFileArgs && currentFileArgs.issues.map((issue, idx) => (
                                            <motion.div 
                                                key={idx}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="group"
                                            >
                                                <div className="bg-zinc-900/40 border border-white/5 hover:border-white/10 transition-all shadow-lg hover:shadow-2xl">
                                                    <div className="flex">
                                                        <div className="p-6 flex-1">
                                                            <div className="flex items-start justify-between mb-4">
                                                                <div className="flex items-center gap-3">
                                                                    <SeverityBadge severity={issue.severity} />
                                                                    <span className="text-zinc-500 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1">
                                                                        <Bug className="w-3 h-3" /> {issue.type}
                                                                    </span>
                                                                </div>
                                                                <span className="text-zinc-600 text-xs font-mono">LN {issue.line}</span>
                                                            </div>
                                                            
                                                            <h3 className="text-base font-medium text-white mb-2 tracking-tight drop-shadow-md">{issue.title}</h3>
                                                            <p className="text-zinc-400 text-sm mb-6 max-w-2xl leading-relaxed">{issue.description}</p>
                                                            
                                                            <div className="relative shadow-2xl">
                                                                <div className="absolute top-0 left-0 px-2 py-1 bg-white text-black text-[10px] font-bold font-mono uppercase tracking-widest leading-none z-10">Snippet</div>
                                                                <div className="bg-black p-6 pt-10 border border-white/10 font-mono text-xs text-zinc-300 overflow-x-auto relative">
                                                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
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

