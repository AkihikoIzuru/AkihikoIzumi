"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, useAnimation, useScroll } from "framer-motion"
import { MapPin, Plane, GraduationCap, Code, Building, Heart } from "lucide-react"

export function VisualRoadmap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

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

  // Define the stages of the journey
  const stages = [
    {
      title: "Foundations",
      subtitle: "Childhood – High School",
      icon: <Code className="w-6 h-6" />,
      description: "Discovered computers and coding in vocational high school",
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Building Skills",
      subtitle: "SMK Years – 2025",
      icon: <GraduationCap className="w-6 h-6" />,
      description: "Learned programming and prepared for graduation",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Goal Setting",
      subtitle: "2025",
      icon: <MapPin className="w-6 h-6" />,
      description: "Building portfolio and learning Japanese",
      color: "from-indigo-500 to-purple-500",
    },
    {
      title: "Reaching for the Dream",
      subtitle: "2025+",
      icon: <Plane className="w-6 h-6" />,
      description: "Applying for jobs and preparing for the move",
      color: "from-fuchsia-500 to-pink-500",
    },
    {
      title: "Dream Realized",
      subtitle: "Future",
      icon: <Building className="w-6 h-6" />,
      description: "Working in Japan and living the dream",
      color: "from-rose-500 to-red-500",
    },
  ]

  return (
    <div ref={containerRef} className="relative py-20 overflow-hidden">
      {/* Indonesia to Japan Path - Horizontal for desktop, vertical for mobile */}
      {isMobile ? (
        <div className="absolute top-0 bottom-0 w-1 left-6 md:left-1/2 md:transform md:-translate-x-1/2">
          <motion.div
            className="w-full bg-gradient-to-b from-emerald-500 via-blue-500 to-rose-500 rounded-full"
            style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
          />
        </div>
      ) : (
        <div className="absolute left-0 right-0 h-1 top-1/2 transform -translate-y-1/2">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 via-blue-500 to-rose-500 rounded-full"
            style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
          />
        </div>
      )}

      {/* Start and End Points - Positioned differently for mobile */}
      {isMobile ? (
        <>
          <div className="absolute top-0 left-6 transform -translate-y-1/2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex items-center"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white">
                <Heart className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium ml-2">Indonesia</span>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-6 transform translate-y-1/2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2.5, duration: 0.5 }}
              className="flex items-center"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-rose-500 flex items-center justify-center text-white">
                <Heart className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium ml-2">Japan</span>
            </motion.div>
          </div>
        </>
      ) : (
        <>
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white mb-2">
                <Heart className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium">Indonesia</span>
            </motion.div>
          </div>

          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2.5, duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-rose-500 flex items-center justify-center text-white mb-2">
                <Heart className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium">Japan</span>
            </motion.div>
          </div>
        </>
      )}

      {/* Journey Stages - Grid for desktop, list for mobile */}
      <div className="relative max-w-5xl mx-auto px-4">
        {isMobile ? (
          <div className="ml-16 space-y-12">
            {stages.map((stage, index) => (
              <MobileStageItem key={index} stage={stage} index={index} total={stages.length} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-0">
            {stages.map((stage, index) => (
              <DesktopStageItem key={index} stage={stage} index={index} total={stages.length} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

interface StageItemProps {
  stage: {
    title: string
    subtitle: string
    icon: React.ReactNode
    description: string
    color: string
  }
  index: number
  total: number
}

function MobileStageItem({ stage, index, total }: StageItemProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <div ref={ref} className="relative">
      {/* Milestone dot on the path */}
      <motion.div
        className={`absolute left-[-20px] top-6 w-4 h-4 rounded-full bg-gradient-to-r ${stage.color} z-10`}
        initial={{ scale: 0 }}
        animate={controls}
        variants={{
          visible: {
            scale: 1,
            transition: { delay: 0.2 + index * 0.1, duration: 0.5 },
          },
        }}
      />

      {/* Connecting line to the path - only for items that aren't the last */}
      {index < total - 1 && (
        <motion.div
          className={`absolute left-[-18px] top-10 w-0.5 h-[calc(100%+48px)] bg-gradient-to-b ${stage.color}`}
          initial={{ scaleY: 0 }}
          animate={controls}
          variants={{
            visible: {
              scaleY: 1,
              transition: { delay: 0.4 + index * 0.1, duration: 0.5 },
            },
          }}
          style={{ transformOrigin: "top" }}
        />
      )}

      {/* Content card */}
      <motion.div
        className="bg-card/80 backdrop-blur-sm rounded-lg p-4 border border-border/50 shadow-lg"
        initial={{ opacity: 0, x: 20 }}
        animate={controls}
        variants={{
          visible: {
            opacity: 1,
            x: 0,
            transition: { delay: 0.3 + index * 0.1, duration: 0.5 },
          },
        }}
      >
        <div className="flex items-start">
          <motion.div
            className={`w-12 h-12 rounded-full bg-gradient-to-r ${stage.color} flex items-center justify-center text-white mr-4 flex-shrink-0`}
            initial={{ scale: 0, rotate: -180 }}
            animate={controls}
            variants={{
              visible: {
                scale: 1,
                rotate: 0,
                transition: { delay: 0.5 + index * 0.1, duration: 0.5 },
              },
            }}
          >
            {stage.icon}
          </motion.div>

          <div>
            <motion.h3
              className="font-bold text-base mb-1"
              initial={{ opacity: 0 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  transition: { delay: 0.6 + index * 0.1, duration: 0.5 },
                },
              }}
            >
              {stage.title}
            </motion.h3>

            <motion.div
              className="text-xs text-muted-foreground mb-2"
              initial={{ opacity: 0 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  transition: { delay: 0.7 + index * 0.1, duration: 0.5 },
                },
              }}
            >
              {stage.subtitle}
            </motion.div>

            <motion.p
              className="text-xs text-foreground/80"
              initial={{ opacity: 0 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  transition: { delay: 0.8 + index * 0.1, duration: 0.5 },
                },
              }}
            >
              {stage.description}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function DesktopStageItem({ stage, index, total }: StageItemProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  // Alternate between top and bottom for visual interest
  const isTop = index % 2 === 0

  return (
    <div ref={ref} className="relative">
      {/* Milestone dot on the path */}
      <motion.div
        className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gradient-to-r ${stage.color} z-10`}
        initial={{ scale: 0 }}
        animate={controls}
        variants={{
          visible: {
            scale: 1,
            transition: { delay: 0.2 + index * 0.1, duration: 0.5 },
          },
        }}
      />

      {/* Content card */}
      <motion.div
        className={`relative ${
          isTop ? "md:mt-[-180px]" : "md:mt-[100px]"
        } mx-auto max-w-[200px] bg-card/80 backdrop-blur-sm rounded-lg p-4 border border-border/50 shadow-lg`}
        initial={{ opacity: 0, y: isTop ? 50 : -50 }}
        animate={controls}
        variants={{
          visible: {
            opacity: 1,
            y: 0,
            transition: { delay: 0.3 + index * 0.1, duration: 0.5 },
          },
        }}
      >
        {/* Connecting line to the path */}
        <motion.div
          className={`absolute left-1/2 ${
            isTop ? "top-full" : "bottom-full"
          } w-0.5 h-[50px] bg-gradient-to-b ${stage.color}`}
          initial={{ scaleY: 0 }}
          animate={controls}
          variants={{
            visible: {
              scaleY: 1,
              transition: { delay: 0.4 + index * 0.1, duration: 0.5 },
            },
          }}
          style={{ transformOrigin: isTop ? "top" : "bottom" }}
        />

        <div className="text-center">
          <motion.div
            className={`w-12 h-12 rounded-full bg-gradient-to-r ${stage.color} mx-auto flex items-center justify-center text-white mb-3`}
            initial={{ scale: 0, rotate: -180 }}
            animate={controls}
            variants={{
              visible: {
                scale: 1,
                rotate: 0,
                transition: { delay: 0.5 + index * 0.1, duration: 0.5 },
              },
            }}
          >
            {stage.icon}
          </motion.div>

          <motion.h3
            className="font-bold text-sm mb-1"
            initial={{ opacity: 0 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                transition: { delay: 0.6 + index * 0.1, duration: 0.5 },
              },
            }}
          >
            {stage.title}
          </motion.h3>

          <motion.div
            className="text-xs text-muted-foreground mb-2"
            initial={{ opacity: 0 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                transition: { delay: 0.7 + index * 0.1, duration: 0.5 },
              },
            }}
          >
            {stage.subtitle}
          </motion.div>

          <motion.p
            className="text-xs text-foreground/80"
            initial={{ opacity: 0 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                transition: { delay: 0.8 + index * 0.1, duration: 0.5 },
              },
            }}
          >
            {stage.description}
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}
