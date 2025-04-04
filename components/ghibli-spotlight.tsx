"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface GhibliSpotlightProps {
  children: React.ReactNode
  backgroundImage: string
  spotlightSize?: number
  transitionSpeed?: number
  spotlightIntensity?: number
  spotlightBlur?: number
  className?: string
}

export default function GhibliSpotlight({
  children,
  backgroundImage,
  spotlightSize = 300,
  transitionSpeed = 400,
  spotlightIntensity = 0.9,
  spotlightBlur = 70,
  className,
}: GhibliSpotlightProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMouseOutside, setIsMouseOutside] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  // Preload the background image
  useEffect(() => {
    const img = new Image()
    img.src = backgroundImage
    img.onload = () => setIsImageLoaded(true)
  }, [backgroundImage])

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  // Track mouse position and determine if it's outside the content area
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const { left, top } = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - left,
          y: e.clientY - top,
        })

        if (contentRef.current) {
          const contentRect = contentRef.current.getBoundingClientRect()
          const containerRect = containerRef.current.getBoundingClientRect()

          const isOutside =
            e.clientX < contentRect.left ||
            e.clientX > contentRect.right ||
            e.clientY < contentRect.top ||
            e.clientY > contentRect.bottom

          setIsMouseOutside(isOutside)
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Calculate the spotlight gradient
  const getSpotlightGradient = () => {
    if (!isMouseOutside || !isImageLoaded)
      return "radial-gradient(circle at 50% 50%, transparent 100%, rgba(0, 0, 0, 1) 100%)"

    const x = (mousePosition.x / dimensions.width) * 100
    const y = (mousePosition.y / dimensions.height) * 100

    return `radial-gradient(circle ${spotlightSize}px at ${x}% ${y}%, 
      rgba(0, 0, 0, 0) 0%, 
      rgba(0, 0, 0, ${1 - spotlightIntensity}) ${spotlightSize * 0.5}px, 
      rgba(0, 0, 0, 0.95) ${spotlightSize}px)`
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-full overflow-hidden", className)}
      style={{
        transition: `background-image ${transitionSpeed}ms ease-out`,
      }}
    >
      {/* Background image layer */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          opacity: isMouseOutside && isImageLoaded ? 1 : 0,
          transition: `opacity ${transitionSpeed}ms ease-out`,
          filter: `blur(${spotlightBlur / 10}px)`,
        }}
      />

      {/* Spotlight mask layer */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: getSpotlightGradient(),
          transition: `background ${transitionSpeed / 4}ms ease-out`,
          opacity: isMouseOutside && isImageLoaded ? 1 : 0,
          mixBlendMode: "multiply",
        }}
      />

      {/* Content container */}
      <div ref={contentRef} className={cn("relative z-20 transition-all", isMouseOutside ? "backdrop-blur-sm" : "")}>
        {children}
      </div>
    </div>
  )
}

