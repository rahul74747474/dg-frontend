import React from "react";
import { LogIn, AlertCircle } from "lucide-react";

interface SessionExpiredModalProps {
  isOpen: boolean;
  onLoginAgain: () => void;
}

export default function SessionExpiredModal({
  isOpen,
  onLoginAgain,
}: SessionExpiredModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="session-expired-title"
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-100 p-6 sm:p-8 text-center space-y-5 animate-in zoom-in-95 duration-200"
      >
        <div className="mx-auto w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
          <AlertCircle size={32} />
        </div>

        <div className="space-y-2">
          <h2
            id="session-expired-title"
            className="text-2xl font-bold text-gray-900 tracking-tight"
          >
            Session Expired
          </h2>
          <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">
            Your session has expired. Please log in again to continue.
          </p>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={onLoginAgain}
            className="w-full py-3.5 px-5 bg-brand-purple text-white font-semibold rounded-xl hover:opacity-95 transition-all shadow-md shadow-brand-purple/20 flex items-center justify-center gap-2 cursor-pointer text-base"
          >
            <LogIn size={18} />
            Log In Again
          </button>
        </div>
      </div>
    </div>
  );
}
