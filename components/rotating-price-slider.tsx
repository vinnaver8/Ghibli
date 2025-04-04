"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PricePlan {
  id: number
  name: string
  price: number
  image: string
  features: string[]
  popular?: boolean
  color?: string
}

interface RotatingPriceSliderProps {
  plans: PricePlan[]
  className?: string
}

export default function RotatingPriceSlider({ plans, className }: RotatingPriceSliderProps) {
  const [activeIndex, setActiveIndex] = useState(Math.floor(plans.length / 2))
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : plans.length - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev < plans.length - 1 ? prev + 1 : 0))
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.clientX)
    setCurrentX(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setCurrentX(e.clientX)
    }
  }

  const handleMouseUp = () => {
    if (isDragging) {
      const diff = currentX - startX
      if (diff > 50) {
        handlePrev()
      } else if (diff < -50) {
        handleNext()
      }
      setIsDragging(false)
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
    setCurrentX(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      setCurrentX(e.touches[0].clientX)
    }
  }

  const handleTouchEnd = () => {
    if (isDragging) {
      const diff = currentX - startX
      if (diff > 50) {
        handlePrev()
      } else if (diff < -50) {
        handleNext()
      }
      setIsDragging(false)
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      handlePrev()
    } else if (e.key === "ArrowRight") {
      handleNext()
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <div className={cn("relative w-full overflow-hidden py-16", className)} ref={containerRef}>
      <div className="absolute top-1/2 left-4 z-10 -translate-y-1/2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-amber-100/80 border-amber-300 hover:bg-amber-200"
          onClick={handlePrev}
          aria-label="Previous plan"
        >
          <ChevronLeft className="h-5 w-5 text-amber-800" />
        </Button>
      </div>

      <div className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-amber-100/80 border-amber-300 hover:bg-amber-200"
          onClick={handleNext}
          aria-label="Next plan"
        >
          <ChevronRight className="h-5 w-5 text-amber-800" />
        </Button>
      </div>

      <div
        className="flex items-center justify-center perspective-1000 h-[400px] select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {plans.map((plan, index) => {
            // Calculate the position relative to the active index
            const position = (index - activeIndex + plans.length) % plans.length
            // Normalize position to be between -2 and 2
            const normalizedPosition = position > plans.length / 2 ? position - plans.length : position

            // Calculate z-index, rotation and position based on normalized position
            const zIndex = 10 - Math.abs(normalizedPosition)
            const rotateY = normalizedPosition * 45 // 45 degrees rotation per position
            const translateZ = -Math.abs(normalizedPosition) * 100 // Move back in 3D space
            const opacity = 1 - Math.abs(normalizedPosition) * 0.3
            const scale = 1 - Math.abs(normalizedPosition) * 0.15

            // Only show price for the active item
            const isActive = index === activeIndex

            return (
              <div
                key={plan.id}
                className={cn(
                  "absolute w-[280px] h-[380px] transition-all duration-500 cursor-pointer",
                  isActive ? "z-20" : "",
                )}
                style={{
                  transform: `translateX(${normalizedPosition * 60}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                }}
                onClick={() => setActiveIndex(index)}
              >
                <div
                  className={cn(
                    "relative w-full h-full rounded-xl overflow-hidden shadow-xl border-4",
                    isActive ? "border-amber-500" : "border-amber-200",
                  )}
                >
                  {/* Image */}
                  <div className="absolute inset-0 bg-black">
                    <img
                      src={plan.image || "/placeholder.svg"}
                      alt={plan.name}
                      className="w-full h-full object-cover opacity-90"
                    />
                  </div>

                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    {/* Plan name */}
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-white drop-shadow-md">{plan.name}</h3>
                    </div>

                    {/* Price - only visible for active item */}
                    <div
                      className={cn(
                        "transition-all duration-500 transform",
                        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none",
                      )}
                    >
                      <div className="bg-amber-500/90 backdrop-blur-sm rounded-lg p-4 text-center shadow-lg">
                        <div className="text-3xl font-bold text-white">${plan.price}</div>
                        <div className="text-sm text-white/90">per month</div>

                        <Button className="mt-3 w-full bg-white hover:bg-amber-100 text-amber-800">Choose Plan</Button>
                      </div>
                    </div>
                  </div>

                  {/* Popular badge */}
                  {plan.popular && (
                    <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      Popular
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center mt-8 space-x-2">
        {plans.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === activeIndex ? "bg-amber-600 w-4" : "bg-amber-300",
            )}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

