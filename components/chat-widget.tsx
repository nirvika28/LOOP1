"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, X, Smile, ImageIcon, Phone } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "other"
  timestamp: Date
  type: "text" | "image"
}

interface ChatWidgetProps {
  recipientName: string
  recipientAvatar?: string
}

export function ChatWidget({ recipientName, recipientAvatar }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm interested in renting your cycle. Is it available tomorrow?",
      sender: "user",
      timestamp: new Date(Date.now() - 300000),
      type: "text",
    },
    {
      id: "2",
      text: "Yes, it's available! What time would you like to pick it up?",
      sender: "other",
      timestamp: new Date(Date.now() - 240000),
      type: "text",
    },
    {
      id: "3",
      text: "Around 2 PM would be perfect. Where should we meet?",
      sender: "user",
      timestamp: new Date(Date.now() - 180000),
      type: "text",
    },
  ])
  const [unreadCount, setUnreadCount] = useState(1)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (!message.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    }

    setMessages([...messages, newMessage])
    setMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => {
            setIsOpen(!isOpen)
            if (!isOpen) setUnreadCount(0)
          }}
          className="relative bg-[#39FF14] text-black hover:bg-[#39FF14]/90 shadow-[0_0_30px_rgba(57,255,20,0.4)] rounded-full p-4 animate-pulse"
        >
          <MessageCircle className="h-6 w-6" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 h-96 animate-in slide-in-from-bottom-5 zoom-in-95 duration-300">
          <Card className="bg-gray-900/95 border-gray-800 backdrop-blur-sm h-full flex flex-col">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#39FF14] rounded-full flex items-center justify-center">
                  <span className="text-black font-semibold text-sm">{recipientName.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <CardTitle className="text-sm">{recipientName}</CardTitle>
                  <p className="text-xs text-gray-400">Online</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="ghost" className="p-1 h-8 w-8">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="p-1 h-8 w-8" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[70%] p-3 rounded-lg text-sm ${
                        msg.sender === "user" ? "bg-[#39FF14] text-black" : "bg-gray-800 text-white"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-black/70" : "text-gray-400"}`}>
                        {msg.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-800">
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="ghost" className="p-2 h-8 w-8">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="p-2 h-8 w-8">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-800 border-gray-700 focus:border-[#39FF14] focus:ring-[#39FF14] text-sm"
                  />
                  <Button
                    size="sm"
                    onClick={sendMessage}
                    className="bg-[#39FF14] text-black hover:bg-[#39FF14]/90 p-2 h-8 w-8"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
