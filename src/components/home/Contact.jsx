import React, { useState } from "react";
import { CallToAction } from "../buttons";
import { FaDiscord, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import styles from "../../styles/home/contact.module.scss";
import { SectionWrapper } from "@/hoc";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { fadeIn, slideIn, textVariant, zoomIn } from "@/utils/motion";

const Contact = () => {
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const socialLinks = [
    { id: 1, icon: FaInstagram, label: "Instagram", url: "https://www.instagram.com/acetrixofficial/?igsh=MWN4c2Y4NW1qOGhzOA%3D%3D" },
    { id: 2, icon: FaDiscord, label: "Discord", url: "https://discord.com/invite/kCVCtEVs4f" },
    { id: 3, icon: FaYoutube, label: "YouTube", url: "https://www.youtube.com/@acetrix2022" },
    { id: 4, icon: FaLinkedin, label: "LinkedIn", url: "https://www.linkedin.com/company/acetrix/" },
  ];

  return (
    <div className={styles.contact}>
      <motion.div
        variants={fadeIn("up", "spring", 0.2, 0.8)}
        className={styles.container}
      >
        <div className={styles.contentSection}>
          <motion.h1 variants={textVariant(0.1)} className={styles.title}>
            Get In Touch
          </motion.h1>
          <motion.p variants={fadeIn("up", "spring", 0.2, 0.8)} className={styles.subtitle}>
            Join our gaming community or reach out with any questions
          </motion.p>

          <motion.form
            variants={fadeIn("up", "spring", 0.3, 1.25)}
            className={styles.form}
          >
            <div className={styles.formGroup}>
              <input type="text" id="name" name="name" placeholder="Your Name" />
            </div>

            <div className={styles.formGroup}>
              <input type="email" id="email" name="email" placeholder="Your Email" />
            </div>

            <div className={styles.formGroup}>
              <textarea
                name="message"
                id="message"
                placeholder="Your Message"
              ></textarea>
            </div>

            <motion.div 
              className={styles.submitBTN}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CallToAction type="submit">Send Message</CallToAction>
            </motion.div>
          </motion.form>
        </div>

        <motion.div
          variants={fadeIn("left", "spring", 0.4, 1.25)}
          className={styles.socialSection}
        >
          <motion.h3 
            variants={fadeIn("up", "spring", 0.3, 0.8)}
            className={styles.socialTitle}
          >
            Connect With Us
          </motion.h3>
          
          <div className={styles.socialGridContainer}>
            <AnimatePresence>
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.div
                    key={social.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.1 }}
                    onMouseEnter={() => setHoveredSocial(social.id)}
                    onMouseLeave={() => setHoveredSocial(null)}
                  >
                    <a
                      href={social.url}
                      aria-label={social.label}
                      className={styles.socialLink}
                    >
                      <Icon className={styles.icon} />
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredSocial === social.id ? 1 : 0 }}
                        className={styles.socialLabel}
                      >
                        {social.label}
                      </motion.span>
                    </a>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
