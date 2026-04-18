import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, ShoppingCart, Filter, Heart, ChevronRight } from 'lucide-react';

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Clothing', 'Accessories', 'Avatars', 'Poco Exclusives'];

  const products = [
    { id: 1, name: 'Holographic Jacket', price: 120, category: 'Clothing', img: 'https://picsum.photos/seed/cloth1/400/500' },
    { id: 2, name: 'Crystal Sneakers', price: 180, category: 'Clothing', img: 'https://picsum.photos/seed/cloth2/400/500' },
    { id: 3, name: 'Aetheria Wings', price: 450, category: 'Avatars', img: 'https://picsum.photos/seed/avatar1/400/500' },
    { id: 4, name: 'Obsidian Watch', price: 95, category: 'Accessories', img: 'https://picsum.photos/seed/access1/400/500' },
    { id: 5, name: 'Prism Cap', price: 45, category: 'Accessories', img: 'https://picsum.photos/seed/access2/400/500' },
    { id: 6, name: 'Poco Pet: Dino', price: 299, category: 'Avatars', img: 'https://picsum.photos/seed/pet1/400/500' },
  ];

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-gray-50/50 -mx-4 px-4 py-2 sticky top-0 backdrop-blur-sm z-30">
        <h1 className="text-2xl font-bold">Shop</h1>
        <div className="flex gap-2">
          <button className="p-2 rounded-full bg-white shadow-sm border border-gray-100">
            <Search className="w-5 h-5" />
          </button>
          <div className="relative">
            <button className="p-2 rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-200">
              <ShoppingCart className="w-5 h-5" />
            </button>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">3</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="-mx-4 px-4 overflow-x-auto pb-2 scrollbar-hide flex gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-100 hover:border-indigo-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredProducts.map((p) => (
          <motion.div
            layout
            key={p.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group"
          >
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gray-100 border border-transparent group-hover:border-indigo-100 transition-colors">
              <img
                src={p.img}
                alt={p.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <button className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-red-500 transition-colors">
                <Heart className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-3 right-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                <button className="w-full bg-white/90 backdrop-blur-sm py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider text-gray-900 shadow-xl">
                  Quick View
                </button>
              </div>
            </div>
            <div className="mt-3 px-1 space-y-1">
              <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{p.category}</p>
              <h4 className="text-sm font-semibold truncate group-hover:text-indigo-600 transition-colors">{p.name}</h4>
              <p className="text-xs font-bold text-gray-900">${p.price.toFixed(2)}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Featured Collections Section */}
      <section className="pt-6 space-y-4">
        <h3 className="text-lg font-bold">New Drops</h3>
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-[2.5rem] flex items-center justify-between border border-indigo-100/50">
          <div className="space-y-2">
            <h4 className="text-indigo-900 font-bold">Meta-Modern Series</h4>
            <p className="text-xs text-indigo-700/70 max-w-[150px]">Explore the latest accessories for your digital twin.</p>
            <button className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 uppercase tracking-widest group">
              Explore <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-1 rotate-12 scale-110">
            <div className="w-12 h-12 bg-white rounded-lg p-0.5 shadow-sm overflow-hidden">
               <img src="https://picsum.photos/seed/sq1/50/50" alt="" className="w-full h-full object-cover rounded-md" referrerPolicy="no-referrer" />
            </div>
            <div className="w-12 h-12 bg-white rounded-lg p-0.5 shadow-sm overflow-hidden mt-4">
               <img src="https://picsum.photos/seed/sq2/50/50" alt="" className="w-full h-full object-cover rounded-md" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
