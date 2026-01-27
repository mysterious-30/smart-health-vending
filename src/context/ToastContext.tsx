"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import Toast, { ToastType } from "@/components/Toast";

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toast, setToast] = useState<{
        visible: boolean;
        message: string;
        type: ToastType;
    }>({
        visible: false,
        message: "",
        type: "success",
    });

    const showToast = (message: string, type: ToastType = "success") => {
        setToast({ visible: true, message, type });
    };

    const hideToast = () => {
        setToast((prev) => ({ ...prev, visible: false }));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Toast
                message={toast.message}
                type={toast.type}
                isVisible={toast.visible}
                onClose={hideToast}
            />
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}
