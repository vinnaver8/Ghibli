"use client"

import { useState } from "react"
import { Upload, Sparkles, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import ImageUploader from "@/components/image-uploader"
import GhibliSpotlight from "@/components/ghibli-spotlight"
import { cn } from "@/lib/utils"

export default function Home() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [transformedImage, setTransformedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleImageUpload = async (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        setOriginalImage(e.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  // Client-side only transformation function
  const handleTransform = async () => {
    if (!originalImage) return

    setIsLoading(true)
    try {
      // Simulate a transformation delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // For demo purposes, we'll use a placeholder image
      setTransformedImage("/ghibli-landscape.jpg")
    } catch (error) {
      console.error("Error transforming image:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <GhibliSpotlight
      backgroundImage="/ghibli-background.jpg"
      spotlightSize={350}
      spotlightIntensity={0.85}
      spotlightBlur={60}
      className="min-h-screen"
    >
      <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-amber-50/90 backdrop-blur-sm">
        <div className="max-w-6xl w-full mx-auto z-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-amber-800 mb-4">Ghibli Image Transformer</h1>
            <p className="text-lg text-amber-700 max-w-2xl mx-auto">
              Transform your photos into beautiful Ghibli-style artwork with our AI-powered tool
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="p-6 bg-amber-100/80 backdrop-blur-sm border-amber-200 shadow-lg">
              <h2 className="text-2xl font-semibold text-amber-800 mb-4 flex items-center">
                <Upload className="mr-2 h-5 w-5" /> Upload Your Image
              </h2>
              <ImageUploader onImageUpload={handleImageUpload} />

              {originalImage && (
                <div className="mt-4">
                  <div className="relative rounded-lg overflow-hidden border-2 border-amber-300 h-64 bg-white">
                    <img
                      src={originalImage || "/placeholder.svg"}
                      alt="Original"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <Button
                    onClick={handleTransform}
                    className="w-full mt-4 bg-amber-600 hover:bg-amber-700 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                        Transforming...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Transform to Ghibli Style
                      </span>
                    )}
                  </Button>
                </div>
              )}
            </Card>

            <Card
              className={cn(
                "p-6 bg-amber-100/80 backdrop-blur-sm border-amber-200 shadow-lg",
                transformedImage ? "flex flex-col" : "flex items-center justify-center",
              )}
            >
              {transformedImage ? (
                <>
                  <h2 className="text-2xl font-semibold text-amber-800 mb-4 flex items-center">
                    <Sparkles className="mr-2 h-5 w-5" /> Ghibli Transformation
                  </h2>
                  <div className="flex-1 relative rounded-lg overflow-hidden border-2 border-amber-300 bg-white">
                    <img
                      src={transformedImage || "/placeholder.svg"}
                      alt="Transformed"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <Button
                    onClick={() => {
                      // Create a temporary link to download the image
                      const link = document.createElement("a")
                      link.href = transformedImage
                      link.download = "ghibli-transformed.jpg"
                      document.body.appendChild(link)
                      link.click()
                      document.body.removeChild(link)
                    }}
                    className="mt-4 bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    Download Image
                  </Button>
                </>
              ) : (
                <div className="text-center p-8">
                  <ImageIcon className="h-16 w-16 mx-auto text-amber-400 mb-4" />
                  <h3 className="text-xl font-medium text-amber-800 mb-2">Your Ghibli Artwork</h3>
                  <p className="text-amber-600">Upload an image and transform it to see the magic happen</p>
                </div>
              )}
            </Card>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">Explore Our Pricing Plans</h2>
            <p className="text-amber-700 mb-6">Choose the perfect plan for your creative needs</p>
            <Button
              onClick={() => (window.location.href = "/price-slider-demo")}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              View Pricing Plans
            </Button>
          </div>
        </div>
      </main>
    </GhibliSpotlight>
  )
}

