"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmationModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    isDestructive?: boolean;
}

export default function ConfirmationModal({
    isOpen,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
    isDestructive = false,
}: ConfirmationModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onCancel}
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
                        <motion.div
                            className="w-full max-w-md overflow-hidden rounded-[2.5rem] border border-emerald-500/20 bg-[#141E18] shadow-[0_30px_100px_rgba(0,0,0,0.8)]"
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-8">
                                <div className="mb-6 flex items-center gap-4">
                                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${isDestructive
                                            ? "bg-red-500/10 text-red-500 border border-red-500/20"
                                            : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                        }`}>
                                        <AlertTriangle className="h-7 w-7" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-white tracking-tight">{title}</h3>
                                    </div>
                                </div>

                                <p className="mb-10 text-emerald-100/60 leading-relaxed font-medium">
                                    {message}
                                </p>

                                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                                    <button
                                        onClick={onCancel}
                                        className="rounded-full px-8 py-4 font-bold text-emerald-100/30 transition hover:bg-white/5 hover:text-emerald-100/60"
                                    >
                                        {cancelText}
                                    </button>
                                    <button
                                        onClick={onConfirm}
                                        className={`rounded-full px-8 py-4 font-black text-white shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] ${isDestructive
                                                ? "bg-red-600 shadow-red-900/40 hover:bg-red-700"
                                                : "bg-emerald-600 shadow-emerald-900/40 hover:bg-emerald-700"
                                            }`}
                                    >
                                        {confirmText}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
