import React, { useState } from "react";
import styles from "../styles/navbar/navbar.module.scss";
import Image from "next/image";

import Link from "next/link";
import { RiMenu3Fill, RiCloseFill } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Battlegrounds", href: "#battlegrounds" },
  { label: "Events", href: "#events" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <div className={styles.navbar}>
      {/* Logo */}
      <div className={styles.logo}>
        <Image
          src="/images/logo-main.png"
          alt="acetrix logo"
          width="200"
          height="100"
        />
      </div>

      <div className={styles.drawer}>
        {/* Menu Toggle */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowDrawer(!showDrawer)}
          className={styles.menuButton}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={showDrawer ? "close" : "menu"}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              {showDrawer ? <RiCloseFill /> : <RiMenu3Fill />}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Navigation Drawer */}
        <AnimatePresence>
          {showDrawer && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={styles.navlinkContainer}
              style={{ pointerEvents: "auto" }}
            >
              {/* Top accent bar */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: 'linear-gradient(90deg, #c788ff, #00f3ff, #c788ff)',
                borderRadius: '15px 15px 0 0',
              }} />

              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setShowDrawer(false)}
                    className={styles.navlink}
                    style={{
                      fontFamily: 'var(--font-orbitron), sans-serif',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;
