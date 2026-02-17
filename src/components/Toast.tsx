"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, X, Info } from "lucide-react";
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
        initial: { opacity: 0, y: 50, scale: 0.9, x: "-50%" },
        animate: { opacity: 1, y: 0, scale: 1, x: "-50%" },
        exit: { opacity: 0, y: 20, scale: 0.9, x: "-50%" },
    };

    const getIcon = () => {
        switch (type) {
            case "success":
                return <CheckCircle2 className="h-5 w-5 text-emerald-400" />;
            case "error":
                return <AlertCircle className="h-5 w-5 text-red-500" />;
            case "info":
                return <Info className="h-5 w-5 text-teal-400" />;
            default:
                return <CheckCircle2 className="h-5 w-5 text-emerald-400" />;
        }
    };

    const getStyles = () => {
        switch (type) {
            case "success":
                return "border-emerald-500/30 bg-[#141E18]/90 text-emerald-50 shadow-emerald-900/40 ring-emerald-500/10";
            case "error":
                return "border-red-500/30 bg-[#141E18]/90 text-red-50 shadow-red-900/40 ring-red-500/10";
            case "info":
                return "border-teal-500/30 bg-[#141E18]/90 text-teal-50 shadow-teal-900/40 ring-teal-500/10";
            default:
                return "border-emerald-500/30 bg-[#141E18]/90 text-emerald-50 shadow-emerald-900/40 ring-emerald-500/10";
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed bottom-8 left-1/2 z-[150] w-[calc(100%-2rem)] max-w-sm px-4"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={variants}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                >
                    <div
                        className={`relative flex items-center gap-4 rounded-3xl border-2 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl ring-8 ${getStyles()}`}
                    >
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-black/20 border border-current opacity-80`}>
                            {getIcon()}
                        </div>

                        <p className="flex-1 text-sm font-bold tracking-tight">{message}</p>

                        <button
                            onClick={onClose}
                            className="group p-1 rounded-full hover:bg-white/5 transition"
                        >
                            <X className="h-4 w-4 opacity-30 group-hover:opacity-100" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
