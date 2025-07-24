"use client"

import * as React from "react"
import { MessageCircle, Send, X, HelpCircle, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { faqData } from "@/lib/faq-data"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export function FloatingChat() {
  // Add styles for speech bubble arrows
  React.useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      .message-bubble-bot::before {
        content: '';
        position: absolute;
        bottom: 8px;
        left: -8px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 8px 8px 0 0;
        border-color: #e2e8f0 transparent transparent transparent;
        z-index: 1;
      }
      
      .message-bubble-user::after {
        content: '';
        position: absolute;
        bottom: 8px;
        right: -8px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 8px 0 0 8px;
        border-color: #2563eb transparent transparent transparent;
        z-index: 1;
      }
    `
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: 1,
      text: "Hello! Welcome to CredVeda. I'm here to help you with your credit analysis questions. You can click on any FAQ below or type your own question!",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = React.useState("")
  const [isOpen, setIsOpen] = React.useState(false)
  const [isFAQExpanded, setIsFAQExpanded] = React.useState(false)
  const [showNotification, setShowNotification] = React.useState(false)
  const scrollAreaRef = React.useRef<HTMLDivElement>(null)

  // Handle ESC key to close chat
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen])

  // Show notification popup after a delay
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true)
    }, 3000) // Show after 3 seconds

    return () => clearTimeout(timer)
  }, [])

  // Auto-hide notification after 5 seconds of appearing
  React.useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false)
      }, 5000) // Hide after 5 seconds

      return () => clearTimeout(timer)
    }
  }, [showNotification])

  // Hide notification when chat is opened
  React.useEffect(() => {
    if (isOpen) {
      setShowNotification(false)
    }
  }, [isOpen])

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")

    // Scroll to bottom to show the user message
    setTimeout(() => {
      scrollToBottom(true)
    }, 50)

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: "Thank you for your question! Our AI chatbot features are currently being implemented by our development team. Meanwhile, I can help you set an EMI reminder for your loan payments! Would you like me to assist you with setting up EMI reminders to stay on top of your financial commitments?",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      
      // Scroll to bottom to show the new message
      setTimeout(() => {
        scrollToBottom(true)
      }, 150)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const scrollToBottom = (smooth: boolean = true) => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollContainer) {
        const targetScrollTop = scrollContainer.scrollHeight - scrollContainer.clientHeight
        
        if (smooth) {
          // Use framer motion for smooth animated scroll
          const startScrollTop = scrollContainer.scrollTop
          const distance = targetScrollTop - startScrollTop
          
          if (Math.abs(distance) > 10) { // Only animate if there's a significant scroll distance
            const duration = Math.min(800, Math.max(300, Math.abs(distance) * 2)) // Dynamic duration based on distance
            
            const startTime = performance.now()
            
            const animateScroll = (currentTime: number) => {
              const elapsed = currentTime - startTime
              const progress = Math.min(elapsed / duration, 1)
              
              // Smooth easing function (ease-out)
              const easeOutQuart = 1 - Math.pow(1 - progress, 4)
              
              scrollContainer.scrollTop = startScrollTop + (distance * easeOutQuart)
              
              if (progress < 1) {
                requestAnimationFrame(animateScroll)
              }
            }
            
            requestAnimationFrame(animateScroll)
          } else {
            scrollContainer.scrollTop = targetScrollTop
          }
        } else {
          scrollContainer.scrollTop = targetScrollTop
        }
      }
    }
  }

  const handleFAQClick = (faqItem: typeof faqData[0]) => {
    // Add user's question to chat
    const userMessage: Message = {
      id: messages.length + 1,
      text: faqItem.question,
      sender: "user",
      timestamp: new Date(),
    }

    // Add bot's answer to chat
    const botMessage: Message = {
      id: messages.length + 2,
      text: faqItem.answer,
      sender: "bot",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage, botMessage])

    // Scroll to bottom to show the new messages with coordinated timing
    setTimeout(() => {
      scrollToBottom(true)
    }, 150) // Slightly delayed to let message animations start
  }

    return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Notification Popup */}
      <AnimatePresence>
        {showNotification && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute bottom-16 right-0 mb-2 w-80 max-w-sm"
          >
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3 relative hover:shadow-xl transition-shadow duration-200">
              {/* Speech bubble arrow */}
              <div className="absolute bottom-0 right-6 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white transform translate-y-full"></div>
              <div className="absolute bottom-0 right-6 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-gray-200 transform translate-y-full translate-x-0"></div>
              
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0 cursor-pointer hover:bg-gray-50 rounded-md p-1 -m-1 transition-colors" onClick={() => {
                  setIsOpen(true)
                  setShowNotification(false)
                }}>
                  <p className="text-sm font-medium text-gray-900">Need help?</p>
                  <p className="text-xs text-gray-600">Chat with us about credit analysis!</p>
                </div>
                <button
                  onClick={() => setShowNotification(false)}
                  className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-200 hover:scale-105"
      >
        <MessageCircle className="h-6 w-6 text-white" />
        <span className="sr-only">Open chat</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/25 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Chat Window */}
            <motion.div
              initial={{ 
                opacity: 0,
                x: 100,
                scale: 0.95
              }}
              animate={{ 
                opacity: 1,
                x: 0,
                scale: 1
              }}
              exit={{ 
                opacity: 0,
                x: 100,
                scale: 0.95
              }}
              transition={{ 
                type: "spring",
                damping: 25,
                stiffness: 300,
                duration: 0.3
              }}
              className="fixed bottom-28 right-6 w-full max-w-md h-[600px] bg-background border rounded-lg shadow-xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="p-4 pb-2 border-b flex justify-between items-center flex-shrink-0">
                <div>
                  <h3 className="text-lg font-semibold">Chat with CredVeda</h3>
                  <p className="text-sm text-muted-foreground">
                    Get instant help with your credit analysis
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>

              {/* Messages Area */}
              <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        duration: 0.4,
                        delay: index === messages.length - 1 ? 0.1 : 0, // Slight delay for the latest message
                        ease: [0.23, 1, 0.32, 1] // Custom ease for smooth feel
                      }}
                      className={`flex ${
                        message.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-3 py-2 text-sm relative ${
                          message.sender === "user"
                            ? "bg-blue-600 text-white message-bubble-user"
                            : "bg-muted text-foreground message-bubble-bot"
                        }`}
                      >
                        {message.text}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>

              {/* FAQ Quick Access Section */}
              <div className="border-t flex-shrink-0">
                <div className="p-4 pt-2 pb-2">
                  <button
                    onClick={() => setIsFAQExpanded(!isFAQExpanded)}
                    className="flex items-center justify-between w-full group hover:bg-gray-50 rounded-md p-1 -m-1 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">Frequently Asked Questions</span>
                    </div>
                    <motion.div
                      animate={{ rotate: isFAQExpanded ? 0 : -90 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      <ChevronDown className="h-4 w-4 text-gray-500 group-hover:text-gray-700 transition-colors" />
                    </motion.div>
                  </button>
                </div>
                
                <AnimatePresence>
                  {isFAQExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4">
                        <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto overflow-x-hidden">
                          {faqData.map((faq) => (
                            <motion.button
                              key={faq.id}
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2, delay: 0.1 }}
                              whileHover={{ 
                                scale: 1.02,
                                backgroundColor: "#dbeafe",
                                transition: { duration: 0.2 }
                              }}
                              whileTap={{ 
                                scale: 0.95,
                                backgroundColor: "#bfdbfe",
                                transition: { duration: 0.1 }
                              }}
                              onClick={() => handleFAQClick(faq)}
                              className="text-left p-2 text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md transition-colors border border-blue-200 truncate"
                            >
                              {faq.question}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Input Area */}
              <div className="border-t p-4 flex-shrink-0">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button 
                    size="icon" 
                    onClick={handleSendMessage}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send message</span>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
} 