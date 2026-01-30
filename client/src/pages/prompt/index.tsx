import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
    PlayCircle, 
    Wand2, 
    Paperclip, 
    ArrowUp, 
    Sparkles, 
    Bot,
    Plus,
    Activity,
    ShieldAlert,
    FileCode
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function PromptPage() {
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleAnalyze = () => {
        setIsAnalyzing(true);
        window.location.href = "/loading";
    };

    return (
        <div className="bg-zinc-950 min-h-screen text-white overflow-x-hidden selection:bg-zinc-800 selection:text-white">
            <section id="prompt-page" className="font-general-sans min-h-screen flex flex-col items-center justify-center p-4 relative">
                 <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="mb-8 relative z-10"
                >
                    <Badge variant="secondary" className="bg-zinc-900/80 backdrop-blur-md text-zinc-400 hover:bg-zinc-800 border border-zinc-800/50 rounded-full px-4 py-1.5 text-sm font-normal gap-2 cursor-pointer transition-all hover:border-zinc-700">
                       <PlayCircle className="w-4 h-4 text-zinc-500" />
                       Introducing Gemini 3, the most creative model
                    </Badge>
                </motion.div>

                <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    className="text-6xl md:text-8xl font-medium tracking-tight text-white mb-6 text-center relative z-10"
                >
                    KodeHawk
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    className="text-zinc-400 text-lg md:text-xl mb-12 text-center relative z-10 max-w-lg mx-auto"
                >
                    Analyse your codebases in seconds. Detect security flaws, design patterns, and improvement opportunities instantly.{" "}
                    <a href="#" className="text-zinc-400 border-b border-zinc-600 hover:text-white hover:border-white transition-colors pb-0.5">
                        Watch video.
                    </a>
                </motion.p>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                    className="w-full max-w-3xl relative group z-10"
                >
                    <div className="absolute -inset-0.5 bg-gradient-to-b from-white/10 to-transparent rounded-2xl blur opacity-20 transition duration-1000 group-hover:opacity-30"></div>
                    
                    <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4 overflow-hidden shadow-2xl shadow-black/50">
                        <Textarea 
                            className="w-full bg-transparent border-none text-zinc-100 placeholder:text-zinc-600 text-lg resize-none focus-visible:ring-0 min-h-[120px] p-2 font-mono"
                            placeholder="Paste your GitHub repository link here..."
                        />

                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-2">
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="bg-zinc-800/50 border-zinc-700/50 text-zinc-400 hover:bg-zinc-800 hover:text-white rounded-lg h-9 px-3 gap-2 text-xs font-medium backdrop-blur-sm"
                                >
                                    <Wand2 className="w-3.5 h-3.5" />
                                    Prompt Builder
                                </Button>

                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="bg-zinc-800/50 border-zinc-700/50 text-zinc-400 hover:bg-zinc-800 hover:text-white rounded-lg h-9 px-3 gap-2 text-xs font-medium backdrop-blur-sm"
                                >
                                    <Sparkles className="w-3.5 h-3.5" />
                                    Gemini 3 Pro
                                </Button>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button size="icon" variant="ghost" className="h-9 w-9 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
                                    <Bot className="w-4 h-4" />
                                </Button>
                                <Button size="icon" variant="ghost" className="h-9 w-9 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
                                    <Paperclip className="w-4 h-4" />
                                </Button>
                                 <Button size="icon" variant="ghost" className="h-9 w-9 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
                                    <Plus className="w-4 h-4" />
                                </Button>
                                
                                <Button 
                                    size="icon" 
                                    onClick={handleAnalyze}
                                    className="h-9 w-9 bg-white text-black hover:bg-zinc-200 hover:scale-105 rounded-lg ml-2 transition-all duration-300"
                                >
                                    <ArrowUp className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            <section className="py-24 relative z-10 border-t border-zinc-900 bg-zinc-950/50">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-semibold mb-4 text-white">How KodeHawk Works</h2>
                        <p className="text-zinc-400 text-lg">From code to insights in three simple steps.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <FileCode className="w-8 h-8 text-blue-400" />,
                                title: "Input Repository",
                                description: "Simply paste your GitHub public repository link into the prompt area."
                            },
                            {
                                icon: <Activity className="w-8 h-8 text-purple-400" />,
                                title: "AI Analysis",
                                description: "Our advanced AI scans your codebase for patterns, security risks, and logic flaws."
                            },
                            {
                                icon: <ShieldAlert className="w-8 h-8 text-green-400" />,
                                title: "Detailed Report",
                                description: "Receive a comprehensive dashboard highlighting critical issues and fixes."
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700/80 p-6 rounded-2xl transition-all hover:bg-zinc-900/50"
                            >
                                <div className="bg-zinc-950 rounded-xl w-14 h-14 flex items-center justify-center mb-6 border border-zinc-800">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-medium text-white mb-2">{item.title}</h3>
                                <p className="text-zinc-500 leading-relaxed">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
