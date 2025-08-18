import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoMdArrowUp } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

export const PageUP = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 200);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={handleScrollUp}
          aria-label="Scroll to top"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-primary/80 w-10 h-10 md:w-12 md:h-12 rounded-full fixed 
          bottom-5 right-5 z-50 cursor-pointer hover:bg-primary/70 
          focus:outline-none focus:ring-2 focus:ring-primary/50 
          transition-all duration-300"
        >
          <motion.div
            className="flex items-center justify-center h-full"
            whileHover={{ y: -3, scale: 1.1 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <IoMdArrowUp color="white" size={20} />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>,
    document.body
  );
};
