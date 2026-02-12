"use client";

import { AlertTriangle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function TopAlert({
  title,
  message,
  show,
  onClose,
}: {
  title: string;
  message: string;
  show: boolean;
  onClose?: () => void;
}) {
  return (
    <AnimatePresence>
      {show && (
        <div className="w-full px-4 mt-4">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.35 }}
            className="w-full px-6 py-4 flex items-start justify-between gap-4
                       bg-gradient-to-r from-red-600 via-red-500 to-orange-500
                       text-white shadow-xl border border-white/20 backdrop-blur-md
                       rounded-xl box-border"
          >
            {/* LEFT SIDE */}
            <div className="flex items-start gap-3">
              {/* Animated Icon */}
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              >
                <AlertTriangle className="h-6 w-6 mt-0.5" />
              </motion.div>

              <div>
                <h2 className="font-bold text-lg drop-shadow-sm">{title}</h2>
                <p className="text-sm opacity-90">{message}</p>
              </div>
            </div>

            {/* CLOSE BUTTON */}
            {onClose && (
              <button
                onClick={onClose}
                className="rounded-md p-1 hover:bg-white/20 transition"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
