import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, X } from 'lucide-react';

/**
 * Toast notification component.
 * Props:
 *   show    – boolean
 *   type    – 'success' | 'error'
 *   title   – string
 *   message – string
 *   onClose – function
 *   duration – ms (default 4500)
 */
const Toast = ({ show, type = 'success', title, message, onClose, duration = 4500 }) => {
  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [show, duration, onClose]);

  const isSuccess = type === 'success';

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0,  scale: 1 }}
          exit={{  opacity: 0, y: -16, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed top-6 right-6 z-[9999] w-full max-w-sm"
          role="alert"
        >
          <div className={`relative flex items-start gap-4 rounded-2xl border px-5 py-4 shadow-2xl backdrop-blur-xl
            ${isSuccess
              ? 'bg-[#0d1a05]/90 border-[#c8f04d]/30'
              : 'bg-[#1a0505]/90 border-red-500/30'
            }`}
          >
            {/* Icon */}
            <div className={`shrink-0 mt-0.5 ${isSuccess ? 'text-[#c8f04d]' : 'text-red-400'}`}>
              {isSuccess
                ? <CheckCircle size={22} />
                : <XCircle size={22} />
              }
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className={`font-sans font-bold text-sm ${isSuccess ? 'text-[#c8f04d]' : 'text-red-400'}`}>
                {title}
              </p>
              {message && (
                <p className="text-white/60 font-sans text-xs mt-1 leading-relaxed">
                  {message}
                </p>
              )}
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              className="shrink-0 text-white/30 hover:text-white transition-colors mt-0.5"
            >
              <X size={16} />
            </button>

            {/* Progress bar */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: duration / 1000, ease: 'linear' }}
              style={{ transformOrigin: 'left' }}
              className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl origin-left
                ${isSuccess ? 'bg-[#c8f04d]/50' : 'bg-red-500/50'}`}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
