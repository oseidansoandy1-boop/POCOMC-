/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Home as HomeIcon, ShoppingBag, MessageCircle, User as UserIcon, Palette } from 'lucide-react';
import { cn } from './lib/utils';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import Chat from './pages/Chat';
import AvatarCreator from './pages/Avatar';
import Profile from './pages/Profile';

function Navigation() {
  const tabs = [
    { id: 'home', icon: HomeIcon, path: '/', label: 'Home' },
    { id: 'shop', icon: ShoppingBag, path: '/shop', label: 'Shop' },
    { id: 'avatar', icon: Palette, path: '/avatar', label: 'Poco' },
    { id: 'chat', icon: MessageCircle, path: '/chat', label: 'Chat' },
    { id: 'profile', icon: UserIcon, path: '/profile', label: 'Me' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-100 px-4 pb-safe pt-2 z-50">
      <div className="max-w-md mx-auto flex justify-between items-center">
        {tabs.map((tab) => (
          <NavLink
            key={tab.id}
            to={tab.path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1 p-2 transition-colors",
                isActive ? "text-indigo-600" : "text-gray-400 hover:text-gray-600"
              )
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <tab.icon className="w-6 h-6" />
                  {isActive && (
                    <motion.div
                      layoutId="nav-glow"
                      className="absolute -inset-1 bg-indigo-100 rounded-full -z-10 blur-sm"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </div>
                <span className="text-[10px] font-medium tracking-tight uppercase">{tab.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

function PageWrapper({ children }: { children: ReactNode }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="pb-24 pt-4 px-4 max-w-md mx-auto min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-indigo-100">
        <Routes>
          <Route
            path="*"
            element={
              <>
                <PageWrapper>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/chat/*" element={<Chat />} />
                    <Route path="/avatar" element={<AvatarCreator />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                </PageWrapper>
                <Navigation />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
