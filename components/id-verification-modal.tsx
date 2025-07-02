"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Shield, Upload, X, CheckCircle, Clock } from "lucide-react"

interface IDVerificationModalProps {
  isOpen: boolean
  onClose: () => void
  onVerify: (data: any) => void
}

export function IDVerificationModal({ isOpen, onClose, onVerify }: IDVerificationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    hostel: "",
    roomNumber: "",
    idImage: null as File | null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  const hostels = [
    "HB-1",
    "HB-2",
    "HB-3",
    "HB-4",
    
  ]

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, idImage: file })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate verification process
    setTimeout(() => {
      setIsSubmitting(false)
      setIsVerified(true)
      setTimeout(() => {
        onVerify(formData)
        onClose()
      }, 2000)
    }, 3000)
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
              <Shield className="h-6 w-6 text-[#39FF14]" />
            </div>
            <div>
              <CardTitle className="text-xl">ID Verification</CardTitle>
              <CardDescription>Secure your booking with college ID verification</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!isSubmitting && !isVerified ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-gray-800 border-gray-700 focus:border-[#39FF14] focus:ring-[#39FF14]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rollNumber">College Roll Number</Label>
                <Input
                  id="rollNumber"
                  value={formData.rollNumber}
                  onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                  className="bg-gray-800 border-gray-700 focus:border-[#39FF14] focus:ring-[#39FF14]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hostel">Hostel</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, hostel: value })}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 focus:border-[#39FF14] focus:ring-[#39FF14]">
                    <SelectValue placeholder="Select your hostel" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {hostels.map((hostel) => (
                      <SelectItem key={hostel} value={hostel}>
                        {hostel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="roomNumber">Room Number</Label>
                <Input
                  id="roomNumber"
                  value={formData.roomNumber}
                  onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                  className="bg-gray-800 border-gray-700 focus:border-[#39FF14] focus:ring-[#39FF14]"
                  placeholder="e.g., 201"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="idImage">College ID Card</Label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-[#39FF14] transition-colors">
                  {formData.idImage ? (
                    <div className="space-y-2">
                      <CheckCircle className="h-8 w-8 text-[#39FF14] mx-auto" />
                      <p className="text-sm text-[#39FF14]">ID Card Uploaded</p>
                      <p className="text-xs text-gray-400">{formData.idImage.name}</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                      <p className="text-sm text-gray-400">Upload your college ID card</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="idUpload"
                        required
                      />
                      <label
                        htmlFor="idUpload"
                        className="inline-block bg-gray-800 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                      >
                        Choose File
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#39FF14] text-black hover:bg-[#39FF14]/90 shadow-[0_0_20px_rgba(57,255,20,0.3)]"
                disabled={
                  !formData.name ||
                  !formData.rollNumber ||
                  !formData.hostel ||
                  !formData.roomNumber ||
                  !formData.idImage
                }
              >
                Verify & Continue
              </Button>
            </form>
          ) : isSubmitting ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#39FF14] mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold mb-2">Verifying Your ID</h3>
              <p className="text-gray-400 text-sm">This usually takes 2-3 minutes...</p>
              <Badge className="mt-4 bg-yellow-500/20 text-yellow-400">
                <Clock className="h-3 w-3 mr-1" />
                Pending Verification
              </Badge>
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-[#39FF14] mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Verification Complete!</h3>
              <p className="text-gray-400 text-sm">Your booking is now confirmed</p>
              <Badge className="mt-4 bg-[#39FF14]/20 text-[#39FF14]">
                <CheckCircle className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
