"use client"

import { useState } from "react"
import GhibliSpotlight from "@/components/ghibli-spotlight"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function DemoPage() {
  const [spotlightSize, setSpotlightSize] = useState(300)
  const [spotlightIntensity, setSpotlightIntensity] = useState(0.85)
  const [spotlightBlur, setSpotlightBlur] = useState(60)
  const [transitionSpeed, setTransitionSpeed] = useState(400)
  const [backgroundImage, setBackgroundImage] = useState("/ghibli-background.jpg")

  const images = ["/ghibli-background.jpg", "/ghibli-landscape.jpg", "/forest-path.jpg", "/night-sky.jpg"]

  return (
    <GhibliSpotlight
      backgroundImage={backgroundImage}
      spotlightSize={spotlightSize}
      spotlightIntensity={spotlightIntensity}
      spotlightBlur={spotlightBlur}
      transitionSpeed={transitionSpeed}
      className="min-h-screen"
    >
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-amber-50/90 backdrop-blur-sm">
        <div className="max-w-4xl w-full mx-auto">
          <h1 className="text-4xl font-bold text-amber-800 mb-6 text-center">Ghibli Spotlight Demo</h1>
          <p className="text-lg text-amber-700 mb-8 text-center">
            Move your cursor outside the cards to see the spotlight effect
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card className="p-6 bg-amber-100/80 backdrop-blur-sm border-amber-200 shadow-lg">
              <h2 className="text-xl font-semibold text-amber-800 mb-4">Spotlight Controls</h2>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="size">Spotlight Size: {spotlightSize}px</Label>
                  </div>
                  <Slider
                    id="size"
                    min={100}
                    max={800}
                    step={10}
                    value={[spotlightSize]}
                    onValueChange={(value) => setSpotlightSize(value[0])}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="intensity">Spotlight Intensity: {spotlightIntensity.toFixed(2)}</Label>
                  </div>
                  <Slider
                    id="intensity"
                    min={0.1}
                    max={1}
                    step={0.01}
                    value={[spotlightIntensity]}
                    onValueChange={(value) => setSpotlightIntensity(value[0])}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="blur">Background Blur: {spotlightBlur}px</Label>
                  </div>
                  <Slider
                    id="blur"
                    min={0}
                    max={150}
                    step={5}
                    value={[spotlightBlur]}
                    onValueChange={(value) => setSpotlightBlur(value[0])}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="transition">Transition Speed: {transitionSpeed}ms</Label>
                  </div>
                  <Slider
                    id="transition"
                    min={100}
                    max={1000}
                    step={50}
                    value={[transitionSpeed]}
                    onValueChange={(value) => setTransitionSpeed(value[0])}
                    className="w-full"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-amber-100/80 backdrop-blur-sm border-amber-200 shadow-lg">
              <h2 className="text-xl font-semibold text-amber-800 mb-4">Background Image</h2>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`
                      relative cursor-pointer rounded-lg overflow-hidden border-2 h-32
                      ${backgroundImage === image ? "border-amber-500" : "border-amber-200"}
                    `}
                    onClick={() => setBackgroundImage(image)}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Background ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {backgroundImage === image && (
                      <div className="absolute inset-0 bg-amber-500/20 flex items-center justify-center">
                        <div className="bg-amber-500 text-white text-xs px-2 py-1 rounded">Selected</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-image">Or enter a custom image URL:</Label>
                <Input
                  id="custom-image"
                  placeholder="https://example.com/image.jpg"
                  className="w-full"
                  onBlur={(e) => {
                    if (e.target.value) {
                      setBackgroundImage(e.target.value)
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.currentTarget.value) {
                      setBackgroundImage(e.currentTarget.value)
                    }
                  }}
                />
              </div>
            </Card>
          </div>

          <div className="flex justify-center space-x-4">
            <Button onClick={() => (window.location.href = "/")} className="bg-amber-600 hover:bg-amber-700 text-white">
              Back to Main Page
            </Button>

            <Button
              onClick={() => {
                setSpotlightSize(300)
                setSpotlightIntensity(0.85)
                setSpotlightBlur(60)
                setTransitionSpeed(400)
                setBackgroundImage("/ghibli-background.jpg")
              }}
              variant="outline"
              className="border-amber-500 text-amber-700 hover:bg-amber-100"
            >
              Reset to Defaults
            </Button>
          </div>
        </div>
      </div>
    </GhibliSpotlight>
  )
}

