'use client'

import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] rounded-full shadow-2xl shadow-[var(--brand-primary)]/50 flex items-center justify-center hover:scale-110 transition-all duration-300 z-50"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
          3
        </span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-[var(--brand-dark)] rounded-xl shadow-2xl border border-white/10 overflow-hidden z-50 animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] p-4">
            <h3 className="font-semibold">Messages</h3>
            <p className="text-xs text-white/80">3 unread messages</p>
          </div>

          {/* Messages */}
          <div className="p-4 space-y-3 h-[calc(100%-8rem)] overflow-y-auto">
            {[
              { name: 'Sarah Johnson', message: 'Hi! Can we discuss the project timeline?', time: '2m ago' },
              { name: 'Michael Chen', message: 'Great work on the website!', time: '1h ago' },
              { name: 'Emily Rodriguez', message: 'When can you start the mobile app?', time: '3h ago' },
            ].map((msg, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.name}`} 
                  alt={msg.name} 
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm truncate">{msg.name}</p>
                    <span className="text-xs text-gray-400">{msg.time}</span>
                  </div>
                  <p className="text-xs text-gray-400 truncate">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#361F27] border-t border-white/10">
            <button className="w-full py-2 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-[var(--brand-primary)]/50 transition-all duration-300">
              View All Messages
            </button>
          </div>
        </div>
      )}
    </>
  )
}
