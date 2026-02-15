import React, { useState, useEffect } from "react";
import Image from "next/image";
import { SectionWrapper } from "@/hoc";
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { textVariant, fadeIn } from "@/utils/motion";
import { IoClose } from "react-icons/io5"; // Ensure react-icons is installed

const eventsByYear = [
  {
    year: "2025",
    events: [
      {
        id: "2025-1",
        title: "SAMVID 2K25 OVERDRIVE",
        img: "/images/events/WhatsApp_Image_2025-11-14_at_11.06.34_dfc6376c.jpg",
        description: "The flagship multi-game e-sports phenomenon during SAMVID 2K25. Witness the ultimate clash of titans across multiple arenas.",
        youtube: "",
        gallery: []
      },
      {
        id: "2025-2",
        title: "VALORANT SPIKE SHOWDOWN 1.0",
        img: "/images/events/IMG_2467.jpg",
        description: "The inaugural tactical shooter showdown. Where legends are born and raw aim meets strategic brilliance.",
        youtube: [
          { label: "Day 1", url: "https://www.youtube.com/live/1gV0-FLvyb4?si=io0KT9MAqVJpJXZt" },
          { label: "Day 2", url: "https://www.youtube.com/live/leAYBItvhKE?si=vFA8UVkm3yew8Njv" },
          { label: "Finals", url: "https://www.youtube.com/live/4fdIn23b0gQ?si=2GT4vMTMeMpN8Nv5" },
        ],
        gallery: []
      },
      {
        id: "2025-urban",
        title: "URBAN REIGN",
        img: "/images/events/overdrive_urban.jpg",
        description: "Dominate the streets in this high-octane solo/duo battle. Only the grittiest survivors claim the throne.",
        youtube: "",
        gallery: []
      },
      {
        id: "2025-val",
        title: "VALORANT OVERDRIVE",
        img: "/images/events/overdrive_valorant.jpg",
        description: "Precision, strategy, and glory. The elite teams face off in a masterclass of tactical warfare.",
        youtube: [
          { label: "Stream 1", url: "https://www.youtube.com/live/VoiMCELQBE0?si=9j6J0fMilIzSSwIq" },
          { label: "Stream 2", url: "https://www.youtube.com/live/ccxF8LKqljk?si=ShbTYmeNU7VWwzJU" },
          { label: "Stream 3", url: "https://www.youtube.com/live/QoW0pVRI8mI?si=BDtpoFJKkUjbqMGM" },
          { label: "Stream 4", url: "https://www.youtube.com/live/SUF8Pc6g2IY?si=_iglB7IKx3ywr8Ri" },
        ],
        gallery: []
      },
      {
        id: "2025-bgmi",
        title: "BGMI CHAMPIONSHIP",
        img: "/images/events/overdrive_bgmi.jpg",
        description: "The battlefield awaits. Squad up and survive against the best in this high-stakes battle royale championship. Prize Pool ₹5000.",
        youtube: [
          { label: "Day 1", url: "https://www.youtube.com/live/n9y9wd4tGrM?si=fei13Tp6ZXSXBrmu" },
          { label: "Finals D1", url: "https://www.youtube.com/live/NaJANtI2KZs?si=9xpGsewA9gVn7SoY" },
          { label: "Finals D2", url: "https://www.youtube.com/live/f0Yef-p3fIE?si=D2VILTKz_m00yy0j" },
        ],
        gallery: []
      },
      {
        id: "2025-mk",
        title: "MORTAL KOMBAT",
        img: "/images/events/overdrive_mk.png",
        description: "Finish Him! A brutal display of skill and combos in the legendary fighting arena.",
        youtube: "",
        gallery: []
      },
      {
        id: "2025-tekken",
        title: "TEKKEN ARENA",
        img: "/images/events/overdrive_tekken.jpg",
        description: "The King of Iron Fist Tournament. Unparalleled martial arts combat where every hit counts.",
        youtube: "",
        gallery: []
      },
    ],
  },
  {
    year: "2023",
    events: [
      {
        id: "2023-1",
        title: "BGMI PAID SCRIMS",
        img: "/images/events/Paid_scrims.png",
        description: "High-tier competitive practice. Where professional squads refine their strategies for the big stage.",
        youtube: "",
        gallery: []
      },
      {
        id: "2023-2",
        title: "ACETRIX WAR LEAGUE [BGMI]",
        img: "/images/events/registration_1.png",
        description: "The ultimate BGMI league. Relentless squads, intense zones, and non-stop action for the championship title.",
        youtube: [
          { label: "Day 1", url: "https://www.youtube.com/live/dw9L3pPAtnk?si=dMPacTA4KomkYqmp" },
          { label: "Day 2", url: "https://www.youtube.com/live/8g3DIqNkY40?si=hcfPLl2SLlMNKazN" },
          { label: "Day 3", url: "https://www.youtube.com/live/etay_Qgdndk?si=VREzUB_7YW_m6ymb" },
          { label: "Finals", url: "https://www.youtube.com/live/Gm6mOBWW-I0?si=ujnZYIAyI1R6mrK4" },
        ],
        gallery: []
      },
    ],
  },
  {
    year: "2022",
    events: [
      {
        id: "2022-1",
        title: "CHESS TOURNAMENT",
        img: "/images/events/IMG-20221006-WA0003.jpg",
        description: "A battle of intellect and foresight. Grandmaster moves and checkmate moments define this strategic war.",
        youtube: "",
        gallery: []
      },
      {
        id: "2022-2",
        title: "FIFA TOURNAMENT",
        img: "/images/events/FIFA_.jpg",
        description: "The beautiful game, virtually perfected. Skill, dribbles, and stunning goals in the digital stadium.",
        youtube: "",
        gallery: []
      },
      {
        id: "2022-3",
        title: "VALFIRE VALORANT TOURNAMENT",
        img: "/images/events/66baa63e-9df1-47f1-8dbd-05deb5aa3265.jpeg",
        description: "Igniting the competitive spirit. A fiery tournament showcasing the best aimers in the region.",
        youtube: [
          { label: "Part 1", url: "https://www.youtube.com/live/o1abVIoUbrQ?si=fJvCC12wY6YnqoXb" },
          { label: "Part 2", url: "https://www.youtube.com/live/BKpazKpiqDo?si=vrDfyeN-_Rz712QF" },
        ],
        gallery: []
      },

      {
        id: "2022-5",
        title: "SUPERTRIX [VALO TOUR]",
        img: "/images/events/valo.png",
        description: "Superpowered tactical warfare. The region's top teams collide in a spectacle of ability usage and gunplay.",
        youtube: "",
        gallery: []
      },
      {
        id: "2022-duke",
        title: "DUKE O' DEATH",
        img: "/images/events/duke_gallery_1.jpg",
        description: "The Grand Finals Legacy. A historic clash of titans that defined the era of competitive Valorant.",
        youtube: [
          { label: "Day 1", url: "https://www.youtube.com/live/4NHyCotzBGw?si=G-R6hcyIqOOvjXyI" }, // Day 1
          { label: "Day 2", url: "https://www.youtube.com/live/Lv4swk8FYuI?si=xGXiCyHzlO1RwoGJ" }, // Day 2
          { label: "Day 3", url: "https://www.youtube.com/live/aZu6w3WckjU?si=fwIBmVV7x0cPS_W-" }, // Day 3
          { label: "Day 4", url: "https://www.youtube.com/live/yIdmj-IC9Zc?si=nAbPNZ39QkGpSlm6" }, // Day 4
          { label: "Finals D1", url: "https://www.youtube.com/live/PS3sk4NTmyk?si=PrQ5GOfjJto-FAi1" }, // Day 5
          { label: "Finals D2", url: "https://www.youtube.com/live/rdKNkjhcpHI?si=_bqP0XldgAYvi1-W" }, // Day 6
        ],
        gallery: ["/images/events/duke_gallery_1.jpg"]
      },
    ],
  },
  {
    year: "CHILL MODE",
    events: [
      {
        id: "chill-gaming-night",
        title: "ACETRIX GAMING NIGHT",
        description: "Rocket League & Valorant community nights. Pure chaos and fun.",
        youtube: [
          { label: "Ep 1: Rocket League", url: "https://www.youtube.com/live/amdW1N3bCoI?si=lilH364HCV9Tkgqf" },
          { label: "Ep 2: Valorant", url: "https://www.youtube.com/live/ao2Ko2-22uw?si=VYrwpHgjVfsc3pTX" },
        ],
        gallery: []
      },
      {
        id: "chill-csgo",
        title: "CSGO 2 WAITING ROOM",
        description: "The long wait for CS2. Grinding CS:GO lobbies until the update drops.",
        youtube: [
          { label: "Stream 1", url: "https://www.youtube.com/live/cWb8oAB93xk?si=6j5g7oi3WDILmhTY" },
          { label: "Stream 2", url: "https://www.youtube.com/live/iudD2LzTf0s?si=44gRtyuSYx4BRZjH" },
          { label: "Stream 3", url: "https://www.youtube.com/live/OPgUHmFyo8g?si=NwDP7DbIUuvJQSgP" },
        ],
        gallery: []
      },
      {
        id: "chill-jod",
        title: "JOD-O-WHAT SEASON 2",
        description: "Senior vs Junior showdown. The ultimate internal rivalry: The Void vs Jod Gang.",
        youtube: [
          { label: "Senior vs Junior", url: "https://www.youtube.com/live/6ot6gF7TF3w?si=70vY1kHj-6-GXV0o" },
          { label: "Void vs Jod", url: "https://www.youtube.com/live/i3C0zMNOAVc?si=m8PNF3gnbSKN4ufq" },
          { label: "Easy Win vs Jod", url: "https://www.youtube.com/live/Z_qBES6O8f8?si=522NLxjIiOle0HfU" },
          { label: "Void vs Jod BO3", url: "https://www.youtube.com/live/RSr28RBzU-g?si=CrVC8Ybr7ZV768hn" },
        ],
        gallery: []
      },
      {
        id: "chill-jods3",
        title: "JOD-O-WHAT SEASON 3",
        description: "The saga continues. Season 3 of the internal BGMI exhibition tournament. Senior vs Junior.",
        youtube: [
          { label: "Day 1", url: "https://www.youtube.com/live/GwfqtMXES84?si=HLtbJLZc1MjHitbT" },
          { label: "Day 2", url: "https://www.youtube.com/live/2YlFuePWB-Q?si=rK-D4lQi2txo72rD" },
          { label: "Finals", url: "https://www.youtube.com/live/LR1HncF8Wwc?si=CmzxwZPnQ1Pcpdqb" },
        ],
        gallery: []
      },
      {
        id: "chill-gow",
        title: "ACETRIX PLAYS: GOD OF WAR",
        description: "Kratos returns. Full playthrough of God of War with Blaster Mayank.",
        youtube: [
          { label: "Ep 1", url: "https://www.youtube.com/live/GPQYPLKh62k?si=6biZdaRuOqPAgWum" },
          { label: "Ep 2 Part 1", url: "https://www.youtube.com/live/d9Xy4jacfkY?si=0VSRfiTJqZg9zXbf" },
          { label: "Ep 2 Part 2", url: "https://www.youtube.com/live/aKSlrRHelk8?si=82DX137qdj7ZfrFX" },
          { label: "Ep 3", url: "https://www.youtube.com/live/-47WU_DV_KM?si=plvAe7-1VtwocgWB" },
          { label: "Ep 4", url: "https://www.youtube.com/live/XkHYc0Z4Xgc?si=n16DQw-4huZ3x7Gq" },
        ],
        gallery: []
      },
      {
        id: "chill-variety",
        title: "COMMUNITY VARIETY",
        description: "Pure chaos and fun. Fall Guys, 5v5 showdowns, and special celebration streams.",
        youtube: [
          { label: "Fall Guys", url: "https://www.youtube.com/live/h95TvMTTxvY?si=HJ9p7HL0A9DstTGC" },
          { label: "5v5 Showdown", url: "https://www.youtube.com/live/ufh9c4gcbfI?si=5GgP6Dk0SoO5wKwr" },
          { label: "Independence Day", url: "https://www.youtube.com/live/BuXybzf8Uro?si=W-V_L_ldbwmyeDs7" },
        ],
        gallery: []
      },
    ],
  },
];




const EventCard = ({ event, index, onClick }) => {
  // Angular cut — top-right and bottom-left chopped
  const clipPath = "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))";

  return (
    <motion.div
      layoutId={`card-${event.id}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      className="group relative aspect-[3/4] cursor-pointer"
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      {/* Border Glow */}
      <div
        className="absolute -inset-[2px] opacity-30 group-hover:opacity-80 transition-opacity duration-500"
        style={{
          clipPath,
          background: 'linear-gradient(135deg, #c788ff, #00f3ff)',
        }}
      />

      {/* Card */}
      <div
        className="absolute inset-0 overflow-hidden bg-[#0a0a14]"
        style={{ clipPath }}
      >
        {/* Image */}
        <div className="absolute inset-0">
          <Image
            src={event.img}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        </div>

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
          <h3 className="text-lg md:text-xl font-bold text-white uppercase tracking-wide leading-tight group-hover:text-[#c788ff] transition-colors font-[family-name:var(--font-orbitron)]">
            {event.title}
          </h3>
          <div className="w-10 h-[2px] mt-2 bg-[#c788ff]/50 group-hover:w-full group-hover:bg-[#c788ff] transition-all duration-500" />
        </div>
      </div>
    </motion.div>
  );
};

const EventModal = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 30 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-full max-w-6xl h-[85vh] bg-[#0a0a12] border border-[#c788ff]/20 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(199,136,255,0.1)] flex flex-col md:flex-row isolate"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none z-0"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '40px 40px' }}
        />

        {/* Top Decoration Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c788ff] via-[#00f3ff] to-[#c788ff] z-50" />

        {/* Close Button - Tech Style */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 group flex items-center justify-center w-12 h-12 border border-white/10 hover:border-[#ff0055] bg-black/50 hover:bg-[#ff0055]/10 rounded-lg transition-all duration-300 backdrop-blur-md"
        >
          <IoClose size={24} className="text-white group-hover:text-[#ff0055] transition-colors" />
        </button>

        {/* Left: Visuals */}
        <div className="relative w-full md:w-[45%] h-64 md:h-full bg-black border-r border-white/5 overflow-hidden flex items-center justify-center">
          {/* Background Blurred Layer */}
          <div className="absolute inset-0 z-0">
            <Image
              src={event.img}
              alt={event.title}
              fill
              className="object-cover blur-xl opacity-30"
            />
          </div>

          {/* Main Image Layer */}
          <div className="relative w-full h-full z-10 p-4">
            <Image
              src={event.img}
              alt={event.title}
              fill
              className="object-contain drop-shadow-2xl"
            />
          </div>

        </div>

        {/* Right: Content */}
        <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-8 md:p-12 scrollbar-thin scrollbar-thumb-[#c788ff]/20 scrollbar-track-transparent">

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-2 text-[#c788ff] opacity-70">
                <span className="w-12 h-[1px] bg-[#c788ff]" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white font-[family-name:var(--font-orbitron)] leading-tight mb-6 uppercase tracking-wide">
                {event.title}
              </h2>
              <p className="text-gray-300 text-lg md:text-xl font-[family-name:var(--font-rajdhani)] leading-relaxed border-l-2 border-[#00f3ff]/30 pl-6">
                {event.description}
              </p>
            </motion.div>

            {/* Actions */}
            {event.youtube && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-12"
              >
                {Array.isArray(event.youtube) ? (
                  <div className="flex flex-wrap gap-4">
                    {event.youtube.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group relative inline-flex items-center gap-3 px-6 py-3 bg-[#ff0000]/10 border border-[#ff0000]/30 hover:bg-[#ff0000]/20 hover:border-[#ff0000] transition-all duration-300 rounded-lg overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ff0000]/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                        <span className="text-[#ff0000] text-xl">▶</span>
                        <div className="flex flex-col items-start">
                          <span className="text-white font-[family-name:var(--font-orbitron)] font-bold tracking-wider text-xs">WATCH {link.label.toUpperCase()}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <a
                    href={event.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative inline-flex items-center gap-4 px-8 py-4 bg-[#ff0000]/10 border border-[#ff0000]/30 hover:bg-[#ff0000]/20 hover:border-[#ff0000] transition-all duration-300 rounded-lg overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ff0000]/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                    <span className="text-[#ff0000] text-2xl">▶</span>
                    <div className="flex flex-col items-start">
                      <span className="text-white font-[family-name:var(--font-orbitron)] font-bold tracking-wider text-sm">WATCH STREAM</span>
                    </div>
                  </a>
                )}
              </motion.div>
            )}

            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                <h3 className="text-xl text-white font-[family-name:var(--font-orbitron)] tracking-wider flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#00f3ff] rounded-sm transform rotate-45" />
                  GALLERY
                </h3>
              </div>

              {event.gallery && event.gallery.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {event.gallery.map((photo, idx) => (
                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-white/5 hover:border-[#c788ff] transition-colors group">
                      <div className="absolute inset-0 bg-[#c788ff]/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                      {/* Placeholder for actual gallery images if they were dynamic */}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 border border-dashed border-white/10 rounded-lg text-center">
                  <p className="text-gray-500 font-mono text-sm">No photos available</p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Footer Status Bar */}
          <div className="p-4 bg-black/40 border-t border-white/5 flex justify-between items-center text-[10px] text-gray-500 font-mono uppercase tracking-widest">
            <span>ACETRIX EVENTS</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0 bg-[#030308]">
      {/* Cyber Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(199, 136, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(199, 136, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '100px 100px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
        }}
      />

      {/* Drifting Orbs */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 50, 0],
          scale: [1, 1.2, 0.9, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-[#c788ff]/20 rounded-full blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, -70, 50, 0],
          y: [0, 100, -50, 0],
          scale: [1, 1.3, 0.9, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-[#00f3ff]/15 rounded-full blur-[100px]"
      />

      <motion.div
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -50, 50, 0],
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-20%] left-[10%] w-[700px] h-[700px] bg-[#7000ff]/10 rounded-full blur-[130px]"
      />
    </div>
  );
};

const ChillEventCard = ({ event, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-[#0f0f1a]/80 border border-white/10 rounded-xl overflow-hidden hover:border-[#c788ff]/40 transition-all duration-300 backdrop-blur-sm"
    >
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-[#c788ff] via-[#00f3ff] to-[#c788ff] opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#c788ff]/10 border border-[#c788ff]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#c788ff]/20 transition-colors">
              <span className="text-[#c788ff] text-lg">▶</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-[family-name:var(--font-orbitron)] group-hover:text-[#c788ff] transition-colors leading-tight">
                {event.title}
              </h3>
              <span className="text-xs font-mono text-[#00f3ff]/70 uppercase tracking-wider">
                {event.youtube.length} Episodes
              </span>
            </div>
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-5 leading-relaxed">
          {event.description}
        </p>

        {/* Video Links Grid */}
        <div className="grid grid-cols-2 gap-3">
          {event.youtube.map((video, idx) => (
            <a
              key={idx}
              href={video.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 px-5 py-4 bg-white/5 hover:bg-[#c788ff]/15 rounded-xl text-sm text-gray-300 hover:text-white transition-all border border-white/5 hover:border-[#c788ff]/30 group/link"
            >
              <span className="text-[#c788ff] text-base group-hover/link:scale-125 transition-transform">▶</span>
              <span className="truncate font-medium">{video.label}</span>
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Events = () => {
  const [activeYear, setActiveYear] = useState(eventsByYear[0].year);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const currentYearEvents = eventsByYear.find(y => y.year === activeYear)?.events || [];

  return (
    <div className="relative min-h-screen bg-transparent w-full overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-20">

        <motion.div variants={textVariant()}>
          <h2 className="text-center text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-[#c788ff] to-white bg-clip-text text-transparent mb-4">
            Events & Media
          </h2>
        </motion.div>



        {/* Year Tabs - Enhanced */}
        <div className="flex justify-center flex-wrap gap-4 mb-16 relative z-50">
          {eventsByYear.map((item) => (
            <motion.button
              key={item.year}
              onClick={() => setActiveYear(item.year)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-3 rounded-full text-lg font-bold transition-all duration-300 border relative group overflow-hidden ${activeYear === item.year
                ? "bg-[#c788ff]/10 text-white border-[#c788ff] shadow-[0_0_20px_rgba(199,136,255,0.4)]"
                : "bg-transparent text-gray-400 border-white/10 hover:border-[#c788ff]/50 hover:text-white hover:bg-white/5"
                }`}
            >
              <span className="relative z-10">{item.year}</span>
              {activeYear === item.year && (
                <motion.div
                  layoutId="activeYearTab"
                  className="absolute inset-0 bg-[#c788ff]/10 -z-10"
                  transition={{ type: "spring", stiffness: 200 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Events Grid - Enhanced */}
        <motion.div
          key={activeYear}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className={`grid gap-8 ${activeYear === "CHILL MODE"
            ? "grid-cols-1 lg:grid-cols-2"
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
        >
          {currentYearEvents.map((event, index) => (
            activeYear === "CHILL MODE" ? (
              <ChillEventCard key={event.id} event={event} index={index} />
            ) : (
              <EventCard
                key={event.id}
                event={event}
                index={index}
                onClick={() => setSelectedEvent(event)}
              />
            )
          ))}
        </motion.div>

        {/* Empty State */}
        {currentYearEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 text-xl">No events yet for {activeYear}</p>
          </motion.div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {selectedEvent && (
            <EventModal
              event={selectedEvent}
              onClose={() => setSelectedEvent(null)}
            />
          )}
        </AnimatePresence>


      </div>
    </div>
  );
};

export default SectionWrapper(Events, "events");
