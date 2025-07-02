"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MapPin, Clock, Star, Calendar, Key, Phone, MessageCircle, Square, Timer } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { OTPModal } from "@/components/otp-modal"
import { ChatWidget } from "@/components/chat-widget"
import { useStopwatch } from "@/hooks/use-stopwatch"

interface Booking {
  id: number
  cycleName: string
  owner: string
  ownerAvatar: string
  image: string
  location: string
  price: number
  bookingDate: string
  status: "current" | "completed" | "active"
  rating?: number | null
  totalAmount: number
  otp: string | null
  tripStartTime: string | null
  actualDuration?: string // Add this field
}

function BookingCard({
  booking,
  onStartTrip,
  onEndTrip,
}: {
  booking: Booking
  onStartTrip: (booking: Booking) => void
  onEndTrip: (bookingId: number) => void
}) {
  const { formattedTime } = useStopwatch({
    startTime: booking.tripStartTime,
    isActive: booking.status === "active",
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex space-x-4">
            <img
              src={booking.image || "/placeholder.svg"}
              alt={booking.cycleName}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold">{booking.cycleName}</h3>
                <Badge
                  className={
                    booking.status === "active" ? "bg-[#39FF14] text-black animate-pulse" : "bg-blue-500 text-white"
                  }
                >
                  {booking.status === "active" ? (
                    <div className="flex items-center">
                      <Timer className="h-3 w-3 mr-1" />
                      Ongoing Trip
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Current
                    </div>
                  )}
                </Badge>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                <div className="flex items-center">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarFallback className="bg-[#39FF14] text-black text-xs">{booking.ownerAvatar}</AvatarFallback>
                  </Avatar>
                  <span>{booking.owner}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{booking.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{formatDate(booking.bookingDate)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  {booking.status === "active" ? (
                    <>
                      <span className="text-gray-400">Elapsed: </span>
                      <span className="text-[#39FF14] font-mono font-bold text-lg">{formattedTime}</span>
                      <span className="text-gray-400 ml-4">Rate: </span>
                      <span className="text-[#39FF14] font-semibold">₹{booking.price}/hr</span>
                    </>
                  ) : (
                    <>
                      <span className="text-gray-400">Time: </span>
                      <span className="text-white">
                        {booking.startTime} - {booking.endTime}
                      </span>
                      <span className="text-gray-400 ml-4">Rate: </span>
                      <span className="text-[#39FF14] font-semibold">₹{booking.price}/hr</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            {booking.status === "current" ? (
              <Button
                onClick={() => onStartTrip(booking)}
                className="bg-[#39FF14] text-black hover:bg-[#39FF14]/90 shadow-[0_0_20px_rgba(57,255,20,0.3)]"
              >
                <Key className="h-4 w-4 mr-2" />
                Start Trip
              </Button>
            ) : (
              <Button
                onClick={() => onEndTrip(booking.id)}
                variant="destructive"
                className="bg-red-600 hover:bg-red-700"
              >
                <Square className="h-4 w-4 mr-2" />
                End Trip
              </Button>
            )}
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="border-gray-700 bg-transparent">
                <Phone className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" className="border-gray-700 bg-transparent">
                <MessageCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function BookingsPage() {
  const [showOTPModal, setShowOTPModal] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [generatedOTP, setGeneratedOTP] = useState("")

  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 1,
      cycleName: "Mountain Explorer",
      owner: "Sarah K.",
      ownerAvatar: "SK",
      image: "/placeholder.svg?height=100&width=100",
      location: "Main Campus",
      price: 25,
      bookingDate: "2024-01-15",
      status: "current",
      rating: null,
      totalAmount: 100,
      otp: "123456",
      tripStartTime: "Yet to start",
    },
    {
      id: 2,
      cycleName: "City Cruiser Pro",
      owner: "Mike R.",
      ownerAvatar: "MR",
      image: "/placeholder.svg?height=100&width=100",
      location: "Library Block",
      price: 20,
      bookingDate: "2024-01-14",
      status: "completed",
      rating: 4.5,
      totalAmount: 80,
      otp: null,
      tripStartTime: "Yet to start",
      actualDuration: "02:35:42", // Actual time used
    },
    {
      id: 3,
      cycleName: "Speed Demon",
      owner: "Alex T.",
      ownerAvatar: "AT",
      image: "/placeholder.svg?height=100&width=100",
      location: "Sports Complex",
      price: 30,
      bookingDate: "2024-01-13",
      status: "completed",
      rating: 5.0,
      totalAmount: 90,
      otp: null,
      tripStartTime: "Yet to start",
      actualDuration: "01:47:23", // Actual time used
    },
    {
      id: 4,
      cycleName: "Electric Glide",
      owner: "Emma L.",
      ownerAvatar: "EL",
      image: "/placeholder.svg?height=100&width=100",
      location: "Hostel Area",
      price: 45,
      bookingDate: "2024-01-16",

      status: "current",
      rating: null,
      totalAmount: 135,
      otp: "789012",
      tripStartTime: "Yet to start",
    },
  ])

  const currentBookings = bookings.filter((b) => b.status === "current" || b.status === "active")
  const pastBookings = bookings.filter((b) => b.status === "completed")

  const handleStartTrip = (booking: Booking) => {
    setSelectedBooking(booking)
    setGeneratedOTP(booking.otp || "")
    setShowOTPModal(true)
  }

  const handleOTPVerification = (otp: string) => {
    if (selectedBooking) {
      // Update booking status to active and set trip start time
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === selectedBooking.id
            ? {
                ...booking,
                status: "active" as const,
                tripStartTime: new Date().toISOString(),
              }
            : booking,
        ),
      )

      setShowOTPModal(false)
      setSelectedBooking(null)
    }
  }

  const handleEndTrip = (bookingId: number) => {
    setBookings((prev) =>
      prev.map((booking) => {
        if (booking.id === bookingId && booking.tripStartTime) {
          // Calculate actual duration
          const startTime = new Date(booking.tripStartTime).getTime()
          const endTime = new Date().getTime()
          const durationSeconds = Math.floor((endTime - startTime) / 1000)

          const hours = Math.floor(durationSeconds / 3600)
          const minutes = Math.floor((durationSeconds % 3600) / 60)
          const seconds = durationSeconds % 60

          const actualDuration = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`

          return {
            ...booking,
            status: "completed" as const,
            actualDuration,
          }
        }
        return booking
      }),
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
          <p className="text-gray-400">Track your current and past cycle rentals</p>
        </div>

        {/* Current Bookings */}
        {currentBookings.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-[#39FF14]">Current Bookings</h2>
            <div className="grid gap-6">
              {currentBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onStartTrip={handleStartTrip}
                  onEndTrip={handleEndTrip}
                />
              ))}
            </div>
          </div>
        )}

        {/* Past Bookings */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Booking History</h2>
          <div className="grid gap-4">
            {pastBookings.map((booking) => (
              <Card key={booking.id} className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex space-x-4">
                      <img
                        src={booking.image || "/placeholder.svg"}
                        alt={booking.cycleName}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold">{booking.cycleName}</h3>
                          <Badge variant="secondary" className="bg-gray-600">
                            Trip Ended
                          </Badge>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                          <div className="flex items-center">
                            <Avatar className="h-5 w-5 mr-2">
                              <AvatarFallback className="bg-[#39FF14] text-black text-xs">
                                {booking.ownerAvatar}
                              </AvatarFallback>
                            </Avatar>
                            <span>{booking.owner}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{booking.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{formatDate(booking.bookingDate)}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm">
                            <span className="text-gray-400">Duration: </span>
                            <span className="text-[#39FF14] font-mono font-bold">
                              {booking.actualDuration || "00:00:00"}
                            </span>
                            <span className="text-gray-400 ml-4">Paid: </span>
                            <span className="text-[#39FF14] font-semibold">₹{booking.totalAmount}</span>
                          </div>
                          {booking.rating && (
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 mr-1" />
                              <span className="text-sm font-medium">{booking.rating}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                      >
                        View Receipt
                      </Button>
                      {!booking.rating && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#39FF14] text-[#39FF14] hover:bg-[#39FF14]/10 bg-transparent"
                        >
                          Rate Trip
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {bookings.length === 0 && (
          <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Bookings Yet</h3>
              <p className="text-gray-400 mb-6">Start exploring cycles to make your first booking</p>
              <Button className="bg-[#39FF14] text-black hover:bg-[#39FF14]/90">Explore Cycles</Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* OTP Modal */}
      {selectedBooking && (
        <OTPModal
          isOpen={showOTPModal}
          onClose={() => setShowOTPModal(false)}
          onVerify={handleOTPVerification}
          recipientName={selectedBooking.owner}
          generatedOTP={generatedOTP}
        />
      )}

      <ChatWidget recipientName="Sarah K." />
    </div>
  )
}
