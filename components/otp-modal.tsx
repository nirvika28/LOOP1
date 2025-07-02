"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Key, X, CheckCircle, Clock, RefreshCw } from "lucide-react"

interface OTPModalProps {
  isOpen: boolean
  onClose: () => void
  onVerify: (otp: string) => void
  recipientName: string
  generatedOTP: string
}

export function OTPModal({ isOpen, onClose, onVerify, recipientName, generatedOTP }: OTPModalProps) {
  const [otp, setOtp] = useState("")
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsExpired(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isOpen])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleVerify = () => {
    if (otp === generatedOTP) {
      onVerify(otp)
      onClose()
    }
  }

  const handleResendOTP = () => {
    setTimeLeft(300)
    setIsExpired(false)
    setOtp("")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="bg-gray-900/95 border-gray-800 w-full max-w-md animate-in zoom-in-95 duration-300">
        <CardHeader className="relative">
          <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#39FF14]/20 rounded-lg">
              <Key className="h-6 w-6 text-[#39FF14]" />
            </div>
            <div>
              <CardTitle className="text-xl">Enter OTP</CardTitle>
              <CardDescription>Confirm cycle handoff with {recipientName}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* OTP Display for Demo */}
          <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <p className="text-sm text-gray-400 mb-2">Demo OTP (shared by lender):</p>
            <p className="text-2xl font-mono font-bold text-[#39FF14] tracking-wider">{generatedOTP}</p>
          </div>

          {/* Timer */}
          <div className="text-center">
            <Badge
              variant={isExpired ? "destructive" : "secondary"}
              className={`${!isExpired ? "bg-[#39FF14]/20 text-[#39FF14]" : ""}`}
            >
              <Clock className="h-3 w-3 mr-1" />
              {isExpired ? "Expired" : formatTime(timeLeft)}
            </Badge>
          </div>

          {/* OTP Input */}
          <div className="space-y-4">
            <div className="flex justify-center space-x-2">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <Input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={otp[index] || ""}
                  onChange={(e) => {
                    const newOtp = otp.split("")
                    newOtp[index] = e.target.value
                    setOtp(newOtp.join(""))

                    // Auto-focus next input
                    if (e.target.value && index < 5) {
                      const nextInput = document.querySelector(`input[data-index="${index + 1}"]`) as HTMLInputElement
                      nextInput?.focus()
                    }
                  }}
                  data-index={index}
                  className="w-12 h-12 text-center text-lg font-mono bg-gray-800 border-gray-700 focus:border-[#39FF14] focus:ring-[#39FF14]"
                />
              ))}
            </div>

            <div className="flex space-x-3">
              {isExpired ? (
                <Button
                  onClick={handleResendOTP}
                  variant="outline"
                  className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Resend OTP
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                  onClick={onClose}
                >
                  Cancel
                </Button>
              )}
              <Button
                onClick={handleVerify}
                disabled={otp.length !== 6 || isExpired}
                className="flex-1 bg-[#39FF14] text-black hover:bg-[#39FF14]/90 shadow-[0_0_20px_rgba(57,255,20,0.3)]"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Start Trip
              </Button>
            </div>
          </div>

          {/* Instructions */}
          <div className="text-center text-sm text-gray-400">
            <p>The lender will share this OTP during cycle handoff</p>
            <p className="mt-1">Trip timer starts after OTP verification</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
