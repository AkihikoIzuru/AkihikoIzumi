"use client"

import { useRef, type ReactNode } from "react"
import { motion, useInView } from "framer-motion"

interface ScrollAnimationProps {
  children: ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  className?: string
  once?: boolean
  amount?: number
}

export function ScrollAnimation({
  children,
  delay = 0,
  direction = "up",
  className = "",
  once = true,
  amount = 0.2,
}: ScrollAnimationProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount })

  const getDirectionOffset = () => {
    switch (direction) {
      case "up":
        return { y: 50, x: 0 }
      case "down":
        return { y: -50, x: 0 }
      case "left":
        return { x: 50, y: 0 }
      case "right":
        return { x: -50, y: 0 }
      default:
        return { y: 50, x: 0 }
    }
  }

  const variants = {
    hidden: {
      opacity: 0,
      ...getDirectionOffset(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}
