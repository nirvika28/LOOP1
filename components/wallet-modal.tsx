"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Wallet, CreditCard, Smartphone, Building, X, Plus, CheckCircle } from "lucide-react"

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
  currentBalance: number
  onBalanceUpdate: (newBalance: number) => void
}

export function WalletModal({ isOpen, onClose, currentBalance, onBalanceUpdate }: WalletModalProps) {
  const [rechargeAmount, setRechargeAmount] = useState("")
  const [selectedMethod, setSelectedMethod] = useState("upi")
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const quickAmounts = [200, 500, 1000, 2000]
  const paymentMethods = [
    { id: "upi", name: "UPI", icon: Smartphone },
    { id: "card", name: "Credit/Debit Card", icon: CreditCard },
    { id: "netbanking", name: "Net Banking", icon: Building },
  ]

  const handleRecharge = async () => {
    const amount = Number.parseInt(rechargeAmount)
    if (!amount || amount < 200 || !selectedMethod) return

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      const newBalance = currentBalance + amount
      onBalanceUpdate(newBalance)
      setIsProcessing(false)
      setShowSuccess(true)

      // Show success for 2 seconds then close
      setTimeout(() => {
        setShowSuccess(false)
        setRechargeAmount("")
        onClose()
      }, 2000)
    }, 2000)
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
              <Wallet className="h-6 w-6 text-[#39FF14]" />
            </div>
            <div>
              <CardTitle className="text-xl">LOOP Wallet</CardTitle>
              <CardDescription>Secure prepaid wallet for all transactions</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isProcessing && !showSuccess ? (
            <>
              {/* Current Balance */}
              <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Current Balance</p>
                <p className="text-2xl font-bold text-[#39FF14]">₹{currentBalance}</p>
                {currentBalance < 200 && (
                  <Badge variant="destructive" className="mt-2">
                    Low Balance - Recharge Required
                  </Badge>
                )}
              </div>

              {/* Quick Recharge Amounts */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Quick Recharge</Label>
                <div className="grid grid-cols-2 gap-3">
                  {quickAmounts.map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      className={`border-gray-700 hover:border-[#39FF14] hover:bg-[#39FF14]/10 ${
                        rechargeAmount === amount.toString() ? "border-[#39FF14] bg-[#39FF14]/10" : ""
                      }`}
                      onClick={() => setRechargeAmount(amount.toString())}
                    >
                      ₹{amount}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div>
                <Label htmlFor="customAmount" className="text-sm font-medium mb-2 block">
                  Custom Amount (Min. ₹200)
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">₹</span>
                  <Input
                    id="customAmount"
                    type="number"
                    placeholder="Enter amount"
                    value={rechargeAmount}
                    onChange={(e) => setRechargeAmount(e.target.value)}
                    className="pl-8 bg-gray-800 border-gray-700 focus:border-[#39FF14] focus:ring-[#39FF14]"
                    min="200"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Payment Method</Label>
                <div className="space-y-2">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                        selectedMethod === method.id
                          ? "border-[#39FF14] bg-[#39FF14]/10"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                    >
                      <method.icon className="h-5 w-5 text-gray-400" />
                      <span className="text-sm">{method.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                  onClick={onClose}
                >
                  Explore First
                </Button>
                <Button
                  className="flex-1 bg-[#39FF14] text-black hover:bg-[#39FF14]/90 shadow-[0_0_20px_rgba(57,255,20,0.3)]"
                  disabled={!rechargeAmount || !selectedMethod || Number.parseInt(rechargeAmount) < 200}
                  onClick={handleRecharge}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Recharge Now
                </Button>
              </div>
            </>
          ) : isProcessing ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#39FF14] mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold mb-2">Processing Payment</h3>
              <p className="text-gray-400 text-sm">Please wait while we process your recharge...</p>
              <div className="mt-4 p-3 bg-gray-800/50 rounded-lg">
                <p className="text-sm text-gray-400">Amount: ₹{rechargeAmount}</p>
                <p className="text-sm text-gray-400">
                  Method: {paymentMethods.find((m) => m.id === selectedMethod)?.name}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-[#39FF14] mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Recharge Successful!</h3>
              <p className="text-gray-400 text-sm mb-4">₹{rechargeAmount} has been added to your wallet</p>
              <div className="p-4 bg-[#39FF14]/10 rounded-lg">
                <p className="text-sm text-gray-400">New Balance</p>
                <p className="text-2xl font-bold text-[#39FF14]">₹{currentBalance}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
