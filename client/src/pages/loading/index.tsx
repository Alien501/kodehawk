import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileCode, ShieldAlert, CheckCircle2, Loader2 } from "lucide-react";

const scanningMessages = [
    "Cloning repository...",
    "Parsing codebase structure...",
    "Analyzing dependencies...",
    "Scanning for security vulnerabilities...",
    "Checking for anti-patterns...",
    "Calculating complexity scores...",
    "Generating report..."
];

const mockFiles = [
    "src/App.tsx",
    "src/components/Button.tsx",
    "src/utils/api.ts",
    "server/routes/auth.js",
    "package.json",
    "src/hooks/useAuth.ts"
];

export default function LoadingPage() {
    const [currentStep, setCurrentStep] = useState(0);
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
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 font-general-sans text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

            <div className="w-full max-w-md relative z-10 flex flex-col items-center">
                
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="bg-zinc-900 border border-zinc-800 p-4 rounded-full shadow-2xl relative z-10"
                    >
                        <Loader2 className="w-8 h-8 text-blue-500" />
                    </motion.div>
                </div>

                <div className="h-8 mb-2 flex items-center justify-center overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={currentStep}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-xl font-medium text-white text-center"
                        >
                            {scanningMessages[currentStep]}
                        </motion.p>
                    </AnimatePresence>
                </div>

                <p className="text-zinc-500 text-sm font-mono mb-8 h-5 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Scanning: {currentFile}
                </p>

                <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden mb-8 border border-zinc-800/50">
                    <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 6, ease: "linear" }}
                        className="h-full bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]"
                    />
                </div>

                <div className="flex gap-8 text-zinc-600">
                   <div className="flex flex-col items-center gap-2">
                        <FileCode className={`w-5 h-5 transition-colors duration-500 ${currentStep > 0 ? 'text-blue-400' : ''}`} />
                        <span className="text-xs">Structure</span>
                   </div>
                   <div className="flex flex-col items-center gap-2">
                        <ShieldAlert className={`w-5 h-5 transition-colors duration-500 ${currentStep > 2 ? 'text-red-400' : ''}`} />
                        <span className="text-xs">Security</span>
                   </div>
                   <div className="flex flex-col items-center gap-2">
                        <CheckCircle2 className={`w-5 h-5 transition-colors duration-500 ${currentStep > 4 ? 'text-green-400' : ''}`} />
                        <span className="text-xs">Quality</span>
                   </div>
                </div>
            </div>
        </div>
    );
}
