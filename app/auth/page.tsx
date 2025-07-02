"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Mail, Lock, User, Phone } from "lucide-react"
import Link from "next/link"

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate OTP sending
    setTimeout(() => {
      setIsLoading(false)
      setOtpSent(true)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-radial from-[#39FF14]/10 via-transparent to-transparent"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-400 hover:text-[#39FF14] transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="text-3xl font-bold mb-2">
              <span className="text-white">LOOP</span>
              <span className="text-[#39FF14]">.</span>
            </div>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription className="text-gray-400">Sign in to your account or create a new one</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-800 border-gray-700">
                <TabsTrigger value="login" className="data-[state=active]:bg-[#39FF14] data-[state=active]:text-black">
                  Login
                </TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-[#39FF14] data-[state=active]:text-black">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4 mt-6">
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault()
                    // Redirect to dashboard after login
                    window.location.href = "/dashboard"
                  }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="email">Campus Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@university.edu"
                        className="pl-10 bg-gray-800 border-gray-700 focus:border-[#39FF14] focus:ring-[#39FF14]"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        className="pl-10 bg-gray-800 border-gray-700 focus:border-[#39FF14] focus:ring-[#39FF14]"
                        required
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#39FF14] text-black hover:bg-[#39FF14]/90 shadow-[0_0_20px_rgba(57,255,20,0.3)]"
                  >
                    Sign In
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4 mt-6">
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault()
                    // Redirect to dashboard after signup
                    window.location.href = "/dashboard"
                  }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Your full name"
                        className="pl-10 bg-gray-800 border-gray-700 focus:border-[#39FF14] focus:ring-[#39FF14]"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signupEmail">Campus Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signupEmail"
                        type="email"
                        placeholder="your.email@university.edu"
                        className="pl-10 bg-gray-800 border-gray-700 focus:border-[#39FF14] focus:ring-[#39FF14]"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 9876543210"
                        className="pl-10 bg-gray-800 border-gray-700 focus:border-[#39FF14] focus:ring-[#39FF14]"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signupPassword">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signupPassword"
                        type="password"
                        placeholder="Create a password"
                        className="pl-10 bg-gray-800 border-gray-700 focus:border-[#39FF14] focus:ring-[#39FF14]"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="terms"
                      className="rounded border-gray-700 text-[#39FF14] focus:ring-[#39FF14]"
                      required
                    />
                    <Label htmlFor="terms" className="text-sm text-gray-400">
                      I agree to the{" "}
                      <Link href="/terms" className="text-[#39FF14] hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-[#39FF14] hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#39FF14] text-black hover:bg-[#39FF14]/90 shadow-[0_0_20px_rgba(57,255,20,0.3)]"
                  >
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-gray-400">
          <p>
            By continuing, you agree to LOOP's{" "}
            <Link href="/terms" className="text-[#39FF14] hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-[#39FF14] hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
