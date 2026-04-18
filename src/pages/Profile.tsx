import { Settings, CreditCard, Shield, Heart, HelpCircle, LogOut, ChevronRight } from 'lucide-react';

export default function Profile() {
  const sections = [
    { label: 'Purchases', items: [
      { id: '1', label: 'Order History', icon: CreditCard },
      { id: '2', label: 'Wishlist', icon: Heart },
    ]},
    { label: 'Security', items: [
      { id: '3', label: 'Privacy Settings', icon: Shield },
      { id: '4', label: 'Account Security', icon: Settings },
    ]},
    { label: 'Support', items: [
      { id: '5', label: 'Help Center', icon: HelpCircle },
    ]}
  ];

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="bg-white rounded-[3rem] p-8 text-center space-y-4 shadow-xl shadow-indigo-100/50 border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-10 -z-0" />
        <div className="relative z-10 space-y-4">
          <div className="relative inline-block">
             <img
              src="https://picsum.photos/seed/poco_user/200/200"
              alt="Me"
              className="w-24 h-24 rounded-[2rem] object-cover border-4 border-white shadow-xl mx-auto"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-2 rounded-xl shadow-lg">
              <Settings className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold">Andy Osei</h2>
            <p className="text-xs text-gray-400 font-medium">@andy_poco • Poco Level 12</p>
          </div>
          <div className="flex justify-center gap-4 py-2">
            <div className="text-center">
              <span className="block text-sm font-bold">128</span>
              <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Following</span>
            </div>
            <div className="w-px h-8 bg-gray-100 my-auto" />
            <div className="text-center">
              <span className="block text-sm font-bold">2.4k</span>
              <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Followers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="space-y-6 pb-8">
        {sections.map(section => (
          <div key={section.label} className="space-y-3">
             <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-4">{section.label}</h3>
             <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                {section.items.map((item, idx) => (
                  <button
                    key={item.id}
                    className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${idx !== section.items.length - 1 ? 'border-b border-gray-50' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-gray-50 text-gray-500">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-semibold">{item.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </button>
                ))}
             </div>
          </div>
        ))}

        <button className="w-full flex items-center justify-center gap-2 p-4 bg-rose-50 rounded-3xl text-rose-600 font-bold text-sm active:scale-95 transition-all">
          <LogOut className="w-4 h-4" /> Log Out
        </button>
      </div>
    </div>
  );
}
