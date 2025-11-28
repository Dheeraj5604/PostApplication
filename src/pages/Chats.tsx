import React, { useState } from 'react';
import { Send, Search, ChevronLeft } from 'lucide-react';

interface User {
  id: string;
  name: string;
  avatarColor: string;
}

interface Message {
  id: number;
  senderId: string;
  text: string;
  timestamp: string;
  isSelf: boolean;
}

interface ChatContact {
  id: string;
  user: User;
  lastMessage: string;
  time: string;
  unreadCount: number;
}

const mockCurrentUser: User = { id: 'user_1', name: 'You', avatarColor: 'bg-teal-500' };

const mockContacts: ChatContact[] = [
  { id: 'c1', user: { id: 'u2', name: 'Mentor', avatarColor: 'bg-purple-500' }, lastMessage: 'The new feature looks great!', time: '10:30 AM', unreadCount: 2 },
  { id: 'c2', user: { id: 'u3', name: 'Team Lead', avatarColor: 'bg-blue-500' }, lastMessage: 'Don\'t forget the dashboard impl.', time: 'Yesterday', unreadCount: 0 },
  { id: 'c3', user: { id: 'u4', name: 'Aura Dev', avatarColor: 'bg-yellow-500' }, lastMessage: 'Pushing code now...', time: '8:45 AM', unreadCount: 1 },
  { id: 'c4', user: { id: 'u5', name: 'Ronin Test', avatarColor: 'bg-red-500' }, lastMessage: 'Hey, are you free for a call?', time: '2 days ago', unreadCount: 0 },
];

const mockMessages: Message[] = [
  { id: 1, senderId: 'u2', text: 'Hey, I checked out your progress.', timestamp: '10:20 AM', isSelf: false },
  { id: 2, senderId: 'user_1', text: 'Awesome! Glad you liked the routing structure.', timestamp: '10:25 AM', isSelf: true },
  { id: 3, senderId: 'u2', text: 'It looks solid. The next step is connecting the Firestore listeners for real-time updates.', timestamp: '10:30 AM', isSelf: false },
];

const ChatContactItem: React.FC<{ contact: ChatContact, onSelect: (id: string) => void, isSelected: boolean }> = ({ contact, onSelect, isSelected }) => (
  <div
    className={`flex items-center p-3 cursor-pointer rounded-xl transition-colors duration-200 ${isSelected ? 'bg-teal-700/50' : 'hover:bg-gray-700/50'}`}
    onClick={() => onSelect(contact.id)}
  >
    <div className={`w-12 h-12 ${contact.user.avatarColor} rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
      {contact.user.name[0]}
    </div>
    <div className="ml-4 flex-1 min-w-0 hidden md:block">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-white truncate">{contact.user.name}</p>
        <p className="text-xs text-gray-500 flex-shrink-0">{contact.time}</p>
      </div>
      <p className="text-sm text-gray-400 truncate mt-0.5">{contact.lastMessage}</p>
    </div>
    {contact.unreadCount > 0 && (
      <span className="ml-3 px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full flex-shrink-0">{contact.unreadCount}</span>
    )}
  </div>
);

const MessageBubble: React.FC<{ message: Message, contactName: string, contactColor: string }> = ({ message, contactName, contactColor }) => {
  const isSelf = message.isSelf;
  const bgColor = isSelf ? 'bg-teal-600' : 'bg-gray-700';
  const textColor = 'text-white';
  const position = isSelf ? 'self-end' : 'self-start';
  const borderRadius = isSelf ? 'rounded-tl-xl rounded-bl-xl rounded-tr-sm' : 'rounded-tr-xl rounded-br-xl rounded-tl-sm';

  return (
    <div className={`flex flex-col max-w-[80%] my-1 ${position}`}>
      <div className={`p-3 ${bgColor} ${textColor} ${borderRadius} shadow-md`}>
        {!isSelf && <span className={`text-xs font-bold mb-1 block ${contactColor.replace('bg-', 'text-')}`}>{contactName}</span>}
        <p>{message.text}</p>
      </div>
      <span className={`text-xs mt-0.5 text-gray-500 ${isSelf ? 'text-right' : 'text-left'}`}>{message.timestamp}</span>
    </div>
  );
};

const ChatWindow: React.FC<{ contact: ChatContact }> = ({ contact }) => {
  const [inputText, setInputText] = useState('');
  
  return (
    <div className="flex flex-col h-full bg-gray-800 rounded-xl">
      <div className="p-4 border-b border-gray-700 flex items-center">
        <div className={`w-10 h-10 ${contact.user.avatarColor} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
          {contact.user.name[0]}
        </div>
        <div className="ml-3">
          <h3 className="text-lg font-semibold text-white">{contact.user.name}</h3>
          <p className="text-sm text-green-400">Online</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3 flex flex-col custom-scrollbar">
        {mockMessages.map(msg => (
          <MessageBubble
            key={msg.id}
            message={msg}
            contactName={contact.user.name}
            contactColor={contact.user.avatarColor}
          />
        ))}
        {/* Placeholder for new messages */}
      </div>

      <div className="p-4 border-t border-gray-700 flex space-x-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:ring-teal-500 focus:border-teal-500 transition duration-300"
          onKeyPress={(e) => {
            if (e.key === 'Enter' && inputText.trim()) {
              // Add send logic here (e.g., call Firestore function)
              setInputText('');
            }
          }}
        />
        <button
          className="p-3 bg-teal-600 hover:bg-teal-700 rounded-lg text-white transition duration-300 disabled:opacity-50"
          onClick={() => { if (inputText.trim()) setInputText(''); }}
          disabled={!inputText.trim()}
        >
          <Send className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

const Chats: React.FC = () => {
  const [selectedChatId, setSelectedChatId] = useState<string>(mockContacts[0].id);
  const selectedContact = mockContacts.find(c => c.id === selectedChatId);

  return (
    <div className="min-h-[90vh] p-4 md:p-8 bg-gray-900 text-white rounded-xl shadow-2xl">
      <h1 className="text-3xl font-extrabold mb-6 hidden md:block">Direct Messages</h1>
      
      <div className="flex h-[80vh] bg-gray-800 rounded-xl shadow-xl overflow-hidden">
        
        {/* Chat List Sidebar (Visible on large screens, or when no chat is selected on mobile) */}
        <div 
          className={`w-full md:w-80 border-r border-gray-700 flex flex-col p-4 transition-all duration-300 ${selectedChatId && window.innerWidth < 768 ? 'hidden' : 'block'}`}
        >
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search chats..."
              className="w-full p-3 pl-10 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:ring-teal-500 focus:border-teal-500"
            />
            <Search className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <div className="space-y-2 overflow-y-auto flex-1 custom-scrollbar">
            {mockContacts.map(contact => (
              <ChatContactItem 
                key={contact.id} 
                contact={contact} 
                onSelect={setSelectedChatId} 
                isSelected={contact.id === selectedChatId} 
              />
            ))}
          </div>
        </div>

        {/* Chat Window (Hidden on mobile if list is visible) */}
        <div className={`flex-1 ${selectedChatId ? 'block' : 'hidden'} md:block`}>
          {selectedContact ? (
            <ChatWindow contact={selectedContact} />
          ) : (
            <div className="flex justify-center items-center h-full text-gray-500">
              Select a conversation to start chatting.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chats;