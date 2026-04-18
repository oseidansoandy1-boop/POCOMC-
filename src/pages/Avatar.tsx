import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, RefreshCcw, Save, Trash2, Sliders, ChevronLeft, ChevronRight, Video, Mic, MicOff, VideoOff, PhoneOff } from 'lucide-react';

export default function AvatarCreator() {
  const [activeCategory, setActiveCategory] = useState<'Face' | 'Hair' | 'Outfit' | 'Bling'>('Face');
  const [avatarState, setAvatarState] = useState({
    skin: '#FFDBAC',
    hairColor: '#4B2C20',
    hairStyle: 'Modern',
    eyes: 'Default',
    outfit: 'Basic Tee',
    bgColor: 'bg-indigo-50'
  });

  const categories = ['Face', 'Hair', 'Outfit', 'Bling'] as const;

  const options = {
    Face: [
      { id: 'skin1', label: 'Light', value: '#FFDBAC', type: 'skin' },
      { id: 'skin2', label: 'Tan', value: '#F1C27D', type: 'skin' },
      { id: 'skin3', label: 'Deep', value: '#8D5524', type: 'skin' },
      { id: 'eye1', label: 'Bold', value: 'bold', type: 'eyes' },
      { id: 'eye2', label: 'Soft', value: 'soft', type: 'eyes' },
    ],
    Hair: [
      { id: 'color1', label: 'Black', value: '#2C1E1E', type: 'hairColor' },
      { id: 'color2', label: 'Blonde', value: '#E6BE8A', type: 'hairColor' },
      { id: 'color3', label: 'Vibrant', value: '#FF007A', type: 'hairColor' },
      { id: 'style1', label: 'Buzz', value: 'Buzz', type: 'hairStyle' },
      { id: 'style2', label: 'Long', value: 'Long', type: 'hairStyle' },
      { id: 'style3', label: 'Modern', value: 'Modern', type: 'hairStyle' },
    ],
    Outfit: [
      { id: 'o1', label: 'Streetwear', value: 'Streetwear', type: 'outfit' },
      { id: 'o2', label: 'Cyber', value: 'Cyber', type: 'outfit' },
      { id: 'o3', label: 'Classic', value: 'Classic', type: 'outfit' },
    ],
    Bling: [
      { id: 'bg1', label: 'Indigo', value: 'bg-indigo-50', type: 'bgColor' },
      { id: 'bg2', label: 'Rose', value: 'bg-rose-50', type: 'bgColor' },
      { id: 'bg3', label: 'Emerald', value: 'bg-emerald-50', type: 'bgColor' },
    ]
  };

  const updateAvatar = (type: string, value: string) => {
    setAvatarState(prev => ({ ...prev, [type]: value }));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Upper Canvas Area */}
      <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-white shadow-xl shadow-indigo-100 border-8 border-white p-4 group">
        <div className={`w-full h-full rounded-[2.5rem] ${avatarState.bgColor} flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-700`}>
          {/* Avatar Visualization (SVG Based placeholder) */}
          <motion.div
            key={JSON.stringify(avatarState)}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-2"
          >
            {/* Hair */}
             <div
              className={`absolute top-1/4 w-32 h-16 rounded-t-full -z-0`}
              style={{
                 backgroundColor: avatarState.hairColor,
                 transform: avatarState.hairStyle === 'Buzz' ? 'scale(0.8)' : avatarState.hairStyle === 'Long' ? 'scale(1.2) translateY(20px)' : 'scale(1)'
              }}
            />

            {/* Head */}
            <div
              className="w-32 h-32 rounded-full shadow-lg relative z-10"
              style={{ backgroundColor: avatarState.skin }}
            >
              {/* Eyes */}
              <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-black rounded-full" />
              <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-black rounded-full" />
              {/* Mouth */}
              <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-8 h-2 bg-black/10 rounded-full" />
            </div>

            {/* Body/Outfit */}
            <div
              className="w-40 h-40 rounded-t-[4rem] relative z-0 transition-all"
              style={{
                backgroundColor: avatarState.outfit === 'Streetwear' ? '#141414' : avatarState.outfit === 'Cyber' ? '#00FF7A' : '#6366f1'
              }}
            >
               <div className="mt-4 text-center text-[10px] font-bold text-white/50 uppercase tracking-widest">{avatarState.outfit}</div>
            </div>
          </motion.div>

          {/* Camera Controls */}
          <div className="absolute right-4 bottom-4 flex flex-col gap-2">
            <button className="p-3 rounded-full bg-white shadow-lg active:scale-95 transition-transform">
              <RefreshCcw className="w-5 h-5 text-gray-400" />
            </button>
            <button className="p-3 rounded-full bg-indigo-600 shadow-lg active:scale-95 transition-transform">
              <Camera className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Selector Panels */}
      <div className="space-y-6">
        <div className="flex justify-between items-center bg-gray-100 p-1 rounded-2xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-3 min-h-[160px]">
          {options[activeCategory].map((opt) => (
            <button
              key={opt.id}
              onClick={() => updateAvatar(opt.type, opt.value)}
              className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 border-2 transition-all ${
                 (avatarState as any)[opt.type] === opt.value
                  ? 'border-indigo-600 bg-indigo-50/50'
                  : 'border-transparent bg-white shadow-sm hover:border-gray-200'
              }`}
            >
              <div
                className="w-8 h-8 rounded-full shadow-inner"
                style={{
                  backgroundColor: opt.type.includes('Color') || opt.type === 'skin' ? opt.value : '#e5e7eb'
                }}
              />
              <span className="text-[10px] font-medium text-gray-500">{opt.label}</span>
            </button>
          ))}
          <button className="aspect-square rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center group hover:bg-gray-50 transition-colors">
            <Sliders className="w-5 h-5 text-gray-300 group-hover:text-indigo-400" />
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        <button className="flex-1 bg-gray-100 py-4 rounded-3xl text-sm font-bold text-gray-600 hover:bg-gray-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
          <Trash2 className="w-4 h-4" /> Reset
        </button>
        <button className="flex-[2] bg-indigo-600 py-4 rounded-3xl text-sm font-bold text-white shadow-xl shadow-indigo-100 hover:shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-2">
          <Save className="w-4 h-4" /> Save Avatar
        </button>
      </div>
    </div>
  );
}
