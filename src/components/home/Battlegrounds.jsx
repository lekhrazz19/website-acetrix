import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/hoc";
import { textVariant, fadeIn } from "@/utils/motion";
import styles from "../../styles/home/battlegrounds.module.scss";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const games = [
    {
        id: "game-1",
        title: "VALORANT",
        img: "/images/games/valorant.jpg",
        desc: "5v5 TACTICAL",
        color: "#ff4655",
    },
    {
        id: "game-6",
        title: "BGMI",
        img: "/images/games/bgmi.jpg",
        desc: "BATTLE ROYALE",
        color: "#eba338",
    },
    {
        id: "game-2",
        title: "CHESS",
        img: "/images/games/Chess_com.jpg",
        desc: "STRATEGY",
        color: "#ffffff",
    },
    {
        id: "game-3",
        title: "EA FC 25",
        img: "/images/games/ea_fc.jpg",
        desc: "FOOTBALL",
        color: "#28ffef",
    },
    {
        id: "game-4",
        title: "FREE FIRE",
        img: "/images/games/free_fire.jpg",
        desc: "SURVIVAL",
        color: "#ffa500",
    },
    {
        id: "game-5",
        title: "ROCKET LEAGUE",
        img: "/images/games/rocket_league.jpg",
        desc: "SOCCER RACING",
        color: "#0078ff",
    },
    {
        id: "coming-soon",
        title: "COMING SOON",
        img: null,
        desc: "MORE ARENAS...",
        color: "#888888",
    },
];

const GameCard = ({ index, title, img, desc, color }) => {
    return (
        <motion.div
            className={`${styles.card} ${!img ? styles.comingSoonCard : ""}`}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeIn("right", "spring", index * 0.15, 0.75)}
            style={{ "--card-color": color }}
        >
            <div className={styles.imageContainer}>
                {img ? (
                    <>
                        <Image
                            src={img}
                            alt={title}
                            fill
                            className={styles.posterImage}
                            sizes="(max-width: 768px) 80vw, 350px"
                            quality={100}
                        />
                        <div className={styles.posterOverlay} />
                    </>
                ) : (
                    <div className={styles.comingSoonPlaceholder}>
                        <span className={styles.comingSoonText}>LOADING...</span>
                    </div>
                )}
            </div>

            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.cardDesc}>{desc}</p>
                {img && (
                    <motion.div
                        className={styles.activeBar}
                        layoutId={`bar-${index}`}
                    />
                )}
            </div>

            <div className={styles.hoverGlow} />
        </motion.div>
    );
};

const Battlegrounds = () => {
    const [width, setWidth] = useState(0);
    const carouselRef = useRef(null);
    const innerRef = useRef(null);
    const x = useRef(0); // Track current x position for button logic

    useEffect(() => {
        if (innerRef.current && carouselRef.current) {
            setWidth(innerRef.current.scrollWidth - carouselRef.current.offsetWidth);
        }
    }, []);

    // Spring controls for smooth button movement
    const [controls, setControls] = useState({ x: 0 });

    const handleScroll = (direction) => {
        const moveAmount = 350; // Card width + gap
        const currentX = x.current;
        let newX = direction === "left" ? currentX + moveAmount : currentX - moveAmount;

        // Clamp
        if (newX > 0) newX = 0;
        if (newX < -width) newX = -width;

        x.current = newX;
        // Animate to new position
        innerRef.current.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
        innerRef.current.style.transform = `translateX(${newX}px)`;
    };

    // Reset transition for drag
    const onDragStart = () => {
        innerRef.current.style.transition = "none";
    };

    const onDragEnd = (event, info) => {
        x.current = info.point.x; // Sync ref with drag result (approximate)
        // Note purely exact sync with drag constraints requires using useMotionValue, 
        // but for this hybrid approach we assume user drags to a spot.
    };

    // Better approach: Use Framer Motion's useMotionValue and animate() for everything
    // Let's rewrite the logic inside the return to use purely declarative motion if possible,
    // or keep it simple with a ref-based approach for the buttons. 

    // Let's use standard drag constraints.
    return (
        <div className={styles.battlegrounds}>
            {/* Background elements */}
            <div className={styles.bgGrid} />
            <div className={styles.bgGradient} />

            <motion.div variants={textVariant()} className={styles.titleContainer}>
                <p className={styles.sectionLabel}>// OUR ARENAS</p>
                <h2 className={styles.title}>OUR <span className={styles.highlight}>BATTLEGROUNDS</span></h2>
            </motion.div>

            <motion.div ref={carouselRef} className={styles.carouselContainer}>
                <button
                    className={`${styles.navBtn} ${styles.prevBtn}`}
                    onClick={() => handleScroll("left")}
                    aria-label="Previous Game"
                >
                    <IoChevronBack />
                </button>

                <motion.div
                    ref={innerRef}
                    className={styles.track}
                    drag="x"
                    dragConstraints={{ right: 0, left: -width }}
                    whileTap={{ cursor: "grabbing" }}
                    onDragStart={onDragStart}
                    onDragEnd={(e, info) => {
                        // Update our internal x tracker so buttons know where we are
                        const transform = window.getComputedStyle(innerRef.current).transform;
                        const matrix = new DOMMatrix(transform);
                        x.current = matrix.m41;
                    }}
                >
                    {games.map((game, index) => (
                        <GameCard key={game.id} index={index} {...game} />
                    ))}
                </motion.div>

                <button
                    className={`${styles.navBtn} ${styles.nextBtn}`}
                    onClick={() => handleScroll("right")}
                    aria-label="Next Game"
                >
                    <IoChevronForward />
                </button>
            </motion.div>
        </div>
    );
};

export default SectionWrapper(Battlegrounds, "battlegrounds");
