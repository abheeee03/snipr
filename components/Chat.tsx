"use client"
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TranscriptResponse } from '@/lib/types'
import axios from 'axios'
import { Send, Loader2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ChatProps {
  transcript: TranscriptResponse | null
}

function Chat({ transcript }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Function to determine if we should scroll (only scroll if user is close to bottom)
  const maybeScrollToBottom = useCallback(() => {
    const container = chatContainerRef.current
    if (!container) return

    // Height of content (including off-screen)
    const scrollHeight = container.scrollHeight
    // Height of visible area
    const clientHeight = container.clientHeight
    // How far user is from top
    const scrollTop = container.scrollTop

    // If the user is already near the bottom, scroll to bottom, otherwise do nothing
    // (80px leeway for "near bottom")
    if (scrollHeight - clientHeight - scrollTop < 80) {
      // Scroll the container itself instead of using scrollIntoView to avoid page scroll
      container.scrollTo({
        top: scrollHeight,
        behavior: "smooth"
      })
    }
  }, [])

  useEffect(() => {
    maybeScrollToBottom()
  }, [messages, loading, maybeScrollToBottom])

  const sendMessage = async () => {
    if (!input.trim() || !transcript || loading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const response = await axios.post('/api/chat', {
        message: userMessage,
        transcript: transcript
      })

      setMessages(prev => [...prev, { role: 'assistant', content: response.data.answer }])
    } catch (error) {
      console.error('Error sending message:', error)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full min-h-[500px] bg-muted rounded-xl overflow-hidden">
      {/* Chat Messages Area */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-hide"
        ref={chatContainerRef}
        style={{ minHeight: 0 }} // Fix flexbox scroll bug in certain browsers
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="space-y-3 max-w-md">
              <h3 className="text-xl font-semibold">👋 Welcome to Video Chat!</h3>
              <p className="text-muted-foreground">
                I'm here to help you understand this video better. Ask me anything about the content, key points, or topics discussed!
              </p>
              <div className="text-sm text-muted-foreground mt-4">
                <p className="font-medium mb-2">Try asking:</p>
                <ul className="space-y-1 list-disc list-inside text-left">
                  <li>What are the main points discussed?</li>
                  <li>Can you explain [specific topic]?</li>
                  <li>What does the speaker say about [something]?</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          messages.map((message, idx) => (
            <div
              key={idx}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background border'
                }`}
              >
                {message.role === 'assistant' ? (
                  <div className="text-sm">
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                        em: ({ children }) => <em className="italic">{children}</em>,
                        code: ({ children, className }) => {
                          const isInline = !className
                          return isInline ? (
                            <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">{children}</code>
                          ) : (
                            <pre className="bg-muted p-2 rounded text-xs font-mono overflow-x-auto my-2">
                              <code>{children}</code>
                            </pre>
                          )
                        },
                        ul: ({ children }) => <ul className="list-disc list-inside my-2 space-y-1">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside my-2 space-y-1">{children}</ol>,
                        li: ({ children }) => <li className="ml-2">{children}</li>,
                        h1: ({ children }) => <h1 className="text-lg font-semibold my-2">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-base font-semibold my-2">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-sm font-semibold my-2">{children}</h3>,
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                )}
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-background border rounded-lg px-4 py-2">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t bg-background p-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask a question about this video..."
            disabled={loading || !transcript}
            className="flex-1"
          />
          <Button
            onClick={sendMessage}
            disabled={loading || !input.trim() || !transcript}
            size="icon"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Chat