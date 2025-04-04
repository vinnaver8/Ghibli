"use client"
import RotatingPriceSlider from "@/components/rotating-price-slider"
import GhibliSpotlight from "@/components/ghibli-spotlight"
import { Button } from "@/components/ui/button"

const plans = [
  {
    id: 1,
    name: "Basic",
    price: 9.99,
    image: "/slider/basic-plan.jpg",
    features: ["5 image transformations", "Standard quality", "Email support"],
    popular: false,
  },
  {
    id: 2,
    name: "Standard",
    price: 19.99,
    image: "/slider/standard-plan.jpg",
    features: ["25 image transformations", "High quality", "Priority support"],
    popular: true,
  },
  {
    id: 3,
    name: "Premium",
    price: 39.99,
    image: "/slider/premium-plan.jpg",
    features: ["Unlimited transformations", "Ultra high quality", "24/7 support"],
    popular: false,
  },
  {
    id: 4,
    name: "Enterprise",
    price: 99.99,
    image: "/slider/enterprise-plan.jpg",
    features: ["Custom solutions", "API access", "Dedicated account manager"],
    popular: false,
  },
  {
    id: 5,
    name: "Family",
    price: 29.99,
    image: "/slider/family-plan.jpg",
    features: ["Up to 5 users", "50 transformations", "Shared library"],
    popular: false,
  },
]

export default function PriceSliderDemo() {
  return (
    <GhibliSpotlight
      backgroundImage="/ghibli-background.jpg"
      spotlightSize={350}
      spotlightIntensity={0.85}
      spotlightBlur={60}
      className="min-h-screen"
    >
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-amber-50/90 backdrop-blur-sm">
        <div className="max-w-6xl w-full mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-amber-800 mb-4">Choose Your Plan</h1>
            <p className="text-lg text-amber-700 max-w-2xl mx-auto">
              Select the perfect plan for your Ghibli image transformation needs
            </p>
          </div>

          <RotatingPriceSlider plans={plans} />

          <div className="text-center mt-12">
            <Button onClick={() => (window.location.href = "/")} className="bg-amber-600 hover:bg-amber-700 text-white">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </GhibliSpotlight>
  )
}

