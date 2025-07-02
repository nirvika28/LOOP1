"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Plus,
  Calendar,
  Wallet,
  LogOut,
  Edit,
  MapPin,
  Trash2,
  Bell,
  TrendingUp,
  Bike,
  Clock,
  DollarSign,
  Key,
} from "lucide-react"
import Link from "next/link"
import { AnimatedCounter } from "@/components/animated-counter"
import { WalletModal } from "@/components/wallet-modal"
import { ChatWidget } from "@/components/chat-widget"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [walletBalance, setWalletBalance] = useState(100) // Demo balance - insufficient funds

  const handleBalanceUpdate = (newBalance: number) => {
    setWalletBalance(newBalance)
    localStorage.setItem("walletBalance", newBalance.toString())
  }

  useEffect(() => {
    const saved = localStorage.getItem("walletBalance")
    if (saved) setWalletBalance(Number(saved))
  }, [])

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "list", label: "List a Cycle", icon: Plus },
    { id: "bookings", label: "My Bookings", icon: Calendar },
    { id: "wallet", label: "Wallet", icon: Wallet },
  ]

  const activeCycles = [
    {
      id: 1,
      name: "Mountain Bike Pro",
      status: "Available",
      image: "/placeholder.svg?height=100&width=100",
      price: "₹25/hr",
      location: "Main Campus",
      currentRenter: null,
      otp: null,
    },
    {
      id: 2,
      name: "City Cruiser",
      status: "Booked",
      image: "/placeholder.svg?height=100&width=100",
      price: "₹20/hr",
      location: "Library Block",
      currentRenter: "John Smith",
      otp: "123456",
    },
    {
      id: 3,
      name: "Speed Demon",
      status: "Available",
      image: "/placeholder.svg?height=100&width=100",
      price: "₹30/hr",
      location: "Sports Complex",
      currentRenter: null,
      otp: null,
    },
  ]

  const notifications = [
    { id: 1, message: "New booking request for Mountain Bike Pro", time: "2 min ago", type: "booking" },
    { id: 2, message: "Payment received: ₹150", time: "1 hour ago", type: "payment" },
    { id: 3, message: "OTP generated for City Cruiser: 123456", time: "2 hours ago", type: "otp" },
    { id: 4, message: "Cycle returned: Speed Demon", time: "3 hours ago", type: "return" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900/50 border-r border-gray-800 min-h-screen">
          <div className="p-6">
            <div className="text-2xl font-bold mb-8">
              <span className="text-white">LOOP</span>
              <span className="text-[#39FF14]">.</span>
            </div>

            {/* Profile Section */}
            <div className="flex items-center space-x-3 mb-8 p-3 bg-gray-800/50 rounded-lg">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback className="bg-[#39FF14] text-black">JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-gray-400">john@university.edu</p>
              </div>
            </div>

            {/* Wallet Balance */}
            <div className="mb-6 p-3 bg-[#39FF14]/10 border border-[#39FF14]/20 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Wallet className="h-4 w-4 text-[#39FF14]" />
                  <span className="text-sm text-gray-300">Wallet</span>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-[#39FF14] hover:bg-[#39FF14]/10"
                  onClick={() => setShowWalletModal(true)}
                >
                  Top Up
                </Button>
              </div>
              <p className="text-lg font-bold text-[#39FF14] mt-1">₹{walletBalance}</p>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              <Link href="/dashboard">
                <button
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === "dashboard"
                      ? "bg-[#39FF14] text-black"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </button>
              </Link>
              <Link href="/list">
                <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                  <Plus className="h-5 w-5" />
                  <span>List a Cycle</span>
                </button>
              </Link>
              <Link href="/bookings">
                <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                  <Calendar className="h-5 w-5" />
                  <span>My Bookings</span>
                </button>
              </Link>
              <button
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                onClick={() => setShowWalletModal(true)}
              >
                <Wallet className="h-5 w-5" />
                <span>Wallet</span>
              </button>
              <Link href="/">
                <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors mt-8">
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </Link>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Center Panel */}
          <div className="flex-1 p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-gray-400">Welcome back, John! Here's your activity overview.</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div>
                    <p className="text-sm text-gray-400 mb-3">Cycles Listed</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-2xl font-bold text-[#39FF14]">
                        <AnimatedCounter end={3} duration={1500} />
                      </p>
                      <Bike className="h-6 w-6 text-[#39FF14]" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div>
                    <p className="text-sm text-gray-400 mb-3">Active Rentals</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-2xl font-bold text-[#39FF14]">
                        <AnimatedCounter end={1} duration={1200} />
                      </p>
                      <Clock className="h-6 w-6 text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div>
                    <p className="text-sm text-gray-400 mb-3">Total Earnings</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-2xl font-bold text-[#39FF14]">
                        <AnimatedCounter end={2450} prefix="₹" duration={2000} separator="," />
                      </p>
                      <DollarSign className="h-6 w-6 text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div>
                    <p className="text-sm text-gray-400 mb-3">Rating</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-2xl font-bold text-[#39FF14]">
                        <AnimatedCounter end={4.8} decimals={1} duration={1800} />
                      </p>
                      <TrendingUp className="h-6 w-6 text-yellow-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Active Listings with OTP Display */}
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-[#39FF14]">Active Listings</span>
                  <Link href="/list">
                    <Button size="sm" className="bg-[#39FF14] text-black hover:bg-[#39FF14]/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeCycles.map((cycle) => (
                    <div key={cycle.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex space-x-4 items-center">
                        <img
                          src={cycle.image || "/placeholder.svg"}
                          alt={cycle.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-medium text-white">{cycle.name}</h3>
                          <div className="flex text-sm text-gray-400 py-2 space-x-2 items-center">
                            <MapPin className="h-4 w-4" />
                            <span>{cycle.location}</span>
                            <span>•</span>
                            <span>{cycle.price}</span>
                          </div>
                          {cycle.currentRenter && (
                            <div className="flex items-center space-x-2 text-sm">
                              <span className="text-gray-400">Renter:</span>
                              <span className="text-white">{cycle.currentRenter}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge
                          variant={cycle.status === "Available" ? "default" : "secondary"}
                          className={
                            cycle.status === "Available" ? "bg-[#39FF14] text-black" : "bg-blue-500 text-white"
                          }
                        >
                          {cycle.status}
                        </Badge>
                        {cycle.otp && (
                          <div className="flex items-center space-x-2 bg-[#39FF14]/10 px-3 py-1 rounded-lg">
                            <Key className="h-4 w-4 text-[#39FF14]" />
                            <span className="text-[#39FF14] font-mono font-bold">{cycle.otp}</span>
                          </div>
                        )}
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="border-gray-700 bg-transparent text-gray-400">
                            <Edit className="h-4 w-4" />
                          </Button>
                          {cycle.status === "Booked" && (
                            <Link href="/track">
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-gray-700 bg-transparent text-gray-400"
                              >
                                <MapPin className="h-4 w-4" />
                              </Button>
                            </Link>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-700 hover:border-red-500 hover:text-red-500 bg-transparent"
                          >
                            <Trash2 className="h-4 w-4 text-gray-400" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel */}
          <div className="w-80 p-6 border-l border-gray-800">
            {/* Live Map Placeholder */}
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Live Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 rounded-lg flex items-center justify-center bg-gray-800/50">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 text-[#39FF14] mx-auto mb-2" />
                    <p className="text-sm text-gray-400">Map will show live cycle locations</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Notifications */}
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-start space-x-2">
                        {notification.type === "booking" && <Calendar className="h-4 w-4 text-blue-400 mt-0.5" />}
                        {notification.type === "payment" && <DollarSign className="h-4 w-4 text-green-400 mt-0.5" />}
                        {notification.type === "otp" && <Key className="h-4 w-4 text-[#39FF14] mt-0.5" />}
                        {notification.type === "return" && <Bike className="h-4 w-4 text-gray-400 mt-0.5" />}
                        <div className="flex-1">
                          <p className="text-sm text-gray-300">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modals and Widgets */}
      <WalletModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        currentBalance={walletBalance}
        onBalanceUpdate={handleBalanceUpdate}
      />

      <ChatWidget recipientName="John Smith" />
    </div>
  )
}
