import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import { staggerContainer } from "../utils/motion";

const StarWrapper = (Component, idName) =>
  function HOC() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const check = () => setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
      check();
      window.addEventListener("resize", check);
      return () => window.removeEventListener("resize", check);
    }, []);

    // On mobile: render section instantly, no whileInView animations
    if (isMobile) {
      return (
        <section>
          <span className="hash-span" id={idName}>
            {""}
          </span>
          <Component />
        </section>
      );
    }

    return (
      <motion.section
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <span className="hash-span" id={idName}>
          {""}
        </span>

        <Component />
      </motion.section>
    );
  };

export default StarWrapper;

