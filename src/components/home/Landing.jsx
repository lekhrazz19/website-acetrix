import React, { useState, useEffect, useMemo } from "react";
import { CallToAction } from "../buttons";
import Image from "next/image";
import styles from "../../styles/home/landing.module.scss";
import { SectionWrapper } from "@/hoc";
import { motion } from "framer-motion";
import { textVariant, zoomIn, fadeIn } from "@/utils/motion";

const Landing = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    if (!isMobile) {
      const handleMouseMove = (e) => {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 15,
          y: (e.clientY / window.innerHeight - 0.5) * 15,
        });
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", checkMobile);
      };
    }
    return () => window.removeEventListener("resize", checkMobile);
  }, [isMobile]);

  // Desktop: 15 joysticks, Mobile: 5 (only the big ones)
  const allJoysticks = [
    { top: '5%', left: '3%', size: 120, delay: 0, duration: 9, rotate: 12, opacity: 0.30 },
    { top: '60%', right: '4%', size: 130, delay: 2, duration: 11, rotate: -18, opacity: 0.28 },
    { bottom: '5%', right: '15%', size: 110, delay: 1, duration: 10, rotate: 20, opacity: 0.25 },
    { bottom: '8%', left: '5%', size: 100, delay: 3, duration: 8.5, rotate: -14, opacity: 0.30 },
    { top: '20%', right: '10%', size: 80, delay: 0.5, duration: 7, rotate: 25, opacity: 0.22 },
    { top: '40%', left: '8%', size: 85, delay: 1.5, duration: 9.5, rotate: -22, opacity: 0.20 },
    { top: '12%', left: '30%', size: 70, delay: 4, duration: 12, rotate: 15, opacity: 0.18 },
    { top: '75%', left: '25%', size: 75, delay: 2.5, duration: 8, rotate: -30, opacity: 0.22 },
    { top: '50%', right: '20%', size: 90, delay: 0.8, duration: 10, rotate: 18, opacity: 0.20 },
    { top: '35%', left: '45%', size: 65, delay: 3.5, duration: 11, rotate: -12, opacity: 0.15 },
    { top: '8%', right: '35%', size: 50, delay: 1.2, duration: 13, rotate: 35, opacity: 0.15 },
    { bottom: '30%', right: '40%', size: 45, delay: 2.8, duration: 14, rotate: -25, opacity: 0.12 },
    { top: '55%', left: '50%', size: 40, delay: 5, duration: 15, rotate: 20, opacity: 0.10 },
    { bottom: '15%', left: '40%', size: 55, delay: 1.8, duration: 9, rotate: -35, opacity: 0.14 },
    { top: '85%', right: '30%', size: 48, delay: 3.2, duration: 12, rotate: 28, opacity: 0.12 },
  ];
  const joysticks = isMobile ? allJoysticks.slice(0, 5) : allJoysticks;

  // Desktop: 25 particles, Mobile: none
  const particles = useMemo(() => {
    if (isMobile) return [];
    return Array.from({ length: 25 }, (_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 3,
    }));
  }, [isMobile]);

  return (
    <main className={styles.main}>
      {/* Deep Dark Base */}
      <div className={styles.bgBase} />

      {/* Ambient Glow — animated on desktop, static on mobile */}
      {isMobile ? (
        <>
          <div
            className="absolute pointer-events-none z-[0]"
            style={{
              width: '400px', height: '400px',
              top: '-10%', left: '-10%',
              background: 'radial-gradient(circle, rgba(199,136,255,0.12) 0%, transparent 70%)',
              borderRadius: '50%',
            }}
          />
          <div
            className="absolute pointer-events-none z-[0]"
            style={{
              width: '350px', height: '350px',
              bottom: '-5%', right: '-5%',
              background: 'radial-gradient(circle, rgba(0,243,255,0.08) 0%, transparent 70%)',
              borderRadius: '50%',
            }}
          />
        </>
      ) : (
        <>
          <motion.div
            className="absolute pointer-events-none z-[0]"
            style={{
              width: '700px', height: '700px',
              top: '-15%', left: '-10%',
              background: 'radial-gradient(circle, rgba(199,136,255,0.15) 0%, rgba(199,136,255,0.05) 40%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(60px)',
            }}
            animate={{ x: [0, 60, -30, 0], y: [0, -40, 30, 0], scale: [1, 1.1, 0.95, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute pointer-events-none z-[0]"
            style={{
              width: '600px', height: '600px',
              bottom: '-10%', right: '-8%',
              background: 'radial-gradient(circle, rgba(0,243,255,0.12) 0%, rgba(0,243,255,0.04) 40%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(60px)',
            }}
            animate={{ x: [0, -50, 40, 0], y: [0, 50, -30, 0], scale: [1, 1.15, 0.9, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          />
          <motion.div
            className="absolute pointer-events-none z-[0]"
            style={{
              width: '400px', height: '400px',
              top: '40%', left: '50%',
              transform: 'translateX(-50%)',
              background: 'radial-gradient(circle, rgba(199,136,255,0.08) 0%, transparent 60%)',
              borderRadius: '50%',
              filter: 'blur(80px)',
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
        </>
      )}

      {/* Subtle Cyber Grid — desktop only */}
      {!isMobile && (
        <div
          className="absolute inset-0 pointer-events-none z-[0]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(199,136,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(199,136,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          }}
        />
      )}

      {/* Floating Particles — desktop only */}
      {particles.map((p, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full pointer-events-none z-[1]"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: i % 2 === 0 ? 'rgba(199,136,255,0.6)' : 'rgba(0,243,255,0.5)',
            boxShadow: i % 2 === 0
              ? '0 0 6px rgba(199,136,255,0.8)'
              : '0 0 6px rgba(0,243,255,0.7)',
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}

      {/* Industrial Decorations */}
      <div className={styles.industrialLine} style={{ top: '15%', left: 0 }} />
      <div className={styles.industrialLine} style={{ bottom: '15%', right: 0 }} />

      {/* Animated Floating Joysticks */}
      {joysticks.map((item, i) => {
        // Mobile: simple float only. Desktop: varied animations
        const mobileAnim = { y: [0, -15, 0], rotate: [0, item.rotate * 0.3, 0] };
        const desktopAnimations = [
          { y: [0, -35, 5, -15, 0], x: [0, 20, -15, 25, 0], rotate: [0, 8, -5, 3, 0], scale: [1, 1.05, 1, 1.02, 1] },
          { y: [0, -18, 0, -18, 0], x: [0, 0, 0, 0, 0], rotate: [0, 180, 360], scale: [1, 1.1, 1] },
          { y: [0, -30, 0, 30, 0], x: [30, 0, -30, 0, 30], rotate: [0, item.rotate, 0, -item.rotate, 0], scale: [1, 1, 1, 1, 1] },
          { y: [0, -8, 0, -8, 0], x: [0, 5, 0, -5, 0], rotate: [0, 3, -3, 3, 0], scale: [0.9, 1.15, 0.9, 1.15, 0.9] },
          { y: [0, -20, 0, 20, 0], x: [0, -25, 0, 25, 0], rotate: [0, -item.rotate * 0.8, 0, item.rotate * 0.8, 0], scale: [1, 1.03, 0.97, 1.03, 1] },
        ];
        const anim = isMobile ? mobileAnim : desktopAnimations[i % 5];

        return (
          <motion.div
            key={`joystick-${i}`}
            className="absolute pointer-events-none z-[2]"
            style={{
              top: item.top,
              bottom: item.bottom,
              left: item.left,
              right: item.right,
              width: item.size,
              height: item.size,
              willChange: 'transform',
            }}
            animate={anim}
            transition={{
              duration: isMobile ? item.duration * 1.5 : item.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: item.delay,
            }}
          >
            <Image
              src="/images/joystick-v3.png"
              alt=""
              width={item.size}
              height={item.size}
              className="w-full h-full object-contain"
              style={{
                opacity: item.opacity,
                filter: isMobile
                  ? 'saturate(1.2)'
                  : 'saturate(1.4) drop-shadow(0 0 12px rgba(199,136,255,0.5)) drop-shadow(0 0 25px rgba(199,136,255,0.2))',
              }}
              aria-hidden="true"
            />
          </motion.div>
        );
      })}

      {/* Main Content */}
      <div className={styles.contentWrapper}>
        <motion.div
          className={styles.heroContent}
          style={isMobile ? {} : { transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
        >
          {/* Logo */}
          <div className={styles.logoWrap}>
            <Image
              src={"/images/logo-main.png"}
              alt="acetrix logo"
              width={500}
              height={180}
              className={styles.mainLogo}
              priority
            />
          </div>

          <div className={styles.titleWrapper}>
            <motion.h1 variants={textVariant(0.3)} className={styles.heroTitle}>
              <span className={styles.prefix}>OFFICIAL GAMING COMMUNITY OF</span>&nbsp;<span className={styles.brand}>SSTC</span>
            </motion.h1>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default SectionWrapper(Landing, "home");

