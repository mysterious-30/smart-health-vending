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
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onCancel}
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
                        <motion.div
                            className="w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-slate-900 shadow-2xl"
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 sm:p-8">
                                <div className="mb-6 flex items-center gap-4">
                                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${isDestructive
                                            ? "bg-red-500/10 text-red-400"
                                            : "bg-amber-500/10 text-amber-400"
                                        }`}>
                                        <AlertTriangle className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">{title}</h3>
                                    </div>
                                </div>

                                <p className="mb-8 text-slate-300 leading-relaxed">
                                    {message}
                                </p>

                                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                    <button
                                        onClick={onCancel}
                                        className="rounded-xl px-6 py-3 font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
                                    >
                                        {cancelText}
                                    </button>
                                    <button
                                        onClick={onConfirm}
                                        className={`rounded-xl px-6 py-3 font-semibold text-white shadow-lg transition ${isDestructive
                                                ? "bg-red-500 hover:bg-red-600 shadow-red-500/20"
                                                : "bg-cyan-500 hover:bg-cyan-600 shadow-cyan-500/20"
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
