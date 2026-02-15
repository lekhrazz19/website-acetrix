import React from "react";
import { CallToAction } from "../buttons";
import Image from "next/image";
import styles from "../../styles/home/about.module.scss";
import { SectionWrapper } from "@/hoc";
import { motion } from "framer-motion";
import { fadeIn, slideIn, textVariant, zoomIn } from "@/utils/motion";
import { FaCrosshairs, FaTrophy, FaGamepad, FaUsers } from "react-icons/fa";

const About = () => {
  return (
    <div className={styles.aboutPage}>
      {/* Industrial Background Grid */}
      <div className={styles.bgGrid} />

      <div className={styles.container}>
        {/* Left: Image with Industrial Frame */}
        <motion.div variants={fadeIn("right", "spring", 0.5, 0.75)} className={styles.imageBox}>
          <div className={styles.frameCornerTopLeft} />
          <div className={styles.frameCornerBottomRight} />

          <div className={styles.imageFrame}>
            <Image
              src={"/images/about-us-image.png"}
              alt="acetrix team"
              width={600}
              height={600}
              className={styles.aboutImage}
            />
          </div>


        </motion.div>

        {/* Right: Content */}
        <motion.div variants={fadeIn("left", "spring", 0.5, 0.75)} className={styles.content}>
          <div className={styles.sectionHeader}>
            <span className={styles.headerLine} />
            <h2 className={styles.sectionTitle}>WHO WE ARE</h2>
            <span className={styles.headerLine} />
          </div>

          <h3 className={styles.brandTitle}>
            ACETRIX
          </h3>

          <div className={styles.descriptionBox}>
            <p>
              Founded by passionate gamers, Acetrix is the premier gaming club on campus.
              We unite players through high-stakes tournaments, collaborate with industry leaders like IGDC,
              and host game jams that push creative boundaries.
            </p>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <FaTrophy className={styles.statIcon} />
              <span className={styles.statValue}>15+</span>
              <span className={styles.statLabel}>TOURNAMENTS</span>
            </div>
            <div className={styles.statItem}>
              <FaGamepad className={styles.statIcon} />
              <span className={styles.statValue}>₹50K+</span>
              <span className={styles.statLabel}>PRIZES REWARDED</span>
            </div>
            <div className={styles.statItem}>
              <FaUsers className={styles.statIcon} />
              <span className={styles.statValue}>500+</span>
              <span className={styles.statLabel}>COMMUNITY</span>
            </div>
          </div>

          <div className={styles.ctaWrapper}>
            <CallToAction href="https://docs.google.com/forms/d/e/1FAIpQLSfmEi6SuiXLPwNS8ekWiy7vMuXfH8tvOYvAOQFgQAM_uNH1iA/viewform?usp=header">
              JOIN THE SQUAD
            </CallToAction>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(About, "about");
