"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Route, AlertTriangle, Phone, MessageCircle, Navigation } from "lucide-react"

export default function TrackPage() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const cycleData = {
    id: 1,
    name: "Mountain Explorer",
    renter: "John Doe",
    renterPhone: "+91 9876543210",
    startTime: "2024-01-15T14:30:00",
    expectedReturn: "2024-01-15T18:30:00",
    currentLocation: { lat: 28.6139, lng: 77.209 },
    startLocation: "Main Campus Gate",
    distance: "12.5 km",
    duration: "2h 15m",
    status: "active",
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getTimeRemaining = () => {
    const end = new Date(cycleData.expectedReturn)
    const now = currentTime
    const diff = end.getTime() - now.getTime()

    if (diff <= 0) return "Overdue"

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    return `${hours}h ${minutes}m remaining`
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <Navigation />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  <span>Live Tracking</span>
                  <Badge className="bg-[#39FF14] text-black">Active</Badge>
                </CardTitle>
                <CardDescription>Real-time location of {cycleData.name}</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Map Placeholder */}
                <div className="h-96 bg-gray-800 rounded-lg relative overflow-hidden">
                  {/* Simulated Map Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900"></div>

                  {/* Grid Lines */}
                  <div className="absolute inset-0 opacity-20">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute border-gray-600"
                        style={{
                          left: `${i * 10}%`,
                          top: 0,
                          bottom: 0,
                          borderLeft: "1px solid",
                        }}
                      />
                    ))}
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute border-gray-600"
                        style={{
                          top: `${i * 12.5}%`,
                          left: 0,
                          right: 0,
                          borderTop: "1px solid",
                        }}
                      />
                    ))}
                  </div>

                  {/* Cycle Location Marker */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      {/* Pulsing Circle */}
                      <div className="absolute inset-0 bg-[#39FF14] rounded-full animate-ping opacity-75"></div>
                      <div className="relative bg-[#39FF14] rounded-full p-3">
                        <Navigation className="h-6 w-6 text-black" />
                      </div>
                    </div>
                  </div>

                  {/* Route Path */}
                  <svg className="absolute inset-0 w-full h-full">
                    <path
                      d="M 50 300 Q 150 200 250 150 T 350 100"
                      stroke="#39FF14"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray="5,5"
                      opacity="0.7"
                    />
                  </svg>

                  {/* Start Point */}
                  <div className="absolute bottom-20 left-12">
                    <div className="bg-blue-500 rounded-full p-2">
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-xs mt-1 text-center">Start</div>
                  </div>

                  {/* Map Controls */}
                  <div className="absolute top-4 right-4 space-y-2">
                    <Button size="sm" variant="outline" className="bg-gray-800/80 border-gray-600">
                      <MapPin className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="bg-gray-800/80 border-gray-600">
                      +
                    </Button>
                    <Button size="sm" variant="outline" className="bg-gray-800/80 border-gray-600">
                      -
                    </Button>
                  </div>
                </div>

                {/* Map Info */}
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-sm text-gray-400">Distance Traveled</div>
                    <div className="text-lg font-semibold text-[#39FF14]">{cycleData.distance}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Duration</div>
                    <div className="text-lg font-semibold text-[rgba(58,255,22,1)]">{cycleData.duration}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Current Speed</div>
                    <div className="text-lg font-semibold text-[rgba(58,255,22,1)]">15 km/h</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            {/* Cycle Info */}
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
              <CardHeader className="text-white">
                <CardTitle>Cycle Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-gray-400">Cycle Name</div>
                  <div className="font-semibold text-white">{cycleData.name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Renter</div>
                  <div className="font-semibold text-white">{cycleData.renter}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Start Time</div>
                  <div className="font-semibold text-white">{formatTime(cycleData.startTime)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Expected Return</div>
                  <div className="font-semibold text-white">{formatTime(cycleData.expectedReturn)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Time Remaining</div>
                  <div
                    className={`font-semibold ${getTimeRemaining().includes("Overdue") ? "text-red-400" : "text-[#39FF14]"}`}
                  >
                    {getTimeRemaining()}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Renter */}
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Contact Renter</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-[#39FF14] text-black hover:bg-[#39FF14]/90">
                  <Phone className="h-4 w-4 mr-2" />
                  Call {cycleData.renter}
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                >
                  <Route className="h-4 w-4 mr-2" />
                  View Route History
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-red-600 text-red-400 hover:bg-red-600/10 bg-transparent"
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Report Issue
                </Button>
              </CardContent>
            </Card>

            {/* Usage Stats */}
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Usage Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Max Speed</span>
                  <span className="font-semibold text-[rgba(82,204,36,1)]">28 km/h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg Speed</span>
                  <span className="font-semibold text-[rgba(82,204,36,1)]">18 km/h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Stops Made</span>
                  <span className="font-semibold text-[rgba(82,204,36,1)]">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Distance</span>
                  <span className="font-semibold text-[#39FF14]">3 km</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
