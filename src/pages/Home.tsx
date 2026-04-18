import { motion } from 'motion/react';
import { Sparkles, TrendingUp, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const stories = [
    { id: 1, name: 'Alex', img: 'https://picsum.photos/seed/alex/100/100' },
    { id: 2, name: 'Sasha', img: 'https://picsum.photos/seed/sasha/100/100' },
    { id: 3, name: 'Jordan', img: 'https://picsum.photos/seed/jordan/100/100' },
    { id: 4, name: 'Taylor', img: 'https://picsum.photos/seed/taylor/100/100' },
    { id: 5, name: 'Casey', img: 'https://picsum.photos/seed/casey/100/100' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-indigo-950">Poco</h1>
          <p className="text-sm text-gray-500 font-medium italic">Your world, your style.</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-indigo-600" />
        </div>
      </header>

      {/* Stories */}
      <section className="-mx-4 px-4">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex flex-col items-center gap-1 flex-shrink-0">
            <div className="w-16 h-16 rounded-full border-2 border-indigo-600 p-0.5">
              <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center border border-white">
                <span className="text-xl">+</span>
              </div>
            </div>
            <span className="text-[10px] font-semibold text-indigo-600">You</span>
          </div>
          {stories.map((s) => (
            <div key={s.id} className="flex flex-col items-center gap-1 flex-shrink-0">
              <div className="w-16 h-16 rounded-full border-2 border-indigo-200 p-0.5">
                <img
                  src={s.img}
                  alt={s.name}
                  className="w-full h-full rounded-full object-cover border border-white"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-[10px] font-medium text-gray-600">{s.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Hero Banner */}
      <section className="bg-indigo-600 rounded-3xl p-6 text-white relative overflow-hidden group">
        <div className="relative z-10 space-y-2">
          <h2 className="text-2xl font-bold leading-tight">New Collection Drop!</h2>
          <p className="text-indigo-100 text-sm max-w-[200px]">Get 20% off on your first avatar outfit purchase.</p>
          <Link to="/shop" className="inline-flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-full text-xs font-bold mt-2 shadow-lg shadow-indigo-900/20 active:scale-95 transition-transform">
            Shop Now <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-500 rounded-full blur-3xl opacity-50 group-hover:scale-110 transition-transform duration-700" />
        <TrendingUp className="absolute right-4 bottom-4 w-24 h-24 text-indigo-500/30 -rotate-12" />
      </section>

      {/* Trending Products */}
      <section className="space-y-4">
        <div className="flex justify-between items-end px-1">
          <h3 className="text-lg font-bold flex items-center gap-2">
            Trending <TrendingUp className="w-4 h-4 text-orange-500" />
          </h3>
          <Link to="/shop" className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">See all</Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
            >
              <img
                src={`https://picsum.photos/seed/product${i}/400/500`}
                alt="Product"
                className="w-full h-48 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-3 space-y-1">
                <h4 className="text-sm font-bold truncate">Neon Hoodie</h4>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-gray-500">$29.00</span>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-indigo-600" />
                    <span className="text-[10px] text-gray-400 font-medium">1.2k</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
