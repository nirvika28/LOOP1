"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Clock, Camera, X } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

export default function ListCyclePage() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [formValid, setFormValid] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && uploadedImages.length < 4) {
      const newImages = Array.from(files)
        .slice(0, 4 - uploadedImages.length)
        .map((file) => URL.createObjectURL(file))
      setUploadedImages([...uploadedImages, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <Navigation />

        <div className="max-w-2xl mx-auto">
          <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">List Your Cycle</CardTitle>
              <CardDescription className="text-gray-400">
                Share your cycle with fellow students and start earning
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form className="space-y-6">
                {/* Image Upload */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Upload Photos (Max 4)</Label>
                  <div className="grid grid-cols-2 gap-4">
                    {uploadedImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    {uploadedImages.length < 4 && (
                      <label className="border-2 border-dashed border-gray-700 rounded-lg h-32 flex flex-col items-center justify-center cursor-pointer hover:border-[#39FF14] transition-colors">
                        <Camera className="h-8 w-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-400">Add Photo</span>
                        <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                      </label>
                    )}
                  </div>
                </div>

                {/* Cycle Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Cycle Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Mountain Bike Pro, City Cruiser"
                    className="bg-gray-800 border-gray-700 focus:border-[#39FF14] focus:ring-[#39FF14]"
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your cycle's features, condition, and any special notes..."
                    className="bg-gray-800 border-gray-700 focus:border-[#39FF14] focus:ring-[#39FF14] min-h-[100px]"
                    required
                  />
                </div>

                {/* Pricing */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price per Hour</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-400">₹</span>
                      <Input
                        id="price"
                        type="number"
                        placeholder="25"
                        className="pl-10 bg-gray-800 border-gray-700 focus:border-[#39FF14] focus:ring-[#39FF14]"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deposit">Security Deposit</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-400">₹</span>
                      <Input
                        id="deposit"
                        type="number"
                        placeholder="500"
                        className="pl-10 bg-gray-800 border-gray-700 focus:border-[#39FF14] focus:ring-[#39FF14]"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Availability */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Availability</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startTime">Available From</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="startTime"
                          type="time"
                          className="pl-10 bg-gray-800 border-gray-700 focus:border-[#39FF14] focus:ring-[#39FF14]"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endTime">Available Until</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="endTime"
                          type="time"
                          className="pl-10 bg-gray-800 border-gray-700 focus:border-[#39FF14] focus:ring-[#39FF14]"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pickup Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Pickup Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="location"
                      placeholder="e.g., Main Campus Gate, Library Block"
                      className="pl-10 bg-gray-800 border-gray-700 focus:border-[#39FF14] focus:ring-[#39FF14]"
                      required
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Use Current Location
                  </Button>
                </div>

                {/* Cycle Type */}
                <div className="space-y-2">
                  <Label htmlFor="type">Cycle Type</Label>
                  <Select>
                    <SelectTrigger className="bg-gray-800 border-gray-700 focus:border-[#39FF14] focus:ring-[#39FF14]">
                      <SelectValue placeholder="Select cycle type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="mountain">Mountain Bike</SelectItem>
                      <SelectItem value="road">Road Bike</SelectItem>
                      <SelectItem value="hybrid">Hybrid Bike</SelectItem>
                      <SelectItem value="electric">Electric Bike</SelectItem>
                      <SelectItem value="city">City Bike</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="agreement"
                    className="mt-1 rounded border-gray-700 text-[#39FF14] focus:ring-[#39FF14]"
                    required
                  />
                  <Label htmlFor="agreement" className="text-sm text-gray-400 leading-relaxed">
                    I agree to the{" "}
                    <Link href="/terms" className="text-[#39FF14] hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and confirm that my cycle is in good working condition. I understand that I am responsible for
                    maintaining my cycle and ensuring renter safety.
                  </Label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-[#39FF14] text-black hover:bg-[#39FF14]/90 shadow-[0_0_30px_rgba(57,255,20,0.4)] text-lg py-6"
                >
                  List My Cycle
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
