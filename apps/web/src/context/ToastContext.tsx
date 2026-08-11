import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  durationMs: number;
}

interface ToastContextType {
  showSuccess: (message: string, durationMs?: number) => void;
  showError: (message: string, durationMs?: number) => void;
  showInfo: (message: string, durationMs?: number) => void;
  showWarning: (message: string, durationMs?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((type: ToastType, message: string, durationMs = 4000) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newItem: ToastItem = { id, type, message, durationMs };

    setToasts((prev) => [...prev.slice(-4), newItem]); // Max 5 toasts visible

    if (durationMs > 0) {
      setTimeout(() => {
        removeToast(id);
      }, durationMs);
    }
  }, [removeToast]);

  const showSuccess = useCallback((message: string, durationMs = 3500) => addToast('success', message, durationMs), [addToast]);
  const showError = useCallback((message: string, durationMs = 5000) => addToast('error', message, durationMs), [addToast]);
  const showInfo = useCallback((message: string, durationMs = 3500) => addToast('info', message, durationMs), [addToast]);
  const showWarning = useCallback((message: string, durationMs = 4000) => addToast('warning', message, durationMs), [addToast]);

  return (
    <ToastContext.Provider value={{ showSuccess, showError, showInfo, showWarning }}>
      {children}
      {/* Fixed Toast Container */}
      <div className="fixed top-20 right-4 z-50 flex flex-col space-y-2 max-w-sm w-full pointer-events-none px-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start space-x-3 p-4 rounded-lg shadow-lg border text-sm font-medium transition-all transform translate-y-0 ${
              toast.type === 'success'
                ? 'bg-emerald-900 text-emerald-100 border-emerald-700'
                : toast.type === 'error'
                ? 'bg-red-900 text-red-100 border-red-700'
                : toast.type === 'warning'
                ? 'bg-amber-900 text-amber-100 border-amber-700'
                : 'bg-slate-900 text-slate-100 border-slate-700'
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {toast.type === 'error' && <XCircle className="w-5 h-5 text-red-400" />}
              {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400" />}
            </div>
            <div className="flex-1 text-xs leading-relaxed">{toast.message}</div>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
