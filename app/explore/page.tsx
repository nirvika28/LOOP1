"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Star, Filter, Wallet } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { IDVerificationModal } from "@/components/id-verification-modal"
import { ChatWidget } from "@/components/chat-widget"

export default function ExplorePage() {
  const [selectedCycle, setSelectedCycle] = useState<number | null>(null)
  const [showIDModal, setShowIDModal] = useState(false)
  const [walletBalance] = useState(100) // Demo wallet balance - insufficient funds

  const cycles = [
    {
      id: 1,
      name: "Mountain Explorer",
      image: "/placeholder.svg?height=200&width=300",
      location: "Main Campus",
      distance: "0.2 km",
      price: 25,
      rating: 4.8,
      reviews: 24,
      type: "Mountain Bike",
      owner: "Sarah K.",
      available: true,
    },
    {
      id: 2,
      name: "City Cruiser Pro",
      image: "/placeholder.svg?height=200&width=300",
      location: "Library Block",
      distance: "0.5 km",
      price: 20,
      rating: 4.6,
      reviews: 18,
      type: "City Bike",
      owner: "Mike R.",
      available: true,
    },
    {
      id: 3,
      name: "Speed Demon",
      image: "/placeholder.svg?height=200&width=300",
      location: "Sports Complex",
      distance: "0.8 km",
      price: 30,
      rating: 4.9,
      reviews: 31,
      type: "Road Bike",
      owner: "Alex T.",
      available: false,
    },
    {
      id: 4,
      name: "Electric Glide",
      image: "/placeholder.svg?height=200&width=300",
      location: "Hostel Area",
      distance: "1.2 km",
      price: 45,
      rating: 4.7,
      reviews: 12,
      type: "Electric Bike",
      owner: "Emma L.",
      available: true,
    },
    {
      id: 5,
      name: "Campus Rider",
      image: "/placeholder.svg?height=200&width=300",
      location: "Academic Block",
      distance: "0.3 km",
      price: 18,
      rating: 4.5,
      reviews: 22,
      type: "Hybrid Bike",
      owner: "David M.",
      available: true,
    },
    {
      id: 6,
      name: "Trail Blazer",
      image: "/placeholder.svg?height=200&width=300",
      location: "Cafeteria",
      distance: "0.6 km",
      price: 28,
      rating: 4.8,
      reviews: 19,
      type: "Mountain Bike",
      owner: "Lisa P.",
      available: true,
    },
  ]

  const handleBookNow = (cycleId: number) => {
    const cycle = cycles.find((c) => c.id === cycleId)
    if (!cycle) return

    // Check wallet balance
    if (walletBalance < cycle.price * 2) {
      // Assuming minimum 2 hours
      alert("Insufficient wallet balance. Please recharge your wallet.")
      return
    }

    setSelectedCycle(cycleId)
    setShowIDModal(true)
  }

  const handleIDVerification = (data: any) => {
    // Just complete the booking after ID verification
    alert("Booking confirmed! Check 'My Bookings' to start your trip.")
    setShowIDModal(false)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header with Wallet Balance */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Explore Cycles</h1>
            <p className="text-gray-400">Find the perfect cycle for your campus journey</p>
          </div>
          <div className="flex items-center space-x-2 bg-gray-900/50 px-4 py-2 rounded-lg border border-gray-800">
            <Wallet className="h-5 w-5 text-[#39FF14]" />
            <span className="text-sm text-gray-400">Balance:</span>
            <span className="font-semibold text-[#39FF14]">₹{walletBalance}</span>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by location, cycle type, or owner..."
                  className="pl-10 bg-gray-800 border-gray-700 focus:border-[#39FF14] focus:ring-[#39FF14]"
                />
              </div>
              <Select>
                <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="low">₹0 - ₹20</SelectItem>
                  <SelectItem value="mid">₹20 - ₹35</SelectItem>
                  <SelectItem value="high">₹35+</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Cycle Type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="mountain">Mountain Bike</SelectItem>
                  <SelectItem value="road">Road Bike</SelectItem>
                  <SelectItem value="city">City Bike</SelectItem>
                  <SelectItem value="electric">Electric Bike</SelectItem>
                  <SelectItem value="hybrid">Hybrid Bike</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Cycles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cycles.map((cycle) => (
            <Card
              key={cycle.id}
              className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:border-[#39FF14]/50 transition-all duration-300 group"
            >
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={cycle.image || "/placeholder.svg"}
                    alt={cycle.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge
                      variant={cycle.available ? "default" : "secondary"}
                      className={cycle.available ? "bg-[#39FF14] text-black" : "bg-gray-600"}
                    >
                      {cycle.available ? "Available" : "Booked"}
                    </Badge>
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge variant="outline" className="border-gray-600 bg-black/50 text-white">
                      {cycle.type}
                    </Badge>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg">{cycle.name}</h3>
                    <div className="text-right">
                      <div className="text-lg font-bold text-[#39FF14]">₹{cycle.price}</div>
                      <div className="text-xs text-gray-400">per hour</div>
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-gray-400 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{cycle.location}</span>
                    <span className="mx-2">•</span>
                    <span>{cycle.distance} away</span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{cycle.rating}</span>
                      <span className="text-sm text-gray-400 ml-1">({cycle.reviews})</span>
                    </div>
                    <div className="text-sm text-gray-400">by {cycle.owner}</div>
                  </div>

                  {/* Wallet Balance Check */}
                  {walletBalance < cycle.price * 2 && (
                    <div className="mb-3 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <div className="flex items-center text-yellow-400 text-xs">
                        <Wallet className="h-3 w-3 mr-1" />
                        <span>Low wallet balance - Recharge required</span>
                      </div>
                    </div>
                  )}

                  <Button
                    className={`w-full ${
                      cycle.available && walletBalance >= cycle.price * 2
                        ? "bg-[#39FF14] text-black hover:bg-[#39FF14]/90 shadow-[0_0_20px_rgba(57,255,20,0.3)]"
                        : "bg-gray-700 text-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!cycle.available || walletBalance < cycle.price * 2}
                    onClick={() => handleBookNow(cycle.id)}
                  >
                    {!cycle.available
                      ? "Not Available"
                      : walletBalance < cycle.price * 2
                        ? "Insufficient Balance"
                        : "Book Now"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent">
            Load More Cycles
          </Button>
        </div>
      </div>

      {/* Modals */}
      <IDVerificationModal isOpen={showIDModal} onClose={() => setShowIDModal(false)} onVerify={handleIDVerification} />

      <ChatWidget recipientName="Sarah K." />
    </div>
  )
}
