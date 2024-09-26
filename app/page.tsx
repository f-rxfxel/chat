"use client"

import { useState } from 'react'
import { Send } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: number
  text: string
  sender: 'user' | 'other'
}

export default function Component() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "oi!", sender: 'other' },
    { id: 2, text: "oi, bao dimai?", sender: 'user' },
  ])
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { id: messages.length + 1, text: newMessage, sender: 'user' }])
      setNewMessage('')
    }
  }

  return (
    <div className="flex flex-col h-[500px] w-[400px] mx-auto border rounded-lg overflow-hidden">
      <div className="bg-primary p-4 text-primary-foreground">
        <h2 className="text-xl font-bold">Chat</h2>
      </div>
      <ScrollArea className="flex-grow p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
          className="flex space-x-3"
        >
          <Input
            type="text"
            placeholder="Digite uma mensagem..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow text-md"
          />
          <Button type="submit">
            <Send className="h-5 w-5 mx-0.5" />
          </Button>
        </form>
      </div>
    </div>
  )
}