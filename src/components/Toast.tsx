"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, X } from "lucide-react";
import { useEffect } from "react";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
    message: string;
    type: ToastType;
    isVisible: boolean;
    onClose: () => void;
}

export default function Toast({ message, type, isVisible, onClose }: ToastProps) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    const variants = {
        initial: { opacity: 0, y: 50, scale: 0.9 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 20, scale: 0.9 },
    };

    const getIcon = () => {
        switch (type) {
            case "success":
                return <CheckCircle2 className="h-6 w-6 text-green-400" />;
            case "error":
                return <AlertCircle className="h-6 w-6 text-red-400" />;
            default:
                return <CheckCircle2 className="h-6 w-6 text-cyan-400" />;
        }
    };

    const getStyles = () => {
        switch (type) {
            case "success":
                return "border-green-500/40 bg-gradient-to-br from-slate-900/95 to-slate-800/95 ring-green-500/20";
            case "error":
                return "border-red-500/40 bg-gradient-to-br from-slate-900/95 to-slate-800/95 ring-red-500/20";
            default:
                return "border-cyan-500/40 bg-gradient-to-br from-slate-900/95 to-slate-800/95 ring-cyan-500/20";
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed bottom-8 left-1/2 z-[100] w-full max-w-sm -translate-x-1/2 px-4"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={variants}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                >
                    <div
                        className={`relative flex items-center gap-4 rounded-2xl border-2 p-4 shadow-2xl backdrop-blur-md ring-4 ${getStyles()}`}
                    >
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 ${type === 'success' ? 'bg-green-500/10' : type === 'error' ? 'bg-red-500/10' : 'bg-cyan-500/10'}`}>
                            {getIcon()}
                        </div>

                        <p className="flex-1 text-sm font-medium text-white">{message}</p>

                        <button
                            onClick={onClose}
                            className="group rounded-full p-1 text-slate-400 transition hover:bg-white/10 hover:text-white"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
