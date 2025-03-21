"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

export function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme, resolvedTheme } = useTheme()
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const animationRef = useRef<number | null>(null)
  const lastUpdateTimeRef = useRef<number>(0)
  const FPS_LIMIT = 30 // Limit frames per second for better performance

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setIsReducedMotion(mediaQuery.matches)

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleReducedMotionChange)

    return () => {
      mediaQuery.removeEventListener("change", handleReducedMotionChange)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true })
    if (!ctx) return

    let particles: Particle[] = []
    let currentTheme = theme || resolvedTheme || "dark"
    let isTabVisible = true

    // Optimize canvas rendering
    ctx.imageSmoothingEnabled = false

    const resizeCanvas = () => {
      if (!canvas) return

      // Use devicePixelRatio for sharper rendering on high DPI displays
      const dpr = window.devicePixelRatio || 1
      const displayWidth = Math.floor(window.innerWidth)
      const displayHeight = Math.floor(window.innerHeight)

      // Set canvas size with device pixel ratio taken into account
      canvas.width = displayWidth
      canvas.height = displayHeight

      // Clear and reinitialize particles
      particles = []
      initParticles()
    }

    class Particle {
      x: number
      y: number
      radius: number
      color: string
      velocity: { x: number; y: number }
      alpha: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.radius = Math.random() * 1.5 + 0.5 // Smaller particles
        this.color = this.getRandomColor(currentTheme)
        this.velocity = {
          x: (Math.random() - 0.5) * 0.3, // Slower movement
          y: (Math.random() - 0.5) * 0.3,
        }
        this.alpha = Math.random() * 0.4 + 0.1 // Lower opacity
      }

      getRandomColor(mode: string) {
        if (mode === "dark") {
          const colors = [
            "rgba(124, 58, 237, 0.5)", // Purple
            "rgba(139, 92, 246, 0.5)", // Purple lighter
            "rgba(34, 211, 238, 0.5)", // Cyan
            "rgba(6, 182, 212, 0.5)", // Cyan darker
            "rgba(16, 185, 129, 0.5)", // Emerald
          ]
          return colors[Math.floor(Math.random() * colors.length)]
        } else {
          const colors = [
            "rgba(124, 58, 237, 0.2)", // Purple (lighter opacity)
            "rgba(139, 92, 246, 0.2)", // Purple lighter
            "rgba(34, 211, 238, 0.2)", // Cyan
            "rgba(6, 182, 212, 0.2)", // Cyan darker
            "rgba(16, 185, 129, 0.2)", // Emerald
          ]
          return colors[Math.floor(Math.random() * colors.length)]
        }
      }

      draw() {
        if (!ctx) return
        ctx.save()
        ctx.globalAlpha = this.alpha
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.restore()
      }

      update() {
        this.x += this.velocity.x
        this.y += this.velocity.y

        if (this.x < 0 || this.x > canvas.width) {
          this.velocity.x = -this.velocity.x
        }

        if (this.y < 0 || this.y > canvas.height) {
          this.velocity.y = -this.velocity.y
        }

        this.draw()
      }
    }

    function initParticles() {
      particles = []
      // Reduce particle count for better performance
      // Use a base count and adjust based on screen size
      const baseCount = isReducedMotion ? 15 : 30
      const particleCount = Math.min(baseCount, Math.floor((canvas.width * canvas.height) / 25000))

      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        particles.push(new Particle(x, y))
      }
    }

    function drawBlur() {
      if (!ctx || isReducedMotion) return

      // Use a smaller blur radius for better performance
      const blurRadius = currentTheme === "dark" ? 50 : 40

      ctx.save()
      ctx.filter = `blur(${blurRadius}px)`
      ctx.globalCompositeOperation = "lighter"

      // Only draw a subset of particles with blur for better performance
      const blurParticles = particles.slice(0, Math.ceil(particles.length * 0.7))

      for (const particle of blurParticles) {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius * 4, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      }

      ctx.restore()
    }

    function animate(timestamp: number) {
      if (!isTabVisible) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      // Throttle the frame rate for better performance
      if (timestamp - lastUpdateTimeRef.current < 1000 / FPS_LIMIT) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      lastUpdateTimeRef.current = timestamp

      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (!isReducedMotion) {
        drawBlur()
      }

      for (const particle of particles) {
        particle.update()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    // Handle visibility change to pause animation when tab is not visible
    const handleVisibilityChange = () => {
      isTabVisible = document.visibilityState === "visible"
    }

    // Update particles when theme changes
    const updateTheme = () => {
      currentTheme = theme || resolvedTheme || "dark"
      particles.forEach((particle) => {
        particle.color = particle.getRandomColor(currentTheme)
      })
    }

    // Set up a MutationObserver to detect theme changes via class changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          updateTheme()
        }
      })
    })

    // Initialize
    resizeCanvas()

    // Add event listeners
    window.addEventListener("resize", resizeCanvas)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    // Start observing the document body for class changes
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    // Start animation
    lastUpdateTimeRef.current = performance.now()
    animationRef.current = requestAnimationFrame(animate)

    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", resizeCanvas)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      observer.disconnect()
    }
  }, [theme, resolvedTheme, isReducedMotion])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full transition-colors duration-700"
      style={{
        background: "transparent",
      }}
      aria-hidden="true"
    />
  )
}

