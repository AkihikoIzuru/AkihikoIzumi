"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation, type Variants } from "framer-motion"
import { ParticleAnimation } from "@/components/particle-animation"
import { TypingAnimation } from "@/components/typing-animation"
import { ScrollAnimation } from "@/components/scroll-animation"
import { VisualRoadmap } from "@/components/visual-roadmap"
import { JourneyMap } from "@/components/journey-map"

export default function JourneyPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background via-background/90 to-background/80">
      <ParticleAnimation className="opacity-50" />
      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        {/* Journey Section */}
        <JourneySection />

        {/* Visual Journey Map */}
        <section className="mb-20 md:mb-24">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">From Indonesia to Japan</h2>
          <JourneyMap />
        </section>

        {/* Visual Roadmap */}
        <section className="mb-20 md:mb-24">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">My Journey Visualized</h2>
          <VisualRoadmap />
        </section>

        {/* Roadmap Section */}
        <RoadmapSection />
      </div>
    </div>
  )
}

function JourneySection() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <section ref={ref} className="mb-20 md:mb-24">
      <motion.div
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-10 md:mb-16 px-4"
        initial="hidden"
        animate={controls}
        variants={titleVariants}
      >
        <TypingAnimation
          text="The Footsteps of a Dream Destined to Come True"
          speed={50}
          className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
        />
      </motion.div>

      <div className="max-w-3xl mx-auto space-y-6 md:space-y-8 text-base md:text-lg px-4">
        <ScrollAnimation delay={0.1} direction="up">
          <p className="leading-relaxed">
            I was born in Indonesia, in a place called Central Tawa. Since I was little, I've always carried a dream —
            to live and work in Japan.
          </p>
        </ScrollAnimation>

        <ScrollAnimation delay={0.2} direction="up">
          <p className="leading-relaxed">
            I grew up surrounded by computers, taught to understand them from an early age. It was during my time in
            vocational high school (SMK) that I discovered the world of coding, and it lit a fire in me.
          </p>
        </ScrollAnimation>

        <ScrollAnimation delay={0.3} direction="up">
          <p className="leading-relaxed">
            Now, in 2025, as I prepare to graduate, I stand at the edge of a new chapter. With everything I've learned
            and all the dreams I've carried, I will take my first step to make my goal — my childhood dream — a reality.
          </p>
        </ScrollAnimation>

        <ScrollAnimation delay={0.4} direction="up">
          <p className="leading-relaxed">
            This is the beginning of a journey I've been waiting for. A journey where passion meets purpose. A journey
            where a dream, long held in my heart, is ready to come true.
          </p>
        </ScrollAnimation>
      </div>
    </section>
  )
}

function RoadmapSection() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const roadmapStages = [
    {
      title: "Stage 1 — Foundations (Childhood – High School)",
      items: [
        "Introduced to computers at an early age",
        "Sparked interest in technology and digital world",
        "Entered vocational high school (SMK)",
        "Discovered the world of coding",
      ],
    },
    {
      title: "Stage 2 — Building Skills & Identity (SMK Years – 2025)",
      items: [
        "Learned the basics of programming and problem solving",
        "Joined tech-related school projects and communities",
        "Explored web development and software fundamentals",
        "Prepared for graduation and personal portfolio",
      ],
    },
    {
      title: "Stage 3 — Goal Setting & Career Preparation (2025)",
      items: [
        "Graduating from vocational high school",
        "Improving technical skills through real-world projects",
        "Building a personal portfolio and GitHub presence",
        "Learning Japanese language and culture (JLPT N5/N4 goals)",
        "Researching career paths in Japan",
      ],
    },
    {
      title: "Stage 4 — Reaching for the Dream (2025+)",
      items: [
        "Applying for internships or entry-level jobs related to tech",
        "Targeting companies in Japan or international companies with Japan branches",
        "Strengthening English and Japanese communication",
        "Preparing necessary documents (resume, visa, etc.)",
      ],
    },
    {
      title: "Stage 5 — Dream Realized (Future)",
      items: [
        "Working in Japan in a tech-related field",
        "Living independently and exploring the culture",
        "Giving back through mentoring or creative projects",
        "Continuing to grow as a developer and person",
        "Turning the once distant dream into a beautiful reality",
      ],
    },
  ]

  return (
    <section ref={ref} className="pt-8 md:pt-16">
      <motion.h2
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-10 md:mb-16"
        initial="hidden"
        animate={controls}
        variants={titleVariants}
      >
        <TypingAnimation text="My Roadmap" speed={80} />
      </motion.h2>

      <div className="max-w-4xl mx-auto px-4">
        {roadmapStages.map((stage, index) => (
          <ScrollAnimation key={index} delay={0.2 * index} direction="left" className="mb-12 md:mb-16 relative">
            {/* Timeline line */}
            {index < roadmapStages.length - 1 && (
              <motion.div
                className="absolute left-4 md:left-8 top-12 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-cyan-500 ml-1.5"
                initial={{ scaleY: 0, originY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            )}

            {/* Stage dot */}
            <div className="flex items-start">
              <motion.div
                className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 mt-2 mr-4 relative z-10"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + index * 0.2, duration: 0.5, type: "spring" }}
              />

              <div className="flex-1">
                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  {stage.title}
                </h3>

                <ul className="space-y-2 ml-2 md:ml-4">
                  {stage.items.map((item, itemIndex) => (
                    <motion.li
                      key={itemIndex}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + 0.1 * itemIndex, duration: 0.3 }}
                    >
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-foreground/60 mt-2 mr-2" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollAnimation>
        ))}
      </div>
    </section>
  )
}
