"use client";

import { AlertTriangle, X, Loader2 } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
};

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  loading = false,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmLabel = "Delete",
}: Props) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={!loading ? onClose : undefined}
      />

      {/* Panel */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[400px] p-6 z-10">
        {/* Close */}
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-40"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon */}
        <div className="w-11 h-11 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-4">
          <AlertTriangle className="w-5 h-5 text-red-500" />
        </div>

        {/* Content */}
        <h2 className="text-gray-900 font-semibold text-base mb-1.5">{title}</h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">{description}</p>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Deleting…
              </>
            ) : (
              confirmLabel
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
