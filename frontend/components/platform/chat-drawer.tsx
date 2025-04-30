"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronUp, ChevronDown, Send } from "lucide-react"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export function ChatDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Welcome to Fabricait! How can I help you design today?",
      role: "assistant",
      timestamp: new Date(),
    },
    {
      id: "2",
      content: "I need to create a simple gear with 12 teeth.",
      role: "user",
      timestamp: new Date(Date.now() - 60000),
    },
    {
      id: "3",
      content:
        "I've created a gear with 12 teeth. Would you like to adjust the dimensions or add any specific features?",
      role: "assistant",
      timestamp: new Date(Date.now() - 50000),
    },
  ])

  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages([...messages, newMessage])
    setInput("")
    setIsOpen(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm processing your request. Let me generate that CAD model for you.",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  return (
    <div className="w-full bg-background border-t border-border/40">
      <div 
        className="flex justify-between items-center px-4 py-2 border-b border-border/40 cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-medium">AI Assistant</h3>
        <div className="flex items-center">
          {isOpen ? (
            <>
              <ChevronDown className="h-4 w-4 mr-2" />
              Hide History
            </>
          ) : (
            <>
              <ChevronUp className="h-4 w-4 mr-2" />
              Show History
            </>
          )}
        </div>
      </div>

      {isOpen && (
        <div ref={messagesContainerRef} className="p-4 max-h-80 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[90%] rounded-lg px-4 py-2 ${
                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                <p>{message.content}</p>
                <p className="mt-1 text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="p-4 flex-1">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the AI assistant..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
