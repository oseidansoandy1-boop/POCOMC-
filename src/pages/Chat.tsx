import { useState } from 'react';
import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Plus, Send, Video, ChevronLeft, PhoneOff, Mic, MicOff, VideoOff, MoreHorizontal } from 'lucide-react';
import { cn } from '../lib/utils';

// Shared User Type
interface User {
  id: string;
  name: string;
  avatar: string;
  lastMsg: string;
  time: string;
  online: boolean;
}

const USERS: User[] = [
  { id: '1', name: 'Luna Maya', avatar: 'https://picsum.photos/seed/luna/100/100', lastMsg: 'Omg that jacket looks fire! 🔥', time: '12:45', online: true },
  { id: '2', name: 'Kai Rivers', avatar: 'https://picsum.photos/seed/kai/100/100', lastMsg: 'Wanna join the Poco party?', time: '10:12', online: false },
  { id: '3', name: 'Sasha Grey', avatar: 'https://picsum.photos/seed/sasha/100/100', lastMsg: 'Send me the shop link pls', time: 'Yesterday', online: true },
];

function ChatList() {
  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Messages</h1>
        <button className="p-2 rounded-full bg-indigo-50 text-indigo-600">
          <Plus className="w-6 h-6" />
        </button>
      </header>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search chats..."
          className="w-full pl-10 pr-4 py-3 bg-white rounded-2xl border-none shadow-sm text-sm focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      <div className="space-y-2">
        {USERS.map((user) => (
          <Link
            key={user.id}
            to={`/chat/${user.id}`}
            className="flex items-center gap-4 p-3 rounded-3xl hover:bg-white hover:shadow-sm transition-all group"
          >
            <div className="relative">
              <img src={user.avatar} className="w-14 h-14 rounded-2xl object-cover" referrerPolicy="no-referrer" alt="" />
              {user.online && (
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-gray-50 rounded-full" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-sm truncate">{user.name}</h4>
                <span className="text-[10px] text-gray-400 font-medium">{user.time}</span>
              </div>
              <p className="text-xs text-gray-500 truncate">{user.lastMsg}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function VideoCall({ user, onEnd }: { user: User; onEnd: () => void }) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  return (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed inset-0 z-[60] bg-black"
    >
        {/* Remote Video (Mock) */}
        <div className="absolute inset-0 flex items-center justify-center">
            <img src={user.avatar} className="w-full h-full object-cover blur-2xl opacity-40" referrerPolicy="no-referrer" alt="" />
            <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="relative z-10 text-center space-y-4"
            >
                <img src={user.avatar} className="w-32 h-32 rounded-full border-4 border-indigo-500 shadow-2xl mx-auto object-cover" referrerPolicy="no-referrer" alt="" />
                <h2 className="text-xl font-bold text-white">{user.name}</h2>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500 rounded-full text-[10px] font-bold text-white animate-pulse">
                    LIVE CALL
                </div>
            </motion.div>
        </div>

        {/* Local Video (Self) */}
        <div className="absolute right-6 top-6 w-32 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl z-20 bg-gray-900 flex items-center justify-center">
             {!isVideoOff ? (
                 <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 animate-gradient-xy flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold opacity-50">YOUR CAMERA</span>
                 </div>
             ) : (
                <VideoOff className="text-white/20" />
             )}
        </div>

        {/* Controls */}
        <div className="absolute bottom-10 left-0 right-0 px-10 flex justify-between items-center z-20">
            <button
                onClick={() => setIsMuted(!isMuted)}
                className={cn("p-5 rounded-full backdrop-blur-md transition-all", isMuted ? "bg-red-500 text-white" : "bg-white/20 text-white")}
            >
                {isMuted ? <MicOff /> : <Mic />}
            </button>

            <button
                onClick={onEnd}
                className="p-6 rounded-full bg-red-600 text-white shadow-2xl shadow-red-900/50 hover:bg-red-700 active:scale-90 transition-all"
            >
                <PhoneOff className="w-8 h-8 fill-current" />
            </button>

            <button
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={cn("p-5 rounded-full backdrop-blur-md transition-all", isVideoOff ? "bg-red-500 text-white" : "bg-white/20 text-white")}
            >
                {isVideoOff ? <VideoOff /> : <Video />}
            </button>
        </div>
    </motion.div>
  );
}

function ChatRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [msg, setMsg] = useState('');
  const [showCall, setShowCall] = useState(false);
  const user = USERS.find(u => u.id === id) || USERS[0];

  const [messages, setMessages] = useState([
    { id: 1, text: 'Hey! Did you see the new avatar drops?', sender: 'them', time: '12:40 PM' },
    { id: 2, text: 'Yeah, I just got the holographic jacket! 🧥✨', sender: 'me', time: '12:42 PM' },
    { id: 3, text: 'Omg that looks fire! 🔥', sender: 'them', time: '12:45 PM' },
  ]);

  const handleSend = () => {
    if (!msg.trim()) return;
    setMessages([...messages, { id: Date.now(), text: msg, sender: 'me', time: 'Just now' }]);
    setMsg('');
  };

  return (
    <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col pt-safe">
      <AnimatePresence>
        {showCall && <VideoCall user={user} onEnd={() => setShowCall(false)} />}
      </AnimatePresence>

      <header className="px-4 py-3 flex items-center gap-3 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <button onClick={() => navigate('/chat')} className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex-1 flex items-center gap-3">
          <div className="relative">
            <img src={user.avatar} className="w-10 h-10 rounded-xl object-cover" referrerPolicy="no-referrer" alt="" />
            {user.online && <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />}
          </div>
          <div>
            <h4 className="text-sm font-bold">{user.name}</h4>
            <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest">{user.online ? 'Online' : 'Offline'}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowCall(true)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors">
            <Video className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-xl transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <motion.div
            initial={{ opacity: 0, x: m.sender === 'me' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            key={m.id}
            className={cn(
              "max-w-[80%] p-3 rounded-2xl text-xs font-medium space-y-1 shadow-sm",
              m.sender === 'me'
                ? "ml-auto bg-indigo-600 text-white rounded-tr-none"
                : "bg-white text-gray-800 rounded-tl-none"
            )}
          >
            <p>{m.text}</p>
            <span className={cn("text-[9px] block text-right", m.sender === 'me' ? "text-indigo-200" : "text-gray-400")}>
              {m.time}
            </span>
          </motion.div>
        ))}
      </div>

      <footer className="p-4 bg-white border-t border-gray-100 pb-safe-offset-4">
        <div className="flex gap-3 items-center">
          <div className="flex-1 relative">
            <input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              type="text"
              placeholder="Type a message..."
              className="w-full px-4 py-3 bg-gray-100 rounded-2xl border-none text-xs focus:ring-2 focus:ring-indigo-100 transition-all font-medium"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!msg.trim()}
            className="p-4 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:shadow-none active:scale-90 transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </div>
  );
}

export default function Chat() {
  return (
    <Routes>
      <Route index element={<ChatList />} />
      <Route path=":id" element={<ChatRoom />} />
    </Routes>
  );
}
