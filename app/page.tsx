"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Shield, Wallet, Users, MessageCircle, Key, CreditCard } from "lucide-react"
import Link from "next/link"
import { AnimatedCounter } from "@/components/animated-counter"
import { Navigation } from "@/components/navigation"
import { WalletModal } from "@/components/wallet-modal"
import { ChatWidget } from "@/components/chat-widget"

export default function HomePage() {
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [walletBalance, setWalletBalance] = useState(100) // Demo balance - insufficient funds

  // Show wallet modal for first-time users
  useEffect(() => {
    const hasSeenWallet = localStorage.getItem("hasSeenWallet")
    if (!hasSeenWallet && walletBalance < 200) {
      setTimeout(() => {
        setShowWalletModal(true)
        localStorage.setItem("hasSeenWallet", "true")
      }, 2000)
    }
  }, [walletBalance])

  const handleBalanceUpdate = (newBalance: number) => {
    setWalletBalance(newBalance)
    // Store in localStorage to persist across pages
    localStorage.setItem("walletBalance", newBalance.toString())
  }

  // Load balance from localStorage on mount
  useEffect(() => {
    const savedBalance = localStorage.getItem("walletBalance")
    if (savedBalance) {
      setWalletBalance(Number.parseInt(savedBalance))
    }
  }, [])

  const features = [
    {
      icon: Wallet,
      title: "Wallet-Based Payments",
      description: "Secure prepaid wallet system for all transactions with instant refunds",
      highlight: true,
    },
    {
      icon: Shield,
      title: "ID Verified Borrowers",
      description: "College ID verification ensures secure and trusted rentals",
      highlight: true,
    },
    {
      icon: Key,
      title: "OTP-Based Security",
      description: "Secure OTP system ensures fair time tracking and prevents misuse",
      highlight: true,
    },
    {
      icon: MessageCircle,
      title: "In-App Chat",
      description: "Real-time communication between cycle owners and renters",
      highlight: true,
    },
  ]

  const stats = [
    { number: "500+", label: "Active Users" },
    { number: "150+", label: "Cycles Listed" },
    { number: "2000+", label: "Rides Completed" },
    { number: "4.8", label: "Average Rating" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section with Enhanced Messaging */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-[#39FF14]/20 via-transparent to-transparent"></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-2 h-2 bg-[#39FF14] rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-[#39FF14] rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-[#39FF14] rounded-full animate-pulse delay-500"></div>

          {/* Animated SVG Bikes */}
          <svg
            className="absolute top-1/2 left-1/4 w-8 h-8 text-[#39FF14] opacity-30 animate-bounce"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M5 13c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm14 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-8.5-2L9 7H7l1.5 4H6.5c-.8 0-1.5.7-1.5 1.5S5.7 14 6.5 14h11c.8 0 1.5-.7 1.5-1.5S18.3 11 17.5 11H16l-1.5-4H13l1.5 4h-3z" />
          </svg>
          <svg
            className="absolute top-1/3 right-1/3 w-6 h-6 text-[#39FF14] opacity-20 animate-pulse delay-700"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M5 13c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm14 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-8.5-2L9 7H7l1.5 4H6.5c-.8 0-1.5.7-1.5 1.5S5.7 14 6.5 14h11c.8 0 1.5-.7 1.5-1.5S18.3 11 17.5 11H16l-1.5-4H13l1.5 4h-3z" />
          </svg>
        </div>

        <div className="container mx-auto px-4 py-20 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Revolutionizing <span className="text-[#39FF14]">Campus</span>
              <br />
              <span className="text-[#39FF14]">Mobility</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
              Experience the future of peer-to-peer cycle rentals with wallet-based payments, ID verification, and
              secure OTP handoffs.
            </p>

            {/* Feature Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-3xl mx-auto">
              <div className="flex items-center space-x-2 text-sm">
                <Wallet className="h-4 w-4 text-[#39FF14]" />
                <span>Wallet Payments</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Shield className="h-4 w-4 text-[#39FF14]" />
                <span>ID Verified</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Key className="h-4 w-4 text-[#39FF14]" />
                <span>OTP Security</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MessageCircle className="h-4 w-4 text-[#39FF14]" />
                <span>In-App Chat</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/auth">
                <Button
                  size="lg"
                  className="bg-[#39FF14] text-black hover:bg-[#39FF14]/90 shadow-[0_0_30px_rgba(57,255,20,0.4)] text-lg px-8 py-6 animate-pulse"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-[#39FF14] text-[#39FF14] hover:bg-[#39FF14] hover:text-black text-lg px-8 py-6 bg-transparent"
                onClick={() => setShowWalletModal(true)}
              >
                <CreditCard className="mr-2 h-5 w-5" />
                Setup Wallet
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#39FF14] mb-2">
                <AnimatedCounter end={500} suffix="+" duration={2500} />
              </div>
              <div className="text-gray-400 text-sm md:text-base">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#39FF14] mb-2">
                <AnimatedCounter end={150} suffix="+" duration={2000} />
              </div>
              <div className="text-gray-400 text-sm md:text-base">Cycles Listed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#39FF14] mb-2">
                <AnimatedCounter end={2000} suffix="+" duration={3000} />
              </div>
              <div className="text-gray-400 text-sm md:text-base">Rides Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#39FF14] mb-2">
                <AnimatedCounter end={4.8} decimals={1} duration={2200} />
              </div>
              <div className="text-gray-400 text-sm md:text-base">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Next-Gen <span className="text-[#39FF14]">Features</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience campus mobility like never before with our advanced security and payment features.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`bg-gray-900/50 border-gray-800 hover:border-[#39FF14]/50 transition-all duration-300 group cursor-pointer backdrop-blur-sm ${
                  feature.highlight ? "ring-1 ring-[#39FF14]/20" : ""
                }`}
              >
                <CardContent className="p-6">
                  <div className="mb-4">
                    <feature.icon className="h-8 w-8 text-[#39FF14] group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{feature.description}</p>
                  {feature.highlight && (
                    <div className="mt-3">
                      <span className="text-xs bg-[#39FF14]/20 text-[#39FF14] px-2 py-1 rounded-full">New Feature</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 bg-gray-900/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-[#39FF14]">Community</span> — Connect with Fellow Cyclists
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Enable real-time chat between cycle owners and renters within the app, powered by advanced messaging
              technology.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <MessageCircle className="h-12 w-12 text-[#39FF14] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Real-time Messaging</h3>
                <p className="text-gray-400">
                  Text, emoji, and image support with push notifications for seamless communication.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#39FF14]/10 border-[#39FF14]/30 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-[#39FF14] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Chat History</h3>
                <p className="text-gray-400">
                  Complete chat history tied to each rental session for reference and support.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <Shield className="h-12 w-12 text-[#39FF14] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Secure Platform</h3>
                <p className="text-gray-400">
                  All communications are encrypted and monitored for user safety and security.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-[#39FF14]/10 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to <span className="text-[#39FF14]">revolutionize</span> your campus mobility?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of students already using LOOP for secure, convenient, and sustainable transportation.
          </p>
          <Link href="/auth">
            <Button
              size="lg"
              className="bg-[#39FF14] text-black hover:bg-[#39FF14]/90 shadow-[0_0_30px_rgba(57,255,20,0.4)] text-lg px-8 py-6"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">
                <span className="text-white">LOOP</span>
                <span className="text-[#39FF14]">.</span>
              </div>
              <p className="text-gray-400">
                Revolutionizing campus mobility through secure peer-to-peer cycle rentals.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/explore" className="hover:text-[#39FF14]">
                    Explore Cycles
                  </Link>
                </li>
                <li>
                  <Link href="/list" className="hover:text-[#39FF14]">
                    List Your Cycle
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-[#39FF14]">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Wallet Payments</li>
                <li>ID Verification</li>
                <li>OTP Security</li>
                <li>In-App Chat</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/terms" className="hover:text-[#39FF14]">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-[#39FF14]">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LOOP. All rights reserved. Revolutionizing campus mobility.</p>
          </div>
        </div>
      </footer>

      {/* Modals and Widgets */}
      <WalletModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        currentBalance={walletBalance}
        onBalanceUpdate={handleBalanceUpdate}
      />

      <ChatWidget recipientName="Sarah K." />
    </div>
  )
}
