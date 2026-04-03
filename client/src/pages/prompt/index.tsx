import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    ArrowRight,
    Bot,
    Sparkles,
    Terminal,
    Command,
    Zap,
    Github
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Route } from "@/routes/index";
import { codeHawkStore } from "@/lib/codehawk-store";

export default function PromptPage() {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const user = codeHawkStore.state.auth.user;

    const navigate = Route.useNavigate();

    const handleAnalyze = () => {
        if (!inputValue) return;
        setIsAnalyzing(true);
        // Navigate to the real CodeHawk agent page with the repo URL
        navigate({
            to: '/codehawk',
            search: { repo: inputValue }
        });
    };

    return (
        <div className="min-h-screen bg-black text-white font-general-sans flex flex-col relative overflow-hidden selection:bg-white/20">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/30 via-black to-black pointer-events-none" />

            <nav className="relative z-10 p-6 flex justify-between items-center border-b border-white/5 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-bold tracking-tighter shadow-lg shadow-white/20">K</div>
                    <span className="font-medium tracking-tight">KODEHAWK</span>
                </div>
                <div className="flex gap-6 text-sm text-zinc-400">
                    <span className="hover:text-white cursor-pointer transition-colors">Documentation</span>
                    <span className="hover:text-white cursor-pointer transition-colors">Enterprise</span>
                    <Link to="/codehawk" className="hover:text-white cursor-pointer transition-colors">CodeHawk Agent</Link>
                    {user ? (
                        <Link to="/report" className="hover:text-white cursor-pointer transition-colors">Report</Link>
                    ) : (
                        <Link to="/login" className="hover:text-white cursor-pointer transition-colors">Login</Link>
                    )}
                </div>
            </nav>

            <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-4">

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Badge variant="outline" className="mb-6 rounded-none border-white/10 text-zinc-400 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest hover:bg-white/10 transition-colors shadow-inner">
                        <Sparkles className="w-3 h-3 mr-2" />
                        AI-Powered Security Analysis
                    </Badge>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-semibold tracking-tighter text-center max-w-4xl mb-6 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent drop-shadow-sm"
                >
                    Secure your code <br /> with intelligent precision.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-zinc-500 text-lg md:text-xl text-center max-w-2xl mb-12 font-light"
                >
                    Instant vulnerability detection and code quality metrics. <br className="hidden md:block" />
                    Simply paste your repository URL to begin.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="w-full max-w-2xl relative"
                >
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-white/20 to-zinc-500/20 opacity-0 group-hover:opacity-100 transition duration-500 blur-lg" />
                        <div className="relative flex bg-zinc-950 border border-white/10 p-1 group-focus-within:border-white/30 transition-all shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)]">
                            <div className="pl-4 flex items-center justify-center text-zinc-500">
                                <Terminal className="w-5 h-5" />
                            </div>
                            <Input
                                className="flex-1 border-0 bg-transparent text-lg h-14 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-zinc-600 font-mono"
                                placeholder="github.com/username/repository"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                            />
                            <Button
                                size="lg"
                                className="h-14 px-8 rounded-none bg-white text-black hover:bg-zinc-200 font-medium transition-all shadow-lg hover:shadow-white/20"
                                onClick={handleAnalyze}
                                disabled={isAnalyzing}
                            >
                                {isAnalyzing ? (
                                    <span className="animate-pulse">Analyzing...</span>
                                ) : (
                                    <>
                                        Analyze <ArrowRight className="ml-2 w-4 h-4" />
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    <div className="mt-4 flex justify-between text-xs text-zinc-600 font-mono">
                        <div className="flex gap-4">
                            <span className="flex items-center gap-1 hover:text-zinc-400 cursor-pointer"><Command className="w-3 h-3" /> P to paste</span>
                            <span className="flex items-center gap-1 hover:text-zinc-400 cursor-pointer"><Terminal className="w-3 h-3" /> CLI available</span>
                        </div>
                        <div>
                            <span>v2.4.0 (Stable)</span>
                        </div>
                    </div>
                </motion.div>
            </main>

            <section className="relative z-10 border-t border-white/5 bg-zinc-950/50 py-16 backdrop-blur-sm shadow-[0_-20px_40px_rgba(0,0,0,0.8)]">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        <div className="p-6 border border-white/5 hover:border-white/10 transition-all bg-zinc-900/20 hover:bg-zinc-900/30 hover:shadow-lg hover:shadow-black/50">
                            <div className="w-10 h-10 bg-white/5 flex items-center justify-center mb-4 text-white shadow-inner">
                                <Bot className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-medium text-white mb-2">Deep Analysis</h3>
                            <p className="text-zinc-500 leading-relaxed text-sm">Advanced static analysis powered by Gemini 3.0 to detect complex vulnerabilities.</p>
                        </div>
                        <div className="p-6 border border-white/5 hover:border-white/10 transition-all bg-zinc-900/20 hover:bg-zinc-900/30 hover:shadow-lg hover:shadow-black/50">
                            <div className="w-10 h-10 bg-white/5 flex items-center justify-center mb-4 text-white shadow-inner">
                                <Zap className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-medium text-white mb-2">Real-time Metrics</h3>
                            <p className="text-zinc-500 leading-relaxed text-sm">Get instant feedback on code quality, maintainability, and security scores.</p>
                        </div>
                        <div className="p-6 border border-white/5 hover:border-white/10 transition-all bg-zinc-900/20 hover:bg-zinc-900/30 hover:shadow-lg hover:shadow-black/50">
                            <div className="w-10 h-10 bg-white/5 flex items-center justify-center mb-4 text-white shadow-inner">
                                <Github className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-medium text-white mb-2">Seamless Integration</h3>
                            <p className="text-zinc-500 leading-relaxed text-sm">Analyzing GitHub repositories directly via URL. No configuration required.</p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div >
    );
}
