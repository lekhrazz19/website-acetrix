import React from "react";
import styles from "../styles/footer/footer.module.scss";
import Image from "next/image";
import { FaDiscord, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { SectionWrapper } from "@/hoc";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeIn, slideIn, textVariant, zoomIn } from "@/utils/motion";
import { events, pageLinks, socials } from "../configs/footer.config";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <motion.div
        variants={fadeIn("", "spring", 0.3, 0.8)}
        className={styles.logoContainer}
      >
        <Image
          src="/images/logo-main.png"
          alt="acetrix logo"
          width={400}
          height={400}
          className={styles.logo}
        />
      </motion.div>

      <motion.div variants={fadeIn("up", "spring", 0.5, 0.8)} className={styles.divider} />

      <motion.h3 variants={textVariant(0.6)} className={styles.motto}>
        THE OFFICIAL GAMING COMMUNITY OF SSTC
      </motion.h3>

      <motion.div variants={fadeIn("up", "spring", 0.8, 0.8)} className={styles.tagline}>
        <span>ELEVATE</span>
        <span>DOMINATE</span>
        <span className="text-[#c788ff]">NO RESPAWNS</span>
      </motion.div>

      <motion.div variants={fadeIn("up", "spring", 1.0, 0.8)} className={styles.socials}>
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.path}
            target="_blank"
            rel="noreferrer"
            className={styles.icon}
            aria-label={social.name}
          >
            {social.icon}
          </a>
        ))}
      </motion.div>

      <motion.p variants={fadeIn("up", "spring", 1.2, 0.8)} className={styles.copyright}>
        © {new Date().getFullYear()} <span>ACETRIX</span>. ALL RIGHTS RESERVED.
      </motion.p>
    </footer>
  );
};

export default SectionWrapper(Footer, "footer");
