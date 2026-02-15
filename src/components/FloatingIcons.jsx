import React from "react";
import { motion } from "framer-motion";
import {
    SiValorant,
    SiRiotgames,
    SiEpicgames,
    SiDiscord
} from "react-icons/si";
import {
    FaGamepad,
    FaGhost,
    FaCrosshairs,
    FaHeadset,
    FaTrophy,
    FaSkull
} from "react-icons/fa";
import { GiPistolGun, GiAk47 } from "react-icons/gi"; // Installing react-icons usually includes 'gi' (GameIcons)

const icons = [
    { Icon: SiValorant, color: "#ff4655", size: 60 },
    { Icon: FaGhost, color: "#ffffff", size: 50 }, // COD style
    { Icon: FaGamepad, color: "#c788ff", size: 80 },
    { Icon: FaCrosshairs, color: "#00ff00", size: 40 },
    { Icon: SiRiotgames, color: "#eb0029", size: 55 },
    { Icon: FaTrophy, color: "#ffd700", size: 70 },
    { Icon: FaHeadset, color: "#00bfff", size: 65 },
    { Icon: FaSkull, color: "#a9a9a9", size: 45 },
];

const FloatingIcons = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {icons.map((item, index) => (
                <motion.div
                    key={index}
                    className="absolute opacity-20"
                    initial={{
                        x: Math.random() * 1000 - 500, // Random start X
                        y: Math.random() * 1000,       // Random start Y
                        rotate: 0
                    }}
                    animate={{
                        y: [null, Math.random() * -1000], // Float up
                        rotate: 360,
                    }}
                    transition={{
                        duration: Math.random() * 20 + 20, // Slow float 20-40s
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100 + 100}%`, // Start below screen
                    }}
                >
                    <item.Icon size={item.size} color={item.color} />
                </motion.div>
            ))}
        </div>
    );
};

export default FloatingIcons;
