import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

export const Dialog = ({ isOpen, onClose, children, className }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Escape") onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center 
        p-4 bg-black/50 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        onKeyDown={handleKeyDown}
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`${className} p-8 py-9 w-80 sm:w-[352px] 
          rounded-lg shadow-xl border border-gray-200 bg-white`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};
