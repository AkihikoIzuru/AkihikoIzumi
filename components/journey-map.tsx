"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

export function JourneyMap() {
  const mapRef = useRef(null)
  const isInView = useInView(mapRef, { once: true, amount: 0.3 })
  const controls = useAnimation()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  return (
    <div
      ref={mapRef}
      className="relative h-[300px] md:h-[400px] w-full overflow-hidden rounded-xl bg-card/30 backdrop-blur-sm"
    >
      <motion.svg
        viewBox="0 0 800 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
        initial="hidden"
        animate={controls}
        preserveAspectRatio={isMobile ? "xMidYMid meet" : "xMidYMid meet"}
      >
        {/* Map background - simplified Asia map */}
        <motion.path
          d="M200,300 Q250,280 300,290 Q350,300 400,280 Q450,260 500,270 Q550,280 600,260"
          stroke="currentColor"
          strokeOpacity="0.1"
          strokeWidth="1"
          fill="none"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 0.2,
              transition: { duration: 1.5, ease: "easeInOut" },
            },
          }}
        />

        {/* Indonesia */}
        <motion.circle
          cx="250"
          cy="300"
          r={isMobile ? "12" : "15"}
          fill="url(#indonesiaGradient)"
          variants={{
            hidden: { scale: 0, opacity: 0 },
            visible: {
              scale: 1,
              opacity: 1,
              transition: { delay: 0.5, duration: 0.5, ease: "easeOut" },
            },
          }}
        />

        {/* Japan */}
        <motion.circle
          cx="550"
          cy="200"
          r={isMobile ? "12" : "15"}
          fill="url(#japanGradient)"
          variants={{
            hidden: { scale: 0, opacity: 0 },
            visible: {
              scale: 1,
              opacity: 1,
              transition: { delay: 1.5, duration: 0.5, ease: "easeOut" },
            },
          }}
        />

        {/* Flight path */}
        <motion.path
          d="M250,300 C350,320 450,250 550,200"
          stroke="url(#pathGradient)"
          strokeWidth={isMobile ? "2" : "3"}
          strokeLinecap="round"
          strokeDasharray="5,5"
          fill="none"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: { delay: 0.8, duration: 2, ease: "easeInOut" },
            },
          }}
        />

        {/* Airplane */}
        <motion.g
          variants={{
            hidden: { opacity: 0, x: 0, y: 0 },
            visible: {
              opacity: 1,
              transition: { delay: 0.8, duration: 0.5 },
            },
          }}
        >
          <motion.path
            d={isMobile ? "M15,0 L22,7 L15,14 L0,7 Z" : "M20,0 L30,10 L20,20 L0,10 Z"}
            fill="white"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { delay: 0.8, duration: 0.5 },
              },
            }}
            custom={0}
            animate={{
              x: [250, 550],
              y: [300, 200],
              rotate: [0, -30],
              transition: {
                delay: 1,
                duration: 2,
                ease: "easeInOut",
              },
            }}
          />
        </motion.g>

        {/* Labels */}
        <motion.text
          x="250"
          y={isMobile ? "325" : "330"}
          fontSize={isMobile ? "10" : "12"}
          textAnchor="middle"
          className="fill-current"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { delay: 0.6, duration: 0.5 },
            },
          }}
        >
          Indonesia
        </motion.text>

        <motion.text
          x="550"
          y={isMobile ? "180" : "170"}
          fontSize={isMobile ? "10" : "12"}
          textAnchor="middle"
          className="fill-current"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { delay: 1.6, duration: 0.5 },
            },
          }}
        >
          Japan
        </motion.text>

        {/* Gradients */}
        <defs>
          <linearGradient id="indonesiaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="japanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  )
}
