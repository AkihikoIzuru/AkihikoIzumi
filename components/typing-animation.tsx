"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TypingAnimationProps {
  text: string
  delay?: number
  speed?: number
  className?: string
}

export function TypingAnimation({ text, delay = 0, speed = 40, className = "" }: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (currentIndex < text.length) {
      timeout = setTimeout(
        () => {
          setDisplayedText((prev) => prev + text[currentIndex])
          setCurrentIndex((prev) => prev + 1)
        },
        currentIndex === 0 ? delay : speed,
      )
    } else {
      setIsComplete(true)
    }

    return () => clearTimeout(timeout)
  }, [currentIndex, delay, speed, text])

  return (
    <span className={className}>
      {displayedText}
      <AnimatePresence>
        {!isComplete && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          >
            |
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}
