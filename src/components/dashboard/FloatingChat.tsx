'use client'

import { useState } from 'react'
import { MessageCircle, X, Send, Zap, Search, ArrowLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Mock data for multiple conversations
const CHATS = [
  { 
    id: 1, 
    name: 'JobFluencer Team', 
    avatar: 'team',
    online: true,
    messages: [
      { id: 1, sender: 'them', text: 'Hi Kanika! I noticed you recently updated your profile. We have a matching project for you.', time: '10:42 AM' },
      { id: 2, sender: 'me', text: 'That sounds great! Can you share more details?', time: '10:44 AM' },
      { id: 3, sender: 'them', text: "It's a complete SaaS dashboard redesign. Budget is flexible around $5k-$8k. Are you available this week?", time: 'Just now' },
    ]
  },
  { 
    id: 2, 
    name: 'Sarah Johnson', 
    avatar: 'Sarah',
    online: false,
    messages: [
      { id: 1, sender: 'them', text: 'Hi! Can we discuss the project timeline?', time: '2m ago' },
    ]
  },
  { 
    id: 3, 
    name: 'Michael Chen', 
    avatar: 'Michael',
    online: true,
    messages: [
      { id: 1, sender: 'them', text: 'Great work on the website! The new animations look very fluid.', time: '1h ago' },
      { id: 2, sender: 'me', text: 'Thanks Michael! Let me know if you need any other revisions.', time: '55m ago' },
    ]
  },
  { 
    id: 4, 
    name: 'Emily Rodriguez', 
    avatar: 'Emily',
    online: false,
    messages: [
      { id: 1, sender: 'them', text: 'When can you start the mobile app?', time: '3h ago' },
    ]
  },
]

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeChatId, setActiveChatId] = useState<number | null>(1) // Open first chat by default on desktop
  const [searchQuery, setSearchQuery] = useState('')
  const [messageText, setMessageText] = useState('')

  const activeChat = CHATS.find(c => c.id === activeChatId)

  const filteredChats = CHATS.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <>
      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-tr from-indigo-600 to-cyan-500 rounded-full shadow-[0_0_30px_rgba(99,102,241,0.4)] flex items-center justify-center transition-shadow z-50 text-white group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-black flex items-center justify-center text-[9px] font-bold">
            2
          </span>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            className="fixed bottom-24 right-6 w-[340px] md:w-[700px] h-[500px] bg-[#0A0A0B]/95 backdrop-blur-3xl rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/[0.08] overflow-hidden z-50 flex flex-row"
          >
            {/* Sidebar (List of Chats) */}
            <div className={`md:flex w-full md:w-[280px] border-r border-white/[0.08] flex-col bg-white/[0.01] shrink-0 h-full ${activeChatId ? 'hidden' : 'flex'}`}>
              <div className="p-4 border-b border-white/[0.08] flex flex-col gap-3">
                <h3 className="font-semibold text-white tracking-tight">Messages</h3>
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input 
                    type="text" 
                    placeholder="Search chats..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-full pl-9 pr-4 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
                  />
                </div>
              </div>

              {/* Chat List */}
              <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-track]:bg-transparent">
                {filteredChats.map((chat) => {
                  const lastMessage = chat.messages[chat.messages.length - 1]
                  const isActive = chat.id === activeChatId
                  
                  return (
                    <div 
                      key={chat.id} 
                      onClick={() => setActiveChatId(chat.id)}
                      className={`flex items-center gap-3 p-3 cursor-pointer transition-colors border-b border-white/[0.04] ${
                        isActive ? 'bg-indigo-500/10 border-l-2 border-l-indigo-500' : 'hover:bg-white/[0.04] border-l-2 border-l-transparent'
                      }`}
                    >
                      <div className="relative shrink-0">
                        {chat.avatar === 'team' ? (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 p-[1.5px]">
                            <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                              <Zap className="w-5 h-5 text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-cyan-400" />
                            </div>
                          </div>
                        ) : (
                          <img 
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${chat.avatar}`} 
                            alt={chat.name} 
                            className="w-10 h-10 rounded-full ring-1 ring-white/10"
                          />
                        )}
                        {chat.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#0A0A0B] rounded-full"></span>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-0.5">
                          <h4 className={`text-sm truncate ${isActive ? 'font-semibold text-white' : 'font-medium text-zinc-300'}`}>{chat.name}</h4>
                          <span className="text-[10px] text-zinc-500 shrink-0 ml-1">{lastMessage?.time}</span>
                        </div>
                        <p className={`text-xs truncate ${isActive ? 'text-zinc-300' : 'text-zinc-500'}`}>
                          {lastMessage?.sender === 'me' ? 'You: ' : ''}{lastMessage?.text}
                        </p>
                      </div>
                    </div>
                  )
                })}
                {filteredChats.length === 0 && (
                  <div className="p-4 text-center text-xs text-zinc-500">
                    No chats found.
                  </div>
                )}
              </div>
            </div>

            {/* Chat Area */}
            <div className={`md:flex flex-1 flex-col relative w-full h-full ${activeChatId ? 'flex' : 'hidden'}`}>
              {activeChat ? (
                <>
                  {/* Header */}
                  <div className="p-4 border-b border-white/[0.08] bg-white/[0.02] relative overflow-hidden shrink-0 flex items-center gap-3">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
                    
                    {/* Back Button for Mobile */}
                    <button 
                      onClick={() => setActiveChatId(null)}
                      className="md:hidden p-2 -ml-2 hover:bg-white/[0.05] rounded-full transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5 text-zinc-400" />
                    </button>

                    <div className="relative z-10 flex items-center gap-3">
                      <div className="relative">
                        {activeChat.avatar === 'team' ? (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 p-[1.5px]">
                            <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                              <Zap className="w-5 h-5 text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-cyan-400" />
                            </div>
                          </div>
                        ) : (
                          <img 
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activeChat.avatar}`} 
                            alt={activeChat.name} 
                            className="w-10 h-10 rounded-full ring-1 ring-white/10"
                          />
                        )}
                        {activeChat.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0A0A0B] rounded-full"></span>}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white tracking-tight leading-tight">{activeChat.name}</h3>
                        {activeChat.online ? (
                          <p className="text-xs text-indigo-400 flex items-center gap-1.5 mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
                            Online
                          </p>
                        ) : (
                          <p className="text-xs text-zinc-500 mt-0.5">Offline</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 p-4 space-y-4 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-track]:bg-transparent">
                    {activeChat.messages.map((msg) => {
                      const isMe = msg.sender === 'me'

                      return (
                        <motion.div 
                          key={msg.id}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex gap-3 max-w-[85%] ${isMe ? 'flex-row-reverse ml-auto' : ''}`}
                        >
                          {!isMe && (
                            <div className="shrink-0">
                              {activeChat.avatar === 'team' ? (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 p-[1px]">
                                  <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                                    <Zap className="w-4 h-4 text-indigo-400" />
                                  </div>
                                </div>
                              ) : (
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activeChat.avatar}`} alt="Avatar" className="w-8 h-8 rounded-full ring-1 ring-white/10" />
                              )}
                            </div>
                          )}

                          <div>
                            <div className={`p-3 rounded-2xl text-sm shadow-sm leading-relaxed ${
                              isMe 
                                ? 'bg-indigo-500/20 border border-indigo-500/30 rounded-tr-sm text-white' 
                                : 'bg-white/[0.05] border border-white/[0.08] rounded-tl-sm text-zinc-300'
                            }`}>
                              {msg.text}
                            </div>
                            <span className={`text-[10px] text-zinc-500 mt-1.5 block ${isMe ? 'text-right mr-1' : 'ml-1'}`}>{msg.time}</span>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>

                  {/* Footer / Input */}
                  <div className="p-3 bg-black/40 backdrop-blur-md border-t border-white/[0.08] shrink-0">
                    <div className="relative flex items-center">
                      <input 
                        type="text" 
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="Type a message..." 
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-full pl-4 pr-12 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && messageText.trim()) {
                            // Add message logic here
                            setMessageText('')
                          }
                        }}
                      />
                      <button 
                        onClick={() => {
                          if (messageText.trim()) {
                            // Add message logic here
                            setMessageText('')
                          }
                        }}
                        className={`absolute right-1.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                          messageText.trim() ? 'bg-indigo-500 hover:bg-indigo-400 text-white' : 'bg-transparent text-zinc-600 hover:text-zinc-400'
                        }`}
                      >
                        <Send className="w-4 h-4 ml-0.5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                  <div className="w-16 h-16 bg-white/[0.02] border border-white/[0.08] rounded-full flex items-center justify-center mb-4">
                    <MessageCircle className="w-6 h-6 text-zinc-600" />
                  </div>
                  <h3 className="text-zinc-300 font-medium tracking-tight">Your Messages</h3>
                  <p className="text-xs text-zinc-500 mt-2">Select a chat to start messaging or search for someone</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

