'use client';

import { useState, useRef } from 'react';
import { PageContainer } from '@/components/ui/page-container';

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState('1');
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showProfile, setShowProfile] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const emojis = ['😊', '👍', '❤️', '😂', '🎉', '👏', '🙏', '✨', '🔥', '💯'];
  
  const mockConversations = [
    {
      id: '1',
      user: { 
        name: 'John Cooper', 
        email: 'john.cooper@email.com', 
        avatar: 'JC',
        phone: '+1 234 567 8900',
        location: 'New York, USA',
        memberSince: 'Jan 2023',
        totalBookings: 12
      },
      lastMessage: 'Thank you! Looking forward to my stay.',
      timestamp: '10:30 AM',
      unread: 2,
      booking: { id: 'BK001', room: 'Deluxe Ocean View', checkIn: 'Jan 10', checkOut: 'Jan 15' },
    },
    {
      id: '2',
      user: { 
        name: 'Sarah Wilson', 
        email: 'sarah.wilson@email.com', 
        avatar: 'SW',
        phone: '+1 234 567 8901',
        location: 'Los Angeles, USA',
        memberSince: 'Mar 2023',
        totalBookings: 5
      },
      lastMessage: 'Is there a pool at the hotel?',
      timestamp: 'Yesterday',
      unread: 1,
      booking: { id: 'BK002', room: 'Standard Room', checkIn: 'Jan 12', checkOut: 'Jan 14' },
    },
    {
      id: '3',
      user: { 
        name: 'Mike Brown', 
        email: 'mike.brown@email.com', 
        avatar: 'MB',
        phone: '+1 234 567 8902',
        location: 'Chicago, USA',
        memberSince: 'Dec 2022',
        totalBookings: 18
      },
      lastMessage: 'Great! See you then.',
      timestamp: 'Jan 5',
      unread: 0,
      booking: { id: 'BK003', room: 'Suite', checkIn: 'Jan 12', checkOut: 'Jan 15' },
    },
  ];

  const mockMessages = {
    '1': [
      { id: '1', sender: 'guest', text: 'Hi! I have a booking for Jan 10-15. Can I request early check-in?', timestamp: '10:15 AM' },
      { id: '2', sender: 'host', text: 'Hello John! Of course, we can arrange early check-in at 12 PM for you.', timestamp: '10:20 AM' },
      { id: '3', sender: 'guest', text: 'Perfect! Also, do you provide airport shuttle service?', timestamp: '10:25 AM' },
      { id: '4', sender: 'host', text: 'Yes, we offer complimentary airport shuttle. Just let us know your arrival time.', timestamp: '10:28 AM' },
      { id: '5', sender: 'guest', text: 'Thank you! Looking forward to my stay.', timestamp: '10:30 AM' },
    ],
    '2': [
      { id: '1', sender: 'guest', text: 'Hi, I saw your hotel listing. Is there a pool at the hotel?', timestamp: '2:30 PM' },
    ],
    '3': [
      { id: '1', sender: 'guest', text: 'Hello! I need to modify my booking dates.', timestamp: 'Jan 5, 9:00 AM' },
      { id: '2', sender: 'host', text: 'Hi Mike! No problem. What are your preferred new dates?', timestamp: 'Jan 5, 9:15 AM' },
      { id: '3', sender: 'guest', text: 'Can I change to Jan 12-15 instead?', timestamp: 'Jan 5, 9:20 AM' },
      { id: '4', sender: 'host', text: 'Let me check availability... Yes, we can accommodate that change!', timestamp: 'Jan 5, 9:25 AM' },
      { id: '5', sender: 'guest', text: 'Great! See you then.', timestamp: 'Jan 5, 9:30 AM' },
    ],
  };

  const currentConversation = mockConversations.find(c => c.id === selectedChat);
  const currentMessages = mockMessages[selectedChat as keyof typeof mockMessages] || [];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending:', message);
      setMessage('');
      setShowEmojiPicker(false);
    }
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('File selected:', file.name);
    }
  };

  const addEmoji = (emoji: string) => {
    setMessage(prev => prev + emoji);
  };

  return (
    <PageContainer className="flex flex-col">
      <div className="p-8 pb-4">
        <h1 className="text-2xl font-bold text-[#3d2e1f]">Messages</h1>
      </div>

      <div className="flex-1 flex gap-6 px-8 pb-8 overflow-hidden">
        <div className="w-80 bg-white rounded-xl border border-[#E5D5C3] flex flex-col">
          <div className="p-4 border-b border-[#E5D5C3]">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 bg-[#FDFBF7] border border-[#E5D5C3] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {mockConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedChat(conv.id)}
                className={`w-full p-4 flex items-start gap-3 hover:bg-[#F5EFE7] transition-colors border-b border-[#E5D5C3] ${
                  selectedChat === conv.id ? 'bg-[#F5EFE7]' : ''
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B6F47] to-[#6B5B3D] flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-white">{conv.user.avatar}</span>
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm text-[#3d2e1f] truncate">{conv.user.name}</span>
                    <span className="text-xs text-slate-500 flex-shrink-0 ml-2">{conv.timestamp}</span>
                  </div>
                  <p className="text-sm text-slate-600 truncate mb-1">{conv.lastMessage}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{conv.booking.room}</span>
                    {conv.unread > 0 && (
                      <span className="px-2 py-0.5 bg-brand text-white text-xs rounded-full">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-white rounded-xl border border-[#E5D5C3] flex flex-col">
          <div className="p-4 border-b border-[#E5D5C3] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B6F47] to-[#6B5B3D] flex items-center justify-center">
                <span className="text-sm font-semibold text-white">{currentConversation?.user.avatar}</span>
              </div>
              <div>
                <div className="font-semibold text-[#3d2e1f]">{currentConversation?.user.name}</div>
                <div className="text-xs text-slate-500">Booking: {currentConversation?.booking.id}</div>
              </div>
            </div>
            <button 
              onClick={() => setShowProfile(!showProfile)}
              className={`p-2 rounded-lg transition-colors ${showProfile ? 'bg-[#F5EFE7] text-brand' : 'text-slate-400 hover:text-[#6B5B3D] hover:bg-[#F5EFE7]'}`}
              title={showProfile ? 'Hide profile' : 'Show profile'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {currentMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'host' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-md ${msg.sender === 'host' ? 'order-2' : 'order-1'}`}>
                  <div
                    className={`rounded-2xl px-4 py-2 ${
                      msg.sender === 'host'
                        ? 'bg-brand text-white rounded-br-sm'
                        : 'bg-[#F5EFE7] text-[#3d2e1f] rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                  <span className={`text-xs text-slate-500 mt-1 block ${msg.sender === 'host' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-[#E5D5C3]">
            <div className="flex gap-2 mb-3">
              <button
                onClick={handleImageUpload}
                className="p-2 hover:bg-[#F5EFE7] rounded-lg transition-colors text-[#6B5B3D]"
                title="Upload image"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="p-2 hover:bg-[#F5EFE7] rounded-lg transition-colors text-[#6B5B3D]"
                title="Add emoji"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            
            {showEmojiPicker && (
              <div className="mb-3 p-3 bg-[#FDFBF7] rounded-lg border border-[#E5D5C3]">
                <div className="flex flex-wrap gap-2">
                  {emojis.map((emoji, idx) => (
                    <button
                      key={idx}
                      onClick={() => addEmoji(emoji)}
                      className="text-2xl hover:scale-125 transition-transform"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 bg-[#FDFBF7] border border-[#E5D5C3] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand"
              />
              <button
                onClick={handleSendMessage}
                className="px-6 py-2 bg-brand text-white rounded-lg hover:bg-[#6B5B3D] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={`bg-white rounded-xl border border-[#E5D5C3] p-6 transition-all duration-300 ${showProfile ? 'w-80 opacity-100' : 'w-0 opacity-0 overflow-hidden p-0 border-0'}`}>
          {showProfile && (
            <>
              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#8B6F47] to-[#6B5B3D] flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{currentConversation?.user.avatar}</span>
                </div>
                <h3 className="font-bold text-lg text-[#3d2e1f] mb-1">{currentConversation?.user.name}</h3>
                <p className="text-sm text-slate-500">{currentConversation?.user.email}</p>
              </div>

              <div className="space-y-4">
                <div className="pb-4 border-b border-[#E5D5C3]">
                  <div className="text-xs text-slate-500 mb-1">Phone</div>
                  <div className="text-sm font-medium text-[#3d2e1f]">{currentConversation?.user.phone}</div>
                </div>

                <div className="pb-4 border-b border-[#E5D5C3]">
                  <div className="text-xs text-slate-500 mb-1">Location</div>
                  <div className="text-sm font-medium text-[#3d2e1f]">{currentConversation?.user.location}</div>
                </div>

                <div className="pb-4 border-b border-[#E5D5C3]">
                  <div className="text-xs text-slate-500 mb-1">Member Since</div>
                  <div className="text-sm font-medium text-[#3d2e1f]">{currentConversation?.user.memberSince}</div>
                </div>

                <div className="pb-4 border-b border-[#E5D5C3]">
                  <div className="text-xs text-slate-500 mb-1">Total Bookings</div>
                  <div className="text-sm font-medium text-[#3d2e1f]">{currentConversation?.user.totalBookings}</div>
                </div>

                <div className="pt-2">
                  <div className="text-xs font-semibold text-[#6B5B3D] uppercase tracking-wider mb-3">Current Booking</div>
                  <div className="bg-[#FDFBF7] p-4 rounded-lg border border-[#E5D5C3]">
                    <div className="text-sm font-bold text-[#3d2e1f] mb-2">{currentConversation?.booking.room}</div>
                    <div className="text-xs text-slate-500 mb-1">Booking ID: {currentConversation?.booking.id}</div>
                    <div className="text-xs text-slate-600">
                      {currentConversation?.booking.checkIn} - {currentConversation?.booking.checkOut}
                    </div>
                  </div>
                </div>

                <button className="w-full py-2 bg-brand text-white rounded-lg text-sm font-medium hover:bg-[#6B5B3D] transition-colors">
                  View Full Profile
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
