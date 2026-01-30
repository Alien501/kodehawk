import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileCode, Shield, Zap, Terminal } from "lucide-react";

export default function LoadingPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const scanningMessages = [
        "Initializing Codebase Scan...",
        "Parsing Abstract Syntax Trees...",
        "Identifying Security Vulnerabilities...",
        "Calculating Cyclomatic Complexity...",
        "Generating Final Report..."
    ];

    const mockFiles = [
        "src/auth/AuthProvider.tsx",
        "src/components/Header.tsx",
        "server/routes/api.ts",
        "src/utils/helpers.ts",
        "config/webpack.config.js"
    ];

    const [currentFile, setCurrentFile] = useState(mockFiles[0]);

    useEffect(() => {
        const messageInterval = setInterval(() => {
            setCurrentStep((prev) => (prev < scanningMessages.length - 1 ? prev + 1 : prev));
        }, 1200);

        const fileInterval = setInterval(() => {
            setCurrentFile(mockFiles[Math.floor(Math.random() * mockFiles.length)]);
        }, 150);

        const timeout = setTimeout(() => {
            window.location.href = "/report";
        }, 6969);

        return () => {
            clearInterval(messageInterval);
            clearInterval(fileInterval);
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 font-mono text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

            <div className="w-full max-w-lg relative z-10 flex flex-col items-center">
                
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-white/5 blur-xl"></div>
                    <motion.div
                         animate={{ rotate: 360 }}
                         transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                         className="w-16 h-16 border-2 border-white/20 border-t-white rounded-none"
                    />
                </div>

                <div className="h-8 mb-2 flex items-center justify-center overflow-hidden w-full text-center">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={currentStep}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="text-lg font-medium tracking-tight text-white"
                        >
                            {scanningMessages[currentStep]}
                        </motion.p>
                    </AnimatePresence>
                </div>

                <div className="flex items-center gap-3 text-zinc-500 text-xs font-mono mb-8 border border-white/10 bg-white/5 py-1 px-3 w-full justify-between">
                    <span className="flex items-center gap-2">
                        <Terminal className="w-3 h-3" />
                         SCANNING_TARGET
                    </span>
                    <span className="text-zinc-400 truncate max-w-[200px]">{currentFile}</span>
                </div>

                <div className="w-full h-0.5 bg-zinc-900 mb-8 overflow-hidden relative">
                    <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 6.5, ease: "easeInOut" }}
                        className="absolute h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    />
                </div>

                <div className="grid grid-cols-3 gap-12 text-zinc-600 w-full text-center">
                   <div className="flex flex-col items-center gap-3">
                        <FileCode className={`w-5 h-5 transition-colors duration-500 ${currentStep > 0 ? 'text-white' : ''}`} />
                        <span className="text-[10px] uppercase tracking-widest">Parsing</span>
                   </div>
                   <div className="flex flex-col items-center gap-3">
                        <Shield className={`w-5 h-5 transition-colors duration-500 ${currentStep > 1 ? 'text-white' : ''}`} />
                         <span className="text-[10px] uppercase tracking-widest">Security</span>
                   </div>
                   <div className="flex flex-col items-center gap-3">
                        <Zap className={`w-5 h-5 transition-colors duration-500 ${currentStep > 2 ? 'text-white' : ''}`} />
                         <span className="text-[10px] uppercase tracking-widest">Metrics</span>
                   </div>
                </div>
            </div>
            
            <div className="absolute bottom-8 text-zinc-600 text-[10px] tracking-[0.2em]">
                KODEHAWK SYSTEM v2.4.0
            </div>
        </div>
    );
}
